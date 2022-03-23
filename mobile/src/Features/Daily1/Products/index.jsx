import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import styles from "./style";
import ProductListDaily1 from "./ProductsListComponent";
import daily1Api from "../../../api/daily1Api";

function ProductDaily1(props) {
  const { navigation } = props;
  // Get daily1 id
  const daily1Id = props.route.params.idDaily1;
  const [productList, setProductList] = useState();

  // Get list
  useEffect(() => {
    const fetchData = async () => {
      const getListOrder = await daily1Api.dsSanpham(daily1Id);
      setProductList(getListOrder.dssanpham);
    };
    fetchData();
  }, []);

  const handleRedirectHome = () => { navigation.navigate("HomeDaily1", { navigation: navigation }) }

  return (
      // Main container
      <SafeAreaView style = {styles.container}>
          
          {/* Top Bar: Return & Search */}
          <View style = {styles.topBarContainer}>
              <TouchableOpacity onPress = {handleRedirectHome} style = {styles.topBarReturn}>
                  <Ionicons 
                      name = "arrow-back"
                      size = {25}
                      style = {{ color: "white" }}
                  />
                  <Text style = {styles.topBarText}>Sản phẩm</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons 
                    name = "search"
                    size = {25}
                    style = {{ color: "white" }}
                />
              </TouchableOpacity>
          </View>

          {/* Product List */}
          <View style = {styles.productListContainer}>
            <FlatList
              data={productList}
              renderItem={(item) => (
                <ProductListDaily1
                  sanpham={item}
                  navigation={navigation}
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