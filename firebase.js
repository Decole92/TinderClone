// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADf5awRNdgf-eaGbq2XPoIZIUtGfBJaEo",
  authDomain: "tinder-2-yt-75ec6.firebaseapp.com",
  projectId: "tinder-2-yt-75ec6",
  storageBucket: "tinder-2-yt-75ec6.appspot.com",
  messagingSenderId: "140520512004",
  appId: "1:140520512004:web:edba610e482bf17106f351"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, storage };
