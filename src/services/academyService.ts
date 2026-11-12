import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  limit
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/errorHandling';
import {
  ParticipantCourseProgress,
  CourseProjectSubmission,
  AcademyCourse
} from '../types';
import { getCourseById } from '../data/academy';

const LOCAL_STORAGE_PROGRESS_PREFIX = 'dch_academy_progress_';

/**
 * Loads progress for a specific course and participant.
 * Uses client localStorage caching with Firestore persistence.
 */
export async function getParticipantCourseProgress(
  participantId: string,
  courseId: string
): Promise<ParticipantCourseProgress> {
  const localKey = `${LOCAL_STORAGE_PROGRESS_PREFIX}${courseId}_${participantId}`;

  // 1. Try local cache first for instant responsiveness & zero quota cost
  try {
    const cached = localStorage.getItem(localKey);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (e) {
    console.warn('Error reading local course progress', e);
  }

  const defaultProgress: ParticipantCourseProgress = {
    participantId,
    courseId,
    enrolledAt: new Date().toISOString(),
    lastAccessedAt: new Date().toISOString(),
    completedLessonIds: [],
    completedModuleIds: [],
    moduleCheckScores: {},
    courseStatus: 'not_started',
    progressPercentage: 0
  };

  // 2. Query Firestore if online
  const docId = `${courseId}_${participantId}`;
  const docRef = doc(db, 'learningProgress', docId);

  try {
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data() as ParticipantCourseProgress;
      try {
        localStorage.setItem(localKey, JSON.stringify(data));
      } catch (e) {}
      return data;
    }
  } catch (error) {
    console.warn('Firestore progress load error (using default):', error);
  }

  return defaultProgress;
}

/**
 * Saves updated progress to both localStorage and Firestore.
 */
export async function saveParticipantCourseProgress(
  progress: ParticipantCourseProgress
): Promise<void> {
  const localKey = `${LOCAL_STORAGE_PROGRESS_PREFIX}${progress.courseId}_${progress.participantId}`;
  progress.lastAccessedAt = new Date().toISOString();

  // Calculate percentage
  const course = getCourseById(progress.courseId);
  if (course) {
    let totalLessons = 0;
    course.modules.forEach((m) => {
      totalLessons += m.lessons.length;
    });

    if (totalLessons > 0) {
      const completedCount = progress.completedLessonIds.length;
      progress.progressPercentage = Math.min(100, Math.round((completedCount / totalLessons) * 100));

      if (progress.progressPercentage === 100) {
        progress.courseStatus = 'completed';
      } else if (completedCount > 0) {
        progress.courseStatus = 'in_progress';
      }
    }
  }

  // 1. Immediate local save
  try {
    localStorage.setItem(localKey, JSON.stringify(progress));
  } catch (e) {
    console.warn('Error saving local course progress', e);
  }

  // 2. Fire-and-forget or background Firestore sync
  const docId = `${progress.courseId}_${progress.participantId}`;
  const docRef = doc(db, 'learningProgress', docId);

  try {
    await setDoc(docRef, progress, { merge: true });
  } catch (error) {
    console.warn('Firestore progress sync deferred:', error);
  }
}

/**
 * Marks a specific lesson as completed and recalculates module status.
 */
export async function markLessonCompleted(
  participantId: string,
  courseId: string,
  moduleId: string,
  lessonId: string,
  knowledgeCheckScore?: number
): Promise<ParticipantCourseProgress> {
  const progress = await getParticipantCourseProgress(participantId, courseId);

  if (!progress.completedLessonIds.includes(lessonId)) {
    progress.completedLessonIds.push(lessonId);
  }
  progress.lastAccessedLessonId = lessonId;

  if (knowledgeCheckScore !== undefined) {
    progress.moduleCheckScores[moduleId] = Math.max(
      progress.moduleCheckScores[moduleId] || 0,
      knowledgeCheckScore
    );
  }

  // Check if all lessons in module are complete
  const course = getCourseById(courseId);
  if (course) {
    const mod = course.modules.find((m) => m.moduleId === moduleId);
    if (mod) {
      const allModLessonsCompleted = mod.lessons.every((l) =>
        progress.completedLessonIds.includes(l.lessonId)
      );
      if (allModLessonsCompleted && !progress.completedModuleIds.includes(moduleId)) {
        progress.completedModuleIds.push(moduleId);
      }
    }
  }

  await saveParticipantCourseProgress(progress);
  return progress;
}

/**
 * Submits a capstone project for review.
 */
