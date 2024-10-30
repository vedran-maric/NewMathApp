import React, {useState} from "react";
import {View, TextInput, Button, Text} from "react-native";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth, firestore} from "./firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import LoginInput from "./LoginInput"
import LoginButton from "./LoginButton";
import ErrorMessage from "./ErrorMessage";

export default function App() {
  const [email, setEmail] = useState("");
  const [passw, setPassw] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loggedIn, setLoggedIn] = useState(false); 
  const [profile, setProfile] = useState({name:"", age:"", bio:""});

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, passw).then(
      async (userCredentials) => {
        setLoggedIn(true);
        const userId = userCredentials.user.uid;
        const docRef = doc(firestore, "users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfile(docSnap.data())
        } else {
          await setDoc(doc(firestore, "users", userId), {
            name:"", age:"", bio:""
          });
        }
      }
    ).catch((error) => setErrorMsg(error.message));
  };

  const handleSaveProfile = async () => {
    const userId = auth.currentUser.uid;
    await setDoc(doc(firestore, "users", userId), profile);
  };

  if (loggedIn) {
    return (
      <View>
        <Text>Dobrodošli na sustav</Text>
        <Button title="Odjavi se"></Button>
        <TextInput 
          placeholder="Unesite svoje ime"
          value={profile.name}
          onChangeText={(text) => setProfile({...profile, name: text})}
          />

        <TextInput 
          placeholder="Unesite svoje godine"
          value={profile.age}
          onChangeText={(text) => setProfile({...profile, age: text})}
          />

        <TextInput 
          placeholder="O meni ..."
          value={profile.bio}
          onChangeText={(text) => setProfile({...profile, bio: text})}
          />

        <Button title="Spremi profil" onPress={handleSaveProfile} />
      </View>
    );
  }
  return (
    <View>
      <LoginInput
        placeholder="Unesite Vašu email adresu"
        value={email}
        secureTextEntry={false}
        onChangeText={setEmail} />{" "}
      
      <LoginInput
        placeholder="Unesite vašu lozinku"
        secureTextEntry={true}
        value={passw}
        onChangeText={setPassw} />{" "}
      
      <ErrorMessage error={errorMsg} />{" "}

      <LoginButton title="Prijava" onPress={handleLogin} />{" "}
    </View>
  );
};