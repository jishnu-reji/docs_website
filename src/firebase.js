import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCoBjdfGnEatsJVurMUs9r8fw-tjhJUa5c",
  authDomain: "doc-web-9e53f.firebaseapp.com",
  projectId: "doc-web-9e53f",
  storageBucket: "doc-web-9e53f.appspot.com",
  messagingSenderId: "193101093204",
  appId: "1:193101093204:web:b7ae4854c6f5179c9810c1",
  measurementId: "G-5THWEBRR8J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)