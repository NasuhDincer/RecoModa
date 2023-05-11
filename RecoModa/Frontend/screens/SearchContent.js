import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import MasonryList from "@react-native-seoul/masonry-list";
import ImageComp from "./ImageComp";

const SearchContent = ({ setShowCamera }) => {
  const navigation = useNavigation();
  const searchData = [
    {
      id: 0,
      images: [
        {
          key: "icon0",
          source: require("../Assets/logoicon.png"),
        },
        {
          key: "icon1",
          source: require("../Assets/profile.png"),
        },
        {
          key: "icon2",
          source: require("../Assets/profile.png"),
        },
        {
          key: "icon3",
          source: require("../Assets/logoicon.png"),
        },
        {
          key: "icon4",
          source: require("../Assets/logoicon.png"),
        },
        {
          key: "icon5",
          source: require("../Assets/profile.png"),
        },
        {
          key: "icon6",
          source: require("../Assets/profile.png"),
        },
        {
          key: "icon7",

          source: require("../Assets/logoicon.png"),
        },
        {
          key: "icon8",
          source: require("../Assets/logoicon.png"),
        },
        {
          key: "icon9",
          source: require("../Assets/profile.png"),
        },
        {
          key: "icon10",

          source: require("../Assets/profile.png"),
        },
        {
          key: "icon11",
          source: require("../Assets/logoicon.png"),
        },
        {
          key: "icon12",
          source: require("../Assets/profile.png"),
        },
      ],
    },
  ];

  return (
    <View>
      <MasonryList
        data={searchData[0].images}
        keyExtractor={(item) => item.key}
        numColumns={2}
        contentContainerStyle={{
          alignSelf: "stretch",
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("ShowPost")}>
            <ImageComp item={item} />
          </TouchableOpacity>
        )}
        onEndReachedThreshold={0.5}
        ListFooterComponent={<View style={{ height: 100 }} />}
      />
    </View>
  );
};

export default SearchContent;

/*
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import MasonryList from "@react-native-seoul/masonry-list";
import ImageComp from "./ImageComp";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const SearchContent = ({ setShowCamera }) => {
  const navigation = useNavigation();
  const searchData = [
    {
      id: 0,
      images: [
        {
          key: "icon0",
          source: require("../Assets/logoicon.png"),
        },
        {
          key: "icon1",
          source: require("../Assets/profile.png"),
        },
        {
          key: "icon2",
          source: require("../Assets/profile.png"),
        },
        {
          key: "icon3",
          source: require("../Assets/logoicon.png"),
        },
        {
          key: "icon4",
          source: require("../Assets/logoicon.png"),
        },
        {
          key: "icon5",
          source: require("../Assets/profile.png"),
        },
        {
          key: "icon6",
          source: require("../Assets/profile.png"),
        },
        {
          key: "icon7",

          source: require("../Assets/logoicon.png"),
        },
        {
          key: "icon8",
          source: require("../Assets/logoicon.png"),
        },
        {
          key: "icon9",
          source: require("../Assets/profile.png"),
        },
        {
          key: "icon10",

          source: require("../Assets/profile.png"),
        },
        {
          key: "icon11",
          source: require("../Assets/logoicon.png"),
        },
        {
          key: "icon12",
          source: require("../Assets/profile.png"),
        },
      ],
    },
  ];

  const [data, setData] = useState([]);
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    // Fetch data on component mount
    handleSubmit();
  }, []);

  const handleSubmit = async () => {
    try {
      const ipv4Address = "192.168.1.2";
      const res = await axios.get(`http://${ipv4Address}:5000/api/post/`);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }

    //props.navigation.navigate("Home")
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
          contentContainerStyle={{
            width: "100%",
          }}
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("ShowPost")}
            >
              <Image
                source={{ uri: `data:image/png;base64,${item.img}` }}
                style={{
                  width: "100%",
                  height: undefined,
                  aspectRatio: 1.7,
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => item._id}
        />

    </View>
  );
};

export default SearchContent;


*/