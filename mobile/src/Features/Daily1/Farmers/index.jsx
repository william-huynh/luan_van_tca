import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View,TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import styles from "./style";
import FarmerListDaily1 from "./FarmerListComponent";
import daily1Api from "../../../api/daily1Api";

function FarmerDaily1(props) {
  const { navigation } = props;
  // Get daily1 id
  const daily1Id = props.route.params.idDaily1;
  const [farmerList, setFarmerList] = useState();

  // Get list
  useEffect(() => {
    const fetchData = async () => {
      const getFarmerList = await daily1Api.dsHodan(daily1Id);
      setFarmerList(getFarmerList.hodan);
      // console.log(getFarmerList)
    };
    fetchData()
  }, []);
  // console.log(farmerList)

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
              <Text style = {styles.topBarText}>Hộ dân</Text>
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
              data={farmerList}
              renderItem={(item, index) => (
                <FarmerListDaily1
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

export default FarmerDaily1;