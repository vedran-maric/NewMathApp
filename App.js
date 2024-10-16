import React, {useState} from "react";
import {View, TextInput, Button, Text} from "react-native";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "./firebaseConfig";

export default function App() {
  const [email, setEmail] = useState("");
  const [passw, setPassw] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loggedIn, setLoggedIn] = useState(false); 

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, passw).then(
      () => {
        setLoggedIn(true);
      }
    ).catch((error) => setErrorMsg(error.message));
  };

  if (loggedIn) {
    return (
      <View>
        <Text>Dobrodošli na sustav</Text>
        <Button title="Odjavi se"></Button>
      </View>
    );
  }
  return (
    <View>
      <TextInput
        placeholder="Unesite Vašu email adresu"
        value={email}
        onChangeText={setEmail} />{" "}
      
      <TextInput
        placeholder="Unesite vašu lozinku"
        secureTextEntry
        value={passw}
        onChangeText={setPassw} />{" "}
      
      {errorMsg ? <Text>{errorMsg}</Text> : null}{" "}

      <Button title="Prijava" onPress={handleLogin} />{" "}
    </View>
  );
};