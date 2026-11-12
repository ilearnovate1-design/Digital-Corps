import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/errorHandling';
import { ParticipantRegistration } from '../types';

export const CURRENT_CAMPAIGN_ID = 'nysc_digital_corps_2026_q4';

export async function registerParticipant(data: ParticipantRegistration): Promise<{ id: string; success: boolean; offline?: boolean }> {
  // Use a stable, sanitized client document ID so retrying does not create duplicate documents.
  const docId = data.registrationId && data.registrationId.length >= 6
    ? data.registrationId
    : `part_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 8)}`;

  const docRef = doc(db, 'participants', docId);
  const path = `participants/${docId}`;

  // Assemble sanitized payload conforming strictly to firestore.rules
  const payload: Record<string, any> = {
    firstName: data.firstName.trim().substring(0, 50),
    surname: data.surname.trim().substring(0, 50),
    contactMethod: data.contactMethod || 'both',
    phone: data.phone ? data.phone.trim().replace(/[^\d+]/g, '').substring(0, 25) : '',
    email: data.email ? data.email.trim().toLowerCase().substring(0, 100) : '',
    stateCode: data.stateCode ? data.stateCode.trim().toUpperCase().substring(0, 20) : '',
    platoon: typeof data.platoon === 'number' ? data.platoon : Number(data.platoon) || 0,
    deploymentState: data.deploymentState ? data.deploymentState.trim().substring(0, 50) : '',
    communityOptIn: Boolean(data.communityOptIn),
    marketingConsent: Boolean(data.marketingConsent),
    consentTimestamp: data.consentTimestamp || new Date().toISOString(),
    campaignId: CURRENT_CAMPAIGN_ID,
    registrationId: docId,
    cdsGroupId: data.cdsGroupId || '',
    cdsGroupName: data.cdsGroupName || '',
    createdAt: serverTimestamp(), // Validated as request.time
  };

  if (data.engagementType) {
    payload.engagementType = data.engagementType;
  }
  if (data.primarySkillTrack && data.primarySkillTrack.trim()) {
    payload.primarySkillTrack = data.primarySkillTrack.trim().substring(0, 60);
  }
  if (data.skillLevel) {
    payload.skillLevel = data.skillLevel;
  }

  try {
    // 1 single blind write, 0 reads, with a 4-second strict timeout so it never hangs indefinitely
    const writePromise = setDoc(docRef, payload);
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('TIMEOUT: Network request timed out while contacting Firestore database.')), 4000)
    );

    await Promise.race([writePromise, timeoutPromise]);
    return { id: docId, success: true, offline: false };
  } catch (error: any) {
    // If intermittent camp connectivity or timeout, save to local cache for offline sync
    try {
      const stored = localStorage.getItem('pending_camp_registrations');
      const list = stored ? JSON.parse(stored) : [];
      list.push({ ...payload, createdAt: new Date().toISOString() });
      localStorage.setItem('pending_camp_registrations', JSON.stringify(list.slice(-50)));
    } catch {
      // Ignore localStorage write error
    }

    console.warn('Registration saved to local camp storage for sync:', error?.message || error);
    // Return graceful success with offline: true so user is never trapped in rolling spinner
    return { id: docId, success: true, offline: true };
  }
}

/**
 * Background sync for queued offline registrations when network is restored
 */
export async function syncPendingRegistrations(): Promise<number> {
  try {
    const stored = localStorage.getItem('pending_camp_registrations');
    if (!stored) return 0;
    const list = JSON.parse(stored);
    if (!Array.isArray(list) || list.length === 0) return 0;

    let synced = 0;
    const remaining: any[] = [];

    for (const item of list) {
      try {
        const docRef = doc(db, 'participants', item.registrationId);
        await setDoc(docRef, { ...item, createdAt: serverTimestamp() });
        synced++;
      } catch (err) {
        remaining.push(item);
      }
    }

    if (remaining.length > 0) {
      localStorage.setItem('pending_camp_registrations', JSON.stringify(remaining));
    } else {
      localStorage.removeItem('pending_camp_registrations');
    }

    return synced;
  } catch {
    return 0;
  }
}
