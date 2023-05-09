import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation(); // Use the useNavigation hook
  
  const handleNameChange = (name) => {
    setName(name);
  };

  const handleEmailChange = (email) => {
    setEmail(email);
  };

  const handlePhoneChange = (phonenumber) => {
    setPhone(phonenumber);
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
  };

  const handleConfirmPasswordChange = (confirmPassword) => {
    setConfirmPassword(confirmPassword);
  };

  const handleRegisterPress = () => {
    // Perform registration logic here
  };

  return (
    <View style={styles.container}>
      <Image style={styles.bgImage} source={require("../Assets/back1.jpg")} />
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        underlineColorAndroid="transparent"
        onChangeText={handleNameChange}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={handleEmailChange}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        secureTextEntry={true}
        onChangeText={handlePhoneChange}
        value={phonenumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={handlePasswordChange}
        value={password}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        onChangeText={handleConfirmPasswordChange}
        value={confirmPassword}
      />
      <TouchableOpacity
        style={[styles.buttonContainer,styles.button]}
        onPress={() => navigation.navigate("RegisterMeasure")}
      > 
        <Text style={styles.buttonText}>Contiune with Measure</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    color: "#fff",
    fontWeight: "bold",

    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
    textShadowColor: "black",

    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textShadowColor: "#ccc",

    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    textShadowColor: "black",
  },
  input: {
    height: 40,
    width: "80%",
    margin: 12,
    padding: 10,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: "#fff",
  },
  loginButton: {
    backgroundColor: "#00b5ec",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  bgImage: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: "#00b5ec",
  },
});

export default RegisterScreen;
