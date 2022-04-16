const express = require("express");
const daily2Router = express.Router();
const upload = require("../middleware/imageUpload");
const {
  getCurrentDatetime,
  getTiendoHoanthanh,
  getTinhtrangNhandon,
} = require("../utils");
const { postValidation } = require("../validation/daily2.validation");
const daily2Controller = require("../controller/Daily2Controller");
// them dai ly
daily2Router.post("/them", [postValidation], daily2Controller.themdaily2);

// cap nhat thong tin ca nhan
daily2Router.put(
  "/capnhatthongtincanhan",
  upload.single("avatar"),
  daily2Controller.capnhatthongtincanhan
);

// chinh sua dai ly 2
daily2Router.put("/single/:id", daily2Controller.chinhsuadaily2);

// lay danh sach dai ly 2
daily2Router.get("/danhsach", daily2Controller.laydsdaily2);

// lay thong tin 1 dai ly
daily2Router.get("/single/:id", daily2Controller.laythongtin1daily);

// xoa 1 daily2
daily2Router.delete("/single/:id", daily2Controller.xoa1daily2);

// xoa nhieu` daily 2
daily2Router.put("/multiple", daily2Controller.xoanhieudaily2);

// xoa nhieu` hodan thuoc dai ly 2
daily2Router.put("/xoanhieuhodan", daily2Controller.xoanhieuhodanthuocdaily2);

// lay danh sach dai ly 2 + daily1 null
daily2Router.get("/dsdly2dly1null", daily2Controller.laydsDL2DL1);

// daily 2 them ho dan
daily2Router.put("/themhodan", daily2Controller.daily2themhodan);

// lay danh sach phan phat CONG CU thuoc dly2
daily2Router.get(
  "/dsphanphat/:daily2Id",
  daily2Controller.laydsphanohatcongcudaily2
);

// lay danh sach phan phat VAT TU thuoc dly2
daily2Router.get(
  "/dsvattuphanphat/:daily2Id",
  daily2Controller.laydsphanphatvattudaily2
);

// lay 1 phan phat thuoc dly2
daily2Router.get(
  "/singlephanphat/:daily2Id/:phanphatId",
  daily2Controller.lay1phanphatthuocdaily2
);

// lay danh sach CONG CU thuoc daily 2
daily2Router.get(
  "/danhsachcongcu/:daily2Id",
  daily2Controller.laydscongcuthuocdaily2
);

// lay danh sach VAT TU thuoc daily 2
daily2Router.get(
  "/danhsachvattu/:daily2Id",
  daily2Controller.laydsvattuthuocdaily2
);

// get single daily2 based userId
daily2Router.get("/user/:id", daily2Controller.laythongtindaily2byUserId);

// ===========================================

// them dai ly 2 vao ds daily2 cua daily1
daily2Router.post("/them", daily2Controller.themdaily2vaodsdaily2cuadaily1);

//======================

// lay ds don hang thuoc daily2
daily2Router.get(
  "/dsdonhang/:daily2Id",
  daily2Controller.laydsdonhangthuocdaily2
);

// lay danh sach hodan thuoc daily2
daily2Router.get("/dshodan/:daily2Id", daily2Controller.laydshodanthuocdaily2);

// lay danh sach SUB don hang thuoc daily2
daily2Router.get(
  "/dssubdonhang/:daily2Id/:ma",
  daily2Controller.laydsSUBdonhangthuocdaily2
);

// lay danh sach sanpham thuoc Daily2
daily2Router.get("/dssanpham/:daily2Id", daily2Controller.laydsspthuocdaily2);

// lay danh sach vattu thuoc Daily2
daily2Router.get("/dsvattu/:daily2Id", daily2Controller.laydsvattuthuocdaily2);

// lay danh sach nguyenlieu thuoc Daily1
daily2Router.get(
  "/dsnguyenlieu/:daily2Id",
  daily2Controller.laydsnguyenlieuthuocdaily1
);

// lay danh sach congcu thuoc Daily2
daily2Router.get(
  "/dscongcu/:daily2Id",
  daily2Controller.laydscongcuthuocdaily2
);

// lay so lieu tong quan
daily2Router.get("/tongquan/:daily2Id", daily2Controller.laysolieutongquan);

// lay ds donhang chua duyet hien thi badge
daily2Router.get(
  "/dsshowbadge/:daily2Id",
  daily2Controller.laydsdonhangchuahienthi
);

//--------------------------------------------

// them cong cu hu loi
daily2Router.put("/themcchuloi/:dl2", daily2Controller.themcongcuhuloi);

// lay ds cong cu hu loi
daily2Router.get("/dscchuloi/:dl2", daily2Controller.laydscongcuhuloi);

//--------------------------------------------

// them vat tu hu loi
daily2Router.put("/themvthuloi/:dl2", daily2Controller.themvattuhuloi);

// lay ds vat tu hu loi
daily2Router.get("/dsvthuloi/:dl2", daily2Controller.laydsvattuhuloi);

//--------------------------------------------

// them nguyen lieu hu loi
daily2Router.put("/themnglhuloi/:dl2", daily2Controller.themnguyenlieuhuloi);

// lay ds nguyen lieu hu loi
daily2Router.get("/dsnglhuloi/:dl2", daily2Controller.laydsnguyenlieuhuloi);

// lay ds subdonhang cua 1 don hang co ma cu the va thuoc daily2 co ma daily2
daily2Router.get(
  "/dssubdhofsingledh/:daily2Id/:madh",
  daily2Controller.laydsSUBdonhangcuadonhangcomacuthe
);

// Tổng hợp số liệu tổng quát của tiến độ đơn hàng
daily2Router.get(
  "/tiendodonhang/:dl2Id/:maDH",
  daily2Controller.tonghopsolieutongquat
);

daily2Router.get("/collection", daily2Controller.getCollection);
daily2Router.delete("/collection", daily2Controller.dropCollection);

module.exports = daily2Router;
