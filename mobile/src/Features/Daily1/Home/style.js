import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    // Container
    container: {
        flex: 1,
        backgroundColor: "#F3F0FF",
        marginTop: 23,
        display: "flex",
    },

    // Top Bar
    topBarContainer: {
        height: 80,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 25,
    },
    topBarTitle: {
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: 25,
        flex: 1,
    },
    topBarMenuIcon: {
        textAlign: "right",
        flex: 1,
        paddingRight: 25, 
    },

    // Dashboard
    dashboardContainer: {
        flex: 1,
    },
    dashboardRow: {
        marginBottom: 25,
        display: "flex",
        flexDirection: "row",
        // backgroundColor: "green",
    },
    dashboardBoxContainer: {
        flex: 1,
        alignItems: "center",
        // backgroundColor: "blue",
    },
    dashboardBox: {
        height: 150,
        width: 150,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "space-around",
    },
    dashboardBoxIconBox: {
        height: 50,
        width: 50,
        marginTop: 10,
        backgroundColor: "#F3F0FF",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    dashboardBoxTitle: {
        fontSize: 14,
        fontWeight: "bold",
    },
    dashboardBoxDescription: {
        marginBottom: 10,
        fontSize: 12,
        color: "#929292",
    },

    // Navigation Bar
    naviBarContainer: {
        height: 100,
        backgroundColor: "#2E96E0",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "center",
    },
    naviBarIcon: {
        color: "#FFFFFF",
        flex: 1,
        textAlign: "center",
    },
    naviBarIconBox: {
        width: 50,
        height: 50,
        borderWidth: 3,
        borderRadius: 50,
        borderColor: "#FFFFFF",
        backgroundColor: "#EA5388",
        textAlign: "center",
        paddingLeft: 3,
        paddingTop: 3,
    }
});

export default styles;