import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getCountFromServer,
  DocumentSnapshot
} from 'firebase/firestore';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  User as FirebaseUser
} from 'firebase/auth';
import { db, auth } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/errorHandling';

export interface AggregateReport {
  totalRegistrations: number;
  communityOptIns: number;
  marketingConsentCount: number;
  challengeSubmissionsCount: number;
  platoonCounts: { platoon: number; count: number }[];
  loadedAt: string;
}

export interface ParticipantRecordItem {
  id: string;
  firstName: string;
  surname: string;
  stateCode?: string;
  contactMethod: string;
  contactValue: string;
  phone?: string;
  email?: string;
  deploymentState?: string;
  engagementType?: 'on_camp' | 'post_camp';
  platoon?: number;
  cdsGroupId?: string;
  cdsGroupName?: string;
  primarySkillTrack?: string;
  communityOptIn: boolean;
  marketingConsent: boolean;
  createdAt?: string;
}

const AUTHORIZED_ADMIN_EMAILS = ['jomaschools@gmail.com'];

export function isAuthorizedAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return AUTHORIZED_ADMIN_EMAILS.includes(email.toLowerCase().trim());
}

export interface AuthDiagnosticError {
  code: string;
  title: string;
  message: string;
  steps?: string[];
  helpUrl?: string;
  helpLabel?: string;
}

export function parseAuthError(err: any): AuthDiagnosticError {
  const code = err?.code || '';
  const rawMsg = err?.message || String(err || '');

  if (code === 'auth/configuration-not-found' || rawMsg.includes('configuration-not-found')) {
    return {
      code: 'auth/configuration-not-found',
      title: 'Firebase Authentication Setup Required',
      message: "Authentication has not been activated in your 'digital-corps-hub' Firebase project yet.",
      steps: [
        "Open your Firebase Console at console.firebase.google.com and select 'digital-corps-hub'.",
        "Click 'Authentication' in the left sidebar and click 'Get started'.",
        "In the 'Sign-in method' tab, click 'Google' (or 'Email/Password') and turn on 'Enable' (set support email to jomaschools@gmail.com).",
        "Under 'Settings' > 'Authorized domains', make sure your app domain is added."
      ],
      helpUrl: 'https://console.firebase.google.com/project/digital-corps-hub/authentication',
      helpLabel: 'Open Firebase Console (digital-corps-hub)'
    };
  }

  if (code === 'auth/unauthorized-domain' || rawMsg.includes('unauthorized-domain')) {
    const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'run.app';
    return {
      code: 'auth/unauthorized-domain',
      title: 'Domain Not Authorized in Firebase',
      message: `The domain "${currentHost}" is not in the Authorized Domains list for your Firebase project.`,
      steps: [
        "Go to Firebase Console > Authentication > Settings tab.",
        "Under 'Authorized domains', click 'Add domain'.",
        `Enter "${currentHost}" and click Save.`
      ],
      helpUrl: 'https://console.firebase.google.com/project/digital-corps-hub/authentication/settings',
      helpLabel: 'Add Domain in Firebase Settings'
    };
  }

  if (code === 'auth/operation-not-allowed' || rawMsg.includes('operation-not-allowed')) {
    return {
      code: 'auth/operation-not-allowed',
      title: 'Sign-in Provider Disabled',
      message: 'This sign-in method is currently disabled in your Firebase console.',
      steps: [
        "Go to Firebase Console > Authentication > Sign-in method.",
        "Enable 'Google' or 'Email/Password' and save changes."
      ],
      helpUrl: 'https://console.firebase.google.com/project/digital-corps-hub/authentication/providers',
      helpLabel: 'Enable Provider in Firebase'
    };
  }

  if (code === 'auth/popup-blocked' || rawMsg.includes('popup-blocked')) {
    return {
      code: 'auth/popup-blocked',
      title: 'Sign-in Popup Blocked',
      message: 'The browser or iframe blocked the Google Sign-in popup window.',
      steps: [
        "Click the pop-up icon in your browser's address bar to allow popups from this domain.",
        "Or use the 'Email & Password' sign-in tab below."
      ]
    };
  }

  if (code === 'auth/popup-closed-by-user' || rawMsg.includes('popup-closed-by-user')) {
    return {
      code: 'auth/popup-closed-by-user',
      title: 'Sign-in Window Closed',
      message: 'The Google sign-in window was closed before finishing authentication.'
    };
  }

  if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
    return {
      code,
      title: 'Invalid Credentials',
      message: 'Incorrect email or password. Please verify the coordinator credentials and try again.'
    };
  }

  return {
    code: code || 'unknown',
    title: 'Sign-in Failed',
    message: rawMsg || 'An unexpected error occurred during authentication.'
  };
}

export async function adminSignIn(): Promise<FirebaseUser> {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  const credential = await signInWithPopup(auth, provider);
  return credential.user;
}

export async function adminSignInWithEmail(email: string, pass: string): Promise<FirebaseUser> {
  const credential = await signInWithEmailAndPassword(auth, email.trim(), pass);
  return credential.user;
}

export async function adminRegisterWithEmail(email: string, pass: string): Promise<FirebaseUser> {
  const credential = await createUserWithEmailAndPassword(auth, email.trim(), pass);
  return credential.user;
}

export async function adminSignOut(): Promise<void> {
  await signOut(auth);
}

