import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    // Container
    container: {
        backgroundColor: "#57DE8D",
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
        height: 320,
    },
    productName: {
        fontSize: 20,
        fontWeight: "bold",
    },
    productType: {
        fontSize: 15,
        fontWeight: "700",
        color: "#929292"
    },
    productPicture: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: "gray",
    },
    productPrice: {
        fontSize: 20,
        fontWeight: "bold",
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
    productDetail: {
        fontSize: 15,
        fontWeight: "700",
        color: "#929292"
    },
})

export default styles;