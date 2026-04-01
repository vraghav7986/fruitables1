import React, { useContext, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../CartContext';

function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { state: { message: 'Please login to view your cart.' } });
    }
  }, [navigate]);

  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  }, [cart]);

  const shipping = subtotal > 0 ? 5.99 : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <>
        <div className="container-fluid page-header py-5">
          <h1 className="text-center text-white display-6">Cart</h1>
        </div>
        <div className="container-fluid py-5">
          <div className="container py-5 text-center">
            <i className="fa fa-shopping-cart fa-4x mb-3 text-muted"></i>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link to="/shop" className="btn border border-secondary rounded-pill px-4 py-2 text-primary mt-3">
              Continue Shopping
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Cart</h1>
      </div>
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Products</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Handle</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => {
                  const itemPrice = item.price || 0;
                  const itemTotal = itemPrice * (item.quantity || 1);
                  const itemId = item.productId || item._id;
                  return (
                    <tr key={itemId}>
                      <td><img src={item.img} width="80" height="80" style={{ objectFit: 'cover' }} alt={item.name} /></td>
                      <td>{item.name}</td>
                      <td>${itemPrice.toFixed(2)}</td>
                      <td>
                        <div className="input-group quantity" style={{ width: 100 }}>
                          <button className="btn btn-sm btn-minus rounded-circle bg-light border" onClick={() => decreaseQty(itemId)}><i className="fa fa-minus" /></button>
                          <input type="text" className="form-control form-control-sm text-center border-0" value={item.quantity || 1} readOnly />
                          <button className="btn btn-sm btn-plus rounded-circle bg-light border" onClick={() => increaseQty(itemId)}><i className="fa fa-plus" /></button>
                        </div>
                      </td>
                      <td>${itemTotal.toFixed(2)}</td>
                      <td>
                        <button className="btn btn-sm btn-danger rounded-circle" onClick={() => removeFromCart(itemId)}><i className="fa fa-times" /></button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="row g-4 justify-content-end">
            <div className="col-8"></div>
            <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
              <div className="bg-light rounded">
                <div className="p-4">
                  <h5 className="mb-4">Cart Summary</h5>
                  <div className="d-flex justify-content-between mb-3"><p className="mb-0">Subtotal</p><p className="mb-0">${subtotal.toFixed(2)}</p></div>
                  <div className="d-flex justify-content-between mb-3"><p className="mb-0">Shipping</p><p className="mb-0">${shipping.toFixed(2)}</p></div>
                  <div className="d-flex justify-content-between mb-3"><p className="mb-0">Tax (10%)</p><p className="mb-0">${tax.toFixed(2)}</p></div>
                  <div className="d-flex justify-content-between mb-4"><h5 className="mb-0">Total</h5><h5 className="mb-0">${total.toFixed(2)}</h5></div>
                  <div className="d-flex gap-2">
                    <button onClick={clearCart} className="btn border-secondary text-primary rounded-pill px-4 py-2" style={{ backgroundColor: '#f8f9fa' }}>Clear Cart</button>
                    <Link to="/checkout" className="btn border border-secondary rounded-pill px-4 py-2 text-primary w-100">Proceed to Checkout</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;