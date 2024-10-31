import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import {  getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCj29OR9dfiOyqmFocSXK9C6vnKQSoh-Jg",
  authDomain: "clone-8b78a.firebaseapp.com",
  projectId: "clone-8b78a",
  storageBucket: "clone-8b78a.appspot.com",
  messagingSenderId: "381445699281",
  appId: "1:381445699281:web:1f9b1ec668f380780337f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);