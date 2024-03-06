import express from 'express';

import { addProduct, getProducts, login, updateProduct } from '../controllers/admin.js';

const router = express.Router();

// Admin Auth:
router.post('/signin', login);

// Admin Product:
router.get('/', getProducts);
router.post('/add-product', addProduct);
router.patch('/edit-product', updateProduct);
export default router;