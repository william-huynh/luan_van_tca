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
    topBarIconArrow: {
        color: "white",
        flex: 1,
    },
    topBarText: {
        flex: 8,
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    topBarIconSearch: {
        color: "white",
        flex: 1,
        textAlign: "right",
    },

    // Product List
    productListContainer: {
        backgroundColor: "#F3F0FF",
        flex: 1,
        borderRadius: 15,
        paddingTop: 37,
        paddingRight: 25,
        paddingLeft: 25,
    },
});

export default styles;