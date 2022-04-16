const express = require("express");
const hodanRouter = express.Router();
const upload = require("../middleware/imageUpload");

const hodanController = require("../controller/HodanController");
// them ho dan
hodanRouter.post("/them", hodanController.themhodan);

// Doi mat khau
hodanRouter.put(
  "/capnhatthongtincanhan",
  upload.single("avatar"),
  hodanController.doimatkhau
);

// chinh sua hodan
hodanRouter.put("/single/:id", hodanController.chinhsuahodan);

// lay ds ho dan
hodanRouter.get("/danhsach", hodanController.laydshodan);

// lay ds ho dan thuoc langngheId
hodanRouter.get(
  "/danhsach/:langngheId",
  hodanController.laydshodanthuoclangnghe
);

// lay ds ho dan co' daily 2 la null
hodanRouter.get("/dsdaily2null", hodanController.laydshodancodaily2null);

// search hodan
hodanRouter.get("/search", hodanController.timkiemhodan);

// xoa 1 ho dan
hodanRouter.delete("/single/:id", hodanController.xoa1hodan);

// xoa nhieu` ho dan
hodanRouter.put("/multiple", hodanController.xoanhieuhodan);

// lay thong tin 1 ho dan
hodanRouter.get("/single/:id", hodanController.laytt1hodan);

// lay 1 phan phat thuoc hodan
hodanRouter.get(
  "/singlephanphat/:hodanId/:phanphatId",
  hodanController.lay1phanphatthuochodan
);

// lay thong tin 1 ho dan based userId
hodanRouter.get(
  "/singlehdbaseduser/:userId",
  hodanController.laytt1hodanbyUserId
);

//========================================
// lay ds phan phat  thuoc ho dan
hodanRouter.get(
  "/dsphanphat/:hodanId",
  hodanController.laydsphanphatthuochodan
);
// lay ds phan phat CONG CU thuoc ho dan
hodanRouter.get(
  "/dscongcuphanphat/:hodanId",
  hodanController.laydsphanphatcongcuthuochodan
);

// lay ds phan phat VAT TU thuoc ho dan
hodanRouter.get(
  "/dsvattu/:hodanId",
  hodanController.laydsphanphatvattuthuochodan
);

// lay danh sach CONG CU thuoc ho dan
hodanRouter.get("/dscongcu/:hodanId", hodanController.laydscongcuthuochodan);
// lay danh sach nguyenlieu thuoc hodan
hodanRouter.get(
  "/dsnguyenlieu/:hodanId",
  hodanController.laydsnguyenlieuthuochodan
);

// lay danh sach VAT TU thuoc ho dan
hodanRouter.get("/dsvattu/:hodanId", hodanController.laydsvattuthuochodan);

// bao cao don hang -> within donhangRouter

// ds don hang thuoc ho dan
hodanRouter.get("/dsdonhang/:hodanId", hodanController.laydsdonhangthuochodan);

// ho dan xac nhan don hang
hodanRouter.put(
  "/xacnhandh/:hodanId/:donhangId",
  hodanController.hodanxacnhandonhang
);
// them cong cu hu loi
hodanRouter.put("/themcchuloi/:hodanId", hodanController.themcongcuhuloi);

// lay ds cong cu hu loi
hodanRouter.get("/dscchuloi/:hodanId", hodanController.laydscongcuhuloi);

//--------------------------------------------

// them vat tu hu loi
hodanRouter.put("/themvthuloi/:hodanId", hodanController.themvattubiloi);

// lay ds vat tu hu loi
hodanRouter.get("/dsvthuloi/:hodanId", hodanController.laydsvattuhuloi);

//--------------------------------------------

// them nguyen lieu hu loi
hodanRouter.put("/themnglhuloi/:hodanId", hodanController.themnguyenlieuhuloi);

// lay ds nguyen lieu hu loi
hodanRouter.get("/dsnglhuloi/:hodanId", hodanController.laydsnguyenlieuhuloi);

// doi mat khau hodan
hodanRouter.patch("/changepassword/:id", hodanController.doimatkhauhodan);

