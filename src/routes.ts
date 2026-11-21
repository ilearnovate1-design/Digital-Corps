import { NavigationTab } from './types';

export const TAB_TO_PATH: Record<NavigationTab, string> = {
  welcome: '/',
  quiz: '/quiz',
  academy: '/academy',
  register: '/register',
  challenge: '/challenge',
  toolkit: '/toolkit',
  community: '/community',
  success: '/pass'
};

export function getTabFromPathname(pathname: string): NavigationTab | null {
  const clean = pathname.toLowerCase().replace(/\/+$/, '') || '/';
  if (clean === '/') return 'welcome';
  if (clean === '/quiz' || clean.startsWith('/quiz/')) return 'quiz';
  if (clean === '/academy' || clean.startsWith('/academy/')) return 'academy';
  if (clean === '/register' || clean.startsWith('/register/')) return 'register';
  if (clean === '/pass' || clean.startsWith('/pass/') || clean === '/success') return 'success';
  if (clean === '/challenge' || clean.startsWith('/challenge/')) return 'challenge';
  if (clean === '/toolkit' || clean.startsWith('/toolkit/')) return 'toolkit';
  if (clean === '/community' || clean.startsWith('/community/')) return 'community';
  return null;
}

export function getAcademyUrl(courseId?: string | null, lessonId?: string | null): string {
  if (!courseId) return '/academy';
  if (courseId === '__webdev_placement__') return '/academy/placement';
  const encodedCourse = encodeURIComponent(courseId);
  if (lessonId) {
    return `/academy/${encodedCourse}/${encodeURIComponent(lessonId)}`;
  }
  return `/academy/${encodedCourse}`;
}
