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

export default class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._isMounted = false;
  }

  render() {
    return (
      <SafeAreaView style={{ width: "100%", height: "100%" }}>
        <View
          style={{
            width: "100%",
            height: "100%",
            paddingHorizontal: "5%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 36 }}>This is the Shop page.</Text>
        </View>
      </SafeAreaView>
    );
  }
}