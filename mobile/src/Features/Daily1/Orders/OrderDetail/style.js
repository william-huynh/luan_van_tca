import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    //Container
    container: {
        backgroundColor: "#00E0B8",
        flex: 1,
        marginTop: 23,
        display: "flex",
    },

    // Top Bar
    topBarContainer: {
        height: 80,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingRight: 25,
        paddingLeft: 25,
    },
    topBarReturn: {
        flex: 1, 
        display: "flex", 
        flexDirection: "row"
    },
    topBarText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: 8,
    },

    // Product Detail
    productDetailBackground: {
        backgroundColor: "#F3F0FF",
        flex: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingTop: 37,
        paddingRight: 25,
        paddingLeft: 25,
    },
    productDetailContainer: {
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    productDetailContainerUpper: {
        marginTop: 30,
        alignItems: "center",
        justifyContent: "space-between",
        height: 100,
    },
    productApprove: {
        fontSize: 20,
        fontWeight: "bold",
        color:'#32AC31',
    },
    productNotApprove: {
        fontSize: 20,
        fontWeight: "bold",
        color:'#FB4747',
    },
    productPrice: {
        fontSize: 20,
        fontWeight: "bold",
    },
    orderCode:{
        fontSize: 20,
        fontWeight: "bold",
        color:'#929292',
    },
    productDetailContainerLower: {
        marginTop: 30,
        paddingLeft: 25,
        paddingRight: 25,
    },
    productDetailTitle: {
        fontSize: 17,
        fontWeight: "bold",
        paddingBottom: 10,
    },
});

export default styles;