import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  limit
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import {
  ParticipantCourseProgress,
  CourseProjectSubmission,
  AcademyCourse,
  AcademyGlobalConfig,
  CapstoneSupportingLink,
  CapstoneUploadedAttachment,
  WebDevPlacementResult
} from '../types';
import { ACADEMY_COURSES, getCourseById, getWebDevCourses } from '../data/academy';

const LOCAL_STORAGE_PROGRESS_PREFIX = 'dch_academy_progress_';
const LOCAL_STORAGE_CONFIG_KEY = 'dch_academy_global_config_v1';
const LOCAL_STORAGE_SUBMISSION_PREFIX = 'dch_academy_capstone_';
const LOCAL_STORAGE_ASSIGN_PREFIX = 'dch_academy_assign_';
const LOCAL_STORAGE_PLACEMENT_PREFIX = 'dch_webdev_placement_';

function stripUndefined<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => stripUndefined(item)) as unknown as T;
  }
  if (value !== null && typeof value === 'object') {
    const out: Record<string, any> = {};
    for (const [k, v] of Object.entries(value as Record<string, any>)) {
      if (v !== undefined) {
        out[k] = stripUndefined(v);
      }
    }
    return out as T;
  }
  return value;
}

export const DEFAULT_ACADEMY_GLOBAL_CONFIG: AcademyGlobalConfig = {
  publishedOverrides: {},
  passMarkOverrides: {},
  capstoneRubricOverrides: {}
};

export interface CourseCompletionSummary {
  courseId: string;
  completedLessonsCount: number;
  totalLessonsCount: number;
  lessonsRatio: number;
  allLessonsDone: boolean;
  completedModuleChecksCount: number;
  requiredModuleChecksCount: number;
  allModuleChecksDone: boolean;
  finalAssessmentBestScore: number;
  finalAssessmentPassThreshold: number;
  finalAssessmentPassed: boolean;
  capstoneSubmitted: boolean;
  capstoneApproved: boolean;
  requireCapstoneApproval: boolean;
  capstoneRequirementMet: boolean;
  certificateEligible: boolean;
  overallCompletionPct: number;
}

export function getEffectiveCoursePassThreshold(
  course: AcademyCourse,
  config?: AcademyGlobalConfig | null
): number {
  return (
    config?.passMarkOverrides?.[course.courseId] ??
    course.completionCriteria?.requiredFinalAssessmentPassScore ??
    70
  );
}

export function isCourseEffectivelyPublished(
  course: AcademyCourse,
  config?: AcademyGlobalConfig | null
): boolean {
  if (config?.publishedOverrides && config.publishedOverrides[course.courseId] !== undefined) {
    return Boolean(config.publishedOverrides[course.courseId]);
  }
  return course.active;
}

export function getCourseCompletionSummary(
  progress: ParticipantCourseProgress | undefined,
  course: AcademyCourse,
  submission?: CourseProjectSubmission,
  config?: AcademyGlobalConfig | null
): CourseCompletionSummary {
  const totalLessonsCount = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessonsCount = progress
    ? course.modules.reduce(
        (acc, m) =>
          acc + m.lessons.filter((l) => progress.completedLessonIds.includes(l.lessonId)).length,
        0
      )
    : 0;
  const lessonsRatio = totalLessonsCount > 0 ? completedLessonsCount / totalLessonsCount : 0;
  const requiredRatio = course.completionCriteria?.requiredLessonsRatio ?? 1.0;
  const allLessonsDone = totalLessonsCount > 0 && lessonsRatio >= requiredRatio;

  const modulesWithChecks = course.modules.filter(
    (m) => Array.isArray(m.knowledgeCheck) && m.knowledgeCheck.length > 0
  );
  const requiredModuleChecksCount =
    course.completionCriteria?.requiredModuleChecksCount ?? modulesWithChecks.length;

  const completedModuleChecksCount = progress
    ? modulesWithChecks.filter((m) => {
        const detail = progress.moduleCheckDetails?.[m.moduleId];
        if (detail) return detail.percentage >= 60 || detail.passed;
        return (progress.moduleCheckScores?.[m.moduleId] ?? -1) >= 60;
      }).length
    : 0;
  const allModuleChecksDone =
    requiredModuleChecksCount === 0 || completedModuleChecksCount >= requiredModuleChecksCount;

  const finalAssessmentPassThreshold = getEffectiveCoursePassThreshold(course, config);
  const finalAssessmentBestScore =
    progress?.finalAssessmentBestScore ?? progress?.finalAssessmentScore ?? 0;
  const finalAssessmentPassed = Boolean(
    progress?.finalAssessmentPassed ||
      (finalAssessmentBestScore > 0 && finalAssessmentBestScore >= finalAssessmentPassThreshold)
  );

  const subStatus = submission?.submissionStatus || submission?.status;
  const capstoneSubmitted = Boolean(
    progress?.capstoneCompleted ||
      (subStatus && subStatus !== 'draft')
  );
  const capstoneApproved = subStatus === 'approved';
  const requireCapstoneSubmission = course.completionCriteria?.requireCapstoneSubmission ?? true;
  const requireCapstoneApproval = Boolean(course.completionCriteria?.requireCapstoneApproval);
  const capstoneRequirementMet = requireCapstoneApproval
    ? capstoneApproved
    : requireCapstoneSubmission
      ? capstoneSubmitted
      : true;

  const certificateEligible =
    allLessonsDone && allModuleChecksDone && finalAssessmentPassed && capstoneRequirementMet;

  // Weighted progress: 50% lessons, 20% module checks, 15% final assessment, 15% capstone
  const lessonScorePct = Math.min(1, lessonsRatio) * 50;
  const modCheckPct =
    requiredModuleChecksCount > 0
      ? Math.min(1, completedModuleChecksCount / requiredModuleChecksCount) * 20
      : 20;
  const finalPct = finalAssessmentPassed ? 15 : 0;
  const capPct = capstoneRequirementMet ? 15 : capstoneSubmitted ? 10 : 0;
  const overallCompletionPct = Math.min(100, Math.round(lessonScorePct + modCheckPct + finalPct + capPct));

  return {
    courseId: course.courseId,
    completedLessonsCount,
    totalLessonsCount,
    lessonsRatio,
    allLessonsDone,
    completedModuleChecksCount,
    requiredModuleChecksCount,
    allModuleChecksDone,
    finalAssessmentBestScore,
    finalAssessmentPassThreshold,
    finalAssessmentPassed,
    capstoneSubmitted,
    capstoneApproved,
    requireCapstoneApproval,
    capstoneRequirementMet,
    certificateEligible,
    overallCompletionPct
  };
}

