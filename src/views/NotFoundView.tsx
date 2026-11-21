import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Home, GraduationCap, Zap, UserCheck, BookOpen } from 'lucide-react';

export const NotFoundView: React.FC = () => {
  const location = useLocation();

  return (
    <div className="max-w-xl mx-auto py-8 pb-20">
      <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 text-center shadow-sm space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 border border-amber-200 mx-auto flex items-center justify-center">
          <Compass className="w-7 h-7" />
        </div>

        <div className="space-y-1.5">
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 font-mono text-[11px] font-bold">
            404 • Route Not Found
          </span>
          <h2 className="text-2xl font-black text-stone-900 tracking-tight">
            We couldn&apos;t find that page
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-md mx-auto">
            The address{' '}
            <code className="px-1.5 py-0.5 rounded bg-stone-100 text-stone-800 font-mono text-[11px] break-all">
              {location.pathname}
            </code>{' '}
            does not match an active Digital Corps Hub page.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#046A38] hover:bg-[#03522b] text-white font-bold text-xs shadow-sm transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Link
            to="/academy"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 font-bold text-xs transition-colors"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Explore Learning Academy</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-stone-200 grid grid-cols-3 gap-2 text-xs">
          <Link
            to="/quiz"
            className="p-2.5 rounded-xl bg-stone-50 hover:bg-amber-50 border border-stone-200 hover:border-amber-300 flex flex-col items-center gap-1 text-stone-700 font-semibold transition-colors"
          >
            <Zap className="w-4 h-4 text-amber-600" />
            <span>Digital Quiz</span>
          </Link>
          <Link
            to="/register"
            className="p-2.5 rounded-xl bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 flex flex-col items-center gap-1 text-stone-700 font-semibold transition-colors"
          >
            <UserCheck className="w-4 h-4 text-emerald-700" />
            <span>Register</span>
          </Link>
          <Link
            to="/toolkit"
            className="p-2.5 rounded-xl bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 flex flex-col items-center gap-1 text-stone-700 font-semibold transition-colors"
          >
            <BookOpen className="w-4 h-4 text-emerald-700" />
            <span>Toolkit</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
