// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAhohYdIq0qbrD8BsZ-yY_GxXAXozIpps",
  authDomain: "smooth-aa5d6.firebaseapp.com",
  databaseURL:
    "https://smooth-aa5d6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "smooth-aa5d6",
  storageBucket: "smooth-aa5d6.appspot.com",
  messagingSenderId: "1025470071755",
  appId: "1:1025470071755:web:2573cfca6d0b48fa1bac4e",
  measurementId: "G-HBKWDD2FK7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, "smooth-aa5d6.appspot.com");

export default storage;