// ho dan bao cao don hang
hodanRouter.put(
  "/baocao",
  upload.single("hinhanh"),
  hodanController.hodanbaocaodonhang
);

// Tổng hợp số liệu tổng quát của tiến độ đơn hàng
hodanRouter.get(
  "/tiendodonhang/:hodanId/:maDH",
  hodanController.tonghopsolieutongquat
);

hodanRouter.get("/collection", hodanController.getCollection);
hodanRouter.delete("/collection", hodanController.dropCollection);

module.exports = hodanRouter;

// const express = require("express");
// const Hodan = require("../models/hodanModel");
// const User = require("../models/userModel");
// const hodanRouter = express.Router();
// var bcrypt = require("bcryptjs");
// const Langnghe = require("../models/langngheModel");
// const Daily2 = require("../models/daily2Model");
// const Daily1 = require("../models/daily1Model");
// const Donhang = require("../models/donhangModel");
// const upload = require("../middleware/imageUpload");
// const Giamsatvung = require("../models/giamsatvungModel");
// const Bophankd = require("../models/bophankdModel");

// // them ho dan
// hodanRouter.post("/them", async (req, res) => {
//   const {
//     daidien,
//     xa,
//     tinh,
//     huyen,
//     sdt,
//     cmnd,
//     namsinh,
//     langnghe,
//     loaisanpham,
//     taikhoan,
//     daily1,
//     daily2,
//   } = req.body;
//   try {
//     // create hodan
//     const hodan = new Hodan({
//       daidien,
//       xa,
//       tinh,
//       huyen,
//       sdt,
//       cmnd,
//       namsinh,
//       langnghe,
//       loaisanpham,
//       taikhoan,
//       daily2,
//     });
//     const savedHodan = await hodan.save();

//     if (savedHodan) {
//       // Thêm vào danh sách hộ dân của đại lý 2
//       const singleDaily2 = await Daily2.findById(daily2);
//       singleDaily2.hodan = [savedHodan._id, ...singleDaily2.hodan];
//       await singleDaily2.save();
//       // Thêm vào danh sách duyệt hộ dân của đại lý 1
//       const singleDaily1 = await Daily1.findById(daily1);
//       singleDaily1.hodan = [savedHodan._id, ...singleDaily1.hodan];
//       await singleDaily1.save();
//     }

//     res.send({ savedHodan, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // chinh sua hodan
// hodanRouter.put("/single/:id", async (req, res) => {
//   const {
//     daidien,
//     matkhau,
//     sdt,
//     cmnd,
//     namsinh,
//     xa,
//     huyen,
//     tinh,
//     langnghe,
//     loaisanpham,
//   } = req.body;
//   try {
//     const hodan = await Hodan.findById(req.params.id);
//     if (matkhau) {
//       const user = await User.findById(hodan.user);
//       user.matkhau = bcrypt.hashSync(matkhau, 8);
//       await user.save();
//     }
//     hodan.daidien = daidien;
//     hodan.sdt = sdt;
//     hodan.cmnd = cmnd;
//     hodan.namsinh = namsinh;
//     hodan.xa = xa;
//     hodan.huyen = huyen;
//     hodan.tinh = tinh;
//     hodan.langnghe = langnghe;
//     hodan.loaisanpham = loaisanpham;
//     const updatedHodan = await hodan.save();

