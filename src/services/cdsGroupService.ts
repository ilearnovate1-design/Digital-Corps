/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/errorHandling';
import { CDSGroup } from '../types';

/**
 * Loads all active CDS groups for participant selection.
 * Uses 1 read per fetch.
 */
export async function loadActiveCDSGroups(): Promise<CDSGroup[]> {
  try {
    const q = query(
      collection(db, 'cdsGroups'),
      where('active', '==', true),
      orderBy('name', 'asc')
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({
      ...d.data(),
      id: d.id
    } as CDSGroup));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'cdsGroups');
    return [];
  }
}

/**
 * Loads all CDS groups (active and inactive) for admin management.
 */
export async function loadAllCDSGroups(): Promise<CDSGroup[]> {
  try {
    const q = query(
      collection(db, 'cdsGroups'),
      orderBy('name', 'asc')
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({
      ...d.data(),
      id: d.id
    } as CDSGroup));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'cdsGroups');
    return [];
  }
}

/**
 * Creates or updates a CDS group.
 * Admin only (enforced by firestore.rules).
 */
export async function saveCDSGroup(
  group: Omit<CDSGroup, 'createdAt'>,
  adminEmail: string
): Promise<void> {
  const docId = group.id || `cds_${Date.now().toString(36)}`;
  const docRef = doc(db, 'cdsGroups', docId);
  const now = new Date().toISOString();

  const payload = {
    ...group,
    id: docId,
    createdBy: adminEmail,
    createdAt: (group as any).createdAt || now,
    active: Boolean(group.active)
  };

  try {
    await setDoc(docRef, payload);

    // Audit Log
    const logRef = doc(collection(db, 'adminAuditLogs'));
    await setDoc(logRef, {
      adminEmail,
      action: group.id ? 'CDS_GROUP_UPDATE' : 'CDS_GROUP_CREATE',
      details: `${group.id ? 'Updated' : 'Created'} CDS Group: ${group.name}`,
      timestamp: now
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `cdsGroups/${docId}`);
  }
}
