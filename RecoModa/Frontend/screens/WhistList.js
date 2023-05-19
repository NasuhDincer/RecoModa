import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MasonryList from "@react-native-seoul/masonry-list";
import RecoPost from "../components/RecoPost";
import rawipv4 from "../ipv4.json";
import axios from "axios";
const WhistList = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [posts, setPosts] = useState([]);
  const [wishlist, setWishList] = useState([]);
  console.log("Userinfo: ", user.user)
  console.log(user.user.favoriteProductList);
  console.log(user.user.favoriteProductList.length)
  useEffect(() => {
    setWishList(user.user.favoriteProductList);
    console.log(user.user.favoriteProductList);
    console.log(user.user.favoriteProductList.length)
  }, []);
  
  return (
    <SafeAreaView style={styles.container} forceInset={{ bottom: "never" }}>
      <Text style={styles.title}>Your WishList</Text>
      <FlatList
        contentContainerStyle={{
          width: "100%",
        }}
        data={user.user.favoriteProductList}
        renderItem={({ item }) => (
          <RecoPost post={item}></RecoPost>
        )}
        keyExtractor={(item, key) => item} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingTop: 25,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
  },
  image: {
    width: "49%",
    height: undefined,
    aspectRatio: 1,
  },
});
export default WhistList;
