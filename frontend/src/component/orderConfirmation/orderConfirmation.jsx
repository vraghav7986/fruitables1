import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function OrderConfirmation() {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Order Confirmation</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/shop">Shop</Link></li>
          <li className="breadcrumb-item active text-white">Confirmation</li>
        </ol>
      </div>

      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="text-center mb-5">
            <i className="fa fa-check-circle text-success" style={{ fontSize: '80px' }}></i>
            <h2 className="mt-3">Thank You for Your Order!</h2>
            <p className="lead">Your order has been placed successfully.</p>
          </div>

          {order && (
            <div className="card">
              <div className="card-header bg-light">
                <h5>Order Details</h5>
              </div>
              <div className="card-body">
                <p><strong>Order ID:</strong> #{order._id}</p>
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                <hr />
                <h6>Items</h6>
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.name}</td>
                          <td>${item.price.toFixed(2)}</td>
                          <td>{item.quantity}</td>
                          <td>${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <hr />
                <p><strong>Shipping Address:</strong> {order.customer.address}, {order.customer.city}, {order.customer.country} {order.customer.postcode}</p>
                <p><strong>Email:</strong> {order.customer.email}</p>
                {order.orderNotes && <p><strong>Notes:</strong> {order.orderNotes}</p>}
              </div>
            </div>
          )}

          <div className="text-center mt-5">
            <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderConfirmation;