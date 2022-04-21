const express = require("express");
const qrcodeRouter = express.Router();
const qrController = require("../controller/QrcodeController");
qrcodeRouter.post("/scan", qrController.taoqrchosp);
qrcodeRouter.post("/scanUser", qrController.taoqrchouser);

qrcodeRouter.get("/collection", qrController.getCollection);
qrcodeRouter.delete("/collection", qrController.dropCollection);

module.exports = qrcodeRouter;
