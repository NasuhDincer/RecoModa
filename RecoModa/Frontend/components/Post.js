import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import axios from "axios";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import rawipv4 from "../ipv4.json";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
} from "@expo-google-fonts/nunito";

const Post = (props) => {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
  });
  const [data, setData] = useState({});
  const user = useSelector((state) => state.user.currentUser);
  const navigation = useNavigation();
  const [likeCount, setLikeCount] = useState("");
  const [commentCount, setCommentCount] = useState("");
  const [ifLiked, setIfLiked] = useState(false);
  const [userIdNavigate, setUserIdNavigate] = useState("")
  //const glyphMap = { 'icon-name': 1234, test: '∆' };
  //const Icon = createIconSet(glyphMap, 'FontName', 'font-name.ttf');
  //console.log("Props", Object.keys(props.post))
  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = async () => {
    try {
      const ipv4Address = rawipv4["ip"];
      console.log("post : ",props.post.mediaId)
      console.log(Object.keys(props.post));
      const res = await axios.get(
        "http://" + ipv4Address + `:5000/api/media/media/${props.post.mediaId}`
      );
      setUserIdNavigate(res.data.userId)
      //setData(res.data.userId);
      const res2 = await axios.get(
        "http://" + ipv4Address + `:5000/api/users/find/${res.data.userId}`
      );
      //console.log(res2.data.username)
      setData(res2.data.username);
      const res3 = await axios.get(
        "http://" + ipv4Address + `:5000/api/post/post/${props.post._id}`
      );
      //console.log("KEYS", Object.keys(res3.data));
      //KEYS ["category", "productInfo", "_id", "mediaId", "description", "likeList", "commentList", "img", "embedArray", "createdAt", "updatedAt", "__v"]
      const myList = res3.data.likeList;
      const lengthOfLikes = myList.length;
      const myCommentList = res3.data.commentList;
      const lenghtOfComments = myCommentList.length;
      setLikeCount(lengthOfLikes);
      setCommentCount(lenghtOfComments);
    } catch (error) {
      // handle error response
      console.log(error);
    }

    //props.navigation.navigate("Home")
  };

  const handleWishList = async () => {
    try {
      const ipv4Address = rawipv4["ip"];
      const res = await axios.get(
        "http://" + ipv4Address + `:5000/api/media/mediaUser/${user.user._id}`
      );
      console.log("Wishlist data1", res.data)
      const res2 = await axios.put(
        "http://" + ipv4Address + `:5000/api/media/addLike/${res.data[0]._id}`,
        { postId: props.post._id }
      );
     // console.log("Wishlist data2", res2.data);

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

  const handleLike = async () => {
    try {
      const ipv4Address = rawipv4["ip"];
      const res = await axios.put(
        "http://" + ipv4Address + `:5000/api/post/addLike/${props.post._id}`,
        { userId: user.user._id }
      );

      const res3 = await axios.get(
        "http://" + ipv4Address + `:5000/api/post/post/${props.post._id}`
      );
      const myList = res3.data.likeList;
      const lengthOfLikes = myList.length;
      setLikeCount(lengthOfLikes);
      setIfLiked(true);
    } catch (error) {
      console.log(error);
    }

    //props.navigation.navigate("Home")
  };

  const handleRemoveLike = async () => {
    try {
      const ipv4Address = rawipv4["ip"];
      const res = await axios.put(
        "http://" + ipv4Address + `:5000/api/post/removeLike/${props.post._id}`,
        { userId: user.user._id }
      );

      const res3 = await axios.get(
        "http://" + ipv4Address + `:5000/api/post/post/${props.post._id}`
      );
      const myList = res3.data.likeList;
      const lengthOfLikes = myList.length;
      setLikeCount(lengthOfLikes);
      setIfLiked(false);
    } catch (error) {
      console.log(error);
    }

    //props.navigation.navigate("Home")
  };

  if (!fontsLoaded) {
    return null;
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
            <TouchableOpacity onPress={() =>
              navigation.navigate("PeopleProfile", { userId: userIdNavigate })
            }>
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
                    <TouchableOpacity
            style={{ marginHorizontal: 8 }}
            onPress={() =>
              navigation.navigate("ShowPost", { postId: props.post })
            }
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
          </TouchableOpacity>
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
              fontSize: 20,
              marginHorizontal: 10,
              left: 5,
              marginBottom: 30,
            }}
          >
            {likeCount}
          </Text>
          <TouchableOpacity onPress={ifLiked ? handleRemoveLike : handleLike} style={{}}>
            <FontAwesome
              name="heart"
              style={{
                fontSize: 25,
                color: ifLiked ? "#8D3667" : "grey",
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: "Nunito_600SemiBold",
              fontSize: 20,
              marginHorizontal: 8,
              left: 9,
              marginBottom: 30,
            }}
          >
            {commentCount}
          </Text>
          <TouchableOpacity
            style={{ marginHorizontal: 8 }}
            onPress={() =>
              navigation.navigate("ShowPost", { postId: props.post })
            }
          >
            <FontAwesome5
              name="comment"
              style={{
                fontSize: 25,
              }}
            ></FontAwesome5>
          </TouchableOpacity>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
              right: 20,
            }}
          >
            <Text
              style={{
                fontFamily: "Nunito_600SemiBold",
                fontSize: 20,
                marginRight: 10,
              }}
            >
            </Text>
            <TouchableOpacity onPress={handleWishList} style={{}}>
              <FontAwesome5
                name="bookmark"
                style={{
                  fontSize: 25,
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
