const Sanpham = require("../models/sanphamModel");
const upload = require("../middleware/imageUpload");
const { getCurrentDatetime } = require("../utils");
const Bophankd = require("../models/bophankdModel");

// them moi sp
module.exports.themsp = async (req, res) => {
  const {
    ma,
    ten,
    mota,
    loaisanpham,
    thuoctinh,
    dscongcu,
    dsvattu,
    dsnguyenlieu,
    gia,
    newAnh,
  } = req.body;
  const sanphammoi = new Sanpham({
    ma,
    ten,
    mota,
    loaisanpham,
    hinhanh: newAnh ? newAnh : req.file ? req.file.filename : "",
    thuoctinh: JSON.parse(thuoctinh),
    dscongcu: JSON.parse(dscongcu),
    dsvattu: JSON.parse(dsvattu),
    dsnguyenlieu: JSON.parse(dsnguyenlieu),
    gia,
    ngaytao: getCurrentDatetime(),
  });

  try {
    let savedSanpham = await sanphammoi.save();

    res.send({ savedSanpham, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// lay danh sach san pham
module.exports.laydssanpham = async (req, res) => {
  try {
    const sanpham = await Sanpham.find({})
      .populate(
        "loaisanpham dscongcu.congcu dsvattu.vattu dsnguyenlieu.nguyenlieu"
      )
      .sort({ createdAt: "desc" })
      .exec();

    console.log(sanpham);

    if (!sanpham) {
      return res.send({ message: "Không tìm thấy sản phẩm", success: false });
    }

    res.send({ sanpham, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// lay danh sach san pham Chua nam trong 1 bophankd cu the
module.exports.laydsspchuanamtrongbpkd = async (req, res) => {
  try {
    const { sanpham: bophankdSanpham } = await Bophankd.findById(
      req.params.bophankdId
    ).select("sanpham");
    let sanpham = await Sanpham.find({});
    sanpham = sanpham.filter(
      (item) => !bophankdSanpham.includes(item._id.toString())
    );

    res.send({ sanpham, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// lay thong tin 1 san pham
module.exports.laytt1sp = async (req, res) => {
  try {
    const sanpham = await Sanpham.findById(req.params.id).populate(
      "loaisanpham dscongcu.congcu dsvattu.vattu dsnguyenlieu.nguyenlieu"
    );
    if (!sanpham) {
      return res.send({ message: "Không tìm thấy sản phẩm", success: false });
    }
    res.send({ sanpham, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// sua thong tin 1 sp
module.exports.suatt1sp = async (req, res) => {
  const { ten, mota, thuoctinh } = req.body;
  try {
    const sanpham = await Sanpham.findById(req.params.id);
    sanpham.ten = ten;
    sanpham.mota = mota;
    sanpham.hinhanh = req.file ? req.file.filename : sanpham.hinhanh;
    sanpham.thuoctinh = JSON.parse(thuoctinh);
    const updatedSanpham = await sanpham.save();

    res.send({ updatedSanpham, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// Xoa nhieu san pham
module.exports.xoanhieusp = async (req, res) => {
  const { arrOfIds } = req.body;
  try {
    for (const item of arrOfIds) {
      await Sanpham.findByIdAndDelete(item);
    }

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.getCollection = async (req, res) => {
  const collection = await Sanpham.find({});

  return res.status(200).send(collection);
};
module.exports.dropCollection = async (req, res) => {
  await Sanpham.deleteMany({});

  return res.status(204).send("Ok");
};
