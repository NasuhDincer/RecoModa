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

const FollowingsPage = () => {
  const [followeds, setfollowed] = useState([]);
  const [followedDetails, setfollowedDetails] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  const [isLoading, setIsLoading] = useState(true);
  const route = useRoute();
  const userId = route.params.userId
  useEffect(() => {
    fetchfolloweds();
  }, []);

  const fetchfolloweds = async () => {
    try {
      const ipv4Address = rawipv4["ip"];
      const res = await axios.get(
        "http://" + ipv4Address + `:5000/api/media/mediaUser/${userId}`
      );
      console.log("followeds", res.data);
      console.log("followed data", res.data[0].followedList);
      setfollowed(res.data[0].followedList);
      console.log(res.data);
      if (!res.data || res.data.length === 0 || !res.data[0].followedList) {
        // If response data or followerList is undefined or empty, set loading state to false
        setIsLoading(false);
        return;
      }
      const tempfollowedDetails = [];

      for (let i = 0; i < res.data[0].followedList.length; i++) {
        console.log("sakdjsa");
        console.log(res.data[0].userId)
        const res2 = await axios.get(
          "http://" + ipv4Address + `:5000/api/users/find/${res.data[0].followedList[i]}`
        );
        console.log("RES2", res2.data);
        const username = res2.data.username;
        const name = res2.data.username;
        tempfollowedDetails.push({ id: res.data[0].followedList[i], username, name });
      }

      setfollowedDetails(tempfollowedDetails);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching followed:", error);
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
      <Text style={styles.title}>followeds</Text>
      <FlatList
        data={followeds}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          console.log("Item:", item);
          const followedDetail = followedDetails.find(
            (followed) => followed.id === item
            );

          if (!followedDetail) {
            // Return a loading indicator or handle the case where followedDetail is not found
            return null;
          }

          return (
            <View style={styles.followedItem}>
              <Text style={styles.followedName}>{followedDetail.name} </Text>
              <Text style={styles.followedUsername}>
                @{followedDetail.username}{" "}
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
  followedItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  followedName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  followedUsername: {
    fontSize: 14,
    color: "#888888",
  },
});

export default FollowingsPage;
