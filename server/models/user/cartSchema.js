import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  itemId: {type: mongoose.Schema.ObjectId, require: true},
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, require: true },
  products: [
    {
      item: itemSchema,
      quantity: { type: Number, default: 1 },
    },
  ],
});

const Cart = mongoose.model("Carts", cartSchema);

export default Cart;
