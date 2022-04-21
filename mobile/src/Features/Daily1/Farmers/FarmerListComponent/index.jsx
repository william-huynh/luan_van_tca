import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View,TouchableOpacity,Button,Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

function FarmerListDaily1 (props) {
    // console.log(daily1Id);
    // console.log(props.daily1Id);
    const data = props.order.item;
    const extra = props.daily1Id;
    // console.log(extra)
    console.log(data)
    const { navigation } = props;
    const handleRedirectOrderDetail = () => { navigation.navigate("OrderDetailDaily1", { data,extra}) }

    return (
        // Main container
        <SafeAreaView style = {styles.container}>

            {/* Detail: Name & Price & Deadline */}
            <View style = {styles.orderDetailContainer}>
                <Text style = {styles.orderDetailName}>{data.daidien}</Text>
                <Text style = {styles.orderDetailDescription}>Loại sản phẩm: {data.loaisanpham.ten}</Text>
                <Text style = {styles.orderDetailDescription}>Tình trạng :
                {data.active==true ?
                    <Text style = {[styles.orderDetailButtonText,styles.green]}> Đã duyệt</Text>
                    :
                    <Text style = {[styles.orderDetailButtonText,styles.red]}> Chờ duyệt</Text>
                }   
                </Text>
            </View>

            {/* Info Icon */}
            {/* <Text onPress={handleRedirectOrderDetail}> */}
            <View style ={styles.orderDetailTouchArea}>
                <Text>
                    <Ionicons
                        name = "information-circle-outline"
                        size = {25}
                        style = {styles.orderInfo}
                    />
                </Text>
                <View style = {styles.orderDetailButtons}>
                    {data.active==true ? 
                    <TouchableOpacity disabled={true}>
                        <View style = {[styles.orderDetailButton,styles.bggrey]}>
                            <Text style = {[styles.orderDetailButtonText,styles.black]}>Duyệt</Text>
                        </View>
                    </TouchableOpacity>: 
                    <TouchableOpacity>
                        <View style = {[styles.orderDetailButton,styles.bgblue]}>
                            <Text style = {[styles.orderDetailButtonText,styles.white]}>Duyệt</Text>
                        </View>
                    </TouchableOpacity>}
                </View>
            </View>
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
        color: "#7C3EFF",
    },
    orderDetailDescription: {
        fontSize: 13,
        paddingBottom: 10,
    },


    orderDetailTouchArea:{
        flex:1,
        alignItems:"flex-end",
    },
    // Order Info
    orderInfo: {
        flex:1,
        textAlign:"right",  
        color: "#7C3EFF",
    },

    //Buttons
    orderDetailButtons:{
        flex:1,
        flexDirection:"row",
        marginTop:15,
        marginBottom:10,
    },
    orderDetailButton:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        elevation: 3,
        marginRight:10,
    },
    orderDetailButtonText:{
        fontSize: 13,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },
    //Others
    bggrey:{
        backgroundColor:"#CDCDCD",
    },
    green:{
        color: '#57DE8D',
    },
    red:{
        color: '#FB4747',
    },
    bgblue:{
        backgroundColor: '#31D2F2',
    },
    black:{
        color:"black",
    },  
    white:{
        color:"white",
    }, 

  });

export default FarmerListDaily1;