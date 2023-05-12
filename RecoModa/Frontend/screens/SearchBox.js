import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
} from "react-native";
import React, { useState } from "react";
import Ionic from "react-native-vector-icons/Ionicons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const category = [
  {
    id: 1,
    name: "Top Wear",
  },
  {
    id: 2,
    name: "Bottom Wear",
  },
  {
    id: 3,
    name: "Shoes",
  },
  {
    id: 4,
    name: "Accessories",
  },
];

const SearchBox = ({ setShowCamera }) => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState([]);
  const handleCategoryPress = (categoryName) => {
    if (selectedCategory.includes(categoryName)) {
      // Category already selected, remove it from the array
      setSelectedCategory((prevSelectedCategory) => {
        const updatedSelectedCategory = prevSelectedCategory.filter(
          (name) => name !== categoryName
        );
        console.log(updatedSelectedCategory);
        return updatedSelectedCategory;
      });
    } else {
      // Category not selected, add it to the array
      setSelectedCategory((prevSelectedCategory) => {
        const updatedSelectedCategory = [...prevSelectedCategory, categoryName];
        console.log(updatedSelectedCategory);
        return updatedSelectedCategory;
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="#909090"
          style={styles.searchInput}
        />
        <Ionic name="search" style={styles.icon} />
        <TouchableOpacity
          style={styles.cameraContainer}
          onPress={() => navigation.navigate("SideBar")}
        >
          <Ionicons name="filter-sharp" style={styles.cameraIcon} />
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainer}
      >
        {category.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.categoryItem,
              selectedCategory.includes(item.name) &&
                styles.selectedCategoryItem,
            ]}
            onPress={() => handleCategoryPress(item.name)}
          >
            <Text style={styles.categoryItemText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  searchContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
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
    top: 7,
  },
  cameraIcon: {
    marginLeft: 5,
    fontSize: 25,
    opacity: 0.7,
    zIndex: 1,
  },
  categoryContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  categoryItem: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: "#EBEBEB",
    marginRight: 10,
  },
  selectedCategoryItem: {
    backgroundColor: "#D450CB",
  },
  categoryItemText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
  },
  selectedCategoryItemText: {
    color: "#ffffff",
  },
});

export default SearchBox;
