import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const colors = [
  { id: 1, name: "Red", hex: "#FF0000" },
  { id: 2, name: "Green", hex: "#00FF00" },
  { id: 3, name: "Blue", hex: "#0000FF" },
  { id: 4, name: "Yellow", hex: "#FFFF00" },
  { id: 5, name: "Orange", hex: "#FFA500" },
];

const SideBar = () => {
  const [selectedColors, setSelectedColors] = useState([]);

  const handleColorPress = (color) => {
    console.log(`You pressed the ${color.name} button!`);

    // Check if the color has already been selected
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
    color: "black",
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
    margin: 25,
    fontWeight: "bold",
  },
  selectedColorsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginHorizontal: 25,
    marginBottom: 20,
  },
  colorRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    marginHorizontal: 25,
    marginBottom: 20,
  },
  selectedColorContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "lightgray",
    flexWrap: "wrap", // add this line
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
    marginBottom: 10,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
  },
});
