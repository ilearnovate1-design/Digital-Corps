import React, { useState, useEffect } from 'react';
import {
  X,
  Compass,
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowRight,
  Award,
  AlertCircle
} from 'lucide-react';
import { WebDevPlacementResult } from '../../types';
import {
  startWebDevPlacementAssessment,
  evaluateWebDevPlacementAssessment
} from '../../services/academyService';

interface WebDevPlacementModalProps {
  isOpen: boolean;
  participantId: string;
  onClose: () => void;
  onSelectTrack: (courseId: string) => void;
  onPlacementSaved?: (result: WebDevPlacementResult) => void;
}

export const WebDevPlacementModal: React.FC<WebDevPlacementModalProps> = ({
  isOpen,
  participantId,
  onClose,
  onSelectTrack,
  onPlacementSaved
}) => {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [questions, setQuestions] = useState<
    Array<{
      id: string;
      domain: string;
      tier: 'beginner' | 'intermediate' | 'advanced';
      questionText: string;
      options: string[];
    }>
  >([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<WebDevPlacementResult | null>(null);
  const [review, setReview] = useState<
    Array<{
      id: string;
      domain: string;
      questionText: string;
      options: string[];
      userAnswer: number | null;
      correctAnswer: number;
      isCorrect: boolean;
      explanation: string;
    }>
  >([]);

  const loadQuestions = async () => {
    setLoading(true);
    setError(null);
    setAnswers({});
    setResult(null);
    setReview([]);
    try {
      const data = await startWebDevPlacementAssessment(participantId);
      setToken(data.placementToken);
      setQuestions(data.questions);
    } catch (err: any) {
      setError(err?.message || 'Could not load placement assessment.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadQuestions();
    }
  }, [isOpen, participantId]);

  if (!isOpen) return null;

  const answeredCount = Object.keys(answers).length;

  const handleSubmit = async () => {
    if (answeredCount < questions.length) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await evaluateWebDevPlacementAssessment(participantId, token, answers);
      setResult(res.result);
      setReview(res.review);
      if (onPlacementSaved) onPlacementSaved(res.result);
    } catch (err: any) {
      setError(err?.message || 'Could not evaluate placement responses.');
    } finally {
      setSubmitting(false);
    }
  };

  const trackTitleMap: Record<string, string> = {
    'web-development-beginner': 'Beginner – Web Development Fundamentals',
    'web-development-intermediate': 'Intermediate – Modern Web Development with AI',
    'web-development-advanced': 'Advanced – AI-Powered Full-Stack Development'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
              <Compass className="w-5 h-5" />
            </span>
            <div>
              <h2 className="font-black text-base text-slate-900">
                Web Development Placement Assessment
              </h2>
              <p className="text-[11px] text-slate-500">
                16 scenario questions across HTML, CSS, JS, React, TypeScript, APIs, SQL &amp; AI workflows
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close placement assessment"
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </span>
              <button
                type="button"
                onClick={loadQuestions}
                className="px-2.5 py-1 bg-rose-700 text-white rounded-lg font-bold cursor-pointer shrink-0"
              >
                Retry
              </button>
            </div>
          )}

          {loading ? (
            <div className="py-12 text-center text-slate-500 space-y-2">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-indigo-600" />
              <p>Loading server-randomized placement check...</p>
            </div>
          ) : result ? (
            <div className="space-y-5">
              {/* Recommended Track Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-emerald-950 text-white space-y-3">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-bold">
                    <Award className="w-3.5 h-3.5" /> Recommended Starting Track
                  </span>
                  <span className="font-mono text-xs text-slate-300">
                    Score: {result.score}/{result.total} ({result.percentage}%)
                  </span>
                </div>

                <h3 className="text-xl font-black text-white">
                  {trackTitleMap[result.recommendedCourseId] || result.recommendedCourseId}
                </h3>
                <p className="text-xs text-slate-200 leading-relaxed">{result.rationale}</p>

                <div className="flex flex-wrap items-center gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectTrack(result.recommendedCourseId);
                      onClose();
                    }}
                    className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-black text-xs inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                  >
                    <span>Start Recommended Track</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  {result.recommendedCourseId !== 'web-development-beginner' && (
                    <button
                      type="button"
                      onClick={() => {
                        onSelectTrack('web-development-beginner');
                        onClose();
                      }}
                      className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-xs whitespace-nowrap cursor-pointer"
                    >
                      Choose Beginner Track Instead
                    </button>
                  )}
                </div>
              </div>

              {/* Domain Breakdown Bars */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Skill Breakdown by Domain
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {Object.entries(result.domainBreakdown).map(([domain, stat]) => {
                    const pct = stat.total > 0 ? Math.round((stat.score / stat.total) * 100) : 0;
                    return (
                      <div key={domain} className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5">
                        <div className="flex justify-between text-xs font-bold text-slate-800">
                          <span>{domain}</span>
                          <span className="font-mono text-indigo-700">
                            {stat.score}/{stat.total} ({pct}%)
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className={`h-2 rounded-full ${
                              pct >= 50 ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Answer Explanations */}
              <div className="space-y-2.5">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Placement Answer Review
                </h4>
                {review.map((r, i) => (
                  <div
                    key={r.id}
                    className={`p-3 rounded-xl border text-xs space-y-1 ${
                      r.isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-slate-900">
                        {i + 1}. [{r.domain}] {r.questionText}
                      </span>
                      {r.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-slate-700">
                      <strong>Correct Answer:</strong> {r.options[r.correctAnswer]}
                    </p>
                    <p className="text-slate-600">{r.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((q, idx) => {
                const picked = answers[q.id];
                return (
                  <div key={q.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2.5">
                    <div className="flex items-center justify-between gap-2 text-[10px] font-mono uppercase text-slate-500">
                      <span>
                        Q{idx + 1} • {q.domain}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white border border-slate-200 font-bold text-slate-600">
                        {q.tier}
                      </span>
                    </div>
                    <p className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                      {q.questionText}
                    </p>
                    <div className="space-y-1.5">
                      {q.options.map((opt, optIdx) => {
                        const selected = picked === optIdx;
                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: optIdx }))}
                            className={`w-full text-left p-2.5 rounded-lg border text-xs transition cursor-pointer ${
                              selected
                                ? 'bg-indigo-50 border-indigo-600 text-indigo-950 font-semibold'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {!loading && !result && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
            <span className="text-xs text-slate-600 font-medium">
              Answered: {answeredCount} / {questions.length}
            </span>
            <button
              type="button"
              disabled={submitting || answeredCount < questions.length}
              onClick={handleSubmit}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold disabled:opacity-50 inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Evaluating...</span>
                </>
              ) : (
                <>
                  <span>Get Track Recommendation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
