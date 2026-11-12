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
  if (typeof params.timeTakenSeconds === 'number') payload.timeTakenSeconds = params.timeTakenSeconds;

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
 * Generates an aggregated report of performance by CDS group.
 * Costs: 1 read per participant + 1 read per quiz result.
 */
export async function loadCDSPerformanceReport(
  campaignId: string = CURRENT_CAMPAIGN_ID,
  quizRoundId: string = CURRENT_QUIZ_ROUND_ID
): Promise<CDSGroupRankingItem[]> {
  try {
    const cdsCol = collection(db, 'cdsGroups');
    const partCol = collection(db, 'participants');
    const resCol = collection(db, 'quizResults');

    // 1. Fetch data
    const [cdsSnap, partSnap, resSnap] = await Promise.all([
      getDocs(query(cdsCol, where('active', '==', true))),
      getDocs(query(partCol, where('campaignId', '==', campaignId))),
      getDocs(query(resCol, where('quizRoundId', '==', quizRoundId)))
    ]);

    const cdsGroups = cdsSnap.docs.map(d => ({ ...d.data(), id: d.id } as CDSGroup));
    const participants = partSnap.docs.map(d => d.data() as ParticipantRegistration);
    const results = resSnap.docs.map(d => d.data() as QuizResultRecord);

    // 2. Aggregate
    const report: CDSGroupRankingItem[] = cdsGroups.map(group => {
      const groupParts = participants.filter(p => p.cdsGroupId === group.id);
      const groupResults = results.filter(r => {
        const p = participants.find(part => part.registrationId === r.participantId);
        return p?.cdsGroupId === group.id && r.status !== 'invalidated';
      });

      const distinctQualifying = new Set(
        groupResults
          .filter(r => r.score >= 6 && r.qualifying)
          .map(r => r.participantId)
      );

      const distinctQuizParticipants = new Set(groupResults.map(r => r.participantId));
      const totalScore = groupResults.reduce((acc, r) => acc + r.score, 0);

      return {
        cdsGroupId: group.id,
        cdsGroupName: group.name,
        registeredCount: groupParts.length,
        quizParticipants: distinctQuizParticipants.size,
        qualifyingParticipants: distinctQualifying.size,
        qualificationRate: groupParts.length > 0 ? Math.round((distinctQualifying.size / groupParts.length) * 100) : 0,
        averageScore: distinctQuizParticipants.size > 0 ? Math.round((totalScore / groupResults.length) * 10) / 10 : 0,
        academyLearnersCount: 0,
        completedAcademyCoursesCount: 0
      };
    });

    return report.sort((a, b) => b.qualifyingParticipants - a.qualifyingParticipants);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'cds_performance');
    return [];
  }
}

