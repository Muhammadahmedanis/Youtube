import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACCtcd3lHWmCOzEjdEkuHiVChM9OPZ5Sw",
  authDomain: "e-commerce-2e835.firebaseapp.com",
  databaseURL: "https://e-commerce-2e835-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "e-commerce-2e835",
  storageBucket: "e-commerce-2e835.appspot.com",
  messagingSenderId: "300471620069",
  appId: "1:300471620069:web:1ee99df1e0403a7cb89f0c",
  measurementId: "G-K4JSXYBCQC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export {
    app,
    auth,
    provider,
}