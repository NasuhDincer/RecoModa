import { MaterialIcons } from "@expo/vector-icons";
import React, { Component } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";

export default class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._isMounted = false;
  }

  render() {
    return (
      <TouchableOpacity
        style={{
          padding: "2%",
          paddingHorizontal: "5%",
          marginBottom: "2%",
          width: "100%",
          height: Dimensions.get("window").height / 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <View style={{ height: "100%", justifyContent: "center" }}>
          <MaterialIcons name={this.props.iconName} size={36} color="black" />
        </View>
        <View
          style={{
            paddingLeft: "2%",
            margin: "2%",
            maxWidth: "75%",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 24 }}>{this.props.label}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}