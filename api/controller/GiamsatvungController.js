const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Giamsatvung = require("../models/giamsatvungModel");
const Daily2 = require("../models/daily2Model");
const Langnghe = require("../models/langngheModel");
const upload = require("../middleware/imageUpload");
const {
  getCurrentDatetime,
  getTinhtrangNhandon,
  getTiendoHoanthanh,
} = require("../utils");
const Bophankd = require("../models/bophankdModel");
const Daily1 = require("../models/daily1Model");
const Hodan = require("../models/hodanModel");

const { roles } = require("../config/constants");

// them gsv
module.exports.themgsv = async (req, res) => {
  const { ten, sdt, email, cmnd, xa, huyen, tinh, taikhoan } = req.body;
  try {
    const newUser = new User({
      taikhoan,
      matkhau: bcrypt.hashSync("123456", 8),
      vaitro: roles.giamsatvung,
    });
    const savedUser = await newUser.save();
    const newGsv = new Giamsatvung({
      ten,
      sdt,
      email,
      cmnd,
      xa,
      huyen,
      tinh,
      user: savedUser._id,
    });
    const savedGsv = await newGsv.save();
    res.send({ savedGsv, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// cap nhat thong tin ca nhan
module.exports.capnhatthongtincanhan = async (req, res) => {
  const { ten, sdt, email, tinh, huyen, xa, matkhau, user } = req.body;
  try {
    // update password
    if (matkhau) {
      const _user = await User.findById(user);
      _user.matkhau = bcrypt.hashSync(matkhau, 8);
      await _user.save();
    }
    // update info
    const gsv = await Giamsatvung.findOne({ user });
    gsv.ten = ten;
    gsv.sdt = sdt;
    gsv.email = email;
    gsv.xa = xa;
    gsv.huyen = huyen;
    gsv.tinh = tinh;
    gsv.avatar = req.file ? req.file.filename : gsv.avatar;
    const updatedGSV = await gsv.save();

    res.send({ updatedGSV, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// cap nhat gsv
module.exports.capnhatgsv = async (req, res) => {
  const { ten, sdt, email, cmnd, xa, huyen, tinh, matkhau } = req.body;
  try {
    const gsv = await Giamsatvung.findById(req.params.id);
    if (!gsv) {
      return res.send({
        message: "Không tìm thấy giám sát vùng nào",
        success: false,
      });
    }
    if (matkhau) {
      const user = await User.findById(gsv.user);
      user.matkhau = bcrypt.hashSync(matkhau, 8);
      await user.save();
    }
    gsv.ten = ten;
    gsv.sdt = sdt;
    gsv.email = email;
    gsv.cmnd = cmnd;
    gsv.xa = xa;
    gsv.huyen = huyen;
    gsv.tinh = tinh;
    const updatedGsv = await gsv.save();
    res.send({ updatedGsv, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// lay danh sach gsv
module.exports.laydsgsv = async (req, res) => {
  try {
    const gsv = await Giamsatvung.find({}).populate("user");
    if (!gsv.length) {
      return res.send({
        message: "Không tìm thấy giám sát vùng nào",
        success: false,
      });
    }
    res.send({ gsv, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// lay thong tin 1 gsv
module.exports.laytt1gsv = async (req, res) => {
  try {
    const gsv = await Giamsatvung.findById(req.params.id)
      .populate({
        path: "user daily1 daily2 donhang dscongcu dsnguyenlieu dsvattu dssanpham",
      })
      .populate({
        path: "dscongcu dsvattu dsnguyenlieu dssanpham",
        populate: {
          path: "donhang congcu vattu nguyenlieu sanpham",
        },
      });

    res.send({ gsv, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// lay thong tin 1 gsv based UserId
module.exports.laytt1gsvbyUserId = async (req, res) => {
  try {
    const gsv = await Giamsatvung.findOne({ user: req.params.userId }).populate(
      "user"
    );
    res.send({ gsv, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// xoa nhieu gsv
module.exports.xoanhieugsv = async (req, res) => {
  const { arrayOfId } = req.body;
  try {
    for (const item of arrayOfId) {
      // xoa user
      const gsv = await Giamsatvung.findById(item);
      await User.findByIdAndDelete(gsv.user);
      // xoa bophankd
      await Giamsatvung.findByIdAndDelete(item);
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// lay ds giam sat vung chưa có bộ phận kinh doanh
module.exports.laydsgsvchuacobpkd = async (req, res) => {
  try {
    const gsv = await Giamsatvung.find({}).populate("user");
    if (!gsv.length) {
      return res.send({
        message: "Không tìm thấy giám sát vùng nào",
        success: false,
      });
    }
    const giamsatvung = gsv.filter((item) => !item.bophankd);
    res.send({ giamsatvung, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// lay ds dai ly 2 thuoc giam sat vung
module.exports.laydsdaily2thuocgsv = async (req, res) => {
  try {
    const { daily2 } = await Giamsatvung.findById(req.params.gsvId)
      .select("daily2")
      .populate("daily2");
    if (!daily2.length) {
      return res.send({
        message: "Không tìm thấy đại lý 2 nào",
        success: false,
      });
    }

    res.send({ daily2, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// Duyệt đại lý 2
module.exports.duyetdaily2 = async (req, res) => {
  try {
    const daily2 = await Daily2.findById(req.params.daily2Id);
    // Nếu bophankd đã duyệt
    if (daily2.bophankd) {
      //tạo tài khoản trong User collection
      const newUser = new User({
        taikhoan: daily2.taikhoan,
        matkhau: bcrypt.hashSync("123456", 8),
        vaitro: "daily2",
      });
      const savedUser = await newUser.save();
      // Cập nhật đại lý 2 collection
      daily2.user = savedUser ? savedUser._id : null;
      daily2.active = true;
      daily2.giamsatvung = req.params.gsvId;
      await daily2.save();
    } else {
      daily2.giamsatvung = req.params.gsvId;
      await daily2.save();
    }

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// lay ds don hang thuoc gsv
module.exports.laydsdonhangthuocgsv = async (req, res) => {
  try {
    let { donhang } = await Giamsatvung.findById(req.params.gsvId)
      .select("donhang")
      .populate({
        path: "donhang",
        populate: {
          path: "dssanpham",
          populate: {
            path: "sanpham",
          },
        },
      });

    res.send({ donhang, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// lay ds dai ly 1 thuoc giam sat vung
module.exports.laydsdaily1thuocgsv = async (req, res) => {
  try {
    let { daily1 } = await Giamsatvung.findById(req.params.gsvId)
      .select("daily1")
      .populate("daily1");
    if (!daily1.length) {
      return res.send({
        message: "Không tìm thấy đại lý 1 nào",
        success: false,
      });
    }

    res.send({ daily1, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// lay danh sach SUB don hang thuoc giamsatvung
module.exports.laydsSUBdonhangthuocgsv = async (req, res) => {
  try {
    let { subdonhang } = await Giamsatvung.findById(req.params.gsvId)
      .select("subdonhang")
      .populate({
        path: "subdonhang",
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
            path: "daily1",
            populate: {
              path: "giamsatvung loaisanpham",
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

// lay danh sach sanpham thuoc Giamsatvung
module.exports.laydssanphamthuocgsv = async (req, res) => {
  try {
    const { dssanpham } = await Giamsatvung.findById(req.params.gsvId)
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

// lay danh sach vattu thuoc Giamsatvung
module.exports.laydsvattuthuocgsv = async (req, res) => {
  try {
    let { dsvattu } = await Giamsatvung.findById(req.params.gsvId)
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

// lay danh sach nguyenlieu thuoc Giamsatvung
module.exports.laydsnguyenlieuthuocgsv = async (req, res) => {
  try {
    const { dsnguyenlieu } = await Giamsatvung.findById(req.params.gsvId)
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

// lay danh sach congcu thuoc Giamsatvung
module.exports.laydscongcuthuocgsv = async (req, res) => {
  try {
    let { dscongcu } = await Giamsatvung.findById(req.params.gsvId)
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
};

// lay so lieu tong quan
module.exports.laysolieutongquan = async (req, res) => {
  try {
    const gsv = await Giamsatvung.findById(req.params.gsvId).populate(
      "daily1 daily2 donhang dssanpham dscongcu dsvattu dsnguyenlieu"
    );
    const langnghe = await Langnghe.find({});

    res.send({
      dslangnghe: langnghe.length,
      dsdaily1: gsv.daily1.length,
      dsdaily2: gsv.daily2.length,
      dsdonhang: gsv.donhang.length,
      dssanpham: gsv.dssanpham.length,
      dscongcu: gsv.dscongcu.length,
      dsvattu: gsv.dsvattu.length,
      dsnguyenlieu: gsv.dsnguyenlieu.length,
      success: true,
    });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// lay ds daily2, donhang chua duyet hien thi badge
module.exports.laydsDL2DHchuahienthi = async (req, res) => {
  try {
    // Daily2
    let { daily2 } = await Giamsatvung.findById(req.params.gsvId)
      .select("daily2")
      .populate("daily2");
    daily2 = daily2.filter((dl2) => !dl2.user && !dl2.giamsatvung);
    // Donhang
    let { donhang } = await Giamsatvung.findById(req.params.gsvId)
      .select("donhang")
      .populate("donhang");
    donhang = donhang.filter((dh) => !dh.xacnhan);

    res.send({
      daily2Badge: daily2.length,
      donhangBadge: donhang.length,
      success: true,
    });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};
//--------------------------------------------

// them cong cu hu loi
module.exports.themcongcuhuloi = async (req, res) => {
  const { dsccLoi } = req.body;
  try {
    for (const cc of dsccLoi) {
      const gsv = await Giamsatvung.findById(req.params.gsvId);
      gsv.dscongcu = gsv.dscongcu.map((item) =>
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
      await gsv.save();
    }

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// lay ds cong cu hu loi
module.exports.laydscongcuhuloi = async (req, res) => {
  try {
    let { dscongcu: dscongcuhuloi } = await Giamsatvung.findById(
      req.params.gsvId
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

//--------------------------------------------

// them vat tu hu loi
module.exports.themvattuhuloi = async (req, res) => {
  const { dsvtLoi } = req.body;
  try {
    for (const vt of dsvtLoi) {
      const gsv = await Giamsatvung.findById(req.params.gsvId);
      gsv.dsvattu = gsv.dsvattu.map((item) =>
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
      await gsv.save();
    }

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// lay ds vat tu hu loi
module.exports.laydsvattuhuloi = async (req, res) => {
  try {
    let { dsvattu: dsvattuhuloi } = await Giamsatvung.findById(req.params.gsvId)
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

//--------------------------------------------

// them nguyen lieu hu loi
module.exports.themnguyenlieuhuloi = async (req, res) => {
  const { dsnglLoi } = req.body;
  try {
    for (const ngl of dsnglLoi) {
      const gsv = await Giamsatvung.findById(req.params.gsvId);
      gsv.dsnguyenlieu = gsv.dsnguyenlieu.map((item) =>
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
      await gsv.save();
    }

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// lay ds nguyen lieu hu loi
module.exports.laydsnguyenlieuhuloi = async (req, res) => {
  try {
    let { dsnguyenlieu: dsnguyenlieuhuloi } = await Giamsatvung.findById(
      req.params.gsvId
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

// lay ds subdonhang cua 1 don hang co ma cu the va thuoc gsv co ma gsv
module.exports.laydsSUBdonhangcuadonhangcosmacuthe = async (req, res) => {
  try {
    let { subdonhang } = await Giamsatvung.findById(req.params.gsvId)
      .select("subdonhang")
      .populate({
        path: "subdonhang",
        populate: {
          path: "to",
          populate: {
            path: "daily1",
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

// lay ds hodan
module.exports.laydshodan = async (req, res) => {
  try {
    // lay danh sach gsv do gsv quan ly
    const dsdaily2 = await Daily2.find({ giamsatvung: req.params.gsvId })
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

// Tổng hợp số liệu tổng quát của tiến độ đơn hàng
module.exports.tonghopsolieutongquat = async (req, res) => {
  try {
    const giamsatvung = await Giamsatvung.findById(req.params.gsvId)
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
    // don hang tong hop cua gsv:
    const gsvDonhang = giamsatvung.donhang.find(
      (dh) => dh.ma === req.params.maDH
    );
    // tong so luong sp cua dh goc (trường hợp này đơn hàng gốc là GSV)
    const tongSLSPDonhangGoc = gsvDonhang.tongsanpham;

    //-------------------------------
    let gsvSubdonhang = giamsatvung.subdonhang;
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

    //===============================================
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
    //=======================================
    // gsv tien do hoan thanh
    const gsvTDHT = Math.round(
      (gsvDonhang.dssanpham.reduce(
        (acc, sp) => acc + (sp.danhan ? sp.danhan : 0),
        0
      ) /
        tongSLSPDonhangGoc) *
        100
    );
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
      gsvNhandon: gsvDonhang.xacnhan,
      gsvTDHT,
      daily1TTND,
      daily1TDHT,
      daily2TTND,
      daily2TDHT,
      hodanTTND,
      hodanTDHT,
      gsvDSDonhang: [gsvDonhang],
      daily1DSDonhang,
      daily2DSDonhang,
      hodanDSDonhang,
      success: true,
    });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.getCollection = async (req, res) => {
  const collection = await Giamsatvung.find({});

  return res.status(200).send(collection);
};
module.exports.dropCollection = async (req, res) => {
  await Giamsatvung.deleteMany({});

  return res.status(204).send("Ok");
};
