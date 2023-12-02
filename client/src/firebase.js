// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-auth-login-9d4ee.firebaseapp.com",
  projectId: "mern-auth-login-9d4ee",
  storageBucket: "mern-auth-login-9d4ee.appspot.com",
  messagingSenderId: "247936313348",
  appId: "1:247936313348:web:a221d022f9984e8ea36d51"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);