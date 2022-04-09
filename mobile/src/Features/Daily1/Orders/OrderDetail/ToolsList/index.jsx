import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View, Image , TouchableOpacity} from "react-native";
import axiosClient from "../../../../../api/axiosClient";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import nguyenlieuApi from "../../../../../api/congcuApi";

function OrderDetailToolsList(props) {
    const data = props.sanpham;
    // console.log(data.congcu);
    const getImg = (imgName)=>{ return `${axiosClient.defaults.baseURL}uploads/${imgName}` } // Get image function
    const [toolInfo, setToolInfo] = useState();
    // const [isLoading, setIsLoading] = useState(true);

    // Get tool info
    useEffect(() => {
        const fetchData = async () => {
            const getToolInfo = await nguyenlieuApi.getCongCu(data.congcu);
            setToolInfo(getToolInfo);
            // setIsLoading(false);
            // console.log(getToolInfo.congcu);
        };
        fetchData();
    }, []);
    
    return (
        <>
            {(toolInfo) ? (
                <View style = {styles.orderToolWrapper}>
                    <View style = {styles.orderToolContainer}>
                    <Image source = {{ uri: `${getImg(toolInfo.congcu.hinhanh)}` }} style = {styles.orderToolImg}/>
                    <View style = {styles.orderToolText}>
                        <Text style = {styles.orderToolName}>{toolInfo.congcu.ten}</Text>
                        <Text style = {styles.orderToolQuantity}>X {data.soluong}</Text>
                    </View>
                    </View>
                </View>
            ):(
                <View>
                    <Text>Error Loading</Text>
                </View>
            )
            }
        </>
    );
}

const styles = StyleSheet.create({
    // Container
    //Tool List

    orderToolWrapper:{
        marginBottom:25,
        marginLeft:25,
        marginRight:25,
    },

    
    orderToolListContainer:{
        flex:1,
        paddingHorizontal:25,
    },
    orderToolContainer:{
        
        flex:1,
        flexDirection:"row",
        backgroundColor:"#FB4747",
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
    orderToolImg:{
        height:50,
        width:50,
        borderRadius:50,
        marginRight:10,
    },
    orderToolText:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },
    orderToolName:{
        fontSize:17,
        color:"#FFFFFF",
        fontWeight:"bold",
    },
    orderToolQuantity:{
        fontSize:17,
        color:"#FFFFFF",
        fontWeight:"bold",
    },
    orderToolExtraContainer:{
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
    orderToolExtraText:{
        marginTop:25,
        marginLeft:10,
    },
    orderToolDetailText:{
        flex:1,
        flexDirection:'row',
        marginBottom:15,
       
    },
    orderToolDetailTextLabel:{
        color:'#000000',
        fontSize:15,
        fontWeight:'bold',
    },
    orderToolDetailTextInfo:{
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

export default OrderDetailToolsList;