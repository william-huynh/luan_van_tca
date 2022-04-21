const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/UserController");

userRouter.get("/collection", userController.getCollection);
userRouter.delete("/collection", userController.dropCollection);

// user signin
userRouter.post("/login", userController.dangnhap);

// update user acc
userRouter.put("/single/:id", userController.capnhaptaikhoan);

module.exports = userRouter;
