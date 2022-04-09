const mongoose = require("mongoose");

const nguyenlieuSchema = new mongoose.Schema(
  {
    ten: {
      type: String,
      required: true,
    },
    mota: {
      type: String,
    },
    thuoctinh: [],
    hinhanh: {
      type: String,
    },
    congdung: {
      type: String,
    },
    soluong: {
      type: Number,
    },
    ngaytao: String,
    loi: {
      soluongloi: Number,
      ngaybaoloi: String,
    },
  },
  {
    timestamps: true,
  }
);

nguyenlieuSchema.pre('save', function(next) {
  console.log("[DEBUG] Trigger 'save' pre hook on Nguyenlieu");
  // TODO: Add relations
  next();
});
nguyenlieuSchema.post('remove', function(next) {
  console.log("[DEBUG] Trigger 'remove' post hook on Admin");
  // TODO: Drop relations
  next();
});

const Nguyenlieu = mongoose.model("Nguyenlieu", nguyenlieuSchema);

module.exports = Nguyenlieu;
