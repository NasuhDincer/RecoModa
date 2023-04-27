import React, { Component } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._isMounted = false;
  }

  render() {
    return (
      <View
        style={{
          padding: "2%",
          width: `100%`,
          height: undefined,
          aspectRatio: 1,
          marginBottom: "5%",
        }}
      >
        <View
          style={{
            height: "10%",
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              height: "100%",
              width: "80%",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../Assets/user.png")}
              style={{
                width: undefined,
                height: "100%",
                aspectRatio: 1,
                resizeMode: "contain",
              }}
            />
            <View style={{ width: "5%" }}></View>
            <Text>Nasuh Dinçer</Text>
          </View>
          <View
            style={{
              height: "100%",
              width: "20%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>2 days ago</Text>
          </View>
        </View>
        <View style={{ width: "100%", height: "60%" }}>
          <Image
            source={require("../Assets/logoicon.png")}
            style={{
              width: "100%",
              height: undefined,
              aspectRatio: 1.7,
              resizeMode: "contain",
            }}
          />
        </View>
        <View style={{ width: "100%", height: "30%" }}>
          <Text style={{ fontSize: 24 }}>First Post</Text>
          <Text style={{ fontSize: 16, color: "gray" }}>
            This is an explanation of the post!
          </Text>
          <TouchableOpacity
            style={{ width: "100%", height: "40%", paddingTop: "5%" }}
          >
            <Image
              source={require("../Assets/like.png")}
              style={{
                height: "100%",
                aspectRatio: 1,
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}