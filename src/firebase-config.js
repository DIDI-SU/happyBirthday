// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
