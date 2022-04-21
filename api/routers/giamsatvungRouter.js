const express = require("express");
const giamsatvungRouter = express.Router();
const upload = require("../middleware/imageUpload");
const {
  getCurrentDatetime,
  getTinhtrangNhandon,
  getTiendoHoanthanh,
} = require("../utils");
const gsvController = require("../controller/GiamsatvungController");
// them gsv
giamsatvungRouter.post("/them", gsvController.themgsv);

// cap nhat thong tin ca nhan
giamsatvungRouter.put(
  "/capnhatthongtincanhan",
  upload.single("avatar"),
  gsvController.capnhatthongtincanhan
);

// cap nhat gsv
giamsatvungRouter.put("/single/:id", gsvController.capnhatgsv);

// lay danh sach gsv
giamsatvungRouter.get("/danhsach", gsvController.laydsgsv);

// lay thong tin 1 gsv
giamsatvungRouter.get("/single/:id", gsvController.laytt1gsv);

// lay thong tin 1 gsv based UserId
giamsatvungRouter.get("/baseduserid/:userId", gsvController.laytt1gsvbyUserId);

// xoa nhieu gsv
giamsatvungRouter.put("/multiple", gsvController.xoanhieugsv);

// lay ds giam sat vung chưa có bộ phận kinh doanh
giamsatvungRouter.get("/dsgsvbpkdnull", gsvController.laydsgsvchuacobpkd);

// lay ds dai ly 2 thuoc giam sat vung
giamsatvungRouter.get("/dsdaily2/:gsvId", gsvController.laydsdaily2thuocgsv);

// Duyệt đại lý 2
giamsatvungRouter.put("/duyet/:daily2Id/:gsvId", gsvController.duyetdaily2);

// lay ds don hang thuoc gsv
giamsatvungRouter.get("/dsdonhang/:gsvId", gsvController.laydsdonhangthuocgsv);

// lay ds dai ly 1 thuoc giam sat vung
giamsatvungRouter.get("/dsdaily1/:gsvId", gsvController.laydsdaily1thuocgsv);

// lay danh sach SUB don hang thuoc giamsatvung
giamsatvungRouter.get(
  "/dssubdonhang/:gsvId/:ma",
  gsvController.laydsSUBdonhangthuocgsv
);

// lay danh sach sanpham thuoc Giamsatvung
giamsatvungRouter.get("/dssanpham/:gsvId", gsvController.laydssanphamthuocgsv);

// lay danh sach vattu thuoc Giamsatvung
giamsatvungRouter.get("/dsvattu/:gsvId", gsvController.laydsvattuthuocgsv);

// lay danh sach nguyenlieu thuoc Giamsatvung
giamsatvungRouter.get(
  "/dsnguyenlieu/:gsvId",
  gsvController.laydsnguyenlieuthuocgsv
);

// lay danh sach congcu thuoc Giamsatvung
giamsatvungRouter.get("/dscongcu/:gsvId", gsvController.laydscongcuthuocgsv);

// lay so lieu tong quan
giamsatvungRouter.get("/tongquan/:gsvId", gsvController.laysolieutongquan);

// lay ds daily2, donhang chua duyet hien thi badge
giamsatvungRouter.get(
  "/dsshowbadge/:gsvId",
  gsvController.laydsDL2DHchuahienthi
);

//--------------------------------------------

// them cong cu hu loi
giamsatvungRouter.put("/themcchuloi/:gsvId", gsvController.themcongcuhuloi);

// lay ds cong cu hu loi
giamsatvungRouter.get("/dscchuloi/:gsvId", gsvController.laydscongcuhuloi);

//--------------------------------------------

// them vat tu hu loi
giamsatvungRouter.put("/themvthuloi/:gsvId", gsvController.themcongcuhuloi);

// lay ds vat tu hu loi
giamsatvungRouter.get("/dsvthuloi/:gsvId", gsvController.laydsvattuhuloi);

//--------------------------------------------

// them nguyen lieu hu loi
giamsatvungRouter.put(
  "/themnglhuloi/:gsvId",
  gsvController.themnguyenlieuhuloi
);

// lay ds nguyen lieu hu loi
giamsatvungRouter.get("/dsnglhuloi/:gsvId", gsvController.laydsnguyenlieuhuloi);

// lay ds subdonhang cua 1 don hang co ma cu the va thuoc gsv co ma gsv
giamsatvungRouter.get(
  "/dssubdhofsingledh/:gsvId/:madh",
  gsvController.laydsSUBdonhangcuadonhangcosmacuthe
);

// lay ds hodan
giamsatvungRouter.get("/dshodan/:gsvId", gsvController.laydshodan);

// Tổng hợp số liệu tổng quát của tiến độ đơn hàng
giamsatvungRouter.get(
  "/tiendodonhang/:gsvId/:maDH",
  gsvController.tonghopsolieutongquat
);

giamsatvungRouter.get("/collection", gsvController.getCollection);
giamsatvungRouter.delete("/collection", gsvController.dropCollection);

module.exports = giamsatvungRouter;
