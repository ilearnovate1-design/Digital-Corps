import React, { useState, useEffect, useRef } from 'react';
import { NavigationTab, ParticipantRegistration, QuizCategory, ClientQuizQuestion, QuizAttemptResult } from '../types';
import { QUIZ_CATEGORIES, getCategoryById } from '../data/categories';
import { fetchCategories, startQuizAttempt, submitQuizAttempt } from '../services/quizService';
import {
  BrainCircuit,
  Briefcase,
  TrendingUp,
  ShieldCheck,
  Zap,
  BarChart2,
  Clock,
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Share2,
  Check,
  Trophy,
  AlertCircle,
  Loader2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  BookOpen,
  HelpCircle,
  Layers,
  Flame,
  CheckSquare,
  Compass,
  Target,
  GraduationCap
} from 'lucide-react';

import { QUESTION_OBJECTIVE_MAPPINGS } from '../data/academy/questionObjectiveMappings';
import { getCourseByCategoryId } from '../data/academy';

interface QuizViewProps {
  onNavigate: (tab: NavigationTab) => void;
  registeredUser: ParticipantRegistration | null;
  isRegistered: boolean;
  onNavigateToAcademy?: (courseId: string, lessonId?: string) => void;
}

// Icon resolver helper for dynamic category icons
function renderCategoryIcon(iconName: string, className = 'w-6 h-6') {
  switch (iconName) {
    case 'BrainCircuit':
      return <BrainCircuit className={className} />;
    case 'Briefcase':
      return <Briefcase className={className} />;
    case 'TrendingUp':
      return <TrendingUp className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    case 'Zap':
      return <Zap className={className} />;
    case 'BarChart2':
      return <BarChart2 className={className} />;
    default:
      return <Sparkles className={className} />;
  }
}

