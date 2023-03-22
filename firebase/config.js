// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqnq2Y55NK2XcueJPNl-vmZmeJ2_IOnis",
  authDomain: "project-react-native-8f978.firebaseapp.com",
  projectId: "project-react-native-8f978",
  storageBucket: "project-react-native-8f978.appspot.com",
  messagingSenderId: "883054287715",
  appId: "1:883054287715:web:482c8e6faf9cde94c8d156",
  measurementId: "G-2VX29DJ2PW",
};

// Initialize Firebase
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

// Initialize Firebase Authentication and get a reference to the service
export const authFirebase = getAuth(initializeApp(firebaseConfig));
export const db = getFirestore(initializeApp(firebaseConfig));
export const storage = getStorage(initializeApp(firebaseConfig));
