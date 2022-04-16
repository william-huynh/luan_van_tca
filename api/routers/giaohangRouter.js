const express = require("express");
const giaohangRouter = express.Router();

const giaohangController = require("../controller/GiaohangController");
// ho dan giao hang -> daily 2
giaohangRouter.post(
  "/hodantodaily2",
  giaohangController.hodangiaohangchodaily2
);

// dai ly 2 xac nhan
giaohangRouter.put(
  "/daily2xacnhan/:giaohangId",
  giaohangController.daily2xacnhan
);

// daily 2 giao hang -> daily 1
giaohangRouter.post("/daily2todaily1", giaohangController.daily2giaodaily1);

// dai ly 1 xac nhan
giaohangRouter.put(
  "/daily1xacnhan/:giaohangId",
  giaohangController.daily1xacnhan
);

// daily 1 giao hang -> giam sat vung
giaohangRouter.post("/daily1togsv", giaohangController.daily1giaohangchogsv);

// gsv xac nhan
giaohangRouter.put("/gsvxacnhan/:giaohangId", giaohangController.gsvxacnhan);

// giam sat vung giao hang -> bophankd
giaohangRouter.post("/gsvtobophankd", giaohangController.gsvgiaohangbpkd);

// bophankd xac nhan
giaohangRouter.put(
  "/bophankdxacnhan/:giaohangId",
  giaohangController.bpkdxacnhan
);

// get single giaohang
giaohangRouter.get("/single/:id", giaohangController.laythongtingiaohang);

// lay danh sach giao hang cua ho dan -> daily2
giaohangRouter.get(
  "/dsgiaohanghodan/:daily2Id",
  giaohangController.laydsgiaohanghodandendaily2
);

// lay danh sach giao hang DI cua dai ly 2 -> daily 1
giaohangRouter.get(
  "/dsgiaohangdaily2/:daily2Id",
  giaohangController.laydsgiaohangDIcuadaily2dendaily1
);

// lay danh sach giao hang DEN cua daily2 -> daily1
giaohangRouter.get(
  "/dsghdendaily2daily1/:daily1Id",
  giaohangController.laydsgiaohangDENcuadaily1vadaily1
);

// lay danh sach giao hang DI cua dai daily 1 -> gsv
giaohangRouter.get(
  "/dsghdidaily1gsv/:daily1Id",
  giaohangController.laydsgiaohangDIcuadaily1dengsv
);

// lay danh sach giao hang DEN cua daily1 -> gsv
giaohangRouter.get(
  "/dsghdendaily1gsv/:gsvId",
  giaohangController.laydsgiaohangDENcuadaily1vagsv
);

// lay danh sach giao hang DI cua dai gsv -> bophankd
giaohangRouter.get(
  "/dsghdigsvbpkd/:gsvId",
  giaohangController.laydsgiaohangDIcuagsvvabpkd
);

// lay danh sach giao hang DEN cua gsv -> bophankd
giaohangRouter.get(
  "/dsghdengsvbpkd/:bpkdId",
  giaohangController.laydsgiaohangDENcuagsvvabpkd
);

giaohangRouter.get("/collection", giaohangController.getCollection);
giaohangRouter.delete("/collection", giaohangController.dropCollection);

module.exports = giaohangRouter;
