import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleNameChange = (name) => {
    this.setState({ name });
  };

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  handleConfirmPasswordChange = (confirmPassword) => {
    this.setState({ confirmPassword });
  };

  handleRegisterPress = () => {
    // Perform registration logic here
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={this.handleNameChange}
          value={this.state.name}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={this.handleEmailChange}
          value={this.state.email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={this.handlePasswordChange}
          value={this.state.password}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={true}
          onChangeText={this.handleConfirmPasswordChange}
          value={this.state.confirmPassword}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleRegisterPress}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    marginBottom: 50,
  },
  input: {
    height: 40,
    width: "80%",
    margin: 12,
    padding: 10,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 5,
    padding: 10,
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
