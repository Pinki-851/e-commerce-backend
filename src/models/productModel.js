const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userSchema",
      required: true,
    },
    name: { type: String, required: [true, "Product name is required"] },
    image: {
      type: String,
      //  required: [true, "Image is required"]
    },
    qty: { type: Number, required: [true, "Qty is required"] },
    price: { type: Number, required: [true, "price is required"] },
    // size:{type:}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
