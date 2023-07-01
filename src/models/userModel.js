const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "email already exits"],
    },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
    profile_pic: { type: String },
    role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userschema", UserSchema);
