import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import axiosClient from "../../../../../api/axiosClient";

import vattuApi from "../../../../../api/vattuApi";

function ProductDetailSuppliesList(props) {
    const data = props.vattu.item;
    const getImg = (imgName)=>{ return `${axiosClient.defaults.baseURL}uploads/${imgName}` } // Get image function
    const [supplyInfo, setSupplyInfo] = useState();

    // Get tool info
    useEffect(() => {
        const fetchData = async () => {
            const getsupplyInfo = await vattuApi.getVatTu(data.vattu);
            setSupplyInfo(getsupplyInfo);
        };
        fetchData();
    }, []);
    
    return (
        <SafeAreaView style = {styles.container}>
            <Image source = {{ uri: `${getImg(supplyInfo.vattu.hinhanh)}` }} style = {styles.productDetailListPicture} />
            {/* <View style = {styles.productDetailListPicture}/> */}
            <Text style = {styles.productDetailListName}>{supplyInfo.vattu.ten}</Text>
            <Text style = {styles.productDetailListQuantity}>x {data.soluong}</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    // Container
    container: {
        height: 60,
        borderRadius: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#4FC2F3",
        marginBottom: 20,
        padding: 10,
    },

    // Product Detail List Picture
    productDetailListPicture: {
        height: 50,
        width: 50,
        borderRadius: 100,
        backgroundColor: "#FFFFFF"
    },

    // Product Detail List Name
    productDetailListName: {
        color: "white",
        fontSize: 17,
        fontWeight: "bold",
        paddingLeft: 10,
        flex: 1,
    },

    // Product Detail List Quantity
    productDetailListQuantity: {
        color: "white",
        fontSize: 17,
        fontWeight: "bold",
    },
})

export default ProductDetailSuppliesList;