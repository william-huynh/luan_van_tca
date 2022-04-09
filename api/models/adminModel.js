const mongoose = require("mongoose");

const User = require("./userModel");

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
adminSchema.pre('deleteOne', { document: false, query: true }, async function() {
  const document = this.getQuery();
  console.log("[DEBUG] (AdminDeleteOnePostHook) Triggered, deleting User " + document.user);

  const execution = await User.deleteOne(mongoose.Types.ObjectId(document.user));
  console.log("[DEBUG] (AdminDeleteOnePostHook) Execution completed, deleted " + execution.deletedCount + " document(s)");
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