//     res.send({ updatedHodan, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // lay ds ho dan
// hodanRouter.get("/danhsach", async (req, res) => {
//   try {
//     const hodan = await Hodan.find({})
//       .populate("user")
//       .populate("langnghe loaisanpham")
//       .sort({ createdAt: "desc" });
//     if (!hodan.length) {
//       return res.send({
//         message: "Không tìm thấy hộ dân nào",
//         success: false,
//       });
//     }
//     res.send({ hodan, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // lay ds ho dan thuoc langngheId
// hodanRouter.get("/danhsach/:langngheId", async (req, res) => {
//   try {
//     const hodan = await Hodan.find({ langnghe: req.params.langngheId })
//       .populate("user")
//       .populate("langnghe");
//     if (!hodan.length) {
//       return res.send({
//         message: "Không tìm thấy hộ dân nào",
//         success: false,
//       });
//     }
//     res.send({ hodan, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // lay ds ho dan co' daily 2 la null
// hodanRouter.get("/dsdaily2null", async (req, res) => {
//   try {
//     const hd = await Hodan.find({}).populate("user").populate("langnghe");
//     const hodan = hd.filter((item) => !item.daily2);
//     res.send({ hodan, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // search hodan
// hodanRouter.get("/search", async (req, res) => {
//   const { daidien, diachi, sdt } = req.query;
//   const filterDaidien = daidien ? { daidien } : {};
//   const filterDiachi = diachi
//     ? { diachi: { $regex: diachi, $options: "i" } }
//     : {};
//   const filterSdt = sdt ? { sdt } : {};
//   try {
//     const hodan = await Hodan.findOne({
//       ...filterDaidien,
//       ...filterSdt,
//       ...filterDiachi,
//     });
//     res.send({ hodan, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // xoa 1 ho dan
// hodanRouter.delete("/single/:id", async (req, res) => {
//   try {
//     // xoa user
//     const hodan = await Hodan.findById(req.params.id);
//     if (hodan.user) {
//       await User.findByIdAndDelete(hodan.user);
//     }
//     // xoa hodan
//     const removedHodan = await Hodan.findByIdAndDelete(req.params.id);
//     res.send({ removedHodan, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // xoa nhieu` ho dan
// hodanRouter.put("/multiple", async (req, res) => {
//   const { arrayOfId } = req.body;
//   try {
//     for (const item of arrayOfId) {
//       // xoa user
//       const hodan = await Hodan.findById(item);
//       if (hodan.user) {
//         await User.findByIdAndDelete(hodan.user);
//       }
//       // xoa hodan
//       await Hodan.findByIdAndDelete(item);
//     }
//     res.send({ success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // lay thong tin 1 ho dan
// hodanRouter.get("/single/:id", async (req, res) => {
//   try {
//     const hodan = await Hodan.findById(req.params.id)
//       .populate("donhang")
//       .populate({
//         path: "dscongcu dsvattu dsnguyenlieu dssanpham",
//         populate: {
//           path: "donhang congcu vattu nguyenlieu sanpham",
//         },
//       });

//     res.send({ hodan, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // lay 1 phan phat thuoc hodan
// hodanRouter.get("/singlephanphat/:hodanId/:phanphatId", async (req, res) => {
//   try {
//     const { dsphanphat } = await Hodan.findById(req.params.hodanId)
//       .select("dsphanphat")
//       .populate({
//         path: "dsphanphat",
//         populate: {
//           path: "phanphat",
//           populate: {
//             path: "from to items",
//             populate: {
//               path: "bophankd daily1 daily2 hodan congcu vattu",
//             },
//           },
//         },
//       });
//     const phanphat = dsphanphat.find(
//       (item) => item.phanphat._id.toString() === req.params.phanphatId
//     );
//     res.send({ phanphat, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // lay thong tin 1 ho dan based userId
// hodanRouter.get("/singlehdbaseduser/:userId", async (req, res) => {
//   try {
//     const hodan = await Hodan.findOne({ user: req.params.userId });

