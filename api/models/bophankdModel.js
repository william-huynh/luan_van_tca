const mongoose = require("mongoose");

const bophankdSchema = new mongoose.Schema(
  {
    ten: String,
    sdt: String,
    email: String,
    xa: String,
    huyen: String,
    tinh: String,
    avatar: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    dscongcu: [
      {
        donhang: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Donhang",
        },
        congcu: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Congcu",
        },
        loi: {
          soluongloi: Number,
          ngaybaoloi: String,
        },
        soluong: Number, // = số lượng sp đặt * định mức công cụ
        ngaytao: String,
      },
    ],
    dsvattu: [
      {
        donhang: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Donhang",
        },
        vattu: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Vattu",
        },
        loi: {
          soluongloi: Number,
          ngaybaoloi: String,
        },
        soluong: Number, // = số lượng sp đặt * định mức công cụ
        ngaytao: String,
      },
    ],
    dsnguyenlieu: [
      {
        donhang: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Donhang",
        },
        nguyenlieu: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Nguyenlieu",
        },
        loi: {
          khoiluongloi: Number,
          ngaybaoloi: String,
        },
        khoiluong: Number, // = số lượng sp đặt * định mức công cụ
        ngaytao: String,
      },
    ],
    dssanpham: [
      {
        donhang: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Donhang",
        },
        sanpham: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Sanpham",
        },
        soluong: Number,
        soluonghoanthanh: Number,
        danhan: {
          type: Number,
          default: 0,
        },
        dagiao: {
          type: Number,
          default: 0,
        },
        ngaytao: String,
      },
    ],
    daily1: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Daily1",
      },
    ],
    daily2: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Daily2",
      },
    ],
    giamsatvung: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Giamsatvung",
      },
    ],
    donhang: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donhang",
      },
    ],
    subdonhang: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donhang",
      },
    ],
    dsgiaohang: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Giaohang",
      },
    ],
  },
  {
    timestamps: true,
  }
);

bophankdSchema.pre('save', function(next) {
  console.log("[DEBUG] Trigger 'save' pre hook on BPKD");
  // TODO: Add relations
  next();
});
bophankdSchema.post('remove', function(next) {
  console.log("[DEBUG] Trigger 'remove' post hook on BPKD");
  // TODO: Drop relations
  next();
});

const Bophankd = mongoose.model("Bophankd", bophankdSchema);

module.exports = Bophankd;
