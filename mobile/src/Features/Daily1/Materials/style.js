import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    // Container
    container: {
        backgroundColor: "#FFB74B",
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

    // Product List
    toolListContainer: {
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