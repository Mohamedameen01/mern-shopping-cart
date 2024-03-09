import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/user/authSchema.js";
import Product from "../models/admin/productSchema.js";
import Cart from "../models/user/cartSchema.js";

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

    const user = await Cart.findOne({ userId });

    if (user) {
      let isProduct = await Cart.findOne({ "products.item": productId });
      if (isProduct) {
        const incData = await Cart.findOneAndUpdate(
          { "products.item": productId },
          { $inc: { "products.$.quantity": 1 } },
          { new: true }
        );
        res.status(200).json(incData);
      } else {
        const addedData = await Cart.findOneAndUpdate(
          { userId },
          { $push: { products: { item: productId } } },
          { new: true }
        );
        res.status(200).json(addedData);
      }
    } else {
      const newUser = await Cart.create({
        userId,
        products: { item: productId },
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

    const data = await Cart.aggregate([
      {
        $match: { userId },
      },
      {
        $unwind: "$products",
      },
      {
        $project: {
          item: "$products.item",
          quantity: "$products.quantity",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "item",
          foreignField: "_id",
          as: "products",
        },
      },
      {
        $project: {
          item: 1,
          quantity: 1,
          product: { $arrayElemAt: ["$products", 0] },
        },
      },
      {
        $group: {
          _id: "$_id",
          items: {
            $push: {
              item: "$item",
              quantity: "$quantity",
              product: "$product",
            },
          },
          total: { $sum: { $multiply: ["$quantity", "$product.price"] } },
        },
      },
      
    ]).exec();
    res.status(200).json(data);
  } catch (error) {
    res
      .status(400)
      .json({ message: "There is Something Error on Getting Data." });
  }
};

