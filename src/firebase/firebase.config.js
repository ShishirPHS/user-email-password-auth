// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuXjmhZWhI_cavhZRvUfbscxM3lCkW1Ss",
  authDomain: "user-email-password-auth-b61dd.firebaseapp.com",
  projectId: "user-email-password-auth-b61dd",
  storageBucket: "user-email-password-auth-b61dd.appspot.com",
  messagingSenderId: "327701532426",
  appId: "1:327701532426:web:4a4ea6d3153ceead71f4f3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
