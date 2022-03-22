import React, { useEffect, useState } from "react";
import { LogBox, FlatList, SafeAreaView, Text, View, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ProductDetailToolsList from "./ToolsList";

// import daily1Api from "../../../../api/daily1Api";
import congcuApi from "../../../../api/congcuApi";
import styles from "./style";
import ProductDetailSuppliesList from "./SuppliesList";
import ProductDetailIngredientsList from "./IngredientsList";

function ProductDetailDaily1(props) {
    const { navigation } = props;
    const data = props.route.params.data.sanpham;
    const getImg = (imgName)=>{ return `${axiosClient.defaults.baseURL}uploads/${imgName}` } // Get image function
    const [toolInfo, setToolInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const handleRedirectProductList = () => { navigation.navigate("ProductDaily1", { navigation: navigation }) }
    const thuoctinhStr = data.thuoctinh.join(", ").toString(); // Change thuoc tinh array to string
    // console.log(data.dscongcu[0]);

    // Ignore "VirtualizedLists should never be nested" log
    useEffect(() => {
        // const fetchData = async () => {
        //     console.log(data.dscongcu[0]);
        //     const getToolInfo = await congcuApi.getCongCu(data.dscongcu[0].congcu);
        //     setToolInfo(getToolInfo);
        //     setIsLoading(false);
        // };
        // fetchData();
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])

    return (
        <SafeAreaView style = {styles.container}>

            {/* Top Bar: Return & Search */}
            <View style = {styles.topBarContainer}>
                <TouchableOpacity style = {styles.topBarReturn} onPress = {handleRedirectProductList}>
                    <Ionicons 
                        name = "arrow-back"
                        size = {25}
                        style = {{ color: "white" }}
                    />
                    <Text style = {styles.topBarText}>Quay lại</Text>
                </TouchableOpacity>
            </View>

            {/* Product Detail */}
            <View style = {styles.productDetailBackground}>
                <ScrollView style = {styles.productDetailContainer}>

                    {/* Upper Detail */}
                    <View style = {styles.productDetailContainerUpper}>
                        <Text style = {styles.productName}>{data.ten}</Text>
                        <Text style = {styles.productType}>{data.loaisanpham.ten}</Text>
                        <View style = {styles.productPicture}/>
                        <Text style = {styles.productPrice}>{data.gia} VND</Text>
                    </View>

                    {/* Lower Detail */}
                    <View style = {styles.productDetailContainerLower}>
                        <Text style = {styles.productDetailTitle}>
                            Mã sản phẩm: <Text style = {styles.productDetail}>{data.ma}</Text>
                        </Text>
                        <Text style = {styles.productDetailTitle}>
                            Thuộc tính: <Text style = {styles.productDetail}>{thuoctinhStr == "" ? "Không có" : thuoctinhStr}</Text>
                        </Text>
                        <Text style = {styles.productDetailTitle}>
                            Mô tả: <Text style = {styles.productDetail}>{data.mota}</Text>
                        </Text>

                        {/* Product Tools */}
                        <Text style = {styles.productDetailTitle}>Công cụ:</Text>
                        <View style = {styles.productToolsContainer}>
                            <FlatList 
                                scrollEnabled = {false}
                                data = {data.dscongcu}
                                renderItem={(item) => (
                                    <ProductDetailToolsList congcu = {item} />
                                )}
                                keyExtractor={item => item._id}
                            />
                            {/* {dscongcu.map((toolInfo, index) => (
                                <View style = {styles.container}>
                                    <Image source = {{ uri: `${getImg(toolInfo.congcu.hinhanh)}` }} style = {styles.productDetailListPicture} />
                                    <Text style = {styles.productDetailListName}>{toolInfo.congcu.ten}</Text>
                                    <Text style = {styles.productDetailListQuantity}>x {data.soluong}</Text>
                                </View>
                            ))} */}
                        </View>

                        {/* Product Supplies */}
                        <Text style = {styles.productDetailTitle}>Vật tư:</Text>
                        <View style = {styles.productToolsContainer}>
                            <FlatList 
                                scrollEnabled = {false}
                                data = {data.dsvattu}
                                renderItem={(item) => (
                                    <ProductDetailSuppliesList vattu = {item} />
                                )}
                                keyExtractor={item => item._id}
                            />
                        </View>

                        {/* Product Ingredients */}
                        <Text style = {styles.productDetailTitle}>Nguyên liệu:</Text>
                        <View style = {styles.productToolsContainer}>
                            <FlatList 
                                scrollEnabled = {false}
                                data = {data.dsnguyenlieu}
                                renderItem={(item) => (
                                    <ProductDetailIngredientsList nguyenlieu = {item} />
                                )}
                                keyExtractor={item => item._id}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>

        </SafeAreaView>
    );
}

export default ProductDetailDaily1;