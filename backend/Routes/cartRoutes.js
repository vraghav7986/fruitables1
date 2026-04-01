import express from 'express';
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart
} from '../Controller/cartController.js';
import { protect } from '../middleware/auth.js';  // ← corrected import

const router = express.Router();

router.use(protect); // all cart routes require authentication

router.get('/', getCart);
router.post('/add', addToCart);
router.delete('/remove/:productId', removeFromCart);
router.put('/update/:productId', updateCartItem);
router.delete('/clear', clearCart);

export default router;