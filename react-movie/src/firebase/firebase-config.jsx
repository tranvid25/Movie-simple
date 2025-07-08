// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFireStore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDt4snzt2CmkIPY4geDB9425AVC5mX4nYc",
  authDomain: "learn-firebase-c7949.firebaseapp.com",
  projectId: "learn-firebase-c7949",
  storageBucket: "learn-firebase-c7949.firebasestorage.app",
  messagingSenderId: "249007444822",
  appId: "1:249007444822:web:aadeead2c302dd242a7cf7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Init services
const db=getFireStore();