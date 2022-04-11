const express = require("express");
const bophankdRouter = express.Router();
const upload = require("../middleware/imageUpload");
const bophankdController = require('../controller/BophankinhdoanhController');


bophankdRouter.get('/collection', bophankdController.getCollection)

bophankdRouter.delete('/collection', bophankdController.dropCollection)
bophankdRouter.post("/them", upload.single("hinhanh"), bophankdController.create);

bophankdRouter.put("/capnhatthongtincanhan", upload.single("avatar"), bophankdController.updateByUserId);
bophankdRouter.put("/single/:id", bophankdController.updateById);
// TODO: Refactor method
// xoa nhieu` bo phan kd
bophankdRouter.put("/xoanhieubpkd", bophankdController.deleteMany);

bophankdRouter.get("/danhsach", bophankdController.getAll);
bophankdRouter.get("/single/:id", bophankdController.getById);
bophankdRouter.get("/baseduserid/:userId", bophankdController.getByUserId);
bophankdRouter.get("/dscongcuhuloi/:bophankdId", bophankdController.getBrokenEquipments);

bophankdRouter.delete("/single/:id", bophankdController.deleteById);


// lay danh sach vat tu hu loi
bophankdRouter.get("/dsvattuhuloi/:bophankdId", bophankdController.getBrokenSupplementsList);
bophankdRouter.get("/dsspkhohang/:bophankdId", bophankdController.getProductsFromStore);
bophankdRouter.get("/dsdaily1/:bophankdId", bophankdController.getDaily1List);
bophankdRouter.get("/dsgiamsatvung/:bophankdId", bophankdController.getGsvList);
bophankdRouter.get("/dsphanphat/:bophankdId", bophankdController.getSuppliedList);

// TODO: Refactor method
bophankdRouter.put("/xoasanpham", bophankdController.deleteProduct);

// xoa nhieu` sp thuoc bophankd
// TODO: Refactor method
bophankdRouter.put("/xoanhieusp", bophankdController.deleteProducts);

// xoa nhieu` cong cu thuoc bophankd
// TODO: Refactor method
bophankdRouter.put("/xoanhieucc", bophankdController.deleteMedicineEquipments);

// xoa 1 congcu thuoc bophankd
// TODO: Refactor method
bophankdRouter.put("/xoacongcu", bophankdController.deleteMedicineEquipment);

// xoa nhieu` nglieu thuoc bophankd
// TODO: Refactor method
bophankdRouter.put("/xoanhieunglieu", bophankdController.deleteMaterials);

// xoa 1 nglieu thuoc bophankd
// TODO: Refactor method
bophankdRouter.put("/xoa1nguyenlieu", bophankdController.deleteMaterial);

// xoa nhieu` vat tu thuoc bophankd
// TODO: Refactor method
bophankdRouter.put("/xoanhieuvattu", bophankdController.deleteSupplies);

// xoa 1 vattu thuoc bophankd
// TODO: Refactor method
bophankdRouter.put("/xoa1vattu", bophankdController.deleteSupply);

// xoa nhieu` daily 1 thuoc bophankd
// TODO: Refactor method
bophankdRouter.put("/xoanhieudaily1", bophankdController.deleteDaily1s);

// xoa nhieu` giam sat vung thuoc bophankd
// TODO: Refactor method
bophankdRouter.put("/xoanhieugsv", bophankdController.deleteGsvs);

// bophankd them daily 1
// TODO: Refactor method
bophankdRouter.put("/themdaily1", bophankdController.addDaily1);

// bophankd them giam sat vung
// TODO: Refactor method
bophankdRouter.put("/themgsv", bophankdController.addGsv);

// bophankd them san pham
bophankdRouter.put("/themsanpham", bophankdController.addProducts);

// Lay danh sach dai ly 2 thuoc bpkd
bophankdRouter.get("/dsdaily2/:id", bophankdController.getDaily2ListById);

// Duyệt đại lý 1
bophankdRouter.put("/duyetdaily1/:daily1Id/:bophankdId", bophankdController.verifyDaily1);

// Duyệt đại lý 2
bophankdRouter.put("/duyetdaily2/:daily2Id/:bophankdId", bophankdController.verifyDaily2);

// lay danh sach don hang thuoc bophankd
bophankdRouter.get("/dsdonhang/:bophankdId", bophankdController.getProductsList);

// lay danh sach SUB don hang thuoc bophankd
bophankdRouter.get("/dssubdonhang/:bophankdId/:ma", bophankdController.getSubProductsList);

// lay danh sach sanpham thuoc bophankdId
bophankdRouter.get("/dssanpham/:bophankdId", bophankdController.getProductsListByBpkdId);

// lay danh sach vattu thuoc bophankdId
bophankdRouter.get("/dsvattu/:bophankdId", bophankdController.getSuppliesListByBpkdId);

// lay danh sach nguyenlieu thuoc bophankdId
bophankdRouter.get("/dsnguyenlieu/:bophankdId", bophankdController.getMaterialsList);

// lay so lieu tong quan
bophankdRouter.get("/tongquan/:bophankdId", bophankdController.getOverview);

// lay ds cong cu thuoc bophankd
bophankdRouter.get("/dscongcu/:bophankdId", bophankdController.getEquipmentsByBpkdId);

// lay ds daily1 daily2 chua duyet hien thi badge
bophankdRouter.get("/dsshowbadge/:bophankdId", bophankdController.countUnverfiedDaily1AndDaily2);

//--------------------------------------------

// them cong cu hu loi
bophankdRouter.put("/themcchuloi/:bophankdId", bophankdController.addBrokenEquipments);

// lay ds cong cu hu loi
bophankdRouter.get("/dscchuloi/:bophankdId", bophankdController.getBrokenEquipments);

//--------------------------------------------

// them vat tu hu loi
bophankdRouter.put("/themvthuloi/:bophankdId", bophankdController.addBrokenSuppliesList);

// lay ds vat tu hu loi
bophankdRouter.get("/dsvthuloi/:bophankdId", bophankdController.getBrokenSuppliesList);

//--------------------------------------------

// them nguyen lieu hu loi
bophankdRouter.put("/themnglhuloi/:bophankdId", bophankdController.addBrokenMaterials);

// lay ds nguyen lieu hu loi
bophankdRouter.get("/dsnglhuloi/:bophankdId", bophankdController.getBrokenMaterials);

// lay ds subdonhang cua 1 don hang co ma cu the va thuoc bpkd co ma bpkd
bophankdRouter.get("/dssubdhofsingledh/:bophankdId/:madh", bophankdController.getSubOrdersList);

// lay ds hodan
bophankdRouter.get("/dshodan/:bophankdId", bophankdController.getHodanList);

// Tổng hợp số liệu tổng quát của tiến độ đơn hàng
bophankdRouter.get("/tiendodonhang/:bpkdId/:maDH", bophankdController.getOrderProgess);

module.exports = bophankdRouter;
