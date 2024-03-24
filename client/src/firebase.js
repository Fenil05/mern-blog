// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-app-1b295.firebaseapp.com",
  projectId: "mern-blog-app-1b295",
  storageBucket: "mern-blog-app-1b295.appspot.com",
  messagingSenderId: "305014199409",
  appId: "1:305014199409:web:7854c9c697c9d11f6ef7d0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

