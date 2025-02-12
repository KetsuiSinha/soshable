import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyChLoNAmLMr-amwiVjd-aO7AkyY6eHpjH4",
    authDomain: "the-brute-force.firebaseapp.com",
    projectId: "the-brute-force",
    storageBucket: "the-brute-force.appspot.com",
    messagingSenderId: "199552390094",
    appId: "1:199552390094:web:e3be67dece3d660892119f"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(firebaseApp);

// Initialize Auth
const auth = getAuth(firebaseApp);

export { firebaseApp, db, auth };