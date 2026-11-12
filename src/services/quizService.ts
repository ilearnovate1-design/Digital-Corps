import {
  QuizCategory,
  ClientQuizQuestion,
  QuizAttemptResult,
  QuizAttemptSession
} from '../types';
import { QUIZ_CATEGORIES } from '../data/categories';
import { generateQuizAttempt, evaluateQuizAttempt } from './quizEngine';
import { submitOfficialQuizResult, CURRENT_QUIZ_ROUND_ID } from './quizResultService';
import { CURRENT_CAMPAIGN_ID } from './participantService';

// Client-side session backup for offline resilient operation
const clientAttemptSessions = new Map<string, QuizAttemptSession>();

export async function fetchCategories(): Promise<QuizCategory[]> {
  try {
    const res = await fetch('/api/quiz/categories');
    if (res.ok) {
      const data = await res.json();
      if (data.categories && Array.isArray(data.categories)) {
        return data.categories;
      }
    }
  } catch (err) {
    console.warn('Using bundled categories fallback:', err);
  }
  return QUIZ_CATEGORIES;
}

export interface StartAttemptResponse {
  attemptId: string;
  categoryId: string;
  questions: ClientQuizQuestion[];
  durationSeconds: number;
}

/**
 * Initiates a quiz challenge attempt.
 * Server sends sanitized questions only (zero answers / explanations).
 */
export async function startQuizAttempt(
  categoryId: string,
  participantId: string = 'guest_user',
  recentQuestionIds: string[] = []
): Promise<StartAttemptResponse> {
  try {
    const res = await fetch('/api/quiz/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ categoryId, participantId, recentQuestionIds })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.questions) {
        return {
          attemptId: data.attemptId,
          categoryId: data.categoryId,
          questions: data.questions,
          durationSeconds: data.durationSeconds || 300
        };
      }
    }
  } catch (err) {
    console.warn('Server start failed, utilizing local engine fallback:', err);
  }

  // Resilient fallback (e.g. offline camp environment)
  const { session, clientQuestions } = generateQuizAttempt(
    categoryId,
    participantId,
    recentQuestionIds
  );
  clientAttemptSessions.set(session.attemptId, session);

  return {
    attemptId: session.attemptId,
    categoryId: session.categoryId,
    questions: clientQuestions,
    durationSeconds: session.durationSeconds
  };
}

export interface SubmitAttemptPayload {
  attemptId: string;
  categoryId: string;
  participantId: string;
  answers: Record<string, number>;
  timeTakenSeconds: number;
  platoon: number;
  campaignId?: string;
  quizRoundId?: string;
}

/**
 * Submits the completed attempt to the server for score calculation,
 * stores official result in Firestore, and returns performance review.
 */
export async function submitQuizAttempt(
  payload: SubmitAttemptPayload
): Promise<{ result: QuizAttemptResult; officialResultId?: string }> {
  let evaluatedResult: QuizAttemptResult | null = null;

  try {
    const res = await fetch('/api/quiz/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.result) {
        evaluatedResult = data.result;
      }
    }
  } catch (err) {
    console.warn('Server score calculation failed, using local evaluator fallback:', err);
  }

  if (!evaluatedResult) {
    const session = clientAttemptSessions.get(payload.attemptId);
    if (session) {
      evaluatedResult = evaluateQuizAttempt(
        session,
        payload.answers,
        payload.timeTakenSeconds,
        payload.platoon
      );
    } else {
      throw new Error('Unable to evaluate quiz: attempt session not found.');
    }
  }

  // Record verified score to Firestore `quizResults` for platoon ranking competition
  let officialResultId = '';
  if (payload.participantId && payload.participantId !== 'guest_user') {
    try {
      const submitRes = await submitOfficialQuizResult({
        participantId: payload.participantId,
        score: evaluatedResult.score,
        quizRoundId: payload.quizRoundId || CURRENT_QUIZ_ROUND_ID,
        campaignId: payload.campaignId || CURRENT_CAMPAIGN_ID,
        categoryId: payload.categoryId,
        categoryName: evaluatedResult.categoryName,
        platoon: payload.platoon,
        timeTakenSeconds: evaluatedResult.timeTakenSeconds,
        attemptId: payload.attemptId
      });
      if (submitRes.success) {
        officialResultId = submitRes.id;
      }
    } catch (e) {
      console.warn('Could not record official Firestore result:', e);
    }
  }

  return { result: evaluatedResult, officialResultId };
}
