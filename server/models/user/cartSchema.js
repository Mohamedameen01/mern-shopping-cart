import mongoose from "mongoose";

const cartSchema= new mongoose.Schema({
    userId: {type:String, require:true},
    productId: {type:String, require:true},
    title: {type:String, require:true},
    quantity: {type:Number, default:1},
    image: {type:String, require:true},
    price: {type:String, require:true},
})

const Cart = mongoose.model("Carts", cartSchema);

export default Cart;