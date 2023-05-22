import React, { useState } from "react";
import { View, Button, Image, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { StyleSheet } from "react-native";
import rawipv4 from "../ipv4.json";

const NewPost = () => {
  const [image, setImage] = useState(null);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const getFilenameFromUri = (uri) => {
    const path = uri.split("/");

    return path[path.length - 1];
  };

  // get camera and gallery permissions
  const getPermissions = async () => {
    const cameraStatus = await Permissions.askAsync(Permissions.CAMERA);
    setCameraPermission(cameraStatus.status === "granted");

    const galleryStatus = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    setGalleryPermission(galleryStatus.status === "granted");
  };

  const handleColor = async () => {
    const filename = getFilenameFromUri(image.uri);
    console.log("filename : ", filename);
    const ipv4Address = rawipv4["ip"];
    const formData = new FormData();
    formData.append("images", {
      uri: image.uri,
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

    console.log(res);
  };

  // open image picker to select image from gallery
  const pickImage = async () => {
    if (galleryPermission) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
        handleColor()
      }
    } else {
      alert("Gallery permission is required to select an image.");
    }

    
  };

  // open camera to take photo
  const takePhoto = async () => {
    if (cameraPermission) {
      const { status } = await Camera.requestPermissionsAsync();
      if (status === "granted") {
        setShowCamera(true);
      } else {
        alert("Camera permission is required to take a photo.");
      }
    } else {
      alert("Camera permission is required to take a photo.");
    }
  };

  // save photo from camera and hide camera preview
  const savePhoto = async (photo) => {
    setShowCamera(false);
    setImage(photo.uri);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: "100%", height: 200 }}
          />
        ) : (
          <Button
            title="Pick an image from gallery"
            onPress={pickImage}
            style={{ backgroundColor: "black" }}
          />
        )}
        {showCamera && (
          <Camera
            style={{ flex: 1 }}
            type={Camera.Constants.Type.back}
            onPictureTaken={savePhoto}
          />
        )}
        {!image && !showCamera && (
          <Button
            title="Take a photo"
            onPress={takePhoto}
            style={styles.button}
          />
        )}
      </View>
      <View style={{ flex: 1 }}>
        <TextInput
          style={styles.input}
          placeholder="Brand"
          value={brand}
          onChangeText={setBrand}
        />
        <TextInput
          style={styles.input}
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
        />
        <TextInput
          style={styles.input}
          placeholder="Color"
          value={color}
          onChangeText={setColor}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  camera: {
    flex: 1,
  },
  button: {
    marginVertical: 10,
    // backgroundColor: "black"
  },
  formContainer: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default NewPost;
