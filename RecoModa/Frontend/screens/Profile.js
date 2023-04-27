import { MaterialIcons } from "@expo/vector-icons";
import React, { Component } from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import Post from "../components/Post";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      email: "",
      password: "",
      phoneNumber: "",
    };
    this._isMounted = false;
  }

  getPersonalData = () => {};

  render() {
    return (
      <SafeAreaView style={{ width: "100%", height: "100%" }}>
        <View
          style={{
            width: "100%",
            height: "7%",
            paddingHorizontal: "5%",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: "5%",
            backgroundColor: "white"
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Settings")}
          >
            <MaterialIcons name="settings" size={36} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.profileImage} source={require("../Assets/user.png")} />
        <View style={styles.stats}>
        <Text style={styles.stat}>20 posts</Text>
        <Text style={styles.stat}>100 followers</Text>
        <Text style={styles.stat}>200 following</Text>
      </View>

      </View>
      <View style={styles.minibar}>
        <TouchableOpacity style={styles.minibarItem}>
        <MaterialIcons name="apps" size={36} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.minibarItem}>
        <MaterialIcons name="checkroom" size={36} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.minibarItem}>
        <MaterialIcons name="bookmark" size={36} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.postsContainer}>
        <View style={styles.postsRow}>
          <Image style={styles.postImage} source={require('../Assets/user.png')} />
          <Image style={styles.postImage} source={require('../Assets/user.png')} />
        </View>
        <View style={styles.postsRow}>
          <Image style={styles.postImage} source={require('../Assets/user.png')} />
          <Image style={styles.postImage} source={require('../Assets/user.png')} />
        </View>
      </View>
    </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    width: "100%",
  },
  separator: {
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  settingsButton: {
    padding: 10,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  stat: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 10,
  },
  minibar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  minibarItem: {
    paddingHorizontal: 20,
  },
  minibarText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postsContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  postsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  postImage: {
    width: 70,
    height: 70,
  }
});