export async function submitCapstoneProject(
  submission: Omit<CourseProjectSubmission, 'submissionId' | 'submittedAt' | 'submissionStatus'>
): Promise<{ success: boolean; submissionId: string; error?: string }> {
  const submissionId = `proj_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const now = new Date().toISOString();

  const payload: CourseProjectSubmission = {
    ...submission,
    submissionId,
    submissionStatus: 'submitted',
    submittedAt: now
  };

  const docRef = doc(db, 'courseProjectSubmissions', submissionId);

  try {
    await setDoc(docRef, payload);

    // Update student progress record to note submission
    const progress = await getParticipantCourseProgress(submission.participantId, submission.courseId);
    progress.capstoneSubmissionId = submissionId;
    progress.capstoneCompleted = true;
    await saveParticipantCourseProgress(progress);

    return { success: true, submissionId };
  } catch (error: any) {
    console.error('Error submitting capstone project:', error);
    return { success: false, submissionId, error: 'Failed to submit project to database.' };
  }
}

/**
 * Loads recent project submissions for coordinator review.
 */
export async function loadRecentProjectSubmissions(
  limitCount = 50
): Promise<CourseProjectSubmission[]> {
  try {
    const colRef = collection(db, 'courseProjectSubmissions');
    const q = query(colRef, limit(limitCount));
    const snap = await getDocs(q);

    const items: CourseProjectSubmission[] = [];
    snap.forEach((d) => {
      items.push(d.data() as CourseProjectSubmission);
    });

    return items;
  } catch (error) {
    console.error('Error loading project submissions:', error);
    return [];
  }
}

/**
 * Reviews a project submission (Coordinator action).
 */
export async function reviewProjectSubmission(
  submissionId: string,
  status: 'approved' | 'revision_requested',
  feedback: string,
  reviewedBy: string
): Promise<void> {
  const docRef = doc(db, 'courseProjectSubmissions', submissionId);
  await updateDoc(docRef, {
    submissionStatus: status,
    status,
    reviewerFeedback: feedback,
    coordinatorFeedback: feedback,
    reviewedBy,
    updatedAt: new Date().toISOString()
  });
}

/**
 * Loads all course progress for a participant across all active courses.
 */
export async function getParticipantAllCourseProgress(
  participantId: string
): Promise<Record<string, ParticipantCourseProgress>> {
  const courses = [
    'course_ai_literacy',
    'course_career_readiness',
    'course_digital_entrepreneurship',
    'course_digital_foundations',
    'course_digital_productivity',
    'course_spreadsheet_mastery'
  ];

  const results: Record<string, ParticipantCourseProgress> = {};
  for (const cId of courses) {
    results[cId] = await getParticipantCourseProgress(participantId, cId);
  }
  return results;
}

/**
 * Saves lesson completion progress.
 */
export async function saveLessonProgress(
  participantId: string,
  courseId: string,
  _participantName: string,
  lessonProgress: {
    lessonId: string;
    moduleId: string;
    completed: boolean;
    completedAt: string;
    knowledgeCheckScore?: number;
  }
): Promise<ParticipantCourseProgress> {
  return markLessonCompleted(
    participantId,
    courseId,
    lessonProgress.moduleId,
    lessonProgress.lessonId,
    lessonProgress.knowledgeCheckScore
  );
}

/**
 * Submits course project from participant.
 */
export async function submitCourseProject(
  participantId: string,
  participantName: string,
  participantCallUpNumber: string,
  participantPlatoon: string,
  courseId: string,
  projectTitle: string,
  projectDescription: string,
  artifactUrl: string
): Promise<CourseProjectSubmission> {
  const submissionId = `proj_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const now = new Date().toISOString();

  const sub: CourseProjectSubmission = {
    id: submissionId,
    submissionId,
    participantId,
    participantName,
    participantCallUpNumber,
    participantPlatoon,
    courseId,
    projectTitle,
    projectDescription,
    artifactUrl,
    submissionStatus: 'submitted',
    status: 'submitted',
    submittedAt: now
  };

  await submitCapstoneProject(sub);
  return sub;
}

/**
 * Loads submissions for a given participant.
 */
export async function loadParticipantCourseSubmissions(
  participantId: string
): Promise<CourseProjectSubmission[]> {
  try {
    const colRef = collection(db, 'courseProjectSubmissions');
    const q = query(colRef, where('participantId', '==', participantId));
    const snap = await getDocs(q);
    const items: CourseProjectSubmission[] = [];
    snap.forEach((d) => {
      const data = d.data() as any;
      items.push({
        ...data,
        id: d.id,
        status: data.submissionStatus || data.status || 'submitted',
        coordinatorFeedback: data.reviewerFeedback || data.coordinatorFeedback
      });
    });
    return items;
  } catch (err) {
    console.warn('Error loading participant submissions:', err);
    return [];
  }
}

/**
 * Loads submissions for administrator review.
 */
export async function loadAllCourseSubmissionsForReview(): Promise<CourseProjectSubmission[]> {
  const items = await loadRecentProjectSubmissions(100);
  return items.map((data: any) => ({
    ...data,
    id: data.submissionId || data.id,
    status: data.submissionStatus || data.status || 'submitted',
    coordinatorFeedback: data.reviewerFeedback || data.coordinatorFeedback
  }));
}

/**
 * Reviews a project submission (Admin).
 */
export async function reviewCourseProjectSubmission(
  submissionId: string,
  status: 'approved' | 'resubmission_requested',
  feedback: string,
  _score: number,
  reviewedBy: string
): Promise<void> {
  const firestoreStatus = status === 'approved' ? 'approved' : 'revision_requested';
  await reviewProjectSubmission(submissionId, firestoreStatus as any, feedback, reviewedBy);
}

