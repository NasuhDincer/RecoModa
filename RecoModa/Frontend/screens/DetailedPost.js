import React from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
const postData = [
    {
      title: 'Beautiful Mountain View',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare libero sed dolor placerat, at mattis nisi egestas. Pellentesque pulvinar nunc sapien, in pretium est molestie ac. ',
    },
    {
      title: 'Road Through Trees',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare libero sed dolor placerat, at mattis nisi egestas. Pellentesque pulvinar nunc sapien, in pretium est molestie ac. ',
    },
    {
      title: 'Autumn Leaves',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare libero sed dolor placerat, at mattis nisi egestas. Pellentesque pulvinar nunc sapien, in pretium est molestie ac. ',
    },
  ];
const DetailedPost = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImage}>
        </View>
      </View>
      <View style={styles.postImageContainer}>
        <Image
          source={require('../Assets/logoicon.png')}
          style={styles.postImage}
        />
      </View>
      <View style={styles.postDetailsContainer}>
        <Text style={styles.postDescription}>
          This is an explanation of the post!
        </Text>
        <TouchableOpacity style={styles.postActions}>
          <Image
            source={require('../Assets/like.png')}
            style={styles.actionIcon}
          />
          <Image
            source={require('../Assets/comment.png')}
            style={styles.actionIcon}
          />
          <View style={styles.actionSpacer} />
          <Image
            source={require('../Assets/save.png')}
            style={styles.actionIcon}
          />
        </TouchableOpacity>
        <View style={styles.commentsContainer}>
          <FlatList
            data={postData}
            renderItem={({ item }) => (
              <View style={styles.commentContainer}>
                <Text style={styles.commentText}>{item.description}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '2%',
    marginBottom: '5%',
    marginTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  profileImage: {
    width: '36.666%',
    height: '36.666%',
    borderRadius: '50%',
    marginRight: 60,
  },
  myPostsText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  postImageContainer: {
    width: '100%',
    height: '60%',
  },
  postImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  postDetailsContainer: {
    width: '100%',
    height: '30%',
  },
  postDescription: {
    fontSize: 16,
    color: 'gray',
  },
  postActions: {
    width: '100%',
    paddingTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 15,
  },
  actionSpacer: {
    flex: 1,
  },
  commentsContainer: {
    padding: 10,
  },
  commentContainer: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
  commentText: {
    fontSize: 16,
  },
});

export default DetailedPost;