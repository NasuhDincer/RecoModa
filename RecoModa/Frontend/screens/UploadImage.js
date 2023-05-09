import React, { useState } from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet, Button, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

export default function UploadImage() {
  const [image, setImage] = useState(null);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('');
  const [description, setDescription] = useState('');
  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  const addImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {image && (
        <Image source={{ uri: image }} style={{ width: '100%', height: 200 }} />
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
      <View style={imageUploaderStyles.formwrapper}>
        <TextInput
          style={imageUploaderStyles.input}
          placeholder="Brand"
          value={brand}
          onChangeText={setBrand}
        />
        <TextInput
          style={imageUploaderStyles.input}
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
        />
        <TextInput
          style={imageUploaderStyles.input}
          placeholder="Color"
          value={color}
          onChangeText={setColor}
        />
        <TextInput
          style={imageUploaderStyles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />
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
    image: {
      width: "100%",
      height: 200,
    },
    uploadBtnContainer: {
      position: "absolute",
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      width: "100%",
      padding: 10,
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
    input: {
      width: "100%",
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      marginVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    button: {
      backgroundColor: "#007bff",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
      marginTop: 20,
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
    },
    formwrapper:{
        flex: 1,
        margin: 50,

    },
  });
  