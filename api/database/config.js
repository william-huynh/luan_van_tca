const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("[INFO] Database connection established");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnect;
