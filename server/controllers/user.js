import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/user/authSchema.js";

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
    
  } catch (error) {
    res.status(400).json({ message: "There is Something Error on Database." });
    console.log(error);
  }
};
