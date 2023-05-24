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
import { useNavigation } from "@react-navigation/native";
import RecoPost from "../components/RecoPost";
import rawipv4 from "../ipv4.json";
import axios from "axios";
const WhistList = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [posts, setPosts] = useState([]);
  const [wishlist, setWishList] = useState([]);
  const navigation = useNavigation(); // Use the useNavigation hook

  console.log("Userinfo: ", user.user)
  console.log(user.user.favoriteProductList);
  console.log(user.user.favoriteProductList.length)
  
  useEffect(() => {
  
    const unsubscribe = navigation.addListener('focus', () => {
      handleWishList();
    });
    return unsubscribe;
  }, [navigation]);

  const handleWishList = async () => {
    try {
      const ipv4Address = rawipv4["ip"];
      const res = await axios.get(
        "http://" + ipv4Address + `:5000/api/media/mediaUser/${user.user._id}`
      );
      console.log("FAV : ", res.data[0].favoritePostList);
      setWishList(res.data[0].favoritePostList);
      }
      catch{}
  }
  
  return (
    <SafeAreaView style={styles.container} forceInset={{ bottom: "never" }}>
      <Text style={styles.title}>Your WishList</Text>
      <FlatList
        contentContainerStyle={{
          width: "100%",
        }}
        data={wishlist}
        renderItem={({ item }) => (
          <View style={styles.wishcontainer}>
          <RecoPost post={item}></RecoPost>
          </View>
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
    // backgroundColor: "black"
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    marginTop: 5,
    marginLeft: 5,
    color: "#8D3667",
  },
  image: {
    width: "49%",
    height: undefined,
    aspectRatio: 1,
    // backgroundColor: "black"
  },
  wishcontainer:  {
    // backgroundColor: "black"
  },
});
export default WhistList;
