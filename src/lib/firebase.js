import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDxFbmyrSKAnKlF7HG3J3X24yuQXVjTksE",
  authDomain: "my-college-guide-auth.firebaseapp.com",
  projectId: "my-college-guide-auth",
  storageBucket: "my-college-guide-auth.appspot.com",
  messagingSenderId: "595152230935",
  appId: "1:595152230935:web:2e48748ecf0b0e0fc7da52",
  measurementId: "G-FLJQ636ZJ0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const firestore = getFirestore(app)
export const storage = getStorage(app)
