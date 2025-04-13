import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbUmhMcuAi54gWiEFPdTiXCxzziBA_STM",
  authDomain: "recipe-finder-project-f3934.firebaseapp.com",
  projectId: "recipe-finder-project-f3934",
  storageBucket: "recipe-finder-project-f3934.firebasestorage.app",
  messagingSenderId: "751614526883",
  appId: "1:751614526883:web:984a3a089f9d93b93fc616",
  measurementId: "G-4CYQHFKDV4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
