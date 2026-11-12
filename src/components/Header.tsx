import React from 'react';
import { NavigationTab } from '../types';
import { Sparkles, Shield, WifiOff, Award } from 'lucide-react';

interface HeaderProps {
  currentTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  registeredUser: any | null;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  registeredUser,
  onOpenAdmin
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#046A38] text-white shadow-md">
      {/* Top micro bar clarifying independent initiative supporting corps members */}
      <div className="bg-[#03522b] text-[11px] px-3 py-1 flex items-center justify-between font-mono tracking-tight text-emerald-100">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>INDEPENDENT DIGITAL SKILLS PLATFORM FOR CORPS MEMBERS</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-emerald-900/80 px-1.5 py-0.5 rounded text-[10px] text-emerald-200 flex items-center gap-1">
            <WifiOff className="w-2.5 h-2.5" /> Zero-Data Offline Ready
          </span>
          <button
            onClick={onOpenAdmin}
            className="text-[10px] text-amber-300 hover:text-white underline cursor-pointer flex items-center gap-1 font-sans"
            title="Coordinator Admin Portal"
          >
            <Shield className="w-3 h-3" />
            <span>Admin Portal</span>
          </button>
        </div>
      </div>

      {/* Main app bar */}
      <div className="max-w-4xl mx-auto px-4 py-2.5 flex items-center justify-between">
        <div 
          onClick={() => onNavigate('welcome')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          {/* Platform Badge */}
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-1 shadow-inner border border-emerald-300">
            <div className="w-full h-full bg-[#046A38] rounded-lg flex items-center justify-center text-white font-black text-sm">
              <span className="text-amber-400 font-extrabold">D</span>CH
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-bold text-base leading-tight tracking-tight text-white group-hover:text-emerald-200 transition-colors">
                Digital Corps Hub
              </h1>
              <span className="bg-amber-400 text-stone-900 text-[10px] font-black px-1.5 py-0.2 rounded uppercase">
                Skills Hub
              </span>
            </div>
            <p className="text-[11px] text-emerald-100 leading-none">
              Empowering 2,000 Corps Members • Independent Skills Initiative
            </p>
          </div>
        </div>

        {/* Right side action */}
        <div className="flex items-center gap-2">
          {registeredUser ? (
            <button
              onClick={() => onNavigate('success')}
              className="bg-amber-400 hover:bg-amber-300 text-stone-950 px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <Award className="w-3.5 h-3.5 text-stone-900" />
              <span className="hidden sm:inline">My Pass:</span>
              <span className="font-mono text-[11px] font-bold">P{registeredUser.platoon}</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate('register')}
              className="bg-emerald-500 hover:bg-emerald-400 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow transition-all active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Register Now</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
