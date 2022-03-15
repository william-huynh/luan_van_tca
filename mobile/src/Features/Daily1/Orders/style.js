import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    // Container
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

    // Order List
    orderListContainer: {
        backgroundColor: "#F3F0FF",
        flex: 1,
        borderRadius: 15,
        paddingTop: 37,
        paddingRight: 25,
        paddingLeft: 25,
    },
});

export default styles;