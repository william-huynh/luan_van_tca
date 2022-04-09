const mongoose = require("mongoose");

const vattuSchema = new mongoose.Schema(
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

vattuSchema.pre('save', function(next) {
  console.log("[DEBUG] Trigger 'save' pre hook on Vattu");
  // TODO: Add relations
  next();
});
vattuSchema.post('remove', function(next) {
  console.log("[DEBUG] Trigger 'remove' post hook on Vattu");
  // TODO: Drop relations
  next();
});

const Vattu = mongoose.model("Vattu", vattuSchema);

module.exports = Vattu;
