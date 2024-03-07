import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import Admin from "../models/admin/authSchema.js";
import Product from "../models/admin/productSchema.js";
import User from "../models/user/authSchema.js";

dotenv.config();
// Auth:

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      res.status(404).json({ message: "You are not allowed.Admin only." });
    } else {
      bcrypt.compare(password, admin.password).then(async (status) => {
        if (!status) {
          res.status(401).json({ message: "Invalid Credentials." });
        } else {
          const token = await jwt.sign(
            { email: admin.email, id: admin._id },
            process.env.JWT_CODE,
            { expiresIn: "2 days" }
          );
          res.status(200).json({ data: admin, token });
        }
      });
    }
  } catch (error) {
    res.status(400).json({ message: "Login Failed." });
  }
};

export const getProducts = async (req, res) => {
  try {
    const data = await Product.find();
    res.status(200).json(data);
  } catch (error) {
    res
      .status(400)
      .json({ message: "There is Something Error Fetching Products" });
  }
};

export const addProduct = async (req, res) => {
  try {
    const data = await Product.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: "Uploding Failed." });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { _id, title, description, category, price, image } = req.body;
    const product = await Product.findByIdAndUpdate(
      _id,
      { title, description, category, image, price },
      {
        new: true,
      }
    );
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: "Can't Update Your Data" });
    console.log(error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await Product.findByIdAndDelete(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({messge: "Can't Delete Selected Product."})
  }
}

export const getUsers = async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({message: 'There is Something Error on Database.'})
  }
}