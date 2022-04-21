const express = require("express");
const loaiSanphamRouter = express.Router();
const { getCurrentDatetime } = require("../utils");
const loaispController = require("../controller/LoaisanphamController");
// them loai san pham
loaiSanphamRouter.post("/them", loaispController.themloaisp);

// lay danh sach loai san pham
loaiSanphamRouter.get("/danhsach", loaispController.laydsloaisp);

// xoa nhieu loai san pham
loaiSanphamRouter.put("/xoanhieuloaisp", loaispController.xoanhieuloaisp);

// lay thong tin 1 loai san pham
loaiSanphamRouter.get("/single/:id", loaispController.laytt1loaisp);

// cap nhat 1 loai san pham
loaiSanphamRouter.put("/single/:id", loaispController.capnhatloaisp);

loaiSanphamRouter.get("/collection", loaispController.getCollection);
loaiSanphamRouter.delete("/collection", loaispController.dropCollection);

module.exports = loaiSanphamRouter;
