import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
import rawipv4 from "../ipv4.json";
const categories = [
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
    id: 15,
    name: "Business",
  },
  {
    id: 16,
    name: "Athleisure",
  },
];
const MAX_DESCRIPTION_WORDS = 51;
export default function UploadImage() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState();
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [imageColor, setImageColor] = useState([]);

  const navigation = useNavigation();
  const getFilenameFromUri = (uri) => {
    const path = uri.split("/");

    return path[path.length - 1];
  };

  const handleColor = async (uriImg) => {
    const filename = getFilenameFromUri(uriImg);
    console.log("filename : ", filename);
    const ipv4Address = rawipv4["ip"];
    const formData = new FormData();
    formData.append("images", {
      uri: uriImg,
      type: "image/png",
      name: filename,
    });

    let res = await fetch("http://" + ipv4Address + ":5000/api/post/process", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const data = await res.json();

    console.log(data);
    console.log(typeof data);
    setImageColor(data);
    console.log(imageColor);
    console.log(typeof imageColor);
  };

  const removeImage = () => {
    setImage(null);
    //console.log("image:", image);
  };

  const addImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      setImage(result.assets[0]);
      handleColor(result.assets[0].uri);
    }
    //console.log(result);
  };

  const handleCategoryPress = (category) => {
    const isCategorySelected = selectedCategory.some(
      (c) => c.id === category.id
    );
    if (!isCategorySelected) {
      setSelectedCategory((prevSelectedCategory) => [
        ...prevSelectedCategory,
        category,
      ]);
    }
  };

  const handleCategoryRemove = (category) => {
    setSelectedCategory((prevSelectedCategory) =>
      prevSelectedCategory.filter((c) => c.id !== category.id)
    );
  };
  useEffect(() => {
    //console.log("Selected categories:", selectedCategory);
  }, [selectedCategory]);
  const onDescriptionChange = (value) => {
    setDescription(value);
    //console.log("description:", description);
  };

  const getDescriptionWordCount = () => {
    return description.trim().split(/\s+/).length;
  };

  const getRemainingWordsCount = () => {
    return MAX_DESCRIPTION_WORDS - getDescriptionWordCount();
  };

  return (
    <View style={styles.containerTop}>
      <ScrollView>
        <View style={styles.imageContainer}>
          {image ? (
            <>
              <Image
                source={{ uri: image.uri }}
                style={styles.image}
                resizeMode="cover"
              />
              <TouchableOpacity style={styles.cancelIcon}>
                <MaterialIcons
                  name="cancel"
                  onPress={removeImage}
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </>
          ) : (
            <Image
              source={require("../Assets/uploadImage.png")}
              style={styles.pngImage}
              resizeMode="cover"
            />
          )}
        </View>
        <TouchableOpacity style={styles.uploadButton} onPress={addImage}>
          <Text style={styles.uploadButtonText}>
            {image ? "Edit" : "Upload"} Image
          </Text>
        </TouchableOpacity>
        <View style={styles.colorContainer}>
          <ScrollView horizontal>
            {selectedCategory.map((category) => (
              <View key={category.id} style={styles.selectedColorsContainer}>
                <Text style={styles.selectedColorName}>{category.name}</Text>
                <TouchableOpacity
                  style={styles.removeColorButton}
                  onPress={() => handleCategoryRemove(category)}
                >
                  <Ionicons name="close" size={18} color="black" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.formwrapper}>
          <View
            style={{
              borderRadius: 20,
              backgroundColor: "#B24482",
            }}
          >
            <Picker
              selectedValue={selectedCategoryId}
              onValueChange={(itemValue) => {
                const selectedCategory = categories.find(
                  (category) => category.id === itemValue
                );
                handleCategoryPress(selectedCategory);
                setSelectedCategoryId(itemValue);
              }}
              mode="dropdown"
              style={{
                marginHorizontal: 25,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: "black",
                color: "white",
              }}
            >
              <Picker.Item
                label="Select Types of the Fashion Style..."
                value=""
              />
              {categories.map((color) => (
                <Picker.Item
                  key={color.id}
                  label={color.name}
                  value={color.id}
                />
              ))}
            </Picker>
          </View>
          <Text style={{ marginBottom: 25, marginLeft: 15, color: "gray" }}>
            *You can choose multiple categories
          </Text>
          <View style={styles.container}>
            <TextInput
              style={styles.input2}
              placeholder="Description"
              value={description}
              onChangeText={onDescriptionChange}
              multiline
            />
            <View style={styles.wordCountContainer}>
              <Text style={styles.wordCountText}>
                {" "}
                word count{" "}
                {`${getRemainingWordsCount() - 1} / ${
                  MAX_DESCRIPTION_WORDS - 1
                }`}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              marginHorizontal: 140,
              height: 40,
              backgroundColor: "#8D3667",
              borderWidth: 1,
              borderRadius: 20,
              paddingTop: 8,
              alignItems: "center",
            }}
            onPress={() => {
              if (image == null) {
                alert("Please select an image");
                return;
              }
              if (selectedCategory.length === 0) {
                alert("Please select a category");
                return;
              }
              if (description === "") {
                alert("Please write a description");
                return;
              } else {
                //console.log(image)
                navigation.navigate("ImageDetails", {
                  postInfo: {
                    image: image,
                    description: description,
                    category: selectedCategory,
                    color: imageColor,
                  },
                });
              }
            }}
          >
            <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>
              NEXT
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 50 }}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerTop: {
    flex: 1,
    backgroundColor: "#e3e2e0",
  },
  container: {
    marginBottom: 20,
  },
  imageContainer: {
    marginTop: 90,
    width: "90%",
    height: 320,
    alignSelf: "center",
    position: "relative",
  },

  pngImage: {
    margin: "10%",
    width: "88%",
    height: "92%",
  },
  colorContainer: {
    height: "5%",
    marginTop: 30,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  cancelIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#9E38A9",
    borderRadius: 20,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadButton: {
    backgroundColor: "#8D3667",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    alignSelf: "center",
    justifyContent: "center",
  },
  uploadButtonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  selectedColorsContainer: {
    height: 40,
    //width: 90,
    paddingLeft: 5,
    paddingRight: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginHorizontal: 5,
    paddingTop: 10,
    borderRadius: 10,
    backgroundColor: "#CF83AF",
    //backgroundColor: "black",
  },
  selectedColorContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    padding: 10,
    borderRadius: 10,

    backgroundColor: "",
  },
  selectedColorName: {
    marginLeft: 10,
    marginRight: 5,
    color: "white",
  },
  removeColorButton: {
    marginLeft: "auto",
  },
  formwrapper: {
    flex: 1,
    margin: 20,
    justifyContent: "flex-end",
  },
  input: {
    fontSize: 24,
    keyboardType: "numeric",
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 20,
    marginRight: 10,
    marginLeft: 20,
  },
  input2: {
    borderWidth: 1,
    borderColor: "black",
    marginHorizontal: 15,
    borderRadius: 10,
    textAlignVertical: "top",
    backgroundColor: "#E9EAEC",
    padding: 15,
    height: 100,
  },
  wordCountContainer: {
    position: "absolute",
    bottom: 10,
    right: 25,
  },
  wordCountText: {
    color: "#aaa",
    fontSize: 12,
  },
  inStockContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  inStockLabel: {
    marginRight: 10,
    fontSize: 16,
  },
});
