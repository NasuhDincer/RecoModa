import { useMemo } from "react";
import { Image } from "react-native";

const ImageComp = ({ item }) => {
    const randomBool = useMemo(() => Math.random() < 0.5, [])
    return (
        <Image source={item.source} style={{ height: randomBool ? 150 : 250, margin:2, borderRadius: 5, width: null, flex: 1, alignSelf: 'stretch' }} resizeMode="cover" />
    )
}

export default ImageComp;