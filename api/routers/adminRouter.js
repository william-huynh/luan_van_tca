const express = require("express");

const adminRouter = express.Router();

const Admin = require("../models/adminModel");

const upload = require("../middleware/imageUpload");

const adminController = require('../controller/AdminController');

adminRouter.get('/collection', adminController.getCollection)
adminRouter.delete('/collection', adminController.dropCollection);

adminRouter.post("/them", adminController.createAdmin);

adminRouter.get("/tongquan", adminController.getTongQuan);
adminRouter.get("/baseduserid/:userId", adminController.getByUserId);

adminRouter.put("/capnhatthongtincanhan", upload.single("avatar"), adminController.updateAdmin);

adminRouter.delete("/:id", adminController.deleteById);

module.exports = adminRouter;
