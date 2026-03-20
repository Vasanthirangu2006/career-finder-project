// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";

// 1️⃣ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyABG4C43fZqCb3fXv7PXd_yZwWZt5PQRvA",
  authDomain: "career-path-finder-c47ec.firebaseapp.com",
  projectId: "career-path-finder-c47ec",
  storageBucket: "career-path-finder-c47ec.appspot.com",
  messagingSenderId: "749668137647",
  appId: "1:749668137647:web:47e7e91bd46597e28af25a",
  measurementId: "G-0MQ94JQC09"
};

// 2️⃣ Initialize Firebase app first
const app = initializeApp(firebaseConfig);

// 3️⃣ Initialize services after app
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// 4️⃣ Signup helper function
async function signup(email, password) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Create Firestore document
  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    createdAt: serverTimestamp(),
    surveyResponses: {} // initially empty
  });

  return user;
}

// 5️⃣ Export everything needed
export { app, db, auth, googleProvider, signup };
