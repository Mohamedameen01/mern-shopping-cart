import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: String, require: true },
  products: [
    {
      item: { type: mongoose.Schema.ObjectId, require: true },
      quantity: { type: Number, default: 1 },
    },
  ],
});

const Cart = mongoose.model("Carts", cartSchema);

export default Cart;
