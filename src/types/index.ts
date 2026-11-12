export interface ParticipantRegistration {
  firstName: string;
  surname: string;
  contactMethod?: 'email' | 'phone' | 'both';
  phone: string; // Compulsory: Phone/WhatsApp number
  email: string; // Compulsory: Email address
  stateCode: string; // Compulsory: NYSC State Code e.g. LA/26A/1234
  engagementType?: 'on_camp' | 'post_camp'; // On Camp or Post Camp
  platoon: number; // 1 to 10 for On Camp, 0 for Post Camp
  deploymentState: string; // Compulsory: State of deployment e.g. Lagos, Kano
  callUpNumber?: string; // Optional NYSC call-up number
  primarySkillTrack?: string; // Optional digital interest track
  skillLevel?: 'beginner' | 'intermediate' | 'advanced' | 'not_specified'; // Optional
  cdsGroupId?: string; // Post-Camp CDS group ID
  cdsGroupName?: string; // Post-Camp CDS group display name
  communityOptIn: boolean; // Optional separate checkbox - starts unchecked (false)
  marketingConsent: boolean; // Optional separate checkbox - starts unchecked (false)
  consentTimestamp: string;
  campaignId: string;
  registrationId: string;
  createdAt?: any;
}

export interface CDSGroup {
  id: string; // e.g. cds_ict, cds_health
  name: string; // e.g. "ICT & Digital Skills CDS"
  description?: string;
  lga?: string; // e.g. "Ikeja LGA"
  state?: string; // e.g. "Lagos"
  meetingDay?: string; // e.g. "Thursdays 9:00 AM"
  active: boolean;
  createdAt: string;
  createdBy?: string;
}

export interface CDSGroupRankingItem {
  cdsGroupId: string;
  cdsGroupName: string;
  registeredCount: number;
  quizParticipants: number;
  qualifyingParticipants: number;
  qualificationRate: number; // percentage (0 to 100)
  averageScore: number;
  academyLearnersCount: number;
  completedAcademyCoursesCount: number;
}

export interface CDSMemberRankingItem {
  participantId: string;
  memberName: string;
  stateCode: string;
  cdsGroupId: string;
  cdsGroupName: string;
  categoryId: string;
  categoryName: string;
  score: number;
  totalQuestions: number;
  qualifying: boolean;
  timeTakenSeconds: number | null;
  timeTakenDisplay: string;
  attemptsCount: number;
  submittedAt: string;
  status: 'unverified' | 'verified' | 'invalidated';
  rank: number;
  isTie: boolean;
  displayRank: string;
}

export interface CDSPerformanceDashboardData {
  campaignId: string;
  quizRoundId: string;
  loadedAt: string;
  groupRankings: CDSGroupRankingItem[];
  totalCDSMembers: number;
  cdsParticipants: ParticipantRegistration[];
  cdsQuizResults: QuizResultRecord[];
}

export interface ChallengeSubmission {
  id?: string;
  participantReference?: string;
  participantName: string;
  platoon?: number;
  solutionTitle: string;
  solutionSummary: string;
  actionPlan30Days?: string; // 30-day action plan requirement
  campaignId: string;
  createdAt?: any;
}

export interface ToolkitResource {
  id: string;
  title: string;
  category: 'prompts' | 'career' | 'business' | 'security' | 'plan';
  shortDesc: string;
  copyableContent: string;
  actionChecklist?: string[];
}

export type QuizDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface QuizCategory {
  id: string;
  name: string;
  shortDesc: string;
  description: string;
  iconName: string;
  instructions: string;
  active: boolean;
  questionCount: number;
  durationMinutes: number;
  durationSeconds: number;
  qualificationThreshold: number; // 6
  associatedTrackId: string;
  themeColor: string;
}

export interface BankQuestion {
  questionId: string;
  categoryId: string;
  questionText: string;
  options: string[];
  correctAnswer: number; // 0-3
  explanation: string;
  difficulty: QuizDifficulty;
  active: boolean;
}

// Client-facing question during an active quiz (NO correctAnswer, NO explanation)
export interface ClientQuizQuestion {
  questionId: string;
  categoryId: string;
  questionText: string;
  options: string[];
  difficulty: QuizDifficulty;
}

export interface QuizAttemptSession {
  attemptId: string;
  participantId: string;
  categoryId: string;
  startedAt: string;
  expiresAt: string;
  durationSeconds: number;
  questionIds: string[];
  shuffledKeyMap?: Record<string, number[]>;
  submitted?: boolean;
}

export interface QuizReviewItem {
  questionId: string;
  questionText: string;
  options: string[];
  selectedAnswer: number | null;
  correctAnswer: number;
  isCorrect: boolean;
  explanation: string;
  difficulty: QuizDifficulty;
}

export type PerformanceBand = 'Keep Practising' | 'Getting There' | 'Qualified' | 'Excellent' | 'Outstanding';

