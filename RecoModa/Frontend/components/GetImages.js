import React, { Component, useEffect,useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import axios from "axios";
import rawipv4 from "../ipv4.json";

const Imaa = (props) => {
  const [data, setData] = useState({});
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
   handleSubmit();
    
  }, []);

  const handleSubmit = async () => {
    
    try {
      const ipv4Address = rawipv4["ip"];
      //console.log("post : ",props.post.mediaId)
      const res = await axios.get(
        "http://" + ipv4Address + `:5000/api/media/media/${props.imaa.mediaId}`
      );
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
      width: `100%`,
      height: undefined,
      aspectRatio: 1,
      marginBottom: "5%",
    }}
  >
    <View
      style={{
        height: "10%",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
    </View>
    <View style={{ width: "100%", height: "60%" }}>
      <Image
        source={{ uri: `data:image/png;base64,${props.imaa.img[0].data}` }}
        style={{
          width: "100%",
          height: undefined,
          aspectRatio: 1.7,
          resizeMode: "contain",
        }}
      />
    </View>
  </View>
  </>);
}
export default Imaa;
