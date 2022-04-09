import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

// Import Dai ly 1 screens
import HomeDaily1 from "../../../Daily1/Home";
import OrderDaily1 from "../../../Daily1/Orders";
import OrderDetailDaily1 from "../../../Daily1/Orders/OrderDetail";
import ProductDaily1 from "../../../Daily1/Products";
import ProductDetailDaily1 from "../../../Daily1/Products/ProductDetail";

// Import Ho dan screens
import ListCongCu from "../../../Home/ScreenKho/ListCongCu";
import ListVatTu from "../../../Home/ScreenKho/ListVatTu";
import ListNguyenLieu from "../../../Home/ScreenKho/ListNguyenLieu";
import BCTienDo from "../../../Home/ScreenTienDo/BCTienDo";
import TabNav from "../../../TabNav";
import LoginForm from "../LoginForm";
import DonHang from "../../../Home/ScreenDonHang/DonHang"
import SrceenDoiMatKhau from "../../../CaNhan/ScreenDoiMatKhau";
import FormCCLoi from "../../../Home/ScreenKho/CongCu/FormCCLoi";
import FormNLLoi from "../../../Home/ScreenKho/NguyenLieu/FormNLLoi";
import FormVTLoi from "../../../Home/ScreenKho/VatTu/FormVTLoi";
import ListKhoLoi from "../../../Home/ScreenKho/ListKhoLoi";
import ListSanPham from "../../../Home/ScreenKho/ListSanPham";
import FormGiaoHang from "../../../Home/ScreenDonHang/FormGiaoHang";

function Login(props) {
  const Stack = createNativeStackNavigator();
  return (

    // <LoginForm onSubmit={handleLoginSubmit} />
    <NavigationContainer>
      <Stack.Navigator screenOptions={{header : ()=> null}}>
        <Stack.Screen
          name="Login"
          component={LoginForm}
          options={{ header: () => null}}
        />

        {/* Dai ly 1 screens */}
        <Stack.Screen name="HomeDaily1" component={HomeDaily1} />
        <Stack.Screen name="ProductDaily1" component={ProductDaily1} />
        <Stack.Screen name="OrderDaily1" component={OrderDaily1} />
        <Stack.Screen name="OrderDetailDaily1" component={OrderDetailDaily1} />
        <Stack.Screen name="ProductDetailDaily1" component={ProductDetailDaily1} />

        {/* Ho dan screens */}
        <Stack.Screen name="TabNav" component={TabNav} />
        <Stack.Screen name="BCTienDo" component={BCTienDo} />
        <Stack.Screen name="ScreenCongCu" component={ListCongCu} />
        <Stack.Screen name="FormCongCuLoi" component={FormCCLoi} />
        <Stack.Screen name="ScreenVatTu" component={ListVatTu} />
        <Stack.Screen name="FormVattuLoi" component={FormVTLoi} />
        <Stack.Screen name="ScreenNguyenLieu" component={ListNguyenLieu} />
        <Stack.Screen name="FormNguyenLieuLoi" component={FormNLLoi} />
        <Stack.Screen name="ScreenKhoLoi" component={ListKhoLoi} />
        <Stack.Screen name="ScreenSanPham" component={ListSanPham} />
        <Stack.Screen name="DonHang" component={DonHang} />
        <Stack.Screen name="FormGiaoHang" component={FormGiaoHang} />
        <Stack.Screen name="ScreenDoiMatKhau" component={SrceenDoiMatKhau} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Login;
