import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View ,LogBox } from "react-native";
import { Provider } from "react-redux";
import store from "./src/app/store";
import Login from "./src/Features/auth/components/Login";
import OrderDetailDaily1 from "./src/Features/Daily1/Orders/OrderDetail";

export default function App() {
  LogBox.ignoreLogs(['Remote debugger']);
  return (
    // <OrderDetailDaily1/>
    <Provider store={store}>
      <Login />
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
