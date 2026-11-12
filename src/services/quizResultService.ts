import {
  collection,
  doc,
  setDoc,
  updateDoc,
  getDocs,
  query,
  where,
  limit,
  getCountFromServer,
  addDoc
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/errorHandling';
import {
  QuizResultRecord,
  PlatoonReportSummary,
  PlatoonRankingItem,
  CDSGroup,
  CDSGroupRankingItem,
  CDSMemberRankingItem,
  CDSPerformanceDashboardData,
  ParticipantRegistration
} from '../types';
import { CURRENT_CAMPAIGN_ID } from './participantService';

export const CURRENT_QUIZ_ROUND_ID = 'round_1';

export interface SubmitQuizResultParams {
  participantId: string;
  score: number;
  quizRoundId?: string;
  campaignId?: string;
  categoryId?: string;
  categoryName?: string;
  platoon?: number;
  attemptId?: string;
  timeTakenSeconds?: number;
}

/**
 * Submits an official Rapid-Fire Digital Quiz result.
 * Deterministic doc ID prevents duplicate submissions for the same round/category.
 * Firestore Security Rules verify:
 * 1. Participant registration exists in /participants/{participantId}
 * 2. Platoon matches the participant's registered platoon (cannot be forged)
 * 3. qualifying boolean strictly matches (score >= 6)
 * 4. totalQuestions is strictly 10
 */
export async function submitOfficialQuizResult(
  params: SubmitQuizResultParams
): Promise<{ success: boolean; id: string; error?: string }> {
  const roundId = (params.quizRoundId || CURRENT_QUIZ_ROUND_ID).trim();
  const campId = (params.campaignId || CURRENT_CAMPAIGN_ID).trim();
  const partId = params.participantId.trim();
  const catId = params.categoryId ? params.categoryId.trim() : '';

  // Deterministic document ID: [quizRoundId]_[categoryId]_[participantId] or [quizRoundId]_[participantId]
  const docId = catId ? `${roundId}_${catId}_${partId}` : `${roundId}_${partId}`;
  const docRef = doc(db, 'quizResults', docId);
  const path = `quizResults/${docId}`;

  const cleanScore = Math.min(10, Math.max(0, Math.round(params.score)));
  const cleanPlatoon = typeof params.platoon === 'number' && params.platoon >= 1 && params.platoon <= 10
    ? params.platoon
    : 0; // 0 represents Unassigned

  const payload: QuizResultRecord = {
    participantId: partId,
    quizRoundId: roundId,
    campaignId: campId,
    score: cleanScore,
    totalQuestions: 10,
    qualifying: cleanScore >= 6,
    platoon: cleanPlatoon,
    submittedAt: new Date().toISOString(),
    status: 'unverified' // Flagged as unverified until reviewed/validated by coordinator
  };

  if (catId) {
    payload.categoryId = catId;
    if (params.categoryName) payload.categoryName = params.categoryName;
  }
  if (params.attemptId) payload.attemptId = params.attemptId;
  if (typeof params.timeTakenSeconds === 'number' && !Number.isNaN(params.timeTakenSeconds)) {
    payload.timeTakenSeconds = Math.max(0, Math.min(600, Math.round(params.timeTakenSeconds)));
  }

  try {
    // 1 single blind write, 0 reads on client side with a 4-second strict timeout
    const writePromise = setDoc(docRef, payload);
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('TIMEOUT: Network request timed out while contacting Firestore database.')), 4000)
    );

    await Promise.race([writePromise, timeoutPromise]);
    return { success: true, id: docId };
  } catch (error: any) {
    const errorMsg = error?.message || String(error);
    if (errorMsg.includes('permission-denied') || errorMsg.includes('PERMISSION_DENIED')) {
      return {
        success: false,
        id: docId,
        error: 'Submission rejected: Participant ID not recognized, platoon mismatch, or round already submitted.'
      };
    }
    handleFirestoreError(error, OperationType.CREATE, path);
    return { success: false, id: docId, error: 'Database network error. Please try again.' };
  }
}

