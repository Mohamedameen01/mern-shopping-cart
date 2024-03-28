import mongoose from "mongoose";

const detailsSchema = new mongoose.Schema({
  address: { type: String, required: true },
  pincode: { type: Number, required: true },
  mobile: { type: Number, required: true },
});

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, required: true },
  deliveryDetails: detailsSchema,
  date: { type: Date, default: Date.now, required: true },
  status: { type: String, required: true },
  total: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  products: [{ type: productSchema, required: true }],
});

const Order = mongoose.model("Orders", orderSchema);

export default Order;
