// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBElRw5GeKkiOIpMAxxcs78Y1wmRQiP7LA",
    authDomain: "industrial-4c896.firebaseapp.com",
    projectId: "industrial-4c896",
    storageBucket: "industrial-4c896.appspot.com",
    messagingSenderId: "287933477220",
    appId: "1:287933477220:web:4756d226f5e949a174ca71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
