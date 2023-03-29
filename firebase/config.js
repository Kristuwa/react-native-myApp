// Import the functions you need from the SDKs you need
import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAB5hkIHa33qUMUKLsS4eQ4Ainwpn6N9E",
  authDomain: "myprojectnative-db02a.firebaseapp.com",
  projectId: "myprojectnative-db02a",
  storageBucket: "myprojectnative-db02a.appspot.com",
  messagingSenderId: "403708825853",
  appId: "1:403708825853:web:62f9ccf4aa7274d0436e94",
  measurementId: "G-QRMMFJT1ZP",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication and get a reference to the service
export const authFirebase = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
