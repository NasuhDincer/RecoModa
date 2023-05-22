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
import { useNavigation, useRoute } from "@react-navigation/native";
const FollowersPage = () => {
  const [followers, setFollowers] = useState([]);
  const [followerDetails, setFollowerDetails] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  const [isLoading, setIsLoading] = useState(true);
  const route = useRoute();
  const userId = route.params.userId
  useEffect(() => {
    fetchFollowers();
  }, []);

  const fetchFollowers = async () => {
    try {
      const ipv4Address = rawipv4["ip"];
      const res = await axios.get(
        "http://" + ipv4Address + `:5000/api/media/mediaUser/${userId}`
      );
      console.log("FollowersDSFSD", res.data);
      console.log("Followers dataSDFDSFDS", res.data[0].followerList);
      setFollowers(res.data[0].followerList);
      console.log(res.data);
      if (!res.data || res.data.length === 0 || !res.data[0].followerList) {
        // If response data or followerList is undefined or empty, set loading state to false
        setIsLoading(false);
        return;
      }
      const tempFollowerDetails = [];

      for (let i = 0; i < res.data[0].followerList.length; i++) {
        console.log("sakdjsa");
        console.log(res.data[0].userId)
        const res2 = await axios.get(
          "http://" + ipv4Address + `:5000/api/users/find/${res.data[0].followerList[i]}`
        );
        console.log("RES2", res2.data);
        const username = res2.data.username;
        const name = res2.data.username;
        console.log(username)
        console.log(name)
        tempFollowerDetails.push({ id: res.data[0].followerList[i], username, name });
      }

      setFollowerDetails(tempFollowerDetails);
      setIsLoading(false);
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
      <Text style={styles.title}>Followers</Text>
      <FlatList
        data={followers}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          console.log("Item:", item);
          const followerDetail = followerDetails.find(
            (follower) => follower.id === item
          );

          if (!followerDetail) {
            // Handle the case where followerDetail is not found
            return null; // Return null or a loading indicator
          }

          return (
            <View style={styles.followerItem}>
              <Text style={styles.followerName}>{followerDetail.name} </Text>
              <Text style={styles.followerUsername}>
                @{followerDetail.username}{" "}
              </Text>
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
  followerItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  followerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  followerUsername: {
    fontSize: 14,
    color: "#888888",
  },
});

export default FollowersPage;
