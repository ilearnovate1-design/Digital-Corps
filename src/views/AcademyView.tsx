import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAcademyUrl } from '../routes';
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Award,
  Clock,
  ArrowLeft,
  ArrowRight,
  FileText,
  ExternalLink,
  GraduationCap,
  Sparkles,
  Search,
  RotateCcw,
  Send,
  Layers,
  HelpCircle,
  AlertCircle,
  Check,
  X,
  Target,
  BookmarkCheck,
  ChevronDown,
  Youtube,
  Lock,
  Unlock,
  Plus,
  Trash2,
  Save,
  Upload,
  ListChecks,
  Wrench,
  ClipboardCheck,
  Code2,
  Terminal,
  Download,
  Compass,
  Cpu,
  AlertTriangle,
  Copy,
  Lightbulb,
  FolderGit2,
  Globe
} from 'lucide-react';
import {
  AcademyCourse,
  AcademyGlobalConfig,
  CapstoneSupportingLink,
  CapstoneUploadedAttachment,
  CourseLesson,
  CourseModule,
  CourseProjectSubmission,
  LessonKnowledgeCheckQuestion,
  ParticipantCourseProgress,
  RegisteredParticipant,
  WebDevPlacementResult
} from '../types';
import {
  ALL_ACADEMY_COURSES,
  WEB_DEV_COURSE_IDS,
  getCourseById,
  getCourseLesson,
  getWebDevCourses
} from '../data/academy';
import {
  DEFAULT_ACADEMY_GLOBAL_CONFIG,
  getCourseCompletionSummary,
  getEffectiveCoursePassThreshold,
  getParticipantAllCourseProgress,
  getWebDevProgressionSummary,
  isCourseEffectivelyPublished,
  loadAcademyGlobalConfig,
  loadCourseAssignmentSubmissions,
  loadLocalPlacementResult,
  loadParticipantCourseSubmissions,
  markAiLabCompleted,
  markCodingChallengeCompleted,
  saveCapstoneDraft,
  saveLessonProgress,
  saveModuleAssignmentSubmission,
  saveModuleCheckResult,
  startCourseFinalAssessment,
  submitCapstoneProjectV2,
  submitCourseFinalAssessment
} from '../services/academyService';
import { CodingPracticeSandbox } from '../components/academy/CodingPracticeSandbox';
import { AiDevelopmentLab } from '../components/academy/AiDevelopmentLab';
import { WebDevPlacementModal } from '../components/academy/WebDevPlacementModal';

interface AcademyViewProps {
  participant?: RegisteredParticipant | null;
  initialCourseId?: string | null;
  initialLessonId?: string | null;
  onNavigateToQuiz?: (categoryId: string) => void;
  onClearDeepLink?: () => void;
}

interface RandomizedModuleQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

function shuffleWithPerm<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function resolveAcademyTarget(initialCourseId?: string | null, initialLessonId?: string | null): {
  viewMode: 'catalog' | 'course_detail' | 'lesson_reader' | 'final_assessment' | 'module_check';
  selectedCourse: AcademyCourse | null;
  selectedModule: CourseModule | null;
  selectedLesson: CourseLesson | null;
  unknownCourseId: string | null;
  categoryFilter: string;
  showPlacementModal: boolean;
  expandedModules: Record<string, boolean>;
} {
  if (initialCourseId === '__webdev_placement__') {
    return {
      viewMode: 'catalog',
      selectedCourse: null,
      selectedModule: null,
      selectedLesson: null,
      unknownCourseId: null,
      categoryFilter: 'web_development_academy',
      showPlacementModal: true,
      expandedModules: {}
    };
  }

  if (!initialCourseId) {
    return {
      viewMode: 'catalog',
      selectedCourse: null,
      selectedModule: null,
      selectedLesson: null,
      unknownCourseId: null,
      categoryFilter: 'all',
      showPlacementModal: false,
      expandedModules: {}
    };
  }

  const course = getCourseById(initialCourseId);
  if (!course) {
    return {
      viewMode: 'catalog',
      selectedCourse: null,
      selectedModule: null,
      selectedLesson: null,
      unknownCourseId: initialCourseId,
      categoryFilter: 'all',
      showPlacementModal: false,
      expandedModules: {}
    };
  }

  const expandedModules: Record<string, boolean> = {};
  course.modules.forEach((m) => {
    expandedModules[m.moduleId] = true;
  });

  if (initialLessonId) {
    const lessonMatch = getCourseLesson(initialCourseId, initialLessonId);
    if (lessonMatch) {
      return {
        viewMode: 'lesson_reader',
        selectedCourse: course,
        selectedModule: lessonMatch.module,
        selectedLesson: lessonMatch.lesson,
        unknownCourseId: null,
        categoryFilter: 'all',
        showPlacementModal: false,
        expandedModules
      };
    }
  }

  return {
    viewMode: 'course_detail',
    selectedCourse: course,
    selectedModule: null,
    selectedLesson: null,
    unknownCourseId: null,
    categoryFilter: 'all',
    showPlacementModal: false,
    expandedModules
  };
}

