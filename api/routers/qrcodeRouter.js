const express = require("express");
const qrcodeRouter = express.Router();
const Sanpham = require("../models/sanphamModel");
const qr = require("qrcode");

qrcodeRouter.post("/scan", async (req, res) => {
  const role = req.body.role;
  let listId = [];
  try {
    const sanpham = await Sanpham.find(
      {},
      {
        ma: 0,
        ten: 0,
        mota: 0,
        hinhanh: 0,
        loaisanpham: 0,
        thuoctinh: 0,
        dscongcu: 0,
        dsvattu: 0,
        dsnguyenlieu: 0,
        gia: 0,
        ngaytao: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      }
    );

    if (!sanpham) {
      res.send({ message: "Không tìm thấy sản phẩm", success: false });
      return;
    }
    let listSanpham = Object.values(sanpham);
    try {
      listId = listSanpham
        .map((item) => {
          let currentProduct = { id: "", qrcode: null };
          let productId = item._id.toString();
          let url = `http://localhost:3000/${role}/sanpham/chitiet/${productId}`;
          qr.toDataURL(url, (err, qrcode) => {
            currentProduct.id = productId;
            currentProduct.qrcode = qrcode;
          });
          return currentProduct;
        })
        .join("");
      if (listId) {
        return res.status(201).json({ success: true, listId });
      }
    } catch (error) {
      return res.status(500).json({ success: false });
    }
    // if (listSanpham.ltoStringength > 0) {
    //   for await  (item of listSanpham) {
    //     if (item._id.() === "")
    //       res.status(400).json({ success: false, message: "id empty" });
    //     let url = `http://localhost:3000/${role}/sanpham/chitiet/${item._id.toString()}`;
    //     try {
    //       await qr.toDataURL(url, (err, qrcode) => {
    //         if (err)
    //           res
    //             .status(400)
    //             .json({ success: false, message: "scan qrcode error" });
    //         let data = {
    //           id: listSanpham[i]._id.toString(),
    //           qrcode,
    //         };
    //         listId.push(data);
    //         end();
    //       });
    //     } catch (error) {
    //       res.status(400).json({ success: false, message: error });
    //     }
    //     const end = () => {
    //       if (i === listSanpham.length - 1) {
    //         return res
    //           .status(200)
    //           .json({ success: true, message: "success", listId });
    //       }
    //     };
    //   }
    // }
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

module.exports = qrcodeRouter;
