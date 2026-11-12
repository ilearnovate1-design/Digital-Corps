import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  doc,
  setDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ParticipantRecordItem } from './adminService';
import { handleFirestoreError, OperationType } from '../lib/errorHandling';

/**
 * Standardize Nigerian and International phone numbers for WhatsApp wa.me links
 * Handles:
 *   "08110502600"   -> "2348110502600"
 *   "+2348110502600" -> "2348110502600"
 *   "2348110502600"  -> "2348110502600"
 *   "8110502600"    -> "2348110502600"
 */
export function formatWhatsAppNumber(phone: string | undefined | null): string {
  if (!phone) return '';
  // Strip all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  if (!cleaned) return '';

  // Nigerian 11-digit starting with 0 (e.g. 08110502600 -> 2348110502600)
  if (cleaned.length === 11 && cleaned.startsWith('0')) {
    return '234' + cleaned.substring(1);
  }

  // 10 digits without leading zero (e.g. 8110502600 -> 2348110502600)
  if (cleaned.length === 10 && (cleaned.startsWith('7') || cleaned.startsWith('8') || cleaned.startsWith('9'))) {
    return '234' + cleaned;
  }

  // Already starts with 234
  if (cleaned.startsWith('234')) {
    return cleaned;
  }

  return cleaned;
}

/**
 * Generate a direct WhatsApp click-to-chat URL
 */
export function getWhatsAppUrl(phone: string, text: string): string {
  const formattedNumber = formatWhatsAppNumber(phone);
  const encodedText = encodeURIComponent(text);
  if (!formattedNumber) {
    return `https://wa.me/?text=${encodedText}`;
  }
  return `https://wa.me/${formattedNumber}?text=${encodedText}`;
}

/**
 * Generate a web Gmail compose link with subject and body
 */
export function getGmailComposeUrl(
  recipients: string | string[],
  subject: string,
  body: string,
  isBcc = false
): string {
  const recipientString = Array.isArray(recipients) ? recipients.join(',') : recipients;
  const paramKey = isBcc ? 'bcc' : 'to';
  const queryParams = new URLSearchParams({
    view: 'cm',
    fs: '1',
    [paramKey]: recipientString,
    su: subject,
    body: body
  });
  return `https://mail.google.com/mail/?${queryParams.toString()}`;
}

/**
 * Generate a standard mailto link
 */
export function getMailtoUrl(
  recipients: string | string[],
  subject: string,
  body: string,
  isBcc = false
): string {
  const recipientString = Array.isArray(recipients) ? recipients.join(',') : recipients;
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  if (isBcc) {
    return `mailto:?bcc=${encodeURIComponent(recipientString)}&subject=${encodedSubject}&body=${encodedBody}`;
  }
  return `mailto:${encodeURIComponent(recipientString)}?subject=${encodedSubject}&body=${encodedBody}`;
}

export interface MessageTemplate {
  id: string;
  name: string;
  category: 'onboarding' | 'challenge' | 'quiz' | 'opportunity' | 'community' | 'custom';
  defaultSubject: string;
  body: string;
}

