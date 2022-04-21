const express = require("express");
const nguyenlieuRouter = express.Router();
const upload = require("../middleware/imageUpload");
const { getCurrentDatetime } = require("../utils");
const nguyenlieuController = require("../controller/NguyenlieuController");
// them nguyen lieu
nguyenlieuRouter.post(
  "/them",
  upload.single("hinhanh"),
  nguyenlieuController.themnguyenlieu
);

// sua nguyen lieu
nguyenlieuRouter.put(
  "/single/:id",
  upload.single("hinhanh"),
  nguyenlieuController.suanguyenlieu
);

// lay danh sach nguyen lieu
nguyenlieuRouter.get("/danhsach", nguyenlieuController.laydsnguyenlieu);

// lay thong tin 1 nguyen lieu
nguyenlieuRouter.get("/single/:id", nguyenlieuController.laytt1nguyenlieu);

// Xoa 1 nguyenlieu
nguyenlieuRouter.delete("/single/:id", nguyenlieuController.xoa1nguyenlieu);

// Xoa nhieu nguyenlieu
nguyenlieuRouter.put(
  "/xoanhieunglieu",
  nguyenlieuController.xoanhieunguyenlieu
);

// them nglieu hu loi
nguyenlieuRouter.put("/themnglhuloi", nguyenlieuController.themnguyenlieuhuloi);

nguyenlieuRouter.get("/collection", nguyenlieuController.getCollection);
nguyenlieuRouter.delete("/collection", nguyenlieuController.dropColecction);

module.exports = nguyenlieuRouter;
