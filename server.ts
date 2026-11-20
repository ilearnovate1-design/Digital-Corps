import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { QUIZ_CATEGORIES } from './src/data/categories';
import { generateQuizAttempt, evaluateQuizAttempt } from './src/services/quizEngine';
import { QuizAttemptSession, QuizAttemptResult } from './src/types';
import { ACADEMY_COURSES, getCourseById } from './src/data/academy/index';
import { generateQuestionCoverageReport } from './src/data/academy/questionObjectiveMappings';
import {
  WEB_DEV_PLACEMENT_QUESTIONS,
  evaluateWebDevPlacement
} from './src/data/academy/webdev/webDevPlacement';

// In-memory session store for anti-cheating session validation
const activeSessions = new Map<string, QuizAttemptSession>();
// Keep history of completed attempts for duplicate checks and stats
const completedResults = new Map<string, QuizAttemptResult>();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // 1. Health check
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'Digital Corps Hub Multi-Category Quiz Engine',
      timestamp: new Date().toISOString()
    });
  });

  // 2. GET Categories
  app.get('/api/quiz/categories', (_req, res) => {
    res.json({
      success: true,
      categories: QUIZ_CATEGORIES
    });
  });

  // 3. POST Start Attempt (Anti-cheating: client receives NO answers or explanations)
  app.post('/api/quiz/start', (req, res) => {
    try {
      const { categoryId, participantId = 'guest_user', recentQuestionIds = [] } = req.body;
      if (!categoryId) {
        return res.status(400).json({ success: false, error: 'categoryId is required' });
      }

      const { session, clientQuestions } = generateQuizAttempt(
        categoryId,
        participantId,
        recentQuestionIds
      );

      // Store session securely on server
      activeSessions.set(session.attemptId, session);

      // Clean up sessions older than 2 hours to avoid memory leaks
      const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000;
      for (const [id, s] of activeSessions.entries()) {
        if (new Date(s.startedAt).getTime() < twoHoursAgo) {
          activeSessions.delete(id);
        }
      }

      return res.json({
        success: true,
        attemptId: session.attemptId,
        categoryId: session.categoryId,
        questions: clientQuestions,
        durationSeconds: session.durationSeconds,
        expiresAt: session.expiresAt
      });
    } catch (err: any) {
      console.error('Error starting quiz attempt:', err);
      return res.status(500).json({ success: false, error: err?.message || 'Failed to start quiz attempt' });
    }
  });

  // 4. POST Submit Attempt (Server-side score calculation & duplicate prevention)
  app.post('/api/quiz/submit', (req, res) => {
    try {
      const {
        attemptId,
        answers = {},
        timeTakenSeconds = 0,
        platoon = 0
      } = req.body;

      if (!attemptId) {
        return res.status(400).json({ success: false, error: 'attemptId is required' });
      }

      const session = activeSessions.get(attemptId);
      if (!session) {
        // Check if already completed and returned
        const cached = completedResults.get(attemptId);
        if (cached) {
          return res.json({ success: true, result: cached, duplicateNotice: true });
        }
        return res.status(404).json({
          success: false,
          error: 'Quiz attempt session expired or invalid. Please start a new challenge.'
        });
      }

      if (session.submitted) {
        const cached = completedResults.get(attemptId);
        return res.json({ success: true, result: cached, duplicateNotice: true });
      }

      // Check time limit window: 300s + 45s grace period for network latency
      const maxAllowedSeconds = session.durationSeconds + 45;
      const cleanTimeTaken = Math.min(maxAllowedSeconds, Math.max(1, Number(timeTakenSeconds) || 1));

      // Execute official server evaluation
      const result = evaluateQuizAttempt(session, answers, cleanTimeTaken, platoon);

      // Mark session submitted to prevent duplicate scoring
      session.submitted = true;
      activeSessions.set(attemptId, session);
      completedResults.set(attemptId, result);

      return res.json({
        success: true,
        result
      });
    } catch (err: any) {
      console.error('Error submitting quiz attempt:', err);
      return res.status(500).json({ success: false, error: err?.message || 'Failed to submit quiz attempt' });
    }
  });

  // 5. GET Multi-Category Server Analytics
  app.get('/api/quiz/analytics', (_req, res) => {
    const totalAttempts = completedResults.size;
    const categoryCounts: Record<string, { attempts: number; qualified: number; totalScore: number }> = {};

    QUIZ_CATEGORIES.forEach((cat) => {
      categoryCounts[cat.id] = { attempts: 0, qualified: 0, totalScore: 0 };
    });

    for (const r of completedResults.values()) {
      if (!categoryCounts[r.categoryId]) {
        categoryCounts[r.categoryId] = { attempts: 0, qualified: 0, totalScore: 0 };
      }
      categoryCounts[r.categoryId].attempts++;
      categoryCounts[r.categoryId].totalScore += r.score;
      if (r.qualifying) {
        categoryCounts[r.categoryId].qualified++;
      }
    }

    res.json({
      success: true,
      totalAttempts,
      categoryStats: categoryCounts
    });
  });

  // =========================================================================
  // LEARNING ACADEMY (LMS) API ENDPOINTS
  // =========================================================================

  interface AcademyAssessmentSession {
    assessmentToken: string;
    courseId: string;
    participantId: string;
    questionIds: string[];
    optionPermutations: Record<string, number[]>; // questionId -> [origIndexAtPos0, origIndexAtPos1, ...]
    passThreshold: number;
    createdAt: number;
  }

  const academyAssessmentSessions = new Map<string, AcademyAssessmentSession>();
  const academyRuntimeConfig: {
    publishedOverrides: Record<string, boolean>;
    passMarkOverrides: Record<string, number>;
  } = {
    publishedOverrides: {},
    passMarkOverrides: {}
  };

  function shuffleArray<T>(arr: T[]): T[] {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  // 6. GET Academy Courses Summary
  app.get('/api/academy/courses', (_req, res) => {
    try {
      const summaries = ACADEMY_COURSES.map((c: any) => ({
        courseId: c.courseId,
        categoryId: c.categoryId,
        title: c.title,
        subtitle: c.subtitle,
        description: c.description,
        difficulty: c.difficulty,
        level: c.level,
        prerequisites: c.prerequisites || [],
        targetAudience: c.targetAudience,
        expectedDuration: c.expectedDuration,
        moduleCount: c.modules.length,
        lessonCount: c.modules.reduce((acc: number, m: any) => acc + m.lessons.length, 0),
        passThreshold:
          academyRuntimeConfig.passMarkOverrides[c.courseId] ??
          c.completionCriteria?.requiredFinalAssessmentPassScore ??
          70,
        themeColor: c.themeColor,
        iconName: c.iconName,
        active:
          academyRuntimeConfig.publishedOverrides[c.courseId] !== undefined
            ? academyRuntimeConfig.publishedOverrides[c.courseId]
            : c.active
      }));
      res.json({ success: true, courses: summaries });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e?.message });
    }
  });

  // 6b. GET / POST Academy Global Config Overrides (Pass Marks & Publish Status)
  app.get('/api/academy/config', (_req, res) => {
    res.json({ success: true, config: academyRuntimeConfig });
  });

  app.post('/api/academy/config', (req, res) => {
    try {
      const { publishedOverrides, passMarkOverrides } = req.body || {};
      if (publishedOverrides && typeof publishedOverrides === 'object') {
        academyRuntimeConfig.publishedOverrides = {
          ...academyRuntimeConfig.publishedOverrides,
          ...publishedOverrides
        };
      }
      if (passMarkOverrides && typeof passMarkOverrides === 'object') {
        for (const [k, v] of Object.entries(passMarkOverrides)) {
          const num = Number(v);
          if (!Number.isNaN(num) && num >= 40 && num <= 100) {
            academyRuntimeConfig.passMarkOverrides[k] = Math.round(num);
          }
        }
      }
      res.json({ success: true, config: academyRuntimeConfig });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e?.message });
    }
  });

  // 7. GET Question-to-Course Coverage Report
  app.get('/api/academy/coverage', (_req, res) => {
    try {
      const report = generateQuestionCoverageReport();
      res.json({ success: true, report });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e?.message });
    }
  });

  // 7b. POST Start Randomized Course Final Assessment (NO answers/explanations exposed)
  app.post('/api/academy/start-assessment', (req, res) => {
    try {
      const { courseId, participantId = 'guest_learner' } = req.body || {};
      const course = getCourseById(courseId);
      if (!course) {
        return res.status(404).json({ success: false, error: 'Course not found' });
      }

      const isPublished =
        academyRuntimeConfig.publishedOverrides[courseId] !== undefined
          ? academyRuntimeConfig.publishedOverrides[courseId]
          : course.active;
      if (!isPublished) {
        return res.status(403).json({ success: false, error: 'This course is currently unpublished.' });
      }

      const passThreshold =
        academyRuntimeConfig.passMarkOverrides[courseId] ??
        course.completionCriteria.requiredFinalAssessmentPassScore ??
        70;

      const shuffledQuestions = shuffleArray(course.finalAssessment);
      const optionPermutations: Record<string, number[]> = {};
      const clientQuestions = shuffledQuestions.map((q) => {
        const idxPerm = shuffleArray(q.options.map((_, idx) => idx));
        optionPermutations[q.id] = idxPerm;
        return {
          id: q.id,
          questionText: q.questionText,
          options: idxPerm.map((origIdx) => q.options[origIdx]),
          moduleId: q.moduleId
        };
      });

      const assessmentToken = `asm_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      academyAssessmentSessions.set(assessmentToken, {
        assessmentToken,
        courseId,
        participantId,
        questionIds: shuffledQuestions.map((q) => q.id),
        optionPermutations,
        passThreshold,
        createdAt: Date.now()
      });

      // Prune expired sessions (> 4 hours)
      const fourHoursAgo = Date.now() - 4 * 60 * 60 * 1000;
      for (const [token, s] of academyAssessmentSessions.entries()) {
        if (s.createdAt < fourHoursAgo) {
          academyAssessmentSessions.delete(token);
        }
      }

      return res.json({
        success: true,
        assessmentToken,
        courseId: course.courseId,
        courseTitle: course.title,
        totalQuestions: clientQuestions.length,
        passThreshold,
        questions: clientQuestions
      });
    } catch (e: any) {
      return res.status(500).json({ success: false, error: e?.message || 'Failed to start assessment' });
    }
  });

  // 8. POST Evaluate Course Final Assessment (Server-authoritative scoring & review)
  app.post('/api/academy/evaluate-assessment', (req, res) => {
    try {
      const { courseId, assessmentToken, answers = {} } = req.body || {};
      const course = getCourseById(courseId);
      if (!course) {
        return res.status(404).json({ success: false, error: 'Course not found' });
      }

      const session = assessmentToken ? academyAssessmentSessions.get(assessmentToken) : undefined;
      const effectivePassThreshold =
        session?.passThreshold ??
        academyRuntimeConfig.passMarkOverrides[courseId] ??
        course.completionCriteria.requiredFinalAssessmentPassScore ??
        70;

      const orderedQuestions =
        session && session.courseId === courseId
          ? session.questionIds
              .map((qId) => course.finalAssessment.find((q) => q.id === qId))
              .filter((q): q is NonNullable<typeof q> => Boolean(q))
          : course.finalAssessment;

      let score = 0;
      const total = orderedQuestions.length;
      const moduleStats: Record<string, { score: number; total: number }> = {};

      const results = orderedQuestions.map((q) => {
        const perm = session?.optionPermutations[q.id];
        const presentedOptions = perm ? perm.map((origIdx) => q.options[origIdx]) : q.options;
        const presentedCorrectAnswer = perm ? perm.indexOf(q.correctAnswer) : q.correctAnswer;

        const rawUserAnswer = answers[q.id];
        const hasAnswer = rawUserAnswer !== undefined && rawUserAnswer !== null;
        const isCorrect = hasAnswer && Number(rawUserAnswer) === presentedCorrectAnswer;
        if (isCorrect) score++;

        if (q.moduleId) {
          if (!moduleStats[q.moduleId]) {
            moduleStats[q.moduleId] = { score: 0, total: 0 };
          }
          moduleStats[q.moduleId].total++;
          if (isCorrect) moduleStats[q.moduleId].score++;
        }

        return {
          id: q.id,
          moduleId: q.moduleId,
          questionText: q.questionText,
          options: presentedOptions,
          userAnswer: hasAnswer ? Number(rawUserAnswer) : null,
          correctAnswer: presentedCorrectAnswer,
          isCorrect,
          explanation: q.explanation
        };
      });

      const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
      const passed = percentage >= effectivePassThreshold;
      const evaluatedAt = new Date().toISOString();
      const verificationToken = `vrf_${courseId}_${Date.now().toString(36)}_${score}of${total}`;

      const evaluation = {
        courseId,
        assessmentToken: assessmentToken || null,
        verificationToken,
        score,
        total,
        percentage,
        passThreshold: effectivePassThreshold,
        passed,
        evaluatedAt,
        moduleBreakdown: moduleStats,
        results
      };

      res.json({
        success: true,
        evaluation,
        courseId,
        score,
        total,
        percentage,
        passThreshold: effectivePassThreshold,
        passed,
        review: results
      });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e?.message });
    }
  });

  // 9. Web Development Placement Assessment (Anti-cheat: answers stripped on start)
  interface PlacementSession {
    placementToken: string;
    participantId: string;
    optionPermutations: Record<string, number[]>;
    createdAt: number;
  }
  const placementSessions = new Map<string, PlacementSession>();

  app.post('/api/academy/placement/start', (req, res) => {
    try {
      const { participantId = 'guest_learner' } = req.body || {};
      const optionPermutations: Record<string, number[]> = {};
      const clientQuestions = WEB_DEV_PLACEMENT_QUESTIONS.map((q) => {
        const idxPerm = shuffleArray(q.options.map((_, idx) => idx));
        optionPermutations[q.id] = idxPerm;
        return {
          id: q.id,
          domain: q.domain,
          tier: q.tier,
          questionText: q.questionText,
          options: idxPerm.map((origIdx) => q.options[origIdx])
        };
      });

      const placementToken = `plc_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      placementSessions.set(placementToken, {
        placementToken,
        participantId,
        optionPermutations,
        createdAt: Date.now()
      });

      const fourHoursAgo = Date.now() - 4 * 60 * 60 * 1000;
      for (const [token, s] of placementSessions.entries()) {
        if (s.createdAt < fourHoursAgo) placementSessions.delete(token);
      }

      return res.json({
        success: true,
        placementToken,
        totalQuestions: clientQuestions.length,
        questions: clientQuestions
      });
    } catch (e: any) {
      return res.status(500).json({ success: false, error: e?.message || 'Failed to start placement check.' });
    }
  });

  app.post('/api/academy/placement/evaluate', (req, res) => {
    try {
      const { placementToken, answers = {} } = req.body || {};
      const session = placementToken ? placementSessions.get(placementToken) : undefined;
      const evaluation = evaluateWebDevPlacement(answers, session?.optionPermutations);

      const review = WEB_DEV_PLACEMENT_QUESTIONS.map((q) => {
        const perm = session?.optionPermutations[q.id];
        const presentedOptions = perm ? perm.map((origIdx) => q.options[origIdx]) : q.options;
        const presentedCorrect = perm ? perm.indexOf(q.correctAnswer) : q.correctAnswer;
        const rawUser = answers[q.id];
        const hasAnswer = rawUser !== undefined && rawUser !== null;
        return {
          id: q.id,
          domain: q.domain,
          questionText: q.questionText,
          options: presentedOptions,
          userAnswer: hasAnswer ? Number(rawUser) : null,
          correctAnswer: presentedCorrect,
          isCorrect: hasAnswer && Number(rawUser) === presentedCorrect,
          explanation: q.explanation
        };
      });

      return res.json({
        success: true,
        result: evaluation,
        review
      });
    } catch (e: any) {
      return res.status(500).json({ success: false, error: e?.message || 'Failed to evaluate placement check.' });
    }
  });

  // Mount Vite or static files
  if (process.env.NODE_ENV === 'production') {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Digital Corps Hub server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
