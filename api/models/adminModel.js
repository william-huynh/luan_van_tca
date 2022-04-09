const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    ten: {
      type: String,
      required: true,
    },
    sdt: String,
    email: String,
    cmnd: String,
    diachi: String,
    xa: String,
    huyen: String,
    tinh: String,
    avatar: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

adminSchema.pre('save', function(next) {
  console.log("[DEBUG] Trigger 'save' pre hook on Admin");
  // TODO: Add relations
  next();
});
adminSchema.post('remove', function(next) {
  console.log("[DEBUG] Trigger 'remove' post hook on Admin");
  // TODO: Drop relations
  next();
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
