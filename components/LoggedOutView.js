import React from "react";
import { View, StyleSheet } from "react-native";
import LoginInput from "./ui/LoginInput";
import LoginButton from "./ui/LoginButton";
import ErrorMessage from "./ui/ErrorMessage";

export default function LoggedOutView({ email, passw, setEmail, setPassw, errorMsg, handleLogin }) {
  return (
    <View style={styles.container}>
      <LoginInput
        placeholder="Unesite Vašu email adresu"
        value={email}
        secureTextEntry={false}
        onChangeText={setEmail}
      />

      <LoginInput
        placeholder="Unesite vašu lozinku"
        secureTextEntry={true}
        value={passw}
        onChangeText={setPassw}
      />

      <ErrorMessage error={errorMsg} />

      <LoginButton title="Prijava" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
});