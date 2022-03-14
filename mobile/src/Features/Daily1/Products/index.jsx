import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./style";

function ScreenProductDaily1(props) {
    return (
        // Main container
        <View style = {styles.container}>
            
            {/* Top Bar: Return & Search */}
            <View style = {styles.topBarContainer}>
                <Ionicons 
                    name = "arrow-round-back"
                />
                <Text>Sản phẩm</Text>
                <Ionicons 
                    name = "search"
                />
            </View>

            {/* Product List */}
            <View></View>

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
        </View>
      );
}

export default ScreenProductDaily1;