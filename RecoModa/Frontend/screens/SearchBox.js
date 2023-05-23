import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
} from "react-native";
import React, { useState , useEffect} from "react";
import Ionic from "react-native-vector-icons/Ionicons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import rawipv4 from "../ipv4.json";


const category = [
  {
    id: 1,
    name: "Formal",
  },
  {
    id: 2,
    name: "Classic",
  },
  {
    id: 3,
    name: "Vintage",
  },
  {
    id: 4,
    name: "Ethnic",
  },
  {
    id: 5,
    name: "Casual",
  },
  {
    id: 6,
    name: "Sporty",
  },
  {
    id: 7,
    name: "Bohemian",
  },
  {
    id: 8,
    name: "Streetwear",
  },
  {
    id: 9,
    name: "Grunge",
  },
  {
    id: 10,
    name: "Trendy",
  },
  {
    id: 11,
    name: "Minimalist",
  },
  {
    id: 12,
    name: "Punk",
  },
  {
    id: 13,
    name: "Parisian",
  },
  {
    id: 14,
    name: "Economy",
  },
  {
    id: 15,
    name: "Preppy",
  },
  {
    id: 16,
    name: "Business",
  },
  {
    id: 17,
    name: "Athleisure",
  },
];

const SearchBox = ({ setSearchStr, setSearchCategory }) => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState([]);
  //const [searchStr, setSearchStr] = useState('');
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

  useEffect(() => {
    //console.log("değişim :", searchStr)
    //handleSearchStr()
    setSearchCategory(selectedCategory)
  }, [selectedCategory]);

 /* const handleSearchStr = async () => {
    try {
      const ipv4Address = rawipv4["ip"];
      const res = await axios.get(
        "http://" + ipv4Address + `:5000/api/post/search/${searchStr}`
      );
      console.log("StrSearch : ", res.data);
      }
      catch{}
  };*/

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="#909090"
          style={styles.searchInput}
          onChangeText={(text) => setSearchStr(text)}
        />
        <Ionic name="search" style={styles.icon} />
        <TouchableOpacity
          style={styles.cameraContainer}
          onPress={() => navigation.navigate("CameraSearch")}
        >
          <Ionicons name="camera" style={styles.cameraIcon} />
        </TouchableOpacity>
        <TouchableOpacity
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
  cameraContainer:{
    marginRight: "3%",
  },
});

export default SearchBox;
