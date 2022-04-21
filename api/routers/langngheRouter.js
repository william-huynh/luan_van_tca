const express = require("express");
const langngheRouter = express.Router();
const langngheController = require("../controller/LangngheController");
// them lang nghe
langngheRouter.post("/them", langngheController.themlangnghe);

// lay ds langnghe
langngheRouter.get("/danhsach", langngheController.laydslangnghe);

// lay thong tin 1 langnghe
langngheRouter.get("/single/:id", langngheController.laythongtin1langnghe);

// chinh sua lang nghe
langngheRouter.put("/chinhsua/:id", langngheController.chinhsualangnghe);

// xoa nhieu` langnghe
langngheRouter.put("/multiple", langngheController.xoanhieulangnghe);

// lay ds hodan
langngheRouter.get("/danhsachhodan/:langngheId", langngheController.laydshodan);

langngheRouter.get("/collection", langngheController.getCollection);
langngheRouter.delete("/collection", langngheController.dropCollection);

module.exports = langngheRouter;