//     res.send({ hodan, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// //========================================
// // lay ds phan phat  thuoc ho dan
// hodanRouter.get("/dsphanphat/:hodanId", async (req, res) => {
//   try {
//     let { dsphanphat } = await Hodan.findById(req.params.hodanId)
//       .select("dsphanphat")
//       .populate({
//         path: "dsphanphat",
//         populate: {
//           path: "phanphat",
//           populate: {
//             path: "from to items",
//             populate: {
//               path: "bophankd daily1 daily2 hodan congcu",
//             },
//           },
//         },
//       });
//     res.send({ dsphanphat, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // lay ds phan phat CONG CU thuoc ho dan
// hodanRouter.get("/dscongcuphanphat/:hodanId", async (req, res) => {
//   try {
//     let { dsphanphat } = await Hodan.findById(req.params.hodanId)
//       .select("dsphanphat")
//       .populate({
//         path: "dsphanphat",
//         populate: {
//           path: "phanphat",
//           populate: {
//             path: "from to items",
//             populate: {
//               path: "bophankd daily1 daily2 hodan congcu",
//             },
//           },
//         },
//       });
//     dsphanphat = dsphanphat.filter(
//       (item) => item.phanphat.phanphattype === "congcu"
//     );
//     res.send({ dsphanphat, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // lay ds phan phat VAT TU thuoc ho dan
// hodanRouter.get("/dsvattuphanphat/:hodanId", async (req, res) => {
//   try {
//     let { dsphanphat } = await Hodan.findById(req.params.hodanId)
//       .select("dsphanphat")
//       .populate({
//         path: "dsphanphat",
//         populate: {
//           path: "phanphat",
//           populate: {
//             path: "from to items",
//             populate: {
//               path: "bophankd daily1 daily2 hodan vattu",
//             },
//           },
//         },
//       });
//     dsphanphat = dsphanphat.filter(
//       (item) => item.phanphat.phanphattype === "vattu"
//     );
//     res.send({ dsphanphat, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // lay danh sach CONG CU thuoc ho dan
// hodanRouter.get("/danhsachcongcu/:hodanId", async (req, res) => {
//   try {
//     let dscongcu = await Hodan.findById(req.params.hodanId)
//       .select("items")
//       .populate({
//         path: "items",
//         populate: {
//           path: "phanphat",
//           populate: {
//             path: "from to",
//             populate: {
//               path: "bophankd daily1 daily2 hodan",
//             },
//           },
//         },
//       })
//       .populate({
//         path: "items",
//         populate: {
//           path: "congcu",
//         },
//       });

//     if (!dscongcu) {
//       return res.send({
//         message: "Không có công cụ nào trong kho",
//         success: false,
//       });
//     }
//     dscongcu = dscongcu.items.filter((item) => item.congcu);
//     res.send({ dscongcu, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // lay danh sach VAT TU thuoc ho dan
// hodanRouter.get("/danhsachvattu/:hodanId", async (req, res) => {
//   try {
//     let dsvattu = await Hodan.findById(req.params.hodanId)
//       .select("items")
//       .populate({
//         path: "items",
//         populate: {
//           path: "phanphat",
//           populate: {
//             path: "from to",
//             populate: {
//               path: "bophankd daily1 daily2 hodan",
//             },
//           },
//         },
//       })
//       .populate({
//         path: "items",
//         populate: {
//           path: "vattu",
//         },
//       });

//     if (!dsvattu) {
//       return res.send({
//         message: "Không có công cụ nào trong kho",
//         success: false,
//       });
//     }
//     dsvattu = dsvattu.items.filter((item) => item.vattu);
//     res.send({ dsvattu, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // ds don hang thuoc ho dan
// hodanRouter.get("/dsdonhang/:hodanId", async (req, res) => {
//   try {
//     const { donhang: dsdonhang } = await Hodan.findById(req.params.hodanId)
//       .select("donhang")
//       .populate({
//         path: "donhang",
//         populate: {
//           path: "dssanpham dscongcu dsvattu dsnguyenlieu",
//           populate: {
//             path: "sanpham congcu vattu nguyenlieu",
//           },
//         },
//       })
//       .populate({
//         path: "donhang",
//         populate: {
//           path: "from",
//           populate: {
//             path: "bophankd giamsatvung daily1 daily2",
//           },
//         },
//       })
//       .populate({
//         path: "donhang",
//         populate: {
//           path: "to",
//           populate: {
//             path: "giamsatvung daily1 daily2 hodan",
//           },
//         },
//       })
//       .populate({
//         path: "donhang",
//         populate: {
//           path: "dssanpham",
//           populate: {
//             path: "sanpham",
//             populate: {
//               path: "loaisanpham dscongcu.congcu dsvattu.vattu dsnguyenlieu.nguyenlieu",
//             },
//           },
//         },
//       });

