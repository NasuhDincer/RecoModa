import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";


const Measurements = () => {
  //aşağısı update edilecek olan variable'lar
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');
  const [clothingSize, setClothingSize] = useState([]);
  const [shoeSize, setShoeSize] = useState('');

  //aşağısı current değerleri göstermek için
  const [showWeight, setshowWeight] = useState('');
  const [showHeight, setshowHeight] = useState('');
  const [showGender, setshowGender] = useState('');
  const [showClothingSize, setshowClothingSize] = useState([]);
  const [showShoeSize, setshowShoeSize] = useState('');

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

  const handleClothingSizeChange = (itemValue, itemIndex) => {
    if (clothingSize.includes(itemValue)) {
      setClothingSize(clothingSize.filter(value => value !== itemValue));
    } else {
      setClothingSize([...clothingSize, itemValue]);
    }
  };

  const handleShoeChange = (value) => {
    setShoeSize(value);
  }



  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, height: 2, backgroundColor: 'black'}} />
        <View style={{flex: 1, height: 2, backgroundColor: 'black'}} />
      </View>

      <Text style={styles.title}>Your Current Measures</Text>
      <View style={styles.field}>
        <Text style={styles.label}>Weight (kg)</Text>
        <Text style={styles.labelcurrent}>{showWeight}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Height (cm)</Text>
        <Text style={styles.labelcurrent}>{showHeight}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Gender</Text>
        <Text style={styles.labelcurrent}>{showGender}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Clothing Size</Text>
        <Text style={styles.labelcurrent}>{showClothingSize}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Shoe size</Text>
        <Text style={styles.labelcurrent}>{showShoeSize}</Text>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, height: 2, backgroundColor: 'black'}} />
        <View style={{flex: 1, height: 2, backgroundColor: 'black'}} />
      </View>

      <Text style={styles.title}>Update Your Measures</Text>
      <View style={styles.field}>
        <Text style={styles.label}>Weight (kg)</Text>
        <TextInput style={styles.textinputlabel}
          placeholder='0'
          keyboardType="numeric"
          value={weight}
          onChangeText={handleWeightChange}
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Height (cm)</Text>
        <TextInput style={styles.textinputlabel}
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
        <Text style={styles.value}>{clothingSize.join(', ')}</Text>
        <Picker
          style={styles.picker}
          selectedValue={clothingSize}
          onValueChange={handleClothingSizeChange}
          mode="dropdown"
          multiple={true}
        >
          <Picker.Item label="" value="" />
          <Picker.Item label="XS" value="xs" />
          <Picker.Item label="S" value="s" />
          <Picker.Item label="M" value="m" />
          <Picker.Item label="L" value="l" />
          <Picker.Item label="XL" value="xl" />
          <Picker.Item label="XXL" value="xl" />
          <Picker.Item label="XXXL" value="xl" />
        </Picker>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Shoe size</Text>
        <TextInput style={styles.textinputlabel}
          placeholder='0'
          keyboardType="numeric"
          value={shoeSize}
          onChangeText={handleShoeChange}
        />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, height: 2, backgroundColor: 'black'}} />
        <View style={{flex: 1, height: 2, backgroundColor: 'black'}} />
      </View>

      <View style={{flexDirection: "row", }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Settings")}
          style={[styles.buttonContainer, styles.cancelButton]}
        >
          <Text style={styles.btnText}>{"Cancel"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("")}
          style={[styles.buttonContainer, styles.updateButton]}
        >
          <Text style={styles.btnText}>{"Update"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffebee',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 8,
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
  labelcurrent: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  picker: {
    flex: 2,
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
      marginTop: 20,
      marginBottom: 20,
      width: 150,
      borderRadius: 30,
      backgroundColor: "transparent",
      marginHorizontal: 20
    },
    updateButton: {
      backgroundColor: "#00b5ec",
    },
    cancelButton: {
      backgroundColor: "lightgrey",
    },
    textinputlabel: {
      fontSize: 24,
      fontWeight: 'bold',
      marginRight: 10,
    },
    btnText: {
      fontSize: 18,
      fontWeight: 'bold',
    }
    
});


export default Measurements;
