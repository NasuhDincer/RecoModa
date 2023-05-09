import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
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

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleColorPress(item)}>
      <View style={[styles.colorCircle, { backgroundColor: item.hex }]} />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.container}>Filter</Text>
      <View style={{ height: 120 }}>
        <Text style={styles.tagContainer}>TAGS</Text>
        <FlatList
          data={selectedColors}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View key={item.id} style={styles.selectedColorContainer}>
              <Text style={styles.selectedColorName}>{item.name}</Text>
              <TouchableOpacity
                style={styles.removeColorButton}
                onPress={() => handleColorRemove(item)}
              >
                <Ionicons name="close" size={18} color="black" />
              </TouchableOpacity>
            </View>
          )}
          horizontal={true}
          contentContainerStyle={styles.selectedColorsContainer}
          numColumns={selectedColors.length > 2 ? null : 2}
        />
      </View>
      <Text style={styles.colorContainer}>Color</Text>
      <FlatList
        data={colors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        horizontal={true}
        contentContainerStyle={styles.colorRow}
      />
    </View>
  );
};
export default SideBar;
const styles = StyleSheet.create({
  container: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 20,
  },
  tagContainer: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 20,
  },
  colorContainer: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 20,
  },
  colorCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
  },
  selectedColorsContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedColorContainer: {
    backgroundColor: "#F2F2F2",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    margin: 5,
  },
  selectedColorName: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  removeColorButton: {
    padding: 5,
  },
  colorRow: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
  },
});
