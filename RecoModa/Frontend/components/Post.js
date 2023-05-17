import React, { Component, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import axios from "axios";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import rawipv4 from "../ipv4.json";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
} from "@expo-google-fonts/nunito";
import AppLoading from "expo-app-loading";
import { createIconSet } from "react-native-vector-icons";

const Post = (props) => {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
  });
  const [data, setData] = useState({});
  const user = useSelector((state) => state.user.currentUser);
  const navigation = useNavigation();
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
      console.log("like::: ");
      const res = await axios.get(
        "http://" + ipv4Address + `:5000/api/media/mediaUser/${user.user._id}`
      );
      const res2 = await axios.put(
        "http://" + ipv4Address + `:5000/api/media//addLike/${res.data[0]._id}`,
        { postId: props.post._id }
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
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <>
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
          borderColor: "lightgrey",
          margin: 20,
          shadowColor: "#808080",
          elevation: 15,
          backgroundColor: "#F4F5F2",
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
                width: 40,
                height: "95%",
                aspectRatio: 1,
                borderRadius: 20,
                resizeMode: "contain",
              }}
            />

            <View style={{ width: "5%" }}></View>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 18,
                  color: "#181A1A",
                  fontFamily: "Nunito_600SemiBold",
                }}
              >
                {JSON.stringify(data).replace(/"/g, "")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: "95%",
            height: "60%",
            borderBottomWidth: 2,
            borderColor: "lightgrey",
            borderTopWidth: 2,
            borderColor: "lightgrey",
            marginBottom: "1%",
            backgroundColor: "white",
            borderRadius: 25,
            marginHorizontal: 10,
          }}
        >
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
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            marginLeft: 15,
            marginTop: 5,
            display: "flex",
            height: "10%",
          }}
        >
          <Text
            style={{
              fontFamily: "Nunito_600SemiBold",
              fontSize: 18,
              paddingRight: 5,
            }}
          >
            {JSON.stringify(data).replace(/"/g, "")}
          </Text>
          <Text
            style={{
              fontFamily: "Nunito_600SemiBold",
              fontSize: 18,
              color: "gray",
            }}
          >
            {props.post.description}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            height: "30%",
            alignItems: "stretch",
          }}
        >
          <Text
            style={{
              fontFamily: "Nunito_600SemiBold",
              fontSize: 26,
              marginHorizontal: 10,
              left: 5,
              marginBottom: 30,
            }}
          >
            12
          </Text>
          <TouchableOpacity onPress={handleLike} style={{}}>
            <FontAwesome5
              name="heart"
              style={{
                fontSize: 30,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: "Nunito_600SemiBold",
              fontSize: 26,
              marginHorizontal: 8,
              left: 9,
              marginBottom: 30,
            }}
          >
            3
          </Text>
          <TouchableOpacity
            style={{ marginHorizontal: 8 }}
            onPress={() => navigation.navigate("ShowPost", { postId: item })}
          >
            <FontAwesome5
              name="comment"
              style={{
                fontSize: 30,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: "Nunito_600SemiBold",
              fontSize: 26,
              marginLeft: "35%",
            }}
          >
            2
          </Text>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <TouchableOpacity style={{ marginRight: 15 }}>
              <FontAwesome5
                name="bookmark"
                style={{
                  fontSize: 30,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};
export default Post;
