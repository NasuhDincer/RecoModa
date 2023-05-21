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
import DetailedPost from "./screens/DetailedPost";
import Measurements from "./screens/Measurements";
import Accounts from "./screens/Accounts";
import Notifications from "./screens/Notifications";
import RegisterMeasure from "./screens/RegisterMeasure";
import Likedpost from "./screens/WhistList";
import FollowersPage from "./screens/FollowersPage";
import FollowingPage from "./screens/FollowingPage";
import PeopleProfile from "./screens/PeopleProfile";
//import ImageDetails from "./screens/ImageDetails";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { useState, useEffect } from "react";

import Icon from "react-native-vector-icons/FontAwesome";
import SideBar from "./screens/SideBar";
import ShowPost from "./screens/ShowPost";
import ImageDetails from "./screens/ImageDetails";

const Stack = createStackNavigator();
const Tabs = createMaterialBottomTabNavigator();

const UserScreens = () => {
  const [selectedTab, setSelectedTab] = useState("home");
  return (
    <Tabs.Navigator
      initialRouteName="home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }) => {
          let iconName;
          let iconBackgroundColor = focused ? "#8D3667" : "transparent";
          let iconColor = focused ? "white" : "black";

          if (route.name === "home") {
            iconName = "home";
          } else if (route.name === "search") {
            iconName = "search";
          } else if (route.name === "upload") {
            iconName = "file-upload";
          } else if (route.name === "wishlist") {
            iconName = "add-shopping-cart";
          } else if (route.name === "profile") {
            iconName = "person";
          }

          return (
            <View
              style={{
                backgroundColor: iconBackgroundColor,
                borderRadius: 50,
                width: Dimensions.get("window").width / 14,
                height: Dimensions.get("window").width / 14,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name={iconName}
                size={Dimensions.get("window").width / 16}
                color={iconColor}
              />
            </View>
          );
        },
        tabBarLabel: null,
      })}
      barStyle={{ backgroundColor: "#E5E6E3" }}
      tabBarOptions={{
        activeTintColor: "purple",
        inactiveTintColor: "black",
        showIcon: true,
        showLabel: false,
      }}
      tabBarOnPress={({ navigation, route }) => {
        if (selectedTab !== route.name) {
          navigation.navigate(route.name); // Navigate to the pressed tab if it is different from the currently selected tab
          setSelectedTab(route.name); // Update the selected tab
        }
      }}
    >
      <Tabs.Screen name="home" component={Home} />
      <Tabs.Screen name="search" component={Search} />
      <Tabs.Screen name="upload" component={UploadImage} />
      <Tabs.Screen name="wishlist" component={Likedpost} />
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
            <Stack.Screen
              name="UserScreens"
              component={UserScreens}
            ></Stack.Screen>
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
            <Stack.Screen name="Likedpost" component={Likedpost}></Stack.Screen>
            <Stack.Screen name="MyPost" component={MyPost}></Stack.Screen>
            <Stack.Screen
              name="DetailedPost"
              component={DetailedPost}
            ></Stack.Screen>
            <Stack.Screen
              name="Notifications"
              component={Notifications}
            ></Stack.Screen>
            <Stack.Screen
              name="Measurements"
              component={Measurements}
            ></Stack.Screen>
            <Stack.Screen name="Accounts" component={Accounts}></Stack.Screen>
            <Stack.Screen
              name="RegisterMeasure"
              component={RegisterMeasure}
            ></Stack.Screen>
            <Stack.Screen name="SideBar" component={SideBar}></Stack.Screen>
            <Stack.Screen name="ShowPost" component={ShowPost}></Stack.Screen>
            <Stack.Screen
              name="FollowersPage"
              component={FollowersPage}
            ></Stack.Screen>
            <Stack.Screen
              name="FollowingPage"
              component={FollowingPage}
            ></Stack.Screen>
            <Stack.Screen
              name="ImageDetails"
              component={ImageDetails}
            ></Stack.Screen>
            <Stack.Screen
              name="PeopleProfile"
              component={PeopleProfile}
            ></Stack.Screen>
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
