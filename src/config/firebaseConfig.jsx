// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_iCNCj1spJymWc6m__M70-KD7x1N4DuY",
  authDomain: "latest-news-89.firebaseapp.com",
  projectId: "latest-news-89",
  storageBucket: "latest-news-89.appspot.com",
  messagingSenderId: "766582481899",
  appId: "1:766582481899:web:1c008843dc7074b1702fae",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
