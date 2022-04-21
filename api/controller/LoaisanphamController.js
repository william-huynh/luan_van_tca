const LoaiSanpham = require("../models/loaiSanphamModel");
const { getCurrentDatetime } = require("../utils");

// them loai san pham
module.exports.themloaisp = async (req, res) => {
  const { ma, ten, mota } = req.body;
  try {
    const newSpLn = new LoaiSanpham({
      ma,
      ten,
      mota,
      ngaytao: getCurrentDatetime(),
    });
    const savedLoaiSanpham = await newSpLn.save();

    res.send({ savedLoaiSanpham, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// lay danh sach loai san pham
module.exports.laydsloaisp = async (req, res) => {
  try {
    const loaiSanpham = await LoaiSanpham.find({}).sort({ createdAt: "desc" });
    if (!loaiSanpham.length) {
      return res.send({ message: "Không tìm thấy sản phẩm", success: false });
    }

    res.send({ loaiSanpham, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// xoa nhieu loai san pham
module.exports.xoanhieuloaisp = async (req, res) => {
  const { arrOfIds } = req.body;
  try {
    for (const item of arrOfIds) {
      await LoaiSanpham.findByIdAndDelete(item);
    }

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// lay thong tin 1 loai san pham
module.exports.laytt1loaisp = async (req, res) => {
  try {
    const loaiSanpham = await LoaiSanpham.findById(req.params.id);

    res.send({ loaiSanpham, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// cap nhat 1 loai san pham
module.exports.capnhatloaisp = async (req, res) => {
  const { ma, ten, mota } = req.body;
  try {
    const loaiSanpham = await LoaiSanpham.findById(req.params.id);
    loaiSanpham.ma = ma;
    loaiSanpham.ten = ten;
    loaiSanpham.mota = mota;
    const updatedLoaiSanpham = await loaiSanpham.save();

    res.send({ updatedLoaiSanpham, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.getCollection = async (req, res) => {
  const collection = await LoaiSanpham.find({});

  return res.status(200).send(collection);
};
module.exports.dropCollection = async (req, res) => {
  await LoaiSanpham.deleteMany({});

  return res.status(204).send("Ok");
};
