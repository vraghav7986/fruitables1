import { useState, useEffect } from 'react';
import api from '../api';
import Layout from '../components/Layout';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    price: '',
    img: '',
    description: '',
    category: 'general' // default category
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // List of categories for the dropdown
  const categories = [
    'general',
    'fruits',
    'vegetables',
    'bread',
    'meat'
  ];

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to load products', err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const productData = {
        ...form,
        price: parseFloat(form.price)
      };
      if (editingId) {
        await api.put(`/products/${editingId}`, productData);
      } else {
        await api.post('/products', productData);
      }
      setForm({
        name: '',
        price: '',
        img: '',
        description: '',
        category: 'general'
      });
      setEditingId(null);
      await loadProducts();
    } catch (err) {
      console.error('Save error', err);
      setError(err.response?.data?.error || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      price: product.price,
      img: product.img,
      description: product.description || '',
      category: product.category || 'general'
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      await loadProducts();
    } catch (err) {
      console.error('Delete error', err);
      alert('Failed to delete product');
    }
  };

  return (
    <Layout>
      <h1 className="mb-4">Products</h1>
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-header">
              <h5>{editingId ? 'Edit Product' : 'Add New Product'}</h5>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    step="0.01"
                    className="form-control"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Image URL</label>
                  <input
                    type="text"
                    name="img"
                    className="form-control"
                    value={form.img}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    name="category"
                    className="form-select"
                    value={form.category}
                    onChange={handleChange}
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    rows="2"
                    value={form.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? 'Saving...' : (editingId ? 'Update' : 'Add')}
                </button>
                {editingId && (
                  <button
                    type="button"
                    className="btn btn-secondary w-100 mt-2"
                    onClick={() => {
                      setEditingId(null);
                      setForm({
                        name: '',
                        price: '',
                        img: '',
                        description: '',
                        category: 'general'
                      });
                    }}
                  >
                    Cancel
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5>Product List</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product._id}>
                        <td>
                          <img src={product.img} width="50" height="50" style={{ objectFit: 'cover' }} alt="" />
                        </td>
                        <td>{product.name}</td>
                        <td>{product.category || 'general'}</td>
                        <td>${product.price.toFixed(2)}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary me-2"
                            onClick={() => handleEdit(product)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(product._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;