// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwAI9Q0brY6VRiE7WnszGv89RO7ecNgBw",
  authDomain: "papiro-77c3c.firebaseapp.com",
  projectId: "papiro-77c3c",
  storageBucket: "papiro-77c3c.appspot.com",
  messagingSenderId: "632639840483",
  appId: "1:632639840483:web:9ee2616f42ef38cc4a25d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)