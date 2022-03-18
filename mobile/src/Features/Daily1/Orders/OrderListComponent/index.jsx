import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

function OrderListDaily1 (props) {
    const data = props.order.item;
    return (
        // Main container
        <SafeAreaView style = {styles.container}>

            {/* Detail: Name & Price & Deadline */}
            <View style = {styles.orderDetailContainer}>
                <Text style = {styles.orderDetailName}>{data.ma}</Text>
                <Text style = {styles.orderDetailDescription}>Tổng đơn giá : {data.tongdongia} VND</Text>
                <Text style = {styles.orderDetailDescription}>Tình trạng đơn hàng : {data.xacnhan == true ? "Đã xác nhận" : "Chưa xác nhận"}</Text>
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
        padding: 15,
        paddingBottom: 7,
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
        paddingBottom: 10,
        color: "#00E0B8",
    },
    orderDetailDescription: {
        fontSize: 13,
        paddingBottom: 10,
    },

    // Order Info
    orderInfo: {
        color: "#00E0B8",
    },
  });

export default OrderListDaily1;