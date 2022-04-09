const mongoose = require("mongoose");

const giaohangSchema = new mongoose.Schema(
  {
    giamsatvung: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Giamsatvung",
    },
    daily1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Daily1",
    },
    daily2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Daily2",
    },
    hodan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hodan",
    },
    donhang: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donhang",
    },
    dssanpham: [
      {
        sanpham: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Sanpham",
        },
        soluong: Number,
        soluonghoanthanh: Number,
        danhan: Number,
        dagiao: Number,
      },
    ],
    ngaygiao: String,
    ngaynhan: String,
    xacnhan: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

giaohangSchema.pre('save', function(next) {
  console.log("[DEBUG] Trigger 'save' pre hook on Giaohang");
  // TODO: Add relations
  next();
});
giaohangSchema.post('remove', function(next) {
  console.log("[DEBUG] Trigger 'remove' post hook on Giaohang");
  // TODO: Drop relations
  next();
});

const Giaohang = mongoose.model("Giaohang", giaohangSchema);

module.exports = Giaohang;
