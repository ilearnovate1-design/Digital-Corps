import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import firebaseConfig from '../../firebase-applet-config.json';

export const app = initializeApp(firebaseConfig);
export const db = (firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)' && firebaseConfig.firestoreDatabaseId !== '')
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);
export const auth = getAuth(app);

// Initialize Firebase Analytics if supported in current browser environment
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported && firebaseConfig.measurementId) {
      getAnalytics(app);
    }
  }).catch(() => {
    // Ignore analytics unsupported environment
  });
}

// Zero-read startup guarantee: Removed testConnection() to ensure 0 reads on application launch.

// Firebase App Check Configuration
export function setupAppCheck() {
  if (typeof window === 'undefined') return null;

  try {
    const siteKey = (firebaseConfig as any).recaptchaSiteKey;
    if (siteKey && typeof siteKey === 'string' && siteKey.length > 10) {
      return initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(siteKey),
        isTokenAutoRefreshEnabled: true,
      });
    } else {
      // In staging/development, set debug token to allow coordinator testing
      if (typeof window !== 'undefined') {
        (window as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
      }
      return null;
    }
  } catch (err) {
    // Graceful catch to ensure App Check does not crash application initialization
    return null;
  }
}

setupAppCheck();
