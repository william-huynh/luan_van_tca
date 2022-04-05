import React, { useEffect, useState } from "react";
import { Image,LogBox, FlatList, SafeAreaView, Text, View, TouchableOpacity, ScrollView } from "react-native";
import axiosClient from "../../../../api/axiosClient";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./style"
import daily1Api from "../../../../api/daily1Api";
import OrderDetailProductsList from "./ProductsList";
import OrderDetailToolsList from "./ToolsList";
import OrderDetailMaterialsList from "./MaterialsList";



function OrderDetailDaily1 (props) {
    const data = props.route.params.data;
    // console.log(props.route.params.data._id);
    const daily1Id =props.route.params.extra;
    const orderId = props.route.params.data._id;
    // console.log(props.route.params.data.order);
    const { navigation } = props;
    const handleRedirectOrderList = () => { navigation.navigate("OrderDaily1", { navigation: navigation }) }
    const getImg = (imgName)=>{ return `${axiosClient.defaults.baseURL}uploads/${imgName}` }
    

    return( 
        <SafeAreaView style = {styles.container}>

            {/* Top Bar: Return & Search */}

            <View style = {styles.topBarContainer}>
                <TouchableOpacity style = {styles.topBarReturn} onPress = {handleRedirectOrderList}>
                    <Ionicons 
                        name = "arrow-back"
                        size = {25}
                        style = {{ color: "white" }}
                    />
                    <Text style = {styles.topBarText}>Quay lại</Text>
                </TouchableOpacity>
            </View>
            
            {/* Order Detail */}
            
            <View style = {styles.productDetailBackground}>
                <ScrollView style = {styles.productDetailContainer}>
                { (data) ? (
                <View>
                     {/* Order Base Detail */}

                    <View style = {styles.productDetailContainerUpper}>
                        {data.xacnhan?<Text style = {styles.productApprove} >ĐÃ DUYỆT ✓</Text>:<Text style = {styles.productNotApprove} >ĐANG CHỜ DUYỆT ✗</Text>}
                        <Text style = {styles.productPrice}>{data.tongdongia} VND</Text>
                        <Text style = {styles.orderCode}>{data.ma}</Text>
                    </View>

                    {/* Order Products */}

                    <View style = {styles.productDetailContainerLower}>
                        <Text style = {styles.productDetailTitle}>Sản phẩm</Text>
                    </View>
                    <View style = {styles.orderProductListContainer}>
                        <FlatList
                            
                            keyExtractor={(item)=>item._id}
                            data={data.dssanpham}
                            const renderItem={({item})=>(  
                                <OrderDetailProductsList sanpham ={item} daily1Id={daily1Id} orderId={orderId}/>
                            )}                  
                        />
                    </View>

                    {/* Product Tools */}

                    <View style = {styles.productDetailContainerLower}>
                        <Text style = {styles.productDetailTitle}>Công cụ</Text>
                    </View>
                    <View style = {styles.orderProductListContainer}>
                        <FlatList
                            keyExtractor={(item)=>item._id}
                            data={data.dscongcu}
                            const renderItem={({item})=>(  
                                <OrderDetailToolsList sanpham ={item}/>
                            )}                  
                        />
                    </View>

                    {/* Product Tools */}

                    <View style = {styles.productDetailContainerLower}>
                        <Text style = {styles.productDetailTitle}>Nguyên liệu</Text>
                    </View>
                    <View style = {styles.orderProductListContainer}>
                        <FlatList
                            keyExtractor={(item)=>item._id}
                            data={data.dsnguyenlieu}
                            const renderItem={({item})=>(  
                                <OrderDetailMaterialsList sanpham ={item}/>
                            )}                  
                        />
                    </View>
                </View>
                    
                ):(
                <View>
                    <Text>Error loading</Text>
                </View>
                )
                }
                </ScrollView>
            </View>
            
        </SafeAreaView>
    );
};
export default OrderDetailDaily1;