import express from 'express';
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus
} from '../Controller/orderController.js';
import { adminProtect } from '../middleware/adminAuth.js'; // <-- import adminProtect

const router = express.Router();

router.route('/')
  .get(adminProtect, getOrders)   // <-- adminProtect
  .post(createOrder);

router.route('/:id')
  .get(adminProtect, getOrderById);

router.route('/:id/status')
  .put(adminProtect, updateOrderStatus);

export default router;