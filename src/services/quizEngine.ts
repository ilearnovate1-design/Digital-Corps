import {
  BankQuestion,
  ClientQuizQuestion,
  QuizAttemptSession,
  QuizAttemptResult,
  QuizReviewItem,
  PerformanceBand
} from '../types';
import { QUESTION_BANK, getQuestionsByCategory } from '../data/questionBank';
import { getCategoryById } from '../data/categories';

/**
 * Fisher-Yates shuffle array in place and return a new copy
 */
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Generates an attempt with balanced distribution:
 * - 4 Beginner
 * - 4 Intermediate
 * - 2 Advanced
 * Shuffles question order and shuffles options for each question.
 * Strips out correctAnswer and explanation so client cannot inspect or cheat.
 */
export function generateQuizAttempt(
  categoryId: string,
  participantId: string = 'guest_user',
  recentQuestionIds: string[] = []
): { session: QuizAttemptSession; clientQuestions: ClientQuizQuestion[] } {
  const allCategoryQuestions = getQuestionsByCategory(categoryId);
  if (allCategoryQuestions.length === 0) {
    throw new Error(`Category "${categoryId}" not found or has no active questions.`);
  }

  // Filter out recently seen questions if enough remaining pool
  const recentSet = new Set(recentQuestionIds);
  const freshQuestions = allCategoryQuestions.filter((q) => !recentSet.has(q.questionId));
  const pool = freshQuestions.length >= 10 ? freshQuestions : allCategoryQuestions;

  const beginnerPool = pool.filter((q) => q.difficulty === 'beginner');
  const intermediatePool = pool.filter((q) => q.difficulty === 'intermediate');
  const advancedPool = pool.filter((q) => q.difficulty === 'advanced');

  // Fallback to general pool if a tier is underfilled
  const selected: BankQuestion[] = [];

  const pickFromTier = (tierPool: BankQuestion[], count: number) => {
    const shuffledTier = shuffle(tierPool);
    for (const q of shuffledTier) {
      if (selected.length >= 10) break;
      if (!selected.some((s) => s.questionId === q.questionId) && count > 0) {
        selected.push(q);
        count--;
      }
    }
  };

  pickFromTier(beginnerPool, 4);
  pickFromTier(intermediatePool, 4);
  pickFromTier(advancedPool, 2);

  // If still under 10, fill from remaining
  if (selected.length < 10) {
    const remaining = shuffle(allCategoryQuestions.filter(
      (q) => !selected.some((s) => s.questionId === q.questionId)
    ));
    for (const q of remaining) {
      if (selected.length >= 10) break;
      selected.push(q);
    }
  }

  // Randomise question presentation order
  const finalQuestionOrder = shuffle(selected);

  // Prepare sanitized client questions and server-side shuffle key mapping
  const clientQuestions: ClientQuizQuestion[] = [];
  const shuffledKeyMap: Record<string, number[]> = {};
  const questionIds: string[] = [];

  finalQuestionOrder.forEach((q) => {
    questionIds.push(q.questionId);

    // Create option indices [0, 1, 2, 3] and shuffle them
    const indices = [0, 1, 2, 3];
    const permutedIndices = shuffle(indices);
    shuffledKeyMap[q.questionId] = permutedIndices;

    const shuffledOptions = permutedIndices.map((origIdx) => q.options[origIdx]);

    clientQuestions.push({
      questionId: q.questionId,
      categoryId: q.categoryId,
      questionText: q.questionText,
      options: shuffledOptions,
      difficulty: q.difficulty
    });
  });

  const now = new Date();
  const expires = new Date(now.getTime() + 300 * 1000); // 5 minutes (300s)
  const attemptId = `att_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  const session: QuizAttemptSession = {
    attemptId,
    participantId,
    categoryId,
    startedAt: now.toISOString(),
    expiresAt: expires.toISOString(),
    durationSeconds: 300,
    questionIds,
    shuffledKeyMap,
    submitted: false
  };

  return { session, clientQuestions };
}

/**
 * Validates a submitted attempt, checks answers against the question bank,
 * calculates score, determines qualification and performance band, and generates review.
 */
export function evaluateQuizAttempt(
  session: QuizAttemptSession,
  answers: Record<string, number>,
  timeTakenSeconds: number,
  platoon: number = 0
): QuizAttemptResult {
  const category = getCategoryById(session.categoryId);
  const categoryName = category?.name || 'Digital Skills Challenge';
  const recommendedTrackId = category?.associatedTrackId || 'track-ai-content';

  let score = 0;
  const review: QuizReviewItem[] = [];

  session.questionIds.forEach((qId) => {
    const bankQuestion = QUESTION_BANK.find((q) => q.questionId === qId);
    if (!bankQuestion) return;

    const permutedIndices = session.shuffledKeyMap?.[qId] || [0, 1, 2, 3];
    const clientOptions = permutedIndices.map((origIdx) => bankQuestion.options[origIdx]);

    // The user's chosen index in the shuffled options (0-3)
    const clientSelectedIdx = answers[qId] !== undefined ? answers[qId] : null;

    // What original index does clientSelectedIdx correspond to?
    const originalSelectedIdx = clientSelectedIdx !== null && clientSelectedIdx >= 0 && clientSelectedIdx < permutedIndices.length
      ? permutedIndices[clientSelectedIdx]
      : null;

    const isCorrect = originalSelectedIdx !== null && originalSelectedIdx === bankQuestion.correctAnswer;
    if (isCorrect) {
      score++;
    }

    // What index in the CLIENT's shuffled options was the correct answer?
    const clientCorrectIdx = permutedIndices.indexOf(bankQuestion.correctAnswer);

    review.push({
      questionId: qId,
      questionText: bankQuestion.questionText,
      options: clientOptions,
      selectedAnswer: clientSelectedIdx,
      correctAnswer: clientCorrectIdx >= 0 ? clientCorrectIdx : bankQuestion.correctAnswer,
      isCorrect,
      explanation: bankQuestion.explanation,
      difficulty: bankQuestion.difficulty
    });
  });

  const total = 10;
  const percentage = Math.round((score / total) * 100);
  const qualifying = score >= 6;

  let performanceBand: PerformanceBand = 'Keep Practising';
  let performanceFeedback = '';

  if (score >= 10) {
    performanceBand = 'Outstanding';
    performanceFeedback = 'Flawless score! Master level performance in this digital domain. You are fully equipped to mentor others.';
  } else if (score >= 8) {
    performanceBand = 'Excellent';
    performanceFeedback = 'Outstanding command of practical digital skills! You are well-positioned for high-value digital and remote contracts.';
  } else if (score >= 6) {
    performanceBand = 'Qualified';
    performanceFeedback = 'Congratulations! You have verified your readiness and earned an official qualifying point for your platoon on the leaderboard.';
  } else if (score >= 4) {
    performanceBand = 'Getting There';
    performanceFeedback = 'Good effort! Review the detailed question explanations below to build confidence and reach the 6/10 qualification mark.';
  } else {
    performanceBand = 'Keep Practising';
    performanceFeedback = 'Review the foundational learning track resources below, take notes, and retry when you are ready to improve your score.';
  }

  // Format time taken display
  const minutes = Math.floor(timeTakenSeconds / 60);
  const seconds = timeTakenSeconds % 60;
  const timeTakenDisplay = `${minutes}m ${seconds.toString().padStart(2, '0')}s`;

  return {
    attemptId: session.attemptId,
    participantId: session.participantId,
    categoryId: session.categoryId,
    categoryName,
    score,
    total,
    percentage,
    qualifying,
    performanceBand,
    performanceFeedback,
    timeTakenSeconds,
    timeTakenDisplay,
    platoon,
    review,
    recommendedTrackId,
    recommendedTrackTitle: category?.name || 'Recommended Digital Track',
    submittedAt: new Date().toISOString()
  };
}
