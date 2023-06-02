import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
} from "@expo-google-fonts/nunito";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import rawipv4 from "../ipv4.json";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const products = [
  {
    id: 1,
    size: "XL",
    brand: "Bershka",
    category: "top-wear",
    price: "1000TL",
  }
];

const comments = [
  {
    id: 1,
    name: "zulal",
    comment: "asdfasfsasadf",
  },
];

const RecoPost = (props) => {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
  });

  const [data, setData] = useState({});
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [description, setDescription] = useState("");
  const user = useSelector((state) => state.user.currentUser);
  const navigation = useNavigation(); // Use the useNavigation hook
  useEffect(() => {
    // this function will be called after the component is mounted or update
    handleSubmit();
  }, []);

  const handleSubmit = async () => {
    try {
      const ipv4Address = rawipv4["ip"];
      const p = await axios.get(
        "http://" + ipv4Address + `:5000/api/post/post/${props.post}`
      );
      //console.log("PDATA", Object.keys(p.data))
      setPost(p.data);
      setDescription(p.data.description);
      const res = await axios.get(
        "http://" + ipv4Address + `:5000/api/media/media/${p.data.mediaId}`
      );
      const res2 = await axios.get(
        "http://" + ipv4Address + `:5000/api/users/find/${res.data.userId}`
      );
      setData(res2.data.username);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      const ipv4Address = rawipv4["ip"];
      const res = await axios.get(
        "http://" + ipv4Address + `:5000/api/media/mediaUser/${user.user._id}`
      );
      const res2 = await axios.put(
        "http://" + ipv4Address + `:5000/api/media/addLike/${res.data[0]._id}`,
        { postId: post._id }
      );
      //console.log("POST DATA", res2.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onCommentChange = (text) => {
    setComment(text);
  };

  const handleSubmitComment = async () => {
    try {
      const ipv4Address = rawipv4["ip"];
      const id = props.post;
      //console.log(",d,d", typeof id);
      const res3 = await axios.get(
        "http://" + ipv4Address + `:5000/api/users/find/${user.user._id}`
      );
      const commentorusername = res3.data.username;
      const res = await axios.put(
        "http://" + ipv4Address + `:5000/api/post/addComment/${props.post}`,
        { commentorusername: commentorusername, comment: comment }
      );

     // console.log(res.data);
     // console.log(typeof res.data);
      setAllComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            padding: "2%",
            width: "90%",
            backgroundColor: "white",
            borderRadius: 10,
            borderWidth: 2,
            borderColor: "lightgrey",
            margin: 20,
            shadowColor: "#808080",
            elevation: 15,
            backgroundColor: "#F4F5F2",
            paddingTop: 20,
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
              paddingBottom: "8%",
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
                  height: "80%",
                  aspectRatio: 1,
                  borderRadius: 20,
                  resizeMode: "contain",
                }}
              />
              <View style={{ width: "5%" }}></View>
              <Text
                style={{
                  fontSize: 18,
                  color: "#181A1A",
                  fontFamily: "Nunito_600SemiBold",
                }}
              >
                {JSON.stringify(data).replace(/"/g, "")}
              </Text>
            </View>

          </View>
          <View
            style={{
              flex: 1,
              borderBottomWidth: 2,
              borderColor: "lightgrey",
              borderTopWidth: 2,
              marginBottom: "1%",
              backgroundColor: "white",
              borderRadius: 25,
              marginHorizontal: 10,
              
            }}
          >
            {post && post.img && post.img[0] ? (
              <Image
                source={{ uri: `data:image/png;base64,${post.img[0].data}` }}
                style={{
                  width: "100%",
                  aspectRatio: 1.2,
                  resizeMode: "contain",
                }}
              />
            ) : (
              <Image
                style={{
                  width: "100%",
                  height: undefined,
                  aspectRatio: 1.7,
                  resizeMode: "contain",
                }}
              />
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              height: "8%",
              marginVertical: 5,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontFamily: "Nunito_600SemiBold",
                fontSize: 20,
                marginHorizontal: 10,
                left: 5,
              }}
            >
              3
            </Text>
            <TouchableOpacity style={{}}>
              <FontAwesome
                name="heart"
                style={{
                  fontSize: 25,
                  color: "grey",
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-end",
                right: 20,
              }}
            >
              <TouchableOpacity style={{}} onPress={handleLike}>
                <FontAwesome5
                  name="bookmark"
                  style={{
                    fontSize: 25,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            {products.map((product) => (
              <View
                key={product.id}
                style={{
                  backgroundColor: "lightgrey",
                  borderRadius: 10,
                  padding: 5,
                  // margin: "5%",
                  marginRight: "5%",
                  marginLeft: "5%",
                  // width: "90%",
                  marginBottom: "2%",
                }}
              >
                <Text
                  style={{
                    paddingLeft: 10,
                    paddingRight: 10,
                    textAlign: "left",
                  }}
                >
                  Product {product.id}: {product.brand}, {product.size},
                  {product.category}, {product.price}
                </Text>
              </View>
            ))}
          </View>
          <View
            style={{
              width: "95%",
              marginHorizontal: "3%",
              flexDirection: "row",
              display: "flex",
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 15,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  paddingRight: 5,
                }}
              >
                {JSON.stringify(data).replace(/"/g, " ")}
              </Text>
              : <Text style={{ textAlign: "justify" }}>{description}</Text>
            </Text>
          </View>

          <View style={{ height: "30%", marginHorizontal: "3%" }}>
            <ScrollView style={{ marginBottom: 10 }}>
              {allComments.map((comment, index) => (
                <View key={index}>
                  <Text style={{ marginBottom: 5 }}>
                    <Text style={{ fontWeight: "bold" }}>
                      {comment.username}
                    </Text>
                    : <Text style={{ color: "gray" }}>{comment.comment}</Text>
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginLeft: "5%",
          marginRight: "5%",
          padding: "2%",
          width: "90%",
          marginBottom: "5%",
          backgroundColor: "white",
          borderRadius: 10,
          borderWidth: 2,
          borderColor: "lightgrey",
          shadowColor: "#808080",
          backgroundColor: "#F4F5F2",
        }}
      >
        <TextInput
          style={{ width: "90%" }}
          placeholder="Type some comment"
          onChangeText={onCommentChange}
          multiline
        />
        <TouchableOpacity onPress={handleSubmitComment}>
          <Feather name="send" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default RecoPost;
