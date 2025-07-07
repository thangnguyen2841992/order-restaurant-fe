// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAypB3s4tFvVmdT2llhAu06_Pl1b_jSpfI",
    authDomain: "thangdeptrai-9efec.firebaseapp.com",
    projectId: "thangdeptrai-9efec",
    storageBucket: "thangdeptrai-9efec.appspot.com",
    messagingSenderId: "1013452337701",
    appId: "1:1013452337701:web:e60b9467d14ff949fe85cc",
    measurementId: "G-FXG9HJZQME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);