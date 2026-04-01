import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customer: {
    firstName: String,
    lastName: String,
    email: String,
    mobile: String,
    address: String,
    city: String,
    country: String,
    postcode: String
  },
  items: [{
    id: String,
    name: String,
    price: Number,
    quantity: Number,
    img: String
  }],
  subtotal: Number,
  shipping: Number,
  total: Number,
  paymentMethod: String,
  orderNotes: String,
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
  }
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;