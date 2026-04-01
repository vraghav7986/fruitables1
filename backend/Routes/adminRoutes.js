import express from 'express';
import { loginAdmin } from '../Controller/authController.js';

const router = express.Router();

router.post('/login', loginAdmin);

export default router;