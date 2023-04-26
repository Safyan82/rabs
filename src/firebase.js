// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPjXQ1LvtZK1kWSie_iTo4wQtTRFV8Trw",
  authDomain: "rabs-ec559.firebaseapp.com",
  projectId: "rabs-ec559",
  storageBucket: "rabs-ec559.appspot.com",
  messagingSenderId: "387891779287",
  appId: "1:387891779287:web:6c41d3467fecff0e264292",
  measurementId: "G-XL0N861YHS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);