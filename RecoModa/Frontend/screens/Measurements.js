import React, { Component } from "react";
import { Text, View, ScrollView, Image, SafeAreaView } from "react-native";
import InputSpinner from "react-native-input-spinner";
import Styles from "./Styles";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    let data = [];
    for (var i = 0; i < 10; i++) {
      data.push({
        key: String(i),
        value: Math.floor(Math.random() * 100) + 1,
      });
    }
    this.state = {
      name: "",
      surname: "",
      email: "",
      password: "",
      phoneNumber: "",
      search: "",
      value: 1,
      valueReal: 1.5,
      colorLeft: this.getRandomColor(),
      colorRight: this.getRandomColor(),
      data: data,
    };
    this._isMounted = false;
  }

  getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getPersonalData = () => {};

  render() {
    return (
      <SafeAreaView style={Styles.mainContainer}>
        <ScrollView style={Styles.container}>
          <Text style={Styles.title}>Measurements</Text>
          <View style={Styles.col}>
            <Text style={Styles.text}>Height</Text>
            <InputSpinner
              value={this.state.value}
              style={Styles.spinner}
              min={120}
              max={225}
            />
          </View>
          <View style={Styles.col}>
            <Text style={Styles.text}>Weight</Text>
            <InputSpinner
              value={this.state.value}
              style={Styles.spinner}
              min={35}
              max={300}
            />
          </View>
          <View style={Styles.col}>
            <Text style={Styles.text}>Waist Circumference</Text>
            <InputSpinner
              value={this.state.value}
              style={Styles.spinner}
              min={0}
              max={3}
            />
          </View>
          <View style={Styles.col}>
            <Text style={Styles.text}>Neck Width</Text>
            <InputSpinner
              value={this.state.value}
              style={Styles.spinner}
              min={0}
              max={3}
            />
          </View>
          <View style={Styles.col}>
            <Text style={Styles.text}>Hip Circumference</Text>
            <InputSpinner
              value={this.state.value}
              style={Styles.spinner}
              min={0}
              max={3}
            />
          </View>
          <View style={Styles.col}>
            <Text style={Styles.text}>Shoulder Width</Text>
            <InputSpinner
              value={this.state.value}
              style={Styles.spinner}
              min={0}
              max={3}
            />
          </View>
          <View style={Styles.col}>
            <Text style={Styles.text}>Chest Circumference</Text>
            <InputSpinner
              value={this.state.value}
              style={Styles.spinner}
              min={0}
              max={3}
            />
          </View>
          <View style={Styles.col}>
            <Text style={Styles.text}>Leg Length</Text>
            <InputSpinner
              value={this.state.value}
              style={Styles.spinner}
              min={0}
              max={3}
            />
          </View>
          <View style={Styles.col}>
            <Text style={Styles.text}>Foot Size</Text>
            <InputSpinner
              value={this.state.value}
              style={Styles.spinner}
              min={0}
              max={3}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
