import React, { useState } from 'react';
import { QrCode, Copy, Check, ExternalLink, Download, Printer } from 'lucide-react';

interface QRCodeDisplayProps {
  appUrl: string;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ appUrl }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(appUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Standard high-reliability QR Code API generator URL (SVG/PNG) for projection & printouts
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(
    appUrl
  )}&margin=10&color=046a38`;

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-4 max-w-sm mx-auto text-center">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
          <QrCode className="w-3.5 h-3.5 text-emerald-700" />
          <span>Official Event Scan Code</span>
        </div>
        <h3 className="font-bold text-stone-900 text-base">
          Scan to Open Digital Corps Hub
        </h3>
        <p className="text-xs text-stone-500">
          Project on the camp hall screen or print for platoon pavilions.
        </p>
      </div>

      <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 inline-block shadow-inner">
        <img
          src={qrImageUrl}
          alt="Digital Corps Hub Event QR Code"
          className="w-48 h-48 mx-auto rounded-lg"
          loading="lazy"
        />
      </div>

      <div className="space-y-2">
        <div className="p-2 bg-stone-100 rounded-xl text-[11px] font-mono text-stone-700 break-all select-all">
          {appUrl}
        </div>

        <div className="flex items-center justify-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer shadow-xs transition-transform active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy App URL</span>
              </>
            )}
          </button>

          <a
            href={appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Link</span>
          </a>
        </div>
      </div>
    </div>
  );
};
