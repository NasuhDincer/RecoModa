import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
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
  const [selectedBrand, setSelectedBrand] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [category, setCategory] = useState();
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedColorId, setSelectedColorId] = useState();
  const [selectedBrandId, setSelectedBrandId] = useState();
  const [description, setDescription] = useState("");

  const handleColorPress = (color) => {
    const isColorSelected = selectedColors.some((c) => c.id === color.id);
    if (!isColorSelected) {
      setSelectedColors((prevSelectedColors) => [...prevSelectedColors, color]);
    }
  };

  const handleColorRemove = (color) => {
    setSelectedColors((prevSelectedColors) =>
      prevSelectedColors.filter((c) => c.id !== color.id)
    );
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
      setImage(result.assets[0].uri);
    }
  };

  const handleBrandPress = (brand) => {
    setSelectedBrand(brand);
  };

  const handleBrandRemove = (brand) => {
    setSelectedBrand(null);
  };

  const handleCategoryPress = (category) => {
    setSelectedBrand(category);
  };

  const handleCategoryRemove = (category) => {
    setSelectedBrand(null);
  };
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={{ position: "absolute", top: 50, right: 10 }}>
        <Ionicons name="save-outline" size={24} color="black" />
      </TouchableOpacity>
      <View style={imageUploaderStyles.selectedColorsContainer}>
        {selectedColors.map((color) => (
          <View
            key={color.id}
            style={imageUploaderStyles.selectedColorContainer}
          >
            <Text style={imageUploaderStyles.selectedColorName}>
              {color.name}
            </Text>
            <TouchableOpacity
              style={imageUploaderStyles.removeColorButton}
              onPress={() => handleColorRemove(color)}
            >
              <Ionicons name="close" size={18} color="black" />
            </TouchableOpacity>
          </View>
        ))}
        {selectedBrand && (
          <View style={imageUploaderStyles.selectedColorsContainer}>
            <View style={imageUploaderStyles.selectedColorContainer}>
              <Text style={imageUploaderStyles.selectedColorName}>
                {selectedBrand.name}
              </Text>
              <TouchableOpacity
                style={imageUploaderStyles.removeColorButton}
                onPress={() => handleBrandRemove(selectedBrand)}
              >
                <Ionicons name="close" size={18} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        {selectedCategory && (
          <View style={imageUploaderStyles.selectedColorsContainer}>
            <View style={imageUploaderStyles.selectedColorContainer}>
              <Text style={imageUploaderStyles.selectedColorName}>
                {selectedCategory.name}
              </Text>
              <TouchableOpacity
                style={imageUploaderStyles.removeColorButton}
                onPress={() => handleCategoryRemove(selectedCategory)}
              >
                <Ionicons name="close" size={18} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      <View style={imageUploaderStyles.formwrapper}>
        <Picker
          selectedValue={selectedBrand ? selectedBrand.id : null}
          onValueChange={handleBrandPress}
          mode="dropdown"
          style={{
            marginHorizontal: 25,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: "black",
          }}
        >
          <Picker.Item label="Select Brand..." value="" />
          {brands.map((brand) => (
            <Picker.Item key={brand.id} label={brand.name} value={brand.id} />
          ))}
        </Picker>
        <Picker
          selectedValue={selectedCategory ? selectedCategory.id : null}
          onValueChange={handleCategoryPress}
          mode="dropdown"
          style={{
            marginHorizontal: 25,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: "black",
          }}
        >
          <Picker.Item label="Select Category..." value="" />
          {categories.map((category) => (
            <Picker.Item
              key={category.id}
              label={category.name}
              value={category.id}
            />
          ))}
        </Picker>
        <Picker
          selectedValue={selectedColorId}
          onValueChange={(itemValue) => {
            const selectedColor = colors.find(
              (color) => color.id === itemValue
            );
            handleColorPress(selectedColor);
            setSelectedColorId(itemValue);
          }}
          mode="dropdown"
          style={{
            marginHorizontal: 25,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: "black",
          }}
        >
          <Picker.Item label="Select color..." value="" />
          {colors.map((color) => (
            <Picker.Item key={color.id} label={color.name} value={color.id} />
          ))}
        </Picker>
        <TextInput
          style={imageUploaderStyles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>
      <View
        style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: "90%", height: 200 }}
          />
        ) : (
          <Ionic
            name="person-circle-outline"
            style={{ width: "100%", height: 200, left: 150 }}
            size={100}
            color="#aaa"
          />
        )}
        <View style={imageUploaderStyles.uploadBtnContainer}>
          <TouchableOpacity
            onPress={addImage}
            style={imageUploaderStyles.uploadBtn}
          >
            <Text>{image ? "Edit" : "Upload"} Image</Text>
            <AntDesign name="camera" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const imageUploaderStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedColorsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginHorizontal: 25,
    marginBottom: 20,
    paddingTop: 60,
    // backgroundColor: "black"
  },
  selectedColorContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "lightgray",
  },
  selectedColorName: {
    marginLeft: 10,
  },
  removeColorButton: {
    marginLeft: "auto",
  },
  image: {
    width: "100%",
    height: 100,
  },
  uploadBtnContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    padding: 5,
  },
  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  uploadBtnText: {
    marginLeft: 10,
    fontSize: 16,
  },
  formwrapper: {
    flex: 1,
    margin: 50,
    justifyContent: "flex-end",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
