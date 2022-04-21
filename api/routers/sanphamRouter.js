const express = require("express");
const sanphamRouter = express.Router();
const upload = require("../middleware/imageUpload");
const { getCurrentDatetime } = require("../utils");
const spController = require("../controller/SanphamController");
// them moi sp
sanphamRouter.post("/them", upload.single("hinhanh"), spController.themsp);

// lay danh sach san pham
sanphamRouter.get("/danhsach", spController.laydssanpham);

// lay danh sach san pham Chua nam trong 1 bophankd cu the
sanphamRouter.get(
  "/dsspchuacobopkd/:bophankdId",
  spController.laydsspchuanamtrongbpkd
);

// lay thong tin 1 san pham
sanphamRouter.get("/single/:id", spController.laytt1sp);

// sua thong tin 1 sp
sanphamRouter.put(
  "/single/:id",
  upload.single("hinhanh"),
  spController.suatt1sp
);

// Xoa nhieu san pham
sanphamRouter.put("/xoanhieusanpham", spController.xoanhieusp);

sanphamRouter.get("/collection", spController.getCollection);
sanphamRouter.delete("/collection", spController.dropCollection);

module.exports = sanphamRouter;
