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
    apiKey: "AIzaSyB22pxAt6j0maE6dHxDrOLCX9xGl8ZaG0Q",
    authDomain: "happybirthday-ff131.firebaseapp.com",
    projectId: "happybirthday-ff131",
    storageBucket: "happybirthday-ff131.firebasestorage.app",
    messagingSenderId: "872902582638",
    appId: "1:872902582638:web:ec7cf83d59c5f3bd08617f",
    measurementId: "G-S3MX5LHML6",
    databaseURL: "https://happybirthday.firebaseio.com",
  };

  const app = initializeApp(firebaseConfig);
  const database = getFirestore(app);

  return (
    <FCMContext.Provider value={{ database }}>{children}</FCMContext.Provider>
  );
};

export default FCMProvider;
