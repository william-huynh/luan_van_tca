import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View,TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import styles from "./style";
// import OrderListDaily1 from "./OrderListComponent";
import daily1Api from "../../../api/daily1Api";

function OrderOutDaily1(props) {
  const { navigation } = props;
  // Get daily1 id
  const daily1Id = props.route.params.idDaily1;
  const [orderList, setOrderList] = useState();

  // Get list
  useEffect(() => {
    const fetchData = async () => {
      const getListOrder = await daily1Api.dsDonhang(daily1Id);
      setOrderList(getListOrder.donhang);
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
                  style = {styles.topBarIconArrow}
              />
              <Text style = {styles.topBarText}>Đơn hàng</Text>
            </TouchableOpacity> 
            <Ionicons 
                name = "search"
                size = {25}
                style = {styles.topBarIconSearch}
            />
          </View>

          {/* Order List */}
          <View style = {styles.orderListContainer}>
            {/* <FlatList
              data={orderList}
              renderItem={(item, index) => (
                <OrderListDaily1
                  order={item}
                  navigation={navigation}
                  daily1Id={daily1Id}
                />
              )}
              keyExtractor={(item) => item._id}
            /> */}
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

export default OrderOutDaily1;