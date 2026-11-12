import React, { useState, useRef } from 'react';
import { ParticipantRegistration, NavigationTab } from '../types';
import { registerParticipant, CURRENT_CAMPAIGN_ID } from '../services/participantService';
import {
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  User,
  ShieldCheck,
  ArrowRight,
  Loader2,
  RefreshCw,
  MapPin,
  Flag,
  Sparkles,
  Users
} from 'lucide-react';
import { loadActiveCDSGroups } from '../services/cdsGroupService';
import { CDSGroup } from '../types';

interface RegistrationViewProps {
  initialData: ParticipantRegistration | null;
  onSaveRegistration: (data: ParticipantRegistration) => void;
  onNavigate: (tab: NavigationTab) => void;
  onOpenPrivacyNotice: () => void;
}

export const RegistrationView: React.FC<RegistrationViewProps> = ({
  initialData,
  onSaveRegistration,
  onNavigate,
  onOpenPrivacyNotice
}) => {
  // Stable document ID per form lifecycle to ensure safe retries without creating duplicates
  const stableDocIdRef = useRef<string>(
    initialData?.registrationId || `part_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`
  );

  // Personal details
  const [firstName, setFirstName] = useState(initialData?.firstName || '');
  const [surname, setSurname] = useState(initialData?.surname || '');

  // Contact details: Both Phone and Email are compulsory
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [email, setEmail] = useState(initialData?.email || '');

  // Compulsory Camp details
  const [platoon, setPlatoon] = useState<number>(initialData?.platoon || 0);
  const [stateCode, setStateCode] = useState(initialData?.stateCode || '');
  const [deploymentState, setDeploymentState] = useState(initialData?.deploymentState || '');

  // Optional Skill Track & Level
  const [primarySkillTrack, setPrimarySkillTrack] = useState(initialData?.primarySkillTrack || '');
  const [skillLevel, setSkillLevel] = useState<'beginner' | 'intermediate' | 'advanced' | 'not_specified'>(
    initialData?.skillLevel || 'not_specified'
  );

  // Mandatory requirement: Both checkboxes MUST start unchecked (false)
  const [communityOptIn, setCommunityOptIn] = useState<boolean>(
    initialData ? initialData.communityOptIn : false
  );

  // Post-Camp: CDS Group selection
  const [cdsGroups, setCdsGroups] = useState<CDSGroup[]>([]);
  const [selectedCdsGroupId, setSelectedCdsGroupId] = useState(initialData?.cdsGroupId || '');
  const [selectedCdsGroupName, setSelectedCdsGroupName] = useState(initialData?.cdsGroupName || '');
  const [isLoadingCDS, setIsLoadingCDS] = useState(false);

  React.useEffect(() => {
    const fetchCDS = async () => {
      setIsLoadingCDS(true);
      try {
        const groups = await loadActiveCDSGroups();
        setCdsGroups(groups);
      } catch (err) {
        console.error('Failed to load CDS groups:', err);
      } finally {
        setIsLoadingCDS(false);
      }
    };
    fetchCDS();
  }, []);
  const [marketingConsent, setMarketingConsent] = useState<boolean>(
    initialData ? initialData.marketingConsent : false
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    // 1. Personal details
    if (!firstName.trim() || firstName.trim().length < 2) {
      errs.firstName = 'First name is compulsory (minimum 2 characters)';
    }

    if (!surname.trim() || surname.trim().length < 2) {
      errs.surname = 'Surname is compulsory (minimum 2 characters)';
    }

    // 2. Both Phone/WhatsApp AND Email are compulsory
    const cleanPhone = phone.replace(/[\s-]/g, '');
    if (!cleanPhone) {
      errs.phone = 'Phone / WhatsApp number is compulsory';
    } else if (cleanPhone.length < 10) {
      errs.phone = 'Please enter a valid phone number (minimum 10 digits, e.g. 0803 123 4567)';
    } else if (!/^\+?\d{10,15}$/.test(cleanPhone)) {
      errs.phone = 'Please enter digits only with optional leading + (e.g. 08012345678 or +234...)';
    }

    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail) {
      errs.email = 'Email address is compulsory';
    } else if (!emailRegex.test(cleanEmail)) {
      errs.email = 'Please enter a valid email address (e.g. corper@gmail.com)';
    }

    // 3. Camp details are COMPULSORY
    if (!platoon || platoon < 1 || platoon > 10) {
      errs.platoon = 'Camp Platoon is compulsory (please select Platoon 1 to 10)';
    }

    const cleanStateCode = stateCode.trim().toUpperCase();
    if (!cleanStateCode) {
      errs.stateCode = 'NYSC State Code is compulsory (e.g. LA/26A/1234)';
    } else if (cleanStateCode.length < 5) {
      errs.stateCode = 'State code too short (e.g. LA/26A/1234)';
    }

    const cleanDeploymentState = deploymentState.trim();
    if (!cleanDeploymentState) {
      errs.deploymentState = 'State of Deployment / Camp State is compulsory';
    } else if (cleanDeploymentState.length < 2) {
      errs.deploymentState = 'Please enter your deployment state (e.g. Lagos, Kano, Oyo, Rivers)';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent accidental double-clicks

    if (retryCount >= MAX_RETRIES) {
      setSubmissionError(
        'Maximum retry attempts reached (3/3). Your device appears offline. Please check your data bundle and try again later or visit the Camp SAED help pavilion.'
      );
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmissionError(null);

    const now = new Date().toISOString();
    const completedRegistration: ParticipantRegistration = {
      firstName: firstName.trim(),
      surname: surname.trim(),
      contactMethod: 'both',
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      stateCode: stateCode.trim().toUpperCase(),
      platoon: Number(platoon),
      deploymentState: deploymentState.trim(),
      primarySkillTrack: primarySkillTrack.trim() || undefined,
      skillLevel: skillLevel !== 'not_specified' ? skillLevel : undefined,
      communityOptIn,
      marketingConsent,
      consentTimestamp: now,
      campaignId: CURRENT_CAMPAIGN_ID,
      registrationId: stableDocIdRef.current,
      cdsGroupId: selectedCdsGroupId,
      cdsGroupName: selectedCdsGroupName
    };

    try {
      // Single blind write to Firestore using stableDocIdRef to guarantee idempotency on retry
      await registerParticipant(completedRegistration);

      // Save locally to show immediate local success screen (0 Firestore reads)
      onSaveRegistration(completedRegistration);
      onNavigate('success');
    } catch (err: any) {
      // Sanitized error logging without personal contact details
      console.warn('Registration network attempt deferred. Saved locally.');
      onSaveRegistration(completedRegistration);
      onNavigate('success');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOfflineProceed = () => {
    if (!validate()) return;
    const now = new Date().toISOString();
    const completedRegistration: ParticipantRegistration = {
      firstName: firstName.trim(),
      surname: surname.trim(),
      contactMethod: 'both',
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      stateCode: stateCode.trim().toUpperCase(),
      platoon: Number(platoon),
      deploymentState: deploymentState.trim(),
      primarySkillTrack: primarySkillTrack.trim() || undefined,
      skillLevel: skillLevel !== 'not_specified' ? skillLevel : undefined,
      communityOptIn,
      marketingConsent,
      consentTimestamp: now,
      campaignId: CURRENT_CAMPAIGN_ID,
      registrationId: stableDocIdRef.current,
    };
    onSaveRegistration(completedRegistration);
    onNavigate('success');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      {/* Intro Header */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-stone-900 tracking-tight">
              Participant Registration
            </h2>
            <p className="text-xs text-stone-600">
              Personal information, contact details (Phone & Email), and NYSC camp details are compulsory. No passwords or account setup required.
            </p>
          </div>
        </div>

        <div className="mt-2 text-xs text-stone-500 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>We strictly protect participant privacy. We never collect BVN, NIN, account numbers, or identity documents.</span>
        </div>

        {/* Independent Platform Advisory */}
        <div className="mt-3 p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-[11px] text-amber-950 leading-relaxed">
          <strong>Notice:</strong> Digital Corps Hub is an independent digital skills initiative supporting corps members. Registration and project activities here <strong>do not replace official NYSC CDS registration, reporting, or clearance</strong>.
        </div>
      </div>

      {/* Failure Message & Safe Retry Banner */}
      {submissionError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-900 space-y-2.5">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">Submission Did Not Complete</p>
              <p className="leading-relaxed text-red-800">{submissionError}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 bg-red-700 hover:bg-red-800 text-white font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSubmitting ? 'animate-spin' : ''}`} />
              <span>Retry Registration</span>
            </button>
            <button
              type="button"
              onClick={handleOfflineProceed}
              className="inline-flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer shadow-xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Save & Continue in Camp Mode</span>
            </button>
          </div>
        </div>
      )}

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-6">
        
        {/* SECTION 1: Personal Details */}
        <div>
          <h3 className="text-xs font-black text-stone-700 uppercase tracking-wider mb-3 flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-600" />
            <span>1. Personal Information (Compulsory)</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1.5 uppercase tracking-wide">
                First Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    if (errors.firstName) setErrors({ ...errors, firstName: '' });
                  }}
                  placeholder="e.g. Ada"
                  className={`w-full pl-9 pr-3 py-2.5 text-sm bg-stone-50 border rounded-xl focus:bg-white focus:outline-none transition-colors ${
                    errors.firstName ? 'border-red-400 ring-1 ring-red-300' : 'border-stone-300 focus:border-emerald-600'
                  }`}
                />
              </div>
              {errors.firstName && (
                <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1.5 uppercase tracking-wide">
                Surname (Last Name) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={surname}
                  onChange={(e) => {
                    setSurname(e.target.value);
                    if (errors.surname) setErrors({ ...errors, surname: '' });
                  }}
                  placeholder="e.g. Eze"
                  className={`w-full pl-9 pr-3 py-2.5 text-sm bg-stone-50 border rounded-xl focus:bg-white focus:outline-none transition-colors ${
                    errors.surname ? 'border-red-400 ring-1 ring-red-300' : 'border-stone-300 focus:border-emerald-600'
                  }`}
                />
              </div>
              {errors.surname && (
                <p className="text-red-600 text-xs mt-1">{errors.surname}</p>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 2: Contact Details (Both Phone and Email Compulsory) */}
        <div className="pt-2 border-t border-stone-100">
          <div className="flex items-center justify-between mb-1.5">
            <h3 className="text-xs font-black text-stone-700 uppercase tracking-wider flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>2. Contact Information (Both Compulsory)</span>
            </h3>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
              Both Required
            </span>
          </div>
          <p className="text-xs text-stone-500 mb-3">
            Please provide both your WhatsApp/phone number and your active email address for verification and program materials.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone/WhatsApp */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1.5 uppercase tracking-wide">
                Phone / WhatsApp Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  placeholder="e.g. 0803 123 4567"
                  className={`w-full pl-9 pr-3 py-2.5 text-sm bg-stone-50 border rounded-xl focus:bg-white focus:outline-none transition-colors ${
                    errors.phone ? 'border-red-400 ring-1 ring-red-300' : 'border-stone-300 focus:border-emerald-600'
                  }`}
                />
              </div>
              {errors.phone ? (
                <p className="text-red-600 text-xs mt-1">{errors.phone}</p>
              ) : (
                <p className="text-[11px] text-stone-400 mt-1">For camp coordination & peer learning circles</p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1.5 uppercase tracking-wide">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  placeholder="e.g. corper@gmail.com"
                  className={`w-full pl-9 pr-3 py-2.5 text-sm bg-stone-50 border rounded-xl focus:bg-white focus:outline-none transition-colors ${
                    errors.email ? 'border-red-400 ring-1 ring-red-300' : 'border-stone-300 focus:border-emerald-600'
                  }`}
                />
              </div>
              {errors.email ? (
                <p className="text-red-600 text-xs mt-1">{errors.email}</p>
              ) : (
                <p className="text-[11px] text-stone-400 mt-1">For digital course guides and fellowship notices</p>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 3: Camp Details (COMPULSORY) */}
        <div className="pt-2 border-t border-stone-100">
          <div className="flex items-center justify-between mb-1.5">
            <h3 className="text-xs font-black text-stone-700 uppercase tracking-wider flex items-center gap-2">
              <Flag className="w-4 h-4 text-emerald-600" />
              <span>3. NYSC Camp & Platoon Details (Compulsory)</span>
            </h3>
            <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
              Compulsory
            </span>
          </div>
          <p className="text-xs text-stone-500 mb-3">
            Compulsory for orientation camp verification and the inter-platoon Rapid-Fire Quiz competition.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Camp Platoon */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1.5 uppercase tracking-wide">
                Camp Platoon <span className="text-red-500">*</span>
              </label>
              <select
                value={platoon}
                onChange={(e) => {
                  setPlatoon(Number(e.target.value));
                  if (errors.platoon) setErrors({ ...errors, platoon: '' });
                }}
                className={`w-full px-3 py-2.5 text-sm bg-stone-50 border rounded-xl focus:bg-white focus:outline-none transition-colors ${
                  errors.platoon ? 'border-red-400 ring-1 ring-red-300' : 'border-stone-300 focus:border-emerald-600'
                }`}
              >
                <option value={0} disabled>Select Platoon (1–10)...</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>Platoon {num}</option>
                ))}
              </select>
              {errors.platoon && (
                <p className="text-red-600 text-xs mt-1">{errors.platoon}</p>
              )}
            </div>

            {/* NYSC State Code */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1.5 uppercase tracking-wide">
                NYSC State Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={stateCode}
                onChange={(e) => {
                  setStateCode(e.target.value.toUpperCase());
                  if (errors.stateCode) setErrors({ ...errors, stateCode: '' });
                }}
                placeholder="e.g. LA/26A/1234"
                className={`w-full px-3 py-2.5 text-sm bg-stone-50 border rounded-xl uppercase font-mono focus:bg-white focus:outline-none transition-colors ${
                  errors.stateCode ? 'border-red-400 ring-1 ring-red-300' : 'border-stone-300 focus:border-emerald-600'
                }`}
              />
              {errors.stateCode && (
                <p className="text-red-600 text-xs mt-1">{errors.stateCode}</p>
              )}
            </div>

            {/* CDS Group (Optional / Post-Camp) */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1.5 uppercase tracking-wide">
                CDS Group (Optional)
              </label>
              <select
                value={selectedCdsGroupId}
                onChange={(e) => {
                  const id = e.target.value;
                  setSelectedCdsGroupId(id);
                  const name = cdsGroups.find(g => g.id === id)?.name || '';
                  setSelectedCdsGroupName(name);
                }}
                className="w-full px-3 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600 transition-colors"
              >
                <option value="">Select CDS Group...</option>
                {cdsGroups.map((group) => (
                  <option key={group.id} value={group.id}>{group.name}</option>
                ))}
              </select>
              <p className="text-[10px] text-stone-400 mt-1">Select for post-camp digital skills collaboration</p>
            </div>

            {/* State of Deployment */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1.5 uppercase tracking-wide">
                State of Deployment <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={deploymentState}
                  onChange={(e) => {
                    setDeploymentState(e.target.value);
                    if (errors.deploymentState) setErrors({ ...errors, deploymentState: '' });
                  }}
                  placeholder="e.g. Lagos, Kano, Oyo..."
                  className={`w-full pl-9 pr-3 py-2.5 text-sm bg-stone-50 border rounded-xl focus:bg-white focus:outline-none transition-colors ${
                    errors.deploymentState ? 'border-red-400 ring-1 ring-red-300' : 'border-stone-300 focus:border-emerald-600'
                  }`}
                />
              </div>
              {errors.deploymentState && (
                <p className="text-red-600 text-xs mt-1">{errors.deploymentState}</p>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 4: Digital Interests (Optional Career Track Profile) */}
        <div className="pt-2 border-t border-stone-100">
          <h3 className="text-xs font-black text-stone-700 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>4. Digital Interest Track (Optional Profile)</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1.5 uppercase tracking-wide">
                Primary Digital Interest
              </label>
              <select
                value={primarySkillTrack}
                onChange={(e) => setPrimarySkillTrack(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600 transition-colors"
              >
                <option value="">Select interest track (optional)...</option>
                <option value="AI Content Creation">AI-Assisted Content Creation</option>
                <option value="Spreadsheets & Data">Spreadsheet & Data Skills</option>
                <option value="Virtual Assistance">Virtual Assistance</option>
                <option value="Digital Design">Digital Design & Presentations</option>
                <option value="Remote Careers">Remote Work & Freelance Readiness</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1.5 uppercase tracking-wide">
                Current Skill Level
              </label>
              <select
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value as any)}
                className="w-full px-3 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600 transition-colors"
              >
                <option value="not_specified">Not specified (optional)</option>
                <option value="beginner">Beginner (Starting fresh)</option>
                <option value="intermediate">Intermediate (Some hands-on practice)</option>
                <option value="advanced">Advanced (Job ready / Confident)</option>
              </select>
            </div>
          </div>
        </div>

        {/* SEPARATE OPTIONAL CONSENT A: Community Follow-up (Starts UNCHECKED) */}
        <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-3">
          <input
            type="checkbox"
            id="communityCheckbox"
            checked={communityOptIn}
            onChange={(e) => setCommunityOptIn(e.target.checked)}
            className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
          />
          <label htmlFor="communityCheckbox" className="text-xs text-stone-700 cursor-pointer">
            <span className="font-bold text-stone-900 block">
              a. Join the Digital Corps Peer Community (Optional)
            </span>
            I would like to join the state or platoon peer group on WhatsApp/Telegram for study follow-up and mentor support. (Starts unchecked).
          </label>
        </div>

        {/* SEPARATE OPTIONAL CONSENT B: Future Promotional / Marketing (Starts UNCHECKED) */}
        <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-3">
          <input
            type="checkbox"
            id="marketingCheckbox"
            checked={marketingConsent}
            onChange={(e) => setMarketingConsent(e.target.checked)}
            className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
          />
          <label htmlFor="marketingCheckbox" className="text-xs text-stone-700 cursor-pointer">
            <span className="font-bold text-stone-900 block">
              b. Promotional & Partner Opportunity Notifications (Optional)
            </span>
            I agree to receive occasional messages about future youth scholarships, tech fellowships, or partner opportunities. (Starts unchecked).
          </label>
        </div>

        {/* Short Understandable Privacy Notice */}
        <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-950 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Privacy Notice in Plain Language:</span>
          </div>
          <p className="leading-relaxed text-emerald-900">
            We collect your name, contact information (phone and email), and camp details solely to verify orientation event participation and deliver digital skills materials. We never sell data, never share numbers with third-party commercial marketers, and never request bank credentials.
          </p>
          <button
            type="button"
            onClick={onOpenPrivacyNotice}
            className="text-[11px] font-bold text-emerald-800 hover:text-emerald-950 underline cursor-pointer pt-0.5 inline-block"
          >
            View Complete Privacy Terms & Policy
          </button>
        </div>

        {/* Submit Button */}
        <div className="pt-2 space-y-3">
          {submissionError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-900 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <span className="leading-snug">{submissionError}</span>
              <button
                type="button"
                onClick={handleOfflineProceed}
                className="shrink-0 px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-lg text-xs cursor-pointer"
              >
                Continue in Camp Mode
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#046A38] hover:bg-[#03522b] text-white font-bold py-3.5 px-4 rounded-xl shadow-md text-sm flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 text-amber-300 animate-spin" />
                <span>Securing Registration...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5 text-amber-300" />
                <span>Complete Registration</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
          <p className="text-center text-[11px] text-stone-400 mt-2">
            Instant camp verification. Generates your official Digital ID Pass for orientation camp activities.
          </p>
        </div>
      </form>
    </div>
  );
};
