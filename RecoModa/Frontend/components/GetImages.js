import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
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
      const res = await axios.get(
        "http://" + ipv4Address + `:5000/api/media/media/${props.imaa.mediaId}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        //padding: "2%",
        width: "100%",
        height: "100%",
        // marginTop: 10,
        // aspectRatio: 1,
        //marginBottom: "5%",
        // marginTop: "2%", // Adjust the marginTop value as needed
      }}
    >
      <View
        style={{
          // height: "1%", 
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      ></View>
      <View style={{ flex: 1 }}>
        <Image
          source={{ uri: `data:image/png;base64,${props.imaa.img[0].data}` }}
          style={{
            flex: 1,
            width: "100%",
            height: undefined,
            resizeMode: "contain",
          }}
        />
      </View>
    </View>
  );
};

export default Imaa;
