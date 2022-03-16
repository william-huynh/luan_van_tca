import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ProductListDaily1 from "./ProductsListComponent";
import styles from "./style";

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Product',
    product_id: '61c53adc7aed6f14ea8da078',
    order_id: '61c53adc7aed6f14ea8da078',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Product',
    product_id: 'SP002',
    order_id: 'DH002',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Product',
    product_id: 'SP003',
    order_id: 'DH003',
  },
];

function ProductDaily1(props) {
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
              <Text style = {styles.topBarText}>Sản phẩm</Text>
              <Ionicons 
                  name = "search"
                  size = {25}
                  style = {styles.topBarIconSearch}
              />
          </View>

          {/* Product List */}
          <View style = {styles.productListContainer}>
            <FlatList
              data={orderList}
              renderItem={(item, index) => (
                <ProductListDaily1
                  dataList={item}
                  // navigation={navigation}
                  daily1Id={daily1Id}
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

export default ProductDaily1;