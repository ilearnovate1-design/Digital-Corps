import React, { useState } from 'react';
import { ShieldCheck, Heart, Phone, Mail, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { EVENT_INFO } from '../data/staticContent';

interface FooterProps {
  onOpenPrivacyNotice?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacyNotice }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const sampleFaqs = [
    {
      q: "How does the Platoon Rapid-Fire Quiz competition work?",
      a: "Registered corps members take the 10-question digital skills quiz. Scoring 6 or higher (6/10 to 10/10) qualifies your score for your platoon. The platoon with the highest number of distinct qualifying participants wins the Camp Digital Shield!"
    },
    {
      q: "What information is required during registration?",
      a: "Your full name, active Phone/WhatsApp number, Email address, NYSC State Code, Deployment State, and Platoon number (1-10). These compulsory details ensure your quiz scores and challenge entries are linked to your platoon challenge leaderboard standing."
    },
    {
      q: "Does using this app consume heavy mobile data on camp?",
      a: "No. The entire Digital Corps Hub is lightweight and offline-ready. All 5 learning tracks, AI prompt kits, ATS resume guides, and tutorials are cached directly on your device so you can study even with low or fluctuating camp network."
    },
    {
      q: "How does our platoon submit for the AI Platoon Challenge?",
      a: "Collaborate with your platoon members to design a practical 30-day technology solution for a local community issue. Your platoon representative submits the proposal via the Platoon Challenge tab before the camp deadline."
    },
    {
      q: "Who do I contact if I need technical or camp support?",
      a: "Visit the SAED Innovation Pavilion on camp, or call / WhatsApp the Camp Help Desk directly at 08110502600."
    }
  ];

  return (
    <footer className="bg-stone-900 text-stone-300 pt-8 pb-24 md:pb-12 mt-12 border-t border-stone-800 text-xs">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        
        {/* FAQs */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-stone-100">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-sm tracking-tight">Participant Quick Help</h3>
          </div>

          <div className="space-y-2">
            {sampleFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-stone-800 rounded-xl overflow-hidden bg-stone-850/60 transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-3 text-left font-medium text-stone-200 flex items-center justify-between gap-2 hover:text-white cursor-pointer"
                  >
                    <span className="text-xs">{faq.q}</span>
                    <span className="text-stone-500 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="p-3 pt-0 text-stone-400 text-xs leading-relaxed border-t border-stone-800/60 bg-stone-900/80">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Camp Help & Emergency Contacts */}
        <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-0.5 text-center sm:text-left">
            <h4 className="font-bold text-stone-100 text-xs">
              Camp SAED & Innovation Help Desk
            </h4>
            <p className="text-[11px] text-stone-400">
              For platoon coordination, registration assistance, or technical support during orientation camp.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="tel:08110502600"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-700 hover:bg-stone-600 text-stone-100 text-xs font-semibold cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>08110502600</span>
            </a>
            <a
              href="https://wa.me/2348110502600"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold cursor-pointer"
            >
              <span>WhatsApp Desk</span>
            </a>
            {onOpenPrivacyNotice && (
              <button
                onClick={onOpenPrivacyNotice}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-800 hover:bg-emerald-900 text-emerald-200 text-xs font-semibold cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Privacy Notice</span>
              </button>
            )}
          </div>
        </div>

        {/* Independent Platform Disclaimer */}
        <div className="p-3.5 bg-stone-950/70 border border-stone-800 rounded-xl text-[11px] text-stone-400 leading-relaxed space-y-1">
          <p className="text-amber-300/90 font-bold">
            Notice & Disclaimer: Independent Digital Skills & Community Engagement Platform
          </p>
          <p>
            Digital Corps Hub is an independent platform built to support corps members with practical digital skills, career readiness, and community engagement. This is <strong>not an official NYSC platform</strong>, and participation or project records submitted on this site <strong>do not replace official NYSC CDS reporting, biometric attendance, or official clearance procedures</strong>. Official NYSC directives and clearance remain strictly under the purview of official NYSC authorities and portals.
          </p>
        </div>

        {/* Footer bottom legal & credits */}
        <div className="border-t border-stone-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-500 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Digital Corps Hub • Independent Digital Skills & Community Engagement</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Zero-read local bundle</span>
            <span>•</span>
            <button
              onClick={onOpenPrivacyNotice}
              className="hover:text-stone-300 underline cursor-pointer"
            >
              Data Privacy & Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
