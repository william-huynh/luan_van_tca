import React, { useState, useEffect } from "react";
import styles from "./style";
import { Alert, Button, StyleSheet, Text, View, Pressable, ScrollView, LogBox, SafeAreaView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import daily1Api from "../../../api/daily1Api";

function HomeDaily1(props) {
    const { navigation } = props;
    const [callback, setCallBack] = useState(false);
    const [user, setUser] = useState();
    const handleCallBackSL = (data)=>{
        if(data)
        {
          // console.log(data);
          setCallBack(!callback);
        }
    }
    useEffect(() => {
        (async () => {
            //get info daily1
            const dataDaily1 = await daily1Api.getAll();
            //get id Account
            const dataAccount = await AsyncStorage.getItem("user");
            //filter user list was active
            const userListActive = dataDaily1.daily1.filter((item) => item.user);
            const user = userListActive.find((item) => {
                return dataAccount.includes(item.user._id);
            });
            setUser(user);
            // console.log(user);
            const dsdonhang = await daily1Api.dsDonhang(user._id);
        // console.log(user);
        })();
    }, [callback]);

    const handleRedirectOrder = () => {
        navigation.navigate("OrderDaily1", { idDaily1: `${user._id}` });
    };
    return (
        // Main container
        <SafeAreaView style = {styles.container}>
            {/* {user && (
                <> */}
                    {/* Top Bar: Title & Menu */}
                    <View style = {styles.topBarContainer}>
                        <Text style = {styles.topBarTitle}>Trang chủ</Text>
                        <Ionicons 
                            name = "menu" 
                            size = {35} 
                            style = {styles.topBarMenuIcon}
                        />
                    </View>

                    {/* Dashboard:  */}
                    <View style = {styles.dashboardContainer}>
                        <ScrollView>
                            <View style = {styles.dashboardRow}>
                                <View style = {styles.dashboardBoxContainer}>
                                    <View style = {styles.dashboardBox}>
                                        <View style = {styles.dashboardBoxIconBox}>
                                            <Ionicons
                                                name = "cube"
                                                size = {35}
                                                style = {{ color: "#57DE8D" }}
                                            />
                                        </View>
                                        <Text style = {styles.dashboardBoxTitle}>Sản Phẩm</Text>
                                        <Text style = {styles.dashboardBoxDescription}>21 sản phẩm</Text>
                                    </View>
                                </View>
                                <View style = {styles.dashboardBoxContainer}>
                                    <View style = {styles.dashboardBox}>
                                    <View style = {styles.dashboardBoxIconBox}>
                                            <Ionicons
                                                name = "construct"
                                                size = {35}
                                                style = {{ color: "#FB4747" }}
                                            />
                                        </View>
                                        <Text style = {styles.dashboardBoxTitle}>Công Cụ</Text>
                                        <Text style = {styles.dashboardBoxDescription}>16 công cụ</Text>
                                    </View>
                                </View>
                            </View>
                            <View style = {styles.dashboardRow}>
                                <View style = {styles.dashboardBoxContainer}>
                                    <View style = {styles.dashboardBox}>
                                        <View style = {styles.dashboardBoxIconBox}>
                                            <Ionicons
                                                name = "analytics"
                                                size = {35}
                                                style = {{ color: "#4FC2F3" }}
                                            />
                                        </View>
                                        <Text style = {styles.dashboardBoxTitle}>Vật Tư</Text>
                                        <Text style = {styles.dashboardBoxDescription}>15 vật tư</Text>
                                    </View>
                                </View>
                                <View style = {styles.dashboardBoxContainer}>
                                    <View style = {styles.dashboardBox}>
                                    <View style = {styles.dashboardBoxIconBox}>
                                            <Ionicons
                                                name = "leaf"
                                                size = {35}
                                                style = {{ color: "#FFB74B" }}
                                            />
                                        </View>
                                        <Text style = {styles.dashboardBoxTitle}>Nguyên Liệu</Text>
                                        <Text style = {styles.dashboardBoxDescription}>15 nghiên liệu</Text>
                                    </View>
                                </View>
                            </View>
                            <View style = {styles.dashboardRow}>
                                <View style = {styles.dashboardBoxContainer}>
                                    <View style = {styles.dashboardBox}>
                                        <View style = {styles.dashboardBoxIconBox}>
                                            <Ionicons
                                                name = "copy"
                                                size = {35}
                                                style = {{ color: "#00E0B8" }}
                                            />
                                        </View>
                                        <Text style = {styles.dashboardBoxTitle} onPress={handleRedirectOrder}>Đơn Hàng</Text>
                                        <Text style = {styles.dashboardBoxDescription}>19 đơn hàng</Text>
                                    </View>
                                </View>
                                <View style = {styles.dashboardBoxContainer}>
                                    <View style = {styles.dashboardBox}>
                                    <View style = {styles.dashboardBoxIconBox}>
                                            <Ionicons
                                                name = "man"
                                                size = {35}
                                                style = {{ color: "#7C3EFF" }}
                                            />
                                        </View>
                                        <Text style = {styles.dashboardBoxTitle}>Hộ Dân</Text>
                                        <Text style = {styles.dashboardBoxDescription}>3 hộ dân</Text>
                                    </View>
                                </View>
                            </View>
                            <View style = {styles.dashboardRow}>
                                <View style = {styles.dashboardBoxContainer}>
                                    <View style = {styles.dashboardBox}>
                                        <View style = {styles.dashboardBoxIconBox}>
                                            <Ionicons
                                                name = "log-in"
                                                size = {35}
                                                style = {{ color: "#B02916" }}
                                            />
                                        </View>
                                        <Text style = {styles.dashboardBoxTitle}>Hàng Giao Đến</Text>
                                        <Text style = {styles.dashboardBoxDescription}>10 hàng giao đến</Text>
                                    </View>
                                </View>
                                <View style = {styles.dashboardBoxContainer}>
                                    <View style = {styles.dashboardBox}>
                                    <View style = {styles.dashboardBoxIconBox}>
                                            <Ionicons
                                                name = "log-out"
                                                size = {35}
                                                style = {{ color: "#16B08B" }}
                                            />
                                        </View>
                                        <Text style = {styles.dashboardBoxTitle}>Hàng Giao Đi</Text>
                                        <Text style = {styles.dashboardBoxDescription}>20 hàng giao đi</Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>

                    {/* Navigation bar: Home & Add & Account */}
                    <View style = {styles.naviBarContainer}>
                        <Ionicons
                            name = "home"
                            size = {35}
                            style = {styles.naviBarIcon}
                        />
                        <View style = {styles.naviBarIconBox}>
                            <Ionicons
                                name = "add"
                                size = {40}
                                style = {{ color: "#FFFFFF", paddingLeft: 4 }}
                            />
                        </View>
                        <Ionicons
                            name = "person"
                            size = {35}
                            style = {styles.naviBarIcon}
                        />
                    </View>
                {/* </>
            )} */}
            
        </SafeAreaView>
    );
}
export default HomeDaily1;