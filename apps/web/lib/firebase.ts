import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDr2eqpRN8PwbEULddYxNR_NuxQhwhkIqE",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "crystal-stone-74d8c.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "crystal-stone-74d8c",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "crystal-stone-74d8c.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "305565394368",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:305565394368:web:e8a5a8f5d87d58bcaad425",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-X40JM6CSJ1"
};

// Initialize Firebase App as a singleton
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export initialized Auth instance
export const firebaseAuth = getAuth(app);
