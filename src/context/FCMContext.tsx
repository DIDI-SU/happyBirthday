import { createContext } from "react";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { Firestore } from "firebase/firestore";
const FCMContext = createContext({
  database: null as Firestore | null,
});

export { FCMContext };

const FCMProvider = ({ children }: { children: React.ReactNode }) => {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  };

  const app = initializeApp(firebaseConfig);
  const database = getFirestore(app);

  return (
    <FCMContext.Provider value={{ database }}>{children}</FCMContext.Provider>
  );
};

export default FCMProvider;
