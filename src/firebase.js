// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCGTMiYdR4dsHjZ31XhEa298s4T1DNyP-w",
    authDomain: "eventicket-ee2d5.firebaseapp.com",
    projectId: "eventicket-ee2d5",
    storageBucket: "eventicket-ee2d5.appspot.com",
    messagingSenderId: "1000180412603",
    appId: "1:1000180412603:web:ca557ec3a95b92c3a1b99e"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);