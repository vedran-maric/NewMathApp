import React, { useState } from "react";
import { auth, firestore } from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import LoggedInView from "./components/LoggedInView";
import LoggedOutView from "./components/LoggedOutView";

export default function App() {
  const [email, setEmail] = useState("");
  const [passw, setPassw] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, passw)
      .then(() => {
        setLoggedIn(true);
      })
      .catch((error) => setErrorMsg(error.message));
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  if (loggedIn) {
    return <LoggedInView onLogout={handleLogout} />;
  }

  return (
    <LoggedOutView
      email={email}
      passw={passw}
      setEmail={setEmail}
      setPassw={setPassw}
      errorMsg={errorMsg}
      handleLogin={handleLogin}
    />
  );
}