export const QuizView: React.FC<QuizViewProps> = ({
  onNavigate,
  registeredUser,
  isRegistered,
  onNavigateToAcademy
}) => {
  // Navigation states: 'category_select' | 'instruction' | 'playing' | 'completed'
  const [viewState, setViewState] = useState<'category_select' | 'instruction' | 'playing' | 'completed'>('category_select');

  // Categories list
  const [categories, setCategories] = useState<QuizCategory[]>(QUIZ_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory>(QUIZ_CATEGORIES[0]);

  // Active quiz attempt state
  const [attemptId, setAttemptId] = useState<string>('');
  const [questions, setQuestions] = useState<ClientQuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 minutes (300 seconds)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [startLoading, setStartLoading] = useState<boolean>(false);

  // Result state
  const [attemptResult, setAttemptResult] = useState<QuizAttemptResult | null>(null);
  const [showReviewList, setShowReviewList] = useState<boolean>(true);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  // Best scores map per category from localStorage
  const [bestScores, setBestScores] = useState<Record<string, { score: number; total: number; date: string }>>({});

  const timerRef = useRef<any>(null);
  const startTimeRef = useRef<number>(0);
  const isSubmittingRef = useRef<boolean>(false);

  // Load categories and local best scores on mount
  useEffect(() => {
    fetchCategories().then((cats) => {
      if (cats && cats.length > 0) {
        setCategories(cats);
      }
    });

    try {
      const savedScores = localStorage.getItem('dch_category_best_scores');
      if (savedScores) {
        setBestScores(JSON.parse(savedScores));
      }
    } catch (e) {
      console.warn('Could not read best scores from localStorage', e);
    }
  }, []);

  // Timer countdown hook during 'playing' state
  useEffect(() => {
    if (viewState === 'playing') {
      startTimeRef.current = Date.now();
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            // Trigger automatic submission on time expiry
            handleAutoSubmitOnExpiry();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [viewState]);

  // Select a category to inspect instructions
  const handleSelectCategory = (cat: QuizCategory) => {
    setSelectedCategory(cat);
    setViewState('instruction');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Start the 10-question challenge for the selected category
  const handleStartChallenge = async () => {
    setStartLoading(true);
    try {
      // Get recent question IDs from localStorage to minimize repetition
      let recentQIds: string[] = [];
      try {
        const stored = localStorage.getItem(`dch_recent_qids_${selectedCategory.id}`);
        if (stored) recentQIds = JSON.parse(stored);
      } catch {}

      const participantId = registeredUser?.registrationId || 'guest_user';
      const attemptData = await startQuizAttempt(selectedCategory.id, participantId, recentQIds);

      setAttemptId(attemptData.attemptId);
      setQuestions(attemptData.questions);
      setCurrentIndex(0);
      setAnswers({});
      setTimeLeft(attemptData.durationSeconds || 300);
      isSubmittingRef.current = false;

      // Track recent question IDs
      try {
        const currentIds = attemptData.questions.map((q) => q.questionId);
        const updatedRecent = [...currentIds, ...recentQIds].slice(0, 20);
        localStorage.setItem(`dch_recent_qids_${selectedCategory.id}`, JSON.stringify(updatedRecent));
      } catch {}

      setViewState('playing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Failed to start quiz challenge:', err);
    } finally {
      setStartLoading(false);
    }
  };

  // Choose an option for current question
  const handleSelectOption = (optionIndex: number) => {
    const currentQ = questions[currentIndex];
    if (!currentQ) return;

    setAnswers((prev) => ({
      ...prev,
      [currentQ.questionId]: optionIndex
    }));
  };

  // Handle final quiz submission (manual or auto)
  const handleSubmitQuiz = async () => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setIsSubmitting(true);

    if (timerRef.current) clearInterval(timerRef.current);

    const elapsedSeconds = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));
    const participantId = registeredUser?.registrationId || 'guest_user';
    const platoon = registeredUser?.platoon || 0;

    try {
      const { result } = await submitQuizAttempt({
        attemptId,
        categoryId: selectedCategory.id,
        participantId,
        answers,
        timeTakenSeconds: Math.min(300, elapsedSeconds),
        platoon
      });

      setAttemptResult(result);

      // Update local best scores
      const currentCatBest = bestScores[selectedCategory.id]?.score || 0;
      if (result.score >= currentCatBest) {
        const updated = {
          ...bestScores,
          [selectedCategory.id]: {
            score: result.score,
            total: result.total,
            date: new Date().toLocaleDateString()
          }
        };
        setBestScores(updated);
        try {
          localStorage.setItem('dch_category_best_scores', JSON.stringify(updated));
        } catch {}
      }

      setViewState('completed');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Error submitting quiz attempt:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAutoSubmitOnExpiry = () => {
    handleSubmitQuiz();
  };

  // Share score on WhatsApp / Clipboard
  const handleShareResult = () => {
    if (!attemptResult) return;
    const shareText = `🎯 I scored ${attemptResult.score}/${attemptResult.total} (${attemptResult.percentage}%) on the ${attemptResult.categoryName} Challenge! ${attemptResult.qualifying ? '🏆 Officially Qualified for my Platoon!' : ''} Test your digital skills on the Digital Corps Hub: ${window.location.origin}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText).then(() => {
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 3000);
      });
    }
  };

  const handleOpenWhatsAppShare = () => {
    if (!attemptResult) return;
    const shareText = `🎯 I scored ${attemptResult.score}/${attemptResult.total} (${attemptResult.percentage}%) on the ${attemptResult.categoryName} Challenge! ${attemptResult.qualifying ? '🏆 Officially Qualified for my Platoon!' : ''} Test your digital skills on the Digital Corps Hub: ${window.location.origin}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank', 'noopener,noreferrer');
  };

  // Format time display MM:SS
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // =========================================================================
  // VIEW 1: CATEGORY SELECTION LANDING
  // =========================================================================
  if (viewState === 'category_select') {
    return (
      <div className="space-y-6 pb-20">
        {/* Header Hero Banner */}
        <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-stone-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold border border-emerald-500/30">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>NYSC Multi-Category Digital Skills Challenge</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Choose Your Digital Skills Category
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
                Test your practical digital capability across 6 foundational domains. Every score of <strong className="text-emerald-400">6/10 or higher</strong> qualifies and earns ranking points for your platoon on the Camp Leaderboard!
              </p>
            </div>

            <div className="p-4 bg-white/10 rounded-2xl border border-white/15 text-xs text-stone-200 shrink-0 space-y-1.5 backdrop-blur-xs">
              <div className="flex items-center gap-2 font-bold text-white">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Inter-Platoon Rules:</span>
              </div>
              <div className="text-[11px] text-stone-300 space-y-0.5">
                <div>• 10 Questions / Category</div>
                <div>• 5 Minutes Countdown</div>
                <div>• Pass Mark: 6/10 Qualifies</div>
                <div>• Balanced Difficulty Mix</div>
              </div>
            </div>
          </div>

          {/* Participant Platoon Status Badge */}
          <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-stone-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>
                Participant:{' '}
                <strong className="text-white">
                  {registeredUser ? `${registeredUser.firstName} ${registeredUser.surname}` : 'Camp Visitor'}
                </strong>
                {registeredUser?.stateCode && (
                  <span className="ml-1.5 font-mono bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded text-[11px]">
                    {registeredUser.stateCode}
                  </span>
                )}
              </span>
            </div>

            <div className="flex items-center gap-2 font-semibold">
              <span className="text-stone-300">Competition Platoon:</span>
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full font-mono text-xs font-bold">
                {registeredUser?.platoon ? `Platoon ${registeredUser.platoon}` : 'Unassigned (Guest)'}
              </span>
              {!isRegistered && (
                <button
                  onClick={() => onNavigate('register')}
                  className="text-xs underline text-emerald-300 hover:text-emerald-200 cursor-pointer ml-1"
                >
                  Register State Code
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, idx) => {
            const catBest = bestScores[cat.id];
            const isQualified = catBest && catBest.score >= 6;

            return (
              <div
                key={cat.id}
                onClick={() => handleSelectCategory(cat)}
                className="bg-white border border-stone-200 hover:border-emerald-500 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-stone-100 group-hover:bg-emerald-100 text-stone-700 group-hover:text-emerald-800 flex items-center justify-center transition-colors">
                      {renderCategoryIcon(cat.iconName, 'w-5 h-5')}
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                      Category 0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-stone-900 text-base group-hover:text-emerald-800 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      {cat.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-100 space-y-3">
                  {/* Badges bar */}
                  <div className="flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="inline-flex items-center gap-1 text-stone-600 bg-stone-50 px-2 py-0.5 rounded border border-stone-100 font-medium">
                      <HelpCircle className="w-3 h-3 text-stone-400" />
                      <span>{cat.questionCount}+ Questions</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-stone-600 bg-stone-50 px-2 py-0.5 rounded border border-stone-100 font-medium">
                      <Clock className="w-3 h-3 text-stone-400" />
                      <span>{cat.durationMinutes} Mins</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 font-bold">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{cat.qualificationThreshold}/10 Qualifies</span>
                    </span>
                  </div>

                  {/* Previous Best Score or Action */}
                  <div className="flex items-center justify-between pt-1">
                    {catBest ? (
                      <span className={`text-[11px] font-bold flex items-center gap-1 ${
                        isQualified ? 'text-emerald-700' : 'text-amber-700'
                      }`}>
                        {isQualified ? <Award className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                        <span>Best: {catBest.score}/{catBest.total}</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-stone-400 font-medium">
                        Not attempted yet
                      </span>
                    )}

                    <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:text-emerald-900 group-hover:translate-x-0.5 transition-all">
                      <span>Start Challenge</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Challenge Information Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-stone-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Anti-Cheating Architecture</span>
            </div>
            <p className="text-stone-600 leading-relaxed text-[11px]">
              Questions and options are randomized on the server. Correct answers are verified on the backend and never exposed before submission.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-stone-900">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Platoon Competition Rules</span>
            </div>
            <p className="text-stone-600 leading-relaxed text-[11px]">
              Winning platoon is decided by the highest total number of distinct corps members scoring 6/10 or higher. Every qualified member counts!
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-stone-900">
              <Compass className="w-4 h-4 text-blue-600" />
              <span>Connected Learning Tracks</span>
            </div>
            <p className="text-stone-600 leading-relaxed text-[11px]">
              Each category links directly to practical learning tracks with YouTube video masterclasses, prompts, and project templates.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: CATEGORY INSTRUCTION SCREEN
  // =========================================================================
  if (viewState === 'instruction') {
    return (
      <div className="max-w-2xl mx-auto space-y-6 pb-20">
        <button
          type="button"
          onClick={() => setViewState('category_select')}
          className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 font-bold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Category Selection</span>
        </button>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 shadow-xs">
              {renderCategoryIcon(selectedCategory.iconName, 'w-7 h-7')}
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                Multi-Category Challenge
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight mt-1">
                {selectedCategory.name}
              </h2>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                {selectedCategory.description}
              </p>
            </div>
          </div>

          {/* Quick Rules Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-0.5">
              <span className="text-[10px] text-stone-500 font-medium block">Total Questions</span>
              <p className="text-base font-black text-stone-900">10 Questions</p>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-0.5">
              <span className="text-[10px] text-stone-500 font-medium block">Time Allowed</span>
              <p className="text-base font-black text-stone-900">5:00 Mins</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-0.5">
              <span className="text-[10px] text-emerald-700 font-medium block">Pass Mark</span>
              <p className="text-base font-black text-emerald-900">6 / 10 Points</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-0.5">
              <span className="text-[10px] text-amber-700 font-medium block">Difficulty Mix</span>
              <p className="text-base font-black text-amber-900">4-4-2 Tiered</p>
            </div>
          </div>

          {/* Detailed Instructions */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2 text-xs">
            <h4 className="font-bold text-stone-900 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-emerald-700" />
              <span>Assessment Instructions & Guidelines</span>
            </h4>
            <p className="text-stone-700 leading-relaxed text-[11px]">
              {selectedCategory.instructions}
            </p>
            <ul className="list-disc pl-4 space-y-1 text-stone-600 text-[11px] pt-1">
              <li>Each question has four multiple-choice options with exactly one correct answer.</li>
              <li>The 5-minute countdown starts as soon as you press <strong>Start Challenge</strong>.</li>
              <li>When the countdown expires, your answers will submit automatically to the server.</li>
              <li>You may navigate between questions using the previous and next buttons before final submission.</li>
              <li>Correct answers and full learning explanations will be revealed immediately on your result screen.</li>
            </ul>
          </div>

          {/* Platoon Attribution Notice */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <Trophy className="w-5 h-5 text-emerald-700 shrink-0" />
              <div>
                <span className="font-bold text-emerald-950 block">
                  Official Platoon Leaderboard Attribution
                </span>
                <p className="text-[11px] text-emerald-900/90 leading-relaxed">
                  {registeredUser?.platoon
                    ? `Your score will be officially recorded under Platoon ${registeredUser.platoon}. A qualifying score (6/10+) awards your platoon an official qualification point.`
                    : 'You are currently taking this as a guest. Register your NYSC State Code in the registration tab to assign qualifying points to your platoon.'}
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={handleStartChallenge}
            disabled={startLoading}
            className="w-full bg-[#046A38] hover:bg-[#03522b] text-white font-bold py-3.5 px-6 rounded-2xl text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {startLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Preparing Challenge Questions...</span>
              </>
            ) : (
              <>
                <span>Start 5-Minute Challenge</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 3: ACTIVE QUIZ PLAYING (1 Question at a time with 5-minute timer)
  // =========================================================================
  if (viewState === 'playing') {
    const currentQ = questions[currentIndex];
    const selectedOption = currentQ ? answers[currentQ.questionId] : undefined;
    const answeredCount = Object.keys(answers).length;
    const isLastQuestion = currentIndex === questions.length - 1;
    const isTimerWarning = timeLeft <= 60;

    return (
      <div className="max-w-2xl mx-auto space-y-4 pb-20">
        {/* Top Control Bar: Category, Timer & Progress */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
                {renderCategoryIcon(selectedCategory.iconName, 'w-4 h-4')}
              </span>
              <div>
                <span className="font-bold text-stone-900 text-xs block truncate max-w-[200px] sm:max-w-xs">
                  {selectedCategory.name}
                </span>
                <span className="text-[10px] text-stone-500 font-mono">
                  Question {currentIndex + 1} of {questions.length} • {answeredCount} Answered
                </span>
              </div>
            </div>

            {/* Countdown Timer with Warning Color */}
            <div className={`px-3 py-1.5 rounded-xl font-mono text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors ${
              isTimerWarning
                ? 'bg-red-600 text-white animate-pulse shadow-xs'
                : 'bg-stone-100 text-stone-800 border border-stone-200'
            }`}>
              <Clock className={`w-3.5 h-3.5 ${isTimerWarning ? 'text-white' : 'text-stone-500'}`} />
              <span>{formatTimer(timeLeft)}</span>
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        {currentQ && (
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                Difficulty: {currentQ.difficulty}
              </span>
              <span className="text-xs text-stone-400 font-mono">
                1 Point
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
              {currentQ.questionText}
            </h3>

            {/* 4 Answer Options */}
            <div className="space-y-2.5 pt-1">
              {currentQ.options.map((optionText, optIdx) => {
                const isSelected = selectedOption === optIdx;
                const letter = String.fromCharCode(65 + optIdx); // A, B, C, D

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 cursor-pointer select-none ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-semibold shadow-xs ring-1 ring-emerald-500/20'
                        : 'bg-stone-50/70 border-stone-200 text-stone-700 hover:bg-stone-100 hover:border-stone-300'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-emerald-700 text-white'
                        : 'bg-stone-200 text-stone-700'
                    }`}>
                      {letter}
                    </span>
                    <span className="leading-relaxed flex-1 mt-0.5">
                      {optionText}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Navigation & Question Jump Pills */}
            <div className="pt-4 border-t border-stone-100 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentIndex((idx) => Math.max(0, idx - 1))}
                  disabled={currentIndex === 0}
                  className="inline-flex items-center gap-1 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold cursor-pointer disabled:opacity-40"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                {isLastQuestion ? (
                  <button
                    type="button"
                    onClick={handleSubmitQuiz}
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold cursor-pointer shadow-xs disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Verifying Answers...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Submit Challenge ({answeredCount}/10)</span>
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setCurrentIndex((idx) => Math.min(questions.length - 1, idx + 1))}
                    className="inline-flex items-center gap-1 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* 10 Question Navigation Pills */}
              <div className="flex items-center justify-center gap-1.5 pt-1">
                {questions.map((q, idx) => {
                  const isCurrent = idx === currentIndex;
                  const hasAnswered = answers[q.questionId] !== undefined;

                  return (
                    <button
                      key={q.questionId}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-7 h-7 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-emerald-700 text-white shadow-xs scale-105'
                          : hasAnswered
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // VIEW 4: RESULT SCREEN (Score, Performance Band, Explanations, Learning Track)
  // =========================================================================
  if (viewState === 'completed' && attemptResult) {
    const isQualifying = attemptResult.qualifying;

    return (
      <div className="max-w-2xl mx-auto space-y-6 pb-20">
        {/* Result Header Hero Card */}
        <div className={`rounded-3xl p-6 sm:p-8 text-white border shadow-md ${
          isQualifying
            ? 'bg-gradient-to-br from-emerald-950 via-stone-900 to-emerald-900 border-emerald-800'
            : 'bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 border-stone-800'
        }`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-stone-200 border border-white/15">
                {renderCategoryIcon(selectedCategory.iconName, 'w-3.5 h-3.5')}
                <span>{attemptResult.categoryName}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Challenge Completed!
              </h2>

              <p className="text-xs text-stone-300 leading-relaxed max-w-md">
                {attemptResult.performanceFeedback}
              </p>
            </div>

            {/* Score Ring / Card */}
            <div className="p-4 bg-white/10 rounded-2xl border border-white/20 text-center shrink-0 min-w-[130px] backdrop-blur-xs">
              <span className="text-[10px] text-stone-300 uppercase tracking-widest font-mono block">
                Official Score
              </span>
              <div className="text-4xl font-black text-white mt-0.5">
                {attemptResult.score}<span className="text-stone-400 text-xl font-normal">/{attemptResult.total}</span>
              </div>
              <span className={`inline-block mt-1 px-2.5 py-0.5 rounded text-[11px] font-bold ${
                isQualifying ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
              }`}>
                {attemptResult.percentage}% • {attemptResult.performanceBand}
              </span>
            </div>
          </div>

          {/* Qualification Banner */}
          <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              {isQualifying ? (
                <>
                  <Award className="w-5 h-5 text-amber-400" />
                  <span className="text-emerald-300 font-bold">
                    Official Qualification Achieved! Recorded for Platoon {attemptResult.platoon || 'Unassigned'}
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-amber-400" />
                  <span className="text-amber-200 font-semibold">
                    Qualification requires 6/10. Review explanations below and retry!
                  </span>
                </>
              )}
            </div>

            <span className="text-[11px] text-stone-400 font-mono">
              Time Taken: {attemptResult.timeTakenDisplay}
            </span>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-white rounded-xl border border-stone-200 text-center space-y-0.5">
            <span className="text-[10px] text-stone-500">Correct Answers</span>
            <p className="text-lg font-black text-emerald-700">{attemptResult.score}</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-stone-200 text-center space-y-0.5">
            <span className="text-[10px] text-stone-500">Incorrect</span>
            <p className="text-lg font-black text-rose-700">{attemptResult.total - attemptResult.score}</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-stone-200 text-center space-y-0.5">
            <span className="text-[10px] text-stone-500">Performance Band</span>
            <p className="text-xs font-bold text-stone-900 truncate">{attemptResult.performanceBand}</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-stone-200 text-center space-y-0.5">
            <span className="text-[10px] text-stone-500">Platoon Points</span>
            <p className="text-xs font-bold text-emerald-800">{isQualifying ? '+1 Point' : '0 Points'}</p>
          </div>
        </div>

        {/* Action Buttons: Retry, Switch Category, Share */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleStartChallenge}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#046A38] hover:bg-[#03522b] text-white font-bold py-2.5 px-4 rounded-xl text-xs cursor-pointer shadow-xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retry This Category</span>
          </button>

          <button
            type="button"
            onClick={() => setViewState('category_select')}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs cursor-pointer shadow-xs transition-colors"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Try Another Category</span>
          </button>

          <button
            type="button"
            onClick={handleOpenWhatsAppShare}
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-3.5 rounded-xl text-xs cursor-pointer transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>

          <button
            type="button"
            onClick={handleShareResult}
            className="inline-flex items-center gap-1 px-3 py-2.5 bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 rounded-xl text-xs font-bold cursor-pointer"
          >
            {copiedShare ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-stone-500" />}
            <span>{copiedShare ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Matching Academy Course Recommendation Card */}
        {(() => {
          const matchingCourse = getCourseByCategoryId(attemptResult.categoryId);
          const incorrectReviews = attemptResult.review.filter(r => !r.isCorrect);
          const firstMissedMapping = incorrectReviews.length > 0
            ? QUESTION_OBJECTIVE_MAPPINGS.find(m => m.questionId === incorrectReviews[0].questionId)
            : null;

          // Unique strengths from correct answers
          const correctMappings = attemptResult.review
            .filter(r => r.isCorrect)
            .map(r => QUESTION_OBJECTIVE_MAPPINGS.find(m => m.questionId === r.questionId))
            .filter(Boolean);
          const uniqueStrengths = Array.from(new Set(correctMappings.map(m => m?.questionTopic))).filter(Boolean);

          // Unique areas for improvement
          const incorrectMappings = incorrectReviews
            .map(r => QUESTION_OBJECTIVE_MAPPINGS.find(m => m.questionId === r.questionId))
            .filter(Boolean);
          const uniqueWeaknesses = Array.from(new Set(incorrectMappings.map(m => m?.questionTopic))).filter(Boolean);

          return (
            <div className="space-y-4">
              {/* Academy Deep Link Hero */}
              {matchingCourse && (
                <div className="p-6 bg-gradient-to-r from-emerald-900 via-stone-900 to-indigo-950 border border-emerald-700/60 rounded-3xl text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                  <div className="space-y-2 max-w-lg">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      <GraduationCap className="w-4 h-4 text-emerald-400" />
                      <span>Aligned Digital Corps Hub Course</span>
                    </div>
                    <h3 className="text-xl font-black text-white tracking-tight">
                      {matchingCourse.title}
                    </h3>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      {firstMissedMapping
                        ? `Focus on your detected gap in "${firstMissedMapping.questionTopic}". Learn with real Nigerian PPA case studies, interactive demonstrations, and capstones.`
                        : matchingCourse.description}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-emerald-300 font-mono">
                      <span>{matchingCourse.modules.length} Modules</span>
                      <span>•</span>
                      <span>12 Comprehensive Lessons</span>
                      <span>•</span>
                      <span>Capstone Project</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full md:w-auto shrink-0">
                    {onNavigateToAcademy && (
                      <button
                        type="button"
                        onClick={() =>
                          onNavigateToAcademy(
                            matchingCourse.courseId,
                            firstMissedMapping?.lessonId
                          )
                        }
                        className="w-full sm:w-auto px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
                      >
                        <GraduationCap className="w-4 h-4" />
                        <span>
                          {firstMissedMapping ? 'Start Recommended Lesson' : 'Open Full Course'}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onNavigate('academy')}
                      className="w-full sm:w-auto px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>Browse Academy Courses</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Strengths & Weaknesses Diagnostic Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Strengths */}
                <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Your Demonstrated Strengths ({uniqueStrengths.length})</span>
                  </div>
                  {uniqueStrengths.length > 0 ? (
                    <ul className="space-y-1 text-xs text-emerald-950">
                      {uniqueStrengths.map((str, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold">•</span>
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-stone-500 italic">No mastered topics recorded in this attempt.</p>
                  )}
                </div>

                {/* Areas for Improvement */}
                <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-2">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                    <Target className="w-4 h-4 text-amber-600" />
                    <span>Areas to Strengthen ({uniqueWeaknesses.length})</span>
                  </div>
                  {uniqueWeaknesses.length > 0 ? (
                    <ul className="space-y-1 text-xs text-amber-950">
                      {uniqueWeaknesses.map((wk, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-600 font-bold">•</span>
                          <span>{wk}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-emerald-700 font-medium">
                      Outstanding! You answered every question correctly in this category.
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })()}

        {/* Question-by-Question Review Accordion */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
          <div
            onClick={() => setShowReviewList((prev) => !prev)}
            className="flex items-center justify-between cursor-pointer select-none"
          >
            <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
              <CheckSquare className="w-4 h-4 text-emerald-700" />
              <span>Detailed Question Review & Explanations ({attemptResult.review.length})</span>
            </div>
            <button className="text-stone-400 p-1 hover:text-stone-700">
              {showReviewList ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {showReviewList && (
            <div className="space-y-3.5 pt-1">
              {attemptResult.review.map((item, idx) => {
                const itemMapping = QUESTION_OBJECTIVE_MAPPINGS.find(
                  m => m.questionId === item.questionId
                );

                return (
                  <div
                    key={item.questionId}
                    className={`p-4 rounded-xl border text-xs space-y-2.5 ${
                      item.isCorrect
                        ? 'bg-emerald-50/50 border-emerald-200'
                        : 'bg-rose-50/50 border-rose-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-stone-900 text-xs">
                        {idx + 1}. {item.questionText}
                      </span>
                      {item.isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold shrink-0 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Correct (+1)</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-700 font-bold shrink-0 text-[11px]">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Incorrect</span>
                        </span>
                      )}
                    </div>

                    {/* Aligned Learning Objective & Topic Badge */}
                    {itemMapping && (
                      <div className="flex flex-wrap items-center gap-2 text-[10px] text-stone-600">
                        <span className="bg-stone-100 px-2 py-0.5 rounded font-mono font-medium text-stone-700">
                          Topic: {itemMapping.questionTopic}
                        </span>
                        <span className="text-stone-400">•</span>
                        <span className="italic truncate max-w-sm">
                          Objective: {itemMapping.learningObjectiveCode}
                        </span>
                      </div>
                    )}

                    {/* Options List */}
                    <div className="space-y-1.5 pl-1">
                      {item.options.map((opt, optIdx) => {
                        const isSelected = item.selectedAnswer === optIdx;
                        const isCorrectAnswer = item.correctAnswer === optIdx;

                        let badgeClass = 'bg-white border-stone-200 text-stone-700';
                        if (isCorrectAnswer) {
                          badgeClass = 'bg-emerald-100 border-emerald-300 text-emerald-950 font-bold';
                        } else if (isSelected && !isCorrectAnswer) {
                          badgeClass = 'bg-rose-100 border-rose-300 text-rose-950 line-through';
                        }

                        return (
                          <div
                            key={optIdx}
                            className={`p-2 rounded-lg border text-[11px] flex items-center justify-between gap-2 ${badgeClass}`}
                          >
                            <span>{opt}</span>
                            {isCorrectAnswer && (
                              <span className="text-[10px] text-emerald-800 font-bold shrink-0">
                                ✓ Correct Answer
                              </span>
                            )}
                            {isSelected && !isCorrectAnswer && (
                              <span className="text-[10px] text-rose-800 font-bold shrink-0">
                                Your Selection
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation Card */}
                    <div className="p-2.5 bg-white rounded-lg border border-stone-200/80 text-[11px] text-stone-600 leading-relaxed flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div>
                        <strong className="text-stone-800">Explanation: </strong>
                        {item.explanation}
                      </div>

                      {/* 1-Click Jump to Lesson in Academy if incorrect */}
                      {!item.isCorrect && itemMapping && onNavigateToAcademy && (
                        <button
                          type="button"
                          onClick={() =>
                            onNavigateToAcademy(
                              itemMapping.courseId,
                              itemMapping.lessonId
                            )
                          }
                          className="shrink-0 text-[10px] font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1 transition"
                        >
                          <GraduationCap className="w-3 h-3" />
                          <span>Study Lesson</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};
