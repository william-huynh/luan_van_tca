import React, { useState, useEffect } from "react";
import styles from "./style";
import { Text, View, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import daily1Api from "../../../api/daily1Api";

function HomeDaily1(props) {
    const { navigation } = props;
    const [callback, setCallBack] = useState(false);
    const [user, setUser] = useState();
    const handleCallBackSL = (data) => {
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

    // Redirect functions
    const handleRedirectOrder = () => { navigation.navigate("OrderDaily1", { idDaily1: `${user._id}`, navigation: navigation }) };
    const handleRedirectProduct = () => { navigation.navigate("ProductDaily1", { idDaily1: `${user._id}`, navigation: navigation }) }
    const handleRedirectTool = () => { navigation.navigate("ToolDaily1", { idDaily1: `${user._id}`, navigation: navigation }) }
    const handleRedirectSupply = () => { navigation.navigate("SupplyDaily1", { idDaily1: `${user._id}`, navigation: navigation }) }
    const handleRedirectMaterial = () => { navigation.navigate("MaterialDaily1", { idDaily1: `${user._id}`, navigation: navigation }) }
    const handleRedirectOrderIn = () => { navigation.navigate("OrderInDaily1", { idDaily1: `${user._id}`, navigation: navigation }) }
    const handleRedirectOrderOut = () => { navigation.navigate("OrderOutDaily1", { idDaily1: `${user._id}`, navigation: navigation }) }
    const handleRedirectFarmer = () => { navigation.navigate("FarmerDaily1", { idDaily1: `${user._id}`, navigation: navigation }) }

    return (
        // Main container
        <SafeAreaView style = {styles.container}>
            {/* {user && (
                <> */}
                    {/* Top Bar: Title & Menu */}
                    <View style = {styles.topBarContainer}>
                        <Text style = {styles.topBarTitle}>Trang ch???</Text>
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
                                    <TouchableOpacity onPress = {handleRedirectProduct} style = {styles.dashboardBox}>
                                        <View style = {styles.dashboardBoxIconBox}>
                                            <Ionicons
                                                name = "cube"
                                                size = {35}
                                                style = {{ color: "#57DE8D" }}
                                            />
                                        </View>
                                        <Text style = {styles.dashboardBoxTitle}>S???n Ph???m</Text>
                                        <Text style = {styles.dashboardBoxDescription}>21 s???n ph???m</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style = {styles.dashboardBoxContainer}>
                                    <TouchableOpacity style = {styles.dashboardBox} onPress = {handleRedirectTool}>
                                        <View style = {styles.dashboardBoxIconBox}>
                                            <Ionicons
                                                name = "construct"
                                                size = {35}
                                                style = {{ color: "#FB4747" }}
                                            />
                                        </View>
                                        <Text style = {styles.dashboardBoxTitle}>C??ng C???</Text>
                                        <Text style = {styles.dashboardBoxDescription}>16 c??ng c???</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style = {styles.dashboardRow}>
                                <View style = {styles.dashboardBoxContainer}>
                                    <TouchableOpacity style = {styles.dashboardBox} onPress = {handleRedirectSupply}>
                                        <View style = {styles.dashboardBoxIconBox}>
                                            <Ionicons
                                                name = "analytics"
                                                size = {35}
                                                style = {{ color: "#4FC2F3" }}
                                            />
                                        </View>
                                        <Text style = {styles.dashboardBoxTitle}>V???t T??</Text>
                                        <Text style = {styles.dashboardBoxDescription}>15 v???t t??</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style = {styles.dashboardBoxContainer}>
                                    <TouchableOpacity style = {styles.dashboardBox} onPress = {handleRedirectMaterial}>
                                        <View style = {styles.dashboardBoxIconBox}>
                                            <Ionicons
                                                name = "leaf"
                                                size = {35}
                                                style = {{ color: "#FFB74B" }}
                                            />
                                        </View>
                                        <Text style = {styles.dashboardBoxTitle}>Nguy??n Li???u</Text>
                                        <Text style = {styles.dashboardBoxDescription}>15 nghi??n li???u</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style = {styles.dashboardRow}>
                                <View style = {styles.dashboardBoxContainer}>
                                    <TouchableOpacity onPress = {handleRedirectOrder} style = {styles.dashboardBox}>
                                        <View style = {styles.dashboardBoxIconBox}>
                                            <Ionicons
                                                name = "copy"
                                                size = {35}
                                                style = {{ color: "#00E0B8" }}
                                            />
                                        </View>
                                        <Text style = {styles.dashboardBoxTitle}>????n H??ng</Text>
                                        <Text style = {styles.dashboardBoxDescription}>19 ????n h??ng</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style = {styles.dashboardBoxContainer}>
                                    <TouchableOpacity style = {styles.dashboardBox} onPress = {handleRedirectFarmer}>
                                        <View style = {styles.dashboardBoxIconBox}>
                                            <Ionicons
                                                name = "man"
                                                size = {35}
                                                style = {{ color: "#7C3EFF" }}
                                            />
                                        </View>
                                        <Text style = {styles.dashboardBoxTitle} >H??? D??n</Text>
                                        <Text style = {styles.dashboardBoxDescription}>3 h??? d??n</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style = {styles.dashboardRow}>
                                <View style = {styles.dashboardBoxContainer}>
                                    <TouchableOpacity style = {styles.dashboardBox} onPress = {handleRedirectOrderIn}>
                                        <View style = {styles.dashboardBoxIconBox}>
                                            <Ionicons
                                                name = "log-in"
                                                size = {35}
                                                style = {{ color: "#B02916" }}
                                            />
                                        </View>
                                        <Text style = {styles.dashboardBoxTitle}>H??ng Giao ?????n</Text>
                                        <Text style = {styles.dashboardBoxDescription}>10 h??ng giao ?????n</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style = {styles.dashboardBoxContainer}>
                                    <TouchableOpacity style = {styles.dashboardBox} onPress = {handleRedirectOrderOut}>
                                        <View style = {styles.dashboardBoxIconBox}>
                                            <Ionicons
                                                name = "log-out"
                                                size = {35}
                                                style = {{ color: "#16B08B" }}
                                            />
                                        </View>
                                        <Text style = {styles.dashboardBoxTitle}>H??ng Giao ??i</Text>
                                        <Text style = {styles.dashboardBoxDescription}>20 h??ng giao ??i</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </View>

                    {/* Navigation bar: Home & Add & Account */}
                    <View style = {styles.naviBarContainer}>
                        <Text style = {styles.naviBarIcon}>
                            <Ionicons
                                name = "home"
                                size = {35}
                                style = {{ color: "white" }}
                            />
                        </Text>
                        <Text style = {styles.naviBarIconBox}>
                            <Ionicons
                                name = "add"
                                size = {40}
                                style = {{ color: "#FFFFFF"}}
                            />
                        </Text>
                        <Text style = {styles.naviBarIcon}>
                            <Ionicons
                                name = "person"
                                size = {35}
                                style = {{ color: "white" }}
                            />
                        </Text>
                    </View>
                {/* </>
            )} */}
            
        </SafeAreaView>
    );
}
export default HomeDaily1;