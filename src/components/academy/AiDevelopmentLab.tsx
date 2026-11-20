import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  ShieldAlert,
  Copy,
  Check,
  CheckCircle2,
  ClipboardCheck,
  AlertTriangle,
  Terminal,
  Cpu
} from 'lucide-react';
import {
  AI_LAB_FUNDAMENTALS_SECTIONS,
  AI_DEVELOPMENT_LAB_CHALLENGES
} from '../../data/academy/webdev/webDevPlacement';
import { AiLabChallenge } from '../../types';

interface AiDevelopmentLabProps {
  trackLevel: 'intermediate' | 'advanced';
  completedLabIds?: string[];
  onMarkLabCompleted?: (labId: string) => void;
  activeLessonChallenge?: AiLabChallenge;
}

const SECRET_PII_PATTERNS: Array<{ label: string; regex: RegExp }> = [
  { label: 'Google/Firebase API Key (AIza...)', regex: /AIza[0-9A-Za-z\-_]{10,}/ },
  { label: 'Secret API Key (sk-... / ghp_... / xoxb-...)', regex: /\b(sk-[A-Za-z0-9]{10,}|ghp_[A-Za-z0-9]{10,}|xoxb-[0-9A-Za-z\-]{10,})/ },
  { label: 'Private Key PEM Block', regex: /BEGIN [A-Z ]*PRIVATE KEY/i },
  { label: 'Credential/Password Assignment', regex: /(password|secret|api_key|service_account)\s*[:=]\s*["'][^"'\s]{4,}/i }
];

export const AiDevelopmentLab: React.FC<AiDevelopmentLabProps> = ({
  trackLevel,
  completedLabIds = [],
  onMarkLabCompleted,
  activeLessonChallenge
}) => {
  const [activeTab, setActiveTab] = useState<'A' | 'B' | 'C' | 'D'>(
    activeLessonChallenge ? 'D' : trackLevel === 'advanced' ? 'C' : 'A'
  );
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [workspaceText, setWorkspaceText] = useState<string>(
    activeLessonChallenge?.samplePrompt || ''
  );
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>(
    activeLessonChallenge?.id ||
      AI_DEVELOPMENT_LAB_CHALLENGES.find((c) => c.trackLevel === trackLevel)?.id ||
      AI_DEVELOPMENT_LAB_CHALLENGES[0].id
  );

  const allChallenges = useMemo(() => {
    const base = [...AI_DEVELOPMENT_LAB_CHALLENGES];
    if (activeLessonChallenge && !base.some((c) => c.id === activeLessonChallenge.id)) {
      base.unshift(activeLessonChallenge);
    }
    return base;
  }, [activeLessonChallenge]);

  const currentChallenge = useMemo(
    () => allChallenges.find((c) => c.id === selectedChallengeId) || allChallenges[0],
    [allChallenges, selectedChallengeId]
  );

  const detectedSecrets = useMemo(() => {
    if (!workspaceText.trim()) return [];
    return SECRET_PII_PATTERNS.filter((p) => p.regex.test(workspaceText)).map((p) => p.label);
  }, [workspaceText]);

  const copyText = (key: string, text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2000);
      });
    }
  };

  const activeSection = AI_LAB_FUNDAMENTALS_SECTIONS.find((s) => s.id === activeTab);

  return (
    <div className="rounded-2xl border border-indigo-200 bg-white shadow-sm overflow-hidden">
      {/* Header + Persistent Guardrail Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-200 border border-indigo-400/30">
              <Cpu className="w-3.5 h-3.5" />
              <span>AI Development Lab • {trackLevel === 'advanced' ? 'Advanced Full-Stack' : 'Intermediate Web Dev'}</span>
            </span>
            <h3 className="text-lg font-extrabold text-white">
              Structured AI-Assisted Engineering Workspace
            </h3>
          </div>
          <span className="text-xs font-mono bg-white/10 border border-white/15 px-3 py-1 rounded-xl shrink-0">
            Completed Labs: {completedLabIds.length}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-400/40 text-amber-100 text-xs flex items-start gap-2.5 leading-relaxed">
          <ShieldAlert className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-200">Strict Security &amp; Safety Rule:</strong> Never paste real passwords, <code>.env</code> API keys, Firebase service account keys, or customer PII into external AI tools. Inspect, understand, and test all generated code—and require explicit human approval before any AI tool sends emails, updates payments, or mutates records.
          </div>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="px-4 pt-3 border-b border-slate-200 bg-slate-50 flex items-center gap-1.5 overflow-x-auto">
        {(['A', 'B', 'C', 'D'] as const).map((tab) => {
          const labels: Record<'A' | 'B' | 'C' | 'D', string> = {
            A: 'Section A: Prompting & Specs',
            B: 'Section B: App Building',
            C: 'Section C: Advanced Engineering',
            D: 'Section D: Coding Challenges'
          };
          const active = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-2 text-xs font-bold rounded-t-xl border-b-2 whitespace-nowrap cursor-pointer transition ${
                active
                  ? 'bg-white text-indigo-700 border-indigo-600'
                  : 'text-slate-600 border-transparent hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {labels[tab]}
            </button>
          );
        })}
      </div>

      {/* Tab Body */}
      <div className="p-5">
        {activeTab !== 'D' && activeSection && (
          <div className="space-y-5">
            <div>
              <span className="text-[11px] font-mono font-bold text-indigo-600 uppercase">
                {activeSection.code}
              </span>
              <h4 className="text-base font-bold text-slate-900">{activeSection.title}</h4>
              <p className="text-xs text-slate-600 mt-0.5">{activeSection.subtitle}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-900 block">
                Core Engineering Principles
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700 list-disc pl-5">
                {activeSection.keyPrinciples.map((p, idx) => (
                  <li key={idx} className="leading-relaxed">{p}</li>
                ))}
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {activeSection.promptTemplates.map((tpl, idx) => {
                const copyId = `${activeSection.id}_${idx}`;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 bg-white space-y-2.5 flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <h5 className="text-xs font-bold text-slate-900">{tpl.title}</h5>
                        <button
                          type="button"
                          onClick={() => copyText(copyId, tpl.template)}
                          className="text-[11px] font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200 inline-flex items-center gap-1 whitespace-nowrap cursor-pointer"
                        >
                          {copiedKey === copyId ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Prompt</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500">{tpl.goal}</p>
                      <pre className="p-3 rounded-lg bg-slate-900 text-emerald-200 text-[11px] font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
                        {tpl.template}
                      </pre>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{activeSection.securityNotice}</span>
            </div>
          </div>
        )}

        {activeTab === 'D' && currentChallenge && (
          <div className="space-y-5">
            {/* Challenge Switcher */}
            <div className="flex flex-wrap items-center gap-2">
              {allChallenges.map((ch) => {
                const isSelected = ch.id === currentChallenge.id;
                const done = completedLabIds.includes(ch.id);
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => {
                      setSelectedChallengeId(ch.id);
                      setWorkspaceText(ch.samplePrompt);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition inline-flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {done && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    <span className="truncate max-w-[230px]">{ch.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Challenge Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-slate-900">{currentChallenge.title}</h4>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 border border-indigo-200">
                  {currentChallenge.trackLevel}
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                <strong>Scenario: </strong>
                {currentChallenge.problemStatement}
              </p>
              <p className="text-xs text-slate-800 leading-relaxed">
                <strong>Your Task: </strong>
                {currentChallenge.learnerTask}
              </p>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-slate-900 text-slate-100 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase text-indigo-300 flex items-center gap-1">
                      <Terminal className="w-3.5 h-3.5" /> Reference Sanitized Prompt
                    </span>
                    <button
                      type="button"
                      onClick={() => copyText(`prompt_${currentChallenge.id}`, currentChallenge.samplePrompt)}
                      className="text-[10px] font-bold text-emerald-300 hover:underline cursor-pointer"
                    >
                      {copiedKey === `prompt_${currentChallenge.id}` ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre className="text-[11px] font-mono text-emerald-200 whitespace-pre-wrap leading-relaxed">
                    {currentChallenge.samplePrompt}
                  </pre>
                </div>

                <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase text-emerald-800 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Expected Output &amp; Architecture
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {currentChallenge.expectedAiOutput}
                  </p>
                  <div className="pt-2 border-t border-slate-100 text-[11px] text-amber-800 font-medium">
                    Security Note: {currentChallenge.securityReminder}
                  </div>
                </div>
              </div>
            </div>

            {/* Sanitized Prompt & Code Review Workspace */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                Draft &amp; Inspect Your Sanitized Prompt / Refactored Code
              </label>
              <textarea
                rows={5}
                value={workspaceText}
                onChange={(e) => setWorkspaceText(e.target.value)}
                placeholder="Write your structured AI prompt or paste sanitized code to verify..."
                className="w-full p-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:outline-none font-mono text-xs bg-white text-slate-800"
              />
              {detectedSecrets.length > 0 && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 text-xs flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Sensitive Pattern Warning:</strong> Potential secret detected ({detectedSecrets.join(', ')}). Replace with dummy placeholders like <code>process.env.GEMINI_API_KEY</code> before sending any prompt to an external AI assistant!
                  </div>
                </div>
              )}
            </div>

            {/* Code Review Checklist */}
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2.5">
              <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                <ClipboardCheck className="w-4 h-4 text-emerald-700" />
                Mandatory Human Code Review Verification
              </span>
              <div className="grid sm:grid-cols-2 gap-2">
                {currentChallenge.codeReviewChecklist.map((item) => {
                  const key = `${currentChallenge.id}_${item}`;
                  const checked = Boolean(checkedItems[key]);
                  return (
                    <label
                      key={key}
                      className="flex items-start gap-2 p-2.5 rounded-lg bg-white border border-emerald-200 text-xs text-slate-800 cursor-pointer hover:border-emerald-400"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) =>
                          setCheckedItems((prev) => ({ ...prev, [key]: e.target.checked }))
                        }
                        className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>{item}</span>
                    </label>
                  );
                })}
              </div>

              {onMarkLabCompleted && (
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    disabled={completedLabIds.includes(currentChallenge.id)}
                    onClick={() => onMarkLabCompleted(currentChallenge.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                      completedLabIds.includes(currentChallenge.id)
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
                        : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {completedLabIds.includes(currentChallenge.id)
                        ? 'AI Lab Challenge Completed'
                        : 'Mark Lab Exercise Complete'}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
