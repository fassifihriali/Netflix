import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "***************************",
  authDomain: "netflix-eb945.firebaseapp.com",
  projectId: "netflix-eb945",
  storageBucket: "netflix-eb945.firebasestorage.app",
  messagingSenderId: "498880925353",
  appId: "1:498880925353:web:91dd3a5777f64dd66f63b8",
  measurementId: "G-Y0KJK1V8EK"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);