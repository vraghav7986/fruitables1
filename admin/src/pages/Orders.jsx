import { useState, useEffect } from 'react';
import api from '../api';
import Layout from '../components/Layout';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get('/orders');
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to load orders:', err);
      alert('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await api.put(`/orders/${id}/status`, { status: newStatus });
      await loadOrders(); // refresh list
    } catch (err) {
      console.error('Update status error:', err);
      let errorMsg = 'Failed to update status';
      if (err.response?.data?.error) {
        errorMsg += `: ${err.response.data.error}`;
      }
      alert(errorMsg);
    }
  };

  const statusOptions = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  const getStatusBadge = (status) => {
    const colors = {
      pending: 'warning',
      processing: 'info',
      shipped: 'primary',
      delivered: 'success',
      cancelled: 'danger'
    };
    return <span className={`badge bg-${colors[status]}`}>{status.toUpperCase()}</span>;
  };

  return (
    <Layout>
      <h1 className="mb-4">Orders</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id}>
                      <td>#{order._id}</td>
                      <td>
                        {order.customer.firstName} {order.customer.lastName}<br />
                        <small>{order.customer.email}</small>
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>${order.total.toFixed(2)}</td>
                      <td>{getStatusBadge(order.status)}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-info me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#orderDetailsModal"
                          onClick={() => setSelectedOrder(order)}
                        >
                          View
                        </button>
                        <select
                          className="form-select form-select-sm d-inline-block w-auto"
                          value={order.status}
                          onChange={(e) => updateStatus(order._id, e.target.value)}
                        >
                          {statusOptions.map(opt => (
                            <option key={opt} value={opt}>{opt.toUpperCase()}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr><td colSpan="6" className="text-center">No orders found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      <div className="modal fade" id="orderDetailsModal" tabIndex="-1" aria-labelledby="orderDetailsModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="orderDetailsModalLabel">Order Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {selectedOrder && (
                <>
                  <h6>Order #{selectedOrder._id}</h6>
                  <p><strong>Customer:</strong> {selectedOrder.customer.firstName} {selectedOrder.customer.lastName}</p>
                  <p><strong>Email:</strong> {selectedOrder.customer.email}</p>
                  <p><strong>Address:</strong> {selectedOrder.customer.address}, {selectedOrder.customer.city}, {selectedOrder.customer.country} {selectedOrder.customer.postcode}</p>
                  <p><strong>Mobile:</strong> {selectedOrder.customer.mobile}</p>
                  <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
                  <p><strong>Order Notes:</strong> {selectedOrder.orderNotes || 'N/A'}</p>
                  <hr />
                  <h6>Items</h6>
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.name}</td>
                          <td>${item.price.toFixed(2)}</td>
                          <td>{item.quantity}</td>
                          <td>${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th colSpan="3" className="text-end">Subtotal:</th>
                        <th>${selectedOrder.subtotal.toFixed(2)}</th>
                      </tr>
                      <tr>
                        <th colSpan="3" className="text-end">Shipping:</th>
                        <th>${selectedOrder.shipping.toFixed(2)}</th>
                      </tr>
                      <tr>
                        <th colSpan="3" className="text-end">Total:</th>
                        <th>${selectedOrder.total.toFixed(2)}</th>
                      </tr>
                    </tfoot>
                  </table>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;