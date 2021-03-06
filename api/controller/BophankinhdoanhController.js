const Bophankd = require("../models/bophankdModel");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const Daily1 = require("../models/daily1Model");
const Daily2 = require("../models/daily2Model");
const Giamsatvung = require("../models/giamsatvungModel");
const {
  getCurrentDatetime,
  getTiendoHoanthanh,
  getTinhtrangNhandon,
} = require("../utils");
const Donhang = require("../models/donhangModel");
const Hodan = require("../models/hodanModel");

const { roles } = require("../config/constants");

module.exports.getCollection = async (req, res) => {
  const collection = await Bophankd.find({});

  return res.status(200).send(collection);
};

module.exports.dropCollection = async (req, res) => {
  await Bophankd.deleteMany({});

  return res.status(204).send("Ok");
};

module.exports.create = async (req, res) => {
  const { ten, sdt, email, xa, huyen, tinh, taikhoan } = req.body;
  try {
    const newUser = new User({
      taikhoan,
      matkhau: bcrypt.hashSync("123456", 8),
      vaitro: roles.bophankd,
    });
    const savedUser = await newUser.save();
    const bpkd = new Bophankd({
      ten,
      sdt,
      email,
      xa,
      huyen,
      tinh,
      user: savedUser._id,
    });
    const savedBophankd = await bpkd.save();
    res.send({ savedBophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.updateByUserId = async (req, res) => {
  const { ten, sdt, email, tinh, huyen, xa, matkhau, user } = req.body;
  // return res.send(req.body);
  try {
    // update password
    if (matkhau) {
      const _user = await User.findById(user);
      _user.matkhau = bcrypt.hashSync(matkhau, 8);
      await _user.save();
    }
    // update info
    const bpkd = await Bophankd.findOne({ user });
    bpkd.ten = ten;
    bpkd.sdt = sdt;
    bpkd.email = email;
    bpkd.xa = xa;
    bpkd.huyen = huyen;
    bpkd.tinh = tinh;
    bpkd.avatar = req.file ? req.file.filename : bpkd.avatar;
    const updatedBpkd = await bpkd.save();

    res.send({ updatedBpkd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.updateById = async (req, res) => {
  const { ten, sdt, email, xa, huyen, tinh, matkhau } = req.body;
  try {
    const bophankd = await Bophankd.findById(req.params.id);
    if (matkhau) {
      const user = await User.findById(bophankd.user);
      user.matkhau = bcrypt.hashSync(matkhau, 8);
      await user.save();
    }
    bophankd.ten = ten;
    bophankd.sdt = sdt;
    bophankd.email = email;
    bophankd.xa = xa;
    bophankd.huyen = huyen;
    bophankd.tinh = tinh;
    const updatedBophankd = await bophankd.save();

    res.send({ updatedBophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const bophankd = await Bophankd.find({}).populate("user");
    if (!bophankd.length) {
      return res.send({
        message: "Kh??ng t??m th???y b??? ph???n kinh doanh n??o",
        success: false,
      });
    }
    res.send({ bophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.getById = async (req, res) => {
  try {
    const bophankd = await Bophankd.findById(req.params.id).populate("user");
    if (!bophankd) {
      return res.send({
        message: "Kh??ng t??m th???y b??? ph???n kinh doanh n??o",
        success: false,
      });
    }
    res.send({ bophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.deleteById = async (req, res) => {
  try {
    // xoa user
    const bophankd = await Bophankd.findById(req.params.id);
    await User.findByIdAndDelete(bophankd.user);
    // xoa bophankd
    const removedBophankd = await Bophankd.findByIdAndDelete(req.params.id);
    res.send({ removedBophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// TODO: Refactor logic
module.exports.deleteMany = async (req, res) => {
  const { arrayOfId } = req.body;
  try {
    for (const item of arrayOfId) {
      // xoa user
      const bophankd = await Bophankd.findById(item);
      await User.findByIdAndDelete(bophankd.user);
      // xoa bophankd
      await Bophankd.findByIdAndDelete(item);
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.getByUserId = async (req, res) => {
  try {
    const bophankd = await Bophankd.findOne({
      user: req.params.userId,
    }).populate("user");
    res.send({ bophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.getBrokenEquipments = async (req, res) => {
  try {
    let { congcu } = await Bophankd.findById(req.params.bophankdId)
      .select("congcu")
      .populate("congcu");
    congcu = congcu.filter((item) => item.soluongloi);

    res.send({ congcu, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.getBrokenSupplementsList = async (req, res) => {
  try {
    let { vattu } = await Bophankd.findById(req.params.bophankdId)
      .select("vattu")
      .populate("vattu");
    vattu = vattu.filter((item) => item.soluongloi);

    res.send({ vattu, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.getProductsFromStore = async (req, res) => {
  try {
    const sanpham = await Bophankd.findById(req.params.bophankdId)
      .select("khohang")
      .populate({
        path: "khohang",
        populate: {
          path: "items",
          populate: {
            path: "sanpham",
            model: "Sanpham",
          },
        },
      });
    res.send({ sanpham, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.getDaily1List = async (req, res) => {
  try {
    const daily1 = await Bophankd.findById(req.params.bophankdId)
      .select("daily1")
      .populate({
        path: "daily1",
        populate: {
          path: "user",
          model: "User",
        },
      });

    res.send({ daily1, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.getGsvList = async (req, res) => {
  try {
    const { giamsatvung } = await Bophankd.findById(req.params.bophankdId)
      .select("giamsatvung")
      .populate({
        path: "giamsatvung",
        populate: {
          path: "user",
          model: "User",
        },
      });

    res.send({ giamsatvung, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.getSuppliedList = async (req, res) => {
  try {
    const { dsphanphat } = await Bophankd.findById(req.params.bophankdId)
      .select("dsphanphat")
      .populate({
        path: "dsphanphat",
        populate: {
          path: "phanphat",
          populate: {
            path: "from to",
            populate: {
              path: "bophankd daily1 daily2 hodan",
            },
          },
        },
      });

    res.send({ dsphanphat, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// TODO: Refactor logic
module.exports.deleteProduct = async (req, res) => {
  const { bophankdId, sanphamId } = req.body;
  try {
    const bophankd = await Bophankd.findById(bophankdId);
    bophankd.sanpham = bophankd.sanpham.filter((item) => item != sanphamId);
    const updatedBophankd = await bophankd.save();
    res.send({ updatedBophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.deleteProducts = async (req, res) => {
  const { bophankdId, arrayOfId } = req.body;
  try {
    const bophankd = await Bophankd.findById(bophankdId);
    for (const item of arrayOfId) {
      bophankd.sanpham = bophankd.sanpham.filter(
        (_item) => _item.toString() != item
      );
      await bophankd.save();
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.deleteMedicineEquipments = async (req, res) => {
  const { bophankdId, arrayOfId } = req.body;
  try {
    const bophankd = await Bophankd.findById(bophankdId);
    for (const item of arrayOfId) {
      bophankd.congcu = bophankd.congcu.filter((_item) => _item != item);
      await bophankd.save();
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.deleteMaterials = async (req, res) => {
  const { bophankdId, arrayOfId } = req.body;
  try {
    const bophankd = await Bophankd.findById(bophankdId);
    for (const item of arrayOfId) {
      bophankd.nguyenlieu = bophankd.nguyenlieu.filter(
        (_item) => _item.toString() !== item
      );
      await bophankd.save();
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.deleteMaterial = async (req, res) => {
  const { bophankdId, nguyenlieuId } = req.body;
  try {
    const bophankd = await Bophankd.findById(bophankdId);
    bophankd.nguyenlieu = bophankd.nguyenlieu.filter(
      (item) => item.toString() !== nguyenlieuId
    );
    const updatedBophankd = await bophankd.save();

    res.send({ updatedBophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.deleteSupplies = async (req, res) => {
  const { bophankdId, arrayOfId } = req.body;
  try {
    const bophankd = await Bophankd.findById(bophankdId);
    for (const item of arrayOfId) {
      bophankd.vattu = bophankd.vattu.filter(
        (_item) => _item.toString() !== item
      );
      await bophankd.save();
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.deleteDaily1s = async (req, res) => {
  const { bophankdId, arrayOfId } = req.body;
  try {
    const bophankd = await Bophankd.findById(bophankdId);
    for (const item of arrayOfId) {
      // update filed daily1[], collection: Bophankd
      bophankd.daily1 = bophankd.daily1.filter((_item) => _item != item);
      await bophankd.save();
      // update field bophankd, collection: Daily1
      const dl1 = await Daily1.findById(item);
      dl1.bophankd = null;
      await dl1.save();
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.deleteGsvs = async (req, res) => {
  const { bophankdId, arrayOfId } = req.body;
  try {
    const bophankd = await Bophankd.findById(bophankdId);
    for (const item of arrayOfId) {
      // collection: Bophankd
      bophankd.giamsatvung = bophankd.giamsatvung.filter(
        (_item) => _item != item
      );
      await bophankd.save();
      // collection: Giamsatvung
      const gsv = await Giamsatvung.findById(item);
      gsv.bophankd = null;
      await gsv.save();
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.deleteMedicineEquipment = async (req, res) => {
  const { bophankdId, congcuId } = req.body;
  try {
    const bophankd = await Bophankd.findById(bophankdId);
    bophankd.congcu = bophankd.congcu.filter((item) => item != congcuId);
    const updatedBophankd = await bophankd.save();
    res.send({ updatedBophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.deleteSupply = async (req, res) => {
  const { bophankdId, vattuId } = req.body;
  try {
    const bophankd = await Bophankd.findById(bophankdId);
    bophankd.vattu = bophankd.vattu.filter(
      (item) => item.toString() !== vattuId
    );
    const updatedBophankd = await bophankd.save();

    res.send({ updatedBophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.addDaily1 = async (req, res) => {
  const { bophankdId, daily1Arr } = req.body;
  try {
    // update Bophankd collection, field: daily1
    const bophankd = await Bophankd.findById(bophankdId);
    bophankd.daily1 = [...daily1Arr, ...bophankd.daily1];
    // update Daily1 collection, field: bophankd
    for (const item of daily1Arr) {
      const daily1 = await Daily1.findById(item);
      daily1.bophankd = bophankdId;
      await daily1.save();
    }
    const updatedBophankd = await bophankd.save();
    res.send({ updatedBophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.addGsv = async (req, res) => {
  const { bophankdId, giamsatvungArr } = req.body;
  try {
    // Bophankd collection
    const bophankd = await Bophankd.findById(bophankdId);
    bophankd.giamsatvung = [...giamsatvungArr, ...bophankd.giamsatvung];
    // Giam sat vung collection
    for (const item of giamsatvungArr) {
      const gsv = await Giamsatvung.findById(item);
      gsv.bophankd = bophankdId;
      await gsv.save();
    }
    const updatedBophankd = await bophankd.save();
    res.send({ updatedBophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.addProducts = async (req, res) => {
  const { bophankdId, sanphamArr } = req.body;
  try {
    // Bophankd collection
    const bophankd = await Bophankd.findById(bophankdId);
    bophankd.sanpham = [...sanphamArr, ...bophankd.sanpham];

    const updatedBophankd = await bophankd.save();
    res.send({ updatedBophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.getDaily2ListById = async (req, res) => {
  try {
    const { daily2 } = await Bophankd.findById(req.params.id)
      .select("daily2")
      .populate("daily2");
    if (!daily2.length) {
      return res.send({
        message: "Kh??ng t??m th???y ?????i l?? 2 n??o",
        success: false,
      });
    }

    res.send({ daily2, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.verifyDaily1 = async (req, res) => {
  try {
    //t???o t??i kho???n trong User collection
    const daily1 = await Daily1.findById(req.params.daily1Id);
    const newUser = new User({
      taikhoan: daily1.taikhoan,
      matkhau: bcrypt.hashSync("123456", 8),
      vaitro: "daily1",
    });
    const savedUser = await newUser.save();
    // C???p nh???t ?????i l?? 1 collection
    daily1.user = savedUser ? savedUser._id : null;
    daily1.active = true;
    daily1.bophankd = req.params.bophankdId;
    const updatedDaily1 = await daily1.save();

    res.send({ updatedDaily1, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.verifyDaily2 = async (req, res) => {
  try {
    const daily2 = await Daily2.findById(req.params.daily2Id);
    // N???u gi??m s??t v??ng ???? duy???t
    if (daily2.giamsatvung) {
      //t???o t??i kho???n trong User collection
      const newUser = new User({
        taikhoan: daily2.taikhoan,
        matkhau: bcrypt.hashSync("123456", 8),
        vaitro: "daily2",
      });
      const savedUser = await newUser.save();
      // C???p nh???t ?????i l?? 2 collection
      daily2.user = savedUser ? savedUser._id : null;
      daily2.active = true;
      daily2.bophankd = req.params.bophankdId;
      await daily2.save();
    } else {
      daily2.bophankd = req.params.bophankdId;
      await daily2.save();
    }

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.getProductsList = async (req, res) => {
  try {
    const { donhang } = await Bophankd.findById(req.params.bophankdId)
      .select("donhang")
      .populate("donhang");
    res.send({ donhang, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.getSubProductsList = async (req, res) => {
  try {
    let { subdonhang } = await Bophankd.findById(req.params.bophankdId)
      .select("subdonhang")
      .populate({
        path: "subdonhang",
        populate: {
          path: "from to dssanpham dscongcu dsvattu dsnguyenlieu",
          populate: {
            path: "bophankd giamsatvung sanpham congcu vattu nguyenlieu",
          },
        },
      })
      .populate({
        path: "subdonhang",
        populate: {
          path: "dssanpham",
          populate: {
            path: "sanpham",
            populate: {
              path: "loaisanpham",
            },
          },
        },
      })
      .populate({
        path: "subdonhang",
        populate: {
          path: "to",
          populate: {
            path: "giamsatvung",
            populate: {
              path: "bophankd loaisanpham",
            },
          },
        },
      });
    subdonhang = subdonhang.filter((item) => item.ma === req.params.ma);

    res.send({ subdonhang, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.getProductsListByBpkdId = async (req, res) => {
  try {
    const { dssanpham } = await Bophankd.findById(req.params.bophankdId)
      .select("dssanpham")
      .populate({
        path: "dssanpham",
        populate: {
          path: "donhang sanpham",
        },
      })
      .populate({
        path: "dssanpham",
        populate: {
          path: "sanpham",
          populate: {
            path: "loaisanpham",
          },
        },
      });

    res.send({ dssanpham, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.getSuppliesListByBpkdId = async (req, res) => {
  try {
    let { dsvattu } = await Bophankd.findById(req.params.bophankdId)
      .select("dsvattu")
      .populate({
        path: "dsvattu",
        populate: "donhang vattu",
      });

    res.send({ dsvattu, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.getMaterialsList = async (req, res) => {
  try {
    const { dsnguyenlieu } = await Bophankd.findById(req.params.bophankdId)
      .select("dsnguyenlieu")
      .populate({
        path: "dsnguyenlieu",
        populate: {
          path: "donhang nguyenlieu",
        },
      });
    res.send({ dsnguyenlieu, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.getOverview = async (req, res) => {
  try {
    const bophankd = await Bophankd.findById(req.params.bophankdId).populate(
      "dssanpham dsvattu dsnguyenlieu dscongcu daily1 daily2 donhang giamsatvung"
    );
    const slDonhang = await Donhang.find({ donhanggoc: true, trangthai: true });
    res.send({
      dssanpham: bophankd.dssanpham.length,
      dsvattu: bophankd.dsvattu.length,
      dsnguyenlieu: bophankd.dsnguyenlieu.length,
      dscongcu: bophankd.dscongcu.length,
      daily1: bophankd.daily1.length,
      daily2: bophankd.daily2.length,
      donhang: slDonhang.length,
      giamsatvung: bophankd.giamsatvung.length,
      success: true,
    });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.getEquipmentsByBpkdId = async (req, res) => {
  try {
    try {
      let { dscongcu } = await Bophankd.findById(req.params.bophankdId)
        .select("dscongcu")
        .populate({
          path: "dscongcu",
          populate: {
            path: "donhang congcu",
          },
        });

      res.send({ dscongcu, success: true });
    } catch (error) {
      res.send({ message: error.message, success: false });
    }
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.countUnverfiedDaily1AndDaily2 = async (req, res) => {
  try {
    // Daily1
    let { daily1 } = await Bophankd.findById(req.params.bophankdId)
      .select("daily1")
      .populate("daily1");
    daily1 = daily1.filter((dl1) => !dl1.user);
    // Daily2
    let { daily2 } = await Bophankd.findById(req.params.bophankdId)
      .select("daily2")
      .populate("daily2");
    daily2 = daily2.filter((dl2) => !dl2.user && !dl2.bophankd);

    res.send({
      daily1Badge: daily1.length,
      daily2Badge: daily2.length,
      success: true,
    });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.addBrokenEquipments = async (req, res) => {
  const { dsccLoi } = req.body;
  try {
    for (const cc of dsccLoi) {
      const bophankd = await Bophankd.findById(req.params.bophankdId);
      bophankd.dscongcu = bophankd.dscongcu.map((item) =>
        item.congcu.toString() === cc.congcu._id &&
        item.donhang.toString() === cc.donhang._id &&
        item.loi.soluongloi
          ? {
              donhang: item.donhang,
              congcu: item.congcu,
              loi: {
                soluongloi: item.loi.soluongloi + parseInt(cc.soluongloi),
                ngaybaoloi: getCurrentDatetime(),
              },
              soluong: item.soluong,
              ngaytao: item.ngaytao,
            }
          : item.congcu.toString() === cc.congcu._id &&
            item.donhang.toString() === cc.donhang._id
          ? {
              donhang: item.donhang,
              congcu: item.congcu,
              loi: {
                soluongloi: cc.soluongloi,
                ngaybaoloi: getCurrentDatetime(),
              },
              soluong: item.soluong,
              ngaytao: item.ngaytao,
            }
          : item
      );
      await bophankd.save();
    }

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.getBrokenEquipments = async (req, res) => {
  try {
    let { dscongcu: dscongcuhuloi } = await Bophankd.findById(
      req.params.bophankdId
    )
      .select("dscongcu")
      .populate({
        path: "dscongcu",
        populate: {
          path: "donhang congcu",
        },
      });

    dscongcuhuloi = dscongcuhuloi.filter((cc) => cc.loi.soluongloi);

    res.send({ dscongcuhuloi, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.addBrokenSuppliesList = async (req, res) => {
  const { dsvtLoi } = req.body;
  try {
    for (const vt of dsvtLoi) {
      const bophankd = await Bophankd.findById(req.params.bophankdId);
      bophankd.dsvattu = bophankd.dsvattu.map((item) =>
        item.vattu.toString() === vt.vattu._id &&
        item.donhang.toString() === vt.donhang._id &&
        item.loi.soluongloi
          ? {
              donhang: item.donhang,
              vattu: item.vattu,
              loi: {
                soluongloi: item.loi.soluongloi + parseInt(vt.soluongloi),
                ngaybaoloi: getCurrentDatetime(),
              },
              soluong: item.soluong,
              ngaytao: item.ngaytao,
            }
          : item.vattu.toString() === vt.vattu._id &&
            item.donhang.toString() === vt.donhang._id
          ? {
              donhang: item.donhang,
              vattu: item.vattu,
              loi: {
                soluongloi: vt.soluongloi,
                ngaybaoloi: getCurrentDatetime(),
              },
              soluong: item.soluong,
              ngaytao: item.ngaytao,
            }
          : item
      );
      await bophankd.save();
    }

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.getBrokenSuppliesList = async (req, res) => {
  try {
    let { dsvattu: dsvattuhuloi } = await Bophankd.findById(
      req.params.bophankdId
    )
      .select("dsvattu")
      .populate({
        path: "dsvattu",
        populate: {
          path: "donhang vattu",
        },
      });

    dsvattuhuloi = dsvattuhuloi.filter((vt) => vt.loi.soluongloi);

    res.send({ dsvattuhuloi, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.addBrokenMaterials = async (req, res) => {
  const { dsnglLoi } = req.body;
  try {
    for (const ngl of dsnglLoi) {
      const bophankd = await Bophankd.findById(req.params.bophankdId);
      bophankd.dsnguyenlieu = bophankd.dsnguyenlieu.map((item) =>
        item.nguyenlieu.toString() === ngl.nguyenlieu._id &&
        item.donhang.toString() === ngl.donhang._id &&
        item.loi.khoiluongloi
          ? {
              donhang: item.donhang,
              nguyenlieu: item.nguyenlieu,
              loi: {
                khoiluongloi:
                  item.loi.khoiluongloi + parseInt(ngl.khoiluongloi),
                ngaybaoloi: getCurrentDatetime(),
              },
              khoiluong: item.khoiluong,
              ngaytao: item.ngaytao,
            }
          : item.nguyenlieu.toString() === ngl.nguyenlieu._id &&
            item.donhang.toString() === ngl.donhang._id
          ? {
              donhang: item.donhang,
              nguyenlieu: item.nguyenlieu,
              loi: {
                khoiluongloi: ngl.khoiluongloi,
                ngaybaoloi: getCurrentDatetime(),
              },
              khoiluong: item.khoiluong,
              ngaytao: item.ngaytao,
            }
          : item
      );
      await bophankd.save();
    }

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.getBrokenMaterials = async (req, res) => {
  try {
    let { dsnguyenlieu: dsnguyenlieuhuloi } = await Bophankd.findById(
      req.params.bophankdId
    )
      .select("dsnguyenlieu")
      .populate({
        path: "dsnguyenlieu",
        populate: {
          path: "donhang nguyenlieu",
        },
      });

    dsnguyenlieuhuloi = dsnguyenlieuhuloi.filter((ngl) => ngl.loi.khoiluongloi);

    res.send({ dsnguyenlieuhuloi, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.getSubOrdersList = async (req, res) => {
  try {
    let { subdonhang } = await Bophankd.findById(req.params.bophankdId)
      .select("subdonhang")
      .populate({
        path: "subdonhang",
        populate: {
          path: "to",
          populate: {
            path: "giamsatvung",
          },
        },
      });
    subdonhang = subdonhang.filter(
      (dh) => dh.ma === req.params.madh.toString()
    );

    res.send({ subdonhang, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.getHodanList = async (req, res) => {
  try {
    // lay danh sach gsv do gsv quan ly
    const dsdaily2 = await Daily2.find({ bophankd: req.params.bophankdId })
      .select("hodan")
      .populate({
        path: "hodan",
        populate: {
          path: "langnghe loaisanpham",
        },
      });
    let dshodan = [];
    dsdaily2.forEach((dl2) => {
      dshodan = [...dshodan, ...dl2.hodan];
    });

    res.send({ dshodan, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.getOrderProgess = async (req, res) => {
  try {
    const donhangGoc = await Donhang.findOne({
      ma: req.params.maDH,
      dochanggoc: true,
    });
    // tong so luong sp cua dh goc
    const tongSLSPDonhangGoc = donhangGoc.tongsanpham;

    const bpkd = await Bophankd.findById(req.params.bpkdId)
      .populate({
        path: "donhang",
        populate: {
          path: "from dssanpham dscongcu dsvattu dsnguyenlieu",
          populate: {
            path: "bophankd sanpham congcu vattu nguyenlieu",
          },
        },
      })
      .populate("subdonhang");
    const bpkdDonhangTonghop = bpkd.donhang.find(
      (dh) => dh.ma === req.params.maDH
    );
    const dssanpham = [...bpkdDonhangTonghop.dssanpham];

    //----------------------
    const bpkdSubdonhang = bpkd.subdonhang.filter(
      (dh) => dh.ma === req.params.maDH
    );

    let dsGSV = [];
    let dsDonhangTonghopGSV = [];
    for (const item of bpkdSubdonhang) {
      let gsv = await Giamsatvung.findById(item.to.giamsatvung)
        .populate({
          path: "donhang",
          populate: {
            path: "from to dssanpham dscongcu dsvattu dsnguyenlieu",
            populate: {
              path: "bophankd giamsatvung sanpham congcu vattu nguyenlieu",
            },
          },
        })
        .populate({
          path: "subdonhang",
          populate: {
            path: "from to dssanpham dscongcu dsvattu dsnguyenlieu",
            populate: {
              path: "giamsatvung daily1 sanpham congcu vattu nguyenlieu",
            },
          },
        });
      let gsvDonhang = gsv.donhang.find((dh) => dh.ma === req.params.maDH);
      dsDonhangTonghopGSV = [gsvDonhang, ...dsDonhangTonghopGSV];
      dsGSV = [gsv, ...dsGSV];
    }

    //-------------------------------
    let gsvSubdonhang = [];
    dsGSV.forEach((gsv) => {
      gsvSubdonhang = [...gsv.subdonhang, ...gsvSubdonhang];
    });
    gsvSubdonhang = gsvSubdonhang.filter((dh) => dh.ma === req.params.maDH);

    let dsDaily1 = [];
    let dsDonhangTonghopDaily1 = [];
    for (const item of gsvSubdonhang) {
      let daily1 = await Daily1.findById(item.to.daily1)
        .populate({
          path: "donhang",
          populate: {
            path: "from to dssanpham dscongcu dsvattu dsnguyenlieu",
            populate: {
              path: "giamsatvung daily1 sanpham congcu vattu nguyenlieu",
            },
          },
        })
        .populate({
          path: "subdonhang",
          populate: {
            path: "from to dssanpham dscongcu dsvattu dsnguyenlieu",
            populate: {
              path: "daily1 daily2 sanpham congcu vattu nguyenlieu",
            },
          },
        });
      let daily1Donhang = daily1.donhang.find(
        (dh) => dh.ma === req.params.maDH
      );
      dsDonhangTonghopDaily1 = [daily1Donhang, ...dsDonhangTonghopDaily1];
      dsDaily1 = [daily1, ...dsDaily1];
    }

    //---------------------------------
    let daily1Subdonhang = [];
    dsDaily1.forEach((dl1) => {
      daily1Subdonhang = [...dl1.subdonhang, ...daily1Subdonhang];
    });
    daily1Subdonhang = daily1Subdonhang.filter(
      (dh) => dh.ma === req.params.maDH
    );

    let dsDaily2 = [];
    let dsDonhangTonghopDaily2 = [];
    for (const item of daily1Subdonhang) {
      let daily2 = await Daily2.findById(item.to.daily2)
        .populate({
          path: "donhang",
          populate: {
            path: "from to dssanpham dscongcu dsvattu dsnguyenlieu",
            populate: {
              path: "daily1 daily2 sanpham congcu vattu nguyenlieu",
            },
          },
        })
        .populate({
          path: "subdonhang",
          populate: {
            path: "from to dssanpham dscongcu dsvattu dsnguyenlieu",
            populate: {
              path: "daily2 hodan sanpham congcu vattu nguyenlieu",
            },
          },
        });
      let daily2Donhang = daily2.donhang.find(
        (dh) => dh.ma === req.params.maDH
      );
      dsDonhangTonghopDaily2 = [daily2Donhang, ...dsDonhangTonghopDaily2];
      dsDaily2 = [daily2, ...dsDaily2];
    }

    //---------------------------------
    let daily2Subdonhang = [];
    dsDaily2.forEach((dl2) => {
      daily2Subdonhang = [...dl2.subdonhang, ...daily2Subdonhang];
    });
    daily2Subdonhang = daily2Subdonhang.filter(
      (dh) => dh.ma === req.params.maDH
    );

    let dsDonhangTonghopHodan = [];
    let dsHodan = [];
    for (const item of daily2Subdonhang) {
      let hodan = await Hodan.findById(item.to.hodan).populate({
        path: "donhang",
        populate: {
          path: "from to dssanpham dscongcu dsvattu dsnguyenlieu",
          populate: {
            path: "daily2 hodan sanpham congcu vattu nguyenlieu",
          },
        },
      });
      let hodanDonhang = hodan.donhang.find((dh) => dh.ma === req.params.maDH);
      dsDonhangTonghopHodan = [hodanDonhang, ...dsDonhangTonghopHodan];
      dsHodan = [hodan, ...dsHodan];
    }

    //==================================================
    let gsvDSDonhang = [];
    dsGSV.forEach((gsv) => {
      gsvDSDonhang = [...gsv.donhang, ...gsvDSDonhang];
    });
    gsvDSDonhang = gsvDSDonhang.filter((dh) => dh.ma === req.params.maDH);
    //-------------------
    let daily1DSDonhang = [];
    dsDaily1.forEach((daily1) => {
      daily1DSDonhang = [...daily1.donhang, ...daily1DSDonhang];
    });
    daily1DSDonhang = daily1DSDonhang.filter((dh) => dh.ma === req.params.maDH);
    //-------------------
    let daily2DSDonhang = [];
    dsDaily2.forEach((daily2) => {
      daily2DSDonhang = [...daily2.donhang, ...daily2DSDonhang];
    });
    daily2DSDonhang = daily2DSDonhang.filter((dh) => dh.ma === req.params.maDH);
    //-------------------
    let hodanDSDonhang = [];
    dsHodan.forEach((hd) => {
      hodanDSDonhang = [...hd.donhang, ...hodanDSDonhang];
    });
    hodanDSDonhang = hodanDSDonhang.filter((dh) => dh.ma === req.params.maDH);
    //====================================================================================================================
    // bpkd tien do don hang
    bophankdTDHT = Math.round(
      (dssanpham.reduce((acc, sp) => acc + (sp.danhan ? sp.danhan : 0), 0) *
        100) /
        tongSLSPDonhangGoc
    );
    // gsv tinh trang nhan don
    const gsvTTND = getTinhtrangNhandon(gsvDSDonhang, tongSLSPDonhangGoc);
    // gsv tien do hoan thanh
    const gsvTDHT = getTiendoHoanthanh(gsvDSDonhang, tongSLSPDonhangGoc);
    // daily 1 tinh trang nhan don
    const daily1TTND = getTinhtrangNhandon(daily1DSDonhang, tongSLSPDonhangGoc);
    // dai ly 1 tien do hoan thanh
    const daily1TDHT = getTiendoHoanthanh(daily1DSDonhang, tongSLSPDonhangGoc);
    // daily 2 tinh trang nhan don
    const daily2TTND = getTinhtrangNhandon(daily2DSDonhang, tongSLSPDonhangGoc);
    // dai ly 2 tien do hoan thanh
    const daily2TDHT = getTiendoHoanthanh(daily2DSDonhang, tongSLSPDonhangGoc);
    // ho dan tinh trang nhan don
    const hodanTTND = getTinhtrangNhandon(hodanDSDonhang, tongSLSPDonhangGoc);
    // hodan tien do hoan thanh
    const hodanTDHT = getTiendoHoanthanh(
      hodanDSDonhang,
      tongSLSPDonhangGoc,
      "hodan"
    );

    res.send({
      bophankdTDHT,
      gsvTTND,
      gsvTDHT,
      daily1TTND,
      daily1TDHT,
      daily2TTND,
      daily2TDHT,
      hodanTTND,
      hodanTDHT,
      bpkdDSDonhang: [bpkdDonhangTonghop],
      gsvDSDonhang,
      daily1DSDonhang,
      daily2DSDonhang,
      hodanDSDonhang,
      success: true,
    });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};
