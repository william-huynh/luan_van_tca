import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import axiosClient from "../../../../api/axiosClient";
import Ionicons from "react-native-vector-icons/Ionicons";

function MaterialListDaily1 (props) {
    const { navigation } = props;
    const data = props.congcu.item;
    // console.log(data)
    const getImg = (imgName)=>{ return `${axiosClient.defaults.baseURL}uploads/${imgName}` } // Get image function
    const handleRedirectProductDetail = () => { navigation.navigate("ProductDetailDaily1", { data }) }
    
    return (
        // Main container
        <SafeAreaView style = {styles.container}>
            
            {/* Picture */}
            <Image source = {{ uri: `${getImg(data.nguyenlieu.hinhanh)}` }} style = {styles.productPicture} />

            {/* Detail: Name & Product ID & Order ID */}
            <View style = {styles.productDetailContainer}>
                <Text style = {styles.productDetailName}>{data.nguyenlieu.ten}</Text>
                <Text style = {styles.productDetailDescription}>Công dụng sản phẩm : {data.nguyenlieu.congdung}</Text>
                <Text style = {styles.productDetailDescription}>Mô tả sản phẩm : {data.nguyenlieu.mota}</Text>
            </View>

            {/* Info Icon */}
            {/* <Text onPress={handleRedirectProductDetail}> */}
            <Text >
                <Ionicons
                    name = "information-circle-outline"
                    size = {25}
                    style = {styles.productInfo}
                />
            </Text>
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
        color: "#FFB74B",
    },
    productDetailDescription: {
        fontSize: 13,
    },

    // Product Info
    productInfo: {
        color: "#FFB74B",
    },
  });

export default MaterialListDaily1;