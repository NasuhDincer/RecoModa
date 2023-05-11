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
  Image,
} from "react-native";

const MyPost = (props) => {
  getPersonalData = () => {};

  const postData = [
    {
      title: "Beautiful Mountain View",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare libero sed dolor placerat, at mattis nisi egestas. Pellentesque pulvinar nunc sapien, in pretium est molestie ac. ",
    },
    {
      title: "Road Through Trees",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare libero sed dolor placerat, at mattis nisi egestas. Pellentesque pulvinar nunc sapien, in pretium est molestie ac. ",
    },
    {
      title: "Autumn Leaves",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare libero sed dolor placerat, at mattis nisi egestas. Pellentesque pulvinar nunc sapien, in pretium est molestie ac. ",
    },
  ];
  return (
    <View
      style={{
        padding: "2%",
        width: `100%`,
        height: undefined,
        aspectRatio: 1,
        marginBottom: "5%",
        marginTop: 50,
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
          <Text style={styles.myPostsText}>MY POSTS</Text>
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
        <Text style={{ fontSize: 16, color: "gray" }}>
          This is an explanation of the post!
        </Text>
        <TouchableOpacity
          style={{
            width: "100%",
            paddingTop: "5%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Image
            source={require("../Assets/like.png")}
            style={{
              width: 40,
              height: 40,
              resizeMode: "contain",
              marginRight: 15,
            }}
          />
          <Image
            source={require("../Assets/comment.png")}
            style={{ width: 40, height: 40, resizeMode: "contain" }}
          />
          <View style={{ flex: 1 }} />
          <Image
            source={require("../Assets/save.png")}
            style={{ width: 40, height: 40, resizeMode: "contain" }}
          />
        </TouchableOpacity>
        <View style={{ padding: 10 }}>
          <FlatList
            data={postData}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text style={styles.itemDescription}>{item.description}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </View>
  );
};

export default MyPost;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  profileImage: {
    width: width / 6,
    height: width / 6,
    borderRadius: width / 12,
    marginRight: 60,
  },
  myPostsText: {
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
    flex: 1,
  },
  post: {
    width: width - 5,
    height: width - 5,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  comment: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
  },
});
