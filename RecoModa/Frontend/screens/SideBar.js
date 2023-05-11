import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

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

const SideBar = () => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedBodySizes, setSelectedBodySizes] = useState([]);
  const [selectedBrandId, setSelectedBrandId] = useState();
  const [selectedSizeId, setSelectedSizeId] = useState();
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

  const handleBrandPress = (brand) => {
    const isBrandSelected = selectedBrands.some((b) => b.id === brand.id);
    if (!isBrandSelected) {
      setSelectedBrands((prevSelectedBrands) => [...prevSelectedBrands, brand]);
    }
  };

  const handleBrandRemove = (brand) => {
    setSelectedBrands((prevSelectedBrands) =>
      prevSelectedBrands.filter((b) => b.id !== brand.id)
    );
  };

  const handleSizePress = (size) => {
    const isSizeSelected = selectedBodySizes.some((s) => s.id === size.id);
    if (!isSizeSelected) {
      setSelectedBodySizes((prevSelectedBodySizes) => [
        ...prevSelectedBodySizes,
        size,
      ]);
    }
  };

  const handleSizeRemove = (size) => {
    setSelectedBodySizes((prevSelectedBodySizes) =>
      prevSelectedBodySizes.filter((s) => s.id !== size.id)
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.container}>Filter</Text>
      <View style={{ height: 120 }}>
        <Text style={styles.tagContainer}>TAGS</Text>
        <View style={styles.selectedColorsContainer}>
          {selectedColors.map((color) => (
            <View key={color.id} style={styles.selectedColorContainer}>
              <Text style={styles.selectedColorName}>{color.name}</Text>
              <TouchableOpacity
                style={styles.removeColorButton}
                onPress={() => handleColorRemove(color)}
              >
                <Ionicons name="close" size={18} color="black" />
              </TouchableOpacity>
            </View>
          ))}
          {selectedBrands.map((brand) => (
            <View key={brand.id} style={styles.selectedColorContainer}>
              <Text style={styles.selectedColorName}>{brand.name}</Text>
              <TouchableOpacity
                style={styles.removeColorButton}
                onPress={() => handleBrandRemove(brand)}
              >
                <Ionicons name="close" size={18} color="black" />
              </TouchableOpacity>
            </View>
          ))}
          {selectedBodySizes.map((size) => (
            <View key={size.id} style={styles.selectedColorContainer}>
              <Text style={styles.selectedColorName}>{size.name}</Text>
              <TouchableOpacity
                style={styles.removeColorButton}
                onPress={() => handleSizeRemove(size)}
              >
                <Ionicons name="close" size={18} color="black" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View style={styles.selectedTagContainer}>
        <Picker
          selectedValue={selectedBrandId}
          onValueChange={(itemValue) => {
            const selectedBrand = brands.find(
              (brand) => brand.id === itemValue
            );
            handleBrandPress(selectedBrand);
            setSelectedBrandId(itemValue);
          }}
          mode="dropdown"
          style={{ marginHorizontal: 25, borderRadius: 10,
            borderWidth: 2,
            borderColor: 'black',}}
        >
          <Picker.Item label="Select brand..." value="" />
          {brands.map((brand) => (
            <Picker.Item key={brand.id} label={brand.name} value={brand.id} />
          ))}
        </Picker>
        <Picker
          selectedValue={selectedSizeId}
          onValueChange={(itemValue) => {
            const selectedSize = bodySizes.find(
              (size) => size.id === itemValue
            );
            handleSizePress(selectedSize);
            setSelectedSizeId(itemValue);
          }}
          mode="dropdown"
          style={{ marginHorizontal: 25 }}
        >
          <Picker.Item label="Select Body Size..." value="" />
          {bodySizes.map((size) => (
            <Picker.Item key={size.id} label={size.name} value={size.id} />
          ))}
        </Picker>
        </View>
      </View>
      <Text style={styles.colorContainer}>Color</Text>
      <View style={[styles.colorRow, { flex: 1 }]}>
        {colors.map((color) => (
          <TouchableOpacity
            key={color.id}
            onPress={() => handleColorPress(color)}
          >
            <View
              style={[styles.colorCircle, { backgroundColor: color.hex }]}
            ></View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
export default SideBar;
const styles = StyleSheet.create({
  container: {
    fontSize: 24,
    paddingTop: 20,
    margin: 15,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
    borderBottomWidth: 1,
    
  },
  tagContainer: {
    marginVertical: 25,
    fontWeight: "bold",
    marginLeft: 20,
    
  },
  selectedColorsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginHorizontal: 25,
    marginBottom: 20,
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
  colorContainer: {
    marginHorizontal: 25,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 200,
    marginLeft: 20,
  },
  colorRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    marginHorizontal: 25,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 120,
    marginTop: 10,
    marginRight: 20,
    // backgroundColor: "black"
  },
  colorCircle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginHorizontal: 5,
    margin: 10,

  },
  selectedTagContainer:{
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    margin: 10,
    marginLeft: 25,
    marginRight: 20,
    // marginTop: 60,
  },
});


