const mongoose = require("mongoose");

const congcuSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

congcuSchema.pre('save', function(next) {
  console.log("[DEBUG] Trigger 'save' pre hook on CongCu");
  // TODO: Add relations
  next();
});
congcuSchema.post('remove', function(next) {
  console.log("[DEBUG] Trigger 'remove' post hook on CongCu");
  // TODO: Drop relations
  next();
});

const Congcu = mongoose.model("Congcu", congcuSchema);

module.exports = Congcu;
