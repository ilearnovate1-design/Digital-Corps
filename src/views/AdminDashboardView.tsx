import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { QRCodeDisplay } from '../components/QRCodeDisplay';
import {
  PlatoonReportSummary,
  PlatoonRankingItem,
  QuizResultRecord,
  CDSGroup,
  CDSGroupRankingItem,
  CDSMemberRankingItem,
  CDSPerformanceDashboardData
} from '../types';
import {
  loadPlatoonPerformanceReport,
  invalidateQuizResult,
  verifyQuizResult,
  loadCDSPerformanceDashboardData,
  computeCDSMemberRankings,
  exportCDSMemberRankingsCSV,
  CURRENT_QUIZ_ROUND_ID
} from '../services/quizResultService';
import { CURRENT_CAMPAIGN_ID } from '../services/participantService';
import {
  adminSignIn,
  adminSignInWithEmail,
  adminRegisterWithEmail,
  adminSignOut,
  isAuthorizedAdminEmail,
  parseAuthError,
  AuthDiagnosticError,
  loadAggregateReports,
  loadPaginatedParticipants,
  exportParticipantsCSV,
  AggregateReport,
  ParticipantRecordItem
} from '../services/adminService';
import { DirectMessageModal } from '../components/DirectMessageModal';
import { BroadcastMessagingView } from '../components/BroadcastMessagingView';
import { ALL_ACADEMY_COURSES, getCourseById } from '../data/academy';
import {
  generateQuestionCoverageReport,
  QUESTION_OBJECTIVE_MAPPINGS,
  RECOMMENDED_ADDITIONAL_BIZ_QUESTIONS
} from '../data/academy/questionObjectiveMappings';
import {
  DEFAULT_ACADEMY_GLOBAL_CONFIG,
  getCourseCompletionSummary,
  getEffectiveCoursePassThreshold,
  isCourseEffectivelyPublished,
  loadAcademyGlobalConfig,
  loadAllCourseSubmissionsForReview,
  loadAllLearningProgressForAdmin,
  reviewCourseProjectSubmission,
  saveAcademyGlobalConfig
} from '../services/academyService';
import { loadAllCDSGroups, saveCDSGroup } from '../services/cdsGroupService';
import {
  AcademyCourse,
  AcademyGlobalConfig,
  CapstoneRubricCriterion,
  CourseProjectSubmission,
  ParticipantCourseProgress
} from '../types';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  LogOut,
  RefreshCw,
  Users,
  Target,
  Building2,
  Plus,
  Edit2,
  X,
  Save,
  UserPlus,
  FileSpreadsheet,
  Download,
  CheckCircle2,
  AlertCircle,
  Clock,
  Layers,
  ChevronRight,
  ChevronLeft,
  DollarSign,
  QrCode,
  CheckSquare,
  Sparkles,
  Server,
  Smartphone,
  WifiOff,
  Database,
  ExternalLink,
  Shield,
  Trophy,
  TrendingUp,
  BarChart2,
  Filter,
  CheckCircle,
  Ban,
  Copy,
  Check,
  Mail,
  MessageSquare,
  Play,
  Key,
  GraduationCap,
  BookOpen,
  Send,
  MapPin,
  Flag
} from 'lucide-react';

