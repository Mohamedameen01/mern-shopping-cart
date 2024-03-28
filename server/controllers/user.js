import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Stripe from "stripe";
import mongoose from "mongoose";

import User from "../models/user/authSchema.js";
import Product from "../models/admin/productSchema.js";
import Cart from "../models/user/cartSchema.js";
import Order from "../models/user/orderSchema.js";

dotenv.config();

// Auth:
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(406).json({ message: "Email Already Exists." });
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      const token = await jwt.sign(
        { email: newUser.email, id: newUser._id },
        process.env.JWT_CODE,
        { expiresIn: "2 days" }
      );
      res.status(201).json({ data: newUser, token });
    }
  } catch (error) {
    res.status(400).json({ message: "Failed User Registration." });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(404)
        .json({ message: "User not registered. Please register first." });
    } else {
      bcrypt.compare(password, user.password).then(async (status) => {
        if (!status) {
          res.status(401).json({ message: "Invalid Credentials." });
        } else {
          const token = await jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_CODE,
            { expiresIn: "2 days" }
          );
          res.status(200).json({ data: user, token });
        }
      });
    }
  } catch (error) {
    res.status(400).json({ message: "Login Failed." });
  }
};

// Cart:
export const addToCart = async (req, res) => {
  try {
    const productId = req.query.id;
    const userId = req.userId;

    const product = await Product.findOne({ _id: productId });
    const user = await Cart.findOne({ userId });

    if (user) {
      let isProduct = await user.products.findIndex(
        (product) => product.item._id == productId
      );

      if (isProduct != -1) {
        const incData = await Cart.findOneAndUpdate(
          {
            userId: userId,
            "products.item._id": productId,
          },
          { $inc: { "products.$.quantity": 1 } },
          { new: true }
        );
        res.status(200).json(incData);
      } else {
        const addedData = await Cart.findOneAndUpdate(
          { userId },
          { $push: { products: { item: product } } },
          { new: true }
        );
        res.status(200).json(addedData);
      }
    } else {
      const newUser = await Cart.create({
        userId,
        products: { item: product },
      });
      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(400).json({ message: "There is Something Error on Database." });
    console.log(error);
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.userId;

    const data = await Cart.findOne({ userId: userId });
    res.status(200).json(data);
  } catch (error) {
    res
      .status(400)
      .json({ message: "There is Something Error on Getting Data." });
  }
};

export const setCartQuantity = async (req, res) => {
  try {
    const { id, info, quantity, cartId } = req.body;

    if (info === -1 && quantity === 1) {
      const data = await Cart.findOneAndUpdate(
        { _id: cartId },
        { $pull: { products: { _id: id } } },
        { new: true }
      );

      res.status(200).json({ data, message: "Product Removed." });
    } else {
      const product = await Cart.findOneAndUpdate(
        {
          _id: cartId,
          "products._id": id,
        },
        {
          $inc: { "products.$.quantity": info },
        },
        { new: true }
      );

      res.status(200).json(product);
    }
  } catch (error) {
    res.status(400).json({ message: "There is Something Error on Database." });
    console.log(error);
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const itemId = req.query.id;
    const userId = req.userId;

    const data = await Cart.findOneAndUpdate(
      {
        userId,
      },
      {
        $pull: { products: { _id: itemId } },
      },
      {
        new: true,
      }
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "There is Something Error on Database" });
    console.log(error);
  }
};

export const getCartItemsCount = async (req, res) => {
  try {
    const userId = req.userId;
    let count = null;
    const data = await Cart.findOne({
      userId,
    });
    if (data) {
      count = data.products.length;
    }
    res.status(200).json(count);
  } catch (error) {
    res.status(400).json({ message: "Fetching Data From Database Failed." });
  }
};

export const getCartTotal = async (req, res) => {
  try {
    const userId = req.userId;

    const data = await Cart.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) },
      },
      {
        $unwind: "$products",
      },
      {
        $project: { item: "$products.item", quantity: "$products.quantity" },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: {
              $multiply: [{ $toInt: "$item.price" }, { $toInt: "$quantity" }],
            },
          },
        },
      },
    ]).exec();
    res.status(200).json(data[0].total);
  } catch (error) {
    res
      .status(400)
      .json({ message: "There is Something Error on Fetching Data." });
  }
};

export const getCartProductsId = async (id) => {
  try {
    const data = await Cart.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(id) },
      },
      {
        $unwind: "$products",
      },
      {
        $group: {
          _id: "$_id",
          products: { $push: "$products.item" },
        },
      },
      {
        $unwind: "$products",
      },
      {
        $project: {
          products: 1,
          _id: 0,
        },
      },
    ]);
    return data.map((item) => item.products);
  } catch (error) {
    return error;
  }
};

export const setPlaceOrdering = async (req, res) => {
  try {
    const { cartId, address, pincode, mobile, paymentMethod, total } = req.body;
    const userId = req.userId;

    const products = await getCartProductsId(userId);
    
    let status = paymentMethod === "COD" ? "Placed" : "Pending";

    const order = await Order.create({
      userId,
      deliveryDetails: {
        address,
        pincode,
        mobile,
      },
      status,
      total,
      paymentMethod,
      products,
    }).then(async (data) => {
      if (status === "Pending") {
        const user = await User.findById(userId);
        const cart = await Cart.findById(cartId);
        const stripe = new Stripe(process.env.STRIPE_KEY);

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          success_url: `${process.env.CLIENT_URL}/checkout-success`,
          cancel_url: `${process.env.CLIENT_URL}/checkout-failure`,
          customer_email: user?.email,
          billing_address_collection: "required",
          line_items: cart.products?.map((obj) => ({
            price_data: {
              currency: "INR",
              unit_amount: obj.item?.price * 100,
              product_data: {
                name: obj.item?.title,
                description: obj.item?.category,
              },
            },
            quantity: obj.quantity,
          })),
        });
        res.status(200).json(session);
      }
      res.status(200).json(data);
      await Cart.findByIdAndDelete(cartId);
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "There is Something Error on Fetching Data." });
    console.log(error);
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = await req.userId;
    const data = await Order.find({
      userId: new mongoose.Types.ObjectId(userId),
    });
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(400)
      .json({ message: "There is Something Error on Fetching Data" });
  }
};


