import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import MasonryList from "@react-native-seoul/masonry-list";
import ImageComp from "./ImageComp";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Imaa from "../components/GetImages";
import rawipv4 from "../ipv4.json";
import { StyleSheet } from 'react-native';

const SearchContent = ({ setShowCamera }) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    // Fetch data on component mount
    handleSubmit();
  }, []);

  const handleSubmit = async () => {
    try {
      console.log("There bb");
      const ipv4Address = rawipv4["ip"];
      console.log(ipv4Address);
      const res = await axios.get(`http://${ipv4Address}:5000/api/post/`);
      console.log(Object.keys(res.data));
      console.log(Object.keys(res.data[0]));
      setData(res.data);
    } catch (error) {
      console.log(error);
    }

    //props.navigation.navigate("Home")
  };

  return (
    <View style={{ flex: 1 }}>
      <MasonryList
        data={data}
        numColumns={2}
        contentContainerStyle={{
          alignSelf: "stretch",
          // backgroundColor: "black"
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={styles.searchImageContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ShowPost", { postId: item })}
            // style={{ flexBasis: "49%", }}
          >
            <Imaa imaa={item} />
          </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, key) => item._id}
        onEndReachedThreshold={0.5}
        ListFooterComponent={<View style={{ height: 100 }} />}
      />
    </View>
  );
};

export default SearchContent;

const styles = StyleSheet.create({
  searchImageContainer: {
    width: "220%",
   // backgroundColor: "black",
    marginLeft: "-60%",
    marginBottom: "-75%",
    marginTop: "-25%",
  },
});