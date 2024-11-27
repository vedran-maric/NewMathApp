import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBgeUjz-Ng1Dk-b3uZaGumx2RLsCrcDGs0",
    authDomain: "mathapp-cd750.firebaseapp.com",
    projectId: "mathapp-cd750",
    storageBucket: "mathapp-cd750.firebasestorage.app",
    messagingSenderId: "1078629689647",
    appId: "1:1078629689647:web:6fde3a31e9c6aef6cf99da",
    measurementId: "G-78PMW27WQQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };