import { View, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import React, { useState } from "react";
import Ionic from "react-native-vector-icons/Ionicons";



const SearchBox = ({ setShowCamera }) => {

  return (
    <SafeAreaView
      style={styles.container}
    >
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="#909090"
          style={styles.searchInput}
        />
        <Ionic
          name="search"
          style={styles.icon}
        />
        <TouchableOpacity
          style={styles.cameraContainer}
          onPress={() => setShowCamera(true)}
        >
          <Ionic
            name="camera-outline"
            style={styles.cameraIcon}
          />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 10
  },
  searchInput: {
    backgroundColor: "#EBEBEB",
    borderRadius: 15,
    alignItems: "center",
    fontSize: 15,
    padding: 4,
    paddingLeft: 40,
    alignSelf: "stretch",
    flex: 1,
  },
  icon: {
    fontSize: 20,
    opacity: 0.7,
    position: "absolute",
    zIndex: 1,
    left: 15,
    top: 3,
  },
  cameraIcon: {
    fontSize: 25,
    opacity: 0.7,
    zIndex: 1,
  }
});

export default SearchBox;
