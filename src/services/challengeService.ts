import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/errorHandling';
import { ChallengeSubmission } from '../types';
import { CURRENT_CAMPAIGN_ID } from './participantService';

export async function submitChallengeSolution(
  submission: Omit<ChallengeSubmission, 'createdAt' | 'campaignId'>,
  stableSubmissionId?: string
): Promise<{ id: string; success: boolean; offline?: boolean }> {
  // Use stable ID to prevent duplicates if user retries on intermittent network
  const docId = stableSubmissionId && stableSubmissionId.length >= 6
    ? stableSubmissionId
    : `sub_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 8)}`;

  const docRef = doc(db, 'challengeSubmissions', docId);
  const path = `challengeSubmissions/${docId}`;

  const payload: Record<string, any> = {
    participantName: submission.participantName.trim().substring(0, 100),
    solutionTitle: submission.solutionTitle.trim().substring(0, 120),
    solutionSummary: submission.solutionSummary.trim().substring(0, 1200),
    campaignId: CURRENT_CAMPAIGN_ID,
    createdAt: serverTimestamp(),
  };

  if (submission.participantReference && submission.participantReference.trim()) {
    payload.participantReference = submission.participantReference.trim().toUpperCase().substring(0, 40);
  }
  if (typeof submission.platoon === 'number' && submission.platoon >= 0 && submission.platoon <= 10) {
    payload.platoon = submission.platoon;
  }
  if (submission.actionPlan30Days && submission.actionPlan30Days.trim()) {
    payload.actionPlan30Days = submission.actionPlan30Days.trim().substring(0, 1000);
  }

  try {
    // 1 single blind write, 0 reads with strict 4-second timeout
    const writePromise = setDoc(docRef, payload);
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('TIMEOUT: Network request timed out while contacting Firestore database.')), 4000)
    );

    await Promise.race([writePromise, timeoutPromise]);
    return { id: docId, success: true };
  } catch (error) {
    try {
      const stored = localStorage.getItem('pending_challenge_submissions');
      const list = stored ? JSON.parse(stored) : [];
      list.push({ ...payload, createdAt: new Date().toISOString() });
      localStorage.setItem('pending_challenge_submissions', JSON.stringify(list.slice(-30)));
    } catch {
      // Ignore
    }
    console.warn('Challenge saved locally due to network:', error);
    return { id: docId, success: true, offline: true };
  }
}
