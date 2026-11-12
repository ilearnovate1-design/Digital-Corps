import React from 'react';
import { PRIVACY_NOTICE } from '../data/staticContent';
import { ShieldCheck, X, CheckCircle2 } from 'lucide-react';

interface PrivacyNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyNoticeModal: React.FC<PrivacyNoticeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-stone-200">
        <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50 rounded-t-2xl sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-stone-900">
                {PRIVACY_NOTICE.title}
              </h3>
              <p className="text-[10px] text-stone-500 font-mono">
                {PRIVACY_NOTICE.effectiveDate} • Zero-Tracker Policy
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

        <div className="p-5 space-y-4 text-xs">
          <p className="text-stone-700 font-medium leading-relaxed bg-emerald-50/60 p-3 rounded-xl border border-emerald-100">
            {PRIVACY_NOTICE.summary}
          </p>

          <div className="p-3 bg-stone-100 rounded-xl border border-stone-200 space-y-1 text-stone-700">
            <p><strong>Data Controller:</strong> {PRIVACY_NOTICE.dataController}</p>
            <p><strong>Organizer Email:</strong> <a href={`mailto:${PRIVACY_NOTICE.contactEmail}`} className="text-emerald-700 underline">{PRIVACY_NOTICE.contactEmail}</a></p>
            <p><strong>Camp Support Helpline:</strong> <a href={`tel:${PRIVACY_NOTICE.contactPhone}`} className="text-emerald-700 underline">{PRIVACY_NOTICE.contactPhone}</a></p>
          </div>

          <div className="space-y-3">
            {PRIVACY_NOTICE.keyPoints.map((point, idx) => (
              <div key={idx} className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <div className="flex items-center gap-1.5 font-bold text-stone-900 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{point.heading}</span>
                </div>
                <p className="text-stone-600 leading-relaxed pl-5.5">
                  {point.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full bg-[#046A38] hover:bg-[#03522b] text-white font-bold py-2.5 rounded-xl cursor-pointer text-xs"
            >
              I Understand & Close Notice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
