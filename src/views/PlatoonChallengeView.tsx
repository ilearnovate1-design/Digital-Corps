import React, { useState, useRef } from 'react';
import { AI_CHALLENGE_DETAILS, EVENT_INFO } from '../data/staticContent';
import { submitChallengeSolution } from '../services/challengeService';
import {
  Target,
  Award,
  Sparkles,
  ClipboardCopy,
  Check,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Calendar,
  Lock
} from 'lucide-react';

interface PlatoonChallengeViewProps {
  userPlatoon?: number;
  userName?: string;
  userStateCode?: string;
}

export const PlatoonChallengeView: React.FC<PlatoonChallengeViewProps> = ({
  userPlatoon,
  userName,
  userStateCode
}) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [isSubmissionsOpen, setIsSubmissionsOpen] = useState(EVENT_INFO.isSubmissionsOpen);

  // Form State
  const [participantName, setParticipantName] = useState(userName || '');
  const [participantRef, setParticipantRef] = useState(userStateCode || '');
  const [selectedPlatoon, setSelectedPlatoon] = useState<number>(userPlatoon || 1);
  const [solutionTitle, setSolutionTitle] = useState('');
  const [solutionSummary, setSolutionSummary] = useState('');
  const [actionPlan30Days, setActionPlan30Days] = useState('');

  // Stable ID for safe retry without duplicate documents
  const stableSubIdRef = useRef<string>(
    `sub_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(AI_CHALLENGE_DETAILS.examplePrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSubmissionsOpen || isSubmitting) return;

    if (!participantName.trim() || participantName.trim().length < 2) {
      setSubmitError('Please enter your name or team lead name');
      return;
    }
    if (!solutionTitle.trim() || solutionTitle.trim().length < 3) {
      setSubmitError('Solution title must be at least 3 characters');
      return;
    }
    if (!solutionSummary.trim() || solutionSummary.trim().length < 10) {
      setSubmitError('Solution summary must be at least 10 characters');
      return;
    }

    if (retryCount >= MAX_RETRIES) {
      setSubmitError(
        'Maximum retry attempts reached (3/3). Please check your internet connection before retrying or submit directly at the Camp Secretariat.'
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // 1 single Firestore write, 0 reads (no read-back to display success)
      await submitChallengeSolution(
        {
          participantName: participantName.trim(),
          participantReference: participantRef.trim() || undefined,
          platoon: selectedPlatoon > 0 ? selectedPlatoon : undefined,
          solutionTitle: solutionTitle.trim(),
          solutionSummary: solutionSummary.trim(),
          actionPlan30Days: actionPlan30Days.trim() || undefined,
        },
        stableSubIdRef.current
      );

      setSubmitSuccess(true);
      setIsSubmitting(false);
    } catch (err: any) {
      console.warn('Challenge submission network error code:', err?.code || 'NETWORK_ERROR');
      setRetryCount((prev) => prev + 1);
      setSubmitError(
        `Submission failed due to network timeout (Attempt ${retryCount + 1}/${MAX_RETRIES}). Your content is safely preserved. Tap below to retry.`
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Challenge Hero Banner */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 text-amber-900 rounded-xl">
              <Target className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <h2 className="text-xl font-black text-stone-900 tracking-tight">
                AI Platoon Challenge
              </h2>
              <p className="text-xs text-stone-600">
                {AI_CHALLENGE_DETAILS.theme}
              </p>
            </div>
          </div>

          {/* Submission Status Badge */}
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 ${
                isSubmissionsOpen
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : 'bg-stone-200 text-stone-700'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{isSubmissionsOpen ? 'Submissions Open' : 'Submissions Closed'}</span>
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-amber-50/60 p-4 rounded-xl border border-amber-200 mb-4">
          {AI_CHALLENGE_DETAILS.overview}
        </p>

        {/* Advisory on CDS Reporting */}
        <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl mb-4 text-xs text-stone-600 leading-relaxed">
          <p className="font-bold text-stone-800 text-[11px] uppercase tracking-wide mb-0.5">
            Independent Community Project Notice
          </p>
          <p>
            This challenge is an independent digital skills exercise designed to help corps members build grassroots problem-solving solutions. Project ideas or records submitted here <strong>do not replace official NYSC CDS clearance, project approvals, or monthly reporting</strong>. Official CDS projects must still follow standard NYSC inspectorate guidelines.
          </p>
        </div>

        <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-100">
          <span>Deadline: <strong>{EVENT_INFO.submissionDeadline}</strong></span>
          <span className="italic text-emerald-800">No public leaderboard loaded (0 read overhead)</span>
        </div>
      </div>

      {/* Rules & 30-Day Requirement Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Rules Card */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-3">
          <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-700" />
            <span>Challenge Rules</span>
          </h3>
          <ul className="space-y-2 text-xs text-stone-600">
            {AI_CHALLENGE_DETAILS.rules.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 30-Day Action Plan Requirement Card */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-3">
          <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-700" />
            <span>30-Day Action Plan Requirement</span>
          </h3>
          <p className="text-xs text-stone-700 leading-relaxed">
            {AI_CHALLENGE_DETAILS.actionPlanRequirement}
          </p>
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] space-y-1 text-stone-600">
            <p><strong>Week 1:</strong> Community stakeholder engagement (LGA/traditional leaders).</p>
            <p><strong>Week 2:</strong> Free mobile tool setup & WhatsApp pilot testing.</p>
            <p><strong>Week 3:</strong> 50-user pilot rollout and feedback collection.</p>
            <p><strong>Week 4:</strong> Impact review & handover to NYSC CDS group.</p>
          </div>
        </div>
      </div>

      {/* Example Prompt Box */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-700" />
            <h3 className="font-bold text-stone-900 text-sm">
              Example Brainstorming Prompt
            </h3>
          </div>
          <button
            onClick={handleCopyPrompt}
            className="text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white flex items-center gap-1.5 cursor-pointer"
          >
            {copiedPrompt ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <ClipboardCopy className="w-3.5 h-3.5" />
                <span>Copy Example Prompt</span>
              </>
            )}
          </button>
        </div>
        <div className="bg-stone-900 text-stone-100 p-4 rounded-xl text-xs font-mono whitespace-pre-wrap leading-relaxed select-all">
          {AI_CHALLENGE_DETAILS.examplePrompt}
        </div>
      </div>

      {/* Judging Rubric */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-3">
        <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
          <Award className="w-4 h-4 text-stone-700" />
          <span>Judging Rubric</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {AI_CHALLENGE_DETAILS.rubric.map((item, idx) => (
            <div key={idx} className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
              <div className="flex items-center justify-between font-bold text-stone-900">
                <span>{item.criteria}</span>
                <span className="text-emerald-700">{item.weight}</span>
              </div>
              <p className="text-stone-600 text-[11px] leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Optional Submission Form */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div>
            <h3 className="font-bold text-stone-900 text-base">
              Submit Your Proposal (Optional)
            </h3>
            <p className="text-xs text-stone-500">
              {isSubmissionsOpen
                ? 'Submit your team proposal before 17:00 WAT today.'
                : 'Submissions are currently closed for this session.'}
            </p>
          </div>
          {!isSubmissionsOpen && (
            <span className="bg-stone-200 text-stone-700 text-xs px-2.5 py-1 rounded-md font-bold flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" /> Closed
            </span>
          )}
        </div>

        {submitSuccess ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Challenge Proposal Successfully Recorded!</span>
            </div>
            <p className="leading-relaxed">
              Your concept has been submitted successfully for the official panel review. Good luck during the platoon presentation rounds!
            </p>
          </div>
        ) : !isSubmissionsOpen ? (
          <div className="p-4 bg-stone-100 border border-stone-200 rounded-xl text-xs text-stone-600 space-y-1">
            <p className="font-bold text-stone-800">Submissions Closed</p>
            <p>
              The submission portal for this orientation session has concluded. Platoon presentations will take place in the main camp hall.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {submitError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-900 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-stone-700 uppercase tracking-wide mb-1">
                  Team Lead / Submitter Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={participantName}
                  onChange={(e) => setParticipantName(e.target.value)}
                  placeholder="e.g. Chinedu Okafor"
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-stone-50 focus:bg-white focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase tracking-wide mb-1">
                  NYSC State Code / Reference (Optional)
                </label>
                <input
                  type="text"
                  value={participantRef}
                  onChange={(e) => setParticipantRef(e.target.value.toUpperCase())}
                  placeholder="e.g. LA/26A/1234"
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-stone-50 font-mono uppercase focus:bg-white focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-stone-700 uppercase tracking-wide mb-1">
                  Camp Platoon (Optional)
                </label>
                <select
                  value={selectedPlatoon}
                  onChange={(e) => setSelectedPlatoon(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-stone-50 focus:bg-white focus:outline-none focus:border-emerald-600"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>Platoon {num}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase tracking-wide mb-1">
                  Solution Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  maxLength={120}
                  value={solutionTitle}
                  onChange={(e) => setSolutionTitle(e.target.value)}
                  placeholder="e.g. AgriSMS: Voice Crop Advice for Farmers"
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-stone-50 focus:bg-white focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block font-bold text-stone-700 uppercase tracking-wide">
                  Solution Description (Practical AI Impact) <span className="text-red-500">*</span>
                </label>
                <span className="text-[10px] text-stone-400 font-mono">{solutionSummary.length}/1200</span>
              </div>
              <textarea
                rows={4}
                maxLength={1200}
                value={solutionSummary}
                onChange={(e) => setSolutionSummary(e.target.value)}
                placeholder="Explain the local community problem, how your team uses AI or mobile tools, and how it improves lives under N50,000 budget..."
                className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-stone-50 focus:bg-white focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block font-bold text-stone-700 uppercase tracking-wide">
                  30-Day Action Plan Roadmap (Optional)
                </label>
                <span className="text-[10px] text-stone-400 font-mono">{actionPlan30Days.length}/1000</span>
              </div>
              <textarea
                rows={3}
                maxLength={1000}
                value={actionPlan30Days}
                onChange={(e) => setActionPlan30Days(e.target.value)}
                placeholder="Outline Week 1 engagement, Week 2 tool setup, Week 3 community testing, and Week 4 review..."
                className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-stone-50 focus:bg-white focus:outline-none focus:border-emerald-600"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#046A38] hover:bg-[#03522b] text-white font-bold py-3 px-4 rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 transition-all active:scale-98"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 text-amber-300 animate-spin" />
                  <span>Submitting Challenge Solution...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>Submit Challenge Solution</span>
                </>
              )}
            </button>

            <p className="text-center text-[11px] text-stone-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Official submission. Your proposal is securely routed to the evaluation coordinators.</span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
