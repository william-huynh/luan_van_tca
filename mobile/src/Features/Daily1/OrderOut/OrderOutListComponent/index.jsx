import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

function OrderOutListDaily1 (props) {
    // console.log(daily1Id);
    // console.log(props.daily1Id);
    const data = props.order.item;
    const extra = props.daily1Id;
    // console.log(extra)
    const { navigation } = props;
    // const handleRedirectOrderDetail = () => { navigation.navigate("OrderDetailDaily1", { data,extra}) }

    return (
        // Main container
        <SafeAreaView style = {styles.container}>

            {/* Detail: Name & Price & Deadline */}
            <View style = {styles.orderDetailContainer}>
                <Text style = {styles.orderDetailName}>{data.ma}</Text>
                <Text style = {styles.orderDetailDescription}>Tới: Dummy</Text>
                <Text style = {styles.orderDetailDescription}>Tình trạng :
                {data.xacnhan==true ?
                    <Text style = {[styles.orderDetailButtonText,styles.green]}> Đã duyệt</Text>
                    :
                    <Text style = {[styles.orderDetailButtonText,styles.red]}> Chờ duyệt</Text>
                }   
                </Text>
            </View>

            {/* Info Icon */}
            {/* <Text onPress={handleRedirectOrderDetail}> */}
            <Text>
                <Ionicons
                    name = "information-circle-outline"
                    size = {25}
                    style = {styles.orderInfo}
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
        color: "#16B08B",
    },
    orderDetailDescription: {
        fontSize: 13,
        paddingBottom: 10,
    },

    // Order Info
    orderInfo: {
        color: "#16B08B",
    },

    orderDetailButtonText:{
        fontSize: 13,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },

    //Others
    green:{
        color: '#57DE8D',
    },
    red:{
        color: '#FB4747',
    },

  });

export default OrderOutListDaily1;