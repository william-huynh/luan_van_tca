import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

function OrderListDaily1 (props) {
    const {dataList: { item: data }} = props;
    return (
        // Main container
        <SafeAreaView style = {styles.container}>
            
            {/* Picture */}
            <View style = {styles.orderPicture}></View>

            {/* Detail: Name & Price & Deadline */}
            <View style = {styles.orderDetailContainer}>
                <Text style = {styles.orderDetailName}>{data.title}</Text>
                <Text style = {styles.orderDetailDescription}>Tổng đơn giá : {data.price} VND</Text>
                <Text style = {styles.orderDetailDescription}>Phân phát đến : {data.deadline}</Text>
            </View>

            {/* Info Icon */}
            <Ionicons
                name = "information-circle-outline"
                size = {25}
                style = {styles.orderInfo}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    // Container
    container: {
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "row",
        borderRadius: 10,
        marginBottom: 25,
        padding: 10,
    },

    // Order Picture
    orderPicture: {
        width: 80,
        height: 80,
        backgroundColor: "gray",
        borderRadius: 10,
    },

    // Order Detail
    orderDetailContainer: {
        flex: 1,
        justifyContent: "space-around",
        marginLeft: 20,
    },
    orderDetailName: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#00E0B8",
    },
    orderDetailDescription: {
        fontSize: 13,
    },

    // Order Info
    orderInfo: {
        color: "#00E0B8",
    },
  });

export default OrderListDaily1;