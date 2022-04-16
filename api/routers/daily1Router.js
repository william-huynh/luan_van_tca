const express = require("express");
const daily1Router = express.Router();
const mongoose = require("mongoose");
const upload = require("../middleware/imageUpload");
const {
  getCurrentDatetime,
  getTinhtrangNhandon,
  getTiendoHoanthanh,
} = require("../utils");

const { postValidation } = require("../validation/daily1.validation");

const daily1Controller = require("../controller/Daily1Controller");

// them dai ly
daily1Router.post("/them", [postValidation], daily1Controller.themdaily1);

// cap nhat thong tin ca nhan
daily1Router.put(
  "/capnhatthongtincanhan",
  upload.single("avatar"),
  daily1Controller.capnhatthongtincanhan
);

// chinh sua dai ly
daily1Router.put("/single/:id", daily1Controller.chinhsuadaily1);

// lay danh sach dai ly 1
daily1Router.get("/danhsach", daily1Controller.laydanhsachdaily1);

// lay ds daily 1 chưa có bộ phận kinh doanh
daily1Router.get("/dsdaily1bpkdnull", daily1Controller.danhsachdaily1khongbpkd);

// lay thong tin 1 dai ly
daily1Router.get("/single/:id", daily1Controller.laythongtin1daily1);

// xoa 1 dai ly 1
daily1Router.delete("/single/:id", daily1Controller.xoadaily1);

// xoa nhieu` daily 1
daily1Router.put("/multiple", daily1Controller.xoanhieudaily1);

// get single daily1 based userId
daily1Router.get("/user/:id", daily1Controller.laythongtindaily1byUserId);

// daily1 them daily2
daily1Router.put("/themdaily2", daily1Controller.themdaily2);

// xoa nhieu` daily 2 thuoc daily1Id
daily1Router.put("/xoanhieudaily2", daily1Controller.xoanhieudaily2);

// lay danh sach phan phat CONG CU thuoc dly1
daily1Router.get(
  "/dsphanphat/:daily1Id",
  daily1Controller.danhsachphanphatcongcudaily1
);

// lay danh sach phan phat VAT TU thuoc dly1
daily1Router.get(
  "/dsvattuphanphat/:daily1Id",
  daily1Controller.danhsachphanphatvattudaily1
);

// lay 1 phan phat thuoc dly1
daily1Router.get(
  "/singlephanphat/:daily1Id/:phanphatId",
  daily1Controller.lay1phanphatthuocdaily1
);

// lay danh sach cong cu thuoc daily 1
daily1Router.get(
  "/danhsachcongcu/:daily1Id",
  daily1Controller.danhsachcongcudaily1
);

// lay danh sach vattu thuoc daily 1
daily1Router.get(
  "/danhsachvattu/:daily1Id",
  daily1Controller.danhsachvattudaily1
);

// Lay danh sach hodan thuoc dai ly 1
daily1Router.get("/dshodan/:daily1Id", daily1Controller.danhsachhodandaily1);

// Duyệt hộ dân
daily1Router.put("/duyet/:hodanId/:daily1Id", daily1Controller.duyethodan);

// lay ds don hang thuoc daily1
daily1Router.get(
  "/dsdonhang/:daily1Id",
  daily1Controller.danhsachdonhangdaily1
);

// lay danh sach daily 2 thuoc daily 1
daily1Router.get(
  "/dsdaily2/:daily1Id",
  daily1Controller.danhsachdaily2thuocdaily1
);

// lay danh sach SUB don hang thuoc daily1
daily1Router.get(
  "/dssubdonhang/:daily1Id/:ma",
  daily1Controller.danhsachSUBdonhangdaily1
);

// lay danh sach sanpham thuoc Daily1
daily1Router.get(
  "/dssanpham/:daily1Id",
  daily1Controller.danhsachsanphamdaily1
);

// lay danh sach vattu thuoc Daily1
daily1Router.get(
  "/dsvattu/:daily1Id",
  daily1Controller.danhsachvattuthuocdaily1
);

// lay danh sach nguyenlieu thuoc Daily1
daily1Router.get(
  "/dsnguyenlieu/:daily1Id",
  daily1Controller.danhsachnguyenlieuthuocdaily1
);

// lay danh sach congcu thuoc Daily1
daily1Router.get(
  "/dscongcu/:daily1Id",
  daily1Controller.danhsachcongcuthuocdaily1
);

// lay so lieu tong quan
daily1Router.get("/tongquan/:daily1Id", daily1Controller.laysolieutongquan);

// lay ds hodan, donhang chua duyet hien thi badge
daily1Router.get(
  "/dsshowbadge/:daily1Id",
  daily1Controller.laydanhsachHDDHchuaduyet
);
//--------------------------------------------

// them cong cu hu loi
daily1Router.put("/themcchuloi/:dl1Id", daily1Controller.themcongcuhuloi);

// lay ds cong cu hu loi
daily1Router.get("/dscchuloi/:dl1Id", daily1Controller.laydscongcuhuloi);

//--------------------------------------------

// them vat tu hu loi
daily1Router.put("/themvthuloi/:dl1Id", daily1Controller.themcongcuhuloi);

// lay ds vat tu hu loi
daily1Router.get("/dsvthuloi/:dl1Id", daily1Controller.laydsvattuhuloi);

//--------------------------------------------

// them nguyen lieu hu loi
daily1Router.put("/themnglhuloi/:dl1Id", daily1Controller.themnguyenlieuhuloi);

// lay ds nguyen lieu hu loi
daily1Router.get("/dsnglhuloi/:dl1Id", daily1Controller.laydsnguyenlieuhuloi);

// lay ds subdonhang cua 1 don hang co ma cu the va thuoc daily1 co ma daily1
daily1Router.get(
  "/dssubdhofsingledh/:daily1Id/:madh",
  daily1Controller.laydsSUBdonhangcomacuthe
);

// Tổng hợp số liệu tổng quát của tiến độ đơn hàng
daily1Router.get(
  "/tiendodonhang/:dl1Id/:maDH",
  daily1Controller.tonghopsolieutongquat
);

daily1Router.get("/collection", daily1Controller.getCollection);

daily1Router.delete("/collection", daily1Controller.dropCollection);

module.exports = daily1Router;