/**
 * Loads global Academy config overrides (published toggle, pass mark, capstone rubric).
 */
export async function loadAcademyGlobalConfig(): Promise<AcademyGlobalConfig> {
  let cached: AcademyGlobalConfig = { ...DEFAULT_ACADEMY_GLOBAL_CONFIG };
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_CONFIG_KEY);
    if (raw) {
      cached = { ...DEFAULT_ACADEMY_GLOBAL_CONFIG, ...JSON.parse(raw) };
    }
  } catch {}

  try {
    const docRef = doc(db, 'academyCourseConfig', 'global');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data() as AcademyGlobalConfig;
      const merged: AcademyGlobalConfig = {
        publishedOverrides: data.publishedOverrides || {},
        passMarkOverrides: data.passMarkOverrides || {},
        capstoneRubricOverrides: data.capstoneRubricOverrides || {},
        updatedAt: data.updatedAt,
        updatedBy: data.updatedBy
      };
      try {
        localStorage.setItem(LOCAL_STORAGE_CONFIG_KEY, JSON.stringify(merged));
      } catch {}
      // Sync to backend assessment grader silently
      syncConfigToBackend(merged).catch(() => {});
      return merged;
    }
  } catch (err) {
    console.warn('Could not read academyCourseConfig from Firestore:', err);
  }

  return cached;
}

export async function syncConfigToBackend(config: AcademyGlobalConfig): Promise<void> {
  try {
    await fetch('/api/academy/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        publishedOverrides: config.publishedOverrides || {},
        passMarkOverrides: config.passMarkOverrides || {}
      })
    });
  } catch {}
}

export async function saveAcademyGlobalConfig(
  config: AcademyGlobalConfig,
  updatedBy = 'Admin'
): Promise<AcademyGlobalConfig> {
  const payload: AcademyGlobalConfig = {
    publishedOverrides: config.publishedOverrides || {},
    passMarkOverrides: config.passMarkOverrides || {},
    capstoneRubricOverrides: config.capstoneRubricOverrides || {},
    updatedAt: new Date().toISOString(),
    updatedBy
  };

  try {
    localStorage.setItem(LOCAL_STORAGE_CONFIG_KEY, JSON.stringify(payload));
  } catch {}

  const docRef = doc(db, 'academyCourseConfig', 'global');
  await setDoc(docRef, stripUndefined(payload), { merge: true });
  await syncConfigToBackend(payload);
  return payload;
}

/**
 * Loads progress for a specific course and participant.
 */
