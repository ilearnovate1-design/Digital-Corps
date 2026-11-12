import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { QUIZ_CATEGORIES } from './src/data/categories';
import { generateQuizAttempt, evaluateQuizAttempt } from './src/services/quizEngine';
import { QuizAttemptSession, QuizAttemptResult } from './src/types';
import { ACADEMY_COURSES, getCourseById } from './src/data/academy/index';
import { generateQuestionCoverageReport } from './src/data/academy/questionObjectiveMappings';

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

  // 6. GET Academy Courses Summary
  app.get('/api/academy/courses', (_req, res) => {
    try {
      const summaries = ACADEMY_COURSES.map((c: any) => ({
        courseId: c.courseId,
        categoryId: c.categoryId,
        title: c.title,
        description: c.description,
        targetAudience: c.targetAudience,
        expectedDuration: c.expectedDuration,
        moduleCount: c.modules.length,
        lessonCount: c.modules.reduce((acc: number, m: any) => acc + m.lessons.length, 0),
        themeColor: c.themeColor,
        iconName: c.iconName,
        active: c.active
      }));
      res.json({ success: true, courses: summaries });
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

  // 8. POST Evaluate Course Final Assessment (Server-authoritative scoring)
  app.post('/api/academy/evaluate-assessment', (req, res) => {
    try {
      const { courseId, answers = {} } = req.body;
      const course = getCourseById(courseId);
      if (!course) {
        return res.status(404).json({ success: false, error: 'Course not found' });
      }

      let score = 0;
      const total = course.finalAssessment.length;
      const review = course.finalAssessment.map((q: any) => {
        const userAnswer = answers[q.id];
        const isCorrect = userAnswer !== undefined && userAnswer === q.correctAnswer;
        if (isCorrect) score++;
        return {
          id: q.id,
          questionText: q.questionText,
          options: q.options,
          userAnswer: userAnswer !== undefined ? userAnswer : null,
          correctAnswer: q.correctAnswer,
          isCorrect,
          explanation: q.explanation
        };
      });

      const percentage = Math.round((score / total) * 100);
      const passed = percentage >= course.completionCriteria.requiredFinalAssessmentPassScore;

      res.json({
        success: true,
        courseId,
        score,
        total,
        percentage,
        passThreshold: course.completionCriteria.requiredFinalAssessmentPassScore,
        passed,
        review
      });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e?.message });
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
