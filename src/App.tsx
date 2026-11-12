/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavigationTab, ParticipantRegistration } from './types';
import { syncPendingRegistrations } from './services/participantService';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { PrivacyNoticeModal } from './components/PrivacyNoticeModal';
import { WelcomeView } from './views/WelcomeView';
import { QuizView } from './views/QuizView';
import { RegistrationView } from './views/RegistrationView';
import { PlatoonChallengeView } from './views/PlatoonChallengeView';
import { ToolkitView } from './views/ToolkitView';
import { CommunityOptInView } from './views/CommunityOptInView';
import { SuccessView } from './views/SuccessView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { AcademyView } from './views/AcademyView';
import { RegisteredParticipant } from './types';

const LOCAL_STORAGE_KEY = 'dch_nysc_registered_user';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('welcome');
  const [registeredUser, setRegisteredUser] = useState<ParticipantRegistration | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  // Deep-linking state for Academy
  const [selectedAcademyCourseId, setSelectedAcademyCourseId] = useState<string | null>(null);
  const [selectedAcademyLessonId, setSelectedAcademyLessonId] = useState<string | null>(null);

  // Load from browser storage on initial boot (zero cloud read)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setRegisteredUser(parsed);
      }
    } catch (e) {
      console.warn('Could not read from local storage:', e);
    }

    // Attempt background sync of any pending offline records
    syncPendingRegistrations();
    const handleOnline = () => syncPendingRegistrations();
    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, []);

  // Save registration locally for instant pass generation without reading Firestore
  const handleSaveRegistration = (data: ParticipantRegistration) => {
    setRegisteredUser(data);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Could not write to local storage:', e);
    }
  };

  // Update consent preferences locally
  const handleUpdateOptIn = (communityOptIn: boolean, marketingConsent: boolean) => {
    if (!registeredUser) return;
    const updated = { ...registeredUser, communityOptIn, marketingConsent };
    handleSaveRegistration(updated);
  };

  const handleNavigate = (tab: NavigationTab) => {
    // If navigating directly to academy from tabs, clear previous deep links
    if (tab === 'academy') {
      setSelectedAcademyCourseId(null);
      setSelectedAcademyLessonId(null);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToAcademy = (courseId: string, lessonId?: string) => {
    setSelectedAcademyCourseId(courseId);
    setSelectedAcademyLessonId(lessonId || null);
    setCurrentTab('academy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const participantProfile: RegisteredParticipant | null = registeredUser ? {
    id: registeredUser.registrationId || registeredUser.phone,
    name: `${registeredUser.firstName} ${registeredUser.surname}`,
    email: registeredUser.email,
    phone: registeredUser.phone,
    platoon: registeredUser.platoon > 0
      ? `Platoon ${registeredUser.platoon}`
      : (registeredUser.cdsGroupName || 'Post Camp'),
    stateCode: registeredUser.stateCode,
    callUpNumber: registeredUser.callUpNumber,
    registeredAt: registeredUser.consentTimestamp
  } : null;

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-sans text-stone-900">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        registeredUser={registeredUser}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Navigation Bars */}
      <Navigation
        currentTab={currentTab}
        onNavigate={handleNavigate}
        isRegistered={!!registeredUser}
      />

      {/* Main Content Area: Zero Firestore reads for page rendering */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 pt-5 pb-8">
        {currentTab === 'welcome' && (
          <WelcomeView
            onNavigate={handleNavigate}
            isRegistered={!!registeredUser}
            onOpenPrivacyNotice={() => setIsPrivacyModalOpen(true)}
          />
        )}

        {currentTab === 'quiz' && (
          <QuizView
            onNavigate={handleNavigate}
            registeredUser={registeredUser}
            isRegistered={!!registeredUser}
            onNavigateToAcademy={handleNavigateToAcademy}
          />
        )}

        {currentTab === 'academy' && (
          <AcademyView
            participant={participantProfile}
            initialCourseId={selectedAcademyCourseId}
            initialLessonId={selectedAcademyLessonId}
            onNavigateToQuiz={() => {
              setCurrentTab('quiz');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onClearDeepLink={() => {
              setSelectedAcademyCourseId(null);
              setSelectedAcademyLessonId(null);
            }}
          />
        )}

        {currentTab === 'register' && (
          <RegistrationView
            initialData={registeredUser}
            onSaveRegistration={handleSaveRegistration}
            onNavigate={handleNavigate}
            onOpenPrivacyNotice={() => setIsPrivacyModalOpen(true)}
          />
        )}

        {currentTab === 'challenge' && (
          <PlatoonChallengeView
            userPlatoon={registeredUser?.platoon}
            userName={registeredUser ? `${registeredUser.firstName} ${registeredUser.surname}` : undefined}
            userStateCode={registeredUser?.stateCode}
          />
        )}

        {currentTab === 'toolkit' && (
          <ToolkitView />
        )}

        {currentTab === 'community' && (
          <CommunityOptInView
            registeredUser={registeredUser}
            onUpdateOptIn={handleUpdateOptIn}
            onNavigateToRegistration={() => handleNavigate('register')}
          />
        )}

        {currentTab === 'success' && (
          <SuccessView
            registrationId={registeredUser?.registrationId}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Footer with FAQs and Privacy notice trigger */}
      <Footer onOpenPrivacyNotice={() => setIsPrivacyModalOpen(true)} />

      {/* Modals */}
      <PrivacyNoticeModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      {isAdminOpen && (
        <AdminDashboardView
          onClose={() => setIsAdminOpen(false)}
        />
      )}
    </div>
  );
}