// 1. Zero-Download Aggregate Report using getCountFromServer (1 read per 1,000 entries)
export async function loadAggregateReports(loadPlatoons = false): Promise<AggregateReport> {
  try {
    const participantsCol = collection(db, 'participants');
    const submissionsCol = collection(db, 'challengeSubmissions');

    const [totalSnap, communitySnap, marketingSnap, submissionsSnap] = await Promise.all([
      getCountFromServer(participantsCol),
      getCountFromServer(query(participantsCol, where('communityOptIn', '==', true))),
      getCountFromServer(query(participantsCol, where('marketingConsent', '==', true))),
      getCountFromServer(submissionsCol)
    ]);

    const platoonCounts: { platoon: number; count: number }[] = [];

    // Optional on-demand platoon breakdown
    if (loadPlatoons) {
      const platoonPromises = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(async (num) => {
        const snap = await getCountFromServer(
          query(participantsCol, where('platoon', '==', num))
        );
        return { platoon: num, count: snap.data().count };
      });
      const results = await Promise.all(platoonPromises);
      platoonCounts.push(...results);
    }

    return {
      totalRegistrations: totalSnap.data().count,
      communityOptIns: communitySnap.data().count,
      marketingConsentCount: marketingSnap.data().count,
      challengeSubmissionsCount: submissionsSnap.data().count,
      platoonCounts,
      loadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'participants');
  }
}

// 2. Paginated Participant List (reads only pageSize items per load)
export async function loadPaginatedParticipants(
  pageSize = 10,
  cursorDoc?: DocumentSnapshot
): Promise<{ items: ParticipantRecordItem[]; lastVisibleDoc?: DocumentSnapshot; hasMore: boolean }> {
  try {
    const participantsCol = collection(db, 'participants');
    let q = query(participantsCol, orderBy('createdAt', 'desc'), limit(pageSize));

    if (cursorDoc) {
      q = query(participantsCol, orderBy('createdAt', 'desc'), startAfter(cursorDoc), limit(pageSize));
    }

    const snap = await getDocs(q);
    const items: ParticipantRecordItem[] = snap.docs.map((d) => {
      const data = d.data();
      const phoneVal = data.phone || '';
      const emailVal = data.email || '';
      let displayContact = '';
      if (phoneVal && emailVal) {
        displayContact = `${phoneVal} • ${emailVal}`;
      } else {
        displayContact = phoneVal || emailVal || '—';
      }

      return {
        id: d.id,
        firstName: data.firstName || '',
        surname: data.surname || '',
        stateCode: data.stateCode,
        contactMethod: data.contactMethod || 'both',
        contactValue: displayContact,
        phone: phoneVal,
        email: emailVal,
        deploymentState: data.deploymentState,
        engagementType: data.engagementType,
        platoon: data.platoon,
        cdsGroupId: data.cdsGroupId,
        cdsGroupName: data.cdsGroupName,
        primarySkillTrack: data.primarySkillTrack,
        communityOptIn: Boolean(data.communityOptIn),
        marketingConsent: Boolean(data.marketingConsent),
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : undefined
      };
    });

    const lastVisibleDoc = snap.docs[snap.docs.length - 1];
    return {
      items,
      lastVisibleDoc,
      hasMore: snap.docs.length === pageSize
    };
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'participants');
  }
}

// 3. Authorized CSV Export
export async function exportParticipantsCSV(adminEmail: string): Promise<string> {
  try {
    // Limited fetch for export (max 500 records per export batch to protect quotas)
    const q = query(collection(db, 'participants'), orderBy('createdAt', 'desc'), limit(500));
    const snap = await getDocs(q);

    const headers = [
      'Document ID',
      'First Name',
      'Surname',
      'NYSC State Code',
      'Engagement',
      'Platoon',
      'CDS Group',
      'Deployment State',
      'Phone / WhatsApp',
      'Email Address',
      'Skill Track',
      'Community Opt-In',
      'Marketing Consent',
      'Registration Time'
    ];

    const rows = snap.docs.map((docSnap) => {
      const d = docSnap.data();
      const phoneVal = d.phone || '';
      const emailVal = d.email || '';
      const stateVal = d.deploymentState || 'N/A';
      const engagementVal = d.engagementType === 'post_camp' ? 'Post Camp' : d.engagementType === 'on_camp' ? 'On Camp' : (d.cdsGroupName ? 'Post Camp' : d.platoon ? 'On Camp' : 'N/A');
      const cdsVal = d.cdsGroupName || 'N/A';
      const regTime = d.createdAt?.toDate ? d.createdAt.toDate().toISOString() : d.consentTimestamp || '';
      return [
        `"${docSnap.id}"`,
        `"${(d.firstName || '').replace(/"/g, '""')}"`,
        `"${(d.surname || '').replace(/"/g, '""')}"`,
        `"${d.stateCode || 'N/A'}"`,
        `"${engagementVal}"`,
        d.platoon || 'N/A',
        `"${cdsVal.replace(/"/g, '""')}"`,
        `"${stateVal.replace(/"/g, '""')}"`,
        `"${phoneVal.replace(/"/g, '""')}"`,
        `"${emailVal.replace(/"/g, '""')}"`,
        `"${(d.primarySkillTrack || 'N/A').replace(/"/g, '""')}"`,
        d.communityOptIn ? 'YES' : 'NO',
        d.marketingConsent ? 'YES' : 'NO',
        `"${regTime}"`
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');

    // Record audit log for data export (1 write)
    const now = new Date().toISOString();
    const logRef = doc(collection(db, 'adminAuditLogs'));
    await setDoc(logRef, {
      adminEmail,
      action: 'CSV_EXPORT',
      details: `Exported ${snap.docs.length} participant records to CSV.`,
      timestamp: now
    });

    return csvContent;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'participants');
  }
}
