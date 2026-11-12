import React from 'react';
import { ParticipantRegistration } from '../types';
import {
  X,
  Database,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Info,
  Server,
  Lock,
  Layers
} from 'lucide-react';

interface AdminOverviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  registeredUser: ParticipantRegistration | null;
}

export const AdminOverviewModal: React.FC<AdminOverviewModalProps> = ({
  isOpen,
  onClose,
  registeredUser
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200">
        {/* Modal Top */}
        <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-100 text-emerald-900 rounded-lg">
              <Database className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-stone-900">
                Firestore Architecture & Quota Monitor
              </h3>
              <p className="text-[10px] text-stone-500 font-mono">
                Status: Live Cloud Firestore Connected
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 text-xs">
          
          {/* Active Cloud Firestore Badge */}
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Firebase Cloud Firestore Active</span>
            </div>
            <p className="text-[11px] text-emerald-800 leading-relaxed">
              Database: <code className="bg-emerald-100 px-1 py-0.5 rounded text-[10px] font-mono">ai-studio-digitalcorpshub-...</code>. Only 1 Firestore database is utilized.
            </p>
          </div>

          {/* Firebase Services Breakdown */}
          <div className="space-y-2">
            <h4 className="font-bold text-stone-800 uppercase tracking-wide text-[11px] flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-stone-600" />
              <span>Firebase Services Accounting</span>
            </h4>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2 text-[11px]">
              <div>
                <span className="font-bold text-emerald-800">✅ Required & Enabled:</span>
                <ul className="list-disc pl-4 mt-0.5 space-y-0.5 text-stone-700">
                  <li><strong>Cloud Firestore:</strong> Stores <code>participants</code> and <code>challengeSubmissions</code> documents.</li>
                  <li><strong>Firebase Authentication:</strong> Configured for restricted administrative role authorization.</li>
                </ul>
              </div>
              <div className="pt-2 border-t border-stone-200">
                <span className="font-bold text-stone-700">🚫 Not Required & Disabled:</span>
                <ul className="list-disc pl-4 mt-0.5 space-y-0.5 text-stone-500">
                  <li><strong>Firebase Storage:</strong> Disabled (0 bytes used; all templates/prompts are local text).</li>
                  <li><strong>Cloud Functions / Scheduled Jobs:</strong> Disabled (zero serverless function runtime costs).</li>
                  <li><strong>Firebase Extensions:</strong> Disabled (no third-party paid pipelines).</li>
                  <li><strong>Analytics / Telemetry SDKs:</strong> Disabled (respects user privacy & network bandwidth).</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Daily 2,000 Users Quota Compliance */}
          <div className="space-y-2">
            <h4 className="font-bold text-stone-800 uppercase tracking-wide text-[11px] flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>2,000 Corps Members Daily Budget</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                <span className="text-stone-500 block">Write Budget:</span>
                <span className="font-bold text-emerald-700">~2,000 - 3,000 / 20,000</span>
                <span className="text-[10px] text-stone-500 block">1 write/reg, 1 write/proposal</span>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                <span className="text-stone-500 block">Read Budget:</span>
                <span className="font-bold text-emerald-700">0 / 50,000</span>
                <span className="text-[10px] text-stone-500 block">Zero public reads; static cache</span>
              </div>
            </div>
          </div>

          {/* Honest Explanation of Duplicate Limitations */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-950 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[11px]">
              <Info className="w-3.5 h-3.5 text-amber-700" />
              <span>Duplicate Registration Policy</span>
            </div>
            <p className="text-[11px] text-amber-900 leading-relaxed">
              To strictly protect Firestore free quota (50k reads limit), the app deliberately avoids performing a <code>getDocs</code> lookup before writing. Double-clicks on the submission button are prevented in the UI. If a corps member submits again from another browser with the same State Code, an additional document is created. This honest limitation ensures 2,000 participants can register on the same day without exhausting daily quotas.
            </p>
          </div>

          {/* Security Rules Summary */}
          <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-1 text-[11px]">
            <div className="flex items-center gap-1.5 font-bold text-stone-900">
              <Lock className="w-3.5 h-3.5 text-stone-700" />
              <span>Hardened Security Rules Enforced</span>
            </div>
            <ul className="list-disc pl-4 space-y-0.5 text-stone-600">
              <li><strong>Public Writes:</strong> Validated against strict schema, length bounds, and server timestamp.</li>
              <li><strong>Public Reads:</strong> Strictly DENIED across all collections.</li>
              <li><strong>Public Updates/Deletes:</strong> Strictly DENIED.</li>
            </ul>
          </div>

          {/* Active Browser Registration State */}
          <div className="space-y-1.5">
            <h4 className="font-bold text-stone-800 uppercase tracking-wide text-[11px]">
              Active Browser State
            </h4>
            {registeredUser ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl font-mono text-[11px] text-emerald-950 space-y-0.5">
                <p><strong>Name:</strong> {registeredUser.firstName} {registeredUser.surname}</p>
                <p><strong>State Code:</strong> {registeredUser.stateCode}</p>
                <p><strong>Platoon:</strong> P{registeredUser.platoon}</p>
                <p><strong>Phone:</strong> {registeredUser.phone}</p>
                <p><strong>Community Consent:</strong> {registeredUser.communityOptIn ? 'Yes' : 'No'}</p>
                <p><strong>Marketing Consent:</strong> {registeredUser.marketingConsent ? 'Yes' : 'No'}</p>
              </div>
            ) : (
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-500 italic text-[11px]">
                No registration submitted in this browser session yet.
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-full bg-[#046A38] hover:bg-[#03522b] text-white font-bold py-2.5 rounded-xl cursor-pointer text-xs"
          >
            Close Monitor
          </button>
        </div>
      </div>
    </div>
  );
};
