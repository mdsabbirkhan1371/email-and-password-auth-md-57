// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBMV1yXA1TaVmIi8OadVlJ1_zVeA5q-DhM",
    authDomain: "email-login-password-auth.firebaseapp.com",
    projectId: "email-login-password-auth",
    storageBucket: "email-login-password-auth.appspot.com",
    messagingSenderId: "513034314774",
    appId: "1:513034314774:web:13d52ce16e2f1a75fe4137"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;