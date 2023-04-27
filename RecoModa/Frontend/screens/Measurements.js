import { MaterialIcons } from "@expo/vector-icons";
import React, { Component } from "react";
import { Header, SearchBar } from "react-native-elements";
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
} from "react-native";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      email: "",
      password: "",
      phoneNumber: "",
      search: "",
    };
    this._isMounted = false;
  }

  getPersonalData = () => {};

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const DATA = [
      {
        key: "1",
        title: "Height",
        icon: "height",
      },
      {
        key: "2",
        title: "Weight",
        icon: "weight",
      },
      {
        key: "3",
        title: "Waist Circumference",
        icon: "arrow_forward",
      },
      {
        key: "4",
        title: "Neck Width",
        icon: "emoji_people",
      },
      {
        key: "5",
        title: "Hip Circumference",
        icon: "accessibility_new",
      },
      {
        key: "6",
        title: "Shoulder Width",
        icon: "accessibility",
      },
      {
        key: "7",
        title: "Chest Circumference",
        icon: "accessibility",
      },
      {
        key: "8",
        title: "Leg Length",
        icon: "airline_seat_recline_extra",
      },
      {
        key: "9",
        title: "Foot Size",
        icon: "airline_seat_legroom_extra",
      },
    ];

    const { search } = this.state;
    const filteredData = DATA.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <SafeAreaView style={{ width: "100%", height: "100%" }}>
        <View>
          <Header
            leftComponent={{
              icon: "arrow-back",
              color: "black",
              onPress: () => navigation.goBack(),
            }}
            centerComponent={{
              text: "MEASUREMENTS",
              style: { color: "black", fontSize: 20, fontWeight: "bold" },
            }}
            rightComponent={{
              icon: "save",
              color: "black",
              onPress: () => navigation.goBack(),
            }}
            containerStyle={{ backgroundColor: "white" }}
            statusBarProps={{ barStyle: "dark-content" }}
            barStyle="light-content" // or directly
          />
          <SearchBar
            placeholder="Search"
            onChangeText={this.updateSearch}
            value={this.state.search}
            containerStyle={{ backgroundColor: "white", borderWidth: 0 }}
            inputContainerStyle={{ backgroundColor: "#F5F5F5" }}
            inputStyle={{ color: "black" }}
          />
        </View>
        <View>
          {filteredData.length > 0 ? (
            <FlatList
              data={filteredData}
              renderItem={(itemData) => {
                return (
                  <View style={styles.goalItem}>
                    <View style={styles.iconContainer}>
                      <MaterialIcons
                        name={itemData.item.icon}
                        size={24}
                        color="black"
                      />
                    </View>
                    <Text style={styles.goalText}>{itemData.item.title}</Text>
                  </View>
                );
              }}
              alwaysBounceVertical={false}
            />
          ) : (
            <View style={styles.goalItem}>
              <Text style={styles.goalText}>No results found</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    padding: 25,
    borderRadius: 30,
    backgroundColor: "#D5ECED",
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 32,
    alignItems: "center",
  },
  goalText: {
    color: "black",
    fontSize: 20,
    marginLeft: 16,
  },
});
