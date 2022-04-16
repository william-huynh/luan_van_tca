const express = require("express");
const vattuRouter = express.Router();
const upload = require("../middleware/imageUpload");
const { getCurrentDatetime } = require("../utils");
const vattuController = require("../controller/VattuController");
// them vat tu
vattuRouter.post("/them", upload.single("hinhanh"), vattuController.themvattu);

// sua vat tu
vattuRouter.put(
  "/single/:id",
  upload.single("hinhanh"),
  vattuController.suavattu
);

// lay danh sach vat tu
vattuRouter.get("/danhsach", vattuController.laydsvattu);

// lay thong tin 1 vat tu
vattuRouter.get("/single/:id", vattuController.laytt1vattu);

// Xoa 1 vattu
vattuRouter.delete("/single/:id", vattuController.xoavattu);

// Xoa nhieu vattu
vattuRouter.put("/xoanhieuvattu", vattuController.xoanhieuvattu);

// them vattu hu loi
vattuRouter.put("/themvattuhuloi", vattuController.themvattuhuloi);

vattuRouter.get("/collection", vattuController.getCollection);
vattuRouter.delete("/collection", vattuController.dropCollection);

module.exports = vattuRouter;