/**
 * Loads the Platoon Performance Report.
 * - Does not use real-time listeners.
 * - Server aggregations used for registered participant counts (11 lightweight calls).
 * - Bounded query for quiz results filtered by campaign & round.
 * - Distinct participant qualification: scores >= 6 qualify, 1 count per participant.
 * - Proper tie detection (does not invent a winner).
 */
export async function loadPlatoonPerformanceReport(
  campaignId: string = CURRENT_CAMPAIGN_ID,
  quizRoundId: string = CURRENT_QUIZ_ROUND_ID,
  categoryIdFilter: string = 'all'
): Promise<PlatoonReportSummary> {
  const participantsCol = collection(db, 'participants');
  const quizResultsCol = collection(db, 'quizResults');

  // 1. Fetch registered participant counts per platoon using getCountFromServer
  const platoonNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const registeredCounts: Record<number, number> = {};

  const [totalParticipantsSnap, ...platoonSnaps] = await Promise.all([
    getCountFromServer(participantsCol),
    ...platoonNumbers.map((p) =>
      getCountFromServer(query(participantsCol, where('platoon', '==', p)))
    )
  ]);

  let sumKnownPlatoons = 0;
  platoonNumbers.forEach((p, index) => {
    const count = platoonSnaps[index].data().count;
    registeredCounts[p] = count;
    sumKnownPlatoons += count;
  });

  const totalRegistered = totalParticipantsSnap.data().count;
  registeredCounts[0] = Math.max(0, totalRegistered - sumKnownPlatoons); // Unassigned

  // 2. Query quiz results bounded by campaign & round (bounded limit of 2,000)
  const resultsQuery = query(
    quizResultsCol,
    where('campaignId', '==', campaignId),
    where('quizRoundId', '==', quizRoundId),
    limit(2000)
  );

  const resultsSnap = await getDocs(resultsQuery);
  const individualResults: QuizResultRecord[] = [];

  resultsSnap.forEach((d) => {
    const data = d.data() as QuizResultRecord;
    individualResults.push({
      ...data,
      id: d.id
    });
  });

  // Apply optional category filter if specified
  const filteredResults = categoryIdFilter && categoryIdFilter !== 'all'
    ? individualResults.filter((r) => r.categoryId === categoryIdFilter)
    : individualResults;

  // 3. Aggregate distinct participants per platoon
  // Maps: platoon -> Set of distinct participantIds
  const distinctQuizParticipants: Record<number, Set<string>> = {
    0: new Set(),
    1: new Set(),
    2: new Set(),
    3: new Set(),
    4: new Set(),
    5: new Set(),
    6: new Set(),
    7: new Set(),
    8: new Set(),
    9: new Set(),
    10: new Set()
  };

  const distinctQualifyingParticipants: Record<number, Set<string>> = {
    0: new Set(),
    1: new Set(),
    2: new Set(),
    3: new Set(),
    4: new Set(),
    5: new Set(),
    6: new Set(),
    7: new Set(),
    8: new Set(),
    9: new Set(),
    10: new Set()
  };

  const scoreTotals: Record<number, number> = {
    0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0
  };

  let unassignedCount = 0;
  let unverifiedCount = 0;
  let invalidatedCount = 0;

  // Process results (ignore invalidated results for competition metrics, but keep for audit)
  filteredResults.forEach((res) => {
    if (res.status === 'invalidated') {
      invalidatedCount++;
      return;
    }

    if (res.status === 'unverified') {
      unverifiedCount++;
    }

    const p = typeof res.platoon === 'number' && res.platoon >= 1 && res.platoon <= 10 ? res.platoon : 0;
    if (p === 0) {
      unassignedCount++;
    }

    // De-duplicate distinct participants
    if (!distinctQuizParticipants[p].has(res.participantId)) {
      distinctQuizParticipants[p].add(res.participantId);
      scoreTotals[p] += res.score;

      // Rule: scores 6/10, 7/10, 8/10, 9/10, 10/10 qualify. 0-5 do not.
      if (res.score >= 6 && res.qualifying) {
        distinctQualifyingParticipants[p].add(res.participantId);
      }
    }
  });

  // 4. Build platoon ranking items for Platoons 1 to 10
  const competingPlatoons: Omit<PlatoonRankingItem, 'rank' | 'isTie' | 'displayRank'>[] = platoonNumbers.map((p) => {
    const regCount = registeredCounts[p] || 0;
    const quizCount = distinctQuizParticipants[p].size;
    const qualCount = distinctQualifyingParticipants[p].size;
    const qualRate = regCount > 0 ? Math.round((qualCount / regCount) * 1000) / 10 : 0;
    const avgScore = quizCount > 0 ? Math.round((scoreTotals[p] / quizCount) * 10) / 10 : 0;

    return {
      platoon: p,
      label: `Platoon ${p}`,
      registeredParticipants: regCount,
      quizParticipants: quizCount,
      qualifyingParticipants: qualCount,
      qualificationRate: qualRate,
      averageScore: avgScore
    };
  });

  // Sort primarily by distinct qualifying participants count (highest first)
  competingPlatoons.sort((a, b) => b.qualifyingParticipants - a.qualifyingParticipants);

  // Compute ranks and detect ties
  const rankedPlatoons: PlatoonRankingItem[] = [];
  for (let i = 0; i < competingPlatoons.length; i++) {
    const current = competingPlatoons[i];
    
    // Check if tied with others
    const tiedWithOthers = competingPlatoons.some(
      (other, otherIdx) => otherIdx !== i && other.qualifyingParticipants === current.qualifyingParticipants
    );

    // Standard competition ranking (1224)
    let rank = 1;
    for (let j = 0; j < i; j++) {
      if (competingPlatoons[j].qualifyingParticipants > current.qualifyingParticipants) {
        rank = j + 2;
      }
    }

    const displayRank = tiedWithOthers
      ? `${rank} (Tie)`
      : `${rank}`;

    rankedPlatoons.push({
      ...current,
      rank,
      isTie: tiedWithOthers,
      displayRank
    });
  }

  // Add Unassigned row as non-competing
  const unassignedReg = registeredCounts[0] || 0;
  const unassignedQuiz = distinctQuizParticipants[0].size;
  const unassignedQual = distinctQualifyingParticipants[0].size;
  const unassignedRate = unassignedReg > 0 ? Math.round((unassignedQual / unassignedReg) * 1000) / 10 : 0;
  const unassignedAvg = unassignedQuiz > 0 ? Math.round((scoreTotals[0] / unassignedQuiz) * 10) / 10 : 0;

  const unassignedItem: PlatoonRankingItem = {
    platoon: 0,
    label: 'Unassigned (Non-competing)',
    registeredParticipants: unassignedReg,
    quizParticipants: unassignedQuiz,
    qualifyingParticipants: unassignedQual,
    qualificationRate: unassignedRate,
    averageScore: unassignedAvg,
    rank: 0,
    isTie: false,
    displayRank: '—'
  };

  // Find highest ranked platoon(s)
  const maxQualifying = rankedPlatoons.length > 0 ? rankedPlatoons[0].qualifyingParticipants : 0;
  const highestRankedPlatoons = maxQualifying > 0
    ? rankedPlatoons.filter((p) => p.qualifyingParticipants === maxQualifying)
    : [];

  const totalQuizParticipants = Object.values(distinctQuizParticipants).reduce(
    (acc, set) => acc + set.size,
    0
  );
  const totalQualifying = Object.values(distinctQualifyingParticipants).reduce(
    (acc, set) => acc + set.size,
    0
  );

  return {
    campaignId,
    quizRoundId,
    loadedAt: new Date().toLocaleTimeString(),
    platoonRankings: [...rankedPlatoons, unassignedItem],
    highestRankedPlatoons,
    totalRegistered,
    totalQuizParticipants,
    totalQualifying,
    unassignedResultsCount: unassignedCount,
    unverifiedResultsCount: unverifiedCount,
    invalidatedResultsCount: invalidatedCount,
    individualResults
  };
}

