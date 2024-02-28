import express from 'express';

import { login } from '../controllers/admin.js';

const router = express.Router();

router.post('/signin', login);

export default router;