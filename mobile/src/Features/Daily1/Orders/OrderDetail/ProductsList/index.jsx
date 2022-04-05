import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View, Image , TouchableOpacity} from "react-native";
import axiosClient from "../../../../../api/axiosClient";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import sanphamApi from "../../../../../api/sanphamApi";

function OrderDetailProductsList(props) {
    const data = props.sanpham;
    // console.log(props.sanpham._id);
    // console.log(props.daily1Id);
    const getImg = (imgName)=>{ return `${axiosClient.defaults.baseURL}uploads/${imgName}` } // Get image function
    const [isOpen, setIsOpen] = useState(false);

    const pressHandle = () =>{
        setIsOpen(!isOpen);  
    }
    const [productInfo, setProductInfo] = useState();
    // const [isLoading, setIsLoading] = useState(true);

    // Get product info
    useEffect(() => {
        const fetchData = async () => {
            // const getProductInfo =await sanphamApi.getSanPham(props.daily1Id,props.orderId);
            const getProductInfo = await sanphamApi.test(props.daily1Id);
            return getProductInfo;
            // setIsLoading(false);
            // console.log(getProductInfo.dssanpham[0].donhang._id);
            // console.log(getProductInfo);
            // return productInfo;
      
        };
        fetchData().then(res => {
            let final;
            for (let i =0;i<res.dssanpham.length;i++){
                // console.log(res.dssanpham[0])
                if (res.dssanpham[i].donhang._id===props.orderId){
                    final = res.dssanpham[i]
                    break;
                }
            }
            setProductInfo(final);
        })

        
    }, []);
    return (
        <>
            {/* {!isLoading ? (
                <SafeAreaView style = {styles.container}>
                    <Image source = {{ uri: `${getImg(ingredientInfo.nguyenlieu.hinhanh)}` }} style = {styles.productDetailListPicture} />
                    <Text style = {styles.productDetailListName}>{ingredientInfo.nguyenlieu.ten}</Text>
                    <Text style = {styles.productDetailListQuantity}>x {data.khoiluong} kg</Text>
                </SafeAreaView>
            ) : (
                console.log("Is loading!")
            )} */}
            <TouchableOpacity onPress={()=>pressHandle()}>
                <View style = {styles.orderProductWrapper}>
                    <View style = {styles.orderProductContainer}>
                    <Image source = {{ uri: `${getImg(data.sanpham.hinhanh)}` }} style = {styles.orderProductImg}/>
                    <View style = {styles.orderProductText}>
                        <Text style = {styles.orderProductName}>{data.sanpham.ten}</Text>
                        <Text style = {styles.orderProductQuantity}>X {data.soluong}</Text>
                    </View>
                    {(isOpen) ? (
                        <FontAwesomeIcon
                            name="angle-down"
                            style={styles.icon}
                        />
                    ):(
                        <FontAwesomeIcon
                            name="angle-right"
                            style={styles.icon}
                        />
                    )
                    }
                    </View>
                    {(isOpen) ? (
                        <View style = {styles.orderProductExtraContainer} >
                        <View style = {styles.orderProductExtraText}>
                            <View style = {styles.orderProductDetailText}>
                                <Text style = {styles.orderProductDetailTextLabel}>Mã sản phẩm: </Text>
                                <Text style = {styles.orderProductDetailTextInfo}>{data.sanpham.ma}</Text>
                            </View>
                            <View style = {styles.orderProductDetailText}>
                                <Text style = {styles.orderProductDetailTextLabel}>Hộ dân hoàn thành: </Text>
                                <Text style = {styles.orderProductDetailTextInfo}>Dummy</Text>
                            </View>
                            <View style = {styles.orderProductDetailText}>
                                <Text style = {styles.orderProductDetailTextLabel}>Đã nhận: </Text>
                                <Text style = {styles.orderProductDetailTextInfo}>{productInfo.danhan}</Text>
                            </View>
                            <View style = {styles.orderProductDetailText}>
                                <Text style = {styles.orderProductDetailTextLabel}>Đã giao: </Text>
                                <Text style = {styles.orderProductDetailTextInfo}>{productInfo.dagiao}</Text>
                            </View>
                            <View style = {styles.orderProductDetailText}>
                                <Text style = {styles.orderProductDetailTextLabel}>Còn lại: </Text>
                                <Text style = {styles.orderProductDetailTextInfo}>{productInfo.danhan-productInfo.dagiao}</Text>
                            </View>
                        </View>
                    </View>
                    ):(
                        <View>
                            <Text>Something went wrong</Text>
                        </View>
                    )
                    }
                </View>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    // Container
    //Product List

    orderProductWrapper:{
        marginBottom:25,
        marginLeft:25,
        marginRight:25,
    },

    
    orderProductListContainer:{
        flex:1,
        paddingHorizontal:25,
    },
    orderProductContainer:{
        
        flex:1,
        flexDirection:"row",
        backgroundColor:"#57DE8D",
        borderRadius:5,
        padding:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    orderProductImg:{
        height:50,
        width:50,
        borderRadius:50,
        marginRight:10,
    },
    orderProductText:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },
    orderProductName:{
        fontSize:17,
        color:"#FFFFFF",
        fontWeight:"bold",
    },
    orderProductQuantity:{
        fontSize:17,
        color:"#FFFFFF",
        fontWeight:"bold",
    },
    orderProductExtraContainer:{
        flex:1,
        backgroundColor:"white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation:5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    orderProductExtraText:{
        marginTop:25,
        marginLeft:10,
    },
    orderProductDetailText:{
        flex:1,
        flexDirection:'row',
        marginBottom:15,
       
    },
    orderProductDetailTextLabel:{
        color:'#000000',
        fontSize:15,
        fontWeight:'bold',
    },
    orderProductDetailTextInfo:{
        color:'#929292',
        fontSize:15,
        fontWeight:'bold',
    },

    //Others
    icon:{
        maxWidth:40,
        flex:1,
        fontSize:40,
        marginLeft:10,
        alignItems:"center",
        justifyContent:"center",
        color:"#FFFFFF",
        fontWeight:"bold",
    }
})

export default OrderDetailProductsList;