//     res.send({ dsdonhang, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // ho dan xac nhan don hang => khoi tao kho sanpham, congcu, vattu, nguyenlieu
// hodanRouter.put("/xacnhandh/:hodanId/:donhangId", async (req, res) => {
//   try {
//     const hodan = await Hodan.findById(req.params.hodanId);
//     const donhang = await Donhang.findById(req.params.donhangId);

//     // Hodan
//     let dsspTemp = donhang.dssanpham.map((sp) => ({
//       donhang: donhang._id.toString(),
//       sanpham: sp.sanpham,
//       soluong: sp.soluong,
//       soluonghoanthanh: sp.soluonghoanthanh,
//       ngaytao: donhang.ngaydathang,
//     }));
//     let dsccTemp = donhang.dscongcu.map((cc) => ({
//       donhang: donhang._id.toString(),
//       congcu: cc.congcu,
//       soluong: cc.soluong,
//       ngaytao: donhang.ngaydathang,
//     }));
//     let dsvtTemp = donhang.dsvattu.map((vt) => ({
//       donhang: donhang._id.toString(),
//       vattu: vt.vattu,
//       soluong: vt.soluong,
//       ngaytao: donhang.ngaydathang,
//     }));
//     let dsnglTemp = donhang.dsnguyenlieu.map((ngl) => ({
//       donhang: donhang._id.toString(),
//       nguyenlieu: ngl.nguyenlieu,
//       khoiluong: ngl.khoiluong,
//       ngaytao: donhang.ngaydathang,
//     }));
//     hodan.dssanpham = [...dsspTemp, ...hodan.dssanpham];
//     hodan.dscongcu = [...dsccTemp, ...hodan.dscongcu];
//     hodan.dsvattu = [...dsvtTemp, ...hodan.dsvattu];
//     hodan.dsnguyenlieu = [...dsnglTemp, ...hodan.dsnguyenlieu];
//     await hodan.save();

//     // Donhang
//     donhang.xacnhan = true;
//     await donhang.save();

//     res.send({ success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// ////=========================

// // them cong cu hu loi
// hodanRouter.put("/themcchuloi/:hodanId", async (req, res) => {
//   const { dsccLoi } = req.body;
//   try {
//     for (const cc of dsccLoi) {
//       const hodan = await Hodan.findById(req.params.hodanId);
//       hodan.dscongcu = hodan.dscongcu.map((item) =>
//         item.congcu.toString() === cc.congcu._id &&
//         item.donhang.toString() === cc.donhang._id &&
//         item.loi.soluongloi
//           ? {
//               donhang: item.donhang,
//               congcu: item.congcu,
//               loi: {
//                 soluongloi: item.loi.soluongloi + parseInt(cc.soluongloi),
//                 ngaybaoloi: getCurrentDatetime(),
//               },
//               soluong: item.soluong,
//               ngaytao: item.ngaytao,
//             }
//           : item.congcu.toString() === cc.congcu._id &&
//             item.donhang.toString() === cc.donhang._id
//           ? {
//               donhang: item.donhang,
//               congcu: item.congcu,
//               loi: {
//                 soluongloi: cc.soluongloi,
//                 ngaybaoloi: getCurrentDatetime(),
//               },
//               soluong: item.soluong,
//               ngaytao: item.ngaytao,
//             }
//           : item
//       );
//       await hodan.save();
//     }

//     res.send({ success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // lay ds cong cu hu loi
// hodanRouter.get("/dscchuloi/:hodanId", async (req, res) => {
//   try {
//     let { dscongcu: dscongcuhuloi } = await Hodan.findById(req.params.hodanId)
//       .select("dscongcu")
//       .populate({
//         path: "dscongcu",
//         populate: {
//           path: "donhang congcu",
//         },
//       });

//     dscongcuhuloi = dscongcuhuloi.filter((cc) => cc.loi.soluongloi);

//     res.send({ dscongcuhuloi, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// //--------------------------------------------

