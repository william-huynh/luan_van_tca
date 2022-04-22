import React, { useEffect, useState } from "react";
import { Image,LogBox, FlatList, SafeAreaView, Text, View, TouchableOpacity, ScrollView } from "react-native";
import axiosClient from "../../../../api/axiosClient";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./style"
import daily1Api from "../../../../api/daily1Api";
import OrderDetailProductsList from "./ProductsList";
import OrderDetailToolsList from "./ToolsList";
import OrderDetailMaterialsList from "./MaterialsList";
import CircularProgress from 'react-native-circular-progress-indicator';

function OrderDetailDaily1 (props) {
    const data = props.route.params.data;
    const daily1Id =props.route.params.extra;
    const orderId = props.route.params.data._id;
    const { navigation } = props;
    const [tiLePhanphat, setTiLePhanphat] = useState(null);
    const [tiendoHT, setTiendoHT] = useState(null);  
    const [tiendoDonhang, setTiendoDonhang] = useState(null);

    const handleRedirectOrderList = () => { navigation.navigate("OrderDaily1", { navigation: navigation }) }
    const getImg = (imgName)=>{ return `${axiosClient.defaults.baseURL}uploads/${imgName}` }
    // const getChartData = (dssubdh) => {
    //     let fullPercent = 0;
    //     dssubdh.forEach((dh) => {
    //       let sum = dh.dssanpham.reduce((acc, sp) => acc + sp.soluong, 0);
    //       fullPercent = fullPercent + sum;
    //     });
    //     // ti le phan phat
    //     const tilephanphat = dssubdh.map((dh) => ({
    //       label: dh.to.daily2.ten,
    //       percent:
    //         (dh.dssanpham.reduce((acc, sp) => acc + sp.soluong, 0) * 100) /
    //         fullPercent,
    //     }));
    //     // tien do hoan thanh
    //     const tiendoHT = dssubdh.map((dh) => ({
    //       label: dh.to.daily2.ten,
    //       percent:
    //         (dh.dssanpham.reduce(
    //           (acc, sp) => acc + (sp.danhan ? sp.danhan : 0),
    //           0
    //         ) *
    //           100) /
    //         dh.dssanpham.reduce((acc, sp) => acc + sp.soluong, 0),
    //     }));
    //     setTiLePhanphat(tilephanphat);
    //     setTiendoHT(tiendoHT);
    // };

    // const fetchData = async () => {
    //     const data = await daily1Api.tiendoDonhang(daily1Id, orderId);
    //     const { subdonhang } = await daily1Api.dssubdonhangOfSingleDH(
    //         daily1Id,
    //         orderId
    //     );
    //     setTiendoDonhang(data);
    //     getChartData(subdonhang);
    //     console.log(tiendoDonhang);
    // }
    // fetchData();

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
            
            <View style = {styles.orderDetailBackground}>
                <ScrollView style = {styles.orderDetailContainer}>
                { (data) ? (
                <View>
                     {/* Order Base Detail */}

                    <View style = {styles.orderDetailContainerUpper}>
                        {data.xacnhan?<Text style = {styles.orderApprove} >ĐÃ DUYỆT ✓</Text>:<Text style = {styles.orderNotApprove} >ĐANG CHỜ DUYỆT ✗</Text>}
                        <Text style = {styles.orderPrice}>{data.tongdongia} VND</Text>
                        <Text style = {styles.orderCode}>{data.ma}</Text>
                    </View>

                    {/* Daily1 Progress */}

                    <View style = {styles.orderDetailContainerLower}>
                        <View style = {styles.orderDetailProgressCircle}>
                            <CircularProgress
                                value = {50}
                                duration = {1000}
                                activeStrokeColor = {'#57DE8D'}
                                progressValueColor = {'#929292'}
                                maxValue = {100}
                                valueSuffix = {'%'}
                                progressValueFontSize = {18}
                                title = {'Hoàn thành'}
                                titleColor = {'#929292'}
                                titleStyle = {{fontWeight: 'bold'}}
                                titleFontSize = {14}
                            />
                        </View>
                        <Text style = {[styles.orderDetailTitle, styles.orderDetailProgressTitle]}>Đại lý cấp 1</Text>
                    </View>

                    {/* Daily2 Progress */}

                    <View style = {styles.orderDetailContainerLower}>
                        <View style = {styles.orderDetailProgressCircle}>
                            <CircularProgress
                                value = {20}
                                duration = {1000}
                                activeStrokeColor = {'#FFB74B'}
                                progressValueColor = {'#929292'}
                                maxValue = {100}
                                valueSuffix = {'%'}
                                progressValueFontSize = {18}
                                title = {'Hoàn thành'}
                                titleColor = {'#929292'}
                                titleStyle = {{fontWeight: 'bold'}}
                                titleFontSize = {14}
                            />
                        </View>
                        <Text style = {[styles.orderDetailTitle, styles.orderDetailProgressTitle]}>Đại lý cấp 2</Text>
                    </View>

                    {/* Farmer Progress */}

                    <View style = {styles.orderDetailContainerLower}>
                        <View style = {styles.orderDetailProgressCircle}>
                            <CircularProgress
                                value = {80}
                                duration = {1000}
                                activeStrokeColor = {'#FB4747'}
                                progressValueColor = {'#929292'}
                                maxValue = {100}
                                valueSuffix = {'%'}
                                progressValueFontSize = {18}
                                title = {'Hoàn thành'}
                                titleColor = {'#929292'}
                                titleStyle = {{fontWeight: 'bold'}}
                                titleFontSize = {14}
                            />
                        </View>
                        <Text style = {[styles.orderDetailTitle, styles.orderDetailProgressTitle]}>Hộ dân</Text>
                    </View>

                    {/* Order Products */}

                    <View style = {styles.orderDetailContainerLower}>
                        <Text style = {styles.orderDetailTitle}>Sản phẩm</Text>
                    </View>
                    <View style = {styles.orderProductListContainer}>
                        <FlatList
                            
                            keyExtractor = {(item)=>item._id}
                            data = {data.dssanpham}
                            const renderItem = {({item})=>(  
                                <OrderDetailProductsList sanpham  = {item} daily1Id = {daily1Id} orderId = {orderId}/>
                            )}                  
                        />
                    </View>

                    {/* Order Tools */}

                    <View style = {styles.orderDetailContainerLower}>
                        <Text style = {styles.orderDetailTitle}>Công cụ</Text>
                    </View>
                    <View style = {styles.orderOrderListContainer}>
                        <FlatList
                            keyExtractor = {(item)=>item._id}
                            data = {data.dscongcu}
                            const renderItem = {({item})=>(  
                                <OrderDetailToolsList sanpham  = {item}/>
                            )}                  
                        />
                    </View>

                    {/* Order Tools */}

                    <View style = {styles.orderDetailContainerLower}>
                        <Text style = {styles.orderDetailTitle}>Nguyên liệu</Text>
                    </View>
                    <View style = {styles.orderOrderListContainer}>
                        <FlatList
                            keyExtractor = {(item)=>item._id}
                            data = {data.dsnguyenlieu}
                            const renderItem = {({item})=>(  
                                <OrderDetailMaterialsList sanpham  = {item}/>
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