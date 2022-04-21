const Hodan = require("../models/hodanModel");
const Langnghe = require("../models/langngheModel");

// them lang nghe
module.exports.themlangnghe = async (req, res) => {
  const { gsvId, ten, tinh, huyen, loaisanpham } = req.body;
  try {
    const newLN = new Langnghe({
      ten,
      tinh,
      huyen,
      loaisanpham,
      giamsatvung: gsvId,
    });
    const savedLangnghe = await newLN.save();
    res.send({ savedLangnghe, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// lay ds langnghe
module.exports.laydslangnghe = async (req, res) => {
  try {
    const langnghe = await Langnghe.find({})
      .populate("loaisanpham")
      .sort({ createdAt: "desc" });
    if (!langnghe.length) {
      return res.send({
        message: "Không tìm thấy làng nghề nào",
        success: false,
      });
    }
    res.send({ langnghe, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// lay thong tin 1 langnghe
module.exports.laythongtin1langnghe = async (req, res) => {
  try {
    const langnghe = await Langnghe.findById(req.params.id).populate(
      "loaisanpham"
    );
    if (!langnghe) {
      return res.send({
        message: "Không tìm thấy làng nghề nào",
        success: false,
      });
    }
    res.send({ langnghe, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// chinh sua lang nghe
module.exports.chinhsualangnghe = async (req, res) => {
  const { ten, tinh, huyen, loaisanpham } = req.body;
  try {
    const langnghe = await Langnghe.findById(req.params.id);
    langnghe.ten = ten;
    langnghe.tinh = tinh;
    langnghe.huyen = huyen;
    langnghe.loaisanpham = loaisanpham;

    const updatedLangnghe = await langnghe.save();
    res.send({ updatedLangnghe, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// xoa nhieu` langnghe
module.exports.xoanhieulangnghe = async (req, res) => {
  const { arrayOfId } = req.body;
  try {
    for (const item of arrayOfId) {
      await Langnghe.findByIdAndDelete(item);
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

// lay ds hodan
module.exports.laydshodan = async (req, res) => {
  try {
    const hodan = await Hodan.find({
      langnghe: req.params.langngheId,
    }).populate("langnghe loaisanpham");

    res.send({ hodan, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

module.exports.getCollection = async (req, res) => {
  const collection = await Langnghe.find({});

  return res.status(200).send(collection);
};
module.exports.dropCollection = async (req, res) => {
  await Langnghe.deleteMany({});

  return res.status(204).send("Ok");
};