export const MESSAGE_TEMPLATES: MessageTemplate[] = [
  {
    id: 'welcome',
    name: 'Orientation & Welcome Briefing',
    category: 'onboarding',
    defaultSubject: 'Welcome to Digital Corps Hub — Next Steps for Your NYSC Year',
    body: `Hello {firstName},

Congratulations on completing your registration with the NYSC Digital Corps Hub!

Your record details:
• NYSC State Code: {stateCode}
• Platoon: {platoon}

Here is what is in store for you:
1. Practical Hands-On Learning: Free Google Career Certificate access and self-paced digital tracks (AI Literacy, Cybersecurity, Data Analytics).
2. Inter-Platoon Innovation Challenge: Collaborate with your platoon members to submit an impactful 30-day community solution.
3. Camp Leaderboard: High scorers on the AI Readiness Quiz earn recognition and verification.

Visit the Digital Corps Hub portal to explore your starter toolkit and training track!

Best regards,
NYSC Camp SAED & Digital Corps Hub Team`
  },
  {
    id: 'platoon_challenge',
    name: 'Platoon Innovation Challenge Callout',
    category: 'challenge',
    defaultSubject: 'Platoon {platoon} — Submit Your 30-Day Digital Innovation Plan',
    body: `Hello {firstName},

Calling all Platoon {platoon} innovators!

The Inter-Platoon Digital Challenge is live on the Digital Corps Hub platform. 

Every approved solution submitted with an actionable 30-day execution plan earns official ranking points for Platoon {platoon} on the Camp Leaderboard.

Key Focus Areas:
- Solving Community Challenges using Technology
- Practical Digital Literacy for Campers
- High-Impact CDS Group Initiatives

Head over to the "Platoon Challenge" section on the portal to draft and submit your team's proposal today!

Together for Platoon {platoon} glory,
Digital Corps Hub Coordinator`
  },
  {
    id: 'quiz_reminder',
    name: 'AI Literacy Quiz & Certification Reminder',
    category: 'quiz',
    defaultSubject: 'Complete Your AI Literacy Assessment — NYSC Digital Corps Hub',
    body: `Hi {firstName},

Have you tested your digital quotient yet?

Take the 10-question AI Literacy & Digital Safety quiz on the Digital Corps Hub app to verify your baseline knowledge.

Corps members who score 70% or higher unlock verified digital readiness status and contribute qualifying points to Platoon {platoon}.

Takes only 3 minutes: open the "AI Quiz" tab on the hub to test your knowledge!

Keep striving,
Digital Corps Hub Secretariat`
  },
  {
    id: 'opportunity',
    name: 'Digital Skills & Career Opportunity Notice',
    category: 'opportunity',
    defaultSubject: 'Exclusive Digital Opportunities & Allowance Benefits for Corps Members',
    body: `Hello {firstName},

As an active participant in the NYSC Digital Corps Hub initiative, you are eligible for expedited digital empowerment opportunities during your service year:

1. Free Industry Certification tracks in high-demand skills
2. Priority matching for remote tech and creative internships
3. Simplified allowance account opening with verified camp banking partners

Check your Digital Corps Hub dashboard for details on ongoing bootcamps and partner perks.

Regards,
Digital Corps Hub Team`
  },
  {
    id: 'community_group',
    name: 'WhatsApp Community Group Invitation',
    category: 'community',
    defaultSubject: 'Join the Digital Corps Hub Corps Members WhatsApp Group',
    body: `Hi {firstName},

Connect with fellow corps members and tech mentors in our dedicated WhatsApp Community!

Get real-time updates on:
• Digital skills learning roadmaps and challenge announcements
• Free software licenses and digital toolkits
• Collaborative tech projects across platoons

Join our WhatsApp Community group here:
https://chat.whatsapp.com/sample-digital-corps-hub

See you inside!
Digital Corps Hub Help Desk: 08110502600`
  },
  {
    id: 'custom',
    name: 'Custom Broadcast Message',
    category: 'custom',
    defaultSubject: 'Important Announcement — NYSC Digital Corps Hub',
    body: `Hello {firstName},

[Type your custom announcement or briefing here]

Best regards,
NYSC Digital Corps Hub Coordinator`
  }
];

/**
 * Replace placeholders like {firstName}, {stateCode}, etc.
 */
