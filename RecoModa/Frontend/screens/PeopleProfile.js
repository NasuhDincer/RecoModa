import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
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
import {
  useFonts,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
} from "@expo-google-fonts/nunito";
import AppLoading from "expo-app-loading";
import rawipv4 from "../ipv4.json";

const PeopleProfile = () => {
  const description =
    "Hi, I am a digital content creator.Hi, I am a digital content creator. Hi, I am a digital content creator. Hi, I am a digital content creator.";
  const [mediaProfile, setMediaProfile] = useState({});
  const [media, setMedia] = useState({});
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [username, setUserName] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const route = useRoute();
  const clickedUserId = route.params.userId;
  const navigation = useNavigation(); // Use the useNavigation hook
  const user = useSelector((state) => state.user.currentUser);
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
  });

  useEffect(() => {
    // this function will be called after the component is mounted or updated
    handleSubmit();
    handleFollowers();
    console.log("userId : ", clickedUserId);
    console.log("currenUser", user.user._id);
  }, []);

  const handleSubmit = async () => {
    try {
      const ipv4Address = rawipv4["ip"];
      const res = await axios.get(
        "http://" + ipv4Address + `:5000/api/mediaprofile/${clickedUserId}`
      );
      console.log("HEHEHEH", res.data);
      setMediaProfile(res.data);

      const res2 = await axios.get(
        "http://" + ipv4Address + `:5000/api/media/mediaUser/${clickedUserId}`
      );
      var isUserInFollowerList = res2.data[0].followerList.includes(
        user.user._id
      );
      console.log("isUserInFollowerList: ", isUserInFollowerList);
      console.log("Tarik", res2.data[0].followersList);
      setIsFollowing(isUserInFollowerList);
    } catch (error) {
      // handle error response
      console.log(error);
    }
    //props.navigation.navigate("Home")
  };

  const handleFollowers = async () => {
    try {
      const ipv4Address = rawipv4["ip"];
      const res = await axios.get(
        "http://" + ipv4Address + `:5000/api/media/mediaUser/${clickedUserId}`
      );
      console.log("Followers", res.data);
      //setMedia(res.data[0])
      //const obj = JSON.parse(res.data);
      var follower = 0;
      //console.log("follower :", media.followerList.length)
      setFollowers(res.data[0].followerList.length);
      var followed = 0;

      //console.log("followerd :", media.followedList.length)
      setFollowing(res.data[0].followedList.length);
      console.log("sakdjsa");
      const res2 = await axios.get(
        "http://" + ipv4Address + `:5000/api/users/find/${clickedUserId}`
      );
      console.log("RES2", res2.data);
      setUserName(res2.data.username);
      const res3 = await axios.get(
        "http://" + ipv4Address + `:5000/api/post/allPosts/${res.data[0]._id}`
      );
      console.log("res3data", Object.keys(res3.data[0]));
      //console.log("Hehehe", res2.data[0].description);
      setPosts(res3.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFollow = async (clickedUserId, userId) => {
    try {
      const ipv4Address = rawipv4["ip"];
      console.log(clickedUserId);
      console.log(userId);
      const res = await axios.put(
        "http://" + ipv4Address + `:5000/api/media/follow/${clickedUserId}`,
        { userId }
      );

      console.log("hehehehehehe", res.data);
      // Handle success
      setIsFollowing(true);
      console.log("You are now following this user");
      handleFollowers();
    } catch (error) {
      // Handle error
      console.log("Error following user:", error);
    }
  };

  const handleUnfollow = async (clickedUserId, userId) => {
    try {
      const ipv4Address = rawipv4["ip"];
      console.log(clickedUserId);
      console.log(userId);
      const res = await axios.put(
        "http://" + ipv4Address + `:5000/api/media/unfollow/${clickedUserId}`,
        { userId }
      );
      console.log("hehehehehehe", res.data);
      // Handle success
      setIsFollowing(false);
      console.log("You are now following this user");
      handleFollowers();
    } catch (error) {
      // Handle error
      console.log("Error following user:", error);
    }
  };
  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView
      style={{ width: "100%", height: "100%", backgroundColor: "#e3e2e0" }}
    >
      <View
        style={{
          width: "100%",
          height: "8%",
          paddingHorizontal: "5%",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: "5%",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <MaterialIcons
            name="settings"
            size={36}
            color="black"
            style={styles.settingsButton}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ left: 10 }}>
            <Image
              style={[styles.profileImage]}
              source={require("../Assets/user.png")}
            />
            <Text
              style={[
                styles.stat,
                { fontFamily: "Nunito_500Medium", marginTop: 5, fontSize: 18 },
              ]}
            >
              {" "}
              {username}
            </Text>
          </View>
          <View style={[styles.stats, { flexDirection: "row" }]}>
            <View style={{ flexDirection: "column" }}>
              <Text style={[styles.stat, { fontSize: 18 }]}>
                {posts.length}
              </Text>
              <Text
                style={[
                  styles.stat,
                  { fontFamily: "Nunito_600SemiBold", fontSize: 18 },
                ]}
              >
                Posts
              </Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={[styles.stat, { fontSize: 18 }]}>{followers}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("FollowersPage", {
                    userId: clickedUserId,
                  })
                }
              >
                <Text
                  style={[
                    styles.stat,
                    { fontFamily: "Nunito_600SemiBold", fontSize: 18 },
                  ]}
                >
                  Followers
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={[styles.stat, { fontSize: 18 }]}>{following}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("FollowingPage", {
                    userId: clickedUserId,
                  })
                }
              >
                <Text
                  style={[
                    styles.stat,
                    { fontFamily: "Nunito_600SemiBold", fontSize: 18 },
                  ]}
                >
                  Following
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            marginLeft: 20,
            marginTop: 5,
            marginBottom: 20,
            marginRight: 10,
          }}
        >
          <Text>{description}</Text>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={() =>
              isFollowing
                ? handleUnfollow(clickedUserId, user.user._id)
                : handleFollow(clickedUserId, user.user._id)
            }
          >
            <Text style={styles.followButton}>
              {isFollowing ? "Unfollow" : "Follow"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.minibar}>
          <TouchableOpacity style={styles.minibarItem}>
            <MaterialIcons name="apps" size={36} color="black" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.Scrollcontainer}>
          <View style={styles.postsContainer}>
            {posts.map((item, index) => (
              <TouchableOpacity
                postDetail={item}
                key={item._id}
                onPress={() =>
                  navigation.navigate("ShowPost", { postId: item })
                }
                style={index % 3 === 0 ? styles.firstPostItem : styles.postItem}
              >
                <Image
                  style={styles.postImage}
                  source={{ uri: `data:image/png;base64,${item.img[0].data}` }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default PeopleProfile;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E5E6E3",
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
  container: {
    flex: 1,
    backgroundColor: "#E5E6E3",
    paddingTop: -20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 10,
    marginBottom: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  settingsButton: {
    marginTop: 15,
  },
  buttonRow: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  stat: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 10,
  },
  minibar: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
  },
  minibarItem: {
    paddingHorizontal: 20,
  },
  minibarText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  postsContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  postsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  postImage: {
    width: "30%",
    height: 200,
    marginBottom: 10,
    marginHorizontal: "35%",
    borderRadius: 100,
  },
  postsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 10,
  },
  firstPostItem: {
    flexBasis: "49%",
    marginVertical: 1,
    //backgroundColor: "black",
    // margin: 10,
    borderRadius: 10,
    borderColor: "#9A9494",
    padding: 1,
    //marginLeft: 10,
  },
  postItem: {
    flexBasis: "49%",
    marginVertical: 1,
    borderRadius: 10,
    // margin: 10,
    padding: 1,
    // marginRight: 10,
    borderRadius: 10,
    borderColor: "#9A9494",
  },
  postImage: {
    width: "100%",
    aspectRatio: 1,
  },
  Scrollcontainer: {
    flex: 1,
  },
  followButton: {
    paddingHorizontal: "20%",
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: "#8D3667",
    fontSize: 16,
    left: 10,
    fontFamily: "Nunito_600SemiBold",
    color: "white",
  },
});