export async function getParticipantCourseProgress(
  participantId: string,
  courseId: string
): Promise<ParticipantCourseProgress> {
  const localKey = `${LOCAL_STORAGE_PROGRESS_PREFIX}${courseId}_${participantId}`;

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
    moduleCheckDetails: {},
    courseStatus: 'not_started',
    progressPercentage: 0
  };

  const docId = `${courseId}_${participantId}`;
  const docRef = doc(db, 'learningProgress', docId);

  try {
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data() as ParticipantCourseProgress;
      try {
        localStorage.setItem(localKey, JSON.stringify(data));
      } catch {}
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

  const course = getCourseById(progress.courseId);
  if (course) {
    let totalLessons = 0;
    course.modules.forEach((m) => {
      totalLessons += m.lessons.length;
    });

    if (totalLessons > 0) {
      const completedCount = progress.completedLessonIds.length;
      progress.progressPercentage = Math.min(100, Math.round((completedCount / totalLessons) * 100));

      const summary = getCourseCompletionSummary(progress, course);
      progress.certificateEligible = summary.certificateEligible;

      if (summary.certificateEligible || (progress.progressPercentage === 100 && summary.finalAssessmentPassed)) {
        progress.courseStatus = 'completed';
        if (!progress.completedAt) {
          progress.completedAt = new Date().toISOString();
        }
      } else if (completedCount > 0 || (progress.finalAssessmentAttempts ?? 0) > 0 || progress.capstoneCompleted) {
        progress.courseStatus = 'in_progress';
      }
    }
  }

  try {
    localStorage.setItem(localKey, JSON.stringify(progress));
  } catch (e) {
    console.warn('Error saving local course progress', e);
  }

  const docId = `${progress.courseId}_${progress.participantId}`;
  const docRef = doc(db, 'learningProgress', docId);

  try {
    await setDoc(docRef, stripUndefined(progress), { merge: true });
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
  knowledgeCheckScore?: number,
  participantMeta?: { name?: string; platoon?: number; stateCode?: string }
): Promise<ParticipantCourseProgress> {
  const progress = await getParticipantCourseProgress(participantId, courseId);

  if (participantMeta?.name) progress.participantName = participantMeta.name;
  if (participantMeta?.platoon !== undefined) progress.platoon = participantMeta.platoon;
  if (participantMeta?.stateCode) progress.stateCode = participantMeta.stateCode;

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
 * Saves an explicit module-level Knowledge Check quiz attempt (e.g. 5 MCQs per module).
 */
export async function saveModuleCheckResult(
  participantId: string,
  courseId: string,
  moduleId: string,
  score: number,
  total: number,
  participantMeta?: { name?: string; platoon?: number; stateCode?: string }
): Promise<ParticipantCourseProgress> {
  const progress = await getParticipantCourseProgress(participantId, courseId);
  if (participantMeta?.name) progress.participantName = participantMeta.name;
  if (participantMeta?.platoon !== undefined) progress.platoon = participantMeta.platoon;
  if (participantMeta?.stateCode) progress.stateCode = participantMeta.stateCode;

  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const passed = percentage >= 60;

  progress.moduleCheckScores[moduleId] = Math.max(progress.moduleCheckScores[moduleId] || 0, percentage);
  if (!progress.moduleCheckDetails) {
    progress.moduleCheckDetails = {};
  }
  const prevBest = progress.moduleCheckDetails[moduleId]?.percentage ?? -1;
  if (percentage >= prevBest) {
    progress.moduleCheckDetails[moduleId] = {
      score,
      total,
      percentage,
      passed,
      completedAt: new Date().toISOString()
    };
  }

  await saveParticipantCourseProgress(progress);
  return progress;
}

/**
 * Starts a randomized, server-controlled Final Assessment attempt (no answers exposed).
 */
export async function startCourseFinalAssessment(
  courseId: string,
  participantId: string
): Promise<{
  assessmentToken: string;
  courseId: string;
  courseTitle: string;
  totalQuestions: number;
  passThreshold: number;
  questions: { id: string; questionText: string; options: string[]; moduleId?: string }[];
}> {
  const res = await fetch('/api/academy/start-assessment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ courseId, participantId })
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Could not start course final assessment.');
  }
  return data;
}

/**
 * Evaluates a course final assessment on the server and persists attempt metrics cleanly.
 */
export async function submitCourseFinalAssessment(
  participantId: string,
  courseId: string,
  answers: Record<string, number>,
  assessmentToken?: string | null,
  participantMeta?: { name?: string; platoon?: number; stateCode?: string }
): Promise<{ evaluation: any; progress: ParticipantCourseProgress }> {
  const res = await fetch('/api/academy/evaluate-assessment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ courseId, assessmentToken, answers })
  });
  const data = await res.json();
  if (!res.ok || !data.success || !data.evaluation) {
    throw new Error(data.error || 'Assessment evaluation failed.');
  }

  const evaluation = data.evaluation;
  const progress = await getParticipantCourseProgress(participantId, courseId);
  if (participantMeta?.name) progress.participantName = participantMeta.name;
  if (participantMeta?.platoon !== undefined) progress.platoon = participantMeta.platoon;
  if (participantMeta?.stateCode) progress.stateCode = participantMeta.stateCode;

  progress.finalAssessmentScore = evaluation.percentage;
  progress.finalAssessmentBestScore = Math.max(
    progress.finalAssessmentBestScore ?? progress.finalAssessmentScore ?? 0,
    evaluation.percentage
  );
  progress.finalAssessmentAttempts = (progress.finalAssessmentAttempts || 0) + 1;
  progress.finalAssessmentPassed = Boolean(progress.finalAssessmentPassed || evaluation.passed);
  progress.finalAssessmentVerificationToken = evaluation.verificationToken;
  progress.finalAssessmentCompletedAt = evaluation.evaluatedAt;

  await saveParticipantCourseProgress(progress);
  return { evaluation, progress };
}

export function getDeterministicSubmissionId(courseId: string, participantId: string): string {
  return `sub_${courseId}_${participantId}`;
}

/**
 * Saves a draft Capstone submission locally and in Firestore.
 */
export async function saveCapstoneDraft(
  submission: Omit<CourseProjectSubmission, 'submissionId' | 'submittedAt' | 'submissionStatus'> & {
    submissionId?: string;
  }
): Promise<CourseProjectSubmission> {
  const submissionId =
    submission.submissionId || getDeterministicSubmissionId(submission.courseId, submission.participantId);
  const now = new Date().toISOString();

  const payload: CourseProjectSubmission = {
    ...submission,
    id: submissionId,
    submissionId,
    submissionStatus: 'draft',
    status: 'draft',
    draftSavedAt: now,
    submittedAt: now,
    updatedAt: now
  };

  try {
    localStorage.setItem(
      `${LOCAL_STORAGE_SUBMISSION_PREFIX}${submission.courseId}_${submission.participantId}`,
      JSON.stringify(payload)
    );
  } catch {}

  const docRef = doc(db, 'courseProjectSubmissions', submissionId);
  await setDoc(docRef, stripUndefined(payload), { merge: true });
  return payload;
}

/**
 * Submits (or resubmits) a rich Capstone Project submission.
 */
export async function submitCapstoneProjectV2(params: {
  participantId: string;
  participantName: string;
  participantCallUpNumber?: string;
  participantPlatoon?: string;
  platoon?: number;
  stateCode?: string;
  courseId: string;
  courseTitle?: string;
  projectTitle: string;
  projectDescription: string;
  businessName?: string;
  targetCustomerSummary?: string;
  valueProposition?: string;
  deliverablesChecklist?: Record<string, boolean>;
  supportingLinks?: CapstoneSupportingLink[];
  uploadedAttachments?: CapstoneUploadedAttachment[];
  githubRepoUrl?: string;
  liveAppUrl?: string;
  artifactUrl?: string;
}): Promise<{ success: boolean; submission?: CourseProjectSubmission; error?: string }> {
  const submissionId = getDeterministicSubmissionId(params.courseId, params.participantId);
  const now = new Date().toISOString();

  const payload: CourseProjectSubmission = {
    id: submissionId,
    submissionId,
    submissionType: 'capstone',
    participantId: params.participantId,
    participantName: params.participantName,
    participantCallUpNumber: params.participantCallUpNumber || '',
    participantPlatoon: params.participantPlatoon || '',
    platoon: params.platoon ?? 0,
    stateCode: params.stateCode || '',
    courseId: params.courseId,
    courseTitle: params.courseTitle || '',
    projectTitle: params.projectTitle.slice(0, 150),
    projectDescription: params.projectDescription.slice(0, 5000),
    businessName: (params.businessName || '').slice(0, 150),
    targetCustomerSummary: (params.targetCustomerSummary || '').slice(0, 1000),
    valueProposition: (params.valueProposition || '').slice(0, 1000),
    githubRepoUrl: (params.githubRepoUrl || '').slice(0, 500),
    liveAppUrl: (params.liveAppUrl || '').slice(0, 500),
    deliverablesChecklist: params.deliverablesChecklist || {},
    supportingLinks: (params.supportingLinks || []).slice(0, 15),
    uploadedAttachments: (params.uploadedAttachments || []).slice(0, 5),
    artifactUrl: (
      params.artifactUrl ||
      params.liveAppUrl ||
      params.githubRepoUrl ||
      params.supportingLinks?.[0]?.url ||
      ''
    ).slice(0, 500),
    submissionUrl: (
      params.artifactUrl ||
      params.liveAppUrl ||
      params.githubRepoUrl ||
      params.supportingLinks?.[0]?.url ||
      ''
    ).slice(0, 500),
    submissionStatus: 'submitted',
    status: 'submitted',
    submittedAt: now,
    updatedAt: now
  };

  try {
    localStorage.setItem(
      `${LOCAL_STORAGE_SUBMISSION_PREFIX}${params.courseId}_${params.participantId}`,
      JSON.stringify(payload)
    );
  } catch {}

  try {
    const docRef = doc(db, 'courseProjectSubmissions', submissionId);
    await setDoc(docRef, stripUndefined(payload), { merge: true });

    const progress = await getParticipantCourseProgress(params.participantId, params.courseId);
    progress.participantName = params.participantName;
    if (params.platoon !== undefined) progress.platoon = params.platoon;
    if (params.stateCode) progress.stateCode = params.stateCode;
    progress.capstoneSubmissionId = submissionId;
    progress.capstoneCompleted = true;
    await saveParticipantCourseProgress(progress);

    return { success: true, submission: payload };
  } catch (error) {
    console.error('Error submitting capstone project v2:', error);
    return { success: false, error: 'Failed to submit capstone project to database.' };
  }
}

/**
 * Legacy-compatible wrapper for submitting a capstone project.
 */
export async function submitCapstoneProject(
  submission: Omit<CourseProjectSubmission, 'submissionId' | 'submittedAt' | 'submissionStatus'>
): Promise<{ success: boolean; submissionId: string; error?: string }> {
  const res = await submitCapstoneProjectV2({
    participantId: submission.participantId,
    participantName: submission.participantName,
    participantCallUpNumber: submission.participantCallUpNumber,
    participantPlatoon: submission.participantPlatoon,
    platoon: submission.platoon,
    stateCode: submission.stateCode,
    courseId: submission.courseId,
    courseTitle: submission.courseTitle,
    projectTitle: submission.projectTitle,
    projectDescription: submission.projectDescription,
    artifactUrl: submission.artifactUrl || submission.submissionUrl
  });
  return {
    success: res.success,
    submissionId:
      res.submission?.submissionId ||
      getDeterministicSubmissionId(submission.courseId, submission.participantId),
    error: res.error
  };
}

/**
 * Loads recent project submissions for coordinator/admin review.
 */
export async function loadRecentProjectSubmissions(
  limitCount = 150
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
 * Loads all learner progress documents for Admin analytics & filtering.
 */
export async function loadAllLearningProgressForAdmin(
  limitCount = 250
): Promise<ParticipantCourseProgress[]> {
  try {
    const colRef = collection(db, 'learningProgress');
    const q = query(colRef, limit(limitCount));
    const snap = await getDocs(q);
    const items: ParticipantCourseProgress[] = [];
    snap.forEach((d) => {
      items.push(d.data() as ParticipantCourseProgress);
    });
    return items;
  } catch (error) {
    console.warn('Error loading all learning progress for admin:', error);
    return [];
  }
}

/**
 * Reviews a project submission (Coordinator/Admin action).
 */
export async function reviewProjectSubmission(
  submissionId: string,
  status: 'under_review' | 'approved' | 'revision_requested' | 'rejected',
  feedback: string,
  reviewedBy: string,
  score?: number,
  rubricScores?: Record<string, number>
): Promise<void> {
  const now = new Date().toISOString();
  const docRef = doc(db, 'courseProjectSubmissions', submissionId);
  const updatePayload: Record<string, any> = {
    submissionStatus: status,
    status,
    reviewerFeedback: feedback,
    coordinatorFeedback: feedback,
    reviewedBy,
    reviewedAt: now,
    updatedAt: now
  };
  if (score !== undefined && !Number.isNaN(score)) {
    updatePayload.score = score;
  }
  if (rubricScores) {
    updatePayload.rubricScores = rubricScores;
  }
  await updateDoc(docRef, stripUndefined(updatePayload));
}

/**
 * Loads all course progress for a participant across ALL registered courses dynamically.
 */
export async function getParticipantAllCourseProgress(
  participantId: string
): Promise<Record<string, ParticipantCourseProgress>> {
  const results: Record<string, ParticipantCourseProgress> = {};
  for (const course of ACADEMY_COURSES) {
    results[course.courseId] = await getParticipantCourseProgress(participantId, course.courseId);
  }
  return results;
}

/**
 * Saves lesson completion progress.
 */
export async function saveLessonProgress(
  participantId: string,
  courseId: string,
  participantName: string,
  lessonProgress: {
    lessonId: string;
    moduleId: string;
    completed: boolean;
    completedAt: string;
    knowledgeCheckScore?: number;
  },
  participantMeta?: { platoon?: number; stateCode?: string }
): Promise<ParticipantCourseProgress> {
  return markLessonCompleted(
    participantId,
    courseId,
    lessonProgress.moduleId,
    lessonProgress.lessonId,
    lessonProgress.knowledgeCheckScore,
    {
      name: participantName,
      platoon: participantMeta?.platoon,
      stateCode: participantMeta?.stateCode
    }
  );
}

/**
 * Submits course project from participant (backward-compatible wrapper).
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
  const res = await submitCapstoneProjectV2({
    participantId,
    participantName,
    participantCallUpNumber,
    participantPlatoon,
    courseId,
    projectTitle,
    projectDescription,
    artifactUrl
  });
  if (res.submission) return res.submission;
  return {
    id: getDeterministicSubmissionId(courseId, participantId),
    submissionId: getDeterministicSubmissionId(courseId, participantId),
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
    submittedAt: new Date().toISOString()
  };
}

/**
 * Loads submissions for a given participant using deterministic document `getDoc` reads
 * (zero collection-wide `list` queries so learner privacy rules remain strict).
 */
export async function loadParticipantCourseSubmissions(
  participantId: string,
  knownProgress?: Record<string, ParticipantCourseProgress>
): Promise<CourseProjectSubmission[]> {
  const items: CourseProjectSubmission[] = [];
  const seenIds = new Set<string>();

  for (const course of ACADEMY_COURSES) {
    const deterministicId = getDeterministicSubmissionId(course.courseId, participantId);
    const candidateIds = [deterministicId];
    const progressCapId = knownProgress?.[course.courseId]?.capstoneSubmissionId;
    if (progressCapId && !candidateIds.includes(progressCapId)) {
      candidateIds.push(progressCapId);
    }

    let foundRemote = false;
    for (const subId of candidateIds) {
      if (seenIds.has(subId)) continue;
      try {
        const snap = await getDoc(doc(db, 'courseProjectSubmissions', subId));
        if (snap.exists()) {
          seenIds.add(subId);
          foundRemote = true;
          const data = snap.data() as any;
          const normalized: CourseProjectSubmission = {
            ...data,
            id: snap.id,
            submissionId: data.submissionId || snap.id,
            status: data.submissionStatus || data.status || 'submitted',
            submissionStatus: data.submissionStatus || data.status || 'submitted',
            coordinatorFeedback: data.reviewerFeedback || data.coordinatorFeedback
          };
          items.push(normalized);
          try {
            localStorage.setItem(
              `${LOCAL_STORAGE_SUBMISSION_PREFIX}${course.courseId}_${participantId}`,
              JSON.stringify(normalized)
            );
          } catch {}
          break;
        }
      } catch (err) {
        console.warn('Error fetching participant submission doc:', subId, err);
      }
    }

    if (!foundRemote) {
      try {
        const cached = localStorage.getItem(
          `${LOCAL_STORAGE_SUBMISSION_PREFIX}${course.courseId}_${participantId}`
        );
        if (cached) {
          const parsed = JSON.parse(cached) as CourseProjectSubmission;
          items.push(parsed);
        }
      } catch {}
    }
  }

  return items;
}

/**
 * Loads submissions for administrator review.
 */
export async function loadAllCourseSubmissionsForReview(): Promise<CourseProjectSubmission[]> {
  const items = await loadRecentProjectSubmissions(150);
  return items.map((data: any) => ({
    ...data,
    id: data.submissionId || data.id,
    submissionId: data.submissionId || data.id,
    status: data.submissionStatus || data.status || 'submitted',
    submissionStatus: data.submissionStatus || data.status || 'submitted',
    coordinatorFeedback: data.reviewerFeedback || data.coordinatorFeedback
  }));
}

/**
 * Reviews a project submission (Admin).
 */
export async function reviewCourseProjectSubmission(
  submissionId: string,
  status: 'under_review' | 'approved' | 'revision_requested' | 'resubmission_requested' | 'rejected',
  feedback: string,
  score: number,
  reviewedBy: string,
  rubricScores?: Record<string, number>
): Promise<void> {
  const firestoreStatus =
    status === 'resubmission_requested' ? 'revision_requested' : status;
  await reviewProjectSubmission(
    submissionId,
    firestoreStatus,
    feedback,
    reviewedBy,
    score,
    rubricScores
  );
}

// ============================================================================
// WEB DEVELOPMENT ACADEMY: PLACEMENT, CODING LABS, MODULE ASSIGNMENTS & DASHBOARD
// ============================================================================

export async function startWebDevPlacementAssessment(participantId: string): Promise<{
  placementToken: string;
  totalQuestions: number;
  questions: Array<{
    id: string;
    domain: string;
    tier: 'beginner' | 'intermediate' | 'advanced';
    questionText: string;
    options: string[];
  }>;
}> {
  const res = await fetch('/api/academy/placement/start', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ participantId })
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Could not start placement assessment.');
  }
  return data;
}

