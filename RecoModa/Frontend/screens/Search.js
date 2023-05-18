import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import SearchBox from "./SearchBox";
import SearchContent from "./SearchContent";

import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Constants from "expo-constants";

import Button from "./Button";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";
import { useWindowDimensions } from "react-native";
import { Platform } from "react-native";

const Search = () => {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [showCamera, setShowCamera] = useState(false);
  const [desiredRatio, setRatio] = useState("16:9");

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let savePhoto = () => {
      setPhoto(photo);
    };

    return (
      <View>
        <View style={styles.previewContainer}>
          <StatusBar />
          <Image
            style={styles.preview}
            source={{ uri: photo.uri }}
            resizeMode="cover"
          />
          <View style={styles.buttons}>
            {hasMediaLibraryPermission ? (
              <TouchableOpacity onPress={savePhoto} style={styles.button}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            ) : undefined}
            <Button title="Delete" onPress={() => setPhoto(undefined)} />
          </View>
        </View>
      </View>
    );
  }

  const prepareRatio = async () => {
    if (Platform.OS === "android" && cameraRef.current) {
      const ratios = await cameraRef.current.getSupportedRatiosAsync();

      // See if the current device has your desired ratio, otherwise get the maximum supported one
      // Usually the last element of "ratios" is the maximum supported ratio
      const ratio =
        ratios.find((ratio) => ratio === desiredRatio) ||
        ratios[ratios.length - 1];
      setRatio(ratio);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SearchBox setShowCamera={setShowCamera} />
          <SearchContent />
        </ScrollView>
      </View>
      {showCamera && (
        <Camera
          style={styles.cameraContainer}
          onCameraReady={prepareRatio}
          ratio={desiredRatio}
          ref={cameraRef}
        >
          <View
            style={{
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <TouchableOpacity onPress={takePic} style={styles.button}>
              <Text style={styles.buttonText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowCamera(false)}>
              <Text style={{ color: "#fff" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    backgroundColor: "#e3e2e0",
    position: "relative",
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 80,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  controls: {
    flex: 0.5,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#E9730F",
    marginLeft: 10,
  },
  camera: {
    flex: 5,
    borderRadius: 20,
  },
  topControls: {
    flex: 1,
  },
  previewContainer: {
    height: "100%",
    width: "100%",
  },
  preview: {
    width: "100%",
    flex: 1,
  },
  buttons: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
  },
  button: {
    height: 40,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#1919FF",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
  },
});

export default Search;
