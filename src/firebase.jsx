
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8yzEg7HPul8hfz0_XO4W0xSsgQVpfnXQ",
  authDomain: "crud-4f985.firebaseapp.com",
  projectId: "crud-4f985",
  storageBucket: "crud-4f985.appspot.com",
  messagingSenderId: "749684509511",
  appId: "1:749684509511:web:d77a398430a53807971a62",
  measurementId: "G-HHSCXF81LZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};






