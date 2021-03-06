const Sanpham = require("../models/sanphamModel");
const qr = require("qrcode");

module.exports.taoqrchosp = async (req, res) => {
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

    if (listSanpham.length > 0) {
      for (let i = 0; i < listSanpham.length; i++) {
        if (listSanpham[i]._id.toString() === "")
          res.status(400).json({ success: false, message: "id empty" });
        let url = `http://localhost:3000/${role}/sanpham/chitiet/${listSanpham[
          i
        ]._id.toString()}`;
        try {
          qr.toDataURL(url, (err, qrcode) => {
            if (err)
              res
                .status(400)
                .json({ success: false, message: "scan qrcode error" });
            let data = {
              id: listSanpham[i]._id.toString(),
              qrcode,
            };
            listId.push(data);
            end();
          });
        } catch (error) {
          res.status(400).json({ success: false, message: error });
        }
        const end = () => {
          if (i === listSanpham.length - 1) {
            return res
              .status(200)
              .json({ success: true, message: "success", listId });
          }
        };
      }
    }
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};
module.exports.taoqrchouser = async (req, res) => {
  const { role, urlRole, id, isActive } = req.body;
  if (role === "admin" && isActive) {
    handleGetQr();
  } else if (role !== "admin" && isActive) {
    handleGetQr();
  } else {
    res.status(400).json({ success: false, message: "user not active" });
    return;
  }
  function handleGetQr() {
    let URL = `http://localhost:3000/public/details/user/${id}`;

    if (!id || !role)
      res.status(400).json({ success: false, message: "id or role empty" });

    try {
      qr.toDataURL(URL, (error, qrcode) => {
        if (error)
          res
            .status(400)
            .json({ success: false, message: "scan qrcode error" });
        return res
          .status(200)
          .json({ success: true, message: "success", qrcode });
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error });
    }
  }
};

module.exports.getCollection = async (req, res) => {
  const collection = await qr.find({});

  return res.status(200).send(collection);
};
module.exports.dropCollection = async (req, res) => {
  await qr.deleteMany({});

  return res.status(204).send("Ok");
};
