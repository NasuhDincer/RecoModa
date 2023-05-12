import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
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
import Post from "../components/Post";
const Profile = (props) => {
  const [mediaProfile, setMediaProfile] = useState({});
  const [media, setMedia] = useState({});
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");

  const navigation = useNavigation(); // Use the useNavigation hook
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    // this function will be called after the component is mounted or updated
    handleSubmit();
    handleFollowers();
    console.log("userId : ", user.user._id);
  }, []);

  const handleSubmit = async () => {
    try {
      const ipv4Address = "192.168.0.12";
      const res = await axios.get(
        "http://" + ipv4Address + `:5000/api/mediaprofile/${user.user._id}`
      );
      console.log(res.data);
      setMediaProfile(res.data);
    } catch (error) {
      // handle error response
      console.log(error);
    }
    //props.navigation.navigate("Home")
  };

  const handleFollowers = async () => {
    try{
      const ipv4Address = "192.168.0.12";
      const res = await axios.get(
        "http://" + ipv4Address + `:5000/api/media/mediaUser/${user.user._id}`
      );
      console.log(res.data);
      //setMedia(res.data[0])
      //const obj = JSON.parse(res.data);
      var follower = 0;
     
      //console.log("follower :", media.followerList.length)
      setFollowers( res.data[0].followerList.length)
      var followed  = 0;

      //console.log("followerd :", media.followedList.length)
      setFollowing( res.data[0].followedList.length)

      const res2 = await axios.get(
        "http://" + ipv4Address + `:5000/api/post/allPosts/${res.data[0]._id}`
      );
      console.log("res2data", Object.keys(res2.data[0]))
      console.log("Hehehe", res2.data[0].description)
      setPosts(res2.data)

    }catch(error){
      console.log(error)
    }
  }

  return (
    <SafeAreaView style={{ width: "100%", height: "100%" }}>
      <View
        style={{
          width: "100%",
          height: "7%",
          paddingHorizontal: "5%",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: "5%",
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Settings")}
        >
          <MaterialIcons name="settings" size={36} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.profileImage}
            source={require("../Assets/user.png")}
          />
          <View style={styles.stats}>
            <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
              <Text style={styles.stat}>Username: {user.user.username}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("FollowersPage")}>
              <Text style={styles.stat}>Followers: {followers}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("FollowingPage")}>
              <Text style={styles.stat}>Following: {following}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.minibar}>
          <TouchableOpacity style={styles.minibarItem}>
            <MaterialIcons name="apps" size={36} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.minibarItem}>
            <MaterialIcons name="checkroom" size={36} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.minibarItem}>
            <MaterialIcons name="bookmark" size={36} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.postsContainer}>
          <View style={styles.postsRow}>     
          {

              posts.map((item) => (<TouchableOpacity
              postDetail ={item}
              key={item._id}
              onPress={() => navigation.navigate("MyPost")}
            >
              <Image
                style={styles.postImage}
                source={{ uri: `data:image/png;base64,${item.img[0].data}` }}
              />
            </TouchableOpacity> ))
            }
          </View>
       
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Profile;
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  settingsButton: {
    padding: 10,
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
    width: 70,
    height: 70,
  },
});
