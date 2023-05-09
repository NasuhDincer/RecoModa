import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Login from "./screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "./screens/Home";
import { MaterialIcons } from "@expo/vector-icons";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";
import Shop from "./screens/Shop";
import Search from "./screens/Search";
import Upload from "./screens/Upload";
import UploadImage from "./screens/UploadImage";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPassword from "./screens/ForgotPassword";
import MyPost from "./screens/MyPost";
import Measurements from "./screens/Measurements";
import Accounts from "./screens/Accounts";
import Notifications from "./screens/Notifications";
import Likedpost from "./screens/WhistList";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from "./redux/store";

import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();
const Tabs = createMaterialBottomTabNavigator();

const UserScreens = () => {
  return (
    <Tabs.Navigator
      initialRouteName="home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === "home") {
            iconName = "home";
          } else if (route.name === "search") {
            iconName = "search";
          } else if (route.name === "upload") {
            iconName = "upload";
          } else if (route.name === "likedpost") {
            iconName = "add-shopping-cart";
          } else if (route.name === "profile") {
            iconName = "person";
          }
          

          return (
            <MaterialIcons
              name={iconName}
              size={Dimensions.get("window").width / 16}
              color="black"
            />
          );
        },
      })}
      barStyle={{ backgroundColor: "white" }}
    >
      <Tabs.Screen name="home" component={Home} />
      <Tabs.Screen name="search" component={Search} />
      <Tabs.Screen name="upload" component={UploadImage} />
      <Tabs.Screen name="likedpost" component={Likedpost} />
      <Tabs.Screen name="profile" component={Profile} />
    </Tabs.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={"Login"}
      >
        <Stack.Screen name="UserScreens" component={UserScreens}></Stack.Screen>
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
        ></Stack.Screen>
        <Stack.Screen name="Login" component={Login}></Stack.Screen>
        <Stack.Screen name="Settings" component={Settings}></Stack.Screen>
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
        ></Stack.Screen>
        <Stack.Screen
          name="Likedpost"
          component={Likedpost}
        ></Stack.Screen>
        <Stack.Screen name="MyPost" component={MyPost}></Stack.Screen>
        <Stack.Screen name="Notifications" component={Notifications}></Stack.Screen>
        <Stack.Screen name="Measurements" component={Measurements}></Stack.Screen>
        <Stack.Screen name="Accounts" component={Accounts}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
