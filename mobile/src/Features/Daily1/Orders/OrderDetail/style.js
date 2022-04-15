import { StyleSheet, Text } from "react-native";


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

    // Order Detail
    orderDetailBackground: {
        backgroundColor: "#F3F0FF",
        flex: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingTop: 37,
        paddingRight: 25,
        paddingLeft: 25,
    },
    orderDetailContainer: {
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    orderDetailContainerUpper: {
        marginTop: 30,
        alignItems: "center",
        justifyContent: "space-between",
        height: 100,
    },
    orderApprove: {
        fontSize: 20,
        fontWeight: "bold",
        color:'#32AC31',
    },
    orderNotApprove: {
        fontSize: 20,
        fontWeight: "bold",
        color:'#FB4747',
    },
    orderPrice: {
        fontSize: 20,
        fontWeight: "bold",
    },
    orderCode:{
        fontSize: 20,
        fontWeight: "bold",
        color:'#929292',
    },
    orderDetailContainerLower: {
        marginTop: 20,
        paddingLeft: 25,
        paddingRight: 25,
    },
    orderDetailTitle: {
        fontSize: 17,
        fontWeight: "bold",
        paddingBottom: 10,
    },
    orderDetailProgressTextContainer: {
        display: "flex", 
        flexDirection: "row",
        marginLeft: 25, 
        marginRight: 25,
    },
    orderDetailProgressTextLeft: { 
        flex: 1,
        color: "#929292", 
    },
    orderDetailProgressTextRight: {
        color: "#929292",
    },
    orderDetailProgressBar: {
        backgroundColor: "#C4C4C4",
        marginTop: 5,
        marginLeft: 25, 
        marginRight: 25,
        marginBottom: 10,
    }
});

export default styles;