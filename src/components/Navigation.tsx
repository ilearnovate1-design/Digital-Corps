import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavigationTab } from '../types';
import { TAB_TO_PATH } from '../routes';
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
  currentTab: NavigationTab | null;
  onNavigate?: (tab: NavigationTab) => void;
  isRegistered: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  isRegistered,
}) => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const tabs: { id: NavigationTab; to: string; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'quiz', to: TAB_TO_PATH.quiz, label: 'Digital Quiz', icon: <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />, badge: '5-Min' },
    { id: 'academy', to: TAB_TO_PATH.academy, label: 'Academy', icon: <GraduationCap className="w-4 h-4 text-emerald-500" />, badge: '6 Courses' },
    {
      id: isRegistered ? 'success' : 'register',
      to: isRegistered ? TAB_TO_PATH.success : TAB_TO_PATH.register,
      label: isRegistered ? 'My Pass' : 'Register',
      icon: isRegistered ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <UserCheck className="w-4 h-4" />,
      badge: isRegistered ? 'Active' : 'Step 1'
    },
    { id: 'challenge', to: TAB_TO_PATH.challenge, label: 'AI Challenge', icon: <Target className="w-4 h-4" /> },
    { id: 'toolkit', to: TAB_TO_PATH.toolkit, label: 'Starter Toolkit', icon: <BookOpen className="w-4 h-4" />, badge: '7 Kits' },
    { id: 'community', to: TAB_TO_PATH.community, label: 'Community', icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Top scrollable tab bar */}
      <nav aria-label="Main navigation" className="bg-white border-b border-stone-200 sticky top-[68px] z-20 shadow-xs">
        <div className="max-w-4xl mx-auto px-2">
          <div className="flex items-center space-x-1 overflow-x-auto py-2 no-scrollbar scroll-smooth">
            {tabs.map((tab) => {
              const isTabActive =
                currentTab === tab.id ||
                (tab.id === 'register' && currentTab === 'success' && !isRegistered);

              return (
                <NavLink
                  key={tab.id}
                  to={tab.to}
                  end={tab.id !== 'academy'}
                  onClick={scrollToTop}
                  className={({ isActive }) => {
                    const active = isActive || isTabActive;
                    return `flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                      active
                        ? 'bg-emerald-800 text-white shadow-xs'
                        : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                    }`;
                  }}
                >
                  {({ isActive }) => {
                    const active = isActive || isTabActive;
                    return (
                      <>
                        {tab.icon}
                        <span>{tab.label}</span>
                        {tab.badge && (
                          <span
                            className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                              active
                                ? 'bg-amber-400 text-stone-950'
                                : 'bg-stone-200 text-stone-700'
                            }`}
                          >
                            {tab.badge}
                          </span>
                        )}
                      </>
                    );
                  }}
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Fixed bottom navigation bar for mobile thumb reach */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-lg px-1 py-1 safe-area-pb">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <NavLink
            to={TAB_TO_PATH.quiz}
            onClick={scrollToTop}
            className={({ isActive }) =>
              `flex flex-col items-center py-1 px-1.5 rounded-lg cursor-pointer transition-colors ${
                isActive ? 'text-amber-600 font-bold' : 'text-stone-500'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Zap className={`w-4 h-4 ${isActive ? 'fill-amber-500' : ''}`} />
                <span className="text-[10px] mt-0.5">Quiz</span>
              </>
            )}
          </NavLink>

          <NavLink
            to={TAB_TO_PATH.academy}
            end={false}
            onClick={scrollToTop}
            className={({ isActive }) =>
              `flex flex-col items-center py-1 px-1.5 rounded-lg cursor-pointer transition-colors ${
                isActive ? 'text-emerald-700 font-bold' : 'text-stone-500'
              }`
            }
          >
            <GraduationCap className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">Academy</span>
          </NavLink>

          <NavLink
            to={isRegistered ? TAB_TO_PATH.success : TAB_TO_PATH.register}
            onClick={scrollToTop}
            className={({ isActive }) =>
              `flex flex-col items-center py-1 px-1.5 rounded-lg cursor-pointer transition-colors ${
                isActive || currentTab === 'register' || currentTab === 'success'
                  ? 'text-emerald-700 font-bold'
                  : 'text-stone-500'
              }`
            }
          >
            {isRegistered ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <UserCheck className="w-4 h-4" />}
            <span className="text-[10px] mt-0.5">{isRegistered ? 'Pass' : 'Register'}</span>
          </NavLink>

          <NavLink
            to={TAB_TO_PATH.challenge}
            onClick={scrollToTop}
            className={({ isActive }) =>
              `flex flex-col items-center py-1 px-1.5 rounded-lg cursor-pointer transition-colors ${
                isActive ? 'text-emerald-700 font-bold' : 'text-stone-500'
              }`
            }
          >
            <Target className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">Challenge</span>
          </NavLink>

          <NavLink
            to={TAB_TO_PATH.toolkit}
            onClick={scrollToTop}
            className={({ isActive }) =>
              `flex flex-col items-center py-1 px-1.5 rounded-lg cursor-pointer transition-colors ${
                isActive ? 'text-emerald-700 font-bold' : 'text-stone-500'
              }`
            }
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">Toolkit</span>
          </NavLink>

          <NavLink
            to={TAB_TO_PATH.community}
            onClick={scrollToTop}
            className={({ isActive }) =>
              `flex flex-col items-center py-1 px-1.5 rounded-lg cursor-pointer transition-colors ${
                isActive ? 'text-emerald-700 font-bold' : 'text-stone-500'
              }`
            }
          >
            <Users className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">Community</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};
