import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "AIzaSyAHRRNJ3DGsuuefe4I2KdoYBL1IGW4pfdQ",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "manemithra-15284.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "manemithra-15284",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "manemithra-15284.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "224495475414",
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "1:224495475414:web:35eab61742411b89d2c777",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? "G-6BVWKG7LY7",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export async function initAnalytics() {
  if (typeof window === "undefined") return null;
  if (!(await isSupported())) return null;
  return getAnalytics(app);
}
