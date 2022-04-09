const mongoose = require("mongoose");

const lichsuSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    thaotac: String,
  },
  {
    timestamps: true,
  }
);

lichsuSchema.pre('save', function(next) {
  console.log("[DEBUG] Trigger 'save' pre hook on Lichsu");
  // TODO: Add relations
  next();
});
lichsuSchema.post('remove', function(next) {
  console.log("[DEBUG] Trigger 'remove' post hook on Lichsu");
  // TODO: Drop relations
  next();
});

const Lichsu = mongoose.model("Lichsu", lichsuSchema);

module.exports = Lichsu;
