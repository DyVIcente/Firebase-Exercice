import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyC_3KXmgDT0n_G802MVOVmPjHAsQwAQOG8",
  authDomain: "fir-35c26.firebaseapp.com",
  projectId: "fir-35c26",
  storageBucket: "fir-35c26.appspot.com",
  messagingSenderId: "825302436029",
  appId: "1:825302436029:web:5e51d7b826c6b98b30cfd4",
  measurementId: "G-NK7XKL4X4V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);