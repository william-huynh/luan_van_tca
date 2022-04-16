const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils");

module.exports.getCollection = async (req, res) => {
  const users = await User.find({});

  return res.status(200).send(users);
};
module.exports.dropCollection = async (req, res) => {
  await User.deleteMany({});

  return res.status(204).send("Ok");
};

// user signin
module.exports.dangnhap = async (req, res) => {
  const { taikhoan, matkhau } = req.body;
  // check email
  const user = await User.findOne({ taikhoan });
  if (!user) {
    res
      .status(403)
      .send({ message: "Thông tin không chính xác", success: false });
  } else {
    // check password
    //const validPwd = bcrypt.compareSync(matkhau, user.matkhau); // falses
    const token = generateToken(user);
    if (bcrypt.compareSync(matkhau, user.matkhau)) {
      res.status(200).send({
        _id: user._id,
        taikhoan: user.taikhoan,
        vaitro: user.vaitro,
        token,
        success: true,
      });
    } else {
      res
        .status(403)
        .send({ message: "Thông tin không chính xác", success: false });
    }
  }
};

// update user acc
module.exports.capnhaptaikhoan = async (req, res) => {
  const { matkhau } = req.body;
  try {
    const user = await User.findById(req.params.id);
    user.matkhau = bcrypt.hashSync(matkhau, 8);
    const updatedUser = await user.save();
    res.send({ updatedUser, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};
