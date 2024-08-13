// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAl4b4kXN9AQtY-KE1XBXgbV1wU_p2tVfI",
  authDomain: "otp-project-6b8e0.firebaseapp.com",
  projectId: "otp-project-6b8e0",
  storageBucket: "otp-project-6b8e0.appspot.com",
  messagingSenderId: "591123694714",
  appId: "1:591123694714:web:f5ba2142c1f4d6fd88a7c3",
  measurementId: "G-434LGWDT5E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);