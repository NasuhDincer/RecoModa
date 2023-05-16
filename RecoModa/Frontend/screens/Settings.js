import { MaterialIcons } from "@expo/vector-icons";
import React, { Component } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
// import Settings from './Settings';
import Notifications from './Notifications';
import { useDispatch, useSelector } from "react-redux";
import {logout} from "../redux/userRedux.js"


const Stack = createStackNavigator();


const Settings = (props) => {
  const settingOptions = [
    { label: "Notifications", iconName: "notifications" },
    { label: "Security", iconName: "security" },
    { label: "Account", iconName: "account-circle" },
    { label: "Measurements", iconName: "aspect-ratio" },
    { label: "Logout", iconName: "logout" },
  ];
  const dispatch = useDispatch();
  const handleOptionPress = (label) => {
    switch (label) {
      case "Notifications":
        props.navigation.navigate('Notifications');
        break;
      case "Security":
        props.navigation.navigate('Notifications');
        break;
      case "Account":
        props.navigation.navigate('Accounts');
        break;
      case "Measurements":
        props.navigation.navigate('Measurements');
        break;
      case "Logout":
        dispatch(logout());
        props.navigation.navigate('Login');
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>
      <FlatList
        style={styles.optionsList}
        data={settingOptions}
        keyExtractor={(item, index) => item.label}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => handleOptionPress(item.label)}
          >
            <MaterialIcons name={item.iconName} size={24} color="black" />
            <Text style={styles.optionLabel}>{item.label}</Text>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Settings;




const styles = StyleSheet.create({
  header: {
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#DDDDDD",
    marginTop: 30
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
  },
  optionsList: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#DDDDDD",
  },
  optionLabel: {
    marginLeft: 16,
    fontSize: 16,
    color: "#333333",
    flex: 1,
  },

});
