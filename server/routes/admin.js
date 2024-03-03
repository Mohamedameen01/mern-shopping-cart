import express from 'express';

import { login } from '../controllers/admin.js';

const router = express.Router();

router.post('/signin', login);

router.post('/add-product', addProduct);

export default router;