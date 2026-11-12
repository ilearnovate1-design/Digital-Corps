import React, { useState, useEffect } from 'react';
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
  Youtube
} from 'lucide-react';
import {
  AcademyCourse,
  CourseLesson,
  CourseModule,
  CourseFinalAssessmentQuestion,
  CourseProjectSubmission,
  ParticipantCourseProgress,
  RegisteredParticipant
} from '../types';
import { ALL_ACADEMY_COURSES, getCourseById, getCourseLesson } from '../data/academy';
import {
  getParticipantAllCourseProgress,
  saveLessonProgress,
  submitCourseProject,
  loadParticipantCourseSubmissions
} from '../services/academyService';

interface AcademyViewProps {
  participant?: RegisteredParticipant | null;
  initialCourseId?: string | null;
  initialLessonId?: string | null;
  onNavigateToQuiz?: (categoryId: string) => void;
  onClearDeepLink?: () => void;
}

export const AcademyView: React.FC<AcademyViewProps> = ({
  participant,
  initialCourseId,
  initialLessonId,
  onNavigateToQuiz,
  onClearDeepLink
}) => {
  // Navigation states: 'catalog' | 'course_detail' | 'lesson_reader' | 'final_assessment'
  const [viewMode, setViewMode] = useState<'catalog' | 'course_detail' | 'lesson_reader' | 'final_assessment'>('catalog');
  const [selectedCourse, setSelectedCourse] = useState<AcademyCourse | null>(null);
  const [selectedModule, setSelectedModule] = useState<CourseModule | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<CourseLesson | null>(null);

  // Progress records for the participant
  const [progressMap, setProgressMap] = useState<Record<string, ParticipantCourseProgress>>({});
  const [submissions, setSubmissions] = useState<CourseProjectSubmission[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  // Lesson reader interactive state
  const [knowledgeAnswers, setKnowledgeAnswers] = useState<Record<number, number>>({});
  const [knowledgeSubmitted, setKnowledgeSubmitted] = useState<boolean>(false);
  const [savingLesson, setSavingLesson] = useState(false);
  const [lessonCompleteStatus, setLessonCompleteStatus] = useState<boolean>(false);

  // Capstone submission state
  const [isSubmittingProject, setIsSubmittingProject] = useState(false);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectArtifactUrl, setProjectArtifactUrl] = useState('');
  const [projectSubmitSuccess, setProjectSubmitSuccess] = useState(false);
  const [projectSubmitError, setProjectSubmitError] = useState<string | null>(null);

  // Final Assessment state
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, number>>({});
  const [assessmentSubmitting, setAssessmentSubmitting] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<{
    score: number;
    total: number;
    percentage: number;
    passed: boolean;
    results: Array<{
      questionId: string;
      questionText: string;
      selectedAnswer: number;
      correctAnswer: number;
      isCorrect: boolean;
      explanation: string;
    }>;
  } | null>(null);

  // Accordion expanded modules in Course Detail
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  // YouTube Subscription State
  const [hasSubscribed, setHasSubscribed] = useState<boolean>(false);
  const [showYoutubeModal, setShowYoutubeModal] = useState<boolean>(false);

  const participantId = participant?.id || 'guest_user';

  // Load progress and submissions on mount or participant change
  useEffect(() => {
    async function loadData() {
      if (participantId) {
        const pMap = await getParticipantAllCourseProgress(participantId);
        setProgressMap(pMap);
        const userSubs = await loadParticipantCourseSubmissions(participantId);
        setSubmissions(userSubs);
      }
    }
    loadData();
  }, [participantId]);

  // Handle deep-linking from Quiz results or direct links
  useEffect(() => {
    if (initialCourseId) {
      const course = getCourseById(initialCourseId);
      if (course) {
        setSelectedCourse(course);
        const initExpanded: Record<string, boolean> = {};
        course.modules.forEach(m => { initExpanded[m.moduleId] = true; });
        setExpandedModules(initExpanded);

        if (initialLessonId) {
          const lessonMatch = getCourseLesson(initialCourseId, initialLessonId);
          if (lessonMatch) {
            setSelectedModule(lessonMatch.module);
            setSelectedLesson(lessonMatch.lesson);
            setViewMode('lesson_reader');
          } else {
            setViewMode('course_detail');
          }
        } else {
          setViewMode('course_detail');
        }
      }
    }
  }, [initialCourseId, initialLessonId]);

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

  const handleSelectCourse = (course: AcademyCourse) => {
    setSelectedCourse(course);
    const exp: Record<string, boolean> = {};
    course.modules.forEach((m, idx) => {
      exp[m.moduleId] = idx === 0;
    });
    setExpandedModules(exp);
    setViewMode('course_detail');
  };

  const handleOpenLesson = (course: AcademyCourse, module: CourseModule, lesson: CourseLesson) => {
    setSelectedCourse(course);
    setSelectedModule(module);
    setSelectedLesson(lesson);
    setViewMode('lesson_reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleModuleAccordion = (moduleId: string) => {
    setExpandedModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  const handleKnowledgeOptionSelect = (qIdx: number, optIdx: number) => {
    if (knowledgeSubmitted) return;
    setKnowledgeAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
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
        }
      );

      setProgressMap(prev => ({
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
    selectedCourse.modules.forEach(m => {
      m.lessons.forEach(l => {
        allLessons.push({ module: m, lesson: l });
      });
    });

    const currentIndex = allLessons.findIndex(item => item.lesson.lessonId === selectedLesson.lessonId);
    if (currentIndex === -1) return;

    if (direction === 'prev' && currentIndex > 0) {
      const prev = allLessons[currentIndex - 1];
      setSelectedModule(prev.module);
      setSelectedLesson(prev.lesson);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (direction === 'next' && currentIndex < allLessons.length - 1) {
      const next = allLessons[currentIndex + 1];
      setSelectedModule(next.module);
      setSelectedLesson(next.lesson);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStartAssessment = () => {
    setAssessmentAnswers({});
    setAssessmentResult(null);
    setViewMode('final_assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitAssessment = async () => {
    if (!selectedCourse) return;
    setAssessmentSubmitting(true);
    try {
      const res = await fetch('/api/academy/evaluate-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: selectedCourse.courseId,
          answers: assessmentAnswers,
          participantId: participantId
        })
      });
      const data = await res.json();
      if (data.success) {
        setAssessmentResult(data.evaluation);
        const pMap = await getParticipantAllCourseProgress(participantId);
        setProgressMap(pMap);
      } else {
        alert(data.error || 'Failed to submit assessment');
      }
    } catch (err) {
      console.error('Failed to submit assessment:', err);
      alert('Network error submitting assessment.');
    } finally {
      setAssessmentSubmitting(false);
    }
  };

  const handleSubmitCapstone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return;
    if (!projectTitle.trim() || !projectDescription.trim() || !projectArtifactUrl.trim()) {
      setProjectSubmitError('Please complete all required fields.');
      return;
    }

    setIsSubmittingProject(true);
    setProjectSubmitError(null);
    try {
      const sub = await submitCourseProject(
        participantId,
        participant?.name || 'Corps Member',
        participant?.callUpNumber || 'NYSC/2026/000000',
        participant?.platoon || 'Platoon 1',
        selectedCourse.courseId,
        projectTitle,
        projectDescription,
        projectArtifactUrl
      );
      setSubmissions(prev => [sub, ...prev.filter(s => s.courseId !== selectedCourse.courseId)]);
      setProjectSubmitSuccess(true);
      const pMap = await getParticipantAllCourseProgress(participantId);
      setProgressMap(pMap);
    } catch (err: any) {
      console.error('Capstone submit error:', err);
      setProjectSubmitError(err.message || 'Failed to submit project');
    } finally {
      setIsSubmittingProject(false);
    }
  };

  // Filtered courses for catalog
  const filteredCourses = ALL_ACADEMY_COURSES.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.learningObjectives.some(o => o.title.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory =
      selectedCategoryFilter === 'all' || course.categoryId === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  // ==========================================
  // RENDER: LESSON READER VIEW
  // ==========================================
  if (viewMode === 'lesson_reader' && selectedCourse && selectedLesson) {
    const allCourseLessons: CourseLesson[] = [];
    selectedCourse.modules.forEach(m => m.lessons.forEach(l => allCourseLessons.push(l)));
    const currentIndex = allCourseLessons.findIndex(l => l.lessonId === selectedLesson.lessonId);
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
            }}
            className="hover:text-emerald-600 transition flex items-center gap-1 font-medium cursor-pointer"
          >
            <GraduationCap className="w-4 h-4" />
            Academy
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <button
            onClick={() => setViewMode('course_detail')}
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

          {/* Nigerian Practical Context & Example */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Nigerian Professional Context & Case Studies
            </div>
            {selectedLesson.nigerianContextExamples.map((ex, idx) => (
              <p key={idx} className="text-slate-800 text-sm leading-relaxed font-medium">
                • {ex}
              </p>
            ))}
          </div>

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

          {/* Downloadable / External Resources */}
          {selectedLesson.downloadableResources && selectedLesson.downloadableResources.length > 0 && (
            <div className="border-t border-slate-100 pt-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-slate-600" />
                Lesson References & Tools
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

          {/* Interactive Lesson Knowledge Check */}
          {selectedLesson.knowledgeCheck && selectedLesson.knowledgeCheck.length > 0 && (
            <div className="border-t-2 border-dashed border-slate-200 pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-indigo-600" />
                    Quick Knowledge Check
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
                    <div
                      key={qIdx}
                      className="p-5 rounded-xl border border-slate-200 bg-slate-50/50"
                    >
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

                      {/* Explanation */}
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

            {/* Adjacent navigation */}
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

        {/* Bottom Back Button */}
        <div className="flex justify-center">
          <button
            onClick={() => setViewMode('course_detail')}
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
    const questions: CourseFinalAssessmentQuestion[] = selectedCourse.finalAssessment;

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
                15 Rigorous Scenario Questions • 80% (12/15) Required to Pass for Certification
              </p>
            </div>
          </div>
        </div>

        {assessmentResult ? (
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
              <p className="text-sm font-medium mb-3">
                You scored <span className="font-bold">{assessmentResult.score}</span> out of {assessmentResult.total} ({assessmentResult.percentage}%)
              </p>
              <p className="text-xs max-w-md mx-auto text-slate-600">
                {assessmentResult.passed
                  ? 'Congratulations! You have satisfied the theoretical knowledge requirement for this Digital Corps Hub course.'
                  : 'Review the lessons and explanations below, then retake the assessment when you feel ready.'}
              </p>
            </div>

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
                  <p className="text-xs text-slate-600 leading-relaxed mb-1">
                    <span className="font-bold">Explanation: </span>
                    {r.explanation}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  setAssessmentResult(null);
                  setAssessmentAnswers({});
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Retake Assessment
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
            {questions.map((q: CourseFinalAssessmentQuestion, qIdx: number) => {
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
                            setAssessmentAnswers(prev => ({ ...prev, [q.id]: optIdx }))
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
    const totalLessons = selectedCourse.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    const progressPercent = Math.round((completedLessonIds.length / totalLessons) * 100);
    const courseSubmission = submissions.find(s => s.courseId === selectedCourse.courseId);

    return (
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <button
          onClick={() => {
            if (onClearDeepLink) onClearDeepLink();
            setViewMode('catalog');
          }}
          className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition flex items-center gap-1.5 mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Courses
        </button>

        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 md:p-10 shadow-lg mb-8 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-4 capitalize">
              Category: {selectedCourse.categoryId.replace(/_/g, ' ')}
            </span>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4">
              {selectedCourse.title}
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
              {selectedCourse.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-slate-300">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                <Clock className="w-4 h-4 text-emerald-400" />
                {selectedCourse.expectedDuration}
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                {selectedCourse.modules.length} Modules • {totalLessons} Lessons
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                <Award className="w-4 h-4 text-emerald-400" />
                Capstone Project & Assessment
              </span>
            </div>
          </div>
        </div>

        {/* Course Progress Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Your Learning Progress</h2>
              <p className="text-xs text-slate-500">
                {completedLessonIds.length} of {totalLessons} lessons completed ({progressPercent}%)
              </p>
            </div>
            <div className="flex items-center gap-3">
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
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* YouTube Resource Unlock */}
          {selectedCourse.youtubeUrl && (
            <div className="mt-6 pt-6 border-t border-slate-100">
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
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-red-600 text-white font-bold rounded-xl text-xs transition shadow-md"
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
                const areAllExpanded = selectedCourse.modules.every(m => expandedModules[m.moduleId]);
                selectedCourse.modules.forEach(m => {
                  allExp[m.moduleId] = !areAllExpanded;
                });
                setExpandedModules(allExp);
              }}
              className="text-xs font-medium text-emerald-600 hover:text-emerald-800 cursor-pointer"
            >
              Toggle All
            </button>
          </div>

          {selectedCourse.modules.map(module => {
            const isExpanded = !!expandedModules[module.moduleId];
            const modCompletedCount = module.lessons.filter(l =>
              completedLessonIds.includes(l.lessonId)
            ).length;

            return (
              <div
                key={module.moduleId}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition"
              >
                {/* Module Header Bar */}
                <button
                  type="button"
                  onClick={() => toggleModuleAccordion(module.moduleId)}
                  className="w-full p-5 text-left flex items-start justify-between gap-4 bg-slate-50/70 hover:bg-slate-50 transition border-b border-slate-100 cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {module.sequenceLabel}
                      </span>
                      <span className="text-xs text-slate-500">
                        {modCompletedCount} / {module.lessons.length} completed
                      </span>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-slate-900">
                      {module.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1">{module.description}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 shrink-0">
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-slate-700' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Lessons in Module */}
                {isExpanded && (
                  <div className="divide-y divide-slate-100 p-2">
                    {module.lessons.map(lesson => {
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
                              <h4 className="text-sm font-semibold text-slate-900">
                                {lesson.title}
                              </h4>
                              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" /> {lesson.estimatedDurationMinutes}m
                                </span>
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
                )}
              </div>
            );
          })}
        </div>

        {/* Capstone Project Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="p-2.5 bg-amber-50 text-amber-700 rounded-xl">
              <Layers className="w-6 h-6" />
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Course Requirement
              </span>
              <h2 className="text-xl font-bold text-slate-900">
                Capstone Project: {selectedCourse.capstoneProject.title}
              </h2>
            </div>
          </div>

          <p className="text-slate-700 text-sm leading-relaxed mb-6">
            {selectedCourse.capstoneProject.overview}
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
              <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-wide">
                Required Instructions:
              </h4>
              <ul className="space-y-1 list-disc list-inside">
                {selectedCourse.capstoneProject.instructions.map((inst, i) => (
                  <li key={i}>{inst}</li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
              <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-wide">
                Grading Criteria:
              </h4>
              <ul className="space-y-1 list-disc list-inside">
                {selectedCourse.capstoneProject.assessmentCriteria.map((crit, i) => (
                  <li key={i}>{crit}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Submission Form / Status */}
          {courseSubmission ? (
            <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Project Submitted
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold capitalize bg-emerald-200 text-emerald-900">
                  {courseSubmission.submissionStatus}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{courseSubmission.projectTitle}</h4>
              <p className="text-xs text-slate-600 mt-1">{courseSubmission.projectDescription}</p>
              <a
                href={courseSubmission.submissionUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-indigo-600 hover:underline font-semibold mt-2 inline-flex items-center gap-1"
              >
                View Artifact Link <ExternalLink className="w-3 h-3" />
              </a>
              {courseSubmission.reviewerFeedback && (
                <div className="mt-3 p-3 bg-white rounded-lg border border-emerald-200 text-xs text-slate-800">
                  <span className="font-bold">Coordinator Feedback: </span>
                  {courseSubmission.reviewerFeedback}
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmitCapstone} className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Submit Your Capstone Project</h3>
              {projectSubmitError && (
                <div className="p-3 bg-rose-50 text-rose-800 text-xs rounded-lg border border-rose-200">
                  {projectSubmitError}
                </div>
              )}
              {projectSubmitSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-lg border border-emerald-200">
                  Project submitted successfully! The coordinator will review your submission.
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectTitle}
                    onChange={e => setProjectTitle(e.target.value)}
                    placeholder="e.g., Cross-River NYSC PPA Health Centre Patient Intake System"
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Brief Project Description & Approach *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={projectDescription}
                    onChange={e => setProjectDescription(e.target.value)}
                    placeholder="Explain what you built, which tools you used, and how it addresses the Nigerian context scenario..."
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Deliverable URL (Google Drive, Docs, Sheets, GitHub or Live URL) *
                  </label>
                  <input
                    type="url"
                    required
                    value={projectArtifactUrl}
                    onChange={e => setProjectArtifactUrl(e.target.value)}
                    placeholder="https://docs.google.com/spreadsheets/d/... (ensure link sharing is on)"
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmittingProject}
                className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition disabled:opacity-50 cursor-pointer"
              >
                {isSubmittingProject ? 'Submitting...' : 'Submit Project for Review'}
              </button>
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
              Test your mastery with 15 rigorous real-world scenario questions covering all 4 modules.
              Scoring 80% (12/15) is required to satisfy course completion criteria.
            </p>
          </div>
          <button
            onClick={handleStartAssessment}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-sm shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <Award className="w-4 h-4" /> Start Final Assessment
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: COURSE CATALOG & DASHBOARD VIEW
  // ==========================================
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
          6 complete, professional digital skills tracks designed to support corps members with high-demand digital capabilities.
          Every track includes practical demonstrations, Nigerian business case studies, and capstone projects.
        </p>
        <div className="inline-block bg-slate-100 border border-slate-200 text-slate-600 text-[11px] px-3.5 py-1.5 rounded-xl">
          Independent Educational Initiative • Course completions and project capstones support skill development and do not replace official NYSC CDS reporting or clearance.
        </div>
      </div>

      {/* Participant Stats Summary Bar (if logged in) */}
      {participant && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-[11px] font-bold uppercase text-slate-400">Corps Member</span>
            <p className="text-sm font-bold text-slate-900 truncate">{participant.name}</p>
            <span className="text-[10px] text-slate-500">{participant.platoon}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-[11px] font-bold uppercase text-slate-400">Enrolled Courses</span>
            <p className="text-xl font-black text-slate-900">
              {Object.keys(progressMap).length} / 6
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
            <p className="text-xl font-black text-indigo-600">{submissions.length}</p>
          </div>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search skills, topics, or tools..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 focus:bg-white"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              selectedCategoryFilter === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Tracks (6)
          </button>
          {ALL_ACADEMY_COURSES.map(c => (
            <button
              key={c.categoryId}
              onClick={() => setSelectedCategoryFilter(c.categoryId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition capitalize cursor-pointer ${
                selectedCategoryFilter === c.categoryId
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c.categoryId.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => {
          const prog = progressMap[course.courseId];
          const completedCount = prog?.completedLessonIds?.length || 0;
          const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
          const percent = Math.round((completedCount / totalLessons) * 100);

          return (
            <div
              key={course.courseId}
              className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6">
                {/* Category Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 capitalize">
                    {course.categoryId.replace(/_/g, ' ')}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-medium font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    {course.expectedDuration}
                  </span>
                </div>

                {/* Course Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition">
                  {course.title}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-4 line-clamp-3">
                  {course.description}
                </p>

                {/* Learning Objectives tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {course.learningObjectives.slice(0, 3).map((obj, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium truncate max-w-[200px]"
                    >
                      {obj.title}
                    </span>
                  ))}
                  {course.learningObjectives.length > 3 && (
                    <span className="text-[10px] text-slate-400 px-1 py-0.5">
                      +{course.learningObjectives.length - 3} more
                    </span>
                  )}
                </div>

                {/* Progress bar if any lessons completed */}
                {completedCount > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-[11px] text-slate-500 mb-1 font-medium">
                      <span>Progress</span>
                      <span>
                        {completedCount}/{totalLessons} ({percent}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-emerald-500 h-1.5 rounded-full transition-all"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Bar */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="text-xs text-slate-500 font-medium">
                  {course.modules.length} Modules • {totalLessons} Lessons
                </div>
                <button
                  onClick={() => handleSelectCourse(course)}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 transition flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  {completedCount > 0 ? 'Continue' : 'View Course'}
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
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
