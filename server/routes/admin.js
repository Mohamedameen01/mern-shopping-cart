import express from 'express';

import { addProduct, deleteProduct, getProducts, login, updateProduct, getUsers } from '../controllers/admin.js';

const router = express.Router();

// Admin Auth:
router.post('/signin', login);

// Admin Product:
router.get('/', getProducts);
router.post('/add-product', addProduct);
router.patch('/edit-product', updateProduct);
router.delete('/delete-product/', deleteProduct);
router.get('/all-users', getUsers);

export default router;