const upload = require("../middleware/imageUpload");
const Nguyenlieu = require("../models/nguyenlieuModel");
const { getCurrentDatetime } = require("../utils");

// them nguyen lieu
module.exports.themnguyenlieu = async (req, res) => {
  const { ten, mota, thuoctinh, congdung } = req.body;
  try {
    const newNglieu = new Nguyenlieu({
      ten,
      mota,
      thuoctinh: JSON.parse(thuoctinh),
      hinhanh: req.file ? req.file.filename : "",
      congdung,
      ngaytao: getCurrentDatetime(),
    });
    const savedNglieu = await newNglieu.save();

    res.send({ savedNglieu, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// sua nguyen lieu
module.exports.suanguyenlieu = async (req, res) => {
  const { ten, mota, thuoctinh, congdung } = req.body;
  try {
    const nguyenlieu = await Nguyenlieu.findById(req.params.id);
    nguyenlieu.ten = ten;
    nguyenlieu.mota = mota;
    nguyenlieu.thuoctinh = JSON.parse(thuoctinh);
    nguyenlieu.hinhanh = req.file ? req.file.filename : nguyenlieu.hinhanh;
    nguyenlieu.congdung = congdung;

    const updatedNguyenlieu = await nguyenlieu.save();
    res.send({ updatedNguyenlieu, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// lay danh sach nguyen lieu
module.exports.laydsnguyenlieu = async (req, res) => {
  const nguyenlieu = await Nguyenlieu.find({}).sort({ createdAt: "desc" });
  if (!nguyenlieu.length) {
    return res.send({ message: "Không tìm thấy nguyên liệu", success: false });
  }
  res.send({ nguyenlieu, success: true });
};

// lay thong tin 1 nguyen lieu
module.exports.laytt1nguyenlieu = async (req, res) => {
  try {
    const nguyenlieu = await Nguyenlieu.findById(req.params.id);
    if (nguyenlieu) {
      res.send({ nguyenlieu, success: true });
    } else {
      res.send({ message: "Không tìm thấy nguyên liệu", success: false });
    }
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// Xoa 1 nguyenlieu
module.exports.xoa1nguyenlieu = async (req, res) => {
  try {
    const removedNglieu = await Nguyenlieu.findByIdAndDelete(req.params.id);

    res.send({ removedNglieu, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// Xoa nhieu nguyenlieu
module.exports.xoanhieunguyenlieu = async (req, res) => {
  const { arrOfIds } = req.body;
  try {
    for (const item of arrOfIds) {
      await Nguyenlieu.findByIdAndDelete(item);
    }

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// them nglieu hu loi
module.exports.themnguyenlieuhuloi = async (req, res) => {
  const { dsnglhuloi } = req.body;
  try {
    for (const item of dsnglhuloi) {
      const ngl = await Nguyenlieu.findById(item.nguyenlieu);
      if (ngl.loi) {
        ngl.loi = {
          soluongloi: ngl.soluongloi + item.soluongloi,
          ngaybaoloi: getCurrentDatetime(),
        };
        await ngl.save();
      } else {
        ngl.loi = {
          soluongloi: item.soluongloi,
          ngaybaoloi: getCurrentDatetime(),
        };
        await ngl.save();
      }
    }

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.getCollection = async (req, res) => {
  const collection = await Nguyenlieu.find({});

  return res.status(200).send(collection);
};
module.exports.dropColecction = async (req, res) => {
  await Nguyenlieu.deleteMany({});

  return res.status(204).send("Ok");
};