export async function evaluateWebDevPlacementAssessment(
  participantId: string,
  placementToken: string | null,
  answers: Record<string, number>
): Promise<{
  result: WebDevPlacementResult;
  review: Array<{
    id: string;
    domain: string;
    questionText: string;
    options: string[];
    userAnswer: number | null;
    correctAnswer: number;
    isCorrect: boolean;
    explanation: string;
  }>;
}> {
  const res = await fetch('/api/academy/placement/evaluate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ placementToken, answers })
  });
  const data = await res.json();
  if (!res.ok || !data.success || !data.result) {
    throw new Error(data.error || 'Could not evaluate placement assessment.');
  }
  saveLocalPlacementResult(participantId, data.result);
  return { result: data.result, review: data.review || [] };
}

export function saveLocalPlacementResult(
  participantId: string,
  result: WebDevPlacementResult
): void {
  try {
    localStorage.setItem(`${LOCAL_STORAGE_PLACEMENT_PREFIX}${participantId}`, JSON.stringify(result));
  } catch {}
}

export function loadLocalPlacementResult(participantId: string): WebDevPlacementResult | null {
  try {
    const raw = localStorage.getItem(`${LOCAL_STORAGE_PLACEMENT_PREFIX}${participantId}`);
    return raw ? (JSON.parse(raw) as WebDevPlacementResult) : null;
  } catch {
    return null;
  }
}

