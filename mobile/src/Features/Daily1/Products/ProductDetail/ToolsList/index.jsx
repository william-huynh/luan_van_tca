import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import axiosClient from "../../../../../api/axiosClient";

import congcuApi from "../../../../../api/congcuApi";

function ProductDetailToolsList(props) {
    const data = props.congcu.item;
    const getImg = (imgName)=>{ return `${axiosClient.defaults.baseURL}uploads/${imgName}` } // Get image function
    const [toolInfo, setToolInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Get tool info
    useEffect(() => {
        const fetchData = async () => {
            const getToolInfo = await congcuApi.getCongCu(data.congcu);
            setToolInfo(getToolInfo);
            setIsLoading(false);
        };
        fetchData();
    }, []);
    
    return (
        <>
            {!isLoading ? (
                <SafeAreaView style = {styles.container}>
                    <Image source = {{ uri: `${getImg(toolInfo.congcu.hinhanh)}` }} style = {styles.productDetailListPicture} />
                    <Text style = {styles.productDetailListName}>{toolInfo.congcu.ten}</Text>
                    <Text style = {styles.productDetailListQuantity}>x {data.soluong}</Text>
                </SafeAreaView>
            ) : (
                console.log("Is loading!")
            )}
        </>
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
        backgroundColor: "#FB4747",
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

export default ProductDetailToolsList;