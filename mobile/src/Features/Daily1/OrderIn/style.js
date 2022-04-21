import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    // Container
    container: {
        backgroundColor: "#B02916",
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
    topBarIconArrow: {
        color: "white",
        flex: 1,
    },
    topBarText: {
        flex: 8,
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        marginLeft:10,
    },
    topBarIconSearch: {
        color: "white",
        flex: 1,
        textAlign: "right",
    },

    // Order List
    orderListContainer: {
        backgroundColor: "#F3F0FF",
        flex: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingTop: 37,
        paddingRight: 25,
        paddingLeft: 25,
    },
});

export default styles;