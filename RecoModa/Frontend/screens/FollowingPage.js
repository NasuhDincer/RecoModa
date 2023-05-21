import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import rawipv4 from "../ipv4.json";

const FollowingPage = () => {
  const [following, setFollowing] = useState([]);
  const [followingDetails, setFollowingDetails] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFollowings();
  }, []);

  const fetchFollowings = async () => {
    try {
      const ipv4Address = rawipv4["ip"];
      const res = await axios.get(
        "http://" + ipv4Address + `:5000/api/media/mediaUser/${user.user._id}`
      );
      console.log("Followings", res.data);
      console.log("Following data", res.data[0].followingList);
      setFollowing(res.data[0].followingList);
      console.log(res.data);
      if (!res.data || res.data.length === 0 || !res.data[0].followingList) {
        // If response data or followerList is undefined or empty, set loading state to false
        setIsLoading(false);
        return;
      }
      const tempFollowingDetails = [];

      for (let i = 0; i < res.data[0].followingList.length; i++) {
        console.log("sakdjsa");
        const res2 = await axios.get(
          "http://" + ipv4Address + `:5000/api/users/find/${res.data[0].userId}`
        );
        console.log("RES2", res2.data);
        const username = res2.data.username;
        const name = res2.data.username;
        tempFollowingDetails.push({ id: res.data[0].followingList[i], username, name });
      }

      setFollowingDetails(tempFollowingDetails);

    } catch (error) {
      console.log("Error fetching following:", error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Followings</Text>
      <FlatList
        data={following}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          console.log("Item:", item);
          const followingDetail = followingDetails.find((followings) => followings.id === item);

          if (!followingDetail) {
            // Return a loading indicator or handle the case where followingDetail is not found
            return null;
          }

          return (
            <View style={styles.followingItem}>
              <Text style={styles.followingName}>{followingDetail.name} </Text>
              <Text style={styles.followingUsername}>@{followingDetail.username}{" "} </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  followingItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  followingName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  followingUsername: {
    fontSize: 14,
    color: "#888888",
  },
});

export default FollowingPage;