export async function markCodingChallengeCompleted(
  participantId: string,
  courseId: string,
  challengeId: string
): Promise<ParticipantCourseProgress> {
  const progress = await getParticipantCourseProgress(participantId, courseId);
  const existing = progress.completedCodingChallengeIds || [];
  if (!existing.includes(challengeId)) {
    progress.completedCodingChallengeIds = [...existing, challengeId].slice(0, 50);
    await saveParticipantCourseProgress(progress);
  }
  return progress;
}

export async function markAiLabCompleted(
  participantId: string,
  courseId: string,
  labId: string
): Promise<ParticipantCourseProgress> {
  const progress = await getParticipantCourseProgress(participantId, courseId);
  const existing = progress.completedAiLabIds || [];
  if (!existing.includes(labId)) {
    progress.completedAiLabIds = [...existing, labId].slice(0, 50);
    await saveParticipantCourseProgress(progress);
  }
  return progress;
}

export function getDeterministicAssignmentSubmissionId(
  courseId: string,
  moduleId: string,
  participantId: string
): string {
  return `sub_${courseId}_${moduleId}_${participantId}`;
}

export async function saveModuleAssignmentSubmission(params: {
  participantId: string;
  participantName: string;
  stateCode?: string;
  platoon?: number;
  courseId: string;
  courseTitle: string;
  moduleId: string;
  moduleTitle: string;
  projectDescription: string;
  githubRepoUrl?: string;
  liveAppUrl?: string;
  codeSnippet?: string;
}): Promise<{ success: boolean; submission?: CourseProjectSubmission; error?: string }> {
  const submissionId = getDeterministicAssignmentSubmissionId(
    params.courseId,
    params.moduleId,
    params.participantId
  );
  const now = new Date().toISOString();

  const payload: CourseProjectSubmission = {
    id: submissionId,
    submissionId,
    submissionType: 'coding_assignment',
    moduleId: params.moduleId,
    participantId: params.participantId,
    participantName: params.participantName,
    stateCode: params.stateCode || '',
    platoon: params.platoon ?? 0,
    courseId: params.courseId,
    courseTitle: params.courseTitle,
    projectTitle: params.moduleTitle.slice(0, 150),
    projectDescription: params.projectDescription.slice(0, 5000),
    githubRepoUrl: (params.githubRepoUrl || '').slice(0, 500),
    liveAppUrl: (params.liveAppUrl || '').slice(0, 500),
    codeSnippet: (params.codeSnippet || '').slice(0, 8000),
    artifactUrl: (params.liveAppUrl || params.githubRepoUrl || '').slice(0, 500),
    submissionUrl: (params.liveAppUrl || params.githubRepoUrl || '').slice(0, 500),
    submissionStatus: 'submitted',
    status: 'submitted',
    submittedAt: now,
    updatedAt: now
  };

  try {
    localStorage.setItem(
      `${LOCAL_STORAGE_ASSIGN_PREFIX}${params.courseId}_${params.moduleId}_${params.participantId}`,
      JSON.stringify(payload)
    );
  } catch {}

  try {
    await setDoc(doc(db, 'courseProjectSubmissions', submissionId), stripUndefined(payload), {
      merge: true
    });
    return { success: true, submission: payload };
  } catch (err) {
    console.warn('Could not sync module assignment to Firestore (saved locally):', err);
    return { success: true, submission: payload };
  }
}