interface AdminDashboardViewProps {
  onClose: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ onClose }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(auth.currentUser);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authDiagnostic, setAuthDiagnostic] = useState<AuthDiagnosticError | null>(null);
  const [authMethod, setAuthMethod] = useState<'google' | 'email'>('google');
  const [adminEmail, setAdminEmail] = useState('jomaschools@gmail.com');
  const [adminPassword, setAdminPassword] = useState('');
  const [isRegisteringAccount, setIsRegisteringAccount] = useState(false);
  const [copiedHost, setCopiedHost] = useState(false);

  // Active Tab: 'overview' | 'participants' | 'messaging' | 'platoon_tracker' | 'launch' | 'academy' | 'cds'
  const [activeTab, setActiveTab] = useState<'overview' | 'participants' | 'messaging' | 'platoon_tracker' | 'launch' | 'academy' | 'cds'>('overview');

  // CDS Management & Member Performance Tracker State
  const [cdsGroups, setCdsGroups] = useState<CDSGroup[]>([]);
  const [isLoadingCDS, setIsLoadingCDS] = useState(false);
  const [isSavingCDS, setIsSavingCDS] = useState(false);
  const [isCDSModalOpen, setIsCDSModalOpen] = useState(false);
  const [editingCDS, setEditingCDS] = useState<Partial<CDSGroup> | null>(null);
  const [cdsPerformance, setCdsPerformance] = useState<CDSGroupRankingItem[]>([]);
  const [cdsDashboardData, setCdsDashboardData] = useState<CDSPerformanceDashboardData | null>(null);
  const [cdsMemberGroupFilter, setCdsMemberGroupFilter] = useState<string>('all');
  const [cdsMemberCategoryFilter, setCdsMemberCategoryFilter] = useState<string>('all');
  const [cdsMemberQualifiedOnly, setCdsMemberQualifiedOnly] = useState<boolean>(false);
  const [isExportingCDSCSV, setIsExportingCDSCSV] = useState<boolean>(false);

  // Academy management state
  const [academySubmissions, setAcademySubmissions] = useState<CourseProjectSubmission[]>([]);
  const [academyProgressList, setAcademyProgressList] = useState<ParticipantCourseProgress[]>([]);
  const [academyConfig, setAcademyConfig] = useState<AcademyGlobalConfig>(DEFAULT_ACADEMY_GLOBAL_CONFIG);
  const [isLoadingAcademySubs, setIsLoadingAcademySubs] = useState(false);
  const [isSavingAcademyConfig, setIsSavingAcademyConfig] = useState(false);
  const [academyAdminNotice, setAcademyAdminNotice] = useState<string | null>(null);
  const [reviewingSub, setReviewingSub] = useState<CourseProjectSubmission | null>(null);
  const [reviewFeedback, setReviewFeedback] = useState('');
  const [reviewScore, setReviewScore] = useState<number>(85);
  const [reviewRubricScores, setReviewRubricScores] = useState<Record<string, number>>({});
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [showCoverageDetails, setShowCoverageDetails] = useState(false);
  const [showGapRecommendations, setShowGapRecommendations] = useState(false);
  const [inspectingCourse, setInspectingCourse] = useState<AcademyCourse | null>(null);
  const [editingRubricCourse, setEditingRubricCourse] = useState<AcademyCourse | null>(null);
  const [draftRubricCriteria, setDraftRubricCriteria] = useState<CapstoneRubricCriterion[]>([]);

  // Academy Learner & Submission Filters
  const [academyFilterCourse, setAcademyFilterCourse] = useState<string>('all');
  const [academyFilterModule, setAcademyFilterModule] = useState<string>('all');
  const [academyFilterLearner, setAcademyFilterLearner] = useState<string>('');
  const [academyFilterPlatoon, setAcademyFilterPlatoon] = useState<string>('all');
  const [academyFilterCompletion, setAcademyFilterCompletion] = useState<string>('all');
  const [academyFilterAssessment, setAcademyFilterAssessment] = useState<string>('all');
  const [academyFilterSubmission, setAcademyFilterSubmission] = useState<string>('all');

  // Direct Message Modal State
  const [selectedParticipantForMessage, setSelectedParticipantForMessage] = useState<ParticipantRecordItem | null>(null);

  // Retained state (avoids repeated reads on tab switching)
  const [aggregateReport, setAggregateReport] = useState<AggregateReport | null>(null);
  const [isLoadingReport, setIsLoadingReport] = useState(false);

  // Platoon Performance Tracker state
  const [platoonReport, setPlatoonReport] = useState<PlatoonReportSummary | null>(null);
  const [isLoadingPlatoonReport, setIsLoadingPlatoonReport] = useState(false);
  const [platoonFilterCampaign, setPlatoonFilterCampaign] = useState(CURRENT_CAMPAIGN_ID);
  const [platoonFilterRound, setPlatoonFilterRound] = useState(CURRENT_QUIZ_ROUND_ID);
  const [platoonFilterCategory, setPlatoonFilterCategory] = useState<string>('all');
  const [invalidationModalOpen, setInvalidationModalOpen] = useState(false);
  const [targetResultToInvalidate, setTargetResultToInvalidate] = useState<QuizResultRecord | null>(null);
  const [invalidationReasonInput, setInvalidationReasonInput] = useState('');
  const [isUpdatingResultStatus, setIsUpdatingResultStatus] = useState(false);
  const [platoonActionFeedback, setPlatoonActionFeedback] = useState<string | null>(null);

  // Paginated participants state
  const [participants, setParticipants] = useState<ParticipantRecordItem[]>([]);
  const [lastDocCursor, setLastDocCursor] = useState<any>(undefined);
  const [hasMoreParticipants, setHasMoreParticipants] = useState(false);
  const [isLoadingParticipants, setIsLoadingParticipants] = useState(false);
  const [participantsLoadedOnce, setParticipantsLoadedOnce] = useState(false);

  // CSV export state
  const [isExportingCSV, setIsExportingCSV] = useState(false);
  const [exportFeedback, setExportFeedback] = useState<string | null>(null);

  // Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleCopyHost = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.hostname);
      setCopiedHost(true);
      setTimeout(() => setCopiedHost(false), 2500);
    }
  };

  const handleSignIn = async () => {
    setAuthLoading(true);
    setAuthError(null);
    setAuthDiagnostic(null);
    try {
      const user = await adminSignIn();
      if (!isAuthorizedAdminEmail(user.email)) {
        setAuthError(`Access Denied: ${user.email} is not on the authorized coordinator list.`);
      }
    } catch (err: any) {
      console.error('Admin Sign-in error:', err);
      const diag = parseAuthError(err);
      setAuthDiagnostic(diag);
      setAuthError(diag.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminEmail.trim() || !adminPassword) return;
    setAuthLoading(true);
    setAuthError(null);
    setAuthDiagnostic(null);
    try {
      let user: FirebaseUser;
      if (isRegisteringAccount) {
        user = await adminRegisterWithEmail(adminEmail, adminPassword);
      } else {
        user = await adminSignInWithEmail(adminEmail, adminPassword);
      }
      if (!isAuthorizedAdminEmail(user.email)) {
        setAuthError(`Access Denied: ${user.email} is not on the authorized coordinator list.`);
      }
    } catch (err: any) {
      console.error('Admin Email Auth error:', err);
      const diag = parseAuthError(err);
      setAuthDiagnostic(diag);
      setAuthError(diag.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await adminSignOut();
      setAggregateReport(null);
      setParticipants([]);
    } catch (err) {
      console.error('Sign-out error:', err);
    }
  };

  // 1. Manual Load of Aggregate Reports (Zero automatic polling)
  const handleLoadReport = async (loadPlatoons = true) => {
    setIsLoadingReport(true);
    try {
      const report = await loadAggregateReports(loadPlatoons);
      setAggregateReport(report);
    } catch (err: any) {
      console.error('Failed to load report:', err);
      setAuthError('Permission denied reading reports. Ensure your Google account is verified.');
    } finally {
      setIsLoadingReport(false);
    }
  };

  // Academy Submissions, Progress & Config Handlers
  const handleLoadAcademySubmissions = async () => {
    setIsLoadingAcademySubs(true);
    setAcademyAdminNotice(null);
    try {
      const [subs, progs, cfg] = await Promise.all([
        loadAllCourseSubmissionsForReview(),
        loadAllLearningProgressForAdmin(250),
        loadAcademyGlobalConfig()
      ]);
      setAcademySubmissions(subs);
      setAcademyProgressList(progs);
      setAcademyConfig(cfg);
    } catch (err: any) {
      console.error('Failed to load academy data:', err);
      setAcademyAdminNotice('Could not load some Academy data: ' + (err?.message || 'Permission or network error'));
    } finally {
      setIsLoadingAcademySubs(false);
    }
  };

  const handleToggleCoursePublished = async (course: AcademyCourse) => {
    setIsSavingAcademyConfig(true);
    setAcademyAdminNotice(null);
    try {
      const currentlyPublished = isCourseEffectivelyPublished(course, academyConfig);
      const nextConfig: AcademyGlobalConfig = {
        ...academyConfig,
        publishedOverrides: {
          ...academyConfig.publishedOverrides,
          [course.courseId]: !currentlyPublished
        }
      };
      const saved = await saveAcademyGlobalConfig(nextConfig, currentUser?.email || 'Admin');
      setAcademyConfig(saved);
      setAcademyAdminNotice(`${course.title} is now ${!currentlyPublished ? 'Published' : 'Unpublished'}.`);
    } catch (err: any) {
      setAcademyAdminNotice('Failed to update course publish state: ' + (err?.message || 'Unknown error'));
    } finally {
      setIsSavingAcademyConfig(false);
    }
  };

  const handleUpdateCoursePassMark = async (courseId: string, passMark: number) => {
    const cleanPass = Math.min(100, Math.max(40, Math.round(Number(passMark) || 70)));
    setIsSavingAcademyConfig(true);
    setAcademyAdminNotice(null);
    try {
      const nextConfig: AcademyGlobalConfig = {
        ...academyConfig,
        passMarkOverrides: {
          ...academyConfig.passMarkOverrides,
          [courseId]: cleanPass
        }
      };
      const saved = await saveAcademyGlobalConfig(nextConfig, currentUser?.email || 'Admin');
      setAcademyConfig(saved);
      setAcademyAdminNotice(`Updated pass mark for ${courseId} to ${cleanPass}%.`);
    } catch (err: any) {
      setAcademyAdminNotice('Failed to save pass mark: ' + (err?.message || 'Unknown error'));
    } finally {
      setIsSavingAcademyConfig(false);
    }
  };

  const handleSaveCapstoneRubric = async () => {
    if (!editingRubricCourse) return;
    setIsSavingAcademyConfig(true);
    setAcademyAdminNotice(null);
    try {
      const nextConfig: AcademyGlobalConfig = {
        ...academyConfig,
        capstoneRubricOverrides: {
          ...(academyConfig.capstoneRubricOverrides || {}),
          [editingRubricCourse.courseId]: draftRubricCriteria
        }
      };
      const saved = await saveAcademyGlobalConfig(nextConfig, currentUser?.email || 'Admin');
      setAcademyConfig(saved);
      setEditingRubricCourse(null);
      setAcademyAdminNotice(`Saved custom capstone rubric for ${editingRubricCourse.title}.`);
    } catch (err: any) {
      setAcademyAdminNotice('Failed to save capstone rubric: ' + (err?.message || 'Unknown error'));
    } finally {
      setIsSavingAcademyConfig(false);
    }
  };

  const openCapstoneReviewModal = (sub: CourseProjectSubmission) => {
    setReviewingSub(sub);
    setReviewFeedback(sub.reviewerFeedback || sub.coordinatorFeedback || '');
    setReviewScore(sub.score ?? 85);
    const course = getCourseById(sub.courseId);
    const rubric =
      academyConfig.capstoneRubricOverrides?.[sub.courseId] || course?.capstoneProject.rubric || [];
    const initialRubricScores: Record<string, number> = {};
    rubric.forEach((r) => {
      initialRubricScores[r.id] = sub.rubricScores?.[r.id] ?? r.weight;
    });
    setReviewRubricScores(initialRubricScores);
  };

  const handleReviewSubmission = async (
    status: 'under_review' | 'approved' | 'revision_requested' | 'rejected'
  ) => {
    if (!reviewingSub) return;
    setIsSubmittingReview(true);
    setAcademyAdminNotice(null);
    try {
      await reviewCourseProjectSubmission(
        reviewingSub.submissionId || reviewingSub.id || '',
        status,
        reviewFeedback,
        reviewScore,
        currentUser?.email || 'jomaschools@gmail.com',
        Object.keys(reviewRubricScores).length > 0 ? reviewRubricScores : undefined
      );
      setReviewingSub(null);
      setReviewFeedback('');
      await handleLoadAcademySubmissions();
      setAcademyAdminNotice(`Capstone submission marked as "${status.replace('_', ' ')}".`);
    } catch (err: any) {
      console.error('Failed to save review:', err);
      setAcademyAdminNotice('Failed to save review: ' + (err.message || 'Unknown error'));
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // 2. Manual Load of Paginated Participants
  const handleLoadParticipants = async (loadMore = false) => {
    setIsLoadingParticipants(true);
    try {
      const res = await loadPaginatedParticipants(10, loadMore ? lastDocCursor : undefined);
      if (loadMore) {
        setParticipants((prev) => [...prev, ...res.items]);
      } else {
        setParticipants(res.items);
      }
      setLastDocCursor(res.lastVisibleDoc);
      setHasMoreParticipants(res.hasMore);
      setParticipantsLoadedOnce(true);
    } catch (err: any) {
      console.error('Failed to load participants:', err);
      setAuthError('Permission denied reading participant records.');
    } finally {
      setIsLoadingParticipants(false);
    }
  };

  // 3. CSV Export
  const handleExportCSV = async () => {
    if (!currentUser?.email) return;
    setIsExportingCSV(true);
    setExportFeedback(null);
    try {
      const csv = await exportParticipantsCSV(currentUser.email);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `nysc_digital_corps_export_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setExportFeedback('Export complete. 1 audit log created.');
      setTimeout(() => setExportFeedback(null), 4000);
    } catch (err) {
      console.error('CSV export failed:', err);
      setExportFeedback('Export failed due to permission restriction.');
    } finally {
      setIsExportingCSV(false);
    }
  };

  // 6. Platoon Performance Tracker Handler
  const handleLoadPlatoonReport = async (categoryOverride?: string) => {
    setIsLoadingPlatoonReport(true);
    setPlatoonActionFeedback(null);
    const catToUse = categoryOverride !== undefined ? categoryOverride : platoonFilterCategory;
    try {
      const data = await loadPlatoonPerformanceReport(
        platoonFilterCampaign,
        platoonFilterRound,
        catToUse
      );
      setPlatoonReport(data);
    } catch (err: any) {
      console.error('Failed to load platoon performance report:', err);
      setPlatoonActionFeedback('Failed to load platoon report due to permission restrictions.');
    } finally {
      setIsLoadingPlatoonReport(false);
    }
  };

  const handleConfirmInvalidation = async () => {
    if (!targetResultToInvalidate?.id || !invalidationReasonInput.trim()) return;
    setIsUpdatingResultStatus(true);
    try {
      await invalidateQuizResult(
        targetResultToInvalidate.id,
        invalidationReasonInput.trim()
      );
      setPlatoonActionFeedback(
        `Result ${targetResultToInvalidate.id} marked as invalid. Audit log recorded.`
      );
      setInvalidationModalOpen(false);
      setTargetResultToInvalidate(null);
      setInvalidationReasonInput('');
      // Refresh report
      await handleLoadPlatoonReport();
    } catch (err: any) {
      console.error('Failed to invalidate quiz result:', err);
      setPlatoonActionFeedback('Error updating result status.');
    } finally {
      setIsUpdatingResultStatus(false);
      setTimeout(() => setPlatoonActionFeedback(null), 4000);
    }
  };

  const handleVerifyQuizResult = async (resultId: string) => {
    setIsUpdatingResultStatus(true);
    try {
      await verifyQuizResult(resultId);
      setPlatoonActionFeedback(`Result ${resultId} verified successfully.`);
      await handleLoadPlatoonReport();
    } catch (err: any) {
      console.error('Failed to verify result:', err);
      setPlatoonActionFeedback('Error verifying result.');
    } finally {
      setIsUpdatingResultStatus(false);
      setTimeout(() => setPlatoonActionFeedback(null), 4000);
    }
  };

  // 7. CDS Group Management Handlers
  const handleLoadAllCDS = async () => {
    setIsLoadingCDS(true);
    try {
      const groups = await loadAllCDSGroups();
      setCdsGroups(groups);
    } catch (err) {
      console.error('Failed to load all CDS groups:', err);
    } finally {
      setIsLoadingCDS(false);
    }
  };

  const handleSaveCDS = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCDS?.name || !currentUser?.email) return;
    setIsSavingCDS(true);
    try {
      await saveCDSGroup(editingCDS as Omit<CDSGroup, 'createdAt'>, currentUser.email);
      setPlatoonActionFeedback(`${editingCDS.id ? 'Updated' : 'Created'} CDS group: ${editingCDS.name}`);
      setIsCDSModalOpen(false);
      setEditingCDS(null);
      handleLoadAllCDS();
    } catch (err) {
      console.error('Failed to save CDS group:', err);
    } finally {
      setIsSavingCDS(false);
      setTimeout(() => setPlatoonActionFeedback(null), 4000);
    }
  };

  const handleLoadCDSPerformance = async () => {
    setIsLoadingCDS(true);
    try {
      const dashboardData = await loadCDSPerformanceDashboardData(
        platoonFilterCampaign,
        platoonFilterRound
      );
      setCdsDashboardData(dashboardData);
      setCdsPerformance(dashboardData.groupRankings);
    } catch (err) {
      console.error('Failed to load CDS performance:', err);
    } finally {
      setIsLoadingCDS(false);
    }
  };

  const cdsMemberRankings: CDSMemberRankingItem[] = React.useMemo(() => {
    if (!cdsDashboardData) return [];
    return computeCDSMemberRankings(
      cdsDashboardData.cdsParticipants,
      cdsDashboardData.cdsQuizResults,
      cdsGroups,
      {
        cdsGroupIdFilter: cdsMemberGroupFilter,
        categoryIdFilter: cdsMemberCategoryFilter,
        qualifiedOnly: cdsMemberQualifiedOnly
      }
    );
  }, [
    cdsDashboardData,
    cdsGroups,
    cdsMemberGroupFilter,
    cdsMemberCategoryFilter,
    cdsMemberQualifiedOnly
  ]);

  const handleExportCDSMemberCSV = async () => {
    if (!currentUser?.email || cdsMemberRankings.length === 0) return;
    setIsExportingCDSCSV(true);
    try {
      const groupLabel =
        cdsMemberGroupFilter === 'all'
          ? 'All CDS Groups'
          : cdsGroups.find((g) => g.id === cdsMemberGroupFilter)?.name || cdsMemberGroupFilter;
      const csv = await exportCDSMemberRankingsCSV(
        cdsMemberRankings,
        currentUser.email,
        `${groupLabel} • ${cdsMemberCategoryFilter} • ${platoonFilterRound}`
      );
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `cds_member_rankings_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setPlatoonActionFeedback(`Exported ${cdsMemberRankings.length} CDS member rankings to CSV.`);
      setTimeout(() => setPlatoonActionFeedback(null), 4000);
    } catch (err) {
      console.error('Failed to export CDS member rankings CSV:', err);
    } finally {
      setIsExportingCDSCSV(false);
    }
  };


  const isAuthorized = currentUser && isAuthorizedAdminEmail(currentUser.email);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-900/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        
        {/* Modal Top Header */}
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h2 className="font-black text-base text-stone-900 tracking-tight">
                Digital Corps Hub Admin Portal
              </h2>
              <p className="text-[11px] text-stone-500 font-mono">
                Strict ABAC Security • Read-Optimized Server Aggregation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentUser && (
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 bg-stone-200 hover:bg-stone-300 px-2.5 py-1.5 rounded-lg cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-700 p-1 rounded-lg cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
          
          {/* Unauthenticated State */}
          {!currentUser ? (
            <div className="p-4 sm:p-6 text-center max-w-lg mx-auto space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-700 mx-auto flex items-center justify-center">
                <Lock className="w-6 h-6 text-stone-600" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 text-base">
                  Administrator Authentication Required
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Campaign analytics, platoon competition records, and participant data are secured by Firestore rules. Sign in with the coordinator account (<span className="font-semibold text-emerald-800">jomaschools@gmail.com</span>) to proceed.
                </p>
              </div>

              {/* Actionable Diagnostic Card for Firebase Auth Errors */}
              {authDiagnostic && (
                <div className="text-left p-4 bg-amber-50/90 border border-amber-300 rounded-2xl space-y-3">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-amber-950 text-xs">
                        {authDiagnostic.title}
                      </h4>
                      <p className="text-amber-900/90 text-[11px] mt-0.5 leading-relaxed">
                        {authDiagnostic.message}
                      </p>
                    </div>
                  </div>

                  {authDiagnostic.steps && authDiagnostic.steps.length > 0 && (
                    <div className="bg-white/80 p-3 rounded-xl border border-amber-200 text-[11px] text-stone-800 space-y-1.5">
                      <p className="font-bold text-stone-900 text-[11px] mb-1">How to fix in your Firebase Console:</p>
                      <ol className="list-decimal pl-4 space-y-1 text-stone-700">
                        {authDiagnostic.steps.map((step, idx) => (
                          <li key={idx} className="leading-normal">{step}</li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Domain Helper */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 p-2.5 bg-amber-100/60 rounded-xl text-[11px]">
                    <div className="font-mono text-stone-700 truncate">
                      Domain: <span className="font-bold text-stone-900">{typeof window !== 'undefined' ? window.location.hostname : 'run.app'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyHost}
                      className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1 bg-white hover:bg-stone-50 border border-stone-300 rounded-lg text-stone-800 font-semibold cursor-pointer shrink-0 transition-colors"
                    >
                      {copiedHost ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-stone-500" />}
                      <span>{copiedHost ? 'Copied' : 'Copy Domain'}</span>
                    </button>
                  </div>

                  {authDiagnostic.helpUrl && (
                    <a
                      href={authDiagnostic.helpUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
                    >
                      <span>{authDiagnostic.helpLabel || 'Open Firebase Console'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}

              {/* Standard error fallback if no structured diagnostic */}
              {authError && !authDiagnostic && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-900 rounded-xl text-xs flex items-center gap-2 text-left">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              {/* Auth Method Selector Tabs */}
              <div className="flex rounded-xl bg-stone-100 p-1 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => { setAuthMethod('google'); setAuthError(null); setAuthDiagnostic(null); }}
                  className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                    authMethod === 'google'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Google Sign-In
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthMethod('email'); setAuthError(null); setAuthDiagnostic(null); }}
                  className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                    authMethod === 'email'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Email & Password
                </button>
              </div>

              {authMethod === 'google' ? (
                <div className="space-y-2">
                  <button
                    onClick={handleSignIn}
                    disabled={authLoading}
                    className="w-full bg-[#046A38] hover:bg-[#03522b] text-white font-bold py-3 px-4 rounded-xl text-xs shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {authLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Verifying with Firebase Auth...</span>
                      </>
                    ) : (
                      <span>Sign In with Google (Administrator)</span>
                    )}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEmailAuth} className="space-y-3 text-left">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Coordinator Email
                    </label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        placeholder="jomaschools@gmail.com"
                        required
                        className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Key className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                      <input
                        type="password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        placeholder="••••••••••••"
                        required
                        className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <label className="flex items-center gap-1.5 cursor-pointer text-stone-600">
                      <input
                        type="checkbox"
                        checked={isRegisteringAccount}
                        onChange={(e) => setIsRegisteringAccount(e.target.checked)}
                        className="rounded border-stone-300 text-emerald-700 focus:ring-emerald-500"
                      />
                      <span>Create new coordinator login</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={authLoading || !adminPassword}
                    className="w-full bg-[#046A38] hover:bg-[#03522b] text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {authLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <span>{isRegisteringAccount ? 'Register & Sign In' : 'Sign In with Email'}</span>
                    )}
                  </button>
                </form>
              )}

              <p className="text-[11px] text-stone-500">
                Authorised administrator: <code className="font-bold text-stone-700">jomaschools@gmail.com</code>
              </p>
            </div>
          ) : !isAuthorized ? (
            /* Signed In but Unauthorized State */
            <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-center space-y-3 max-w-md mx-auto">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 mx-auto flex items-center justify-center">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-red-900 text-base">
                Unauthorized Account
              </h3>
              <p className="text-xs text-red-800 leading-relaxed">
                You are authenticated as <strong>{currentUser.email}</strong>, but this account is not registered on the campaign coordinator allowlist. Access to participant records is strictly blocked.
              </p>
              <button
                onClick={handleSignOut}
                className="bg-red-700 text-white font-bold px-4 py-2 rounded-xl text-xs cursor-pointer"
              >
                Sign Out & Switch Account
              </button>
            </div>
          ) : (
            /* Authorized Admin Experience */
            <div className="space-y-5">
              
              {/* Authenticated Coordinator Banner */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-950 font-bold">
                    Active Session: <span className="font-mono">{currentUser.email}</span>
                  </span>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded uppercase">
                  Verified Administrator
                </span>
              </div>

              {/* Navigation Tabs (Retains session data, zero repeated reads) */}
              <div className="flex items-center gap-1.5 border-b border-stone-200 pb-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer transition-all ${
                    activeTab === 'overview'
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  Aggregate Overview
                </button>
                <button
                  onClick={() => {
                    setActiveTab('participants');
                    if (!participantsLoadedOnce) handleLoadParticipants(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer transition-all ${
                    activeTab === 'participants'
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  Participant Records (Paginated)
                </button>
                <button
                  onClick={() => setActiveTab('messaging')}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer transition-all flex items-center gap-1.5 ${
                    activeTab === 'messaging'
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Broadcast & Messaging</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('platoon_tracker');
                    if (!platoonReport) handleLoadPlatoonReport();
                  }}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer transition-all flex items-center gap-1.5 ${
                    activeTab === 'platoon_tracker'
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <Trophy className="w-3.5 h-3.5 text-amber-500" />
                  <span>Platoon Performance</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('cds');
                    handleLoadAllCDS();
                    handleLoadCDSPerformance();
                  }}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer transition-all flex items-center gap-1.5 ${
                    activeTab === 'cds'
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <Users className="w-3.5 h-3.5 text-blue-500" />
                  <span>CDS Groups</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('academy');
                    handleLoadAcademySubmissions();
                  }}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer transition-all flex items-center gap-1.5 ${
                    activeTab === 'academy'
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Learning Academy</span>
                </button>
                <button
                  onClick={() => setActiveTab('launch')}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer transition-all flex items-center gap-1.5 ${
                    activeTab === 'launch'
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300'
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Launch Checklist & QR</span>
                </button>
              </div>

              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-stone-900 text-sm">
                        Campaign Aggregate Summary
                      </h3>
                      <p className="text-[11px] text-stone-500">
                        {aggregateReport
                          ? `Report loaded at ${aggregateReport.loadedAt}. No automatic polling.`
                          : 'Press "Load Report" to fetch server aggregates via getCountFromServer.'}
                      </p>
                    </div>

                    <button
                      onClick={() => handleLoadReport(true)}
                      disabled={isLoadingReport}
                      className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-xl text-xs cursor-pointer disabled:opacity-60"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isLoadingReport ? 'animate-spin' : ''}`} />
                      <span>{aggregateReport ? 'Refresh Report' : 'Load Report'}</span>
                    </button>
                  </div>

                  {aggregateReport ? (
                    <div className="space-y-4">
                      {/* Metric Stat Cards */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-0.5">
                          <span className="text-stone-500 text-[10px] font-bold uppercase tracking-wide">
                            Total Registrations
                          </span>
                          <p className="text-xl font-black text-emerald-800">
                            {aggregateReport.totalRegistrations.toLocaleString()}
                          </p>
                          <span className="text-[10px] text-stone-400">1 server count read</span>
                        </div>

                        <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-0.5">
                          <span className="text-stone-500 text-[10px] font-bold uppercase tracking-wide">
                            Community Opt-Ins
                          </span>
                          <p className="text-xl font-black text-blue-800">
                            {aggregateReport.communityOptIns.toLocaleString()}
                          </p>
                          <span className="text-[10px] text-stone-400">
                            {aggregateReport.totalRegistrations > 0
                              ? `${Math.round((aggregateReport.communityOptIns / aggregateReport.totalRegistrations) * 100)}% opt-in rate`
                              : '0%'}
                          </span>
                        </div>

                        <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-0.5">
                          <span className="text-stone-500 text-[10px] font-bold uppercase tracking-wide">
                            Marketing Consent
                          </span>
                          <p className="text-xl font-black text-purple-800">
                            {aggregateReport.marketingConsentCount.toLocaleString()}
                          </p>
                          <span className="text-[10px] text-stone-400">
                            {aggregateReport.totalRegistrations > 0
                              ? `${Math.round((aggregateReport.marketingConsentCount / aggregateReport.totalRegistrations) * 100)}% rate`
                              : '0%'}
                          </span>
                        </div>

                        <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-0.5">
                          <span className="text-stone-500 text-[10px] font-bold uppercase tracking-wide">
                            AI Challenge Submissions
                          </span>
                          <p className="text-xl font-black text-amber-800">
                            {aggregateReport.challengeSubmissionsCount.toLocaleString()}
                          </p>
                          <span className="text-[10px] text-stone-400">proposals recorded</span>
                        </div>
                      </div>

                      {/* Platoon Participation Grid */}
                      <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-stone-800 text-xs">
                            Platoon Participation Breakdown (Platoons 1–10)
                          </h4>
                          <span className="text-[10px] text-stone-400">Server aggregation</span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                          {aggregateReport.platoonCounts.map((p) => (
                            <div key={p.platoon} className="p-2 bg-stone-50 border border-stone-100 rounded-lg text-center">
                              <span className="text-[10px] font-bold text-stone-500 block">
                                Platoon {p.platoon}
                              </span>
                              <span className="font-black text-sm text-stone-900">
                                {p.count}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CSV Export Button */}
                      <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div>
                          <span className="font-bold text-stone-900 block text-xs">
                            Download Authorized CSV Report
                          </span>
                          <p className="text-[11px] text-stone-500">
                            Generates an audited CSV extract of participant records for orientation camp reporting.
                          </p>
                        </div>

                        <button
                          onClick={handleExportCSV}
                          disabled={isExportingCSV}
                          className="inline-flex items-center gap-1.5 bg-[#046A38] hover:bg-[#03522b] text-white font-bold px-4 py-2 rounded-xl text-xs shrink-0 cursor-pointer disabled:opacity-60"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{isExportingCSV ? 'Generating Export...' : 'Export CSV (Audited)'}</span>
                        </button>
                      </div>

                      {exportFeedback && (
                        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-950 rounded-xl text-xs flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>{exportFeedback}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-8 text-center bg-stone-50 rounded-xl border border-stone-200 text-stone-500 space-y-2">
                      <Clock className="w-6 h-6 mx-auto text-stone-400" />
                      <p className="font-semibold text-xs text-stone-700">
                        Zero Automatic Reads Active
                      </p>
                      <p className="text-[11px] max-w-sm mx-auto">
                        To protect your Firestore budget, reports do not query on page open. Tap the button above to load the latest aggregate snapshot.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: PARTICIPANTS (Paginated) */}
              {activeTab === 'participants' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-stone-900 text-sm">
                        Participant Records (Paginated)
                      </h3>
                      <p className="text-[11px] text-stone-500">
                        Loads 10 records per page on demand. Never downloads the whole database at once.
                      </p>
                    </div>

                    <button
                      onClick={() => handleLoadParticipants(false)}
                      disabled={isLoadingParticipants}
                      className="inline-flex items-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold px-3 py-1.5 rounded-xl text-xs cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isLoadingParticipants ? 'animate-spin' : ''}`} />
                      <span>Refresh First Page</span>
                    </button>
                  </div>

                  {participants.length > 0 ? (
                    <div className="space-y-3">
                      <div className="overflow-x-auto border border-stone-200 rounded-xl">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200">
                            <tr>
                              <th className="p-2.5">Name</th>
                              <th className="p-2.5">State Code</th>
                              <th className="p-2.5">Engagement / Group</th>
                              <th className="p-2.5">Contact</th>
                              <th className="p-2.5">Community</th>
                              <th className="p-2.5">Marketing</th>
                              <th className="p-2.5 text-center">Send Message</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-stone-100">
                            {participants.map((p) => (
                              <tr key={p.id} className="hover:bg-stone-50">
                                <td className="p-2.5 font-bold text-stone-900">
                                  {p.firstName} {p.surname}
                                </td>
                                <td className="p-2.5 font-mono text-emerald-800">
                                  {p.stateCode || '—'}
                                </td>
                                <td className="p-2.5">
                                  {p.platoon && p.platoon > 0 ? (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-stone-100 text-stone-800 font-semibold text-[11px]">
                                      On Camp • P{p.platoon}
                                    </span>
                                  ) : p.cdsGroupName ? (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold text-[11px]">
                                      Post Camp • {p.cdsGroupName}
                                    </span>
                                  ) : p.engagementType === 'post_camp' ? (
                                    <span className="text-stone-600 text-[11px]">Post Camp</span>
                                  ) : (
                                    '—'
                                  )}
                                </td>
                                <td className="p-2.5 font-mono text-[11px] text-stone-600">
                                  {p.phone && <div className="text-stone-800 font-semibold">{p.phone}</div>}
                                  {p.email && <div className="text-stone-500">{p.email}</div>}
                                  {!p.phone && !p.email && (p.contactValue || '—')}
                                </td>
                                <td className="p-2.5">
                                  {p.communityOptIn ? (
                                    <span className="text-emerald-700 font-bold">Yes</span>
                                  ) : (
                                    <span className="text-stone-400">No</span>
                                  )}
                                </td>
                                <td className="p-2.5">
                                  {p.marketingConsent ? (
                                    <span className="text-purple-700 font-bold">Yes</span>
                                  ) : (
                                    <span className="text-stone-400">No</span>
                                  )}
                                </td>
                                <td className="p-2.5 text-center">
                                  <div className="flex items-center justify-center gap-1.5">
                                    {p.phone && (
                                      <button
                                        type="button"
                                        title={`Send WhatsApp to ${p.firstName}`}
                                        onClick={() => setSelectedParticipantForMessage(p)}
                                        className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-[11px] font-bold cursor-pointer transition-colors"
                                      >
                                        <MessageSquare className="w-3 h-3 text-emerald-600" />
                                        <span>WhatsApp</span>
                                      </button>
                                    )}
                                    {p.email && (
                                      <button
                                        type="button"
                                        title={`Send Email to ${p.firstName}`}
                                        onClick={() => setSelectedParticipantForMessage(p)}
                                        className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 rounded-lg text-[11px] font-bold cursor-pointer transition-colors"
                                      >
                                        <Mail className="w-3 h-3 text-blue-600" />
                                        <span>Email</span>
                                      </button>
                                    )}
                                    {!p.phone && !p.email && (
                                      <span className="text-stone-400 text-[11px] italic">No contact</span>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Pagination Controls */}
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-[11px] text-stone-500">
                          Showing {participants.length} records loaded so far
                        </span>
                        {hasMoreParticipants && (
                          <button
                            onClick={() => handleLoadParticipants(true)}
                            disabled={isLoadingParticipants}
                            className="bg-stone-900 hover:bg-stone-800 text-white font-bold px-3 py-1.5 rounded-xl text-xs cursor-pointer flex items-center gap-1"
                          >
                            <span>Load Next 10 Records</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 text-center bg-stone-50 rounded-xl border border-stone-200 text-stone-500">
                      <p>No participant records loaded yet. Tap above to fetch page 1.</p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: BROADCAST & MESSAGING */}
              {activeTab === 'messaging' && (
                <BroadcastMessagingView
                  adminEmail={currentUser?.email || 'jomaschools@gmail.com'}
                />
              )}

              {/* TAB: PLATOON PERFORMANCE TRACKER */}
              {activeTab === 'platoon_tracker' && (
                <div className="space-y-5">
                  {/* Header & Controls */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-amber-500" />
                        <span>Platoon Performance Tracker</span>
                      </h3>
                      <p className="text-[11px] text-stone-500">
                        Rapid-Fire Digital Quiz • Qualification: Distinct registered participants scoring &gt; 5/10 (6 to 10 points)
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleLoadPlatoonReport()}
                        disabled={isLoadingPlatoonReport}
                        className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3.5 py-2 rounded-xl text-xs cursor-pointer disabled:opacity-60 transition-transform active:scale-95"
                      >
                        <RefreshCw
                          className={`w-3.5 h-3.5 ${isLoadingPlatoonReport ? 'animate-spin' : ''}`}
                        />
                        <span>{platoonReport ? 'Refresh Report' : 'Load Report'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Filter Bar */}
                  <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <Filter className="w-3.5 h-3.5 text-stone-500" />
                        <span className="font-semibold text-stone-700">Category:</span>
                        <select
                          value={platoonFilterCategory}
                          onChange={(e) => {
                            const newCat = e.target.value;
                            setPlatoonFilterCategory(newCat);
                            handleLoadPlatoonReport(newCat);
                          }}
                          className="bg-white border border-stone-300 rounded-lg px-2 py-1 font-semibold text-[11px] text-stone-800 focus:ring-1 focus:ring-emerald-500"
                        >
                          <option value="all">All Challenge Categories</option>
                          <option value="ai_emerging_tech">AI &amp; Emerging Technology</option>
                          <option value="career_employability">Career &amp; Employability</option>
                          <option value="digital_business_entrepreneurship">Digital Business &amp; Entrepreneurship</option>
                          <option value="digital_literacy_safety">Digital Literacy &amp; Online Safety</option>
                          <option value="productivity_digital_tools">Productivity &amp; Digital Tools</option>
                          <option value="data_digital_skills">Data &amp; Digital Skills</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-stone-700">Quiz Round:</span>
                        <select
                          value={platoonFilterRound}
                          onChange={(e) => setPlatoonFilterRound(e.target.value)}
                          className="bg-white border border-stone-300 rounded-lg px-2 py-1 font-mono text-[11px] focus:ring-1 focus:ring-emerald-500"
                        >
                          <option value="round_1">Round 1 (Orientation Camp)</option>
                          <option value="round_2">Round 2 (Post-Camp Challenge)</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-stone-700">Campaign:</span>
                        <input
                          type="text"
                          value={platoonFilterCampaign}
                          onChange={(e) => setPlatoonFilterCampaign(e.target.value)}
                          className="bg-white border border-stone-300 rounded-lg px-2 py-1 font-mono text-[11px] w-44 focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <span className="text-[11px] text-stone-500">
                      {platoonReport
                        ? `Report loaded at ${platoonReport.loadedAt} • No auto polling`
                        : 'On-demand calculation (1 read per query)'}
                    </span>
                  </div>

                  {platoonActionFeedback && (
                    <div className="p-3 bg-blue-50 border border-blue-200 text-blue-900 rounded-xl text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{platoonActionFeedback}</span>
                    </div>
                  )}

                  {!platoonReport && !isLoadingPlatoonReport && (
                    <div className="p-8 text-center bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                        <Trophy className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-stone-900 text-sm">
                        Platoon Performance Report Ready to Generate
                      </h4>
                      <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
                        Evaluates registered participant counts and distinct qualifying quiz results (scores 6/10 to 10/10) for <strong>{platoonFilterRound}</strong>.
                      </p>
                      <button
                        onClick={() => handleLoadPlatoonReport()}
                        className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs inline-flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
                      >
                        <Trophy className="w-4 h-4 text-amber-300" />
                        <span>Load Platoon Performance Report</span>
                      </button>
                    </div>
                  )}

                  {isLoadingPlatoonReport && !platoonReport && (
                    <div className="p-8 text-center bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                      <RefreshCw className="w-8 h-8 text-emerald-700 animate-spin mx-auto" />
                      <p className="text-xs text-stone-600 font-medium">
                        Fetching bounded platoon aggregates and distinct qualifying scores...
                      </p>
                    </div>
                  )}

                  {platoonReport && (
                    <div className="space-y-5">
                      {/* 4 Summary KPI Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {/* Winner Card */}
                        <div className="p-4 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-xl shadow-xs">
                          <div className="flex items-center justify-between text-amber-100 text-[10px] uppercase tracking-wider font-bold mb-1">
                            <span>Highest-Ranked Platoon</span>
                            <Trophy className="w-4 h-4 text-white" />
                          </div>
                          <div className="text-xl font-black truncate">
                            {platoonReport.highestRankedPlatoons.length > 0
                              ? platoonReport.highestRankedPlatoons.map((p) => p.label).join(' & ')
                              : 'No qualifiers yet'}
                          </div>
                          <p className="text-[11px] text-amber-100 mt-1 font-medium">
                            {platoonReport.highestRankedPlatoons.length > 0 ? (
                              <>
                                <strong>
                                  {platoonReport.highestRankedPlatoons[0].qualifyingParticipants}
                                </strong>{' '}
                                Qualifying Participants (&gt; 5/10)
                                {platoonReport.highestRankedPlatoons[0].isTie && ' (Tied)'}
                              </>
                            ) : (
                              'Scores >= 6 required to qualify'
                            )}
                          </p>
                        </div>

                        {/* Distinct Quiz Entrants */}
                        <div className="p-4 bg-white border border-stone-200 rounded-xl shadow-xs">
                          <span className="text-stone-500 text-[10px] uppercase font-bold block mb-1">
                            Quiz Participants
                          </span>
                          <div className="text-2xl font-black text-stone-900">
                            {platoonReport.totalQuizParticipants.toLocaleString()}
                          </div>
                          <p className="text-[11px] text-stone-500 mt-1">
                            Distinct entrants across all platoons
                          </p>
                        </div>

                        {/* Distinct Qualifiers */}
                        <div className="p-4 bg-white border border-stone-200 rounded-xl shadow-xs">
                          <span className="text-emerald-700 text-[10px] uppercase font-bold block mb-1">
                            Qualifying Participants
                          </span>
                          <div className="text-2xl font-black text-emerald-800">
                            {platoonReport.totalQualifying.toLocaleString()}
                          </div>
                          <p className="text-[11px] text-stone-500 mt-1">
                            Scored 6/10 to 10/10 (Above 5)
                          </p>
                        </div>

                        {/* Unassigned / Unverified */}
                        <div className="p-4 bg-white border border-stone-200 rounded-xl shadow-xs">
                          <span className="text-purple-700 text-[10px] uppercase font-bold block mb-1">
                            Unassigned &amp; Unverified
                          </span>
                          <div className="text-lg font-black text-stone-900">
                            {platoonReport.unassignedResultsCount} / {platoonReport.unverifiedResultsCount}
                          </div>
                          <p className="text-[11px] text-stone-500 mt-1">
                            {platoonReport.invalidatedResultsCount} Invalidated
                          </p>
                        </div>
                      </div>

                      {/* Multi-Category Skills Challenge Breakdown */}
                      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-stone-50 border border-emerald-200/80 rounded-xl p-4 shadow-xs">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Layers className="w-4 h-4 text-emerald-800" />
                            <h4 className="font-bold text-stone-900 text-xs sm:text-sm">
                              Multi-Category Skills Challenge Breakdown
                            </h4>
                          </div>
                          <span className="text-[11px] text-stone-500 font-medium">
                            6 Digital Challenge Tracks
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                          {[
                            { id: 'ai_emerging_tech', name: 'AI & Emerging Tech', icon: '🤖' },
                            { id: 'career_employability', name: 'Career & Work', icon: '💼' },
                            { id: 'digital_business_entrepreneurship', name: 'Digital Business', icon: '📈' },
                            { id: 'digital_literacy_safety', name: 'Literacy & Safety', icon: '🛡️' },
                            { id: 'productivity_digital_tools', name: 'Productivity Tools', icon: '⚡' },
                            { id: 'data_digital_skills', name: 'Data & Digital Skills', icon: '📊' }
                          ].map((cat) => {
                            const catResults = platoonReport.individualResults.filter(
                              (r) => r.categoryId === cat.id && r.status !== 'invalidated'
                            );
                            const catQual = catResults.filter((r) => r.qualifying).length;
                            const isSelected = platoonFilterCategory === cat.id;

                            return (
                              <button
                                key={cat.id}
                                onClick={() => {
                                  const next = isSelected ? 'all' : cat.id;
                                  setPlatoonFilterCategory(next);
                                  handleLoadPlatoonReport(next);
                                }}
                                className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs'
                                    : 'bg-white hover:bg-stone-50 text-stone-800 border-stone-200'
                                }`}
                              >
                                <div className="text-base mb-1">{cat.icon}</div>
                                <div className="font-bold text-[11px] leading-tight truncate">
                                  {cat.name}
                                </div>
                                <div className={`text-[10px] mt-1 font-mono ${isSelected ? 'text-emerald-100' : 'text-stone-500'}`}>
                                  {catResults.length} attempts • <span className="font-bold">{catQual} qual.</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* MAIN RANKING TABLE */}
                      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs">
                        <div className="px-4 py-3 border-b border-stone-200 bg-stone-50/70 flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-stone-900 text-xs sm:text-sm">
                              Official Platoon Ranking Table
                            </h4>
                            <p className="text-[10px] sm:text-[11px] text-stone-500">
                              Sorted primarily by qualifying participant count (highest first). Ties are preserved.
                            </p>
                          </div>
                          <span className="text-[10px] font-mono bg-stone-200 text-stone-700 px-2 py-0.5 rounded">
                            {platoonReport.quizRoundId}
                          </span>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200 text-[11px]">
                              <tr>
                                <th className="py-2.5 px-3">Rank</th>
                                <th className="py-2.5 px-3">Platoon</th>
                                <th className="py-2.5 px-3 text-right">Registered</th>
                                <th className="py-2.5 px-3 text-right">Quiz Entrants</th>
                                <th className="py-2.5 px-3 text-right bg-emerald-50 text-emerald-950">
                                  Qualifying (&gt; 5/10)
                                </th>
                                <th className="py-2.5 px-3 text-right">Qual. Rate</th>
                                <th className="py-2.5 px-3 text-right text-stone-500">
                                  Avg Score (Sec.)
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-200">
                              {platoonReport.platoonRankings.map((item) => {
                                const isWinner = item.rank === 1 && item.qualifyingParticipants > 0;
                                const isUnassigned = item.platoon === 0;

                                return (
                                  <tr
                                    key={item.platoon}
                                    className={`${
                                      isWinner
                                        ? 'bg-amber-50/60 font-semibold'
                                        : isUnassigned
                                        ? 'bg-stone-50/70 text-stone-500 italic'
                                        : 'hover:bg-stone-50'
                                    }`}
                                  >
                                    {/* Rank */}
                                    <td className="py-2.5 px-3 whitespace-nowrap">
                                      {isUnassigned ? (
                                        <span className="text-stone-400">—</span>
                                      ) : item.rank === 1 && item.qualifyingParticipants > 0 ? (
                                        <span className="inline-flex items-center gap-1 font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full text-[11px]">
                                          <Trophy className="w-3 h-3" />
                                          {item.displayRank}
                                        </span>
                                      ) : (
                                        <span className="font-mono text-stone-700 font-bold">
                                          #{item.displayRank}
                                        </span>
                                      )}
                                    </td>

                                    {/* Platoon Label */}
                                    <td className="py-2.5 px-3 font-bold whitespace-nowrap">
                                      {item.label}
                                    </td>

                                    {/* Registered */}
                                    <td className="py-2.5 px-3 text-right font-mono">
                                      {item.registeredParticipants.toLocaleString()}
                                    </td>

                                    {/* Quiz Entrants */}
                                    <td className="py-2.5 px-3 text-right font-mono">
                                      {item.quizParticipants.toLocaleString()}
                                    </td>

                                    {/* Qualifying participants (Primary competition metric) */}
                                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-800 bg-emerald-50/50">
                                      {item.qualifyingParticipants.toLocaleString()}
                                    </td>

                                    {/* Qualification rate */}
                                    <td className="py-2.5 px-3 text-right font-mono">
                                      {item.qualificationRate}%
                                    </td>

                                    {/* Average score (secondary metric) */}
                                    <td className="py-2.5 px-3 text-right font-mono text-stone-600">
                                      {item.averageScore.toFixed(1)} / 10
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>

                        <div className="p-3 bg-stone-50 border-t border-stone-200 text-[11px] text-stone-600 flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                          <p>
                            <strong>Competition Rules:</strong> Platoons are ranked by distinct
                            registered participants scoring above 5/10 (6 to 10 points). Each
                            corps member counts once per round. Percentage of registration is
                            displayed as secondary supporting context. Tied platoons are marked as
                            ties without arbitrary tie-breaking.
                          </p>
                        </div>
                      </div>

                      {/* INDIVIDUAL QUIZ RESULTS AUDIT TRAIL */}
                      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs">
                        <div className="px-4 py-3 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-stone-900 text-xs sm:text-sm">
                              Submitted Quiz Results Audit Trail ({platoonReport.individualResults.length} records)
                            </h4>
                            <p className="text-[11px] text-stone-500">
                              Verify or invalidate suspicious submissions without deleting audit history.
                            </p>
                          </div>
                        </div>

                        {platoonReport.individualResults.length > 0 ? (
                          <div className="overflow-x-auto max-h-72 overflow-y-auto">
                            <table className="w-full text-left text-xs">
                              <thead className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200 text-[11px] sticky top-0">
                                <tr>
                                  <th className="py-2 px-3">Participant ID</th>
                                  <th className="py-2 px-3">Category</th>
                                  <th className="py-2 px-3">Platoon</th>
                                  <th className="py-2 px-3 text-center">Score</th>
                                  <th className="py-2 px-3 text-center">Qualifying</th>
                                  <th className="py-2 px-3">Status</th>
                                  <th className="py-2 px-3 text-right">Actions</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-stone-200 font-mono text-[11px]">
                                {platoonReport.individualResults.map((res) => (
                                  <tr key={res.id} className="hover:bg-stone-50">
                                    <td className="py-2 px-3 font-semibold text-stone-800">
                                      {res.participantId}
                                    </td>
                                    <td className="py-2 px-3 font-sans text-stone-700">
                                      <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-stone-100 text-stone-800 border border-stone-200">
                                        {res.categoryName || res.categoryId || 'General Digital'}
                                      </span>
                                    </td>
                                    <td className="py-2 px-3 font-sans">
                                      {res.platoon > 0 ? `Platoon ${res.platoon}` : 'Unassigned'}
                                    </td>
                                    <td className="py-2 px-3 text-center font-bold">
                                      {res.score} / 10
                                    </td>
                                    <td className="py-2 px-3 text-center font-sans">
                                      {res.qualifying ? (
                                        <span className="text-emerald-700 font-bold">Yes (&gt;=6)</span>
                                      ) : (
                                        <span className="text-stone-500">No (&lt;=5)</span>
                                      )}
                                    </td>
                                    <td className="py-2 px-3 font-sans">
                                      {res.status === 'verified' && (
                                        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">
                                          Verified
                                        </span>
                                      )}
                                      {res.status === 'unverified' && (
                                        <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-[10px] font-bold">
                                          Unverified
                                        </span>
                                      )}
                                      {res.status === 'invalidated' && (
                                        <span
                                          className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded text-[10px] font-bold"
                                          title={res.invalidationReason}
                                        >
                                          Invalidated
                                        </span>
                                      )}
                                    </td>
                                    <td className="py-2 px-3 text-right font-sans space-x-1.5 whitespace-nowrap">
                                      {res.status !== 'verified' && res.status !== 'invalidated' && (
                                        <button
                                          onClick={() => handleVerifyQuizResult(res.id!)}
                                          disabled={isUpdatingResultStatus}
                                          className="text-[10px] bg-emerald-100 text-emerald-800 hover:bg-emerald-200 px-2 py-0.5 rounded font-bold cursor-pointer"
                                        >
                                          Verify
                                        </button>
                                      )}
                                      {res.status !== 'invalidated' && (
                                        <button
                                          onClick={() => {
                                            setTargetResultToInvalidate(res);
                                            setInvalidationReasonInput('');
                                            setInvalidationModalOpen(true);
                                          }}
                                          disabled={isUpdatingResultStatus}
                                          className="text-[10px] bg-rose-100 text-rose-800 hover:bg-rose-200 px-2 py-0.5 rounded font-bold cursor-pointer"
                                        >
                                          Invalidate
                                        </button>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="p-6 text-center text-xs text-stone-500">
                            No quiz results recorded yet for this round.
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB: CDS GROUP MANAGEMENT & PERFORMANCE */}
              {activeTab === 'cds' && (
                <div className="space-y-6">
                  {/* CDS Header & Performance Summary */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-600" />
                        <span>Post-Camp CDS Group Management</span>
                      </h3>
                      <p className="text-[11px] text-stone-500">
                        Create and track digital skill performance by Community Development Service (CDS) groups.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingCDS({ name: '', active: true, state: 'Lagos' });
                          setIsCDSModalOpen(true);
                        }}
                        className="inline-flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold px-3.5 py-2 rounded-xl text-xs cursor-pointer transition-transform active:scale-95 shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Create CDS Group</span>
                      </button>
                      <button
                        onClick={handleLoadCDSPerformance}
                        disabled={isLoadingCDS}
                        className="inline-flex items-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold px-3.5 py-2 rounded-xl text-xs cursor-pointer disabled:opacity-60 transition-transform active:scale-95"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isLoadingCDS ? 'animate-spin' : ''}`} />
                        <span>Refresh Performance</span>
                      </button>
                    </div>
                  </div>

                  {/* CDS Performance Leaderboard */}
                  <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs">
                    <div className="px-4 py-3 border-b border-stone-200 bg-stone-50/70 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-stone-900 text-xs sm:text-sm">
                          CDS Group Digital Performance Leaderboard
                        </h4>
                        <p className="text-[10px] sm:text-[11px] text-stone-500">
                          Group-level registration and qualification totals for {platoonFilterRound}.
                        </p>
                      </div>
                      {cdsDashboardData && (
                        <span className="text-[10px] font-mono text-stone-500">
                          Loaded {cdsDashboardData.loadedAt}
                        </span>
                      )}
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200 text-[11px]">
                          <tr>
                            <th className="py-2.5 px-3">CDS Group</th>
                            <th className="py-2.5 px-3 text-right">Registered</th>
                            <th className="py-2.5 px-3 text-right">Quiz Taken</th>
                            <th className="py-2.5 px-3 text-right bg-emerald-50 text-emerald-950">Qualifiers</th>
                            <th className="py-2.5 px-3 text-right">Qual. Rate</th>
                            <th className="py-2.5 px-3 text-right">Avg Score</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-200">
                          {cdsPerformance.length > 0 ? cdsPerformance.map((perf) => (
                            <tr key={perf.cdsGroupId} className="hover:bg-stone-50">
                              <td className="py-2.5 px-3 font-bold text-stone-900">{perf.cdsGroupName}</td>
                              <td className="py-2.5 px-3 text-right">{perf.registeredCount}</td>
                              <td className="py-2.5 px-3 text-right">{perf.quizParticipants}</td>
                              <td className="py-2.5 px-3 text-right font-black text-emerald-700 bg-emerald-50/30">{perf.qualifyingParticipants}</td>
                              <td className="py-2.5 px-3 text-right">{perf.qualificationRate}%</td>
                              <td className="py-2.5 px-3 text-right">{perf.averageScore}/10</td>
                            </tr>
                          )) : (
                            <tr>
                              <td colSpan={6} className="py-8 text-center text-stone-400 italic">
                                {isLoadingCDS ? 'Calculating performance...' : 'No CDS performance data available for this round.'}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* CDS MEMBER PERFORMANCE TRACKER */}
                  <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs space-y-4 p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
                      <div>
                        <h4 className="font-black text-stone-900 text-sm flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-amber-500" />
                          <span>CDS Member Performance Tracker</span>
                        </h4>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          Ranks individual CDS members by <strong>highest quiz score</strong>, breaking ties by <strong>fastest completion time</strong>.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleExportCDSMemberCSV}
                        disabled={isExportingCDSCSV || cdsMemberRankings.length === 0}
                        className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-xl text-[11px] cursor-pointer disabled:opacity-50 shrink-0"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{isExportingCDSCSV ? 'Exporting...' : 'Export Rankings CSV'}</span>
                      </button>
                    </div>

                    {/* Filters Row (Zero extra Firestore reads) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 bg-stone-50 p-3 rounded-xl border border-stone-200">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">
                          Filter by CDS Group
                        </label>
                        <select
                          value={cdsMemberGroupFilter}
                          onChange={(e) => setCdsMemberGroupFilter(e.target.value)}
                          className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-stone-800 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                        >
                          <option value="all">All CDS Groups</option>
                          {cdsGroups.map((g) => (
                            <option key={g.id} value={g.id}>
                              {g.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">
                          Filter by Quiz Category
                        </label>
                        <select
                          value={cdsMemberCategoryFilter}
                          onChange={(e) => setCdsMemberCategoryFilter(e.target.value)}
                          className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-stone-800 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                        >
                          <option value="all">All Categories (Best Score)</option>
                          <option value="ai_emerging_tech">AI &amp; Emerging Technology</option>
                          <option value="career_employability">Career &amp; Employability</option>
                          <option value="digital_business_entrepreneurship">Digital Business &amp; Entrepreneurship</option>
                          <option value="digital_literacy_safety">Digital Literacy &amp; Online Safety</option>
                          <option value="productivity_digital_tools">Productivity &amp; Digital Tools</option>
                          <option value="data_digital_skills">Data &amp; Digital Skills</option>
                        </select>
                      </div>

                      <div className="flex items-end">
                        <label className="flex items-center gap-2 w-full bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs font-semibold text-stone-700 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={cdsMemberQualifiedOnly}
                            onChange={(e) => setCdsMemberQualifiedOnly(e.target.checked)}
                            className="rounded text-emerald-700 focus:ring-emerald-600 cursor-pointer"
                          />
                          <span>Qualified Only (≥ 6/10)</span>
                        </label>
                      </div>
                    </div>

                    {/* Top Performer Highlight Card */}
                    {cdsMemberRankings.length > 0 && (() => {
                      const topRankers = cdsMemberRankings.filter((m) => m.rank === 1);
                      const leader = topRankers[0];
                      const qualifiedCount = cdsMemberRankings.filter((m) => m.qualifying).length;

                      return (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="sm:col-span-2 p-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs flex items-center justify-between gap-3">
                            <div className="space-y-0.5 min-w-0">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-100 flex items-center gap-1">
                                <Trophy className="w-3.5 h-3.5 text-white" />
                                <span>
                                  {topRankers.length > 1
                                    ? `Top CDS Performers (${topRankers.length}-Way Tie)`
                                    : 'Top CDS Member (Highest Score & Fastest Time)'}
                                </span>
                              </span>
                              <p className="text-base font-black truncate">
                                {topRankers.map((t) => t.memberName).join(' & ')}
                              </p>
                              <p className="text-[11px] text-amber-100 truncate">
                                {leader.cdsGroupName} • {leader.categoryName}
                              </p>
                            </div>
                            <div className="text-right shrink-0 bg-white/15 px-3 py-2 rounded-xl border border-white/20">
                              <div className="text-lg font-black leading-none">
                                {leader.score}/{leader.totalQuestions}
                              </div>
                              <div className="text-[10px] font-mono text-amber-100 mt-1 flex items-center justify-end gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{leader.timeTakenDisplay}</span>
                              </div>
                            </div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex flex-col justify-center space-y-1">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-stone-500 font-semibold">Ranked CDS Members:</span>
                              <span className="font-black text-stone-900">{cdsMemberRankings.length}</span>
                            </div>
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-stone-500 font-semibold">Qualifying (≥ 6/10):</span>
                              <span className="font-black text-emerald-700">{qualifiedCount}</span>
                            </div>
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-stone-500 font-semibold">Total Registered CDS:</span>
                              <span className="font-bold text-stone-700">
                                {cdsDashboardData?.totalCDSMembers ?? 0}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Ranked CDS Members Table */}
                    <div className="overflow-x-auto border border-stone-200 rounded-xl max-h-96 overflow-y-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200 text-[11px] sticky top-0">
                          <tr>
                            <th className="py-2.5 px-3">Rank</th>
                            <th className="py-2.5 px-3">Member</th>
                            <th className="py-2.5 px-3">CDS Group</th>
                            <th className="py-2.5 px-3">Category</th>
                            <th className="py-2.5 px-3 text-center bg-emerald-50 text-emerald-950">Score</th>
                            <th className="py-2.5 px-3 text-center bg-amber-50 text-amber-950">Speed (Time)</th>
                            <th className="py-2.5 px-3 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-200">
                          {cdsMemberRankings.length > 0 ? (
                            cdsMemberRankings.map((member) => {
                              const isTop = member.rank === 1;
                              return (
                                <tr
                                  key={member.participantId}
                                  className={isTop ? 'bg-amber-50/50 font-semibold' : 'hover:bg-stone-50'}
                                >
                                  <td className="py-2.5 px-3 whitespace-nowrap">
                                    {isTop ? (
                                      <span className="inline-flex items-center gap-1 font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full text-[11px]">
                                        <Trophy className="w-3 h-3" />
                                        #{member.displayRank}
                                      </span>
                                    ) : (
                                      <span className="font-mono font-bold text-stone-700">
                                        #{member.displayRank}
                                      </span>
                                    )}
                                  </td>
                                  <td className="py-2.5 px-3">
                                    <div className="font-bold text-stone-900">{member.memberName}</div>
                                    <div className="text-[10px] font-mono text-stone-500">{member.stateCode}</div>
                                  </td>
                                  <td className="py-2.5 px-3 text-stone-700 font-medium">
                                    {member.cdsGroupName}
                                  </td>
                                  <td className="py-2.5 px-3">
                                    <span className="inline-block px-2 py-0.5 rounded bg-stone-100 text-stone-700 text-[10px] font-semibold border border-stone-200">
                                      {member.categoryName}
                                    </span>
                                    {member.attemptsCount > 1 && cdsMemberCategoryFilter === 'all' && (
                                      <div className="text-[10px] text-stone-400 mt-0.5">
                                        Best of {member.attemptsCount} categories
                                      </div>
                                    )}
                                  </td>
                                  <td className="py-2.5 px-3 text-center font-mono font-black text-emerald-800 bg-emerald-50/30">
                                    {member.score}/{member.totalQuestions}
                                  </td>
                                  <td className="py-2.5 px-3 text-center font-mono font-bold text-amber-900 bg-amber-50/30 whitespace-nowrap">
                                    <span className="inline-flex items-center gap-1">
                                      <Clock className="w-3 h-3 text-amber-600" />
                                      {member.timeTakenDisplay}
                                    </span>
                                  </td>
                                  <td className="py-2.5 px-3 text-right whitespace-nowrap">
                                    {member.qualifying ? (
                                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                        Qualified
                                      </span>
                                    ) : (
                                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-100 text-stone-600">
                                        Below 6
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan={7} className="py-8 text-center text-stone-400 italic">
                                {isLoadingCDS
                                  ? 'Loading CDS member quiz rankings...'
                                  : 'No CDS member quiz completions match the selected filters yet.'}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Active CDS Groups Inventory */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-stone-800 text-xs uppercase tracking-wider px-1">
                      Active CDS Groups Inventory
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {cdsGroups.map((group) => (
                        <div key={group.id} className="p-4 bg-white border border-stone-200 rounded-xl shadow-xs flex flex-col justify-between group">
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${group.active ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-500'}`}>
                                {group.active ? 'ACTIVE' : 'INACTIVE'}
                              </span>
                              <button
                                onClick={() => {
                                  setEditingCDS(group);
                                  setIsCDSModalOpen(true);
                                }}
                                className="p-1.5 text-stone-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <h5 className="font-bold text-stone-900 text-sm mb-1">{group.name}</h5>
                            <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed mb-3">
                              {group.description || 'No description provided.'}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 pt-2 border-t border-stone-100 text-[10px] text-stone-400">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-2.5 h-2.5" /> {group.lga || 'General'}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Flag className="w-2.5 h-2.5" /> {group.state || 'N/A'}
                            </span>
                          </div>
                        </div>
                      ))}
                      {cdsGroups.length === 0 && !isLoadingCDS && (
                        <div className="col-span-full py-8 text-center bg-stone-50 border border-dashed border-stone-300 rounded-xl text-stone-400 text-xs">
                          No CDS groups created yet. Click "Create CDS Group" to begin.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: PRODUCTION LAUNCH CHECKLIST & EVENT QR */}
              {activeTab === 'launch' && (
                <div className="space-y-6">
                  {/* Event QR Code Section */}
                  <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl">
                    <h3 className="font-bold text-stone-900 text-sm mb-1 text-center">
                      Official Event QR Code & Direct Link
                    </h3>
                    <p className="text-[11px] text-stone-500 text-center mb-4">
                      Share with orientation camp platoon leaders, project on hall screens, or print for pavilions.
                    </p>
                    <QRCodeDisplay
                      appUrl={
                        typeof window !== 'undefined' && window.location.origin
                          ? window.location.origin
                          : 'https://ais-pre-7k6cm4rvdpgqnw2gbsrc25-935780190382.europe-west2.run.app'
                      }
                    />
                  </div>

                  {/* 16-Point Step-by-Step Production Launch Checklist */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-stone-900 text-sm">
                          16-Point Production Launch Checklist
                        </h3>
                        <p className="text-[11px] text-stone-500">
                          Pre-event verification and operational procedure for 2,000 NYSC participants.
                        </p>
                      </div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full uppercase border border-emerald-300">
                        Launch Ready
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {/* Item 1 */}
                      <div className="p-3 bg-white border border-stone-200 rounded-xl space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            1. Confirm Firebase Project & Firestore Database
                          </span>
                          <span className="text-[10px] bg-stone-100 text-stone-700 font-mono px-2 py-0.5 rounded">Verified</span>
                        </div>
                        <p className="text-[11px] text-stone-600 pl-5">
                          Project ID: <code>gen-lang-client-0161395785</code>. Database ID: <code>ai-studio-digitalcorpshub-04f3a02c-b2d5-4ee7-a1bd-7f83b5e7505b</code>. Single Firestore instance provisioned and connected via <code>firebase-applet-config.json</code>.
                        </p>
                      </div>

                      {/* Item 2 */}
                      <div className="p-3 bg-white border border-stone-200 rounded-xl space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            2. Verify Free Quota Database Eligibility
                          </span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Compliant</span>
                        </div>
                        <p className="text-[11px] text-stone-600 pl-5">
                          Standard single database in Firebase Spark plan. Free limits include <strong>50,000 document reads/day</strong>, <strong>20,000 document writes/day</strong>, and <strong>1 GB storage</strong>. No paid extensions or background Cloud Functions enabled.
                        </p>
                      </div>

                      {/* Item 3 */}
                      <div className="p-3 bg-white border border-stone-200 rounded-xl space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            3. Review Firestore Usage Limits vs Projected Load
                          </span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">~12.5% Writes / &lt;1% Reads</span>
                        </div>
                        <p className="text-[11px] text-stone-600 pl-5">
                          Projected budget for 2,000 corps members: 2,000 registrations = 2,000 writes. 500 challenge submissions = 500 writes. Coordinator aggregate queries = ~250 reads. Total writes: <strong>~2,500 / 20,000 (12.5%)</strong>. Total reads: <strong>~250 / 50,000 (0.5%)</strong>.
                        </p>
                      </div>

                      {/* Item 4 */}
                      <div className="p-3 bg-white border border-stone-200 rounded-xl space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            4. Apply & Publish Final Firestore Security Rules
                          </span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Rules v2 Deployed</span>
                        </div>
                        <p className="text-[11px] text-stone-600 pl-5">
                          <code>firestore.rules</code> is deployed and active. Global default-deny on all documents. Public can only blind-create participants and challenge submissions with strict schema validation. Public read/update/delete denied on all collections.
                        </p>
                      </div>

                      {/* Item 5 */}
                      <div className="p-3 bg-white border border-stone-200 rounded-xl space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            5. Configure Firebase Auth for Approved Administrators
                          </span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Allowlist Active</span>
                        </div>
                        <p className="text-[11px] text-stone-600 pl-5">
                          Google Auth provider configured. Access strictly checked against coordinator email allowlist (<code>jomaschools@gmail.com</code>) in both Firestore Security Rules (<code>request.auth.token.email</code>) and client-side access gates.
                        </p>
                      </div>

                      {/* Item 6 */}
                      <div className="p-3 bg-white border border-stone-200 rounded-xl space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            6. Configure Firebase App Check
                          </span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">reCAPTCHA v3 Ready</span>
                        </div>
                        <p className="text-[11px] text-stone-600 pl-5">
                          Configured in <code>src/lib/firebase.ts</code>. Attests client authenticity to mitigate automated bot registrations. In staging/testing, debug tokens allow coordinator bypass without blocking orientation camp traffic.
                        </p>
                      </div>

                      {/* Item 7 */}
                      <div className="p-3 bg-white border border-stone-200 rounded-xl space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            7. Confirm All Public Content is Bundled Locally
                          </span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Zero-Read Bundle</span>
                        </div>
                        <p className="text-[11px] text-stone-600 pl-5">
                          All event details, 10 platoon problem statements, 5 digital opportunity tracks, 4 starter toolkit resources, ATS resume guides, and FAQs are bundled in <code>src/data/staticContent.ts</code>. Navigating pages consumes exactly 0 Firestore reads.
                        </p>
                      </div>

                      {/* Item 8 */}
                      <div className="p-3 bg-white border border-stone-200 rounded-xl space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            8. Verify Mobile Device Form Usability
                          </span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Mobile-First</span>
                        </div>
                        <p className="text-[11px] text-stone-600 pl-5">
                          Tested for low-cost Android smartphones (down to 320px viewport width). Large tap targets (min 44px), high-contrast accessible typography, single contact field, clear validation hints, and double-click submission prevention.
                        </p>
                      </div>

                      {/* Item 9 */}
                      <div className="p-3 bg-white border border-stone-200 rounded-xl space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            9. Pilot Testing Protocol (20–50 Users)
                          </span>
                          <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">Action Item</span>
                        </div>
                        <p className="text-[11px] text-stone-600 pl-5">
                          <strong>Procedure:</strong> On morning of Digital Day, recruit 20–30 corps members in Platoon 1. Have them register and submit 1 challenge test. Verify records appear in the Admin Portal. Only then project QR code for remaining platoons.
                        </p>
                      </div>

                      {/* Item 10 */}
                      <div className="p-3 bg-white border border-stone-200 rounded-xl space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            10. Digital Privacy & Banking Safety Protocol
                          </span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Verified Safe</span>
                        </div>
                        <p className="text-[11px] text-stone-600 pl-5">
                          Digital Corps Hub enforces strict zero-financial data collection. No BVN, account numbers, or financial credentials are ever requested or stored.
                        </p>
                      </div>

                      {/* Item 11 */}
                      <div className="p-3 bg-white border border-stone-200 rounded-xl space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            11. Generate Event QR Code
                          </span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Generated Above</span>
                        </div>
                        <p className="text-[11px] text-stone-600 pl-5">
                          High-resolution QR code generator embedded above. Formatted in NYSC dark emerald with high contrast for projector displays, printed banners, and quick smartphone camera scanning.
                        </p>
                      </div>

                      {/* Item 12 */}
                      <div className="p-3 bg-white border border-stone-200 rounded-xl space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            12. Fallback Registration Protocol for Network Outage
                          </span>
                          <span className="text-[10px] bg-stone-100 text-stone-700 font-mono px-2 py-0.5 rounded">Contingency Ready</span>
                        </div>
                        <p className="text-[11px] text-stone-600 pl-5">
                          If cellular networks in orientation camp become congested: (a) Local browser state retains registration pass without remote check; (b) Platoon leaders maintain physical paper roster sheets (Name, State Code, Contact, Consent); (c) Batch upload after event.
                        </p>
                      </div>

                      {/* Item 13 */}
                      <div className="p-3 bg-white border border-stone-200 rounded-xl space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            13. Live Firestore Usage & Error Monitoring
                          </span>
                          <span className="text-[10px] bg-stone-100 text-stone-700 font-mono px-2 py-0.5 rounded">Console Checklist</span>
                        </div>
                        <p className="text-[11px] text-stone-600 pl-5">
                          During the event, lead coordinator should keep Firebase Console open at <strong>Firestore &gt; Usage</strong>. Check every 2 hours: confirms daily writes remain below 15,000 and zero permission-denied spikes.
                        </p>
                      </div>

                      {/* Item 14 */}
                      <div className="p-3 bg-white border border-stone-200 rounded-xl space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            14. Secure CSV Export & Disaster Recovery
                          </span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Built-In Portal</span>
                        </div>
                        <p className="text-[11px] text-stone-600 pl-5">
                          One-click CSV export available in the "Participant Records" tab. Exports sanitised spreadsheet with full consent timestamps, state codes, and platoon allocations. Generates an append-only audit trail record in <code>adminAuditLogs</code>.
                        </p>
                      </div>

                      {/* Item 15 */}
                      <div className="p-3 bg-white border border-stone-200 rounded-xl space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            15. Safe App Redeployment Protocol
                          </span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Data Preservation</span>
                        </div>
                        <p className="text-[11px] text-stone-600 pl-5">
                          Frontend builds via Vite (<code>npm run build</code>) only update static assets. Redeployment does NOT recreate, touch, or wipe Firestore collections. Existing participant records remain intact in cloud storage.
                        </p>
                      </div>

                      {/* Item 16 */}
                      <div className="p-3 bg-white border border-stone-200 rounded-xl space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            16. Verify Hosting & Server Costs Separately
                          </span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Zero Cost Architecture</span>
                        </div>
                        <p className="text-[11px] text-stone-600 pl-5">
                          The application is a lightweight client-side Single Page Application (SPA). Hosting on Google AI Studio / Firebase Hosting is static. Zero always-on background server instances required. Total estimated event cost: <strong>₦0.00 / $0.00</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 8: LEARNING ACADEMY MANAGEMENT */}
              {activeTab === 'academy' && (() => {
                const totalModulesCount = ALL_ACADEMY_COURSES.reduce((acc, c) => acc + c.modules.length, 0);
                const totalLessonsCount = ALL_ACADEMY_COURSES.reduce(
                  (acc, c) => acc + c.modules.reduce((mAcc, m) => mAcc + m.lessons.length, 0),
                  0
                );
                const pendingReviewCount = academySubmissions.filter(
                  (s) => s.submissionStatus === 'submitted' || s.submissionStatus === 'under_review'
                ).length;

                const selectedCourseObj =
                  academyFilterCourse !== 'all' ? getCourseById(academyFilterCourse) : undefined;
                const availableFilterModules = selectedCourseObj ? selectedCourseObj.modules : [];

                const learnerQuery = academyFilterLearner.trim().toLowerCase();

                const filteredProgressRecords = academyProgressList.filter((p) => {
                  const course = getCourseById(p.courseId);
                  if (!course) return false;
                  const sub = academySubmissions.find(
                    (s) => s.courseId === p.courseId && s.participantId === p.participantId
                  );
                  const summary = getCourseCompletionSummary(p, course, sub, academyConfig);

                  if (academyFilterCourse !== 'all' && p.courseId !== academyFilterCourse) return false;
                  if (academyFilterModule !== 'all') {
                    const hasModLessonsOrCheck =
                      p.completedModuleIds?.includes(academyFilterModule) ||
                      p.moduleCheckScores?.[academyFilterModule] !== undefined;
                    if (!hasModLessonsOrCheck) return false;
                  }
                  if (learnerQuery) {
                    const hay = `${p.participantName || ''} ${p.participantId} ${p.stateCode || ''}`.toLowerCase();
                    if (!hay.includes(learnerQuery)) return false;
                  }
                  if (academyFilterPlatoon !== 'all') {
                    if (academyFilterPlatoon === 'unassigned') {
                      if (p.platoon && p.platoon > 0) return false;
                    } else if (String(p.platoon || 0) !== academyFilterPlatoon) {
                      return false;
                    }
                  }
                  if (academyFilterCompletion === 'completed' && p.courseStatus !== 'completed') return false;
                  if (academyFilterCompletion === 'in_progress' && p.courseStatus !== 'in_progress') return false;
                  if (academyFilterCompletion === 'certificate_eligible' && !summary.certificateEligible) return false;

                  if (academyFilterAssessment === 'passed' && !summary.finalAssessmentPassed) return false;
                  if (
                    academyFilterAssessment === 'failed' &&
                    ((p.finalAssessmentAttempts || 0) === 0 || summary.finalAssessmentPassed)
                  ) {
                    return false;
                  }
                  if (academyFilterAssessment === 'not_attempted' && (p.finalAssessmentAttempts || 0) > 0) {
                    return false;
                  }

                  const subStatus = sub?.submissionStatus || 'none';
                  if (academyFilterSubmission !== 'all' && subStatus !== academyFilterSubmission) return false;

                  return true;
                });

                const filteredSubmissions = academySubmissions.filter((sub) => {
                  if (academyFilterCourse !== 'all' && sub.courseId !== academyFilterCourse) return false;
                  if (learnerQuery) {
                    const hay = `${sub.participantName || ''} ${sub.participantId} ${sub.stateCode || ''}`.toLowerCase();
                    if (!hay.includes(learnerQuery)) return false;
                  }
                  if (academyFilterPlatoon !== 'all') {
                    if (academyFilterPlatoon === 'unassigned') {
                      if (sub.platoon && sub.platoon > 0) return false;
                    } else if (String(sub.platoon || 0) !== academyFilterPlatoon) {
                      return false;
                    }
                  }
                  if (academyFilterSubmission !== 'all' && sub.submissionStatus !== academyFilterSubmission) {
                    return false;
                  }
                  return true;
                });

                return (
                  <div className="space-y-6">
                    {/* Top Header Card */}
                    <div className="bg-gradient-to-r from-emerald-950 via-stone-900 to-indigo-950 text-white rounded-2xl p-6 border border-emerald-800 shadow-sm">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            <GraduationCap className="w-4 h-4 text-emerald-400" />
                            <span>Digital Corps Hub Academy Portal</span>
                          </div>
                          <h3 className="text-xl font-black text-white">
                            Learning Academy & Curriculum Management
                          </h3>
                          <p className="text-xs text-stone-300 max-w-xl">
                            Manage all {ALL_ACADEMY_COURSES.length} tracks, publish status, pass marks, capstone rubrics, learner analytics, and project reviews.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={handleLoadAcademySubmissions}
                          disabled={isLoadingAcademySubs}
                          className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${isLoadingAcademySubs ? 'animate-spin' : ''}`} />
                          <span>Refresh Academy Data</span>
                        </button>
                      </div>

                      {/* Stats strip */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-white/10 text-xs">
                        <div className="p-2.5 bg-white/5 rounded-xl border border-white/10">
                          <span className="text-[10px] text-stone-400 uppercase font-mono block">Courses</span>
                          <span className="text-lg font-black text-emerald-400">
                            {ALL_ACADEMY_COURSES.length} Tracks
                          </span>
                        </div>
                        <div className="p-2.5 bg-white/5 rounded-xl border border-white/10">
                          <span className="text-[10px] text-stone-400 uppercase font-mono block">Curriculum Depth</span>
                          <span className="text-lg font-black text-white">
                            {totalModulesCount} Modules • {totalLessonsCount} Lessons
                          </span>
                        </div>
                        <div className="p-2.5 bg-white/5 rounded-xl border border-white/10">
                          <span className="text-[10px] text-stone-400 uppercase font-mono block">Learner Enrolments</span>
                          <span className="text-lg font-black text-emerald-400">
                            {academyProgressList.length} Records
                          </span>
                        </div>
                        <div className="p-2.5 bg-white/5 rounded-xl border border-white/10">
                          <span className="text-[10px] text-stone-400 uppercase font-mono block">Submissions Pending</span>
                          <span className="text-lg font-black text-amber-400">
                            {pendingReviewCount} Pending
                          </span>
                        </div>
                      </div>
                    </div>

                    {academyAdminNotice && (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-semibold flex items-center justify-between gap-2">
                        <span>{academyAdminNotice}</span>
                        <button
                          type="button"
                          onClick={() => setAcademyAdminNotice(null)}
                          className="text-emerald-700 hover:text-emerald-950 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* COURSES CATALOG, SETTINGS & CURRICULUM INSPECTOR */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-stone-900 text-sm">
                          Academy Courses Catalog & Configuration ({ALL_ACADEMY_COURSES.length} Tracks)
                        </h4>
                        {isSavingAcademyConfig && (
                          <span className="text-xs text-emerald-700 font-semibold">Saving configuration...</span>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {ALL_ACADEMY_COURSES.map((course) => {
                          const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
                          const isPublished = isCourseEffectivelyPublished(course, academyConfig);
                          const passThreshold = getEffectiveCoursePassThreshold(course, academyConfig);

                          return (
                            <div
                              key={course.courseId}
                              className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-3 flex flex-col justify-between"
                            >
                              <div className="space-y-2">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 capitalize truncate">
                                    {course.categoryId.replace(/_/g, ' ')}
                                  </span>
                                  <button
                                    type="button"
                                    disabled={isSavingAcademyConfig}
                                    onClick={() => handleToggleCoursePublished(course)}
                                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border cursor-pointer ${
                                      isPublished
                                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                        : 'bg-stone-200 text-stone-700 border-stone-300'
                                    }`}
                                  >
                                    {isPublished ? 'Published' : 'Unpublished'}
                                  </button>
                                </div>
                                <h5 className="font-bold text-stone-900 text-sm leading-snug">
                                  {course.title}
                                </h5>
                                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                                  {course.subtitle || course.description}
                                </p>
                              </div>

                              <div className="pt-3 border-t border-stone-100 text-[11px] text-stone-500 space-y-2">
                                <div className="flex justify-between">
                                  <span>Curriculum:</span>
                                  <strong className="text-stone-800">
                                    {course.modules.length} Modules • {totalLessons} Lessons
                                  </strong>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span>Assessment ({course.finalAssessment.length} Qs) Pass %:</span>
                                  <div className="flex items-center gap-1">
                                    <input
                                      type="number"
                                      min={40}
                                      max={100}
                                      defaultValue={passThreshold}
                                      onBlur={(e) => {
                                        const val = Number(e.target.value);
                                        if (val !== passThreshold) {
                                          handleUpdateCoursePassMark(course.courseId, val);
                                        }
                                      }}
                                      className="w-14 text-right px-1.5 py-0.5 border border-stone-300 rounded font-bold text-stone-900 text-[11px]"
                                    />
                                    <span>%</span>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between gap-2 pt-1">
                                  <button
                                    type="button"
                                    onClick={() => setInspectingCourse(course)}
                                    className="flex-1 px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-lg text-[11px] cursor-pointer"
                                  >
                                    Inspect Modules
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const existingRubric =
                                        academyConfig.capstoneRubricOverrides?.[course.courseId] ||
                                        course.capstoneProject.rubric ||
                                        course.capstoneProject.assessmentCriteria.map((c, idx) => ({
                                          id: `crit_${idx + 1}`,
                                          criterion: c,
                                          description: c,
                                          weight: Math.round(100 / Math.max(1, course.capstoneProject.assessmentCriteria.length))
                                        }));
                                      setDraftRubricCriteria(existingRubric);
                                      setEditingRubricCourse(course);
                                    }}
                                    className="flex-1 px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-bold rounded-lg text-[11px] border border-indigo-200 cursor-pointer"
                                  >
                                    Edit Rubric
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* LEARNER PROGRESS, ASSESSMENT & SUBMISSION FILTERS */}
                    <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                            <Filter className="w-4 h-4 text-emerald-600" />
                            <span>Learner Enrolments, Module Checks & Final Assessments</span>
                          </h4>
                          <p className="text-xs text-stone-500">
                            Filter learner progress and capstone submissions by course, module, learner, platoon, completion, assessment, and submission status.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setAcademyFilterCourse('all');
                            setAcademyFilterModule('all');
                            setAcademyFilterLearner('');
                            setAcademyFilterPlatoon('all');
                            setAcademyFilterCompletion('all');
                            setAcademyFilterAssessment('all');
                            setAcademyFilterSubmission('all');
                          }}
                          className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                        >
                          Reset Filters
                        </button>
                      </div>

                      {/* 7-Filter Control Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-xs">
                        <select
                          value={academyFilterCourse}
                          onChange={(e) => {
                            setAcademyFilterCourse(e.target.value);
                            setAcademyFilterModule('all');
                          }}
                          className="p-2 border border-stone-300 rounded-lg bg-stone-50 font-medium"
                        >
                          <option value="all">All Courses</option>
                          {ALL_ACADEMY_COURSES.map((c) => (
                            <option key={c.courseId} value={c.courseId}>
                              {c.title}
                            </option>
                          ))}
                        </select>

                        <select
                          value={academyFilterModule}
                          onChange={(e) => setAcademyFilterModule(e.target.value)}
                          disabled={availableFilterModules.length === 0}
                          className="p-2 border border-stone-300 rounded-lg bg-stone-50 font-medium disabled:opacity-50"
                        >
                          <option value="all">All Modules</option>
                          {availableFilterModules.map((m) => (
                            <option key={m.moduleId} value={m.moduleId}>
                              {m.sequenceLabel}: {m.title}
                            </option>
                          ))}
                        </select>

                        <input
                          type="text"
                          value={academyFilterLearner}
                          onChange={(e) => setAcademyFilterLearner(e.target.value)}
                          placeholder="Search learner/state code..."
                          className="p-2 border border-stone-300 rounded-lg bg-white"
                        />

                        <select
                          value={academyFilterPlatoon}
                          onChange={(e) => setAcademyFilterPlatoon(e.target.value)}
                          className="p-2 border border-stone-300 rounded-lg bg-stone-50 font-medium"
                        >
                          <option value="all">All Platoons</option>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <option key={num} value={String(num)}>
                              Platoon {num}
                            </option>
                          ))}
                          <option value="unassigned">Post-Camp / Unassigned</option>
                        </select>

                        <select
                          value={academyFilterCompletion}
                          onChange={(e) => setAcademyFilterCompletion(e.target.value)}
                          className="p-2 border border-stone-300 rounded-lg bg-stone-50 font-medium"
                        >
                          <option value="all">Any Completion</option>
                          <option value="completed">Completed</option>
                          <option value="in_progress">In Progress</option>
                          <option value="certificate_eligible">Certificate Eligible</option>
                        </select>

                        <select
                          value={academyFilterAssessment}
                          onChange={(e) => setAcademyFilterAssessment(e.target.value)}
                          className="p-2 border border-stone-300 rounded-lg bg-stone-50 font-medium"
                        >
                          <option value="all">Any Assessment</option>
                          <option value="passed">Passed</option>
                          <option value="failed">Attempted (Not Passed)</option>
                          <option value="not_attempted">Not Attempted</option>
                        </select>

                        <select
                          value={academyFilterSubmission}
                          onChange={(e) => setAcademyFilterSubmission(e.target.value)}
                          className="p-2 border border-stone-300 rounded-lg bg-stone-50 font-medium"
                        >
                          <option value="all">Any Submission</option>
                          <option value="draft">Draft</option>
                          <option value="submitted">Submitted</option>
                          <option value="under_review">Under Review</option>
                          <option value="approved">Approved</option>
                          <option value="revision_requested">Revision Requested</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>

                      {/* Filtered Learner Progress Table */}
                      <div className="overflow-x-auto border border-stone-200 rounded-xl">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase text-[10px]">
                            <tr>
                              <th className="p-3">Learner</th>
                              <th className="p-3">Course</th>
                              <th className="p-3 text-center">Lessons</th>
                              <th className="p-3 text-center">Module Checks</th>
                              <th className="p-3 text-center">Final Exam</th>
                              <th className="p-3 text-center">Capstone</th>
                              <th className="p-3 text-right">Certificate</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-stone-100 font-medium text-stone-700">
                            {filteredProgressRecords.length === 0 ? (
                              <tr>
                                <td colSpan={7} className="p-6 text-center text-stone-500">
                                  No learner progress records match the current filters.
                                </td>
                              </tr>
                            ) : (
                              filteredProgressRecords.slice(0, 80).map((p) => {
                                const course = getCourseById(p.courseId);
                                if (!course) return null;
                                const sub = academySubmissions.find(
                                  (s) => s.courseId === p.courseId && s.participantId === p.participantId
                                );
                                const summary = getCourseCompletionSummary(p, course, sub, academyConfig);

                                return (
                                  <tr key={`${p.courseId}_${p.participantId}`} className="hover:bg-stone-50/50">
                                    <td className="p-3">
                                      <span className="font-bold text-stone-900 block">
                                        {p.participantName || p.participantId}
                                      </span>
                                      <span className="text-[10px] text-stone-500 font-mono">
                                        {p.platoon ? `Platoon ${p.platoon}` : 'Post-Camp'} {p.stateCode ? `• ${p.stateCode}` : ''}
                                      </span>
                                    </td>
                                    <td className="p-3 max-w-[200px] truncate">{course.title}</td>
                                    <td className="p-3 text-center font-mono">
                                      {summary.completedLessonsCount}/{summary.totalLessonsCount}
                                    </td>
                                    <td className="p-3 text-center font-mono">
                                      {summary.completedModuleChecksCount}/{summary.requiredModuleChecksCount}
                                    </td>
                                    <td className="p-3 text-center">
                                      {summary.finalAssessmentBestScore > 0 ? (
                                        <span
                                          className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                                            summary.finalAssessmentPassed
                                              ? 'bg-emerald-100 text-emerald-800'
                                              : 'bg-rose-100 text-rose-800'
                                          }`}
                                        >
                                          {summary.finalAssessmentBestScore}%
                                        </span>
                                      ) : (
                                        <span className="text-stone-400">—</span>
                                      )}
                                    </td>
                                    <td className="p-3 text-center capitalize text-[11px]">
                                      {sub?.submissionStatus?.replace('_', ' ') || 'none'}
                                    </td>
                                    <td className="p-3 text-right">
                                      <span
                                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                          summary.certificateEligible
                                            ? 'bg-emerald-100 text-emerald-800'
                                            : 'bg-stone-100 text-stone-600'
                                        }`}
                                      >
                                        {summary.certificateEligible ? 'Eligible' : `${summary.overallCompletionPct}%`}
                                      </span>
                                    </td>
                                  </tr>
                                );
                              })
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* CAPSTONE PROJECT SUBMISSIONS & EVALUATION */}
                    <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                            <Layers className="w-4 h-4 text-indigo-600" />
                            <span>Participant Capstone Project Submissions ({filteredSubmissions.length})</span>
                          </h4>
                          <p className="text-xs text-stone-500">
                            Inspect submitted deliverables, score each rubric criterion, and update review status.
                          </p>
                        </div>
                      </div>

                      {isLoadingAcademySubs ? (
                        <div className="p-8 text-center text-xs text-stone-500">
                          <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-stone-400" />
                          Loading submissions from Firestore...
                        </div>
                      ) : filteredSubmissions.length === 0 ? (
                        <div className="p-8 text-center text-xs text-stone-500 bg-stone-50 rounded-xl border border-stone-200">
                          No capstone submissions match the active filters.
                        </div>
                      ) : (
                        <div className="overflow-x-auto border border-stone-200 rounded-xl">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase text-[10px]">
                              <tr>
                                <th className="p-3">Participant</th>
                                <th className="p-3">Platoon</th>
                                <th className="p-3">Course</th>
                                <th className="p-3">Project Title</th>
                                <th className="p-3">Links / Files</th>
                                <th className="p-3">Status</th>
                                <th className="p-3 text-right">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100 font-medium text-stone-700">
                              {filteredSubmissions.map((sub) => {
                                const primaryLink =
                                  sub.supportingLinks?.[0]?.url || sub.artifactUrl || sub.submissionUrl;
                                return (
                                  <tr key={sub.submissionId || sub.id} className="hover:bg-stone-50/50">
                                    <td className="p-3 font-bold text-stone-900">{sub.participantName}</td>
                                    <td className="p-3 font-mono">
                                      {sub.platoon ? `Platoon ${sub.platoon}` : 'Post-Camp'}
                                    </td>
                                    <td className="p-3 text-[11px] text-stone-600">
                                      {sub.courseTitle || sub.courseId}
                                    </td>
                                    <td className="p-3 max-w-xs truncate">{sub.projectTitle}</td>
                                    <td className="p-3">
                                      {primaryLink ? (
                                        <a
                                          href={primaryLink}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="text-indigo-600 hover:underline flex items-center gap-1 font-semibold"
                                        >
                                          <span>Open Link</span>
                                          <ExternalLink className="w-3 h-3" />
                                        </a>
                                      ) : (
                                        <span className="text-stone-400">
                                          {sub.uploadedAttachments?.length || 0} file(s)
                                        </span>
                                      )}
                                    </td>
                                    <td className="p-3">
                                      <span
                                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                          sub.submissionStatus === 'approved'
                                            ? 'bg-emerald-100 text-emerald-800'
                                            : sub.submissionStatus === 'rejected' ||
                                                sub.submissionStatus === 'revision_requested'
                                              ? 'bg-rose-100 text-rose-800'
                                              : sub.submissionStatus === 'under_review'
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-amber-100 text-amber-800'
                                        }`}
                                      >
                                        {(sub.submissionStatus || 'submitted').replace('_', ' ')}
                                      </span>
                                    </td>
                                    <td className="p-3 text-right">
                                      <button
                                        onClick={() => openCapstoneReviewModal(sub)}
                                        className="px-3 py-1 bg-stone-900 hover:bg-emerald-700 text-white font-bold rounded-lg text-[11px] transition cursor-pointer"
                                      >
                                        Review
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>

                    {/* QUESTION-TO-COURSE COVERAGE & GAP RECOMMENDATIONS */}
                    {(() => {
                      const coverageReport = generateQuestionCoverageReport();

                      return (
                        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-emerald-600" />
                                <h4 className="font-bold text-stone-900 text-sm">
                                  Quiz Question Mapping & Business Growth Gap Recommendations
                                </h4>
                              </div>
                              <p className="text-xs text-stone-500">
                                180 active quiz questions mapped across categories, with dual-track routing for Digital Business &amp; Entrepreneurship.
                              </p>
                            </div>

                            <div className="flex items-center gap-3 flex-wrap">
                              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-black text-xs rounded-full border border-emerald-200">
                                {coverageReport.coveragePercentage}% Mapped
                              </span>
                              <button
                                type="button"
                                onClick={() => setShowGapRecommendations((prev) => !prev)}
                                className="text-xs font-bold text-indigo-700 hover:text-indigo-900 underline cursor-pointer"
                              >
                                {showGapRecommendations
                                  ? 'Hide Question Bank Gap Additions'
                                  : `View ${RECOMMENDED_ADDITIONAL_BIZ_QUESTIONS.length} Suggested Quiz Additions`}
                              </button>
                              <button
                                type="button"
                                onClick={() => setShowCoverageDetails((prev) => !prev)}
                                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline cursor-pointer"
                              >
                                {showCoverageDetails ? 'Hide Mappings' : 'View All 180 Mappings'}
                              </button>
                            </div>
                          </div>

                          {showGapRecommendations && (
                            <div className="p-4 bg-indigo-50/60 border border-indigo-200 rounded-xl space-y-3">
                              <div>
                                <h5 className="font-bold text-indigo-950 text-xs">
                                  Recommended Question-Bank Additions for "Grow Your Business Online" Topics
                                </h5>
                                <p className="text-[11px] text-indigo-900/80">
                                  Preserved outside the 180 live quiz questions until an Admin chooses to schedule them in future rounds:
                                </p>
                              </div>
                              <div className="grid md:grid-cols-2 gap-3">
                                {RECOMMENDED_ADDITIONAL_BIZ_QUESTIONS.map((rec) => (
                                  <div
                                    key={rec.suggestedId}
                                    className="p-3 bg-white rounded-xl border border-indigo-200 text-xs space-y-1.5"
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className="font-mono font-bold text-indigo-700">
                                        {rec.suggestedId} • {rec.targetLessonId}
                                      </span>
                                      <span className="text-[10px] uppercase bg-indigo-50 px-2 py-0.5 rounded font-bold text-indigo-800">
                                        {rec.difficulty}
                                      </span>
                                    </div>
                                    <p className="font-bold text-stone-900">{rec.topicGap}</p>
                                    <p className="text-stone-700">{rec.suggestedQuestionText}</p>
                                    <p className="text-[11px] text-emerald-800 font-semibold">
                                      Answer: {rec.suggestedOptions[rec.correctAnswer]}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {showCoverageDetails && (
                            <div className="pt-3 border-t border-stone-100 space-y-2">
                              <div className="max-h-80 overflow-y-auto border border-stone-200 rounded-xl p-2 bg-stone-50/50 text-[11px] divide-y divide-stone-200">
                                {QUESTION_OBJECTIVE_MAPPINGS.map((m) => (
                                  <div key={m.questionId} className="py-1.5 px-2 flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2 truncate">
                                      <span className="font-mono font-bold text-stone-800 shrink-0 w-16">
                                        {m.questionId}
                                      </span>
                                      <span className="text-stone-900 font-semibold truncate max-w-xs">
                                        {m.questionTopic}
                                      </span>
                                      <span className="text-stone-400">→</span>
                                      <span className="text-stone-600 truncate max-w-sm">
                                        {m.courseId}
                                        {m.secondaryCourseId ? ` + ${m.secondaryCourseId}` : ''}
                                      </span>
                                    </div>
                                    <span className="bg-emerald-100 px-1.5 py-0.5 rounded text-emerald-800 font-bold shrink-0 font-mono text-[10px]">
                                      {m.secondaryLessonId || m.lessonId}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        {/* COURSE MODULES & LESSONS INSPECTOR MODAL */}
        {inspectingCourse && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
              <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
                <div>
                  <span className="text-[11px] font-mono font-bold text-emerald-700 uppercase">
                    Curriculum Inspector
                  </span>
                  <h3 className="font-black text-base text-stone-900">{inspectingCourse.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setInspectingCourse(null)}
                  className="p-1.5 text-stone-500 hover:text-stone-900 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5 overflow-y-auto space-y-4 text-xs">
                {inspectingCourse.modules.map((m) => (
                  <div key={m.moduleId} className="border border-stone-200 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-900 text-sm">
                        {m.sequenceLabel}: {m.title}
                      </span>
                      <span className="text-[11px] font-mono text-stone-500">
                        {m.lessons.length} lessons • {m.knowledgeCheck?.length || 0} module Qs
                      </span>
                    </div>
                    <p className="text-stone-600">{m.description}</p>
                    <ul className="space-y-1 pl-2 border-l-2 border-emerald-200">
                      {m.lessons.map((l) => (
                        <li key={l.lessonId} className="text-stone-800 font-medium">
                          {l.sequenceLabel}: {l.title} ({l.estimatedDurationMinutes}m • {l.knowledgeCheck.length} checks)
                        </li>
                      ))}
                    </ul>
                    {m.moduleAssignment && (
                      <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-950">
                        <strong>Assignment:</strong> {m.moduleAssignment.title}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CAPSTONE RUBRIC CONFIG MODAL */}
        {editingRubricCourse && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
              <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
                <div>
                  <span className="text-[11px] font-mono font-bold text-indigo-700 uppercase">
                    Configurable Capstone Rubric
                  </span>
                  <h3 className="font-black text-base text-stone-900">{editingRubricCourse.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingRubricCourse(null)}
                  className="p-1.5 text-stone-500 hover:text-stone-900 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5 overflow-y-auto space-y-3 text-xs">
                {draftRubricCriteria.map((crit, idx) => (
                  <div key={crit.id} className="p-3 border border-stone-200 rounded-xl space-y-2 bg-stone-50/50">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={crit.criterion}
                        onChange={(e) =>
                          setDraftRubricCriteria((prev) =>
                            prev.map((c, i) => (i === idx ? { ...c, criterion: e.target.value } : c))
                          )
                        }
                        className="flex-1 p-2 border border-stone-300 rounded-lg font-bold text-stone-900 bg-white"
                      />
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={crit.weight}
                        onChange={(e) =>
                          setDraftRubricCriteria((prev) =>
                            prev.map((c, i) => (i === idx ? { ...c, weight: Number(e.target.value) || 0 } : c))
                          )
                        }
                        className="w-20 p-2 border border-stone-300 rounded-lg font-mono font-bold text-right bg-white"
                      />
                      <span>%</span>
                    </div>
                    <input
                      type="text"
                      value={crit.description}
                      onChange={(e) =>
                        setDraftRubricCriteria((prev) =>
                          prev.map((c, i) => (i === idx ? { ...c, description: e.target.value } : c))
                        )
                      }
                      className="w-full p-2 border border-stone-300 rounded-lg text-stone-600 bg-white"
                    />
                  </div>
                ))}
                <div className="text-right font-bold text-stone-800">
                  Total Weight: {draftRubricCriteria.reduce((acc, c) => acc + c.weight, 0)}%
                </div>
              </div>
              <div className="p-4 border-t border-stone-200 bg-stone-50 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingRubricCourse(null)}
                  className="px-4 py-2 text-xs font-bold text-stone-600 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveCapstoneRubric}
                  disabled={isSavingAcademyConfig}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Save Rubric
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CAPSTONE REVIEW MODAL */}
        {reviewingSub && (() => {
          const subCourse = getCourseById(reviewingSub.courseId);
          const activeRubric =
            academyConfig.capstoneRubricOverrides?.[reviewingSub.courseId] ||
            subCourse?.capstoneProject.rubric ||
            [];

          return (
            <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
              <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
                <div className="p-5 flex items-center justify-between pb-3 border-b border-stone-100">
                  <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-emerald-600" />
                    <span>Review Capstone Submission</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setReviewingSub(null)}
                    className="text-stone-400 hover:text-stone-700 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-5 overflow-y-auto space-y-3 text-xs text-stone-700">
                  <div className="grid grid-cols-3 gap-2 bg-stone-50 p-3 rounded-xl">
                    <div>
                      <span className="text-[10px] uppercase text-stone-400 font-bold block">Participant</span>
                      <strong className="text-stone-900">{reviewingSub.participantName}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-stone-400 font-bold block">Platoon</span>
                      <strong className="text-stone-900">
                        {reviewingSub.platoon ? `Platoon ${reviewingSub.platoon}` : 'Post-Camp'}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-stone-400 font-bold block">Course</span>
                      <strong className="text-stone-900">{subCourse?.title || reviewingSub.courseId}</strong>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase text-stone-400 font-bold block">Project Title</span>
                    <p className="font-semibold text-stone-900 text-sm">{reviewingSub.projectTitle}</p>
                    {reviewingSub.businessName && (
                      <p className="text-xs text-stone-600 mt-0.5">
                        <strong>Business:</strong> {reviewingSub.businessName}{' '}
                        {reviewingSub.valueProposition ? `• ${reviewingSub.valueProposition}` : ''}
                      </p>
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] uppercase text-stone-400 font-bold block">Capstone Description</span>
                    <p className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-xs leading-relaxed whitespace-pre-line">
                      {reviewingSub.projectDescription}
                    </p>
                  </div>

                  {reviewingSub.deliverablesChecklist &&
                    Object.keys(reviewingSub.deliverablesChecklist).length > 0 && (
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                        <span className="text-[10px] uppercase text-stone-500 font-bold block">
                          Deliverables Checked (
                          {Object.values(reviewingSub.deliverablesChecklist).filter(Boolean).length}/
                          {Object.keys(reviewingSub.deliverablesChecklist).length})
                        </span>
                        <div className="grid sm:grid-cols-2 gap-1 text-[11px]">
                          {Object.entries(reviewingSub.deliverablesChecklist).map(([item, done]) => (
                            <div key={item} className={done ? 'text-emerald-800' : 'text-stone-400'}>
                              {done ? '✓' : '○'} {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Supporting Links & Files */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase text-stone-400 font-bold block">
                      Supporting Links & Evidence
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {reviewingSub.supportingLinks && reviewingSub.supportingLinks.length > 0 ? (
                        reviewingSub.supportingLinks.map((lnk, idx) => (
                          <a
                            key={idx}
                            href={lnk.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-indigo-600 hover:underline font-bold inline-flex items-center gap-1 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200"
                          >
                            {lnk.label || 'Link'} <ExternalLink className="w-3 h-3" />
                          </a>
                        ))
                      ) : (
                        (reviewingSub.artifactUrl || reviewingSub.submissionUrl) && (
                          <a
                            href={reviewingSub.artifactUrl || reviewingSub.submissionUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-indigo-600 hover:underline font-bold inline-flex items-center gap-1"
                          >
                            {reviewingSub.artifactUrl || reviewingSub.submissionUrl} <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )
                      )}
                    </div>
                    {reviewingSub.uploadedAttachments && reviewingSub.uploadedAttachments.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {reviewingSub.uploadedAttachments.map((att, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] bg-stone-100 border border-stone-200 px-2 py-1 rounded-lg"
                          >
                            📎 {att.name} ({Math.round(att.sizeBytes / 1024)} KB)
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Rubric Scoring */}
                  {activeRubric.length > 0 && (
                    <div className="pt-2 border-t border-stone-100 space-y-2">
                      <span className="block text-xs font-bold text-stone-900">
                        Rubric Evaluation (Adjust points per criterion):
                      </span>
                      <div className="space-y-1.5">
                        {activeRubric.map((r) => (
                          <div key={r.id} className="flex items-center justify-between gap-2 bg-stone-50 p-2 rounded-lg border border-stone-200">
                            <span className="text-[11px] font-medium text-stone-800">
                              {r.criterion} (Max {r.weight})
                            </span>
                            <input
                              type="number"
                              min={0}
                              max={r.weight}
                              value={reviewRubricScores[r.id] ?? 0}
                              onChange={(e) => {
                                const val = Math.min(r.weight, Math.max(0, Number(e.target.value) || 0));
                                const nextMap = { ...reviewRubricScores, [r.id]: val };
                                setReviewRubricScores(nextMap);
                                const sum = activeRubric.reduce(
                                  (acc, crit) => acc + (nextMap[crit.id] ?? 0),
                                  0
                                );
                                setReviewScore(Math.min(100, sum));
                              }}
                              className="w-16 p-1 text-right border border-stone-300 rounded font-bold bg-white"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-2 border-t border-stone-100 space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-900 mb-1">
                        Total Score (0–100)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={reviewScore}
                        onChange={(e) => setReviewScore(Number(e.target.value))}
                        className="w-24 text-xs p-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-900 mb-1">
                        Coordinator Feedback &amp; Recommendations
                      </label>
                      <textarea
                        rows={3}
                        value={reviewFeedback}
                        onChange={(e) => setReviewFeedback(e.target.value)}
                        placeholder="Add specific comments on submission quality, strengths, and areas to polish..."
                        className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 flex flex-wrap items-center justify-between gap-2 border-t border-stone-100 bg-stone-50">
                  <button
                    type="button"
                    onClick={() => setReviewingSub(null)}
                    disabled={isSubmittingReview}
                    className="px-3 py-2 text-xs font-semibold text-stone-600 hover:text-stone-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleReviewSubmission('under_review')}
                      disabled={isSubmittingReview}
                      className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition disabled:opacity-50 cursor-pointer"
                    >
                      Mark Under Review
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReviewSubmission('revision_requested')}
                      disabled={isSubmittingReview}
                      className="px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition disabled:opacity-50 cursor-pointer"
                    >
                      Request Revision
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReviewSubmission('rejected')}
                      disabled={isSubmittingReview}
                      className="px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition disabled:opacity-50 cursor-pointer"
                    >
                      Reject
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReviewSubmission('approved')}
                      disabled={isSubmittingReview}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmittingReview ? 'Saving...' : 'Approve'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-[11px] text-stone-500">
          <span>Protected by Firestore Security Rules (`isAdmin()` check)</span>
          <button
            onClick={onClose}
            className="text-stone-700 hover:text-stone-900 font-bold cursor-pointer"
          >
            Close Portal
          </button>
        </div>
      </div>

      {/* RESULT INVALIDATION REASON MODAL */}
      {invalidationModalOpen && targetResultToInvalidate && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center gap-2.5 text-rose-700">
              <Ban className="w-5 h-5 shrink-0" />
              <h3 className="font-bold text-base text-stone-900">
                Invalidate Quiz Result
              </h3>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              You are about to disqualify result <strong>{targetResultToInvalidate.id}</strong> (Participant: {targetResultToInvalidate.participantId}, Platoon: {targetResultToInvalidate.platoon || 'Unassigned'}, Score: {targetResultToInvalidate.score}/10).
              The record will not be deleted; an audit log entry will be preserved.
            </p>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Reason for Invalidation <span className="text-rose-600">*</span>
              </label>
              <textarea
                value={invalidationReasonInput}
                onChange={(e) => setInvalidationReasonInput(e.target.value)}
                placeholder="e.g. Duplicate attempt verified during camp review, unverified attendee, etc."
                rows={3}
                className="w-full text-xs p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setInvalidationModalOpen(false);
                  setTargetResultToInvalidate(null);
                  setInvalidationReasonInput('');
                }}
                disabled={isUpdatingResultStatus}
                className="px-3.5 py-2 text-xs font-semibold text-stone-600 hover:text-stone-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmInvalidation}
                disabled={isUpdatingResultStatus || !invalidationReasonInput.trim()}
                className="bg-rose-700 hover:bg-rose-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isUpdatingResultStatus ? (
                  <span>Updating...</span>
                ) : (
                  <>
                    <Ban className="w-3.5 h-3.5" />
                    <span>Confirm Invalidation</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* CDS GROUP CREATE/EDIT MODAL */}
      {isCDSModalOpen && editingCDS && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-stone-200">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-stone-900">
                {editingCDS.id ? 'Edit CDS Group' : 'Create New CDS Group'}
              </h3>
              <button
                onClick={() => {
                  setIsCDSModalOpen(false);
                  setEditingCDS(null);
                }}
                className="p-1 text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCDS} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  CDS Group Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingCDS.name || ''}
                  onChange={(e) => setEditingCDS({ ...editingCDS, name: e.target.value })}
                  placeholder="e.g. ICT & Digital Skills CDS"
                  className="w-full text-xs p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    LGA (Optional)
                  </label>
                  <input
                    type="text"
                    value={editingCDS.lga || ''}
                    onChange={(e) => setEditingCDS({ ...editingCDS, lga: e.target.value })}
                    placeholder="e.g. Ikeja"
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    State (Optional)
                  </label>
                  <input
                    type="text"
                    value={editingCDS.state || ''}
                    onChange={(e) => setEditingCDS({ ...editingCDS, state: e.target.value })}
                    placeholder="e.g. Lagos"
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Meeting Schedule (Optional)
                </label>
                <input
                  type="text"
                  value={editingCDS.meetingDay || ''}
                  onChange={(e) => setEditingCDS({ ...editingCDS, meetingDay: e.target.value })}
                  placeholder="e.g. Thursdays 9:00 AM"
                  className="w-full text-xs p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Description
                </label>
                <textarea
                  value={editingCDS.description || ''}
                  onChange={(e) => setEditingCDS({ ...editingCDS, description: e.target.value })}
                  placeholder="Briefly describe the focus area..."
                  rows={2}
                  className="w-full text-xs p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  id="cds-active"
                  checked={editingCDS.active}
                  onChange={(e) => setEditingCDS({ ...editingCDS, active: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-stone-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="cds-active" className="text-xs font-medium text-stone-700">
                  Active for registration selection
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCDSModalOpen(false);
                    setEditingCDS(null);
                  }}
                  className="px-3.5 py-2 text-xs font-semibold text-stone-600 hover:text-stone-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingCDS || !editingCDS.name}
                  className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-5 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-transform active:scale-95 shadow-sm"
                >
                  {isSavingCDS ? (
                    <span>Saving...</span>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>{editingCDS.id ? 'Update Group' : 'Create Group'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DIRECT PARTICIPANT MESSAGE MODAL */}
      {selectedParticipantForMessage && (
        <DirectMessageModal
          participant={selectedParticipantForMessage}
          adminEmail={currentUser?.email || 'jomaschools@gmail.com'}
          onClose={() => setSelectedParticipantForMessage(null)}
        />
      )}
    </div>
  );
};
