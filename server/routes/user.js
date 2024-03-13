import express from "express";

import { register, login, addToCart, getCart, setCartQuantity, removeFromCart, getCartItemsCount, getCartTotal } from "../controllers/user.js";
import { verifyUserLogin } from "../middleware/index.js";

const router = express.Router();

// Auth:
router.post("/signup", register);
router.post("/signin", login);

// Cart:
router.post("/cart/",verifyUserLogin, addToCart);
router.get('/cart',verifyUserLogin, getCart);
router.patch('/cart',verifyUserLogin, setCartQuantity);
router.delete('/cart/',verifyUserLogin,removeFromCart);
router.get('/cart-count',verifyUserLogin,getCartItemsCount);
router.get('/cart-amount',verifyUserLogin,getCartTotal);

export default router;