export interface QuizAttemptResult {
  attemptId: string;
  participantId: string;
  categoryId: string;
  categoryName: string;
  score: number;
  total: number;
  percentage: number;
  qualifying: boolean;
  performanceBand: PerformanceBand;
  performanceFeedback: string;
  timeTakenSeconds: number;
  timeTakenDisplay: string;
  platoon: number;
  review: QuizReviewItem[];
  recommendedTrackId: string;
  recommendedTrackTitle: string;
  submittedAt: string;
}

export interface QuizQuestion {
  id: string;
  category: 'ai_literacy' | 'responsible_ai' | 'digital_safety' | 'productivity' | 'digital_careers' | 'online_scams';
  categoryLabel: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizSubmissionRecord {
  score: number;
  total: number;
  timestamp: string;
}

export interface QuizResultRecord {
  id?: string;
  participantId: string;
  quizRoundId: string;
  campaignId: string;
  categoryId?: string;
  categoryName?: string;
  score: number;
  totalQuestions: number;
  qualifying: boolean;
  platoon: number; // 0 for unassigned, 1 to 10
  submittedAt: string;
  status: 'unverified' | 'verified' | 'invalidated';
  invalidationReason?: string;
  attemptId?: string;
  timeTakenSeconds?: number;
}

export interface PlatoonRankingItem {
  platoon: number; // 0 for unassigned
  label: string;
  registeredParticipants: number;
  quizParticipants: number;
  qualifyingParticipants: number;
  qualificationRate: number; // percentage (0 to 100)
  averageScore: number;
  rank: number;
  isTie: boolean;
  displayRank: string;
}

export interface PlatoonReportSummary {
  campaignId: string;
  quizRoundId: string;
  loadedAt: string;
  platoonRankings: PlatoonRankingItem[];
  highestRankedPlatoons: PlatoonRankingItem[];
  totalRegistered: number;
  totalQuizParticipants: number;
  totalQualifying: number;
  unassignedResultsCount: number;
  unverifiedResultsCount: number;
  invalidatedResultsCount: number;
  individualResults: QuizResultRecord[];
}

export type NavigationTab = 
  | 'welcome'
  | 'quiz'
  | 'academy'
  | 'register'
  | 'challenge'
  | 'toolkit'
  | 'community'
  | 'success';

// ============================================================================
// LEARNING ACADEMY (LMS) DATA TYPES
// ============================================================================

export interface LessonKnowledgeCheckQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctAnswer: number; // 0-3
  explanation: string;
}

export interface CourseLesson {
  lessonId: string;
  moduleId: string;
  courseId: string;
  title: string;
  sequence: number; // e.g. 1, 2, 3
  sequenceLabel: string; // e.g. "Lesson 1.1"
  estimatedDurationMinutes: number;
  learningObjectiveIds: string[];
  introduction: string;
  lessonContent: string[]; // Rich paragraphs of step-by-step teaching material
  stepByStepInstructions?: string[]; // Actionable beginner-friendly numbered steps
  nigerianContextExamples: string[]; // Local practical examples (PPA, SMEs, NYSC, market vendors)
  toolsAndResources?: string[]; // Relevant tools, apps, and platforms
  practicalDemonstration: string; // Hands-on demo / walk-through
  handsOnExercise: {
    title: string;
    task: string;
    steps: string[];
    deliverable: string;
  };
  keyTakeaways: string[];
  knowledgeCheck: LessonKnowledgeCheckQuestion[];
  downloadableResources?: {
    title: string;
    description: string;
    type: 'template' | 'cheatsheet' | 'checklist' | 'guide';
    url?: string;
  }[];
  furtherLearningResources?: {
    title: string;
    description: string;
    url?: string;
  }[];
}

export interface ModuleAssignment {
  title: string;
  description: string;
  deliverables: string[];
  submissionNote?: string;
}

export interface CourseModule {
  moduleId: string;
  courseId: string;
  title: string;
  sequence: number; // 1, 2, 3, 4, 5, 6
  sequenceLabel: string; // "Module 1"
  description: string;
  learningObjectiveIds: string[];
  lessons: CourseLesson[];
  moduleAssignment?: ModuleAssignment;
  knowledgeCheck?: LessonKnowledgeCheckQuestion[]; // 5-question module checkpoint
}

export interface CourseFinalAssessmentQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  relatedLessonId?: string;
  moduleId?: string;
}

export interface CapstoneRubricCriterion {
  id: string;
  criterion: string;
  description: string;
  weight: number; // percentage, total 100
}

export interface CourseCapstoneProject {
  title: string;
  overview: string;
  deliverables?: string[];
  instructions: string[];
  assessmentCriteria: string[];
  rubric?: CapstoneRubricCriterion[];
  submissionGuidelines: string;
}

