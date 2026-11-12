import React, { useState } from 'react';
import { ParticipantRegistration } from '../types';
import {
  Users,
  CheckCircle,
  MessageSquare,
  ShieldCheck,
  Send,
  Sparkles,
  HeartHandshake,
  BookOpen
} from 'lucide-react';

interface CommunityOptInViewProps {
  registeredUser: ParticipantRegistration | null;
  onUpdateOptIn: (communityOptIn: boolean, marketingConsent: boolean) => void;
  onNavigateToRegistration: () => void;
}

export const CommunityOptInView: React.FC<CommunityOptInViewProps> = ({
  registeredUser,
  onUpdateOptIn,
  onNavigateToRegistration
}) => {
  const [communityOptIn, setCommunityOptIn] = useState<boolean>(
    registeredUser?.communityOptIn ?? false
  );
  const [marketingConsent, setMarketingConsent] = useState<boolean>(
    registeredUser?.marketingConsent ?? false
  );
  const [feedback, setFeedback] = useState<string>('');

  const handleSavePreferences = () => {
    onUpdateOptIn(communityOptIn, marketingConsent);
    setFeedback('Your preferences were saved locally.');
    setTimeout(() => setFeedback(''), 3000);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-stone-900 tracking-tight">
              Digital Corps Peer Community
            </h2>
            <p className="text-xs text-stone-600">
              Optional, volunteer-led learning circles connecting corps members across Nigeria.
            </p>
          </div>
        </div>

        {feedback && (
          <div className="mt-3 p-2.5 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{feedback}</span>
          </div>
        )}
      </div>

      {/* Value of Joining */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-stone-900 text-base">
          Why Join the Peer Community?
        </h3>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          National service can feel isolated in rural PPAs. The Digital Corps community connects you with fellow corps members learning the same digital tools, so you never get stuck.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-stone-900">
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Study Accountability</span>
            </div>
            <p className="text-stone-600 text-[11px] leading-relaxed">
              Weekly 30-minute check-ins to share progress on spreadsheet tasks or AI prompts.
            </p>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-stone-900">
              <HeartHandshake className="w-4 h-4 text-emerald-600" />
              <span>Mentor Guidance</span>
            </div>
            <p className="text-stone-600 text-[11px] leading-relaxed">
              Occasional Q&A sessions with former NYSC alumni working in Nigerian tech firms.
            </p>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-stone-900">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>CDS Collaboration</span>
            </div>
            <p className="text-stone-600 text-[11px] leading-relaxed">
              Find partners to execute community literacy, health, or clean energy projects.
            </p>
          </div>
        </div>
      </div>

      {/* Independent Consent Choices */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <div>
          <h3 className="font-bold text-stone-900 text-base mb-1">
            Your Communication Preferences
          </h3>
          <p className="text-xs text-stone-500">
            Participation is 100% voluntary. You are never automatically subscribed.
          </p>
        </div>

        <div className="space-y-3 pt-1">
          {/* Option A */}
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-3">
            <input
              type="checkbox"
              id="communityToggle"
              checked={communityOptIn}
              onChange={(e) => setCommunityOptIn(e.target.checked)}
              className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
            />
            <label htmlFor="communityToggle" className="text-xs text-stone-700 cursor-pointer">
              <span className="font-bold text-stone-900 block">
                Join Platoon / State WhatsApp Peer Circle
              </span>
              Connect with serving corps members in your state for project coordination and mutual support.
            </label>
          </div>

          {/* Option B */}
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-3">
            <input
              type="checkbox"
              id="marketingToggle"
              checked={marketingConsent}
              onChange={(e) => setMarketingConsent(e.target.checked)}
              className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
            />
            <label htmlFor="marketingToggle" className="text-xs text-stone-700 cursor-pointer">
              <span className="font-bold text-stone-900 block">
                Receive Future Opportunity & Scholarship Announcements
              </span>
              Separate optional alerts regarding NITDA tech cohorts, Google scholarships, and youth grants.
            </label>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleSavePreferences}
            className="w-full sm:w-auto bg-[#046A38] hover:bg-[#03522b] text-white font-bold px-5 py-2.5 rounded-xl text-xs cursor-pointer shadow-xs transition-all active:scale-95"
          >
            Save Communication Preferences
          </button>

          {!registeredUser && (
            <button
              onClick={onNavigateToRegistration}
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
            >
              Register your participant pass first →
            </button>
          )}
        </div>

        <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-500 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>We respect your time. Group chats are strictly moderated against spam and unauthorized ads.</span>
        </div>
      </div>
    </div>
  );
};
