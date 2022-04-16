const express = require("express");
const donhangRouter = express.Router();
const upload = require("../middleware/imageUpload");
const donhangController = require("../controller/DonhangController");
// them don hang
donhangRouter.post("/them", donhangController.themdonhang);

// Lấy ALL ds đơn hàng là đơn hàng gốc
donhangRouter.get("/alldanhsach", donhangController.layALLdsdonhanggoc);

// Lấy ds đơn hàng gốc chưa dược sử dụng
donhangRouter.get("/danhsach", donhangController.laydsdonhanggocchuasudung);

// lấy 1 đơn hàng gốc bất kì
donhangRouter.get("/single/:id", donhangController.laydonhangbatky);

// Xoa nhieu don hang
donhangRouter.put("/xoanhieudonhang", donhangController.xoanhieudonhang);

// bophankds send donhang -> gsv
donhangRouter.put("/bophankdtogsv", donhangController.bpkdsenddhgsv);

// giamsatvung send donhang -> daily1
donhangRouter.put("/gsvtodaily1", donhangController.bpkdsenddhdaily1);

// daily1 send donhang -> daily2
donhangRouter.put("/daily1todaily2", donhangController.daily1senddhdaily2);

// daily2 send donhang -> hodan
donhangRouter.put("/daily2tohodan", donhangController.daily2senddhhodan);

// xac nhan don hang
donhangRouter.put("/xacnhan/:donhangId", donhangController.xacnhandonhang);

// lay subdonhang cua cac phan quyen cap duoi gsv
donhangRouter.get(
  "/subdhduoigsv/:donhangId",
  donhangController.laySUBdonhangcuaphanquyenduoigsv
);

// lay subdonhang cua cac phan quyen cap duoi daily1
donhangRouter.get(
  "/subdhduoidaily1/:donhangId",
  donhangController.laySUBdonhangcuaphanquyenduoidaily1
);

// lay subdonhang cua cac phan quyen cap duoi daily2
donhangRouter.get(
  "/subdhduoidaily2/:donhangId",
  donhangController.laySUBdonhangphanquyenduoidaily2
);

donhangRouter.get("/collection", donhangController.getCollection);
donhangRouter.delete("/collection", donhangController.dropCollection);

module.exports = donhangRouter;