export async function loadCourseAssignmentSubmissions(
  courseId: string,
  participantId: string
): Promise<Record<string, CourseProjectSubmission>> {
  const course = getCourseById(courseId);
  const result: Record<string, CourseProjectSubmission> = {};
  if (!course) return result;

  for (const mod of course.modules) {
    const subId = getDeterministicAssignmentSubmissionId(courseId, mod.moduleId, participantId);
    try {
      const snap = await getDoc(doc(db, 'courseProjectSubmissions', subId));
      if (snap.exists()) {
        const data = snap.data() as CourseProjectSubmission;
        result[mod.moduleId] = {
          ...data,
          id: snap.id,
          submissionId: data.submissionId || snap.id,
          status: data.submissionStatus || data.status || 'submitted',
          submissionStatus: data.submissionStatus || data.status || 'submitted'
        };
        continue;
      }
    } catch {}

    try {
      const cached = localStorage.getItem(
        `${LOCAL_STORAGE_ASSIGN_PREFIX}${courseId}_${mod.moduleId}_${participantId}`
      );
      if (cached) {
        result[mod.moduleId] = JSON.parse(cached) as CourseProjectSubmission;
      }
    } catch {}
  }

  return result;
}

export interface WebDevProgressionSummary {
  activeLevel: 'beginner' | 'intermediate' | 'advanced';
  activeCourseId: string;
  activeCourseTitle: string;
  beginnerPct: number;
  intermediatePct: number;
  advancedPct: number;
  beginnerCompleted: boolean;
  intermediateCompleted: boolean;
  advancedCompleted: boolean;
  nextEligibleCourseId: string | null;
  nextEligibleLabel: string | null;
  recommendedNextCourseId: string;
  recommendedNextLessonId: string | null;
  recommendedNextLessonTitle: string | null;
  totalLessonsCompleted: number;
  totalLessonsAvailable: number;
  totalCodingChallengesCompleted: number;
  totalAiLabsCompleted: number;
}

