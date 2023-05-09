import React, { useState } from 'react';
import { View, Button, Image, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { StyleSheet } from 'react-native';

const NewPost = () => {
  const [image, setImage] = useState(null);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('');
  const [description, setDescription] = useState('');
  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  // get camera and gallery permissions
  const getPermissions = async () => {
    const cameraStatus = await Permissions.askAsync(Permissions.CAMERA);
    setCameraPermission(cameraStatus.status === 'granted');

    const galleryStatus = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    setGalleryPermission(galleryStatus.status === 'granted');
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
      }
    } else {
      alert('Gallery permission is required to select an image.');
    }
  };

  // open camera to take photo
  const takePhoto = async () => {
    if (cameraPermission) {
      const { status } = await Camera.requestPermissionsAsync();
      if (status === 'granted') {
        setShowCamera(true);
      } else {
        alert('Camera permission is required to take a photo.');
      }
    } else {
      alert('Camera permission is required to take a photo.');
    }
  };

  // save photo from camera and hide camera preview
  const savePhoto = async (photo) => {
    setShowCamera(false);
    setImage(photo.uri);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {image ? (
          <Image source={{ uri: image }} style={{ width: '100%', height: 200 }} />
        ) : (
          <Button title="Pick an image from gallery" onPress={pickImage} />
        )}
        {showCamera && (
          <Camera
            style={{ flex: 1 }}
            type={Camera.Constants.Type.back}
            onPictureTaken={savePhoto}
          />
        )}
        {!image && !showCamera && (
          <Button title="Take a photo" onPress={takePhoto}  style={styles.button} />
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
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      margin: 10,
      padding: 10,
    },
    button: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

export default NewPost;
