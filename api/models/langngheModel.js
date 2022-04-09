const mongoose = require("mongoose");

const langngheSchema = new mongoose.Schema(
  {
    ten: String,
    tinh: String,
    huyen: String,
    loaisanpham: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LoaiSanpham",
      },
    ],
    giamsatvung: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Giamsatvung",
    },
  },
  {
    timestamps: true,
  }
);

langngheSchema.pre('save', function(next) {
  console.log("[DEBUG] Trigger 'save' pre hook on Langnghe");
  // TODO: Add relations
  next();
});
langngheSchema.post('remove', function(next) {
  console.log("[DEBUG] Trigger 'remove' post hook on Langnghe");
  // TODO: Drop relations
  next();
});

const Langnghe = mongoose.model("Langnghe", langngheSchema);

module.exports = Langnghe;
