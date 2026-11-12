import React from 'react';
import { NavigationTab } from '../types';
import {
  CheckCircle2,
  BookOpen,
  GraduationCap,
  Target,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';

interface SuccessViewProps {
  registrationId?: string;
  onNavigate: (tab: NavigationTab) => void;
}

export const SuccessView: React.FC<SuccessViewProps> = ({
  registrationId,
  onNavigate
}) => {
  return (
    <div className="max-w-xl mx-auto space-y-6 pb-20">
      {/* Action Completion Confirmation Card */}
      <div className="bg-white border-2 border-emerald-600/30 rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-sm">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 border border-emerald-300">
          <CheckCircle2 className="w-10 h-10 text-emerald-700" />
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-black text-stone-900 tracking-tight">
            Registration Confirmed!
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
            Your participation in the NYSC Digital Corps Empowerment Initiative has been successfully recorded.
          </p>
        </div>

        {/* Non-sensitive pass badge (No PII displayed) */}
        <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 inline-block text-left w-full max-w-sm">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-200">
            <span className="text-stone-500 font-semibold uppercase text-[10px]">Session Status</span>
            <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full text-[10px]">
              Confirmed
            </span>
          </div>

          <div className="pt-2 text-xs flex items-center justify-between">
            <span className="text-stone-500 font-semibold uppercase text-[10px]">Participant Pass Code</span>
            <span className="font-mono font-bold text-stone-900">
              {registrationId ? registrationId.substring(0, 16) : 'CONFIRMED-2026'}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400 pt-1">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Official session confirmed. Your registration is securely recorded.</span>
        </div>
      </div>

      {/* Prominent Navigation Back to Toolkit and Academy */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-3">
        <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wide">
          Explore Free Resources Now:
        </h3>

        <div className="space-y-2.5">
          {/* Navigate to Toolkit */}
          <button
            onClick={() => onNavigate('toolkit')}
            className="w-full text-left p-4 rounded-xl border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50/40 transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-stone-900">
                  Open Digital Corps Starter Toolkit
                </p>
                <p className="text-xs text-stone-500">
                  Copy 7 ready-to-use prompt packs, ATS CV templates, and scam defense guides.
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-stone-400 group-hover:text-emerald-700 shrink-0" />
          </button>

          {/* Navigate to Academy */}
          <button
            onClick={() => onNavigate('academy')}
            className="w-full text-left p-4 rounded-xl border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50/40 transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-stone-900">
                  Enter Learning Academy
                </p>
                <p className="text-xs text-stone-500">
                  Explore 6 full practical courses with certificates and Nigerian case studies.
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-stone-400 group-hover:text-emerald-700 shrink-0" />
          </button>

          {/* Navigate to AI Challenge */}
          <button
            onClick={() => onNavigate('challenge')}
            className="w-full text-left p-4 rounded-xl border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50/40 transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-100 text-amber-800 rounded-xl group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-stone-900">
                  Review AI Platoon Challenge Brief
                </p>
                <p className="text-xs text-stone-500">
                  Brainstorm community proposals and 30-day action plans with your team.
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-stone-400 group-hover:text-amber-700 shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
};
