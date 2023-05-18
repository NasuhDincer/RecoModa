import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import MasonryList from "@react-native-seoul/masonry-list";
import ImageComp from "./ImageComp";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Imaa from "../components/GetImages";
import rawipv4 from "../ipv4.json";
import { StyleSheet, Dimensions } from 'react-native';

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

  const windowWidth = Dimensions.get('window').width;

  return (
    <View style={{ flex: 1 }}>
      <MasonryList
        data={data}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("ShowPost", { postId: item })}
            style={styles.searchImageContainer}
          >
            <Imaa imaa={item} style={{ ...styles.image, width: windowWidth * 0.6,}} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, key) => item._id}
        onEndReachedThreshold={0.5}
        ListFooterComponent={<View style={{ height: 100 }} />}
        columnWrapperStyle={styles.columnWrapper}
        spacing={10}
      />
    </View>
  );
};

export default SearchContent;

const styles = StyleSheet.create({
  searchImageContainer: {
    flex: 1,
    aspectRatio: 0.70,
    borderRadius: 10,
    overflow: 'hidden',
    // backgroundColor: "black",
    borderRadius: 10,
    // borderWidth: 2,
    // borderColor: "black",
    // margin: 5,
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 5,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});
