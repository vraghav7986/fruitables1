import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../Controller/productController.js';
import { adminProtect } from '../middleware/adminAuth.js'; // <-- import adminProtect

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// Admin-only routes – use adminProtect
router.post('/', adminProtect, createProduct);
router.put('/:id', adminProtect, updateProduct);
router.delete('/:id', adminProtect, deleteProduct);

export default router;