import React, { useState } from 'react';
import {
  MessageSquare,
  Mail,
  ExternalLink,
  Copy,
  Check,
  Send,
  User,
  ShieldCheck,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { ParticipantRecordItem } from '../services/adminService';
import {
  MESSAGE_TEMPLATES,
  formatWhatsAppNumber,
  getWhatsAppUrl,
  getGmailComposeUrl,
  getMailtoUrl,
  fillMessageTemplate,
  logMessagingAudit
} from '../services/messagingService';

interface DirectMessageModalProps {
  participant: ParticipantRecordItem | null;
  adminEmail: string;
  onClose: () => void;
}

export const DirectMessageModal: React.FC<DirectMessageModalProps> = ({
  participant,
  adminEmail,
  onClose
}) => {
  if (!participant) return null;

  const [channel, setChannel] = useState<'whatsapp' | 'email'>(
    participant.phone ? 'whatsapp' : 'email'
  );
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('welcome');
  const [subject, setSubject] = useState<string>(
    MESSAGE_TEMPLATES[0].defaultSubject
  );
  const [body, setBody] = useState<string>(() =>
    fillMessageTemplate(MESSAGE_TEMPLATES[0].body, participant)
  );
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [dispatchStatus, setDispatchStatus] = useState<string | null>(null);

  const formattedPhone = formatWhatsAppNumber(participant.phone);
  const hasPhone = Boolean(participant.phone && formattedPhone);
  const hasEmail = Boolean(participant.email);

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplateId(templateId);
    const tmpl = MESSAGE_TEMPLATES.find((t) => t.id === templateId);
    if (tmpl) {
      setSubject(fillMessageTemplate(tmpl.defaultSubject, participant));
      setBody(fillMessageTemplate(tmpl.body, participant));
    }
  };

  const handleOpenWhatsApp = () => {
    if (!participant.phone) return;
    const url = getWhatsAppUrl(participant.phone, body);
    window.open(url, '_blank', 'noopener,noreferrer');
    setDispatchStatus('WhatsApp conversation opened');
    logMessagingAudit(
      adminEmail,
      'DIRECT_MESSAGE_SENT',
      `Sent WhatsApp message (${selectedTemplateId}) to ${participant.firstName} ${participant.surname} (${participant.phone})`
    );
  };

  const handleOpenGmail = () => {
    if (!participant.email) return;
    const url = getGmailComposeUrl(participant.email, subject, body);
    window.open(url, '_blank', 'noopener,noreferrer');
    setDispatchStatus('Gmail composer opened');
    logMessagingAudit(
      adminEmail,
      'DIRECT_MESSAGE_SENT',
      `Sent Email via Gmail (${selectedTemplateId}) to ${participant.firstName} ${participant.surname} (${participant.email})`
    );
  };

  const handleOpenMailto = () => {
    if (!participant.email) return;
    const url = getMailtoUrl(participant.email, subject, body);
    window.location.href = url;
    setDispatchStatus('Default mail client launched');
    logMessagingAudit(
      adminEmail,
      'DIRECT_MESSAGE_SENT',
      `Sent Email via default client (${selectedTemplateId}) to ${participant.firstName} ${participant.surname} (${participant.email})`
    );
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(
      channel === 'email' ? `Subject: ${subject}\n\n${body}` : body
    );
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleCopyWhatsAppLink = () => {
    if (!participant.phone) return;
    const url = getWhatsAppUrl(participant.phone, body);
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-stone-200 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-200 bg-stone-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-sm">
                Message Participant
              </h3>
              <p className="text-[11px] text-stone-500">
                Direct WhatsApp & Email Communication
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-1.5 rounded-lg hover:bg-stone-200 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Participant Mini Card */}
          <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                <User className="w-4 h-4 text-stone-500" />
                <span>
                  {participant.firstName} {participant.surname}
                </span>
                {participant.stateCode && (
                  <span className="font-mono text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                    {participant.stateCode}
                  </span>
                )}
              </div>
              <div className="text-[11px] text-stone-500 flex items-center gap-2">
                <span>
                  {participant.platoon ? `Platoon ${participant.platoon}` : 'Platoon unassigned'}
                </span>
                <span>•</span>
                <span>{participant.deploymentState || 'Camp'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono">
              {participant.phone ? (
                <span className="bg-emerald-50 text-emerald-900 border border-emerald-200 px-2 py-1 rounded-md flex items-center gap-1 font-semibold">
                  <PhoneCall className="w-3 h-3 text-emerald-600" />
                  {participant.phone}
                </span>
              ) : (
                <span className="text-stone-400 italic">No phone</span>
              )}
              {participant.email ? (
                <span className="bg-blue-50 text-blue-900 border border-blue-200 px-2 py-1 rounded-md flex items-center gap-1 font-semibold truncate max-w-[180px]">
                  <Mail className="w-3 h-3 text-blue-600" />
                  {participant.email}
                </span>
              ) : (
                <span className="text-stone-400 italic">No email</span>
              )}
            </div>
          </div>

          {/* Channel Selector */}
          <div>
            <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Select Delivery Channel
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setChannel('whatsapp')}
                disabled={!hasPhone}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                  channel === 'whatsapp'
                    ? 'bg-emerald-600 border-emerald-700 text-white shadow-xs'
                    : hasPhone
                    ? 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    : 'bg-stone-100 border-stone-200 text-stone-400 cursor-not-allowed opacity-60'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Message</span>
                {!hasPhone && <span className="text-[10px] font-normal">(No Phone)</span>}
              </button>

              <button
                type="button"
                onClick={() => setChannel('email')}
                disabled={!hasEmail}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                  channel === 'email'
                    ? 'bg-blue-600 border-blue-700 text-white shadow-xs'
                    : hasEmail
                    ? 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    : 'bg-stone-100 border-stone-200 text-stone-400 cursor-not-allowed opacity-60'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Email Message</span>
                {!hasEmail && <span className="text-[10px] font-normal">(No Email)</span>}
              </button>
            </div>
          </div>

          {/* Template Selector */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider">
                Message Template
              </label>
              <span className="text-[10px] text-stone-500 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Auto-fills name, state code & platoon
              </span>
            </div>
            <select
              value={selectedTemplateId}
              onChange={(e) => handleTemplateChange(e.target.value)}
              className="w-full p-2 border border-stone-300 rounded-xl bg-white text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            >
              {MESSAGE_TEMPLATES.map((tmpl) => (
                <option key={tmpl.id} value={tmpl.id}>
                  {tmpl.name}
                </option>
              ))}
            </select>
          </div>

          {/* Email Subject Line (Only shown for Email) */}
          {channel === 'email' && (
            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                Email Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2 border border-stone-300 rounded-xl bg-white text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          )}

          {/* Message Body */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] font-bold text-stone-700">
                {channel === 'whatsapp' ? 'WhatsApp Message Content' : 'Email Body'}
              </label>
              <span className="text-[10px] font-mono text-stone-400">
                {body.length} characters
              </span>
            </div>
            <textarea
              rows={channel === 'whatsapp' ? 8 : 7}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-3 border border-stone-300 rounded-xl bg-white text-xs font-sans leading-relaxed focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              placeholder="Type your message here..."
            />
          </div>

          {/* Feedback banner */}
          {dispatchStatus && (
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-[11px] flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-semibold">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                {dispatchStatus}
              </span>
              <span className="text-[10px] text-emerald-700">Logged in admin audit</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 border-t border-stone-200 bg-stone-50 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyText}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-stone-300 hover:bg-stone-100 text-stone-700 rounded-xl text-xs font-semibold cursor-pointer"
            >
              {copiedText ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied Text</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-500" />
                  <span>Copy Text</span>
                </>
              )}
            </button>

            {channel === 'whatsapp' && hasPhone && (
              <button
                type="button"
                onClick={handleCopyWhatsAppLink}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-stone-300 hover:bg-stone-100 text-stone-700 rounded-xl text-xs font-semibold cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied Link</span>
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
                    <span>Copy wa.me Link</span>
                  </>
                )}
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {channel === 'whatsapp' ? (
              <button
                type="button"
                onClick={handleOpenWhatsApp}
                disabled={!hasPhone}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer shadow-xs disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Open in WhatsApp</span>
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleOpenMailto}
                  disabled={!hasEmail}
                  className="inline-flex items-center gap-1 px-3 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl text-xs font-bold cursor-pointer disabled:opacity-50"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Mail Client</span>
                </button>
                <button
                  type="button"
                  onClick={handleOpenGmail}
                  disabled={!hasEmail}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Compose in Gmail</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
