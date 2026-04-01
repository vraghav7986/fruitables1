import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../CartContext';
import axios from 'axios';

const API_URL = 'http://localhost:9999';

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { state: { message: 'Please login to checkout.' } });
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    city: '',
    country: '',
    postcode: '',
    mobile: '',
    email: '',
    orderNotes: '',
    shipToDifferent: false,
    shippingMethod: 'free',
    paymentMethod: 'bank',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const shippingCost = formData.shippingMethod === 'free' ? 0
                     : formData.shippingMethod === 'flat' ? 15
                     : 8;
  const total = subtotal + shippingCost;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleShippingChange = (method) => {
    setFormData(prev => ({ ...prev, shippingMethod: method }));
  };

  const handlePaymentChange = (method) => {
    setFormData(prev => ({ ...prev, paymentMethod: method }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    const orderData = {
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        company: formData.company,
        address: formData.address,
        city: formData.city,
        country: formData.country,
        postcode: formData.postcode,
        mobile: formData.mobile,
        email: formData.email,
      },
      items: cart.map(item => ({
        id: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        img: item.img,
      })),
      subtotal,
      shipping: shippingCost,
      total,
      paymentMethod: formData.paymentMethod,
      orderNotes: formData.orderNotes,
    };

    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      const response = await axios.post(`${API_URL}/orders`, orderData, config);
      clearCart();
      navigate('/order-confirmation', { state: { order: response.data } });
    } catch (err) {
      console.error('Order submission error:', err);
      setError(err.response?.data?.error || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <>
        <div className="container-fluid page-header py-5">
          <h1 className="text-center text-white display-6">Checkout</h1>
          <ol className="breadcrumb justify-content-center mb-0">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/pages">Pages</Link></li>
            <li className="breadcrumb-item active text-white">Checkout</li>
          </ol>
        </div>
        <div className="container-fluid py-5">
          <div className="container py-5 text-center">
            <h3>Your cart is empty</h3>
            <p>Please add items to your cart before checking out.</p>
            <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Checkout</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/pages">Pages</Link></li>
          <li className="breadcrumb-item active text-white">Checkout</li>
        </ol>
      </div>

      <div className="container-fluid py-5">
        <div className="container py-5">
          <h1 className="mb-4">Billing details</h1>
          <form onSubmit={handleSubmit}>
            <div className="row g-5">
              <div className="col-md-12 col-lg-6 col-xl-7">
                {/* Billing details fields (unchanged) */}
                <div className="row">
                  <div className="col-md-12 col-lg-6">
                    <div className="form-item w-100">
                      <label className="form-label my-3">First Name<sup>*</sup></label>
                      <input type="text" name="firstName" className="form-control" value={formData.firstName} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-6">
                    <div className="form-item w-100">
                      <label className="form-label my-3">Last Name<sup>*</sup></label>
                      <input type="text" name="lastName" className="form-control" value={formData.lastName} onChange={handleChange} required />
                    </div>
                  </div>
                </div>
                <div className="form-item">
                  <label className="form-label my-3">Company Name</label>
                  <input type="text" name="company" className="form-control" value={formData.company} onChange={handleChange} />
                </div>
                <div className="form-item">
                  <label className="form-label my-3">Address<sup>*</sup></label>
                  <input type="text" name="address" className="form-control" placeholder="House Number Street Name" value={formData.address} onChange={handleChange} required />
                </div>
                <div className="form-item">
                  <label className="form-label my-3">Town/City<sup>*</sup></label>
                  <input type="text" name="city" className="form-control" value={formData.city} onChange={handleChange} required />
                </div>
                <div className="form-item">
                  <label className="form-label my-3">Country<sup>*</sup></label>
                  <input type="text" name="country" className="form-control" value={formData.country} onChange={handleChange} required />
                </div>
                <div className="form-item">
                  <label className="form-label my-3">Postcode/Zip<sup>*</sup></label>
                  <input type="text" name="postcode" className="form-control" value={formData.postcode} onChange={handleChange} required />
                </div>
                <div className="form-item">
                  <label className="form-label my-3">Mobile<sup>*</sup></label>
                  <input type="tel" name="mobile" className="form-control" value={formData.mobile} onChange={handleChange} required />
                </div>
                <div className="form-item">
                  <label className="form-label my-3">Email Address<sup>*</sup></label>
                  <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-check my-3">
                  <input type="checkbox" className="form-check-input" id="Account-1" name="Accounts" />
                  <label className="form-check-label" htmlFor="Account-1">Create an account?</label>
                </div>
                <hr />
                <div className="form-check my-3">
                  <input type="checkbox" className="form-check-input" id="Address-1" name="shipToDifferent" checked={formData.shipToDifferent} onChange={handleChange} />
                  <label className="form-check-label" htmlFor="Address-1">Ship to a different address?</label>
                </div>
                <div className="form-item">
                  <textarea name="orderNotes" className="form-control" cols={30} rows={11} placeholder="Order Notes (Optional)" value={formData.orderNotes} onChange={handleChange} />
                </div>
              </div>

              <div className="col-md-12 col-lg-6 col-xl-5">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr><th>Products</th><th>Name</th><th>Price</th><th>Quantity</th><th>Total</th></tr>
                    </thead>
                    <tbody>
                      {cart.map(item => (
                        <tr key={item._id}>
                          <th><img src={item.img} className="img-fluid rounded-circle" style={{ width: 90, height: 90 }} alt={item.name} /></th>
                          <td>{item.name}</td>
                          <td>${item.price.toFixed(2)}</td>
                          <td>{item.quantity || 1}</td>
                          <td>${(item.price * (item.quantity || 1)).toFixed(2)}</td>
                        </tr>
                      ))}
                      <tr><th></th><td></td><td></td><td>Subtotal</td><td>${subtotal.toFixed(2)}</td></tr>
                      <tr>
                        <th></th><td>Shipping</td><td colSpan="3">
                          <div className="form-check"><input type="radio" id="Shipping-1" name="shippingMethod" value="free" checked={formData.shippingMethod === 'free'} onChange={() => handleShippingChange('free')} /><label>Free Shipping</label></div>
                          <div className="form-check"><input type="radio" id="Shipping-2" name="shippingMethod" value="flat" checked={formData.shippingMethod === 'flat'} onChange={() => handleShippingChange('flat')} /><label>Flat rate: $15.00</label></div>
                          <div className="form-check"><input type="radio" id="Shipping-3" name="shippingMethod" value="pickup" checked={formData.shippingMethod === 'pickup'} onChange={() => handleShippingChange('pickup')} /><label>Local Pickup: $8.00</label></div>
                        </td>
                      </tr>
                      <tr><th></th><td><strong>TOTAL</strong></td><td></td><td></td><td>${total.toFixed(2)}</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="row g-4 border-bottom py-3"><div className="col-12">
                  <div className="form-check"><input type="radio" id="Transfer-1" name="paymentMethod" value="bank" checked={formData.paymentMethod === 'bank'} onChange={() => handlePaymentChange('bank')} /><label>Direct Bank Transfer</label></div>
                  <p>Make your payment directly into our bank account...</p>
                </div></div>
                <div className="row g-4 border-bottom py-3"><div className="col-12">
                  <div className="form-check"><input type="radio" id="Payments-1" name="paymentMethod" value="check" checked={formData.paymentMethod === 'check'} onChange={() => handlePaymentChange('check')} /><label>Check Payments</label></div>
                </div></div>
                <div className="row g-4 border-bottom py-3"><div className="col-12">
                  <div className="form-check"><input type="radio" id="Delivery-1" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={() => handlePaymentChange('cod')} /><label>Cash On Delivery</label></div>
                </div></div>
                <div className="row g-4 border-bottom py-3"><div className="col-12">
                  <div className="form-check"><input type="radio" id="Paypal-1" name="paymentMethod" value="paypal" checked={formData.paymentMethod === 'paypal'} onChange={() => handlePaymentChange('paypal')} /><label>Paypal</label></div>
                </div></div>
                <div className="row g-4 pt-4"><div className="col-12">
                  <button type="submit" className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary" disabled={loading}>{loading ? 'Placing Order...' : 'Place Order'}</button>
                </div></div>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Checkout;