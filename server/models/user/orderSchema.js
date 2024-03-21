import mongoose from 'mongoose';

const detailsSchema = new mongoose.Schema({
    address: { type:String, required: true},
    pincode: { type:Number, required: true},
    mobile: {type:Number, required: true},
})

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.ObjectId, required:true},
    deliveryDetails: detailsSchema,
    date: { type: Date, default: Date.now, required: true},
    status: { type: String, required: true},
    total: { type: Number, required: true},
    cartId: { type: mongoose.Schema.ObjectId, required: true},
    paymentMethod: {type:String, required: true}
})

const Order = mongoose.model('Orders', orderSchema);

export default Order;