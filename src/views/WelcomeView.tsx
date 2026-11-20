import React, { useState, useEffect } from 'react';
import { NavigationTab } from '../types';
import { EVENT_INFO } from '../data/staticContent';
import { ALL_ACADEMY_COURSES } from '../data/academy';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Target,
  ShieldCheck,
  CheckCircle,
  Zap,
  Building2,
  Users,
  Award,
  BrainCircuit,
  GraduationCap
} from 'lucide-react';

interface WelcomeViewProps {
  onNavigate: (tab: NavigationTab) => void;
  isRegistered: boolean;
  onOpenPrivacyNotice: () => void;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({
  onNavigate,
  isRegistered,
  onOpenPrivacyNotice
}) => {
  const [quizRecord, setQuizRecord] = useState<{ score: number; total: number } | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('dch_nysc_quiz_best_score');
      if (saved) {
        setQuizRecord(JSON.parse(saved));
      }
    } catch (e) {
      // Ignore local storage read errors
    }
  }, []);

  return (
    <div className="space-y-6 pb-20">
      {/* Hero card with clear headings & prominent Get Started */}
      <div className="rounded-2xl bg-gradient-to-br from-[#046A38] via-[#05572e] to-[#023b1e] text-white p-6 sm:p-8 shadow-md">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-amber-400 text-stone-950 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-stone-950" />
            <span>{EVENT_INFO.edition}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight mb-2 text-white">
            {EVENT_INFO.eventName}
          </h2>

          <p className="text-sm sm:text-base text-emerald-100 leading-relaxed mb-4">
            Digital Corps Hub is an independent learning platform dedicated to supporting corps members with practical digital skills, career readiness, and grassroots community engagement throughout their service year.
          </p>

          <div className="bg-emerald-950/70 border border-emerald-500/30 rounded-xl p-3 mb-6 text-xs text-emerald-200/90 leading-relaxed">
            <span className="font-bold text-amber-300">Important Note:</span> This is an independent digital skills &amp; community initiative. It is not an official NYSC platform, and challenge or project records here do not replace official CDS clearance or reporting.
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
            <button
              onClick={() => onNavigate(isRegistered ? 'success' : 'register')}
              className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold px-6 py-3.5 rounded-xl shadow-md text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
            >
              <span>{isRegistered ? 'View My Digital Pass' : 'Get Started'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('quiz')}
              className="bg-emerald-800/90 hover:bg-emerald-800 border border-emerald-400/40 text-emerald-100 font-semibold px-5 py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>Rapid-Fire Quiz</span>
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={onOpenPrivacyNotice}
              className="inline-flex items-center gap-1.5 text-xs text-emerald-200 hover:text-white underline cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Read our Privacy & Data Protection Notice</span>
            </button>
          </div>
        </div>
      </div>

      {/* PROMINENT CARD: Rapid-Fire Digital Quiz */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 border-2 border-amber-400 p-6 sm:p-7 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 bg-stone-950 text-amber-300 text-[11px] font-black uppercase px-2.5 py-1 rounded-full tracking-wide shadow-xs">
                <Zap className="w-3 h-3 fill-amber-300" />
                Live Camp Challenge
              </span>
              {quizRecord && (
                <span className="inline-flex items-center gap-1 bg-emerald-900 text-emerald-100 text-[11px] font-bold px-2.5 py-1 rounded-full">
                  <Award className="w-3 h-3 text-amber-300" />
                  Your Best: {quizRecord.score}/{quizRecord.total}
                </span>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-stone-950 tracking-tight leading-tight mb-2">
              Rapid-Fire Digital Quiz
            </h3>

            <p className="text-xs sm:text-sm text-stone-900 leading-relaxed font-medium mb-4">
              Test your practical AI literacy, scam defense tactics, and digital productivity in 5 minutes! 10 quick multiple-choice questions designed for Nigerian corps members.
            </p>

            <div className="flex flex-wrap items-center gap-2 text-stone-950 text-xs font-semibold">
              <span className="bg-amber-200/90 border border-amber-600/30 px-2.5 py-1 rounded-lg">
                ⏱️ ~5 Minutes
              </span>
              <span className="bg-amber-200/90 border border-amber-600/30 px-2.5 py-1 rounded-lg">
                🎯 10 Multiple-Choice Questions
              </span>
              <span className="bg-amber-200/90 border border-amber-600/30 px-2.5 py-1 rounded-lg">
                💡 Instant Explanations
              </span>
              <span className="bg-amber-200/90 border border-amber-600/30 px-2.5 py-1 rounded-lg">
                📱 100% Mobile Ready
              </span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2.5 items-stretch md:items-end">
            <button
              onClick={() => onNavigate('quiz')}
              className="bg-stone-950 hover:bg-stone-850 active:scale-95 text-white font-extrabold px-6 py-4 rounded-xl shadow-lg text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer"
            >
              <Zap className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span>{quizRecord ? 'Play Quiz Again' : 'Start Quiz'}</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
            <p className="text-[11px] text-stone-800 text-center md:text-right font-medium">
              Zero internet data used during questions
            </p>
          </div>
        </div>
      </div>

      {/* Zero Read Architecture Notice */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
        <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg shrink-0">
          <Zap className="w-5 h-5" />
        </div>
        <div className="text-xs">
          <p className="font-bold text-emerald-950 mb-0.5">
            Zero-Read Offline Friendly Architecture
          </p>
          <p className="text-emerald-800 leading-relaxed">
            All toolkits, prompt templates, learning tracks, and quiz questions are stored locally on your device. Browsing and taking the quiz consumes zero database reads and minimal internet bandwidth.
          </p>
        </div>
      </div>

      {/* 4 Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Card 1 */}
        <div
          onClick={() => onNavigate('register')}
          className="bg-white border border-stone-200 hover:border-emerald-500 rounded-xl p-5 shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-800 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
              <CheckCircle className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              {isRegistered ? 'Registered' : 'Short Form'}
            </span>
          </div>
          <h3 className="font-bold text-stone-900 text-base mb-1 group-hover:text-emerald-700 transition-colors">
            1. Participant Registration
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Simple 3-field minimum signup. No passwords or sensitive personal data collected. Generates a local pass.
          </p>
        </div>

        {/* Card 2 */}
        <div
          onClick={() => onNavigate('challenge')}
          className="bg-white border border-stone-200 hover:border-emerald-500 rounded-xl p-5 shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 rounded-lg bg-amber-100 text-amber-800 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Target className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
              Youth Impact
            </span>
          </div>
          <h3 className="font-bold text-stone-900 text-base mb-1 group-hover:text-emerald-700 transition-colors">
            2. AI Platoon Challenge
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Use AI to solve local host community problems. Review rules, rubric, 30-day action plan, and submit concepts.
          </p>
        </div>

        {/* Card 3 */}
        <div
          onClick={() => onNavigate('academy')}
          className="bg-white border border-stone-200 hover:border-emerald-500 rounded-xl p-5 shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-800 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              {ALL_ACADEMY_COURSES.length} Courses
            </span>
          </div>
          <h3 className="font-bold text-stone-900 text-base mb-1 group-hover:text-emerald-700 transition-colors">
            3. Learning Academy
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Master {ALL_ACADEMY_COURSES.length} full practical courses including AI Literacy, Grow Your Business Online, and the 3-level Web Development Academy with live coding practice and capstones.
          </p>
        </div>

        {/* Card 4 */}
        <div
          onClick={() => onNavigate('toolkit')}
          className="bg-white border border-stone-200 hover:border-emerald-500 rounded-xl p-5 shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 rounded-lg bg-purple-100 text-purple-800 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
              7 Free Kits
            </span>
          </div>
          <h3 className="font-bold text-stone-900 text-base mb-1 group-hover:text-emerald-700 transition-colors">
            4. Starter Toolkit
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Instant copyable prompts, CV templates, interview prep, scam awareness, and a 30-day skill roadmap.
          </p>
        </div>
      </div>
    </div>
  );
};
