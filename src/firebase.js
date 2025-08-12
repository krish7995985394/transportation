// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2Pg3C6XjSAWJN_sQFMHRDQr7u-NAMigo",
  authDomain: "tirs-36e6d.firebaseapp.com",
  projectId: "tirs-36e6d",
  storageBucket: "tirs-36e6d.appspot.com",
  messagingSenderId: "591944698680",
  appId: "1:591944698680:web:7414b5ce7c30c686f9cfcd",
  measurementId: "G-LTHY48GC76"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export auth and db
export const auth = getAuth(app);
export const db = getFirestore(app);
