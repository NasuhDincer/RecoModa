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
  Image,
  TextInput,
  Linking,
} from "react-native";
import Post from "../components/Post.js";
import { Button } from "react-native-elements";

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
    const data = [
      {
        id: "1",
        name: "amazon",
        logo: require("../Assets/amazon.png"),
        link: "https://www.amazon.com.tr/?&tag=trtxtgoabkde-21&ref=pd_sl_7r6v9rntlw_e&adgrpid=119366379979&hvpone=&hvptwo=&hvadid=542862704348&hvpos=&hvnetw=g&hvrand=6143669752392586054&hvqmt=e&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1012763&hvtargid=kwd-10573980&hydadcr=12932_2246093&language=tr_TR",
      },
    ];
    return (
      <View style={styles.container}>
        <Text style={styles.title}>RecoModa Store</Text>
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholder="Search" />
        </View>
        <Image
          source={require("../Assets/logoicon.png")}
          style={styles.userImage}
        />
        <View style={styles.table}>
          <Text style={styles.tableText}>Seller</Text>
          <Text style={styles.tableTextCenter}>Price</Text>
          <Text style={styles.tableTextRight}>Direct Link</Text>
        </View>

        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={styles.itemContent}>
                <Image source={item.logo} style={styles.logo} />
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={styles.buttonContainer}>
                <Button
                  title="Go to Store"
                  onPress={() => Linking.openURL(item.link)}
                />
              </View>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch", // add this line
    // backgroundColor: "black"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    // backgroundColor: "black"
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 10,
    alignSelf: "stretch", // add this line
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  userImage: {
    width: 200, // increase the width to make it bigger
    height: 200, // set the height to be the same as the width to make it square
    marginTop: 35,
    marginBottom: 35,
  },
  table: {
    flexDirection: "row",
    justifyContent: "space-between",
    
  },
  tableText: {
    flex: 1,
    textAlign: "left",
    marginLeft: 30,
    fontWeight: "bold",
    paddingBottom: 15,
    fontSize: 20,
  },
  tableTextCenter: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  tableTextRight: {
    flex: 1,
    textAlign: "right",
    marginRight: 30,
    fontWeight: "bold",
    fontSize: 20,
  },
  item: {
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingVertical: 8,
    // backgroundColor: "black"
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "black"
  },
  logo: {
    width: 100,
    height: 100,
    marginRight: 8,
  },
  itemName: {
    fontWeight: "bold",
  },
  buttonContainer: {
    alignSelf: "flex-end",
  },
  button: {
    marginLeft: 10,
  },
});
