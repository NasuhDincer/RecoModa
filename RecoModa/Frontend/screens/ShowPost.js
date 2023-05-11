import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
const posts = [
  {
    id: 1,
    imagePath: require("../Assets/profile.png"),
    comments: [
      {
        id: 1,
        comment: "hello",
      },
      {
        id: 2,
        comment: "naber",
      },
    ],
  },
  {
    id: 2,
    imagePath: require("../Assets/profile.png"),
    comments: [
      {
        id: 1,
        comment: "iyiyim",
      },
      {
        id: 2,
        comment: "sen nasılsın?",
      },
    ],
  },
  {
    id: 3,
    imagePath: require("../Assets/profile.png"),
    comments: [
      {
        id: 1,
        comment: "ben de iyi",
      },
      {
        id: 2,
        comment: "okul nasıl",
      },
    ],
  },
  {
    id: 4,
    imagePath: require("../Assets/profile.png"),
    comments: [
      {
        id: 1,
        comment: "akmaca",
      },
      {
        id: 2,
        comment: "naber",
      },
    ],
  },
  {
    id: 5,
    imagePath: require("../Assets/profile.png"),
    comments: [
      {
        id: 1,
        comment: "hello",
      },
      {
        id: 2,
        comment: "naber",
      },
    ],
  },
  {
    id: 6,
    imagePath: require("../Assets/profile.png"),
    comments: [
      {
        id: 1,
        comment: "hello",
      },
      {
        id: 2,
        comment: "naber",
      },
    ],
  },
];
const ShowPost = () => {
  const [showAll, setShowAll] = useState(false);

  const handleLike = (postId) => {
    console.log(`Liked post ${postId}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>DISCOVER</Text>
      </View>
      <ScrollView style={styles.postList}>
        {posts.map((post, index) => {
          if (index < 3 || showAll) {
            return (
              <View key={post.id} style={styles.postContainer}>
                <View style={styles.postHeader}>
                  <Image source={post.imagePath} style={styles.profileImage} />
                  <Text style={styles.username}>Username</Text>
                </View>
                <Image source={post.imagePath} style={styles.postImage} />
                <View style={styles.actions}>
                  <TouchableOpacity onPress={() => handleLike(post.id)}>
                    <MaterialIcons
                      name={post.isLiked ? "favorite" : "favorite-border"}
                      size={24}
                      color={post.isLiked ? "red" : "black"}
                    />
                  </TouchableOpacity>
                </View>
                <ScrollView style={styles.commentsContainer}>
                  {post.comments.map((comment) => (
                    <Text key={comment.id} style={styles.comment}>
                      {comment.comment}
                    </Text>
                  ))}
                </ScrollView>
              </View>
            );
          } else {
            return null;
          }
        })}
      </ScrollView>
      {posts.length > 3 && (
        <TouchableOpacity
          onPress={() => setShowAll(!showAll)}
          style={styles.showMoreButton}
        >
          <Text style={styles.showMoreButtonText}>
            {showAll ? "Show Less" : "Show More"}
          </Text>
        </TouchableOpacity>
      )}
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
