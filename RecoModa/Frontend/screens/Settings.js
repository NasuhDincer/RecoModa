import { MaterialIcons } from "@expo/vector-icons";
import React, { Component } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import ListItem from "../components/ListItem";
import Post from "../components/Post";

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settingOptions: [
        { label: "Notifications", iconName: "notifications" },
        { label: "Security", iconName: "security" },
        { label: "Account", iconName: "account-circle" },
        { label: "Measurements", iconName: "aspect-ratio" },
      ],
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
            alignItems: "center",
            paddingTop: "2%",
            marginTop: "5%"
          }}
        >
          <Text style={{ fontSize: 36 }}>Settings</Text>
        </View>
        <FlatList
          contentContainerStyle={{
            width: "100%",
          }}
          data={this.state.settingOptions}
          renderItem={({ item, index }) => (
            <ListItem label={item.label} iconName={item.iconName} />
          )}
          keyExtractor={(item, key) => item.label}
        />
      </SafeAreaView>
    );
  }
}