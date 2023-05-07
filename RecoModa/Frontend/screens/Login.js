import React, { Component } from "react";
import axios from "axios";
import  {RNNetworkInfo} from "react-native-network-info";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import RegisterScreen from "./RegisterScreen";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this._isMounted = false;
  }

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  };

  // Usage
  changeEmail = (text) => {
    this.handleChange("email", text);
  };

  changePassword = (text) => {
    this.handleChange("password", text);
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log("hhh");
    const { email, password } = this.state;
    console.log(email);
    try {
      
      const ipv4Address =  '192.168.3.247'
      const res = await axios.post(
        "http://" + ipv4Address + ":5000/api/auth/login",
        { email, password }
      );
      console.log(res.data);
      console.log("xxx");
      this.props.navigation.navigate("UserScreens");
    } catch (error) {
      // handle error response
      console.log(error);
    }

    //props.navigation.navigate("Home")
  };
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.bgImage} source={require("../Assets/back1.jpg")} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>RecoModa</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            value={this.state.email}
            onChangeText={(text) => this.changeEmail(text)}
          />
          <Image
            style={styles.inputIcon}
            source={{ uri: "https://img.icons8.com/nolan/40/000000/email.png" }}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            value={this.state.password}
            onChangeText={(text) => this.changePassword(text)}
          />
          <Image
            style={styles.inputIcon}
            source={{ uri: "https://img.icons8.com/nolan/40/000000/key.png" }}
          />
        </View>

        <TouchableOpacity
          style={styles.btnForgotPassword}
          onPress={() => this.props.navigation.navigate("ForgotPassword")}
        >
          <Text style={styles.btnText}>Forgot your password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.handleSubmit}
          style={[styles.buttonContainer, styles.loginButton]}
        >
          <Text style={styles.loginText}>{"Login"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("RegisterScreen")}
          style={[styles.buttonContainer, styles.registerButton]}
        >
          <Text style={styles.btnText}>{"Register"}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export const screenOptions = (navData) => {
  return {
    headerTitle: "Auth",
  };
};

const resizeMode = "center";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 42,
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

  errorMsgContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginBottom: 15,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#D8000C",
    backgroundColor: "#FFBABA",
    color: "#D8000C",
    borderRadius: 25,
  },
  successMsgContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginBottom: 15,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#4F8A10",
    backgroundColor: "#DFF2BF",
    color: "#4F8A10",
    borderRadius: 25,
  },
  msgText: {
    fontSize: 15,
  },
  msgIcon: {
    width: 30,
    height: 30,
    // marginLeft: 15,
    justifyContent: "center",
  },

  inputContainer: {
    // borderBottomColor: '#F5FCFF',
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    // borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: "center",
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: "transparent",
  },
  btnForgotPassword: {
    height: 15,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: 10,
    width: 300,
    backgroundColor: "transparent",
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
  registerButton: {
    backgroundColor: "#f26df1",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
  },
  loginText: {
    color: "white",
  },
  bgImage: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Login;