export function fillMessageTemplate(
  text: string,
  participant: {
    firstName?: string;
    surname?: string;
    stateCode?: string;
    platoon?: number | string;
    phone?: string;
    email?: string;
    primarySkillTrack?: string;
  }
): string {
  const firstName = participant.firstName || 'Corps Member';
  const surname = participant.surname || '';
  const fullName = `${firstName} ${surname}`.trim();
  const stateCode = participant.stateCode || 'Pending Assignment';
  const platoonStr = participant.platoon ? `Platoon ${participant.platoon}` : 'General Platoon';
  const platoonNum = participant.platoon ? String(participant.platoon) : '';
  const skillTrack = participant.primarySkillTrack || 'Digital Skills';

  return text
    .replace(/\{firstName\}/g, firstName)
    .replace(/\{surname\}/g, surname)
    .replace(/\{fullName\}/g, fullName)
    .replace(/\{stateCode\}/g, stateCode)
    .replace(/\{platoon\}/g, platoonStr)
    .replace(/\{platoonNumber\}/g, platoonNum)
    .replace(/\{skillTrack\}/g, skillTrack);
}

export interface BroadcastFilter {
  platoon?: number; // 0 for all or 1-10
  communityOnly?: boolean;
  marketingOnly?: boolean;
  channelFilter?: 'all' | 'hasPhone' | 'hasEmail';
}

/**
 * Fetch participants matching broadcast criteria (capped at 500 records per batch to protect Firestore quota)
 */
export async function fetchParticipantsForBroadcast(
  filter: BroadcastFilter
): Promise<ParticipantRecordItem[]> {
  try {
    const participantsCol = collection(db, 'participants');
    let q = query(participantsCol, orderBy('createdAt', 'desc'), limit(500));

    // When filtering by platoon
    if (filter.platoon && filter.platoon > 0) {
      q = query(
        participantsCol,
        where('platoon', '==', filter.platoon),
        orderBy('createdAt', 'desc'),
        limit(500)
      );
    } else if (filter.communityOnly) {
      q = query(
        participantsCol,
        where('communityOptIn', '==', true),
        orderBy('createdAt', 'desc'),
        limit(500)
      );
    } else if (filter.marketingOnly) {
      q = query(
        participantsCol,
        where('marketingConsent', '==', true),
        orderBy('createdAt', 'desc'),
        limit(500)
      );
    }

    const snap = await getDocs(q);
    const items: ParticipantRecordItem[] = [];

    snap.docs.forEach((d) => {
      const data = d.data();
      const phoneVal = data.phone || '';
      const emailVal = data.email || '';
      const communityOptIn = Boolean(data.communityOptIn);
      const marketingConsent = Boolean(data.marketingConsent);

      // In-memory filter combination if multiple flags selected
      if (filter.communityOnly && !communityOptIn) return;
      if (filter.marketingOnly && !marketingConsent) return;
      if (filter.platoon && filter.platoon > 0 && data.platoon !== filter.platoon) return;

      if (filter.channelFilter === 'hasPhone' && !phoneVal) return;
      if (filter.channelFilter === 'hasEmail' && !emailVal) return;

      let displayContact = '';
      if (phoneVal && emailVal) {
        displayContact = `${phoneVal} • ${emailVal}`;
      } else {
        displayContact = phoneVal || emailVal || '—';
      }

      items.push({
        id: d.id,
        firstName: data.firstName || '',
        surname: data.surname || '',
        stateCode: data.stateCode,
        contactMethod: data.contactMethod || 'both',
        contactValue: displayContact,
        phone: phoneVal,
        email: emailVal,
        deploymentState: data.deploymentState,
        platoon: data.platoon,
        primarySkillTrack: data.primarySkillTrack,
        communityOptIn,
        marketingConsent,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : undefined
      });
    });

    return items;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'participants');
    return [];
  }
}

/**
 * Log message sending action in adminAuditLogs for security auditing
 */
export async function logMessagingAudit(
  adminEmail: string,
  action: 'MESSAGE_BROADCAST' | 'DIRECT_MESSAGE_SENT',
  details: string
): Promise<void> {
  try {
    const now = new Date().toISOString();
    const logRef = doc(collection(db, 'adminAuditLogs'));
    await setDoc(logRef, {
      adminEmail,
      action,
      details: details.substring(0, 500),
      timestamp: now
    });
  } catch (err) {
    console.warn('Could not write messaging audit log:', err);
  }
}