/**
 * Allows an authorized admin to mark a result invalid with a recorded reason
 * without deleting the audit trail.
 */
export async function invalidateQuizResult(
  resultId: string,
  reason: string
): Promise<void> {
  const docRef = doc(db, 'quizResults', resultId);
  const path = `quizResults/${resultId}`;

  try {
    await updateDoc(docRef, {
      status: 'invalidated',
      invalidationReason: reason.trim().substring(0, 500)
    });

    // Record audit log
    const auditCol = collection(db, 'adminAuditLogs');
    await addDoc(auditCol, {
      adminEmail: auth.currentUser?.email || 'authorized_admin',
      action: 'QUIZ_RESULT_INVALIDATION',
      details: `Invalidated quiz result ${resultId}: ${reason}`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

/**
 * Allows an authorized admin to mark an unverified result verified.
 */
export async function verifyQuizResult(resultId: string): Promise<void> {
  const docRef = doc(db, 'quizResults', resultId);
  const path = `quizResults/${resultId}`;

  try {
    await updateDoc(docRef, {
      status: 'verified'
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

/**
 * Formats quiz completion duration in seconds into a readable string (e.g., "1m 42s" or "45s").
 */
export function formatCompletionTime(seconds?: number | null): string {
  if (typeof seconds !== 'number' || Number.isNaN(seconds) || seconds < 0) {
    return '—';
  }
  const rounded = Math.round(seconds);
  const mins = Math.floor(rounded / 60);
  const secs = rounded % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs.toString().padStart(2, '0')}s`;
}

/**
 * Compares two quiz results for CDS member ranking:
 * 1. Highest score first (descending)
 * 2. Fastest completion time first (ascending; recorded times beat unrecorded)
 */
function compareQuizResultsForRank(a: QuizResultRecord, b: QuizResultRecord): number {
  if (b.score !== a.score) {
    return b.score - a.score;
  }
  const timeA = typeof a.timeTakenSeconds === 'number' ? a.timeTakenSeconds : Number.MAX_SAFE_INTEGER;
  const timeB = typeof b.timeTakenSeconds === 'number' ? b.timeTakenSeconds : Number.MAX_SAFE_INTEGER;
  if (timeA !== timeB) {
    return timeA - timeB;
  }
  return (a.submittedAt || '').localeCompare(b.submittedAt || '');
}

/**
 * Computes ranked CDS members in memory from loaded CDS participants and quiz results.
 * Zero additional Firestore reads when changing CDS group or category filters.
 */
export function computeCDSMemberRankings(
  cdsParticipants: ParticipantRegistration[],
  cdsQuizResults: QuizResultRecord[],
  cdsGroups: CDSGroup[],
  options?: {
    cdsGroupIdFilter?: string;
    categoryIdFilter?: string;
    qualifiedOnly?: boolean;
  }
): CDSMemberRankingItem[] {
  const groupFilter = options?.cdsGroupIdFilter || 'all';
  const catFilter = options?.categoryIdFilter || 'all';
  const qualifiedOnly = Boolean(options?.qualifiedOnly);

  const participantMap = new Map<string, ParticipantRegistration>();
  cdsParticipants.forEach((p) => {
    if (p.registrationId && p.cdsGroupId) {
      participantMap.set(p.registrationId, p);
    }
  });

  const groupNameMap = new Map<string, string>();
  cdsGroups.forEach((g) => {
    groupNameMap.set(g.id, g.name);
  });

  // Group valid quiz results by participantId (respecting group & category filters)
  const resultsByParticipant = new Map<string, QuizResultRecord[]>();

  cdsQuizResults.forEach((res) => {
    if (res.status === 'invalidated') return;
    const participant = participantMap.get(res.participantId);
    if (!participant || !participant.cdsGroupId) return;

    if (groupFilter !== 'all' && participant.cdsGroupId !== groupFilter) return;
    if (catFilter !== 'all' && (res.categoryId || '') !== catFilter) return;

    const existing = resultsByParticipant.get(res.participantId) || [];
    existing.push(res);
    resultsByParticipant.set(res.participantId, existing);
  });

  // Pick each member's best attempt (highest score, then fastest completion time)
  const unsortedMembers: Omit<CDSMemberRankingItem, 'rank' | 'isTie' | 'displayRank'>[] = [];

  resultsByParticipant.forEach((attempts, participantId) => {
    const participant = participantMap.get(participantId)!;
    const sortedAttempts = [...attempts].sort(compareQuizResultsForRank);
    const best = sortedAttempts[0];

    if (qualifiedOnly && !(best.score >= 6 && best.qualifying)) {
      return;
    }

    const timeSec =
      typeof best.timeTakenSeconds === 'number' && !Number.isNaN(best.timeTakenSeconds)
        ? Math.round(best.timeTakenSeconds)
        : null;

    const groupName =
      participant.cdsGroupName ||
      groupNameMap.get(participant.cdsGroupId || '') ||
      participant.cdsGroupId ||
      'CDS Group';

    unsortedMembers.push({
      participantId,
      memberName: `${participant.firstName || ''} ${participant.surname || ''}`.trim() || participantId,
      stateCode: participant.stateCode || '—',
      cdsGroupId: participant.cdsGroupId || '',
      cdsGroupName: groupName,
      categoryId: best.categoryId || 'general',
      categoryName: best.categoryName || best.categoryId || 'General Digital',
      score: best.score,
      totalQuestions: best.totalQuestions || 10,
      qualifying: Boolean(best.qualifying && best.score >= 6),
      timeTakenSeconds: timeSec,
      timeTakenDisplay: formatCompletionTime(timeSec),
      attemptsCount: attempts.length,
      submittedAt: best.submittedAt,
      status: best.status
    });
  });

  // Sort all members: highest score DESC, then fastest completion time ASC
  unsortedMembers.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const tA = a.timeTakenSeconds !== null ? a.timeTakenSeconds : Number.MAX_SAFE_INTEGER;
    const tB = b.timeTakenSeconds !== null ? b.timeTakenSeconds : Number.MAX_SAFE_INTEGER;
    if (tA !== tB) return tA - tB;
    return (a.submittedAt || '').localeCompare(b.submittedAt || '');
  });

  // Assign standard competition ranks (1224) with tie detection when score AND time match
  const isExactTie = (
    x: Omit<CDSMemberRankingItem, 'rank' | 'isTie' | 'displayRank'>,
    y: Omit<CDSMemberRankingItem, 'rank' | 'isTie' | 'displayRank'>
  ) => x.score === y.score && x.timeTakenSeconds === y.timeTakenSeconds;

  const ranked: CDSMemberRankingItem[] = [];
  for (let i = 0; i < unsortedMembers.length; i++) {
    const current = unsortedMembers[i];
    const tiedWithOthers = unsortedMembers.some(
      (other, otherIdx) => otherIdx !== i && isExactTie(current, other)
    );

    let rank = 1;
    if (i > 0 && isExactTie(current, unsortedMembers[i - 1])) {
      rank = ranked[i - 1].rank;
    } else {
      rank = i + 1;
    }

    ranked.push({
      ...current,
      rank,
      isTie: tiedWithOthers,
      displayRank: tiedWithOthers ? `${rank} (Tie)` : `${rank}`
    });
  }

  return ranked;
}

/**
 * Loads combined CDS group leaderboard AND CDS member performance data in 3 bounded queries.
 */
export async function loadCDSPerformanceDashboardData(
  campaignId: string = CURRENT_CAMPAIGN_ID,
  quizRoundId: string = CURRENT_QUIZ_ROUND_ID
): Promise<CDSPerformanceDashboardData> {
  try {
    const cdsCol = collection(db, 'cdsGroups');
    const partCol = collection(db, 'participants');
    const resCol = collection(db, 'quizResults');

    const [cdsSnap, partSnap, resSnap] = await Promise.all([
      getDocs(cdsCol),
      getDocs(query(partCol, where('campaignId', '==', campaignId), limit(2500))),
      getDocs(
        query(
          resCol,
          where('campaignId', '==', campaignId),
          where('quizRoundId', '==', quizRoundId),
          limit(2500)
        )
      )
    ]);

    const cdsGroups = cdsSnap.docs.map((d) => ({ ...d.data(), id: d.id } as CDSGroup));
    const allParticipants = partSnap.docs.map((d) => d.data() as ParticipantRegistration);
    const allResults = resSnap.docs.map((d) => ({ ...d.data(), id: d.id } as QuizResultRecord));

    const cdsParticipants = allParticipants.filter((p) => Boolean(p.cdsGroupId && p.cdsGroupId.trim()));
    const cdsParticipantIds = new Set(cdsParticipants.map((p) => p.registrationId));
    const cdsQuizResults = allResults.filter((r) => cdsParticipantIds.has(r.participantId));

    const groupRankings: CDSGroupRankingItem[] = cdsGroups
      .filter((g) => g.active || cdsParticipants.some((p) => p.cdsGroupId === g.id))
      .map((group) => {
        const groupParts = cdsParticipants.filter((p) => p.cdsGroupId === group.id);
        const groupPartIds = new Set(groupParts.map((p) => p.registrationId));
        const groupResults = cdsQuizResults.filter(
          (r) => groupPartIds.has(r.participantId) && r.status !== 'invalidated'
        );

        const distinctQualifying = new Set(
          groupResults
            .filter((r) => r.score >= 6 && r.qualifying)
            .map((r) => r.participantId)
        );
        const distinctQuizParticipants = new Set(groupResults.map((r) => r.participantId));
        const totalScore = groupResults.reduce((acc, r) => acc + r.score, 0);

        return {
          cdsGroupId: group.id,
          cdsGroupName: group.name,
          registeredCount: groupParts.length,
          quizParticipants: distinctQuizParticipants.size,
          qualifyingParticipants: distinctQualifying.size,
          qualificationRate:
            groupParts.length > 0
              ? Math.round((distinctQualifying.size / groupParts.length) * 100)
              : 0,
          averageScore:
            groupResults.length > 0
              ? Math.round((totalScore / groupResults.length) * 10) / 10
              : 0,
          academyLearnersCount: 0,
          completedAcademyCoursesCount: 0
        };
      })
      .sort((a, b) => b.qualifyingParticipants - a.qualifyingParticipants);

    return {
      campaignId,
      quizRoundId,
      loadedAt: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      groupRankings,
      totalCDSMembers: cdsParticipants.length,
      cdsParticipants,
      cdsQuizResults
    };
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'cds_performance');
    return {
      campaignId,
      quizRoundId,
      loadedAt: new Date().toLocaleTimeString(),
      groupRankings: [],
      totalCDSMembers: 0,
      cdsParticipants: [],
      cdsQuizResults: []
    };
  }
}

/**
 * Generates an aggregated report of performance by CDS group.
 * Costs: 1 read per participant + 1 read per quiz result.
 */
export async function loadCDSPerformanceReport(
  campaignId: string = CURRENT_CAMPAIGN_ID,
  quizRoundId: string = CURRENT_QUIZ_ROUND_ID
): Promise<CDSGroupRankingItem[]> {
  const data = await loadCDSPerformanceDashboardData(campaignId, quizRoundId);
  return data.groupRankings;
}

/**
 * Exports ranked CDS member quiz results to CSV and creates an admin audit log.
 */
export async function exportCDSMemberRankingsCSV(
  rankings: CDSMemberRankingItem[],
  adminEmail: string,
  filterSummary: string
): Promise<string> {
  const headers = [
    'Rank',
    'Member Name',
    'NYSC State Code',
    'CDS Group',
    'Quiz Category',
    'Score (Out of 10)',
    'Qualifying (>=6)',
    'Completion Time (Seconds)',
    'Completion Time',
    'Attempts Count',
    'Status',
    'Submitted At'
  ];

  const rows = rankings.map((m) =>
    [
      `"${m.displayRank}"`,
      `"${(m.memberName || '').replace(/"/g, '""')}"`,
      `"${(m.stateCode || '').replace(/"/g, '""')}"`,
      `"${(m.cdsGroupName || '').replace(/"/g, '""')}"`,
      `"${(m.categoryName || '').replace(/"/g, '""')}"`,
      m.score,
      m.qualifying ? 'YES' : 'NO',
      m.timeTakenSeconds !== null ? m.timeTakenSeconds : '',
      `"${m.timeTakenDisplay}"`,
      m.attemptsCount,
      `"${m.status}"`,
      `"${m.submittedAt || ''}"`
    ].join(',')
  );

  const csvContent = [headers.join(','), ...rows].join('\n');

  try {
    await addDoc(collection(db, 'adminAuditLogs'), {
      adminEmail,
      action: 'CSV_EXPORT',
      details: `Exported ${rankings.length} CDS member performance rankings (${filterSummary}).`,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.warn('Could not write audit log for CDS member CSV export:', err);
  }

  return csvContent;
}

