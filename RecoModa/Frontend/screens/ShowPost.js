import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import rawipv4 from "../ipv4.json";
import RecoPost from "../components/RecoPost";
import { element } from "prop-types";


const ShowPost = ({ route }) => {
  console.log("promppss ", route);
  const [showAll, setShowAll] = useState(false);
  const { postId } = route.params;
  const [userName, setUserName] = useState({});
  const [similar, setSimilar] = useState([]);

  //console.log("PostId: ", postId._id);
  //console.log("Keys are: ", Object.keys(postId))
  useEffect(() => {
    handleSubmit();
    handleLike();
    handleSimilar();
    //console.log("similae :", similar)
  }, []);

  const handleSubmit = async () => {
    const ipv4Address = rawipv4["ip"];
    const res = await axios.get(
      "http://" + ipv4Address + `:5000/api/media/media/${postId.mediaId}`
    );
    //console.log(res2.data.username)
    //console.log("Hhehe ", res.data);
    const res2 = await axios.get(
      "http://" + ipv4Address + `:5000/api/users/find/${res.data.userId}`
    );
    setUserName(res2.data.username);
  };

  const handleLike = (postId) => {
    //console.log(`Liked post ${postId}`);
    //similar.push(postId)
    //setSimilar(similar)
    //console.log("similar : ", similar)
  };

  const handleSimilar = async () => {
    const ipv4Address = rawipv4["ip"];
    const res = await axios.get(
      "http://" + ipv4Address + `:5000/api/post/findSimilar/${postId._id}`
    );
    console.log("SİMİLAR ARRAY : ", res.data);
    console.log(typeof res.data);
    
   
    const res2 = await axios.get(
      "http://" + ipv4Address + `:5000/api/post/post/${res.data[0]}`
    );
    console.log(Object.keys(res2));
    //console.log("SİMİLAR POST : ", res2.data)
    setSimilar(res.data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>DISCOVER</Text>
      </View>
      <RecoPost  post={postId._id}></RecoPost>
      <FlatList
        contentContainerStyle={{
          width: "100%",
        }}
        data={similar}
        renderItem={({ item, index }) => <RecoPost  post={item}></RecoPost>}
        keyExtractor={(item, key) => item._id}
      />
    </View>
  );
};
export default ShowPost;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginTop: 30,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  postList: {
    flex: 1,
  },
  postContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  username: {
    fontWeight: "bold",
  },
  postImage: {
    width: "100%",
    height: 300,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  commentsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  comment: {
    marginBottom: 8,
  },
  showMoreButton: {
    backgroundColor: "#56B2E8",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 10,
  },
  showMoreButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
