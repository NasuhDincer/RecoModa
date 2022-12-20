import { MaterialIcons } from "@expo/vector-icons";
import React, { Component } from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Post from "../components/Post";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      email: "",
      password: "",
      phoneNumber: "",
    };
    this._isMounted = false;
  }

  getPersonalData = () => {};

  render() {
    return (
      <SafeAreaView style={{ width: "100%", height: "100%" }}>
        <View
          style={{
            width: "100%",
            height: "10%",
            paddingHorizontal: "5%",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: "10%"
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Settings")}
          >
            <MaterialIcons name="settings" size={36} color="black" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "100%",
            height: "90%",
            paddingHorizontal: "5%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 36 }}>This is the profile page.</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    width: "100%",
  },
  separator: {
    marginTop: 10,
  },
});