export interface AcademyCourse {
  courseId: string;
  categoryId: string; // Matches quiz category id
  title: string;
  subtitle?: string;
  description: string;
  difficulty?: 'Beginner' | 'Beginner to Intermediate' | 'Intermediate' | 'Advanced';
  targetAudience: string;
  entryRequirements: string;
  requirements?: string[];
  learningObjectives: { id: string; code: string; title: string; description: string }[];
  expectedDuration: string; // e.g. "4 Weeks (Self-Paced)"
  modules: CourseModule[];
  capstoneProject: CourseCapstoneProject;
  finalAssessment: CourseFinalAssessmentQuestion[];
  completionCriteria: {
    requiredLessonsRatio: number; // e.g. 1.0 (100% of lessons marked complete)
    requiredModuleChecksCount?: number;
    requiredFinalAssessmentPassScore: number; // e.g. 70 or 80 (%)
    requireCapstoneSubmission: boolean;
    requireCapstoneApproval?: boolean;
  };
  active: boolean;
  version: string;
  themeColor: string; // 'emerald' | 'blue' | 'purple' | 'amber' | 'teal' | 'rose'
  iconName: string;
  youtubeUrl?: string; // Link to course introduction or full playlist
  youtubeChannelId?: string; // Channel ID for subscription requirement
}

export interface AcademyGlobalConfig {
  publishedOverrides: Record<string, boolean>; // courseId -> published
  passMarkOverrides: Record<string, number>; // courseId -> pass percentage (e.g. 70)
  capstoneRubricOverrides?: Record<string, CapstoneRubricCriterion[]>;
  updatedAt?: string;
  updatedBy?: string;
}

export interface ParticipantLessonProgress {
  lessonId: string;
  moduleId: string;
  courseId: string;
  completed: boolean;
  completedAt?: string;
  knowledgeCheckScore?: number;
  knowledgeCheckPassed?: boolean;
}

export interface RegisteredParticipant {
  id: string;
  name: string;
  email: string;
  phone: string;
  platoon: string;
  stateCode?: string;
  callUpNumber?: string;
  registeredAt?: string;
}

export interface CapstoneSupportingLink {
  label: string;
  url: string;
}

export interface CapstoneUploadedAttachment {
  name: string;
  sizeBytes: number;
  mimeType: string;
  previewDataUrl?: string;
}

export interface CourseProjectSubmission {
  id?: string;
  submissionId: string;
  participantId: string;
  participantName: string;
  stateCode?: string;
  platoon?: number;
  participantPlatoon?: string;
  participantCallUpNumber?: string;
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
  submissionUrl?: string;
  artifactUrl?: string;
  submissionStatus: 'draft' | 'submitted' | 'under_review' | 'approved' | 'revision_requested' | 'resubmission_requested' | 'rejected';
  status?: string;
  score?: number;
  rubricScores?: Record<string, number>;
  reviewerFeedback?: string;
  coordinatorFeedback?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  draftSavedAt?: string;
  submittedAt: string;
  updatedAt?: string;
}

export interface ModuleCheckDetail {
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
  completedAt: string;
}

export interface ParticipantCourseProgress {
  participantId: string;
  participantName?: string;
  platoon?: number;
  stateCode?: string;
  courseId: string;
  enrolledAt: string;
  lastAccessedAt: string;
  lastAccessedLessonId?: string;
  completedLessonIds: string[];
  completedModuleIds: string[];
  moduleCheckScores: Record<string, number>; // moduleId -> best score (%)
  moduleCheckDetails?: Record<string, ModuleCheckDetail>;
  finalAssessmentScore?: number;
  finalAssessmentBestScore?: number;
  finalAssessmentAttempts?: number;
  finalAssessmentPassed?: boolean;
  finalAssessmentVerificationToken?: string;
  finalAssessmentCompletedAt?: string;
  capstoneSubmissionId?: string;
  capstoneCompleted?: boolean;
  certificateEligible?: boolean;
  completedAt?: string;
  courseStatus: 'not_started' | 'in_progress' | 'completed';
  progressPercentage: number;
}

export interface QuestionObjectiveMapping {
  questionId: string;
  categoryId: string;
  learningObjectiveId: string;
  learningObjectiveCode: string;
  courseId: string;
  moduleId: string;
  lessonId: string;
  lessonTitle: string;
  difficulty: QuizDifficulty;
  questionTopic: string;
  recommendedTrackFocus?: 'foundation_business_model' | 'marketing_growth_execution';
  secondaryCourseId?: string;
  secondaryModuleId?: string;
  secondaryLessonId?: string;
  secondaryLessonTitle?: string;
}

export interface QuizQuestionGapRecommendation {
  suggestedId: string;
  categoryId: string;
  targetCourseId: string;
  targetModuleId: string;
  targetLessonId: string;
  topicGap: string;
  difficulty: QuizDifficulty;
  suggestedQuestionText: string;
  suggestedOptions: string[];
  correctAnswer: number;
  explanation: string;
}

