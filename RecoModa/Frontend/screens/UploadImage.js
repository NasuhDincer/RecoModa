import React, { useState } from "react";
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
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Ionic from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
const colors = [
  { id: 1, name: "Red", hex: "#FF0000" },
  { id: 2, name: "Green", hex: "#00FF00" },
  { id: 3, name: "Blue", hex: "#0000FF" },
  { id: 4, name: "Yellow", hex: "#FFFF00" },
  { id: 5, name: "Orange", hex: "#FFA500" },
  { id: 6, name: "Pink", hex: "#FFC0CB" },
  { id: 7, name: "Purple", hex: "#800080" },
  { id: 8, name: "Brown", hex: "#A52A2A" },
  { id: 9, name: "Gray", hex: "#808080" },
  { id: 10, name: "White", hex: "#FFFFFF" },
  { id: 11, name: "Black", hex: "#000000" },
  { id: 12, name: "Turquoise", hex: "#40E0D0" },
  { id: 13, name: "Lime", hex: "#00FF00" },
  { id: 14, name: "Gold", hex: "#FFD700" },
];

const brands = [
  { id: 1, name: "Channel" },
  { id: 2, name: "Zara" },
  { id: 3, name: "Bershka" },
  { id: 4, name: "Adidas" },
  { id: 5, name: "Louis Vuitton" },
  { id: 6, name: "Mango" },
  { id: 7, name: "Kayra" },
  { id: 8, name: "Koton" },
  { id: 9, name: "AdL" },
  { id: 10, name: "Victoria's Secret" },
];
const bodySizes = [
  { id: 1, name: "XXS" },
  { id: 2, name: "XS" },
  { id: 3, name: "S" },
  { id: 4, name: "M" },
  { id: 5, name: "L" },
  { id: 6, name: "XL" },
  { id: 7, name: "XXL" },
  { id: 8, name: "XXXL" },
  { id: 9, name: "4XL" },
  { id: 10, name: "5XL" },
];
const categories = [
  {
    id: 1,
    name: "bottom clothing",
  },
  {
    id: 2,
    name: "top clothing",
  },
  {
    id: 3,
    name: "outerwear",
  },
  {
    id: 4,
    name: "footwear",
  },
  {
    id: 5,
    name: "casual",
  },
  {
    id: 6,
    name: "sport",
  },
];
export default function UploadImage() {
  const [image, setImage] = useState(null);
  const addImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        {image ? (
          <>
            <Image
              source={{ uri: image }}
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
            style={styles.image}
            resizeMode="cover"
          />
        )}
      </View>

      <TouchableOpacity style={styles.uploadButton} onPress={addImage}>
        <Text>{image ? "Edit" : "Upload"} Image</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 90,
    width: "90%",
    height: 300,
    alignSelf: "center",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
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
    backgroundColor: "#E576F2",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    alignSelf: "center",
    justifyContent: "center",
  },
  uploadButtonText: {
    color: "black",
    fontWeight: "bold",
  },
});
