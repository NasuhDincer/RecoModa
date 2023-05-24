import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import MasonryList from "@react-native-seoul/masonry-list";
import ImageComp from "./ImageComp";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Imaa from "../components/GetImages";
import rawipv4 from "../ipv4.json";
import { StyleSheet, Dimensions,ActivityIndicator } from 'react-native';

const SearchContent = ({ searchStr, searchCategory, filter }) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    // Fetch data on component mount
    if(!searchStr){
      handleSubmit();
    }
    else{
      handleSearchStr()
    }
    
  }, [searchStr]);

  useEffect(() => {
    if(searchCategory.length == 0){
      handleSubmit();
    }
    else{
      console.log("cat:: ", searchCategory)
      const categoriesString = searchCategory.join(',');
      console.log("cat:: ", categoriesString)
      handleSearchCategory(categoriesString);
    }
 
  }, [searchCategory]);

  useEffect(() => {
    if(!filter){
      handleSubmit();
    }
    else{
      console.log("ff : ", filter)
    }
 
  }, [filter]);
   
  const handleSearchStr = async () => {
    try {
      setIsLoading(true)
      const ipv4Address = rawipv4["ip"];
      const res = await axios.get(
        "http://" + ipv4Address + `:5000/api/post/search/${searchStr}`
      );
      //console.log("StrSearch : ", res.data);
      setData(res.data);
      setIsLoading(false)

      }
      catch{}
  };
  const handleSearchCategory = async (categoryString) => {
    try {
      setIsLoading(true)
      const ipv4Address = rawipv4["ip"];
      const res = await axios.get(
        "http://" + ipv4Address + `:5000/api/post/allCategory/${categoryString}`
      );
      //console.log("StrSearch : ", res.data);
      setData(res.data);
      setIsLoading(false)
      }
      catch{}
  };

  const handleSubmit = async () => {
    try {
     // console.log("There bb");
      setIsLoading(true)
      if(originalData.length == 0)
      {
        const ipv4Address = rawipv4["ip"];
        //console.log(ipv4Address);
        const res = await axios.get(`http://${ipv4Address}:5000/api/post/`);
        //console.log(Object.keys(res.data));
        //console.log(Object.keys(res.data[0]));
        setData(res.data);
        setOriginalData(res.data)
        console.log(" işlemmm")
      }
      else{
        setData(originalData)
      }
     
      
      setIsLoading(false)

    } catch (error) {
      console.log(error);
    }

    //props.navigation.navigate("Home")
  };

  const windowWidth = Dimensions.get('window').width;
 
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

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
