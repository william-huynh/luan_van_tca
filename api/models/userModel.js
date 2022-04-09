const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    taikhoan: {
      type: String,
      required: true,
    },
    matkhau: {
      type: String,
      required: true,
    },
    vaitro: {
      type: String,
      enum: ["admin", "bophankd", "giamsatvung", "daily1", "daily2", "hodan"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', function(next) {
  console.log("[DEBUG] Trigger 'save' pre hook on User");
  // TODO: Add relations
  next();
});
userSchema.post('remove', function(next) {
  console.log("[DEBUG] Trigger 'remove' post hook on User");
  // TODO: Drop relations
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
