import { View, Text, Button, ScrollView } from "react-native";
import React, { useState } from "react";
import { StyleSheet,   TextInput,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Picker} from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";

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
  const navigation = useNavigation(); // Use the useNavigation hook
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
    <ScrollView style={{ flex: 1, backgroundColor: "#e3e2e0" }}>
      <Text style={styles.container}>Filter</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.tagContainer}>TAGS</Text>
        <View style={styles.selectedTagsContainer}>
          {selectedColors.map((color) => (
            <View key={color.id} style={styles.selectedTag}>
              <Text style={styles.selectedTagName}>{color.name}</Text>
              <TouchableOpacity
                style={styles.removeTagButton}
                onPress={() => handleColorRemove(color)}
              >
                <Ionicons name="close" size={18} color="grey" />
              </TouchableOpacity>
            </View>
          ))}
          {selectedBrands.map((brand) => (
            <View key={brand.id} style={styles.selectedTag}>
              <Text style={styles.selectedTagName}>{brand.name}</Text>
              <TouchableOpacity
                style={styles.removeTagButton}
                onPress={() => handleBrandRemove(brand)}
              >
                <Ionicons name="close" size={18} color="black" />
              </TouchableOpacity>
            </View>
          ))}
          {selectedBodySizes.map((size) => (
            <View key={size.id} style={styles.selectedTag}>
              <Text style={styles.selectedTagName}>{size.name}</Text>
              <TouchableOpacity
                style={styles.removeTagButton}
                onPress={() => handleSizeRemove(size)}
              >
                <Ionicons name="close" size={18} color="black" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View style={styles.pickerContainer}>
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
            style={styles.picker}
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
            style={styles.picker}
          >
            <Picker.Item label="Select Body Size..." value="" />
            {bodySizes.map((size) => (
              <Picker.Item key={size.id} label={size.name} value={size.id} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={{ marginLeft: 16, flexDirection: "row" }}>
        <Text
          style={{ fontWeight: "bold", top: 15 }}
        >
          Price:
        </Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter min price"

        />
        <Text
          style={{ fontWeight: "bold", top: 15 }}
        >
          -
        </Text>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter max price"

        />
        <Text
          style={{ fontWeight: "bold", top: 15 }}
        >
          TL
        </Text>
      </View>


      <Text style={styles.colorContainer}>Color</Text>
      <View style={styles.colorRow}>
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={{
            marginHorizontal: 60,
            height: 40,
            width: "80%",
            backgroundColor: "#595959",
            borderWidth: 1,
            borderRadius: 20,
            paddingTop: 5,
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("search")}
        >
          <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>
            {"Cancel"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginHorizontal: 40,
            height: 40,
            width: "80%",
            backgroundColor: "#8D3667",
            borderWidth: 1,
            borderRadius: 20,
            paddingTop: 5,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>
            {"Apply Filter"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SideBar;

const styles = StyleSheet.create({
  container: {
    fontSize: 24,
    paddingTop: 30,
    margin: 15,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
    borderBottomWidth: 1,
  },
  contentContainer: {
    marginTop: 20,
  },
  tagContainer: {
    marginVertical: 25,
    fontWeight: "bold",
    marginLeft: 20,
  },
  selectedTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginHorizontal: 25,
    marginBottom: 20,
  },
  selectedTag: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#CF83AF",
  },
  selectedTagName: {
    marginLeft: 10,
    color: "white",
  },
  removeTagButton: {
    marginLeft: "auto",
  },
  pickerContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "grey",
    margin: 10,
    marginLeft: 25,
    marginRight: 20,
  },
  picker: {
    marginHorizontal: 25,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "grey",
  },
  colorContainer: {
    marginHorizontal: 25,
    fontWeight: "bold",
    marginBottom: 20,
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
    borderWidth: 1,
    borderColor: "grey",
    marginBottom: 20,
    marginTop: 10,
    marginRight: 20,
  },
  colorCircle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginHorizontal: 5,
    margin: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 120,
  },
  button: {
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    borderRadius: 30,
    backgroundColor: "transparent",
    marginHorizontal: 20,
  },
  updateButton: {
    backgroundColor: "#00b5ec",
  },
  cancelButton: {
    backgroundColor: "lightgrey",
  },
  btnText: {
    color: "white",
  },
  input: {
    keyboardType: "numeric",
    width: "50%",
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 20,
    marginRight: 1,
    marginLeft: 10,
    width: 150,
  },

});
