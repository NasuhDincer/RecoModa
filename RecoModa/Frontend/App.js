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
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPassword from "./screens/ForgotPassword";

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
          } else if (route.name === "shop") {
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
      <Tabs.Screen name="shop" component={Shop} />
      <Tabs.Screen name="profile" component={Profile} />
    </Tabs.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={"Login"}
      >
        <Stack.Screen name="UserScreens" component={UserScreens}></Stack.Screen>
        <Stack.Screen name="RegisterScreen" component={RegisterScreen}></Stack.Screen>
        <Stack.Screen name="Login" component={Login}></Stack.Screen>
        <Stack.Screen name="Settings" component={Settings}></Stack.Screen>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
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