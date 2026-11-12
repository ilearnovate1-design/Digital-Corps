import React from 'react';
import { NavigationTab } from '../types';
import {
  UserCheck,
  Target,
  BookOpen,
  Users,
  CheckCircle2,
  Zap,
  GraduationCap
} from 'lucide-react';

interface NavigationProps {
  currentTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  isRegistered: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onNavigate,
  isRegistered,
}) => {
  const tabs: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'quiz', label: 'Digital Quiz', icon: <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />, badge: '5-Min' },
    { id: 'academy', label: 'Academy', icon: <GraduationCap className="w-4 h-4 text-emerald-500" />, badge: '6 Courses' },
    { 
      id: isRegistered ? 'success' : 'register', 
      label: isRegistered ? 'My Pass' : 'Register', 
      icon: isRegistered ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <UserCheck className="w-4 h-4" />,
      badge: isRegistered ? 'Active' : 'Step 1'
    },
    { id: 'challenge', label: 'AI Challenge', icon: <Target className="w-4 h-4" /> },
    { id: 'toolkit', label: 'Starter Toolkit', icon: <BookOpen className="w-4 h-4" />, badge: '7 Kits' },
    { id: 'community', label: 'Community', icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Top scrollable tab bar */}
      <nav className="bg-white border-b border-stone-200 sticky top-[68px] z-20 shadow-xs">
        <div className="max-w-4xl mx-auto px-2">
          <div className="flex items-center space-x-1 overflow-x-auto py-2 no-scrollbar scroll-smooth">
            {tabs.map((tab) => {
              const isActive =
                currentTab === tab.id ||
                (tab.id === 'register' && currentTab === 'success' && !isRegistered);

              return (
                <button
                  key={tab.id}
                  onClick={() => onNavigate(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive
                          ? 'bg-amber-400 text-stone-950'
                          : 'bg-stone-200 text-stone-700'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Fixed bottom navigation bar for mobile thumb reach */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-lg px-1 py-1 safe-area-pb">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button
            onClick={() => onNavigate('quiz')}
            className={`flex flex-col items-center py-1 px-1.5 rounded-lg cursor-pointer transition-colors ${
              currentTab === 'quiz' ? 'text-amber-600 font-bold' : 'text-stone-500'
            }`}
          >
            <Zap className={`w-4 h-4 ${currentTab === 'quiz' ? 'fill-amber-500' : ''}`} />
            <span className="text-[10px] mt-0.5">Quiz</span>
          </button>

          <button
            onClick={() => onNavigate('academy')}
            className={`flex flex-col items-center py-1 px-1.5 rounded-lg cursor-pointer transition-colors ${
              currentTab === 'academy' ? 'text-emerald-700 font-bold' : 'text-stone-500'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">Academy</span>
          </button>

          <button
            onClick={() => onNavigate(isRegistered ? 'success' : 'register')}
            className={`flex flex-col items-center py-1 px-1.5 rounded-lg cursor-pointer transition-colors ${
              (currentTab === 'register' || currentTab === 'success')
                ? 'text-emerald-700 font-bold'
                : 'text-stone-500'
            }`}
          >
            {isRegistered ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <UserCheck className="w-4 h-4" />}
            <span className="text-[10px] mt-0.5">{isRegistered ? 'Pass' : 'Register'}</span>
          </button>

          <button
            onClick={() => onNavigate('challenge')}
            className={`flex flex-col items-center py-1 px-1.5 rounded-lg cursor-pointer transition-colors ${
              currentTab === 'challenge' ? 'text-emerald-700 font-bold' : 'text-stone-500'
            }`}
          >
            <Target className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">Challenge</span>
          </button>

          <button
            onClick={() => onNavigate('toolkit')}
            className={`flex flex-col items-center py-1 px-1.5 rounded-lg cursor-pointer transition-colors ${
              currentTab === 'toolkit' ? 'text-emerald-700 font-bold' : 'text-stone-500'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">Toolkit</span>
          </button>

          <button
            onClick={() => onNavigate('community')}
            className={`flex flex-col items-center py-1 px-1.5 rounded-lg cursor-pointer transition-colors ${
              currentTab === 'community' ? 'text-emerald-700 font-bold' : 'text-stone-500'
            }`}
          >
            <Users className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">Community</span>
          </button>
        </div>
      </div>
    </>
  );
};
