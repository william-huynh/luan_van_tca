import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

function ProductListDaily1 (props) {
    const {dataList: { item: data }} = props;
    return (
        // Main container
        <SafeAreaView style = {styles.container}>
            
            {/* Picture */}
            <View style = {styles.productPicture}></View>

            {/* Detail: Name & Product ID & Order ID */}
            <View style = {styles.productDetailContainer}>
                <Text style = {styles.productDetailName}>{data.title}</Text>
                <Text style = {styles.productDetailId}>Mã sản phẩm : {data.product_id}</Text>
                <Text style = {styles.productDetailId}>Mã đơn hàng : {data.order_id}</Text>
            </View>

            {/* Info Icon */}
            <Ionicons
                name = "information-circle-outline"
                size = {25}
                style = {styles.productInfo}
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

    // Product Picture
    productPicture: {
        width: 80,
        height: 80,
        backgroundColor: "gray",
        borderRadius: 10,
    },

    // Product Detail
    productDetailContainer: {
        flex: 1,
        justifyContent: "space-around",
        marginLeft: 20,
    },
    productDetailName: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#57DE8D",
    },
    productDetailId: {
        fontSize: 13,
    },

    // Product Info
    productInfo: {
        color: "#57DE8D",
    },
  });

export default ProductListDaily1;