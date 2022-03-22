import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import axiosClient from "../../../../../api/axiosClient";

import nguyenlieuApi from "../../../../../api/nguyenlieuApi";

function ProductDetailIngredientsList(props) {
    const data = props.nguyenlieu.item;
    const getImg = (imgName)=>{ return `${axiosClient.defaults.baseURL}uploads/${imgName}` } // Get image function
    const [ingredientInfo, setIngredientInfo] = useState();
    const [isLoading, setIsLoading] = useState(true);

    // Get tool info
    useEffect(() => {
        const fetchData = async () => {
            const getIngredientInfo = await nguyenlieuApi.getNguyenLieu(data.nguyenlieu);
            setIngredientInfo(getIngredientInfo);
            setIsLoading(false);
        };
        fetchData();
    }, []);
    
    return (
        <>
            {!isLoading ? (
                <SafeAreaView style = {styles.container}>
                    <Image source = {{ uri: `${getImg(ingredientInfo.nguyenlieu.hinhanh)}` }} style = {styles.productDetailListPicture} />
                    <Text style = {styles.productDetailListName}>{ingredientInfo.nguyenlieu.ten}</Text>
                    <Text style = {styles.productDetailListQuantity}>x {data.khoiluong} kg</Text>
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
        backgroundColor: "#FFB74B",
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

export default ProductDetailIngredientsList;