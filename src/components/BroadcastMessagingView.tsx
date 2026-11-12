import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Mail,
  Send,
  Users,
  Filter,
  Copy,
  Check,
  Download,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  RefreshCw,
  PhoneCall,
  ShieldCheck,
  AlertCircle,
  FileText
} from 'lucide-react';
import { ParticipantRecordItem } from '../services/adminService';
import {
  MESSAGE_TEMPLATES,
  BroadcastFilter,
  fetchParticipantsForBroadcast,
  formatWhatsAppNumber,
  getWhatsAppUrl,
  getGmailComposeUrl,
  getMailtoUrl,
  fillMessageTemplate,
  logMessagingAudit
} from '../services/messagingService';

interface BroadcastMessagingViewProps {
  adminEmail: string;
}

export const BroadcastMessagingView: React.FC<BroadcastMessagingViewProps> = ({ adminEmail }) => {
  // Audience Filter State
  const [selectedPlatoon, setSelectedPlatoon] = useState<number>(0);
  const [communityOnly, setCommunityOnly] = useState<boolean>(false);
  const [marketingOnly, setMarketingOnly] = useState<boolean>(false);
  const [channelFilter, setChannelFilter] = useState<'all' | 'hasPhone' | 'hasEmail'>('all');

  // Loaded Recipients State
  const [recipients, setRecipients] = useState<ParticipantRecordItem[]>([]);
  const [isLoadingRecipients, setIsLoadingRecipients] = useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  // Message Composer State
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('welcome');
  const [subject, setSubject] = useState<string>(MESSAGE_TEMPLATES[0].defaultSubject);
  const [bodyTemplate, setBodyTemplate] = useState<string>(MESSAGE_TEMPLATES[0].body);

  // Active Broadcast Channel View: 'whatsapp' | 'email'
  const [activeChannel, setActiveChannel] = useState<'whatsapp' | 'email'>('whatsapp');

  // 1-by-1 WhatsApp Queue Runner State
  const [queueIndex, setQueueIndex] = useState(0);
  const [dispatchedIds, setDispatchedIds] = useState<Set<string>>(new Set());

  // Copy feedback state
  const [copiedEmails, setCopiedEmails] = useState(false);
  const [copiedPhones, setCopiedPhones] = useState(false);
  const [logStatus, setLogStatus] = useState<string | null>(null);

  // Fetch recipients based on current filter
  const handleFetchRecipients = async () => {
    setIsLoadingRecipients(true);
    setLogStatus(null);
    try {
      const filter: BroadcastFilter = {
        platoon: selectedPlatoon,
        communityOnly,
        marketingOnly,
        channelFilter
      };
      const items = await fetchParticipantsForBroadcast(filter);
      setRecipients(items);
      setQueueIndex(0);
      setHasLoadedOnce(true);
    } catch (err) {
      console.error('Failed to fetch broadcast recipients:', err);
    } finally {
      setIsLoadingRecipients(false);
    }
  };

  // Handle template selection
  const handleTemplateSelect = (tmplId: string) => {
    setSelectedTemplateId(tmplId);
    const tmpl = MESSAGE_TEMPLATES.find((t) => t.id === tmplId);
    if (tmpl) {
      setSubject(tmpl.defaultSubject);
      setBodyTemplate(tmpl.body);
    }
  };

  // Extract phone numbers and emails
  const validPhoneRecipients = recipients.filter((r) => Boolean(r.phone && formatWhatsAppNumber(r.phone)));
  const validEmailRecipients = recipients.filter((r) => Boolean(r.email));

  const allEmails = validEmailRecipients.map((r) => r.email!).filter(Boolean);
  const allPhonesFormatted = validPhoneRecipients
    .map((r) => formatWhatsAppNumber(r.phone))
    .filter(Boolean);

  // Copy all BCC emails
  const handleCopyAllEmails = () => {
    if (allEmails.length === 0) return;
    navigator.clipboard.writeText(allEmails.join(', '));
    setCopiedEmails(true);
    setTimeout(() => setCopiedEmails(false), 2000);
  };

  // Copy all WhatsApp numbers
  const handleCopyAllPhones = () => {
    if (allPhonesFormatted.length === 0) return;
    // Format with + prefix e.g. +2348110502600
    const formatted = allPhonesFormatted.map((p) => `+${p}`).join(', ');
    navigator.clipboard.writeText(formatted);
    setCopiedPhones(true);
    setTimeout(() => setCopiedPhones(false), 2000);
  };

  // Open Gmail with all emails in BCC
  const handleOpenGmailBcc = () => {
    if (allEmails.length === 0) return;
    // Sample first recipient for placeholder preview in template
    const sampleRecipient = validEmailRecipients[0] || {};
    const sampleBody = fillMessageTemplate(bodyTemplate, sampleRecipient);
    const sampleSubject = fillMessageTemplate(subject, sampleRecipient);

    const url = getGmailComposeUrl(allEmails, sampleSubject, sampleBody, true);
    window.open(url, '_blank', 'noopener,noreferrer');

    logMessagingAudit(
      adminEmail,
      'MESSAGE_BROADCAST',
      `Opened Gmail BCC broadcast for ${allEmails.length} recipients (Template: ${selectedTemplateId}, Platoon: ${selectedPlatoon || 'All'})`
    );
    setLogStatus(`Gmail BCC opened for ${allEmails.length} recipients`);
  };

  // Open default mail client with BCC
  const handleOpenMailtoBcc = () => {
    if (allEmails.length === 0) return;
    const sampleRecipient = validEmailRecipients[0] || {};
    const sampleBody = fillMessageTemplate(bodyTemplate, sampleRecipient);
    const sampleSubject = fillMessageTemplate(subject, sampleRecipient);

    const url = getMailtoUrl(allEmails, sampleSubject, sampleBody, true);
    window.location.href = url;

    logMessagingAudit(
      adminEmail,
      'MESSAGE_BROADCAST',
      `Opened mailto BCC broadcast for ${allEmails.length} recipients (Template: ${selectedTemplateId})`
    );
    setLogStatus(`Default mail client launched with ${allEmails.length} BCC recipients`);
  };

  // WhatsApp queue runner
  const currentQueueParticipant = validPhoneRecipients[queueIndex];

  const handleSendCurrentWhatsApp = () => {
    if (!currentQueueParticipant || !currentQueueParticipant.phone) return;
    const personalizedMessage = fillMessageTemplate(bodyTemplate, currentQueueParticipant);
    const url = getWhatsAppUrl(currentQueueParticipant.phone, personalizedMessage);
    window.open(url, '_blank', 'noopener,noreferrer');

    setDispatchedIds((prev) => new Set(prev).add(currentQueueParticipant.id));

    // Automatically advance to next after sending if not last
    if (queueIndex < validPhoneRecipients.length - 1) {
      setQueueIndex((idx) => idx + 1);
    }
  };

  // Download phone numbers text file
  const handleDownloadContactsTxt = () => {
    if (recipients.length === 0) return;
    const lines = [
      'NYSC Digital Corps Hub — Participant Contact List',
      `Generated: ${new Date().toLocaleString()}`,
      `Filter: Platoon ${selectedPlatoon || 'All'}, Community Consent: ${communityOnly ? 'Yes' : 'Any'}`,
      '-------------------------------------------------------',
      'Name | Phone | Email | Platoon | State Code',
      ...recipients.map(
        (r) =>
          `${r.firstName} ${r.surname} | ${r.phone || 'N/A'} | ${r.email || 'N/A'} | P${r.platoon || '—'} | ${r.stateCode || 'N/A'}`
      )
    ].join('\n');

    const blob = new Blob([lines], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `digital_corps_contacts_platoon_${selectedPlatoon || 'all'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-4 bg-gradient-to-r from-emerald-800 to-stone-900 text-white rounded-2xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-600/60 rounded-lg">
              <MessageSquare className="w-4 h-4 text-emerald-200" />
            </span>
            <h3 className="font-bold text-sm tracking-tight">
              Broadcast & Direct Messaging Center
            </h3>
          </div>
          <p className="text-[11px] text-emerald-100/90 leading-relaxed max-w-xl">
            Reach registered corps members via WhatsApp and Email. Filter by Platoon, Community Consent, or Digital Tracks with zero risk of BCC email leaks.
          </p>
        </div>

        <button
          type="button"
          onClick={handleFetchRecipients}
          disabled={isLoadingRecipients}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 cursor-pointer flex items-center gap-2 shadow-xs transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoadingRecipients ? 'animate-spin' : ''}`} />
          <span>{hasLoadedOnce ? 'Refresh Audience' : 'Load Matching Audience'}</span>
        </button>
      </div>

      {/* Grid: Filters & Settings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Audience Segmenter */}
        <div className="p-4 bg-white border border-stone-200 rounded-2xl shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-xs">
            <Filter className="w-3.5 h-3.5 text-emerald-700" />
            <span>Target Audience Segment</span>
          </div>

          {/* Platoon Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-stone-700 mb-1">
              Platoon
            </label>
            <select
              value={selectedPlatoon}
              onChange={(e) => setSelectedPlatoon(Number(e.target.value))}
              className="w-full p-2 border border-stone-300 rounded-xl bg-white text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            >
              <option value={0}>All Platoons (Camp-wide)</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  Platoon {num}
                </option>
              ))}
            </select>
          </div>

          {/* Consent Checkboxes */}
          <div className="space-y-2 pt-1">
            <label className="flex items-center gap-2 text-[11px] text-stone-700 cursor-pointer">
              <input
                type="checkbox"
                checked={communityOnly}
                onChange={(e) => setCommunityOnly(e.target.checked)}
                className="rounded border-stone-300 text-emerald-700 focus:ring-emerald-500"
              />
              <span>Community Opt-In only (NDPR Safe)</span>
            </label>

            <label className="flex items-center gap-2 text-[11px] text-stone-700 cursor-pointer">
              <input
                type="checkbox"
                checked={marketingOnly}
                onChange={(e) => setMarketingOnly(e.target.checked)}
                className="rounded border-stone-300 text-emerald-700 focus:ring-emerald-500"
              />
              <span>Marketing Consent only</span>
            </label>
          </div>

          {/* Channel Availability Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-stone-700 mb-1">
              Contact Channel Requirement
            </label>
            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value as any)}
              className="w-full p-2 border border-stone-300 rounded-xl bg-white text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            >
              <option value="all">Any Available Channel</option>
              <option value="hasPhone">Must have WhatsApp Phone</option>
              <option value="hasEmail">Must have Verified Email</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleFetchRecipients}
            disabled={isLoadingRecipients}
            className="w-full mt-2 bg-stone-900 hover:bg-stone-800 text-white font-bold py-2 px-3 rounded-xl text-xs cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Apply Filter & Load List</span>
          </button>
        </div>

        {/* Template & Message Customizer */}
        <div className="md:col-span-2 p-4 bg-white border border-stone-200 rounded-2xl shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Message Template & Content</span>
            </div>
            <span className="text-[10px] text-stone-400 font-mono">
              Supports {'{firstName}'}, {'{stateCode}'}, {'{platoon}'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                Choose Campaign Template
              </label>
              <select
                value={selectedTemplateId}
                onChange={(e) => handleTemplateSelect(e.target.value)}
                className="w-full p-2 border border-stone-300 rounded-xl bg-white text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              >
                {MESSAGE_TEMPLATES.map((tmpl) => (
                  <option key={tmpl.id} value={tmpl.id}>
                    {tmpl.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                Email Subject Line
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2 border border-stone-300 rounded-xl bg-white text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] font-semibold text-stone-700">
                Message Body
              </label>
              <span className="text-[10px] font-mono text-stone-400">
                {bodyTemplate.length} chars
              </span>
            </div>
            <textarea
              rows={5}
              value={bodyTemplate}
              onChange={(e) => setBodyTemplate(e.target.value)}
              className="w-full p-2.5 border border-stone-300 rounded-xl bg-white text-xs font-sans leading-relaxed focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              placeholder="Draft your message content..."
            />
          </div>
        </div>
      </div>

      {/* Recipient Audience Summary Badges */}
      <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-stone-900">
            <Users className="w-4 h-4 text-stone-500" />
            <span>Audience Loaded:</span>
            <span className="bg-stone-200 text-stone-800 px-2 py-0.5 rounded-full font-mono text-xs">
              {recipients.length}
            </span>
          </div>

          <div className="flex items-center gap-1 text-emerald-800 font-semibold text-[11px]">
            <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp Ready:</span>
            <span className="bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-md font-mono font-bold">
              {validPhoneRecipients.length}
            </span>
          </div>

          <div className="flex items-center gap-1 text-blue-800 font-semibold text-[11px]">
            <Mail className="w-3.5 h-3.5 text-blue-600" />
            <span>Email Ready:</span>
            <span className="bg-blue-100 text-blue-900 px-2 py-0.5 rounded-md font-mono font-bold">
              {validEmailRecipients.length}
            </span>
          </div>
        </div>

        {recipients.length > 0 && (
          <button
            type="button"
            onClick={handleDownloadContactsTxt}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-300 hover:bg-stone-100 text-stone-700 rounded-xl text-xs font-semibold cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-stone-500" />
            <span>Download Contact List</span>
          </button>
        )}
      </div>

      {/* Log Feedback Banner */}
      {logStatus && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs flex items-center justify-between">
          <span className="flex items-center gap-2 font-semibold">
            <Check className="w-4 h-4 text-emerald-600" />
            {logStatus}
          </span>
          <span className="text-[11px] text-emerald-700 font-mono">Recorded in Audit Log</span>
        </div>
      )}

      {/* Two Delivery Channel Tabs */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
          <button
            type="button"
            onClick={() => setActiveChannel('whatsapp')}
            className={`px-4 py-2 rounded-xl font-bold text-xs cursor-pointer transition-all flex items-center gap-2 ${
              activeChannel === 'whatsapp'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Dispatch ({validPhoneRecipients.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveChannel('email')}
            className={`px-4 py-2 rounded-xl font-bold text-xs cursor-pointer transition-all flex items-center gap-2 ${
              activeChannel === 'email'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Email Broadcast / BCC ({validEmailRecipients.length})</span>
          </button>
        </div>

        {/* CHANNEL 1: WHATSAPP DISPATCH */}
        {activeChannel === 'whatsapp' && (
          <div className="space-y-4">
            {/* WhatsApp Quick Actions Card */}
            <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                  <PhoneCall className="w-4 h-4 text-emerald-700" />
                  <span>WhatsApp Broadcast List & Bulk Outreach</span>
                </h4>
                <p className="text-[11px] text-stone-600 mt-0.5 leading-relaxed">
                  Copy formatted phone numbers (+234...) directly into your WhatsApp Broadcast List, or step through participants one-by-one with personal auto-fill.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCopyAllPhones}
                disabled={validPhoneRecipients.length === 0}
                className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 cursor-pointer disabled:opacity-50 transition-colors shadow-xs"
              >
                {copiedPhones ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Numbers Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy All ({validPhoneRecipients.length}) Numbers</span>
                  </>
                )}
              </button>
            </div>

            {/* 1-by-1 WhatsApp Queue Runner */}
            {validPhoneRecipients.length > 0 ? (
              <div className="p-5 bg-white border border-stone-200 rounded-2xl shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div>
                    <span className="font-bold text-stone-900 text-xs">
                      Personalized 1-by-1 WhatsApp Dispatch Runner
                    </span>
                    <p className="text-[11px] text-stone-500">
                      Step through corps members with personalized names and platoon credentials pre-filled.
                    </p>
                  </div>
                  <div className="text-xs font-mono font-bold bg-stone-100 text-stone-800 px-2.5 py-1 rounded-lg">
                    {queueIndex + 1} of {validPhoneRecipients.length}
                  </div>
                </div>

                {currentQueueParticipant && (
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900 text-sm">
                          {currentQueueParticipant.firstName} {currentQueueParticipant.surname}
                        </span>
                        {currentQueueParticipant.stateCode && (
                          <span className="font-mono text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                            {currentQueueParticipant.stateCode}
                          </span>
                        )}
                        {dispatchedIds.has(currentQueueParticipant.id) && (
                          <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 font-bold">
                            <Check className="w-3 h-3" /> Sent
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-stone-600 flex items-center gap-2">
                        <span>
                          {currentQueueParticipant.platoon
                            ? `Platoon ${currentQueueParticipant.platoon}`
                            : 'Platoon unassigned'}
                        </span>
                        <span>•</span>
                        <span className="font-mono font-semibold text-stone-800">
                          {currentQueueParticipant.phone}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={handleSendCurrentWhatsApp}
                        className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer shadow-xs transition-colors"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Open WhatsApp for {currentQueueParticipant.firstName}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Queue Navigator */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => setQueueIndex((idx) => Math.max(0, idx - 1))}
                    disabled={queueIndex === 0}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold cursor-pointer disabled:opacity-40"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <div className="text-[11px] text-stone-500">
                    Dispatched so far: <span className="font-bold text-emerald-700">{dispatchedIds.size}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setQueueIndex((idx) => Math.min(validPhoneRecipients.length - 1, idx + 1))
                    }
                    disabled={queueIndex >= validPhoneRecipients.length - 1}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold cursor-pointer disabled:opacity-40"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center bg-stone-50 rounded-2xl border border-stone-200 text-stone-500">
                <p className="font-medium text-xs">
                  {hasLoadedOnce
                    ? 'No participants found with WhatsApp phone numbers matching your current filter.'
                    : 'Tap "Load Matching Audience" above to load registered participants.'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* CHANNEL 2: EMAIL BROADCAST / BCC */}
        {activeChannel === 'email' && (
          <div className="space-y-4">
            {/* Email Broadcast Action Card */}
            <div className="p-5 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-blue-700" />
                    <span>BCC-Protected Bulk Email Dispatch</span>
                  </h4>
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    All recipient email addresses are automatically placed in the <strong className="text-stone-900">BCC (Blind Carbon Copy)</strong> field. Participants will never see each other's private email addresses, strictly adhering to NDPR privacy standards.
                  </p>
                </div>

                <span className="text-[11px] bg-blue-200 text-blue-900 font-mono font-bold px-2 py-0.5 rounded shrink-0">
                  {allEmails.length} Recipients
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleOpenGmailBcc}
                  disabled={allEmails.length === 0}
                  className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer shadow-xs disabled:opacity-50 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Open in Gmail (BCC)</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenMailtoBcc}
                  disabled={allEmails.length === 0}
                  className="inline-flex items-center gap-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer disabled:opacity-50 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Default Mail Client (BCC)</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyAllEmails}
                  disabled={allEmails.length === 0}
                  className="inline-flex items-center gap-1.5 bg-white border border-stone-300 hover:bg-stone-100 text-stone-700 px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer disabled:opacity-50 transition-colors"
                >
                  {copiedEmails ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied {allEmails.length} Emails</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-stone-500" />
                      <span>Copy All ({allEmails.length}) Emails</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Email List Preview */}
            {validEmailRecipients.length > 0 ? (
              <div className="p-4 bg-white border border-stone-200 rounded-2xl shadow-xs space-y-3">
                <span className="font-bold text-stone-900 text-xs block">
                  Recipient Email Preview (First 20)
                </span>
                <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto p-2 bg-stone-50 rounded-xl border border-stone-200">
                  {validEmailRecipients.slice(0, 30).map((r) => (
                    <span
                      key={r.id}
                      className="inline-flex items-center gap-1 text-[11px] bg-white border border-stone-200 px-2 py-0.5 rounded-md text-stone-700 font-mono"
                    >
                      <span>{r.firstName}:</span>
                      <span className="text-blue-700">{r.email}</span>
                    </span>
                  ))}
                  {validEmailRecipients.length > 30 && (
                    <span className="text-[11px] text-stone-500 px-2 py-0.5 italic">
                      + {validEmailRecipients.length - 30} more recipients
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center bg-stone-50 rounded-2xl border border-stone-200 text-stone-500">
                <p className="font-medium text-xs">
                  {hasLoadedOnce
                    ? 'No participants found with verified email addresses matching your current filter.'
                    : 'Tap "Load Matching Audience" above to load registered participants.'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
