const express = require("express");
const congcuRouter = express.Router();
const upload = require("../middleware/imageUpload");
const { getCurrentDatetime } = require("../utils");
const congcuController = require("../controller/CongcuController");

// them cong cu
congcuRouter.post(
  "/them",
  upload.single("hinhanh"),
  congcuController.themcongcu
);

// sua cong cu
congcuRouter.put(
  "/single",
  upload.single("hinhanh"),
  congcuController.suacongcu
);

// lay danh sach cong cu
congcuRouter.get("/danhsach", congcuController.laydanhsachcongcu);

// lay thong tin 1 cong cu
congcuRouter.get("/single/:id", congcuController.laythongtin1congcu);

// Xoa nhieu cong cu
congcuRouter.put("/xoanhieucongcu", congcuController.xoanhieucongcu);

congcuRouter.get("/collection", congcuController.getCollection);
congcuRouter.delete("/collection", congcuController.dropCollection);

module.exports = congcuRouter;
