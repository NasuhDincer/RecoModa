import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useMemo } from "react";

import MasonryList from '@react-native-seoul/masonry-list';
import ImageComp from './ImageComp'

const SearchContent = ({ setShowCamera }) => {
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
    }
  ];


  return (
    <View>
      <MasonryList
        data={searchData[0].images}
        keyExtractor={(item) => item.key}
        numColumns={2}
        contentContainerStyle={{
          alignSelf: 'stretch',
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ImageComp item={item} />}
        onEndReachedThreshold={0.5}
        ListFooterComponent={<View style={{ height: 100 }} />}
      />

    </View>
  );
};

export default SearchContent;
