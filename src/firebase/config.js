
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBISMtztCh8oevXNLLORoodp_MpZJSzaZM",
  authDomain: "olxx-3160a.firebaseapp.com",
  projectId: "olxx-3160a",
  storageBucket: "olxx-3160a.appspot.com",
  messagingSenderId: "747359846524",
  appId: "1:747359846524:web:4f66fd8e6c7cbf717509f9",
  measurementId: "G-0BR04H6HFD"
};


const app = initializeApp(firebaseConfig,{});

const db = getFirestore(app);

export {db,app} ;