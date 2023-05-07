import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Ionic from "react-native-vector-icons/Ionicons";

const Notifications = () => {


    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>NOTIFICATIONS</Text>
            <ScrollView style={styles.content}
                contentContainerStyle={{ gap: 10 }}>
                <View style={styles.seperator}></View>
                <TouchableOpacity onPress={() => console.log("card clicked")} style={styles.item}>
                    <Ionic name="image-outline" size={40} />
                    <Text style={styles.buttonText}>... liked your photo</Text>
                </TouchableOpacity>
                <View style={styles.seperator}></View>
                <TouchableOpacity onPress={() => console.log("card clicked")} style={styles.item}>
                    <Ionic name="person-circle-outline" size={40} />
                    <Text style={styles.buttonText}>... followed you</Text>
                </TouchableOpacity>
                <View style={styles.seperator}></View>
                <TouchableOpacity onPress={() => console.log("card clicked")} style={styles.item}>
                    <Ionic name="image-outline" size={40} />
                    <Text style={styles.buttonText}>... liked your photo</Text>
                </TouchableOpacity>
                <View style={styles.seperator}></View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 24,
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconText: {
        color: '#0096FF',
        fontSize: 18
    },
    content: {
        marginTop: 50,
    },
    item: {
        marginHorizontal: 15,
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center'
    },
    itemText: {
        color: '#525252',
        fontSize: 16,
    },
    seperator: {
        height: 1,
        backgroundColor: '#dedede',
        width: '100%'
    },
    buttonText: {
        color: '#525252',
        fontSize: 16,
    }
});

export default Notifications