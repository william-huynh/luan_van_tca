import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import OrderListDaily1 from "./OrderListComponent";
import styles from "./style";

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Order',
    price: '3,000,000',
    deadline: '30/03/2022',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Order',
    price: '500,000',
    deadline: '23/05/2022',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Order',
    price: '5,200,000',
    deadline: '01/06/2022',
  },
];

function ScreenOrderDaily1(props) {
    return (
        // Main container
        <SafeAreaView style = {styles.container}>
            
            {/* Top Bar: Return & Search */}
            <View style = {styles.topBarContainer}>
                <Ionicons 
                    name = "arrow-back"
                    size = {25}
                    style = {styles.topBarIconArrow}
                />
                <Text style = {styles.topBarText}>Đơn hàng</Text>
                <Ionicons 
                    name = "search"
                    size = {25}
                    style = {styles.topBarIconSearch}
                />
            </View>

            {/* Order List */}
            <View style = {styles.orderListContainer}>
              <FlatList
                data={DATA}
                renderItem={(item, index) => (
                  <OrderListDaily1
                    dataList={item}
                    // navigation={navigation}
                    // hodanId={hodanId}
                  />
                )}
                keyExtractor={item => item.id}
              />
            </View>

          {/* {orderList && (
            <FlatList
              data={orderList}
              renderItem={(item, index) => (
                <ListDonHang
                  dataList={item}
                  navigation={navigation}
                  hodanId={hodanId}
                />
              )}
              keyExtractor={(item) => item._id}
            />
          )} */}
        </SafeAreaView>
      );
}

export default ScreenOrderDaily1;