// // them vat tu hu loi
// hodanRouter.put("/themvthuloi/:hodanId", async (req, res) => {
//   const { dsvtLoi } = req.body;
//   try {
//     for (const vt of dsvtLoi) {
//       const hodan = await Hodan.findById(req.params.hodanId);
//       hodan.dsvattu = hodan.dsvattu.map((item) =>
//         item.vattu.toString() === vt.vattu._id &&
//         item.donhang.toString() === vt.donhang._id &&
//         item.loi.soluongloi
//           ? {
//               donhang: item.donhang,
//               vattu: item.vattu,
//               loi: {
//                 soluongloi: item.loi.soluongloi + parseInt(vt.soluongloi),
//                 ngaybaoloi: getCurrentDatetime(),
//               },
//               soluong: item.soluong,
//               ngaytao: item.ngaytao,
//             }
//           : item.vattu.toString() === vt.vattu._id &&
//             item.donhang.toString() === vt.donhang._id
//           ? {
//               donhang: item.donhang,
//               vattu: item.vattu,
//               loi: {
//                 soluongloi: vt.soluongloi,
//                 ngaybaoloi: getCurrentDatetime(),
//               },
//               soluong: item.soluong,
//               ngaytao: item.ngaytao,
//             }
//           : item
//       );
//       await hodan.save();
//     }

//     res.send({ success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // lay ds vat tu hu loi
// hodanRouter.get("/dsvthuloi/:hodanId", async (req, res) => {
//   try {
//     let { dsvattu: dsvattuhuloi } = await Hodan.findById(req.params.hodanId)
//       .select("dsvattu")
//       .populate({
//         path: "dsvattu",
//         populate: {
//           path: "donhang vattu",
//         },
//       });

//     dsvattuhuloi = dsvattuhuloi.filter((vt) => vt.loi.soluongloi);

//     res.send({ dsvattuhuloi, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// //--------------------------------------------

// // them nguyen lieu hu loi
// hodanRouter.put("/themnglhuloi/:hodanId", async (req, res) => {
//   const { dsnglLoi } = req.body;
//   try {
//     for (const ngl of dsnglLoi) {
//       const hodan = await Hodan.findById(req.params.hodanId);
//       hodan.dsnguyenlieu = hodan.dsnguyenlieu.map((item) =>
//         item.nguyenlieu.toString() === ngl.nguyenlieu._id &&
//         item.donhang.toString() === ngl.donhang._id &&
//         item.loi.khoiluongloi
//           ? {
//               donhang: item.donhang,
//               nguyenlieu: item.nguyenlieu,
//               loi: {
//                 khoiluongloi:
//                   item.loi.khoiluongloi + parseInt(ngl.khoiluongloi),
//                 ngaybaoloi: getCurrentDatetime(),
//               },
//               khoiluong: item.khoiluong,
//               ngaytao: item.ngaytao,
//             }
//           : item.nguyenlieu.toString() === ngl.nguyenlieu._id &&
//             item.donhang.toString() === ngl.donhang._id
//           ? {
//               donhang: item.donhang,
//               nguyenlieu: item.nguyenlieu,
//               loi: {
//                 khoiluongloi: ngl.khoiluongloi,
//                 ngaybaoloi: getCurrentDatetime(),
//               },
//               khoiluong: item.khoiluong,
//               ngaytao: item.ngaytao,
//             }
//           : item
//       );
//       await hodan.save();
//     }

//     res.send({ success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // lay ds nguyen lieu hu loi
// hodanRouter.get("/dsnglhuloi/:hodanId", async (req, res) => {
//   try {
//     let { dsnguyenlieu: dsnguyenlieuhuloi } = await Hodan.findById(
//       req.params.hodanId
//     )
//       .select("dsnguyenlieu")
//       .populate({
//         path: "dsnguyenlieu",
//         populate: {
//           path: "donhang nguyenlieu",
//         },
//       });

//     dsnguyenlieuhuloi = dsnguyenlieuhuloi.filter((ngl) => ngl.loi.khoiluongloi);

//     res.send({ dsnguyenlieuhuloi, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// module.exports = hodanRouter;
