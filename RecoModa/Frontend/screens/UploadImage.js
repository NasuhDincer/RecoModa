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
  CheckBox,
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
const MAX_DESCRIPTION_WORDS = 50;
export default function UploadImage() {
  const [image, setImage] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [category, setCategory] = useState();
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedColorId, setSelectedColorId] = useState();
  const [selectedSizeId, setSelectedSizeId] = useState();
  const [selectedBrandId, setSelectedBrandId] = useState();
  const [selectedCategoryId, setSelectedCategoryId] = useState();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selectedSize, setSelectedSize] = useState();
  const [inStock, setInStock] = useState(false);

  const removeImage = () => {
    setImage(null);
  };
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

  const handleBrandPress = (index) => {
    const selectedBrand = brands.find((brand) => brand.id === index);
    setSelectedBrand(selectedBrand);
  };

  const handleBrandRemove = (brand) => {
    setSelectedBrand(null);
  };

  const handleCategoryPress = (index) => {
    const selectedCategory = categories.find(
      (category) => category.id === index
    );
    setSelectedCategory(selectedCategory);
  };

  const handleCategoryRemove = (category) => {
    setSelectedCategory(null);
  };

  const handlePrice = (value) => {
    setPrice(value);
    console.log(price);
  };

  const handleSizePress = (sizeId) => {
    const selectedSize = bodySizes.find((size) => size.id === sizeId);
    setSelectedSize(selectedSize);
  };

  const handleSizeRemove = (size) => {
    setSelectedSize(null);
  };

  const onDescriptionChange = (value) => {
    setDescription(value);
  };

  const getDescriptionWordCount = () => {
    return description.trim().split(/\s+/).length;
  };

  const getRemainingWordsCount = () => {
    return MAX_DESCRIPTION_WORDS - getDescriptionWordCount();
  };

  const handleStockChange = (value) => {
    setInStock(value);
  };
  return (
    <View style={styles.container}>
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
              style={styles.pngImage}
              resizeMode="cover"
            />
          )}
        </View>
        <TouchableOpacity style={styles.uploadButton} onPress={addImage}>
          <Text>{image ? "Edit" : "Upload"} Image</Text>
        </TouchableOpacity>
        <View style={styles.colorContainer}>
          <ScrollView horizontal>
            {selectedColors.map((color) => (
              <View key={color.id} style={styles.selectedColorsContainer}>
                <Text style={styles.selectedColorName}>{color.name}</Text>
                <TouchableOpacity
                  style={styles.removeColorButton}
                  onPress={() => handleColorRemove(color)}
                >
                  <Ionicons name="close" size={18} color="black" />
                </TouchableOpacity>
              </View>
            ))}
            {selectedBrand && (
              <View style={styles.selectedColorsContainer}>
                <Text style={styles.selectedColorName}>
                  {selectedBrand.name}
                </Text>
                <TouchableOpacity
                  style={styles.removeColorButton}
                  onPress={() => handleBrandRemove(selectedBrand)}
                >
                  <Ionicons name="close" size={18} color="black" />
                </TouchableOpacity>
              </View>
            )}
            {selectedCategory && (
              <View style={styles.selectedColorsContainer}>
                <Text style={styles.selectedColorName}>
                  {selectedCategory.name}
                </Text>
                <TouchableOpacity
                  style={styles.removeColorButton}
                  onPress={() => handleCategoryRemove(selectedCategory)}
                >
                  <Ionicons name="close" size={18} color="black" />
                </TouchableOpacity>
              </View>
            )}
            {selectedSize && (
              <View style={styles.selectedColorsContainer}>
                <Text style={styles.selectedColorName}>
                  {selectedSize.name}
                </Text>
                <TouchableOpacity
                  style={styles.removeColorButton}
                  onPress={() => handleSizeRemove(selectedSize)}
                >
                  <Ionicons name="close" size={18} color="black" />
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
        <View style={styles.formwrapper}>
          <View
            style={{
              borderRadius: 20,
              backgroundColor: "#B0CFFF",
              marginBottom: 10,
            }}
          >
            <Picker
              selectedValue={selectedBrandId}
              onValueChange={handleBrandPress}
              mode="dropdown"
              style={{
                marginHorizontal: 25,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "black",
              }}
            >
              <Picker.Item label="Select Brand..." value="" />
              {brands.map((brand) => (
                <Picker.Item
                  key={brand.id}
                  label={brand.name}
                  value={brand.id}
                />
              ))}
            </Picker>
          </View>
          <View
            style={{
              borderRadius: 20,
              backgroundColor: "#B0CFFF",
              marginBottom: 10,
            }}
          >
            <Picker
              selectedValue={selectedCategoryId}
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
          </View>
          <View
            style={{
              borderRadius: 20,
              backgroundColor: "#B0CFFF",
            }}
          >
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
              <Picker.Item label="Select Color..." value="" />
              {colors.map((color) => (
                <Picker.Item
                  key={color.id}
                  label={color.name}
                  value={color.id}
                />
              ))}
            </Picker>
          </View>
          <View
            style={{
              borderRadius: 20,
              backgroundColor: "#B0CFFF",
              marginTop: 10,
            }}
          >
            <Picker
              selectedValue={selectedSizeId}
              onValueChange={(itemValue) => handleSizePress(itemValue)}
              mode="dropdown"
              style={{
                marginHorizontal: 25,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: "black",
              }}
            >
              <Picker.Item label="Select Size..." value="" />
              {bodySizes.map((size) => (
                <Picker.Item key={size.id} label={size.name} value={size.id} />
              ))}
            </Picker>
          </View>
          <View style={{ flexDirection: "row", margin: 20 }}>
            <Text
              style={{
                alignSelf: "center",
                fontSize: 18,
                flex: 1,
                fontWeight: "bold",
                marginRight: 50,
              }}
            >
              Price (TL):
            </Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              keyboardType="numeric"
              value={price.toString()}
              onChangeText={handlePrice}
            />
          </View>
          <View style={styles.container}>
            <TextInput
              style={styles.input2}
              placeholder="Description"
              value={description}
              onChangeText={onDescriptionChange}
              multiline
            />
            <View style={styles.wordCountContainer}>
              <Text
                style={styles.wordCountText}
              >{`${getRemainingWordsCount()} / ${MAX_DESCRIPTION_WORDS}`}</Text>
            </View>
          </View>
          <Button title="Save" style={{ bottom: 45 }}></Button>
          {/* <View style={styles.inStockContainer}>
            <Text style={styles.inStockLabel}>In Stock:</Text>
            <CheckBox value={inStock} onValueChange={handleStockChange} />
          </View>
            */}
        </View>
      </ScrollView>
    </View>
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

  pngImage: {
    margin: "15%",
    width: "70%",
    height: "78%",
  },
  colorContainer: {
    height: "5%",
    marginTop: 30,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
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
  selectedColorsContainer: {
    height: 45,
    //width: 90,
    paddingLeft: 5,
    paddingRight: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginHorizontal: 5,
    marginBottom: 10,
    paddingTop: 10,
    borderRadius: 10,
    backgroundColor: "lightgray",
    //backgroundColor: "black",
  },
  selectedColorContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    padding: 10,
    borderRadius: 10,
    //backgroundColor: "white",
  },
  selectedColorName: {
    marginLeft: 10,
    marginRight: 5,
  },
  removeColorButton: {
    marginLeft: "auto",
  },
  formwrapper: {
    flex: 1,
    margin: 25,
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
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    height: 100,
  },
  wordCountContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
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
