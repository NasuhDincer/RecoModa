import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  Button,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
const MAX_DESCRIPTION_WORDS = 51;
export default function UploadImage() {
  const [image, setImage] = useState(null);
  const [similar, setSimilar] = useState([]);
  const navigation = useNavigation();

  const removeImage = () => {
    setImage(null);
    //console.log("image:", image);
  };

  useEffect(() => {
    handleSimilar();
    //console.log("similae :", similar)
  }, []);

  const handleSimilar = async () => {
    const ipv4Address = rawipv4["ip"];
    const res = await axios.get(
      "http://" + ipv4Address + `:5000/api/post/findSimilar/${postId._id}`
    );
    console.log("SİMİLAR ARRAY : ", res.data);
    console.log(typeof res.data);

    const res2 = await axios.get(
      "http://" + ipv4Address + `:5000/api/post/post/${res.data[0]}`
    );
    console.log(Object.keys(res2));
    //console.log("SİMİLAR POST : ", res2.data)
    setSimilar(res.data);
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
      setImage(result.assets[0]);
      //  Console.log("image : ", result)
    }
    console.log(result);
  };

  return (
    <View style={styles.containerTop}>
      <ScrollView>
        <TouchableOpacity
          style={styles.cameraContainer}
          onPress={() => navigation.navigate("search")}
        >
          <Ionicons name="arrow-back-outline" style={styles.cameraIcon} />
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          {image ? (
            <>
              <Image
                source={{ uri: image.uri }}
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
          <Text style={styles.uploadButtonText}>
            {image ? "Edit" : "Upload"} Image
          </Text>
        </TouchableOpacity>
        {image ? (
          <TouchableOpacity style={styles.uploadButton} onPress={addImage}>
            <Text style={styles.uploadButtonText}>Find Similar</Text>
          </TouchableOpacity>
        ) : null}
          <FlatList
            nestedScrollEnabled
            contentContainerStyle={{
              width: "100%",
            }}
            data={similar}
            renderItem={({ item, index }) => <RecoPost post={item}></RecoPost>}
            keyExtractor={(item, key) => item._id}
          />
        <View style={styles.colorContainer}></View>
        <View style={styles.formwrapper}>
          <View
            style={{
              borderRadius: 20,
              backgroundColor: "#B24482",
            }}
          ></View>
        </View>
        <View style={{ height: 50 }}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerTop: {
    flex: 1,
    backgroundColor: "#e3e2e0",
  },
  container: {
    marginBottom: 20,
  },
  imageContainer: {
    marginTop: 10,
    width: "90%",
    height: 320,
    alignSelf: "center",
    position: "relative",
  },

  pngImage: {
    margin: "10%",
    width: "88%",
    height: "92%",
  },
  colorContainer: {
    height: "5%",
    marginTop: 30,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
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
    backgroundColor: "#8D3667",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    alignSelf: "center",
    justifyContent: "center",
  },
  uploadButtonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  selectedColorsContainer: {
    height: 40,
    //width: 90,
    paddingLeft: 5,
    paddingRight: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginHorizontal: 5,
    paddingTop: 10,
    borderRadius: 10,
    backgroundColor: "#CF83AF",
    //backgroundColor: "black",
  },
  selectedColorContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    padding: 10,
    borderRadius: 10,

    backgroundColor: "",
  },
  selectedColorName: {
    marginLeft: 10,
    marginRight: 5,
    color: "white",
  },
  removeColorButton: {
    marginLeft: "auto",
  },
  formwrapper: {
    flex: 1,
    margin: 20,
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
    borderColor: "black",
    marginHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#E9EAEC",
    padding: 15,
    height: 200,
  },
  wordCountContainer: {
    position: "absolute",
    bottom: 10,
    right: 25,
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
  cameraIcon: {
    marginLeft: "5%",
    marginTop: "15%",
    fontSize: 40,
    opacity: 0.7,
    zIndex: 1,
  },
  cameraContainer: {},
});
