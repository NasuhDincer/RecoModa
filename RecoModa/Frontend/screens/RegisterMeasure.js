import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";

const RegisterMeasure = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');
  const [clothingSize, setClothingSize] = useState('');
  const [shoeSize, setShoeSize] = useState('');
  const navigation = useNavigation(); // Use the useNavigation hook

  const handleRegister = () => {
    // handle registration logic
  };

  const handleWeightChange = (value) => {
    setWeight(value);
  }
  const handleHeightChange = (value) => {
    setHeight(value);
  }
  const handleShoeChange = (value) => {
    setShoeSize(value);
  }

  return (
    <View style={styles.container}>
    <Image style={styles.bgImage} source={require("../Assets/back1.jpg")} />
      <Text style={styles.title}>Enter Your Measures</Text>
      <View style={styles.field}>
        <Text style={styles.label}>Weight (kg)</Text>
        <TextInput
            placeholder='0'
            keyboardType="numeric"
            value={weight}
            onChangeText={handleWeightChange}
          />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Height (cm)</Text>
        <TextInput
            placeholder='0'
            keyboardType="numeric"
            value={height}
            onChangeText={handleHeightChange}
          />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Gender</Text>
        <Picker
          style={styles.picker}
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Clothing Size</Text>
        <Picker
          style={styles.picker}
          selectedValue={clothingSize}
          onValueChange={(itemValue) => setClothingSize(itemValue)}
        >
          <Picker.Item label="" value="" />
          <Picker.Item label="XS" value="xs" />
          <Picker.Item label="S" value="s" />
          <Picker.Item label="M" value="m" />
          <Picker.Item label="L" value="l" />
          <Picker.Item label="XL" value="xl" />
        </Picker>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}> Shoe size </Text>
        <TextInput
            placeholder='0'
            keyboardType="numeric"
            value={shoeSize}
            onChangeText={handleShoeChange}
          />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("RegisterScreen")}
        style={[styles.buttonContainer, styles.registerButton]}
      >
        <Text style={styles.btnText}>{"Register"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    field: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    label: {
      flex: 1,
      fontSize: 18,
      fontWeight: 'bold',
      marginRight: 10,
    },
    picker: {
      flex: 2,
      height: 50,
      width: '100%',
    },
    TextInput: {
      flex: 2,
      height: 50,
      width: '100%',
    },
    bgImage: {
        flex: 1,
        position: "absolute",
        width: "120%",
        height: "100%",
        justifyContent: "center",
      },
      buttonContainer: {
        height: 45,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        width: 300,
        borderRadius: 30,
        backgroundColor: "transparent",
      },
      registerButton: {
        backgroundColor: "#00b5ec",
    
        shadowColor: "#808080",
        shadowOffset: {
          width: 0,
          height: 9,
        },
        shadowOpacity: 0.5,
        shadowRadius: 12.35,
    
        elevation: 19,
      },
  });
  
export default RegisterMeasure;
  