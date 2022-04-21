import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View,TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import styles from "./style";
import OrderInListDaily1 from "./OrderInListComponent";
import daily1Api from "../../../api/daily1Api";

function OrderInDaily1(props) {
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
    fetchData().then(res =>{
      // console.log(orderList)
      let orderIn =[];
      for(let i =0;i<orderList.length;i++){
        if(orderList[i].to.daily1==daily1Id){
          // console.log(i);
          orderIn.push(orderList[i])
        }
      }
      setOrderList(orderIn);
    })
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
              <Text style = {styles.topBarText}>Hàng giao đến</Text>
            </TouchableOpacity> 
              <Ionicons 
                  name = "search"
                  size = {25}
                  style = {styles.topBarIconSearch}
              />
          </View>

          {/* Order List */}
          <View style = {styles.orderListContainer}>
            <FlatList
              data={orderList}
              renderItem={(item, index) => (
                <OrderInListDaily1
                  order={item}
                  navigation={navigation}
                  daily1Id={daily1Id}
                />
              )}
              keyExtractor={(item) => item._id}
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

export default OrderInDaily1;