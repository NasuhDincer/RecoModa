import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
import rawipv4 from "../ipv4.json";
import axios from "axios";
import { useSelector } from "react-redux";
import pic from "../Assets/user.png";


const colors = [
  { id: 1, hex: "#FF0000" },
  { id: 2, hex: "#00FF00" },
  { id: 3, hex: "#0000FF" },
  { id: 4, hex: "#FFFF00" },
  { id: 5, hex: "#FFA500" },
  { id: 6, hex: "#FFC0CB" },
  { id: 7, hex: "#800080" },
  { id: 8, hex: "#A52A2A" },
  { id: 9, hex: "#808080" },
  { id: 10, hex: "#FFFFFF" },
  { id: 11, hex: "#000000" },
  { id: 12, hex: "#40E0D0" },
  { id: 13, hex: "#FFD700" },
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
const ImageDetails = ({ route }) => {
  const { postInfo } = route.params;
  const user = useSelector((state) => state.user.currentUser);
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // this function will be called after the component is mounted or updated
    //handleSubmit();
    console.log("postInfo : ", postInfo);
  }, []);

  const handleAddProduct = () => {
    const newProduct = {
      category: "",
      brand: "",
      color: "",
      size: "",
      ifSale: false,
      url: "",
      price: "",
    };
    setProducts([...products, newProduct]);
  };

  const handleBrandChange = (value, index) => {
    const newProducts = [...products];
    newProducts[index].brand = value;
    setProducts(newProducts);
  };
  const handleColorChange = (color, index) => {
    const updatedProducts = [...products];
    updatedProducts[index].color = color.hex;
    setProducts(updatedProducts);
  };
  const handleCategoryChange = (value, index) => {
    const newProducts = [...products];
    newProducts[index].category = value;
    setProducts(newProducts);
  };
  const handleSizeChange = (value, index) => {
    const newProducts = [...products];
    newProducts[index].size = value;
    setProducts(newProducts);
  };
  const handleSaleChange = (value, index) => {
    const newProducts = [...products];
    newProducts[index].ifSale = value;
    setProducts(newProducts);
  };
  const handleSalePriceChange = (value, index) => {
    const newProducts = [...products];
    newProducts[index].price = value;
    setProducts(newProducts);
  };
  const handleUrlChange = (value, index) => {
    const newProducts = [...products];
    newProducts[index].url = value;
    setProducts(newProducts);
  };
  const handleRemoveProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };
  const handleSave = () => {
    // Check if required fields are empty
    const requiredFields = ["brand", "category", "size", "color"];
    const emptyFields = requiredFields.filter(
      (field) => !products.some((product) => product[field])
    );
    if (products.length === 0) {
      alert(`Please add product`);
    } else if (emptyFields.length > 0) {
      // Show alert message if required fields are empty
      alert(`Please fill all required fields.`);
    } else {
      handleSubmit();
      //navigation.navigate("home");
    }
  };
  const getFilenameFromUri = (uri) => {
    const path = uri.split('/');
    return path[path.length - 1];
  };
  const handleSubmit = async () => {
    const filename = getFilenameFromUri(postInfo.image.uri);
    console.log("filename : ", filename)
    const ipv4Address = rawipv4["ip"];
    const res2 = await axios.get(
      "http://" + ipv4Address + `:5000/api/media/mediaUser/${user.user._id}`
    );
    
    var mediaId = res2.data._id;
  
    const formData = new FormData();
   formData.append(
      'images',
     {
      uri:postInfo.image.uri,
      type: 'image/png',
      name: filename
     }
    );
    formData.append('mediaId', '1');
    console.log("fname :" ,formData)
    //const formData = new FormData();    
    let res = await fetch('http://' + ipv4Address + ':5000/api/post/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    })

    
    //console.log(res);
   
  };
  return (
    <View style={styles.containerTop}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../Assets/uploadImage.png")}
          style={styles.pngImage}
          resizeMode="cover"
        />
      </View>
      <TouchableOpacity
        onPress={handleAddProduct}
        style={{
          marginHorizontal: 130,
          marginTop: 70,
          height: 40,
          backgroundColor: "#498FBA",
          borderWidth: 1,
          borderRadius: 50,
          paddingTop: 5,
          alignItems: "center",
        }}
      >
        {console.log(products)}
        <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 5 }}>
          Add Product
        </Text>
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          {products.map((product, index) => (
            <View style={styles.formwrapper} key={`product-${index}`}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Product {index + 1}
              </Text>
              <TouchableOpacity
                style={styles.cancelIcon}
                onPress={() => handleRemoveProduct(index)}
              >
                <MaterialIcons name="cancel" size={24} color="white" />
              </TouchableOpacity>
              <Text style={{ color: "red", marginTop: 10 }}>*</Text>
              <View
                style={{
                  borderRadius: 20,
                  backgroundColor: "#B0CFFF",
                  marginBottom: 10,
                }}
              >
                <Picker
                  selectedValue={product.brand}
                  onValueChange={(value) => handleBrandChange(value, index)}
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
                      value={brand.name}
                    />
                  ))}
                </Picker>
              </View>
              <Text style={{ color: "red" }}>*</Text>
              <View
                style={{
                  borderRadius: 20,
                  backgroundColor: "#B0CFFF",
                  marginBottom: 10,
                }}
              >
                <Picker
                  selectedValue={product.category}
                  onValueChange={(value) => handleCategoryChange(value, index)}
                  mode="dropdown"
                  style={{
                    marginHorizontal: 25,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: "black",
                  }}
                >
                  <Picker.Item label="Select Category..." value="" />
                  {categories.map((category) => (
                    <Picker.Item
                      key={category.id}
                      label={category.name}
                      value={category.name}
                    />
                  ))}
                </Picker>
              </View>
              <Text style={{ color: "red" }}>*</Text>
              <View
                style={{
                  borderRadius: 20,
                  backgroundColor: "#B0CFFF",
                  marginBottom: 10,
                }}
              >
                <Picker
                  selectedValue={product.size}
                  onValueChange={(value) => handleSizeChange(value, index)}
                  mode="dropdown"
                  style={{
                    marginHorizontal: 25,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: "black",
                  }}
                >
                  <Picker.Item label="Select Size..." value="" />
                  {bodySizes.map((sizes) => (
                    <Picker.Item
                      key={sizes.id}
                      label={sizes.name}
                      value={sizes.name}
                    />
                  ))}
                </Picker>
              </View>
              <View style={styles.colorContainer2}>
                {colors.map((color) => (
                  <View key={color.id}>
                    <TouchableOpacity
                      onPress={() => handleColorChange(color, index)}
                    >
                      <View
                        style={[
                          styles.colorCircle,
                          { backgroundColor: color.hex },
                          product.color === color.hex
                            ? { borderWidth: 3, borderColor: "black" }
                            : null,
                        ]}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
              <View>
                <View style={{ flexDirection: "row", }}>
                  <Checkbox
                    style={{
                      margin: 15,
                      transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
                    }}
                    value={product.ifSale}
                    onValueChange={(value) => handleSaleChange(value, index)}
                    color={product.ifSale ? "#A0C850" : undefined}
                  />
                  <Text
                    style={{
                      left: 5,
                      marginTop: 15,
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    If for sale:
                  </Text>
                </View>
                {product.ifSale ? (
                  <View>
                    <View style={{ marginLeft: 16, flexDirection: "row" }}>
                      <Text
                        style={{ fontWeight: "bold", fontSize: 18, top: 15 }}
                      >
                        Price:
                      </Text>
                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={product.price.toString()}
                        placeholder="Enter sale price"
                        onChangeText={(value) =>
                          handleSalePriceChange(value, index)
                        }
                      />
                      <Text
                        style={{ fontWeight: "bold", fontSize: 18, top: 15 }}
                      >
                        TL
                      </Text>
                    </View>
                    <TextInput
                      style={[
                        styles.input,
                        { width: "90%", borderBottomWidth: 1, right: 10 },
                      ]}
                      value={product.url.toString()}
                      placeholder="Share Link"
                      onChangeText={(value) => handleUrlChange(value, index)}
                    />
                  </View>
                ) : (
                  <View>
                    <View style={{ marginLeft: 16, flexDirection: "row" }}>
                      <Text
                        style={{
                          textDecorationLine: "line-through",
                          color: "gray",
                          fontWeight: "bold",
                          fontSize: 18,
                          top: 15,
                        }}
                      >
                        Price:
                      </Text>
                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={product.price.toString()}
                        placeholder="Enter sale price"
                        editable={false}
                      />
                      <Text
                        style={{
                          textDecorationLine: "line-through",
                          color: "gray",
                          fontWeight: "bold",
                          fontSize: 18,
                          top: 15,
                        }}
                      >
                        TL
                      </Text>
                    </View>
                    <TextInput
                      style={[
                        styles.input,
                        { width: "90%", borderBottomWidth: 1, right: 10 },
                      ]}
                      keyboardType="numeric"
                      value={product.price.toString()}
                      placeholder="Share Link"
                      editable={false}
                    />
                  </View>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={{
            marginHorizontal: 130,
            marginTop: 5,
            height: 40,
            backgroundColor: "#498FBA",
            borderWidth: 1,
            borderRadius: 50,
            paddingTop: 5,
            alignItems: "center",
            bottom: 8,
          }}
          onPress={handleSave}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  containerTop: {
    flex: 1,
    backgroundColor: "#ffebee",
  },
  container: {
    marginBottom: 20,
  },
  imageContainer: {
    marginTop: 50,
    width: "70%",
    height: 250,
    alignSelf: "center",
    position: "relative",
  },

  pngImage: {
    margin: "10%",
    width: "88%",
    height: "92%",
  },
  colorContainer2: {
    marginHorizontal: 8,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 7,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    borderWidth: 1,
    borderRadius: 25,
  },
  colorRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    marginHorizontal: 25,

    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    marginTop: 10,
    marginRight: 20,
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
    backgroundColor: "#498FBA",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    alignSelf: "center",
    justifyContent: "center",
  },
  uploadButtonText: {
    color: "black",
    fontSize: 17,
    fontWeight: "bold",
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginHorizontal: 5,
    margin: 10,
  },
  colorCircle2: {
    width: 25,
    height: 25,
    borderRadius: 20,
    marginHorizontal: 5,
    alignItems: "center",
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
    backgroundColor: "#b2dfdb",
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
    height: 600,
    margin: 20,
    justifyContent: "flex-end",
    borderTopColor: "lightgray",
    borderTopWidth: 1,
  },
  input: {
    fontSize: 18,
    keyboardType: "numeric",
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 20,
    marginRight: 10,
    marginLeft: 35,
    width: 150,
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
});
export default ImageDetails;
