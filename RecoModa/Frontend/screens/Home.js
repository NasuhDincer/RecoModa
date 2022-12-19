import React, { Component } from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Post from "../components/Post";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ["1", "2", "3"],
    };
    this._isMounted = false;
  }

  changeEmail = (text) => {
    this.setState({ email: text });
  };

  changePassword = (text) => {
    this.setState({ password: text });
  };

  render() {
    return (
      <SafeAreaView style={{ width: "100%", height: "100%" }}>
        <View
          style={{
            width: "100%",
            height: "13%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            adjustsFontSizeToFit
            style={{
              fontSize: Dimensions.get("window").width / 12,
              fontWeight: "bold",
              marginTop: "5%",
              textAlign: "center"
            }}
          >
            RecoModa
          </Text>
        </View>
        <FlatList
          contentContainerStyle={{
            width: "100%",
          }}
          data={this.state.data}
          renderItem={({ item, index }) => <Post></Post>}
          keyExtractor={(item, key) => item}
        />
      </SafeAreaView>
    );
  }
}
export const screenOptions = (navData) => {
  return {
    headerTitle: "SocialApp",
    headerRight: () => (
      <Ionicons
        name={Platform.OS === "android" ? "md-chatboxes" : "ios-chatboxes"}
        size={24}
        color={Platform.OS === "android" ? "#fff" : Colors.brightBlue}
        style={{ padding: 15, marginRight: 5 }}
        onPress={() => navData.navigation.navigate("ChatList")}
      />
    ),
  };
};

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