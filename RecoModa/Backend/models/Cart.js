//Tarık

import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Cart", CartSchema);
