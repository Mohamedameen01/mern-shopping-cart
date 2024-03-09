import express from "express";

import { register, login, addToCart, getCart } from "../controllers/user.js";
import { verifyUserLogin } from "../middleware/index.js";

const router = express.Router();

// Auth:
router.post("/signup", register);
router.post("/signin", login);

// Cart:
router.post("/cart/",verifyUserLogin, addToCart);
router.get('/cart',verifyUserLogin, getCart);

export default router;
