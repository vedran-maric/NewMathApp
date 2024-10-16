import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDsnRokyH9u3q2bYt6UuDH3OAEGhQUhXno",
    authDomain: "mathapp-fbfbc.firebaseapp.com",
    projectId: "mathapp-fbfbc",
    storageBucket: "mathapp-fbfbc.appspot.com",
    messagingSenderId: "1014384547057",
    appId: "1:1014384547057:web:78848be02b56497efc0550"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };