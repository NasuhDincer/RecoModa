import React, { Component, useEffect,useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import rawipv4 from "../ipv4.json";

import { createIconSet } from 'react-native-vector-icons';

const Post = (props) => {
  const [data, setData] = useState({});
  const user = useSelector((state) => state.user.currentUser);
  //const glyphMap = { 'icon-name': 1234, test: '∆' };
  //const Icon = createIconSet(glyphMap, 'FontName', 'font-name.ttf');
  
  useEffect(() => {
   handleSubmit();
    
  }, []);

  const handleSubmit = async () => {
    
    try {
      const ipv4Address = rawipv4["ip"];
      //console.log("post : ",props.post.mediaId)
      const res = await axios.get(
        "http://" + ipv4Address + `:5000/api/media/media/${props.post.mediaId}`
      );
      //console.log(res.data);
      //setData(res.data.userId);
      const res2 = await axios.get(
        "http://" + ipv4Address + `:5000/api/users/find/${res.data.userId}`
      );
      //console.log(res2.data.username)
      setData(res2.data.username);
    } catch (error) {
      // handle error response
      console.log(error);
    }

    //props.navigation.navigate("Home")
  };

  const handleLike = async () => {
    
    try {
      const ipv4Address = rawipv4["ip"];
      console.log("like : ")
      const res = await axios.get(
        "http://" + ipv4Address + `:5000/api/media/mediaUser/${user.user._id}`
      );
      const res2 = await axios.put(
        "http://" + ipv4Address + `:5000/api/media//addLike/${res.data[0]._id}`, {postId : props.post._id}
      );
      console.log(res2.data);
      //setData(res.data.userId);
      /*const res2 = await axios.get(
        "http://" + ipv4Address + `:5000/api/users/find/${res.data.userId}`
      );
      //console.log(res2.data.username)
      setData(res2.data.username);*/
    } catch (error) {
      // handle error response
      console.log(error);
    }

    //props.navigation.navigate("Home")
  };
return (<>
  <View
    style={{
      padding: "2%",
      width: `90%`,
      height: undefined,
      aspectRatio: 1,
      marginBottom: "5%",
      backgroundColor: "white",
      borderRadius: 10,
      borderWidth: 2,
      borderColor: 'lightgrey',
      margin: 20,
    }}
  >
    <View
      style={{
        height: "10%",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 5,
        // backgroundColor: "black",
      }}
    >
      <View
        style={{
          height: "100%",
          width: "80%",  
          flexDirection: "row",
          alignItems: "center",
          
        }}
      >
        <Image
          source={require("../Assets/user.png")}
          style={{
            width: undefined,
            height: "100%",
            aspectRatio: 1,
            resizeMode: "contain",
          }}
        />
        <View style={{ width: "5%" }}></View>
        <Text>{JSON.stringify(data).replace(/"/g, '')}</Text> 
      </View>
      <View
        style={{
          height: "100%",
          width: "20%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>2 days ago</Text>
      </View>
    </View>
    <View style={{ width: "100%", height: "60%", borderBottomWidth: 2, borderColor: 'lightgrey', borderTopWidth: 2, borderColor: 'lightgrey', marginBottom: "1%", }}>
      <Image
        source={{ uri: `data:image/png;base64,${props.post.img[0].data}` }}
        style={{
          width: "100%",
          height: undefined,
          aspectRatio: 1.7,
          resizeMode: "contain",
        }}
      />
    </View>
    <View style={{ width: "100%", height: "30%" }}>
      <Text style={{ fontSize: 24 }}>{props.post.description}</Text>
      <Text style={{ fontSize: 16, color: "gray" }}>
      {props.post.description}
      </Text>
      <TouchableOpacity
        style={{ width: "50%", height: "40%", paddingTop: "5%" }}
        onPress = {handleLike}
      >
        <Image
          source={require("../Assets/like.png")}
          
          style={{
            height: "100%",
            aspectRatio: 1,
            resizeMode: "contain",
          }}
        />
        <MaterialIcons name={ "comment" } size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
          style={{ width: "50%", height: "40%", paddingTop: "5%" }}
          onPress = {handleLike}
        >
        <MaterialIcons name={ "comment" } size={24} color="black" />
      </TouchableOpacity>


    </View>
  </View>
  </>);
}
export default Post;
