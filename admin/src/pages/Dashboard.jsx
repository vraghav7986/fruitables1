import { useEffect, useState } from 'react';
import api from '../api';
import Layout from '../components/Layout';

const Dashboard = () => {
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          api.get('/products'),
          api.get('/orders')
        ]);
        const products = productsRes.data;
        const orders = ordersRes.data;
        const revenue = orders.reduce((sum, order) => sum + order.total, 0);
        setStats({
          products: products.length,
          orders: orders.length,
          revenue
        });
        setRecentOrders(orders.slice(-5).reverse());
      } catch (err) {
        console.error('Failed to fetch data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getStatusBadge = (status) => {
    const colors = {
      pending: 'warning',
      processing: 'info',
      shipped: 'primary',
      delivered: 'success',
      cancelled: 'danger'
    };
    return colors[status] || 'secondary';
  };

  if (loading) return <Layout><div className="text-center">Loading...</div></Layout>;

  return (
    <Layout>
      <h1 className="mb-4">Dashboard</h1>
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h5 className="card-title">Products</h5>
              <h2 className="card-text">{stats.products}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5 className="card-title">Orders</h5>
              <h2 className="card-text">{stats.orders}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <h5 className="card-title">Revenue</h5>
              <h2 className="card-text">${stats.revenue.toFixed(2)}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h5>Recent Orders</h5>
        </div>
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
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.customer.firstName} {order.customer.lastName}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>${order.total.toFixed(2)}</td>
                    <td>
                      <span className={`badge bg-${getStatusBadge(order.status)}`}>
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
                {recentOrders.length === 0 && (
                  <tr><td colSpan="5" className="text-center">No orders found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;