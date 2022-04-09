const mongoose = require("mongoose");

const loaiSanphamSchema = new mongoose.Schema(
  {
    ma: {
      type: String,
    },
    ten: {
      type: String,
      required: true,
    },
    mota: {
      type: String,
    },
    ngaytao: String,
  },
  {
    timestamps: true,
  }
);

loaiSanphamSchema.pre('save', function(next) {
  console.log("[DEBUG] Trigger 'save' pre hook on Loaisanpham");
  // TODO: Add relations
  next();
});
loaiSanphamSchema.post('remove', function(next) {
  console.log("[DEBUG] Trigger 'remove' post hook on Loaisanpham");
  // TODO: Drop relations
  next();
});

const LoaiSanpham = mongoose.model("LoaiSanpham", loaiSanphamSchema);

module.exports = LoaiSanpham;