export const AcademyView: React.FC<AcademyViewProps> = ({
  participant,
  initialCourseId,
  initialLessonId,
  onNavigateToQuiz,
  onClearDeepLink
}) => {
  const navigate = useNavigate();
  const initialTarget = useMemo(
    () => resolveAcademyTarget(initialCourseId, initialLessonId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const isFirstTargetSync = React.useRef(true);

  // Navigation states: 'catalog' | 'course_detail' | 'lesson_reader' | 'final_assessment' | 'module_check'
  const [viewMode, setViewMode] = useState<
    'catalog' | 'course_detail' | 'lesson_reader' | 'final_assessment' | 'module_check'
  >(initialTarget.viewMode);
  const [selectedCourse, setSelectedCourse] = useState<AcademyCourse | null>(initialTarget.selectedCourse);
  const [selectedModule, setSelectedModule] = useState<CourseModule | null>(initialTarget.selectedModule);
  const [selectedLesson, setSelectedLesson] = useState<CourseLesson | null>(initialTarget.selectedLesson);
  const [unknownCourseId, setUnknownCourseId] = useState<string | null>(initialTarget.unknownCourseId);

  // Global config & progress records
  const [globalConfig, setGlobalConfig] = useState<AcademyGlobalConfig>(DEFAULT_ACADEMY_GLOBAL_CONFIG);
  const [progressMap, setProgressMap] = useState<Record<string, ParticipantCourseProgress>>({});
  const [submissions, setSubmissions] = useState<CourseProjectSubmission[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>(initialTarget.categoryFilter);

  // Lesson reader interactive state
  const [knowledgeAnswers, setKnowledgeAnswers] = useState<Record<number, number>>({});
  const [knowledgeSubmitted, setKnowledgeSubmitted] = useState<boolean>(false);
  const [savingLesson, setSavingLesson] = useState(false);
  const [lessonCompleteStatus, setLessonCompleteStatus] = useState<boolean>(false);

  // Module Knowledge Check runner state
  const [moduleCheckQuestions, setModuleCheckQuestions] = useState<RandomizedModuleQuestion[]>([]);
  const [moduleCheckAnswers, setModuleCheckAnswers] = useState<Record<string, number>>({});
  const [moduleCheckSubmitted, setModuleCheckSubmitted] = useState<boolean>(false);
  const [moduleCheckSummary, setModuleCheckSummary] = useState<{
    score: number;
    total: number;
    percentage: number;
    passed: boolean;
  } | null>(null);
  const [savingModuleCheck, setSavingModuleCheck] = useState<boolean>(false);

  // Capstone submission & draft state
  const [isEditingCapstone, setIsEditingCapstone] = useState(false);
  const [isSubmittingProject, setIsSubmittingProject] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [projectTitle, setProjectTitle] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [targetCustomerSummary, setTargetCustomerSummary] = useState('');
  const [valueProposition, setValueProposition] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [deliverablesChecklist, setDeliverablesChecklist] = useState<Record<string, boolean>>({});
  const [supportingLinks, setSupportingLinks] = useState<CapstoneSupportingLink[]>([
    { label: 'Main Deliverable / Google Drive Link', url: '' }
  ]);
  const [uploadedAttachments, setUploadedAttachments] = useState<CapstoneUploadedAttachment[]>([]);
  const [githubRepoUrl, setGithubRepoUrl] = useState('');
  const [liveAppUrl, setLiveAppUrl] = useState('');
  const [projectSubmitSuccess, setProjectSubmitSuccess] = useState<string | null>(null);
  const [projectSubmitError, setProjectSubmitError] = useState<string | null>(null);

  // Web Development Academy state
  const [placementResult, setPlacementResult] = useState<WebDevPlacementResult | null>(null);
  const [showPlacementModal, setShowPlacementModal] = useState<boolean>(initialTarget.showPlacementModal);
  const [showCourseAiLab, setShowCourseAiLab] = useState<boolean>(false);
  const [copiedSnippetKey, setCopiedSnippetKey] = useState<string | null>(null);
  const [moduleAssignments, setModuleAssignments] = useState<Record<string, CourseProjectSubmission>>({});
  const [openAssignmentModuleId, setOpenAssignmentModuleId] = useState<string | null>(null);
  const [assignDescription, setAssignDescription] = useState('');
  const [assignGithubUrl, setAssignGithubUrl] = useState('');
  const [assignLiveUrl, setAssignLiveUrl] = useState('');
  const [assignCodeSnippet, setAssignCodeSnippet] = useState('');
  const [savingAssignment, setSavingAssignment] = useState(false);
  const [assignFeedback, setAssignFeedback] = useState<string | null>(null);

  // Final Assessment state (server-randomized token + sanitized questions)
  const [assessmentLoading, setAssessmentLoading] = useState(false);
  const [assessmentError, setAssessmentError] = useState<string | null>(null);
  const [assessmentToken, setAssessmentToken] = useState<string | null>(null);
  const [assessmentPassThreshold, setAssessmentPassThreshold] = useState<number>(70);
  const [assessmentQuestions, setAssessmentQuestions] = useState<
    Array<{ id: string; questionText: string; options: string[]; moduleId?: string }>
  >([]);
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, number>>({});
  const [assessmentSubmitting, setAssessmentSubmitting] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<{
    score: number;
    total: number;
    percentage: number;
    passThreshold?: number;
    passed: boolean;
    verificationToken?: string;
    moduleBreakdown?: Record<string, { score: number; total: number }>;
    results: Array<{
      id?: string;
      questionId?: string;
      moduleId?: string;
      questionText: string;
      options?: string[];
      userAnswer?: number | null;
      selectedAnswer?: number;
      correctAnswer: number;
      isCorrect: boolean;
      explanation: string;
    }>;
  } | null>(null);

  // Accordion expanded modules in Course Detail
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(initialTarget.expandedModules);

  // YouTube Subscription State
  const [hasSubscribed, setHasSubscribed] = useState<boolean>(false);
  const [showYoutubeModal, setShowYoutubeModal] = useState<boolean>(false);

  const participantId = participant?.id || 'guest_user';
  const participantPlatoonNum = useMemo(() => {
    if (!participant?.platoon) return 0;
    const match = participant.platoon.match(/\d+/);
    return match ? Number(match[0]) : 0;
  }, [participant?.platoon]);

  // Load config, progress, placement, and submissions on mount or participant change
  useEffect(() => {
    async function loadData() {
      const cfg = await loadAcademyGlobalConfig();
      setGlobalConfig(cfg);
      if (participantId) {
        setPlacementResult(loadLocalPlacementResult(participantId));
        const pMap = await getParticipantAllCourseProgress(participantId);
        setProgressMap(pMap);
        const userSubs = await loadParticipantCourseSubmissions(participantId, pMap);
        setSubmissions(userSubs);
      }
    }
    loadData();
  }, [participantId]);

  // Handle subsequent URL param / deep-link transitions (e.g., Back/Forward or nav links)
  useEffect(() => {
    if (isFirstTargetSync.current) {
      isFirstTargetSync.current = false;
      return;
    }

    const next = resolveAcademyTarget(initialCourseId, initialLessonId);
    setUnknownCourseId(next.unknownCourseId);
    setSelectedCourse(next.selectedCourse);
    setSelectedModule(next.selectedModule);
    setSelectedLesson(next.selectedLesson);
    setViewMode(next.viewMode);
    if (Object.keys(next.expandedModules).length > 0) {
      setExpandedModules(next.expandedModules);
    }
    if (initialCourseId === '__webdev_placement__') {
      setSelectedCategoryFilter('web_development_academy');
      setShowPlacementModal(true);
    } else if (showPlacementModal) {
      setShowPlacementModal(false);
    }
  }, [initialCourseId, initialLessonId]);

  // Load module assignment submissions when viewing a course
  useEffect(() => {
    if (!selectedCourse || !participantId) return;
    loadCourseAssignmentSubmissions(selectedCourse.courseId, participantId).then((map) => {
      setModuleAssignments(map);
    });
    setOpenAssignmentModuleId(null);
    setAssignFeedback(null);
    setShowCourseAiLab(false);
  }, [selectedCourse?.courseId, participantId]);

  // Sync capstone form state when switching course or loading submissions
  useEffect(() => {
    if (!selectedCourse) return;
    const existing = submissions.find((s) => s.courseId === selectedCourse.courseId);
    setProjectSubmitSuccess(null);
    setProjectSubmitError(null);
    if (existing) {
      setProjectTitle(existing.projectTitle || '');
      setBusinessName(existing.businessName || '');
      setTargetCustomerSummary(existing.targetCustomerSummary || '');
      setValueProposition(existing.valueProposition || '');
      setProjectDescription(existing.projectDescription || '');
      setGithubRepoUrl(existing.githubRepoUrl || '');
      setLiveAppUrl(existing.liveAppUrl || '');
      setDeliverablesChecklist(existing.deliverablesChecklist || {});
      setSupportingLinks(
        existing.supportingLinks && existing.supportingLinks.length > 0
          ? existing.supportingLinks
          : existing.artifactUrl || existing.submissionUrl
            ? [{ label: 'Primary Artifact Link', url: existing.artifactUrl || existing.submissionUrl || '' }]
            : [{ label: 'Main Deliverable / Google Drive Link', url: '' }]
      );
      setUploadedAttachments(existing.uploadedAttachments || []);
      setIsEditingCapstone(existing.submissionStatus === 'draft');
    } else {
      setProjectTitle('');
      setBusinessName('');
      setTargetCustomerSummary('');
      setValueProposition('');
      setProjectDescription('');
      setGithubRepoUrl('');
      setLiveAppUrl('');
      setDeliverablesChecklist({});
      setSupportingLinks([{ label: 'Main Deliverable / Google Drive Link', url: '' }]);
      setUploadedAttachments([]);
      setIsEditingCapstone(true);
    }
  }, [selectedCourse?.courseId, submissions]);

  // When selected lesson changes, reset knowledge checks and load completeness status
  useEffect(() => {
    if (selectedCourse && selectedLesson) {
      setKnowledgeAnswers({});
      setKnowledgeSubmitted(false);
      const cProg = progressMap[selectedCourse.courseId];
      const isCompleted = cProg?.completedLessonIds?.includes(selectedLesson.lessonId) || false;
      setLessonCompleteStatus(isCompleted);
    }
  }, [selectedCourse, selectedLesson, progressMap]);

  const publishedCourses = useMemo(
    () => ALL_ACADEMY_COURSES.filter((c) => isCourseEffectivelyPublished(c, globalConfig)),
    [globalConfig]
  );

  const uniqueCategories = useMemo(
    () => Array.from(new Set(publishedCourses.map((c) => c.categoryId))),
    [publishedCourses]
  );

  const filteredCourses = useMemo(
    () =>
      publishedCourses.filter((course) => {
        const q = searchTerm.toLowerCase();
        const matchesSearch =
          course.title.toLowerCase().includes(q) ||
          (course.subtitle || '').toLowerCase().includes(q) ||
          course.description.toLowerCase().includes(q) ||
          course.learningObjectives.some((o) => o.title.toLowerCase().includes(q));
        const matchesCategory =
          selectedCategoryFilter === 'all' || course.categoryId === selectedCategoryFilter;
        return matchesSearch && matchesCategory;
      }),
    [publishedCourses, searchTerm, selectedCategoryFilter]
  );

  const handleSelectCourse = (course: AcademyCourse) => {
    setUnknownCourseId(null);
    setSelectedCourse(course);
    const exp: Record<string, boolean> = {};
    course.modules.forEach((m, idx) => {
      exp[m.moduleId] = idx === 0;
    });
    setExpandedModules(exp);
    setViewMode('course_detail');
    navigate(getAcademyUrl(course.courseId));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLesson = (course: AcademyCourse, module: CourseModule, lesson: CourseLesson) => {
    setUnknownCourseId(null);
    setSelectedCourse(course);
    setSelectedModule(module);
    setSelectedLesson(lesson);
    setViewMode('lesson_reader');
    navigate(getAcademyUrl(course.courseId, lesson.lessonId));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleModuleAccordion = (moduleId: string) => {
    setExpandedModules((prev) => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  const handleKnowledgeOptionSelect = (qIdx: number, optIdx: number) => {
    if (knowledgeSubmitted) return;
    setKnowledgeAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleCheckKnowledge = () => {
    setKnowledgeSubmitted(true);
  };

  const handleMarkLessonComplete = async () => {
    if (!selectedCourse || !selectedLesson) return;
    setSavingLesson(true);
    try {
      const updated = await saveLessonProgress(
        participantId,
        selectedCourse.courseId,
        participant?.name || 'Corps Member',
        {
          lessonId: selectedLesson.lessonId,
          moduleId: selectedModule?.moduleId || '',
          completed: true,
          completedAt: new Date().toISOString(),
          knowledgeCheckScore: knowledgeSubmitted ? Object.keys(knowledgeAnswers).length : undefined
        },
        {
          platoon: participantPlatoonNum,
          stateCode: participant?.stateCode
        }
      );

      setProgressMap((prev) => ({
        ...prev,
        [selectedCourse.courseId]: updated
      }));
      setLessonCompleteStatus(true);
    } catch (err) {
      console.error('Failed to save lesson progress:', err);
    } finally {
      setSavingLesson(false);
    }
  };

  const navigateAdjacentLesson = (direction: 'prev' | 'next') => {
    if (!selectedCourse || !selectedLesson) return;
    const allLessons: { module: CourseModule; lesson: CourseLesson }[] = [];
    selectedCourse.modules.forEach((m) => {
      m.lessons.forEach((l) => {
        allLessons.push({ module: m, lesson: l });
      });
    });

    const currentIndex = allLessons.findIndex((item) => item.lesson.lessonId === selectedLesson.lessonId);
    if (currentIndex === -1) return;

    if (direction === 'prev' && currentIndex > 0) {
      const prev = allLessons[currentIndex - 1];
      setSelectedModule(prev.module);
      setSelectedLesson(prev.lesson);
      navigate(getAcademyUrl(selectedCourse.courseId, prev.lesson.lessonId));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (direction === 'next' && currentIndex < allLessons.length - 1) {
      const next = allLessons[currentIndex + 1];
      setSelectedModule(next.module);
      setSelectedLesson(next.lesson);
      navigate(getAcademyUrl(selectedCourse.courseId, next.lesson.lessonId));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Start Module Knowledge Check (randomized questions & options)
  const handleStartModuleCheck = (course: AcademyCourse, module: CourseModule) => {
    const bank: LessonKnowledgeCheckQuestion[] = module.knowledgeCheck || [];
    if (bank.length === 0) return;

    const randomized = shuffleWithPerm(bank).map((q) => {
      const idxPerm = shuffleWithPerm(q.options.map((_, i) => i));
      return {
        id: q.id,
        questionText: q.questionText,
        options: idxPerm.map((origIdx) => q.options[origIdx]),
        correctAnswer: idxPerm.indexOf(q.correctAnswer),
        explanation: q.explanation
      };
    });

    setSelectedCourse(course);
    setSelectedModule(module);
    setModuleCheckQuestions(randomized);
    setModuleCheckAnswers({});
    setModuleCheckSubmitted(false);
    setModuleCheckSummary(null);
    setViewMode('module_check');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitModuleCheck = async () => {
    if (!selectedCourse || !selectedModule || moduleCheckQuestions.length === 0) return;
    setSavingModuleCheck(true);
    let score = 0;
    moduleCheckQuestions.forEach((q) => {
      if (moduleCheckAnswers[q.id] === q.correctAnswer) score++;
    });
    const total = moduleCheckQuestions.length;
    const percentage = Math.round((score / total) * 100);
    const passed = percentage >= 60;

    setModuleCheckSubmitted(true);
    setModuleCheckSummary({ score, total, percentage, passed });

    try {
      const updated = await saveModuleCheckResult(
        participantId,
        selectedCourse.courseId,
        selectedModule.moduleId,
        score,
        total,
        {
          name: participant?.name || 'Corps Member',
          platoon: participantPlatoonNum,
          stateCode: participant?.stateCode
        }
      );
      setProgressMap((prev) => ({
        ...prev,
        [selectedCourse.courseId]: updated
      }));
    } catch (err) {
      console.error('Failed to save module check result:', err);
    } finally {
      setSavingModuleCheck(false);
    }
  };

  // Start Course Final Assessment via secure server endpoint (no answers exposed)
  const handleStartAssessment = async () => {
    if (!selectedCourse) return;
    setAssessmentLoading(true);
    setAssessmentError(null);
    setAssessmentAnswers({});
    setAssessmentResult(null);
    setViewMode('final_assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const data = await startCourseFinalAssessment(selectedCourse.courseId, participantId);
      setAssessmentToken(data.assessmentToken);
      setAssessmentQuestions(data.questions);
      setAssessmentPassThreshold(data.passThreshold);
    } catch (err: any) {
      setAssessmentError(err?.message || 'Unable to load final assessment questions.');
    } finally {
      setAssessmentLoading(false);
    }
  };

  const handleSubmitAssessment = async () => {
    if (!selectedCourse) return;
    setAssessmentSubmitting(true);
    setAssessmentError(null);
    try {
      const { evaluation, progress } = await submitCourseFinalAssessment(
        participantId,
        selectedCourse.courseId,
        assessmentAnswers,
        assessmentToken,
        {
          name: participant?.name || 'Corps Member',
          platoon: participantPlatoonNum,
          stateCode: participant?.stateCode
        }
      );
      setAssessmentResult(evaluation);
      setProgressMap((prev) => ({
        ...prev,
        [selectedCourse.courseId]: progress
      }));
    } catch (err: any) {
      console.error('Failed to submit assessment:', err);
      setAssessmentError(err?.message || 'Network error submitting assessment. Please try again.');
    } finally {
      setAssessmentSubmitting(false);
    }
  };

  // Handle capstone attachment selection (bounded size to keep Firestore payloads fast)
  const handleAttachmentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setProjectSubmitError(null);

    const nextAttachments = [...uploadedAttachments];
    for (const file of files.slice(0, 3)) {
      if (nextAttachments.length >= 4) {
        setProjectSubmitError('Maximum of 4 attached evidence files allowed per submission.');
        break;
      }
      if (file.size > 150 * 1024) {
        setProjectSubmitError(
          `"${file.name}" exceeds 150 KB. For larger documents or videos, paste a Google Drive/Canva share link below.`
        );
        continue;
      }
      const dataUrl = await new Promise<string | undefined>((resolve) => {
        if (!file.type.startsWith('image/')) {
          resolve(undefined);
          return;
        }
        const reader = new FileReader();
        reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : undefined);
        reader.onerror = () => resolve(undefined);
        reader.readAsDataURL(file);
      });
      nextAttachments.push({
        name: file.name,
        sizeBytes: file.size,
        mimeType: file.type || 'application/octet-stream',
        ...(dataUrl ? { previewDataUrl: dataUrl } : {})
      });
    }
    setUploadedAttachments(nextAttachments);
    e.target.value = '';
  };

  const handleCopyCodeSnippet = (key: string, content: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(content).then(() => {
        setCopiedSnippetKey(key);
        setTimeout(() => setCopiedSnippetKey(null), 2000);
      });
    }
  };

  const handleDownloadStarterFile = (filePath: string, content: string) => {
    const filename = filePath.split('/').pop() || 'starter-file.txt';
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleMarkChallengeDone = async (courseId: string, challengeId: string) => {
    const updated = await markCodingChallengeCompleted(participantId, courseId, challengeId);
    setProgressMap((prev) => ({ ...prev, [courseId]: updated }));
  };

  const handleMarkAiLabDone = async (courseId: string, labId: string) => {
    const updated = await markAiLabCompleted(participantId, courseId, labId);
    setProgressMap((prev) => ({ ...prev, [courseId]: updated }));
  };

  const handleOpenModuleAssignmentForm = (module: CourseModule) => {
    const existing = moduleAssignments[module.moduleId];
    setOpenAssignmentModuleId((prev) => (prev === module.moduleId ? null : module.moduleId));
    setAssignDescription(existing?.projectDescription || '');
    setAssignGithubUrl(existing?.githubRepoUrl || '');
    setAssignLiveUrl(existing?.liveAppUrl || '');
    setAssignCodeSnippet(existing?.codeSnippet || '');
    setAssignFeedback(null);
  };

  const handleSubmitModuleAssignment = async (e: React.FormEvent, module: CourseModule) => {
    e.preventDefault();
    if (!selectedCourse) return;
    if (assignDescription.trim().length < 10) {
      setAssignFeedback('Please provide a short implementation summary (at least 10 characters).');
      return;
    }
    setSavingAssignment(true);
    setAssignFeedback(null);
    try {
      const res = await saveModuleAssignmentSubmission({
        participantId,
        participantName: participant?.name || 'Corps Member',
        stateCode: participant?.stateCode,
        platoon: participantPlatoonNum,
        courseId: selectedCourse.courseId,
        courseTitle: selectedCourse.title,
        moduleId: module.moduleId,
        moduleTitle: `${module.sequenceLabel}: ${module.moduleAssignment?.title || module.title}`,
        projectDescription: assignDescription.trim(),
        githubRepoUrl: assignGithubUrl.trim(),
        liveAppUrl: assignLiveUrl.trim(),
        codeSnippet: assignCodeSnippet.trim()
      });
      if (res.submission) {
        setModuleAssignments((prev) => ({ ...prev, [module.moduleId]: res.submission! }));
        setAssignFeedback('Module assignment saved! Reviewers can inspect it in the Admin Portal.');
      }
    } catch (err: any) {
      setAssignFeedback(err?.message || 'Could not save module assignment.');
    } finally {
      setSavingAssignment(false);
    }
  };

  const handleSaveCapstoneDraft = async () => {
    if (!selectedCourse) return;
    setIsSavingDraft(true);
    setProjectSubmitError(null);
    setProjectSubmitSuccess(null);
    try {
      const cleanedLinks = supportingLinks.filter((l) => l.url.trim().length > 0);
      const saved = await saveCapstoneDraft({
        participantId,
        participantName: participant?.name || 'Corps Member',
        participantCallUpNumber: participant?.callUpNumber || '',
        participantPlatoon: participant?.platoon || '',
        platoon: participantPlatoonNum,
        stateCode: participant?.stateCode || '',
        courseId: selectedCourse.courseId,
        courseTitle: selectedCourse.title,
        projectTitle: projectTitle.trim() || `${selectedCourse.title} Draft`,
        projectDescription: projectDescription.trim(),
        businessName: businessName.trim(),
        targetCustomerSummary: targetCustomerSummary.trim(),
        valueProposition: valueProposition.trim(),
        githubRepoUrl: githubRepoUrl.trim(),
        liveAppUrl: liveAppUrl.trim(),
        deliverablesChecklist,
        supportingLinks: cleanedLinks,
        uploadedAttachments,
        artifactUrl: liveAppUrl.trim() || githubRepoUrl.trim() || cleanedLinks[0]?.url || ''
      });
      setSubmissions((prev) => [saved, ...prev.filter((s) => s.courseId !== selectedCourse.courseId)]);
      setProjectSubmitSuccess('Draft saved safely. You can continue refining and submit when ready.');
    } catch (err: any) {
      setProjectSubmitError(err?.message || 'Failed to save draft.');
    } finally {
      setIsSavingDraft(false);
    }
  };

  const handleSubmitCapstone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return;
    const cleanedLinks = supportingLinks.filter((l) => l.url.trim().length > 0);
    const hasGithubOrLive = githubRepoUrl.trim().length > 0 || liveAppUrl.trim().length > 0;

    if (projectTitle.trim().length < 3 || projectDescription.trim().length < 10) {
      setProjectSubmitError(
        'Please enter a project title (at least 3 characters) and a capstone summary (at least 10 characters).'
      );
      return;
    }
    if (!hasGithubOrLive && cleanedLinks.length === 0 && uploadedAttachments.length === 0) {
      setProjectSubmitError('Please include a GitHub repository / live app URL, supporting deliverable link, or an evidence file.');
      return;
    }

    setIsSubmittingProject(true);
    setProjectSubmitError(null);
    setProjectSubmitSuccess(null);
    try {
      const res = await submitCapstoneProjectV2({
        participantId,
        participantName: participant?.name || 'Corps Member',
        participantCallUpNumber: participant?.callUpNumber || '',
        participantPlatoon: participant?.platoon || '',
        platoon: participantPlatoonNum,
        stateCode: participant?.stateCode || '',
        courseId: selectedCourse.courseId,
        courseTitle: selectedCourse.title,
        projectTitle: projectTitle.trim(),
        projectDescription: projectDescription.trim(),
        businessName: businessName.trim(),
        targetCustomerSummary: targetCustomerSummary.trim(),
        valueProposition: valueProposition.trim(),
        githubRepoUrl: githubRepoUrl.trim(),
        liveAppUrl: liveAppUrl.trim(),
        deliverablesChecklist,
        supportingLinks: cleanedLinks,
        uploadedAttachments,
        artifactUrl: liveAppUrl.trim() || githubRepoUrl.trim() || cleanedLinks[0]?.url || ''
      });

      if (!res.success || !res.submission) {
        setProjectSubmitError(res.error || 'Failed to submit capstone project.');
      } else {
        setSubmissions((prev) => [
          res.submission!,
          ...prev.filter((s) => s.courseId !== selectedCourse.courseId)
        ]);
        setIsEditingCapstone(false);
        setProjectSubmitSuccess('Capstone submitted successfully for Coordinator/Admin review!');
        const pMap = await getParticipantAllCourseProgress(participantId);
        setProgressMap(pMap);
      }
    } catch (err: any) {
      console.error('Capstone submit error:', err);
      setProjectSubmitError(err?.message || 'Failed to submit project');
    } finally {
      setIsSubmittingProject(false);
    }
  };

  // ==========================================
  // RENDER: MODULE KNOWLEDGE CHECK VIEW
  // ==========================================
  if (viewMode === 'module_check' && selectedCourse && selectedModule) {
    const answeredCount = Object.keys(moduleCheckAnswers).length;
    return (
      <div className="max-w-3xl mx-auto px-4 py-6">
        <button
          type="button"
          onClick={() => setViewMode('course_detail')}
          className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition flex items-center gap-1.5 mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {selectedCourse.title}
        </button>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
            {selectedModule.sequenceLabel} Knowledge Check
          </span>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">
            {selectedModule.title}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {moduleCheckQuestions.length} randomized questions • 60% minimum to clear module check
          </p>
        </div>

        {moduleCheckSubmitted && moduleCheckSummary && (
          <div
            className={`p-6 rounded-2xl border mb-6 text-center ${
              moduleCheckSummary.passed
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-amber-50 border-amber-200 text-amber-950'
            }`}
          >
            <h2 className="text-xl font-black mb-1">
              {moduleCheckSummary.passed ? 'Module Knowledge Check Passed!' : 'Keep Reviewing — Retry Available'}
            </h2>
            <p className="text-sm font-semibold">
              Score: {moduleCheckSummary.score} / {moduleCheckSummary.total} ({moduleCheckSummary.percentage}%)
            </p>
            {savingModuleCheck && <p className="text-xs text-slate-500 mt-1">Saving score...</p>}
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          {moduleCheckQuestions.map((q, qIdx) => {
            const selectedOpt = moduleCheckAnswers[q.id];
            const isCorrect = selectedOpt === q.correctAnswer;

            return (
              <div key={q.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-bold text-slate-900 text-sm">
                    {qIdx + 1}. {q.questionText}
                  </p>
                  {moduleCheckSubmitted && (
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded shrink-0 ${
                        isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedOpt === optIdx;
                    let cls = 'border-slate-200 bg-white hover:border-slate-300 text-slate-700';
                    if (!moduleCheckSubmitted && isSelected) {
                      cls = 'border-indigo-600 bg-indigo-50 text-indigo-950 font-semibold';
                    } else if (moduleCheckSubmitted) {
                      if (optIdx === q.correctAnswer) {
                        cls = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                      } else if (isSelected && optIdx !== q.correctAnswer) {
                        cls = 'border-rose-500 bg-rose-50 text-rose-900';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        disabled={moduleCheckSubmitted}
                        onClick={() => setModuleCheckAnswers((prev) => ({ ...prev, [q.id]: optIdx }))}
                        className={`w-full text-left p-3 rounded-lg border text-xs md:text-sm transition flex items-center justify-between cursor-pointer ${cls}`}
                      >
                        <span>{opt}</span>
                        {moduleCheckSubmitted && optIdx === q.correctAnswer && (
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        {moduleCheckSubmitted && isSelected && optIdx !== q.correctAnswer && (
                          <X className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {moduleCheckSubmitted && (
                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700">
                    <span className="font-bold">Explanation: </span>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}

          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            {!moduleCheckSubmitted ? (
              <>
                <span className="text-xs text-slate-500">
                  Answered: {answeredCount} / {moduleCheckQuestions.length}
                </span>
                <button
                  type="button"
                  onClick={handleSubmitModuleCheck}
                  disabled={answeredCount < moduleCheckQuestions.length || savingModuleCheck}
                  className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold disabled:opacity-50 cursor-pointer"
                >
                  Submit Module Check
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => handleStartModuleCheck(selectedCourse, selectedModule)}
                  className="w-full sm:w-auto px-5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Retake Module Check
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('course_detail')}
                  className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Return to Course
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: LESSON READER VIEW
  // ==========================================
  if (viewMode === 'lesson_reader' && selectedCourse && selectedLesson) {
    const allCourseLessons: CourseLesson[] = [];
    selectedCourse.modules.forEach((m) => m.lessons.forEach((l) => allCourseLessons.push(l)));
    const currentIndex = allCourseLessons.findIndex((l) => l.lessonId === selectedLesson.lessonId);
    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex < allCourseLessons.length - 1;

    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Breadcrumb navigation */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6 flex-wrap">
          <button
            onClick={() => {
              if (onClearDeepLink) onClearDeepLink();
              setViewMode('catalog');
              navigate('/academy');
            }}
            className="hover:text-emerald-600 transition flex items-center gap-1 font-medium cursor-pointer"
          >
            <GraduationCap className="w-4 h-4" />
            Academy
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <button
            onClick={() => {
              setViewMode('course_detail');
              navigate(getAcademyUrl(selectedCourse.courseId));
            }}
            className="hover:text-emerald-600 transition truncate max-w-[200px] cursor-pointer"
          >
            {selectedCourse.title}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold truncate max-w-[220px]">
            {selectedLesson.title}
          </span>
        </div>

        {/* Lesson Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {selectedModule?.sequenceLabel}: {selectedModule?.title}
            </span>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {selectedLesson.estimatedDurationMinutes} mins
              </span>
              <span className="capitalize px-2 py-0.5 rounded bg-slate-100 font-medium">
                {selectedLesson.sequenceLabel}
              </span>
              {lessonCompleteStatus && (
                <span className="flex items-center gap-1 text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                </span>
              )}
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            {selectedLesson.sequenceLabel}. {selectedLesson.title}
          </h1>

          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            {selectedLesson.introduction}
          </p>
        </div>

        {/* Main Content Body */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-8 mb-6">
          {/* Lesson Learning Objectives (when defined) */}
          {selectedLesson.learningObjectives && selectedLesson.learningObjectives.length > 0 && (
            <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-4 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-800 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-indigo-600" />
                Lesson Learning Objectives
              </div>
              <ul className="space-y-1 text-xs text-slate-800 list-disc pl-5">
                {selectedLesson.learningObjectives.map((obj, idx) => (
                  <li key={idx} className="leading-relaxed">{obj}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Detailed Paragraphs */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
              Concept & Practical Foundation
            </h2>
            {selectedLesson.lessonContent.map((p, idx) => (
              <p key={idx} className="text-slate-700 leading-relaxed text-base">
                {p}
              </p>
            ))}
          </div>

          {/* Code Examples Section */}
          {selectedLesson.codeExamples && selectedLesson.codeExamples.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-indigo-600" />
                Code Demonstrations & Annotated Explanations
              </h2>
              {selectedLesson.codeExamples.map((ex, idx) => {
                const copyId = `ex_${selectedLesson.lessonId}_${idx}`;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 bg-slate-950 text-slate-100 overflow-hidden shadow-xs"
                  >
                    <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                          {ex.language}
                        </span>
                        <span className="text-xs font-bold text-white">{ex.title}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyCodeSnippet(copyId, ex.code)}
                        className="text-[11px] font-semibold text-slate-300 hover:text-white inline-flex items-center gap-1 cursor-pointer"
                      >
                        {copiedSnippetKey === copyId ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 text-xs font-mono text-emerald-200 overflow-x-auto leading-relaxed">
                      <code>{ex.code}</code>
                    </pre>
                    {(ex.explanation.length > 0 || ex.expectedOutput) && (
                      <div className="p-4 bg-slate-900/90 border-t border-slate-800 space-y-2 text-xs">
                        {ex.explanation.length > 0 && (
                          <ul className="space-y-1 text-slate-300 list-disc pl-4">
                            {ex.explanation.map((line, lIdx) => (
                              <li key={lIdx}>{line}</li>
                            ))}
                          </ul>
                        )}
                        {ex.expectedOutput && (
                          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-amber-200">
                            <strong>Expected Output: </strong>
                            {ex.expectedOutput}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Step-by-Step Practical Instructions (if defined) */}
          {selectedLesson.stepByStepInstructions && selectedLesson.stepByStepInstructions.length > 0 && (
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-5 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <ListChecks className="w-4 h-4 text-emerald-600" />
                Step-by-Step Action Guide
              </div>
              <ol className="space-y-2.5">
                {selectedLesson.stepByStepInstructions.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-800">
                    <span className="w-5 h-5 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Common Errors & Fixes */}
          {selectedLesson.commonErrors && selectedLesson.commonErrors.length > 0 && (
            <div className="bg-rose-50/60 border border-rose-200 rounded-xl p-5 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Common Pitfalls &amp; Fixes
              </div>
              <div className="space-y-2.5">
                {selectedLesson.commonErrors.map((ce, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-white border border-rose-200 text-xs space-y-1">
                    <p className="font-bold text-rose-900">{ce.error}</p>
                    <p className="text-slate-600">
                      <strong>Why it happens:</strong> {ce.cause}
                    </p>
                    <p className="text-emerald-800 font-medium">
                      <strong>Fix:</strong> {ce.fix}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Coding Practice Sandbox */}
          {selectedLesson.codingChallenge && (
            <CodingPracticeSandbox
              challenge={selectedLesson.codingChallenge}
              isCompleted={progressMap[selectedCourse.courseId]?.completedCodingChallengeIds?.includes(
                selectedLesson.codingChallenge.id
              )}
              onMarkCompleted={() =>
                handleMarkChallengeDone(selectedCourse.courseId, selectedLesson.codingChallenge!.id)
              }
            />
          )}

          {/* Lesson-specific AI Development Lab Challenge */}
          {selectedLesson.aiLabChallenge && (
            <AiDevelopmentLab
              trackLevel={selectedLesson.aiLabChallenge.trackLevel}
              completedLabIds={progressMap[selectedCourse.courseId]?.completedAiLabIds || []}
              onMarkLabCompleted={(labId) => handleMarkAiLabDone(selectedCourse.courseId, labId)}
              activeLessonChallenge={selectedLesson.aiLabChallenge}
            />
          )}

          {/* Nigerian Practical Context & Example */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Nigerian Practical Context & Case Studies
            </div>
            {selectedLesson.nigerianContextExamples.map((ex, idx) => (
              <p key={idx} className="text-slate-800 text-sm leading-relaxed font-medium">
                • {ex}
              </p>
            ))}
          </div>

          {/* Tools & Platforms */}
          {selectedLesson.toolsAndResources && selectedLesson.toolsAndResources.length > 0 && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-slate-600" />
                Recommended Tools & Platforms
              </div>
              <ul className="grid sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {selectedLesson.toolsAndResources.map((tool, idx) => (
                  <li key={idx} className="bg-white border border-slate-200 rounded-lg px-3 py-2 font-medium">
                    • {tool}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Practical Step-by-Step Demonstration */}
          <div className="bg-slate-900 text-slate-100 rounded-xl p-5 shadow-inner">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-400" />
              Step-by-Step Practical Demonstration
            </div>
            <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-line font-mono bg-slate-800/80 p-4 rounded-lg border border-slate-700">
              {selectedLesson.practicalDemonstration}
            </p>
          </div>

          {/* Hands-On Exercise */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-800 mb-1 flex items-center gap-1.5">
              <BookmarkCheck className="w-4 h-4 text-blue-600" />
              Hands-On Practical Exercise: {selectedLesson.handsOnExercise.title}
            </div>
            <p className="text-slate-800 text-sm font-semibold">
              {selectedLesson.handsOnExercise.task}
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700">
              {selectedLesson.handsOnExercise.steps.map((step, sIdx) => (
                <li key={sIdx}>{step}</li>
              ))}
            </ul>
            {selectedLesson.handsOnExercise.hints && selectedLesson.handsOnExercise.hints.length > 0 && (
              <div className="p-3 bg-white/80 rounded-lg border border-blue-200 text-xs text-blue-950 space-y-1">
                <span className="font-bold inline-flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" /> Hints:
                </span>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                  {selectedLesson.handsOnExercise.hints.map((h, hIdx) => (
                    <li key={hIdx}>{h}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="pt-2 border-t border-blue-200 text-xs text-blue-950 font-bold">
              Deliverable: {selectedLesson.handsOnExercise.deliverable}
            </div>
          </div>

          {/* Key Takeaways */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Key Takeaways
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {selectedLesson.keyTakeaways.map((takeaway, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 text-sm text-emerald-950 font-medium flex items-start gap-2"
                >
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{takeaway}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Downloadable / Further Learning Resources */}
          {((selectedLesson.downloadableResources && selectedLesson.downloadableResources.length > 0) ||
            (selectedLesson.furtherLearningResources && selectedLesson.furtherLearningResources.length > 0)) && (
            <div className="border-t border-slate-100 pt-6 space-y-4">
              {selectedLesson.downloadableResources && selectedLesson.downloadableResources.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-slate-600" />
                    Lesson References & Templates
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {selectedLesson.downloadableResources.map((res, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-emerald-300 transition bg-slate-50"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <ExternalLink className="w-4 h-4 text-slate-400 shrink-0" />
                          <span className="text-xs font-semibold text-slate-800 truncate">{res.title}</span>
                        </div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200 shrink-0">
                          {res.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedLesson.furtherLearningResources && selectedLesson.furtherLearningResources.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-slate-600" />
                    Further Learning Resources
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {selectedLesson.furtherLearningResources.map((res, idx) => (
                      <div key={idx} className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                        <p className="text-xs font-bold text-slate-800">{res.title}</p>
                        <p className="text-[11px] text-slate-600">{res.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Interactive Lesson Knowledge Check */}
          {selectedLesson.knowledgeCheck && selectedLesson.knowledgeCheck.length > 0 && (
            <div className="border-t-2 border-dashed border-slate-200 pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-indigo-600" />
                    Quick Knowledge Check ({selectedLesson.knowledgeCheck.length} Questions)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Verify your understanding before marking this lesson complete.
                  </p>
                </div>
                {knowledgeSubmitted && (
                  <button
                    onClick={() => {
                      setKnowledgeAnswers({});
                      setKnowledgeSubmitted(false);
                    }}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Retry Check
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {selectedLesson.knowledgeCheck.map((kc, qIdx) => {
                  const selectedOpt = knowledgeAnswers[qIdx];
                  const hasAnswered = selectedOpt !== undefined;

                  return (
                    <div key={qIdx} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50">
                      <p className="font-semibold text-slate-900 text-sm mb-3">
                        {qIdx + 1}. {kc.questionText}
                      </p>
                      <div className="space-y-2">
                        {kc.options.map((opt, optIdx) => {
                          const isSelected = selectedOpt === optIdx;
                          const isCorrect = kc.correctAnswer === optIdx;

                          let btnStyle = 'border-slate-200 bg-white hover:border-slate-300 text-slate-700';
                          if (isSelected && !knowledgeSubmitted) {
                            btnStyle = 'border-indigo-600 bg-indigo-50 text-indigo-900 font-semibold';
                          } else if (knowledgeSubmitted) {
                            if (isCorrect) {
                              btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                            } else if (isSelected && !isCorrect) {
                              btnStyle = 'border-rose-500 bg-rose-50 text-rose-900';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleKnowledgeOptionSelect(qIdx, optIdx)}
                              disabled={knowledgeSubmitted}
                              className={`w-full text-left p-3 rounded-lg border text-xs md:text-sm transition flex items-center justify-between cursor-pointer ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {knowledgeSubmitted && isCorrect && (
                                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                              )}
                              {knowledgeSubmitted && isSelected && !isCorrect && (
                                <X className="w-4 h-4 text-rose-600 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {knowledgeSubmitted && hasAnswered && (
                        <div
                          className={`mt-3 p-3 rounded-lg text-xs leading-relaxed ${
                            selectedOpt === kc.correctAnswer
                              ? 'bg-emerald-100 text-emerald-900'
                              : 'bg-rose-100 text-rose-900'
                          }`}
                        >
                          <span className="font-bold">
                            {selectedOpt === kc.correctAnswer ? 'Correct! ' : 'Not quite. '}
                          </span>
                          {kc.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}

                {!knowledgeSubmitted ? (
                  <button
                    onClick={handleCheckKnowledge}
                    disabled={Object.keys(knowledgeAnswers).length < selectedLesson.knowledgeCheck.length}
                    className="w-full py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Check Answers
                  </button>
                ) : null}
              </div>
            </div>
          )}

          {/* Mark Complete Action Bar */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handleMarkLessonComplete}
              disabled={savingLesson || lessonCompleteStatus}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition shadow-sm ${
                lessonCompleteStatus
                  ? 'bg-emerald-100 text-emerald-800 cursor-default'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
              {savingLesson
                ? 'Recording Progress...'
                : lessonCompleteStatus
                  ? 'Lesson Completed'
                  : 'Mark as Complete & Save'}
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={() => navigateAdjacentLesson('prev')}
                disabled={!hasPrev}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Previous
              </button>
              <button
                onClick={() => navigateAdjacentLesson('next')}
                disabled={!hasNext}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
              >
                Next <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => {
              setViewMode('course_detail');
              navigate(getAcademyUrl(selectedCourse.courseId));
            }}
            className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition flex items-center gap-1.5 py-2 px-4 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Course Overview
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: FINAL ASSESSMENT RUNNER
  // ==========================================
  if (viewMode === 'final_assessment' && selectedCourse) {
    const questions = assessmentQuestions;
    const passRequired = assessmentPassThreshold || getEffectiveCoursePassThreshold(selectedCourse, globalConfig);

    return (
      <div className="max-w-3xl mx-auto px-4 py-6">
        <button
          onClick={() => setViewMode('course_detail')}
          className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition flex items-center gap-1.5 mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Course Overview
        </button>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="p-2.5 bg-indigo-50 text-indigo-700 rounded-xl">
              <Award className="w-6 h-6" />
            </span>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-900">
                {selectedCourse.title} — Final Assessment
              </h1>
              <p className="text-xs text-slate-500">
                {questions.length || selectedCourse.finalAssessment.length} Randomized Scenario Questions • {passRequired}% Required to Pass
              </p>
            </div>
          </div>
        </div>

        {assessmentError && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs mb-6 flex items-center justify-between gap-3">
            <span>{assessmentError}</span>
            <button
              type="button"
              onClick={handleStartAssessment}
              className="px-3 py-1.5 bg-rose-700 text-white rounded-lg font-bold cursor-pointer shrink-0"
            >
              Retry Load
            </button>
          </div>
        )}

        {assessmentLoading ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-sm text-slate-600">
            Preparing randomized assessment questions from server...
          </div>
        ) : assessmentResult ? (
          /* Assessment Results Screen */
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-6">
            <div
              className={`p-6 rounded-2xl text-center border ${
                assessmentResult.passed
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 shadow-sm bg-white">
                {assessmentResult.passed ? (
                  <Award className="w-9 h-9 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-9 h-9 text-rose-600" />
                )}
              </div>
              <h2 className="text-2xl font-black mb-1">
                {assessmentResult.passed ? 'Course Assessment Passed!' : 'Assessment Not Passed'}
              </h2>
              <p className="text-sm font-medium mb-2">
                You scored <span className="font-bold">{assessmentResult.score}</span> out of{' '}
                {assessmentResult.total} ({assessmentResult.percentage}%) • Pass Mark: {assessmentResult.passThreshold ?? passRequired}%
              </p>
              {assessmentResult.verificationToken && (
                <p className="text-[11px] font-mono text-slate-500 mb-2">
                  Verification ID: {assessmentResult.verificationToken}
                </p>
              )}
              <p className="text-xs max-w-md mx-auto text-slate-600">
                {assessmentResult.passed
                  ? 'Congratulations! You have satisfied the final assessment requirement for this course.'
                  : 'Review the explanations below, revisit highlighted modules, and retake the randomized assessment when ready.'}
              </p>
            </div>

            {/* Module Breakdown if present */}
            {assessmentResult.moduleBreakdown &&
              Object.keys(assessmentResult.moduleBreakdown).length > 0 && (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Module Performance Breakdown
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-2 text-xs">
                    {selectedCourse.modules.map((m) => {
                      const stat = assessmentResult.moduleBreakdown?.[m.moduleId];
                      if (!stat) return null;
                      return (
                        <div key={m.moduleId} className="bg-white p-2.5 rounded-lg border border-slate-200">
                          <span className="font-bold text-slate-800 block">{m.sequenceLabel}</span>
                          <span className="text-slate-600">
                            {stat.score} / {stat.total} ({Math.round((stat.score / stat.total) * 100)}%)
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            {/* Question Breakdown */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                Detailed Review & Explanations
              </h3>
              {assessmentResult.results.map((r, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border text-sm ${
                    r.isCorrect ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/40 border-rose-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="font-semibold text-slate-900">
                      {idx + 1}. {r.questionText}
                    </p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded font-bold uppercase shrink-0 ${
                        r.isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {r.isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>
                  {r.options && (
                    <p className="text-xs text-slate-700 mb-1.5">
                      <span className="font-semibold">Correct Answer: </span>
                      {r.options[r.correctAnswer]}
                    </p>
                  )}
                  <p className="text-xs text-slate-600 leading-relaxed mb-1">
                    <span className="font-bold">Explanation: </span>
                    {r.explanation}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={handleStartAssessment}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Retake Assessment (Fresh Shuffle)
              </button>
              <button
                onClick={() => setViewMode('course_detail')}
                className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition cursor-pointer"
              >
                Return to Course
              </button>
            </div>
          </div>
        ) : (
          /* Question Form */
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-6">
            {questions.map((q, qIdx) => {
              const selectedOpt = assessmentAnswers[q.id];
              return (
                <div key={q.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50/60">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold uppercase text-slate-400">
                      Question {qIdx + 1} of {questions.length}
                    </span>
                  </div>
                  <p className="font-bold text-slate-900 text-sm mb-4 leading-relaxed">
                    {q.questionText}
                  </p>
                  <div className="space-y-2">
                    {q.options.map((opt: string, optIdx: number) => {
                      const isSelected = selectedOpt === optIdx;
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() =>
                            setAssessmentAnswers((prev) => ({ ...prev, [q.id]: optIdx }))
                          }
                          className={`w-full text-left p-3 rounded-lg border text-xs md:text-sm transition flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50 text-indigo-950 font-semibold'
                              : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          <span>{opt}</span>
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 text-[10px] ${
                              isSelected
                                ? 'border-indigo-600 bg-indigo-600 text-white'
                                : 'border-slate-300'
                            }`}
                          >
                            {isSelected ? '✓' : ''}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500">
                Answered: {Object.keys(assessmentAnswers).length} / {questions.length}
              </span>
              <button
                onClick={handleSubmitAssessment}
                disabled={
                  assessmentSubmitting ||
                  questions.length === 0 ||
                  Object.keys(assessmentAnswers).length < questions.length
                }
                className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                {assessmentSubmitting ? (
                  'Grading Assessment...'
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Submit for Evaluation
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // RENDER: COURSE DETAIL VIEW
  // ==========================================
  if (viewMode === 'course_detail' && selectedCourse) {
    const courseProgress = progressMap[selectedCourse.courseId];
    const completedLessonIds = courseProgress?.completedLessonIds || [];
    const courseSubmission = submissions.find((s) => s.courseId === selectedCourse.courseId);
    const completion = getCourseCompletionSummary(
      courseProgress,
      selectedCourse,
      courseSubmission,
      globalConfig
    );
    const activeRubric =
      globalConfig.capstoneRubricOverrides?.[selectedCourse.courseId] ||
      selectedCourse.capstoneProject.rubric;

    const statusBadgeClass = (status?: string) => {
      switch (status) {
        case 'approved':
          return 'bg-emerald-200 text-emerald-950';
        case 'revision_requested':
        case 'resubmission_requested':
          return 'bg-amber-200 text-amber-950';
        case 'rejected':
          return 'bg-rose-200 text-rose-950';
        case 'under_review':
          return 'bg-blue-200 text-blue-950';
        case 'draft':
          return 'bg-slate-200 text-slate-800';
        default:
          return 'bg-indigo-200 text-indigo-950';
      }
    };

    const canEditCapstone =
      isEditingCapstone ||
      !courseSubmission ||
      courseSubmission.submissionStatus === 'draft' ||
      courseSubmission.submissionStatus === 'revision_requested' ||
      courseSubmission.submissionStatus === 'resubmission_requested';

    return (
      <div className="max-w-5xl mx-auto px-4 py-6">
        <button
          onClick={() => {
            if (onClearDeepLink) onClearDeepLink();
            setViewMode('catalog');
            navigate('/academy');
          }}
          className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition flex items-center gap-1.5 mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Courses
        </button>

        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 md:p-10 shadow-lg mb-8 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 capitalize">
                Category: {selectedCourse.categoryId.replace(/_/g, ' ')}
              </span>
              {selectedCourse.difficulty && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Level: {selectedCourse.difficulty}
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-2">
              {selectedCourse.title}
            </h1>
            {selectedCourse.subtitle && (
              <p className="text-emerald-300 text-sm md:text-base font-semibold mb-3">
                {selectedCourse.subtitle}
              </p>
            )}
            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
              {selectedCourse.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-slate-300">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                <Clock className="w-4 h-4 text-emerald-400" />
                {selectedCourse.expectedDuration}
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                {selectedCourse.modules.length} Modules • {completion.totalLessonsCount} Lessons
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                <Award className="w-4 h-4 text-emerald-400" />
                Capstone & {completion.finalAssessmentPassThreshold}% Final Assessment
              </span>
            </div>
          </div>
        </div>

        {/* Prerequisites / Progression Guidance (Advisory Only - Never Blocks Access) */}
        {selectedCourse.prerequisites && selectedCourse.prerequisites.length > 0 && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <span className="font-bold text-indigo-950 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-indigo-600" />
                Recommended Prerequisites &amp; Placement Guidance
              </span>
              <p className="text-indigo-900">
                Recommended background: {selectedCourse.prerequisites.join(' • ')}. You are free to explore any track, or verify readiness with the quick placement check.
              </p>
            </div>
            {(WEB_DEV_COURSE_IDS as readonly string[]).includes(selectedCourse.courseId) && (
              <button
                type="button"
                onClick={() => setShowPlacementModal(true)}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer shrink-0"
              >
                Take Placement Check
              </button>
            )}
          </div>
        )}

        {/* Learning Outcomes & Requirements */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-600" />
              Course Learning Outcomes
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {selectedCourse.learningObjectives.map((obj) => (
                <div key={obj.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {obj.code}
                  </span>
                  <h3 className="text-xs font-bold text-slate-900">{obj.title}</h3>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{obj.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-2">Entry Requirements</h2>
              {selectedCourse.requirements && selectedCourse.requirements.length > 0 ? (
                <ul className="space-y-1.5 text-xs text-slate-600 list-disc pl-4">
                  {selectedCourse.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-600 leading-relaxed">{selectedCourse.entryRequirements}</p>
              )}
            </div>
            <div className="pt-3 border-t border-slate-100">
              <span className="text-[11px] font-bold uppercase text-slate-400 block mb-1">Target Learners</span>
              <p className="text-xs text-slate-700 leading-relaxed">{selectedCourse.targetAudience}</p>
            </div>
          </div>
        </div>

        {/* Practical Projects & Starter Templates (Web Dev Academy tracks) */}
        {((selectedCourse.practicalProjects && selectedCourse.practicalProjects.length > 0) ||
          (selectedCourse.starterProjectTemplates && selectedCourse.starterProjectTemplates.length > 0)) && (
          <div className="space-y-6 mb-8">
            {selectedCourse.practicalProjects && selectedCourse.practicalProjects.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-emerald-600" />
                    Track Practical Build Projects ({selectedCourse.practicalProjects.length})
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedCourse.practicalProjects.map((proj, pIdx) => (
                    <div key={proj.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        Project {pIdx + 1}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900">{proj.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{proj.summary}</p>
                      <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-slate-700">
                        {proj.deliverables.map((del, dIdx) => (
                          <li key={dIdx}>{del}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedCourse.starterProjectTemplates && selectedCourse.starterProjectTemplates.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Download className="w-5 h-5 text-indigo-600" />
                    Downloadable Starter Kits & Local Setup Commands
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Copy or download starter source files directly to run this track's projects locally on your laptop.
                  </p>
                </div>

                {selectedCourse.starterProjectTemplates.map((tpl) => (
                  <div key={tpl.id} className="p-4 rounded-xl bg-slate-900 text-slate-100 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-bold text-white">{tpl.title}</h3>
                        <p className="text-xs text-slate-300">{tpl.description}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyCodeSnippet(`cmd_${tpl.id}`, tpl.setupCommand)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 text-xs font-mono border border-slate-700 inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer shrink-0"
                      >
                        <Terminal className="w-3.5 h-3.5" />
                        <span>{copiedSnippetKey === `cmd_${tpl.id}` ? 'Command Copied!' : 'Copy Setup Command'}</span>
                      </button>
                    </div>
                    <pre className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-amber-200 overflow-x-auto">
                      {tpl.setupCommand}
                    </pre>
                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {tpl.files.map((file) => (
                        <div
                          key={file.path}
                          className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between gap-2"
                        >
                          <span className="text-xs font-mono text-slate-200 truncate">{file.path}</span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleCopyCodeSnippet(`f_${tpl.id}_${file.path}`, file.content)}
                              className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-200 cursor-pointer"
                            >
                              {copiedSnippetKey === `f_${tpl.id}_${file.path}` ? 'Copied' : 'Copy'}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDownloadStarterFile(file.path, file.content)}
                              className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-[11px] font-bold text-white inline-flex items-center gap-1 cursor-pointer"
                            >
                              <Download className="w-3 h-3" /> Save
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Embedded AI Development Lab Launcher for Intermediate & Advanced Web Dev */}
        {(selectedCourse.courseId === 'web-development-intermediate' ||
          selectedCourse.courseId === 'web-development-advanced') && (
          <div className="mb-8 space-y-4">
            <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-indigo-300">
                  <Cpu className="w-4 h-4" /> Integrated Engineering Lab
                </div>
                <h3 className="text-base font-bold">
                  AI Development Lab ({selectedCourse.level === 'advanced' ? 'Advanced Full-Stack' : 'Intermediate Web Dev'})
                </h3>
                <p className="text-xs text-slate-300">
                  Practice spec prompting, sanitized debugging, OWASP PR audits, and code-review challenges directly inside this track.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCourseAiLab((prev) => !prev)}
                className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-black whitespace-nowrap cursor-pointer shrink-0"
              >
                {showCourseAiLab ? 'Hide AI Lab' : 'Open AI Development Lab'}
              </button>
            </div>
            {showCourseAiLab && (
              <AiDevelopmentLab
                trackLevel={selectedCourse.level === 'advanced' ? 'advanced' : 'intermediate'}
                completedLabIds={courseProgress?.completedAiLabIds || []}
                onMarkLabCompleted={(labId) => handleMarkAiLabDone(selectedCourse.courseId, labId)}
              />
            )}
          </div>
        )}

        {/* Course Progress & Certificate Eligibility Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Completion & Certification Readiness</h2>
              <p className="text-xs text-slate-500">
                Overall Course Completion: {completion.overallCompletionPct}% • {completion.completedLessonsCount} of {completion.totalLessonsCount} lessons finished
              </p>
            </div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${
                  completion.certificateEligible
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {completion.certificateEligible ? (
                  <Unlock className="w-3.5 h-3.5 text-emerald-700" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                )}
                {completion.certificateEligible ? 'Certificate Eligible' : 'Certificate Locked Until Complete'}
              </span>
              {onNavigateToQuiz && (
                <button
                  onClick={() => onNavigateToQuiz(selectedCourse.categoryId)}
                  className="text-xs font-semibold px-3 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Target className="w-3.5 h-3.5 text-emerald-600" /> Practice Quiz Category
                </button>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div
              className="bg-emerald-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completion.overallCompletionPct}%` }}
            />
          </div>

          {/* 4-Criteria Checklist */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className={`p-3 rounded-xl border ${completion.allLessonsDone ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
              <span className="text-[11px] font-bold text-slate-500 block">1. Lessons</span>
              <p className="font-black text-slate-900 mt-0.5">
                {completion.completedLessonsCount} / {completion.totalLessonsCount}
              </p>
              <span className="text-[10px] text-slate-600">
                {completion.allLessonsDone ? '✓ Requirement Met' : 'Finish all lessons'}
              </span>
            </div>

            <div className={`p-3 rounded-xl border ${completion.allModuleChecksDone ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
              <span className="text-[11px] font-bold text-slate-500 block">2. Module Checks</span>
              <p className="font-black text-slate-900 mt-0.5">
                {completion.completedModuleChecksCount} / {completion.requiredModuleChecksCount}
              </p>
              <span className="text-[10px] text-slate-600">
                {completion.requiredModuleChecksCount === 0
                  ? 'Included in lessons'
                  : completion.allModuleChecksDone
                    ? '✓ All Checks Passed'
                    : 'Pass module checks (>=60%)'}
              </span>
            </div>

            <div className={`p-3 rounded-xl border ${completion.finalAssessmentPassed ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
              <span className="text-[11px] font-bold text-slate-500 block">3. Final Assessment</span>
              <p className="font-black text-slate-900 mt-0.5">
                Best: {completion.finalAssessmentBestScore}%
              </p>
              <span className="text-[10px] text-slate-600">
                {completion.finalAssessmentPassed
                  ? `✓ Passed (>=${completion.finalAssessmentPassThreshold}%)`
                  : `Pass mark: ${completion.finalAssessmentPassThreshold}%`}
              </span>
            </div>

            <div className={`p-3 rounded-xl border ${completion.capstoneRequirementMet ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
              <span className="text-[11px] font-bold text-slate-500 block">4. Capstone Project</span>
              <p className="font-black text-slate-900 mt-0.5 capitalize">
                {courseSubmission?.submissionStatus?.replace('_', ' ') || 'Not Submitted'}
              </p>
              <span className="text-[10px] text-slate-600">
                {completion.capstoneRequirementMet
                  ? '✓ Requirement Met'
                  : 'Submit capstone deliverables'}
              </span>
            </div>
          </div>

          {completion.certificateEligible && (
            <div className="p-4 bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <p className="font-bold text-sm text-amber-300">Course Completion Unlocked!</p>
                <p className="text-emerald-100">
                  You have met all requirements for {selectedCourse.title}. Verification ID:{' '}
                  <span className="font-mono">{courseProgress?.finalAssessmentVerificationToken || 'READY'}</span>
                </p>
              </div>
              <span className="px-3 py-1.5 bg-amber-400 text-stone-950 font-black rounded-lg shrink-0">
                Verified Ready
              </span>
            </div>
          )}

          {/* YouTube Resource Unlock */}
          {selectedCourse.youtubeUrl && (
            <div className="pt-4 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-red-50 rounded-2xl border border-red-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white text-red-600 rounded-xl shadow-xs">
                    <Youtube className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Full Video Curriculum</h4>
                    <p className="text-xs text-slate-500">Subscribe to our channel to unlock additional video resources.</p>
                  </div>
                </div>
                {hasSubscribed ? (
                  <a
                    href={selectedCourse.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition shadow-md"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Access on YouTube</span>
                  </a>
                ) : (
                  <button
                    onClick={() => setShowYoutubeModal(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-red-600 text-white font-bold rounded-xl text-xs transition shadow-md cursor-pointer"
                  >
                    <Youtube className="w-3.5 h-3.5" />
                    <span>Unlock Video Resources</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {showYoutubeModal && (
          <YoutubeUnlockModal
            course={selectedCourse}
            onClose={() => setShowYoutubeModal(false)}
            onConfirm={() => {
              setHasSubscribed(true);
              setShowYoutubeModal(false);
            }}
          />
        )}

        {/* Modules & Lessons List */}
        <div className="space-y-4 mb-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Curriculum & Modules</h2>
            <button
              onClick={() => {
                const allExp: Record<string, boolean> = {};
                const areAllExpanded = selectedCourse.modules.every((m) => expandedModules[m.moduleId]);
                selectedCourse.modules.forEach((m) => {
                  allExp[m.moduleId] = !areAllExpanded;
                });
                setExpandedModules(allExp);
              }}
              className="text-xs font-medium text-emerald-600 hover:text-emerald-800 cursor-pointer"
            >
              Toggle All
            </button>
          </div>

          {selectedCourse.modules.map((module) => {
            const isExpanded = !!expandedModules[module.moduleId];
            const modCompletedCount = module.lessons.filter((l) =>
              completedLessonIds.includes(l.lessonId)
            ).length;
            const modCheckBest =
              courseProgress?.moduleCheckDetails?.[module.moduleId]?.percentage ??
              courseProgress?.moduleCheckScores?.[module.moduleId];

            return (
              <div
                key={module.moduleId}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition"
              >
                <button
                  type="button"
                  onClick={() => toggleModuleAccordion(module.moduleId)}
                  className="w-full p-5 text-left flex items-start justify-between gap-4 bg-slate-50/70 hover:bg-slate-50 transition border-b border-slate-100 cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {module.sequenceLabel}
                      </span>
                      <span className="text-xs text-slate-500">
                        {modCompletedCount} / {module.lessons.length} lessons completed
                      </span>
                      {modCheckBest !== undefined && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                          Module Check Best: {modCheckBest}%
                        </span>
                      )}
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-slate-900">{module.title}</h3>
                    <p className="text-xs text-slate-500">{module.description}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 shrink-0">
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-slate-700' : ''
                      }`}
                    />
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-3 space-y-3">
                    <div className="divide-y divide-slate-100">
                      {module.lessons.map((lesson) => {
                        const isComplete = completedLessonIds.includes(lesson.lessonId);

                        return (
                          <div
                            key={lesson.lessonId}
                            className="p-3 md:p-4 rounded-xl hover:bg-slate-50 transition flex items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                                  isComplete
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                {isComplete ? <Check className="w-4 h-4" /> : lesson.sequenceLabel}
                              </span>
                              <div>
                                <h4 className="text-sm font-semibold text-slate-900">{lesson.title}</h4>
                                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {lesson.estimatedDurationMinutes}m
                                  </span>
                                  <span>•</span>
                                  <span>{lesson.knowledgeCheck.length} check Qs</span>
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => handleOpenLesson(selectedCourse, module, lesson)}
                              className="px-3.5 py-1.5 text-xs font-bold rounded-lg border border-slate-200 hover:border-emerald-500 hover:text-emerald-700 transition shrink-0 bg-white shadow-xs flex items-center gap-1 cursor-pointer"
                            >
                              {isComplete ? 'Review' : 'Start'}
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {/* Module Assignment & Module Knowledge Check Bar */}
                    {(module.moduleAssignment || (module.knowledgeCheck && module.knowledgeCheck.length > 0)) && (
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                        {module.moduleAssignment && (
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider">
                                <ClipboardCheck className="w-4 h-4 text-amber-600" />
                                <span>{module.moduleAssignment.title}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {moduleAssignments[module.moduleId] && (
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                                    Submitted ({moduleAssignments[module.moduleId].submissionStatus.replace('_', ' ')})
                                  </span>
                                )}
                                {(WEB_DEV_COURSE_IDS as readonly string[]).includes(selectedCourse.courseId) && (
                                  <button
                                    type="button"
                                    onClick={() => handleOpenModuleAssignmentForm(module)}
                                    className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold cursor-pointer whitespace-nowrap"
                                  >
                                    {openAssignmentModuleId === module.moduleId
                                      ? 'Close Assignment Form'
                                      : moduleAssignments[module.moduleId]
                                        ? 'Update Submission'
                                        : 'Submit Assignment'}
                                  </button>
                                )}
                              </div>
                            </div>
                            <p className="text-xs text-slate-700">{module.moduleAssignment.description}</p>
                            <ul className="list-disc pl-5 text-[11px] text-slate-600 space-y-0.5">
                              {module.moduleAssignment.deliverables.map((d, i) => (
                                <li key={i}>{d}</li>
                              ))}
                            </ul>

                            {/* Per-Module Coding Assignment Form */}
                            {openAssignmentModuleId === module.moduleId && (
                              <form
                                onSubmit={(e) => handleSubmitModuleAssignment(e, module)}
                                className="mt-3 p-4 rounded-xl bg-white border border-amber-200 space-y-3 text-xs"
                              >
                                <span className="font-bold text-slate-900 block">
                                  Submit {module.sequenceLabel} Assignment Evidence
                                </span>
                                {assignFeedback && (
                                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-medium">
                                    {assignFeedback}
                                  </div>
                                )}
                                <div className="grid sm:grid-cols-2 gap-2.5">
                                  <div>
                                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                      GitHub Repo URL (Optional)
                                    </label>
                                    <input
                                      type="url"
                                      value={assignGithubUrl}
                                      onChange={(e) => setAssignGithubUrl(e.target.value)}
                                      placeholder="https://github.com/username/project"
                                      className="w-full p-2 rounded-lg border border-slate-300 text-xs"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                      Live App URL (Optional)
                                    </label>
                                    <input
                                      type="url"
                                      value={assignLiveUrl}
                                      onChange={(e) => setAssignLiveUrl(e.target.value)}
                                      placeholder="https://your-app.netlify.app"
                                      className="w-full p-2 rounded-lg border border-slate-300 text-xs"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                    What You Built & Tested *
                                  </label>
                                  <textarea
                                    required
                                    rows={2}
                                    value={assignDescription}
                                    onChange={(e) => setAssignDescription(e.target.value)}
                                    placeholder="Describe your implementation, edge cases checked, and what you verified..."
                                    className="w-full p-2 rounded-lg border border-slate-300 text-xs"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                    Key Code Snippet / PR Diff Notes (Optional)
                                  </label>
                                  <textarea
                                    rows={3}
                                    value={assignCodeSnippet}
                                    onChange={(e) => setAssignCodeSnippet(e.target.value)}
                                    placeholder="// Paste a sanitized key component, HTML markup, or SQL snippet (no API keys)"
                                    className="w-full p-2 rounded-lg border border-slate-300 font-mono text-[11px]"
                                  />
                                </div>
                                <div className="flex justify-end">
                                  <button
                                    type="submit"
                                    disabled={savingAssignment}
                                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold cursor-pointer disabled:opacity-50"
                                  >
                                    {savingAssignment ? 'Saving...' : 'Save Module Assignment'}
                                  </button>
                                </div>
                              </form>
                            )}
                          </div>
                        )}

                        {module.knowledgeCheck && module.knowledgeCheck.length > 0 && (
                          <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="text-xs text-slate-600">
                              <strong className="text-slate-900">Module Checkpoint:</strong>{' '}
                              {module.knowledgeCheck.length} randomized assessment questions
                            </div>
                            <button
                              type="button"
                              onClick={() => handleStartModuleCheck(selectedCourse, module)}
                              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition cursor-pointer shrink-0 flex items-center gap-1.5"
                            >
                              <HelpCircle className="w-3.5 h-3.5" />
                              <span>{modCheckBest !== undefined ? 'Retake Module Check' : 'Take Module Check'}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Capstone Project Workspace */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 mb-8 space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-amber-50 text-amber-700 rounded-xl">
                <Layers className="w-6 h-6" />
              </span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                  Final Course Capstone
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  {selectedCourse.capstoneProject.title}
                </h2>
              </div>
            </div>
            {courseSubmission && (
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${statusBadgeClass(
                  courseSubmission.submissionStatus
                )}`}
              >
                Status: {(courseSubmission.submissionStatus || 'submitted').replace('_', ' ')}
              </span>
            )}
          </div>

          <p className="text-slate-700 text-sm leading-relaxed">
            {selectedCourse.capstoneProject.overview}
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
              <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-wide">
                Required Instructions:
              </h4>
              <ul className="space-y-1.5 list-disc list-inside">
                {selectedCourse.capstoneProject.instructions.map((inst, i) => (
                  <li key={i}>{inst}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
              <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-wide">
                Evaluation Rubric:
              </h4>
              {activeRubric && activeRubric.length > 0 ? (
                <div className="space-y-1.5">
                  {activeRubric.map((r) => (
                    <div key={r.id} className="flex items-start justify-between gap-2 bg-white p-2 rounded-lg border border-slate-200/80">
                      <div>
                        <span className="font-bold text-slate-900 block">{r.criterion}</span>
                        <span className="text-[11px] text-slate-500">{r.description}</span>
                      </div>
                      <span className="font-mono font-bold text-emerald-700 shrink-0">{r.weight}%</span>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="space-y-1.5 list-disc list-inside">
                  {selectedCourse.capstoneProject.assessmentCriteria.map((crit, i) => (
                    <li key={i}>{crit}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Existing Submitted View (unless editing draft or revising) */}
          {courseSubmission && !canEditCapstone && (
            <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Submitted Capstone Summary
                </span>
                {courseSubmission.score !== undefined && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-white border border-emerald-300 text-emerald-900">
                    Score: {courseSubmission.score}/100
                  </span>
                )}
              </div>
              <h4 className="font-bold text-slate-900 text-base">{courseSubmission.projectTitle}</h4>
              {courseSubmission.businessName && (
                <p className="text-xs text-slate-700">
                  <strong>Business / Brand:</strong> {courseSubmission.businessName}
                </p>
              )}
              <p className="text-xs text-slate-700 whitespace-pre-line">{courseSubmission.projectDescription}</p>

              {/* GitHub Repo, Live App, & Supporting Links */}
              {(courseSubmission.githubRepoUrl || courseSubmission.liveAppUrl) && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {courseSubmission.githubRepoUrl && (
                    <a
                      href={courseSubmission.githubRepoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-slate-900 hover:underline font-semibold bg-white px-3 py-1.5 rounded-lg border border-slate-300 inline-flex items-center gap-1.5"
                    >
                      <FolderGit2 className="w-3.5 h-3.5" />
                      <span>GitHub Repository</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {courseSubmission.liveAppUrl && (
                    <a
                      href={courseSubmission.liveAppUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-emerald-800 hover:underline font-semibold bg-white px-3 py-1.5 rounded-lg border border-emerald-300 inline-flex items-center gap-1.5"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Live Deployed App</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              )}

              {courseSubmission.supportingLinks && courseSubmission.supportingLinks.length > 0 ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {courseSubmission.supportingLinks.map((lnk, idx) => (
                    <a
                      key={idx}
                      href={lnk.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-indigo-700 hover:underline font-semibold bg-white px-3 py-1.5 rounded-lg border border-indigo-200 inline-flex items-center gap-1"
                    >
                      <span>{lnk.label || 'Evidence Link'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              ) : (
                (courseSubmission.artifactUrl || courseSubmission.submissionUrl) && (
                  <a
                    href={courseSubmission.artifactUrl || courseSubmission.submissionUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-indigo-600 hover:underline font-semibold inline-flex items-center gap-1"
                  >
                    View Deliverable Link <ExternalLink className="w-3 h-3" />
                  </a>
                )
              )}

              {courseSubmission.rubricScores && Object.keys(courseSubmission.rubricScores).length > 0 && (
                <div className="p-3 bg-white rounded-lg border border-emerald-200 text-xs space-y-1">
                  <span className="font-bold text-slate-900 block">Rubric Breakdown:</span>
                  <div className="grid sm:grid-cols-2 gap-1.5">
                    {Object.entries(courseSubmission.rubricScores).map(([key, val]) => {
                      const label = activeRubric?.find((r) => r.id === key)?.criterion || key;
                      return (
                        <div key={key} className="flex justify-between text-[11px] text-slate-700">
                          <span className="truncate">{label}</span>
                          <span className="font-mono font-bold">{val}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {(courseSubmission.reviewerFeedback || courseSubmission.coordinatorFeedback) && (
                <div className="p-3 bg-white rounded-lg border border-emerald-200 text-xs text-slate-800">
                  <span className="font-bold">Reviewer Feedback: </span>
                  {courseSubmission.reviewerFeedback || courseSubmission.coordinatorFeedback}
                </div>
              )}
            </div>
          )}

          {/* Capstone Draft / Submit / Revision Form */}
          {canEditCapstone && (
            <form onSubmit={handleSubmitCapstone} className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-900">
                  {courseSubmission?.submissionStatus === 'revision_requested'
                    ? 'Revise & Resubmit Capstone Project'
                    : courseSubmission?.submissionStatus === 'draft'
                      ? 'Continue Saved Capstone Draft'
                      : 'Capstone Workspace & Submission'}
                </h3>
                {courseSubmission?.draftSavedAt && (
                  <span className="text-[11px] text-slate-500">
                    Last draft saved: {new Date(courseSubmission.draftSavedAt).toLocaleString()}
                  </span>
                )}
              </div>

              {(courseSubmission?.reviewerFeedback || courseSubmission?.coordinatorFeedback) && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950">
                  <strong>Reviewer Revision Note: </strong>
                  {courseSubmission.reviewerFeedback || courseSubmission.coordinatorFeedback}
                </div>
              )}

              {projectSubmitError && (
                <div className="p-3 bg-rose-50 text-rose-800 text-xs rounded-lg border border-rose-200">
                  {projectSubmitError}
                </div>
              )}
              {projectSubmitSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-lg border border-emerald-200">
                  {projectSubmitSuccess}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="e.g., Zaria Fresh Spice Co. Online Launch Kit"
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Business / Brand Name
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g., CraftWear Nigeria"
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Target Customer Summary
                  </label>
                  <input
                    type="text"
                    value={targetCustomerSummary}
                    onChange={(e) => setTargetCustomerSummary(e.target.value)}
                    placeholder="e.g., Young professionals 24-38 in Abuja needing weekly meal bowls"
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Core Value Proposition
                  </label>
                  <input
                    type="text"
                    value={valueProposition}
                    onChange={(e) => setValueProposition(e.target.value)}
                    placeholder="e.g., Hygienic ₦4,500 pre-order bowls delivered before 1 PM"
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {(WEB_DEV_COURSE_IDS as readonly string[]).includes(selectedCourse.courseId) && (
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      GitHub Repository URL
                    </label>
                    <input
                      type="url"
                      value={githubRepoUrl}
                      onChange={(e) => setGithubRepoUrl(e.target.value)}
                      placeholder="https://github.com/username/web-app"
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Live Deployed Application URL
                    </label>
                    <input
                      type="url"
                      value={liveAppUrl}
                      onChange={(e) => setLiveAppUrl(e.target.value)}
                      placeholder="https://my-app.vercel.app"
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Capstone Execution Summary & Launch Plan *
                </label>
                <textarea
                  required
                  rows={4}
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Summarise your digital channels, content calendar, acquisition campaign, payment/delivery setup, weekly KPI sheet, and 90-day plan..."
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* 12 Deliverables Checklist (when defined on course) */}
              {selectedCourse.capstoneProject.deliverables &&
                selectedCourse.capstoneProject.deliverables.length > 0 && (
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">
                        Required Capstone Deliverables Checklist (
                        {
                          selectedCourse.capstoneProject.deliverables.filter(
                            (d) => deliverablesChecklist[d]
                          ).length
                        }
                        /{selectedCourse.capstoneProject.deliverables.length})
                      </span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {selectedCourse.capstoneProject.deliverables.map((item) => (
                        <label
                          key={item}
                          className="flex items-start gap-2 p-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 cursor-pointer hover:border-emerald-300"
                        >
                          <input
                            type="checkbox"
                            checked={Boolean(deliverablesChecklist[item])}
                            onChange={(e) =>
                              setDeliverablesChecklist((prev) => ({
                                ...prev,
                                [item]: e.target.checked
                              }))
                            }
                            className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

              {/* Supporting Links */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700">
                    Supporting Deliverable Links (Google Drive, Canva, Sheets, Instagram/WhatsApp) *
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setSupportingLinks((prev) => [...prev, { label: 'Additional Resource', url: '' }])
                    }
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Link
                  </button>
                </div>
                {supportingLinks.map((lnk, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={lnk.label}
                      onChange={(e) =>
                        setSupportingLinks((prev) =>
                          prev.map((item, i) => (i === idx ? { ...item, label: e.target.value } : item))
                        )
                      }
                      placeholder="Label (e.g., 7-Day Calendar / Canva Folder)"
                      className="sm:w-1/3 text-xs p-2.5 rounded-lg border border-slate-300"
                    />
                    <input
                      type="url"
                      value={lnk.url}
                      onChange={(e) =>
                        setSupportingLinks((prev) =>
                          prev.map((item, i) => (i === idx ? { ...item, url: e.target.value } : item))
                        )
                      }
                      placeholder="https://..."
                      className="flex-1 text-xs p-2.5 rounded-lg border border-slate-300"
                    />
                    {supportingLinks.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          setSupportingLinks((prev) => prev.filter((_, i) => i !== idx))
                        }
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer shrink-0"
                        title="Remove link"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Optional Evidence File Attachments */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Optional Evidence Screenshots / Files (max 4 files, &le;150 KB each)
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  <label className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold cursor-pointer border border-slate-300">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Attach File / Screenshot</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*,.pdf,.csv,.txt,.doc,.docx"
                      onChange={handleAttachmentUpload}
                      className="hidden"
                    />
                  </label>
                  {uploadedAttachments.map((att, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-700"
                    >
                      <span>
                        {att.name} ({Math.round(att.sizeBytes / 1024)} KB)
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setUploadedAttachments((prev) => prev.filter((_, i) => i !== idx))
                        }
                        className="text-rose-600 hover:text-rose-800 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleSaveCapstoneDraft}
                  disabled={isSavingDraft || isSubmittingProject}
                  className="px-4 py-2.5 bg-white border border-slate-300 text-slate-800 rounded-xl text-xs font-bold hover:bg-slate-50 transition disabled:opacity-50 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  {isSavingDraft ? 'Saving Draft...' : 'Save Draft'}
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingProject || isSavingDraft}
                  className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition disabled:opacity-50 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isSubmittingProject ? 'Submitting...' : 'Submit Capstone for Review'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Final Assessment Card */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
              Knowledge Validation
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              Ready for the Comprehensive Final Assessment?
            </h2>
            <p className="text-xs text-slate-600 max-w-xl">
              Test your mastery with {selectedCourse.finalAssessment.length} randomized scenario questions covering all {selectedCourse.modules.length} modules.
              Scoring {completion.finalAssessmentPassThreshold}% or higher is required to pass.
              {courseProgress?.finalAssessmentBestScore !== undefined && (
                <strong className="text-indigo-800 ml-1">
                  Your Best Score: {courseProgress.finalAssessmentBestScore}%
                </strong>
              )}
            </p>
          </div>
          <button
            onClick={handleStartAssessment}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-sm shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <Award className="w-4 h-4" />
            {courseProgress?.finalAssessmentAttempts ? 'Retake Final Assessment' : 'Start Final Assessment'}
          </button>
        </div>

        <WebDevPlacementModal
          isOpen={showPlacementModal}
          participantId={participantId}
          onClose={() => setShowPlacementModal(false)}
          onPlacementSaved={(res) => setPlacementResult(res)}
          onSelectTrack={(cId) => {
            const c = getCourseById(cId);
            if (c) handleSelectCourse(c);
          }}
        />
      </div>
    );
  }

  // ==========================================
  // RENDER: COURSE CATALOG & DASHBOARD VIEW
  // ==========================================
  const enrolledCount = publishedCourses.filter((c) => {
    const prog = progressMap[c.courseId];
    return (prog?.completedLessonIds?.length || 0) > 0 || (prog?.finalAssessmentAttempts || 0) > 0;
  }).length;

  const webDevSummary = getWebDevProgressionSummary(progressMap, submissions, placementResult);
  const webDevCourses = getWebDevCourses();

  const formatCategoryLabel = (catId: string) => {
    if (catId === 'web_development_academy') return 'Web Development Academy';
    if (catId === 'digital_business') return 'Digital Business';
    return catId.replace(/_/g, ' ');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
      {/* Academy Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-3 shadow-xs">
          <GraduationCap className="w-4 h-4 text-emerald-600" />
          <span>Digital Corps Hub Learning Academy</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
          Master Practical Digital Skills for Nigeria & the Global Market
        </h1>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
          {publishedCourses.length} complete, practical digital skills tracks including our full Beginner-to-Advanced Web Development Academy.
          Every track includes demonstrations, Nigerian business case studies, knowledge checks, and capstone projects.
        </p>
        <div className="inline-block bg-slate-100 border border-slate-200 text-slate-600 text-[11px] px-3.5 py-1.5 rounded-xl">
          Independent Educational Initiative • Course completions and project capstones support skill development and do not replace official NYSC CDS reporting or clearance.
        </div>
      </div>

      {unknownCourseId && (
        <div className="max-w-3xl mx-auto mb-6 p-4 bg-amber-50 border border-amber-300 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <p className="font-bold text-amber-950">Course Not Found</p>
            <p className="text-amber-900 mt-0.5">
              We couldn&apos;t find a course matching <code className="font-mono bg-white/80 px-1 py-0.5 rounded">{unknownCourseId}</code>. Browse all available tracks below.
            </p>
          </div>
          <Link
            to="/academy"
            className="px-3.5 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-bold whitespace-nowrap self-start sm:self-center"
          >
            View All Courses
          </Link>
        </div>
      )}

      {/* Participant Stats Summary Bar (if logged in) */}
      {participant && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-[11px] font-bold uppercase text-slate-400">Corps Member</span>
            <p className="text-sm font-bold text-slate-900 truncate">{participant.name}</p>
            <span className="text-[10px] text-slate-500">{participant.platoon}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-[11px] font-bold uppercase text-slate-400">Active Courses</span>
            <p className="text-xl font-black text-slate-900">
              {enrolledCount} / {publishedCourses.length}
            </p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-[11px] font-bold uppercase text-slate-400">Completed Lessons</span>
            <p className="text-xl font-black text-emerald-600">
              {Object.values(progressMap).reduce((acc, p) => acc + (p.completedLessonIds?.length || 0), 0)}
            </p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-[11px] font-bold uppercase text-slate-400">Capstones Submitted</span>
            <p className="text-xl font-black text-indigo-600">
              {submissions.filter((s) => s.submissionStatus !== 'draft').length}
            </p>
          </div>
        </div>
      )}

      {/* Web Development Academy Progression Dashboard */}
      {webDevCourses.length > 0 && (
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-emerald-950 text-white rounded-3xl p-6 md:p-7 shadow-md mb-8 space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 text-[11px] font-bold">
                <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Web Development Academy • 3 Progressive Tracks (78 Lessons)</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black tracking-tight">
                From HTML/CSS/JS Fundamentals to AI-Powered Full-Stack SaaS
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                Practice HTML, CSS, and JavaScript live in our sandboxed editor, download React/TypeScript &amp; Node.js/SQL starter kits, and train inside the AI Development Lab.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setShowPlacementModal(true)}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <Compass className="w-4 h-4 text-amber-300" />
                <span>{placementResult ? 'Retake Placement Check' : 'Find My Starting Track'}</span>
              </button>
              {webDevSummary.recommendedNextLessonId && (
                <button
                  type="button"
                  onClick={() => {
                    const c = getCourseById(webDevSummary.recommendedNextCourseId);
                    const lm = getCourseLesson(
                      webDevSummary.recommendedNextCourseId,
                      webDevSummary.recommendedNextLessonId!
                    );
                    if (c && lm) {
                      handleOpenLesson(c, lm.module, lm.lesson);
                    } else if (c) {
                      handleSelectCourse(c);
                    }
                  }}
                  className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-black inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer shadow-sm"
                >
                  <span>Resume Next Lesson</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {placementResult && (
            <div className="p-3 rounded-xl bg-white/10 border border-white/15 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span>
                <strong className="text-emerald-300">Placement Recommendation:</strong>{' '}
                {getCourseById(placementResult.recommendedCourseId)?.title} ({placementResult.score}/{placementResult.total} • {placementResult.percentage}%)
              </span>
              <span className="text-[11px] text-slate-300">All 3 tracks remain open to start anytime.</span>
            </div>
          )}

          {/* Progression Metrics & 3-Stage Path */}
          <div className="grid sm:grid-cols-3 gap-3 text-xs">
            {[
              {
                courseId: 'web-development-beginner',
                stage: 'Track A • Beginner',
                pct: webDevSummary.beginnerPct,
                done: webDevSummary.beginnerCompleted
              },
              {
                courseId: 'web-development-intermediate',
                stage: 'Track B • Intermediate + AI',
                pct: webDevSummary.intermediatePct,
                done: webDevSummary.intermediateCompleted
              },
              {
                courseId: 'web-development-advanced',
                stage: 'Track C • Advanced Full-Stack',
                pct: webDevSummary.advancedPct,
                done: webDevSummary.advancedCompleted
              }
            ].map((item) => {
              const c = getCourseById(item.courseId);
              if (!c) return null;
              return (
                <button
                  key={item.courseId}
                  type="button"
                  onClick={() => handleSelectCourse(c)}
                  className="text-left p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition cursor-pointer space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase font-bold text-amber-300">
                      {item.stage}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-300">
                      {item.done ? 'Completed' : `${item.pct}%`}
                    </span>
                  </div>
                  <p className="font-bold text-white text-sm leading-snug">{c.title}</p>
                  <div className="w-full h-1.5 rounded-full bg-white/15 overflow-hidden">
                    <div
                      className="h-1.5 rounded-full bg-emerald-400 transition-all"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-slate-300 flex items-center justify-between">
                    <span>{c.modules.length} Modules • {c.expectedDuration}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-300" />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-300">
            <div className="flex flex-wrap items-center gap-4">
              <span>Lessons: <strong className="text-white">{webDevSummary.totalLessonsCompleted}/{webDevSummary.totalLessonsAvailable}</strong></span>
              <span>Coding Challenges: <strong className="text-white">{webDevSummary.totalCodingChallengesCompleted}</strong></span>
              <span>AI Labs: <strong className="text-white">{webDevSummary.totalAiLabsCompleted}</strong></span>
            </div>
            {webDevSummary.nextEligibleLabel && (
              <span className="text-amber-300 font-bold">{webDevSummary.nextEligibleLabel}</span>
            )}
          </div>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search skills, topics, or tools..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 focus:bg-white"
          />
        </div>

        {/* Category Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              selectedCategoryFilter === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Tracks ({publishedCourses.length})
          </button>
          {uniqueCategories.map((catId) => (
            <button
              key={catId}
              onClick={() => setSelectedCategoryFilter(catId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCategoryFilter === catId
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {formatCategoryLabel(catId)}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const prog = progressMap[course.courseId];
          const sub = submissions.find((s) => s.courseId === course.courseId);
          const completion = getCourseCompletionSummary(prog, course, sub, globalConfig);

          return (
            <div
              key={course.courseId}
              className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 capitalize">
                    {course.categoryId.replace(/_/g, ' ')}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-medium font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    {course.expectedDuration}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-emerald-700 transition">
                  {course.title}
                </h3>
                {course.subtitle && (
                  <p className="text-[11px] font-semibold text-emerald-700 mb-2">
                    {course.subtitle}
                  </p>
                )}
                <p className="text-slate-600 text-xs leading-relaxed mb-4 line-clamp-3">
                  {course.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {course.difficulty && (
                    <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded font-bold">
                      {course.difficulty}
                    </span>
                  )}
                  {course.learningObjectives.slice(0, 2).map((obj, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium truncate max-w-[180px]"
                    >
                      {obj.title}
                    </span>
                  ))}
                  {course.learningObjectives.length > 2 && (
                    <span className="text-[10px] text-slate-400 px-1 py-0.5">
                      +{course.learningObjectives.length - 2} more
                    </span>
                  )}
                </div>

                {(completion.completedLessonsCount > 0 || completion.finalAssessmentBestScore > 0) && (
                  <div className="mb-4">
                    <div className="flex justify-between text-[11px] text-slate-500 mb-1 font-medium">
                      <span>{completion.certificateEligible ? 'Completed' : 'Progress'}</span>
                      <span>
                        {completion.completedLessonsCount}/{completion.totalLessonsCount} lessons ({completion.overallCompletionPct}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-emerald-500 h-1.5 rounded-full transition-all"
                        style={{ width: `${completion.overallCompletionPct}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="text-xs text-slate-500 font-medium">
                  {course.modules.length} Modules • {completion.totalLessonsCount} Lessons
                </div>
                <button
                  onClick={() => handleSelectCourse(course)}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 transition flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  {completion.completedLessonsCount > 0 ? 'Continue' : 'View Course'}
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <WebDevPlacementModal
        isOpen={showPlacementModal}
        participantId={participantId}
        onClose={() => {
          setShowPlacementModal(false);
          if (initialCourseId === '__webdev_placement__') {
            navigate('/academy');
          }
        }}
        onPlacementSaved={(res) => setPlacementResult(res)}
        onSelectTrack={(cId) => {
          const c = getCourseById(cId);
          if (c) handleSelectCourse(c);
        }}
      />
    </div>
  );
};

interface YoutubeUnlockModalProps {
  course: AcademyCourse;
  onClose: () => void;
  onConfirm: () => void;
}

const YoutubeUnlockModal: React.FC<YoutubeUnlockModalProps> = ({ course, onClose, onConfirm }) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-100 text-red-600 rounded-xl">
              <Youtube className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg text-stone-900">Unlock YouTube Resources</h3>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-stone-600 leading-relaxed">
            To access the full video curriculum and additional resources for <strong>{course.title}</strong>, please subscribe to our YouTube learning channel.
          </p>

          <a
            href={course.youtubeUrl || `https://www.youtube.com/channel/${course.youtubeChannelId}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setChecked(true)}
            className="flex items-center justify-center gap-2 w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition shadow-sm"
          >
            <Youtube className="w-5 h-5" />
            <span>Subscribe to Channel</span>
          </a>

          <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
            <input
              type="checkbox"
              id="confirm-sub"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="mt-1 rounded text-red-600 focus:ring-red-500 w-4 h-4 cursor-pointer"
            />
            <label htmlFor="confirm-sub" className="text-xs text-stone-700 cursor-pointer leading-relaxed">
              I have subscribed to the channel and would like to access the course resources.
            </label>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-stone-300 text-stone-600 font-bold rounded-xl hover:bg-stone-50 transition"
          >
            Cancel
          </button>
          <button
            disabled={!checked}
            onClick={onConfirm}
            className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Access Resources
          </button>
        </div>
      </div>
    </div>
  );
};
