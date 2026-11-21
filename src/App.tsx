/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { NavigationTab, ParticipantRegistration, RegisteredParticipant } from './types';
import { TAB_TO_PATH, getTabFromPathname, getAcademyUrl } from './routes';
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
import { NotFoundView } from './views/NotFoundView';

const LOCAL_STORAGE_KEY = 'dch_nysc_registered_user';

interface AcademyRouteWrapperProps {
  participant: RegisteredParticipant | null;
  forceCourseId?: string;
}

const AcademyRouteWrapper: React.FC<AcademyRouteWrapperProps> = ({
  participant,
  forceCourseId
}) => {
  const { courseId, lessonId } = useParams<{ courseId?: string; lessonId?: string }>();
  const navigate = useNavigate();

  const resolvedCourseId = forceCourseId || (courseId ? decodeURIComponent(courseId) : null);
  const resolvedLessonId = lessonId ? decodeURIComponent(lessonId) : null;

  return (
    <AcademyView
      participant={participant}
      initialCourseId={resolvedCourseId}
      initialLessonId={resolvedLessonId}
      onNavigateToQuiz={() => {
        navigate('/quiz');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      onClearDeepLink={() => {
        navigate('/academy');
      }}
    />
  );
};

export default function App() {
  const [registeredUser, setRegisteredUser] = useState<ParticipantRegistration | null>(null);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const currentTab: NavigationTab | null = getTabFromPathname(location.pathname);

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
    navigate(TAB_TO_PATH[tab] || '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToAcademy = (courseId: string, lessonId?: string) => {
    navigate(getAcademyUrl(courseId, lessonId));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseAdmin = () => {
    const state = location.state as { from?: string } | null;
    if (state?.from && state.from !== '/admin') {
      navigate(state.from);
    } else {
      navigate('/');
    }
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
      />

      {/* Navigation Bars */}
      <Navigation
        currentTab={currentTab}
        onNavigate={handleNavigate}
        isRegistered={!!registeredUser}
      />

      {/* Main Content Area: URL-Driven Routes with Zero Firestore Reads for Page Rendering */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 pt-5 pb-8">
        <Routes>
          <Route
            path="/"
            element={
              <WelcomeView
                onNavigate={handleNavigate}
                isRegistered={!!registeredUser}
                onOpenPrivacyNotice={() => setIsPrivacyModalOpen(true)}
              />
            }
          />

          <Route
            path="/quiz"
            element={
              <QuizView
                onNavigate={handleNavigate}
                registeredUser={registeredUser}
                isRegistered={!!registeredUser}
                onNavigateToAcademy={handleNavigateToAcademy}
              />
            }
          />

          <Route
            path="/academy"
            element={<AcademyRouteWrapper participant={participantProfile} />}
          />
          <Route
            path="/academy/placement"
            element={
              <AcademyRouteWrapper
                participant={participantProfile}
                forceCourseId="__webdev_placement__"
              />
            }
          />
          <Route
            path="/academy/:courseId"
            element={<AcademyRouteWrapper participant={participantProfile} />}
          />
          <Route
            path="/academy/:courseId/:lessonId"
            element={<AcademyRouteWrapper participant={participantProfile} />}
          />

          <Route
            path="/register"
            element={
              <RegistrationView
                initialData={registeredUser}
                onSaveRegistration={handleSaveRegistration}
                onNavigate={handleNavigate}
                onOpenPrivacyNotice={() => setIsPrivacyModalOpen(true)}
              />
            }
          />

          <Route
            path="/challenge"
            element={
              <PlatoonChallengeView
                userPlatoon={registeredUser?.platoon}
                userName={registeredUser ? `${registeredUser.firstName} ${registeredUser.surname}` : undefined}
                userStateCode={registeredUser?.stateCode}
              />
            }
          />

          <Route path="/toolkit" element={<ToolkitView />} />

          <Route
            path="/community"
            element={
              <CommunityOptInView
                registeredUser={registeredUser}
                onUpdateOptIn={handleUpdateOptIn}
                onNavigateToRegistration={() => handleNavigate('register')}
              />
            }
          />

          <Route
            path="/pass"
            element={
              <SuccessView
                registrationId={registeredUser?.registrationId}
                onNavigate={handleNavigate}
              />
            }
          />
          <Route path="/success" element={<Navigate to="/pass" replace />} />

          <Route
            path="/admin"
            element={
              <>
                <WelcomeView
                  onNavigate={handleNavigate}
                  isRegistered={!!registeredUser}
                  onOpenPrivacyNotice={() => setIsPrivacyModalOpen(true)}
                />
                <AdminDashboardView onClose={handleCloseAdmin} />
              </>
            }
          />

          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </main>

      {/* Footer with FAQs and Privacy notice trigger */}
      <Footer onOpenPrivacyNotice={() => setIsPrivacyModalOpen(true)} />

      {/* Modals */}
      <PrivacyNoticeModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </div>
  );
}