export function getWebDevProgressionSummary(
  progressMap: Record<string, ParticipantCourseProgress>,
  submissions: CourseProjectSubmission[],
  placementResult?: WebDevPlacementResult | null
): WebDevProgressionSummary {
  const webCourses = getWebDevCourses();
  const findCourse = (id: string) => webCourses.find((c) => c.courseId === id);
  const subFor = (id: string) =>
    submissions.find((s) => s.courseId === id && (s.submissionType || 'capstone') === 'capstone');

  const beg = findCourse('web-development-beginner');
  const int = findCourse('web-development-intermediate');
  const adv = findCourse('web-development-advanced');

  const begSum = beg
    ? getCourseCompletionSummary(progressMap[beg.courseId], beg, subFor(beg.courseId))
    : null;
  const intSum = int
    ? getCourseCompletionSummary(progressMap[int.courseId], int, subFor(int.courseId))
    : null;
  const advSum = adv
    ? getCourseCompletionSummary(progressMap[adv.courseId], adv, subFor(adv.courseId))
    : null;

  const begPct = begSum?.overallCompletionPct ?? 0;
  const intPct = intSum?.overallCompletionPct ?? 0;
  const advPct = advSum?.overallCompletionPct ?? 0;

  const begDone = Boolean(begSum?.certificateEligible);
  const intDone = Boolean(intSum?.certificateEligible);
  const advDone = Boolean(advSum?.certificateEligible);

  let activeCourse = beg;
  if (adv && (advPct > 0 || intDone || placementResult?.recommendedLevel === 'advanced')) {
    activeCourse = adv;
  } else if (int && (intPct > 0 || begDone || placementResult?.recommendedLevel === 'intermediate')) {
    activeCourse = int;
  }

  let nextEligibleCourseId: string | null = null;
  let nextEligibleLabel: string | null = null;
  if (begDone && !intDone && intPct === 0) {
    nextEligibleCourseId = 'web-development-intermediate';
    nextEligibleLabel = 'Eligible for Intermediate – Modern Web Development with AI';
  } else if (intDone && !advDone && advPct === 0) {
    nextEligibleCourseId = 'web-development-advanced';
    nextEligibleLabel = 'Eligible for Advanced – AI-Powered Full-Stack Development';
  }

  // Find resume / next uncompleted lesson in active course
  let recommendedNextLessonId: string | null = null;
  let recommendedNextLessonTitle: string | null = null;
  if (activeCourse) {
    const completedSet = new Set(progressMap[activeCourse.courseId]?.completedLessonIds || []);
    for (const mod of activeCourse.modules) {
      const nextLesson = mod.lessons.find((l) => !completedSet.has(l.lessonId));
      if (nextLesson) {
        recommendedNextLessonId = nextLesson.lessonId;
        recommendedNextLessonTitle = `${nextLesson.sequenceLabel}: ${nextLesson.title}`;
        break;
      }
    }
    if (!recommendedNextLessonId && activeCourse.modules[0]?.lessons[0]) {
      recommendedNextLessonId = activeCourse.modules[0].lessons[0].lessonId;
      recommendedNextLessonTitle = `${activeCourse.modules[0].lessons[0].sequenceLabel}: ${activeCourse.modules[0].lessons[0].title}`;
    }
  }

  const totalLessonsAvailable = webCourses.reduce(
    (sum, c) => sum + c.modules.reduce((mSum, m) => mSum + m.lessons.length, 0),
    0
  );
  const totalLessonsCompleted = webCourses.reduce(
    (sum, c) => sum + (progressMap[c.courseId]?.completedLessonIds.length || 0),
    0
  );
  const totalCodingChallengesCompleted = webCourses.reduce(
    (sum, c) => sum + (progressMap[c.courseId]?.completedCodingChallengeIds?.length || 0),
    0
  );
  const totalAiLabsCompleted = webCourses.reduce(
    (sum, c) => sum + (progressMap[c.courseId]?.completedAiLabIds?.length || 0),
    0
  );

  return {
    activeLevel: (activeCourse?.level || 'beginner') as 'beginner' | 'intermediate' | 'advanced',
    activeCourseId: activeCourse?.courseId || 'web-development-beginner',
    activeCourseTitle: activeCourse?.title || 'Beginner – Web Development Fundamentals',
    beginnerPct: begPct,
    intermediatePct: intPct,
    advancedPct: advPct,
    beginnerCompleted: begDone,
    intermediateCompleted: intDone,
    advancedCompleted: advDone,
    nextEligibleCourseId,
    nextEligibleLabel,
    recommendedNextCourseId: nextEligibleCourseId || activeCourse?.courseId || 'web-development-beginner',
    recommendedNextLessonId,
    recommendedNextLessonTitle,
    totalLessonsCompleted,
    totalLessonsAvailable,
    totalCodingChallengesCompleted,
    totalAiLabsCompleted
  };
}

