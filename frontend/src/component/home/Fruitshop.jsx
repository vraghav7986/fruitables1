import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../CartContext';  // Fixed path
import axios from 'axios';

const API_URL = 'http://localhost:9999';

function Fruitshop() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
      setFilteredProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const filterByCategory = (category) => {
    setActiveTab(category);
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === category));
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  // Get category display names
  const getCategoryName = (cat) => {
    const map = {
      'all': 'All Products',
      'vegetables': 'Vegetables',
      'fruits': 'Fruits',
      'bread': 'Bread',
      'meat': 'Meat'
    };
    return map[cat] || cat;
  };

  if (loading) return <div className="container py-5 text-center">Loading products...</div>;

  return (
    <>
      <div className="container-fluid fruite py-5">
        <div className="container py-5">
          <div className="tab-class text-center">
            <div className="row g-4">
              <div className="col-lg-4 text-start">
                <h1>Our Organic Products</h1>
              </div>
              <div className="col-lg-8 text-end">
                <ul className="nav nav-pills d-inline-flex text-center mb-5">
                  {['all', 'vegetables', 'fruits', 'bread', 'meat'].map(cat => (
                    <li className="nav-item" key={cat}>
                      <button
                        className={`d-flex m-2 py-2 bg-light rounded-pill ${activeTab === cat ? 'active' : ''}`}
                        onClick={() => filterByCategory(cat)}
                        style={{ border: 'none', background: 'none' }}
                      >
                        <span className="text-dark" style={{ width: 130 }}>
                          {getCategoryName(cat)}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="tab-content">
              <div className="tab-pane fade show p-0 active">
                <div className="row g-4">
                  <div className="col-lg-12">
                    <div className="row g-4">
                      {filteredProducts.map(product => (
                        <div className="col-md-6 col-lg-4 col-xl-3" key={product._id}>
                          <div className="rounded position-relative fruite-item">
                            <div className="fruite-img">
                              <img
                                src={product.img}
                                className="img-fluid w-100 rounded-top"
                                alt={product.name}
                                style={{ height: '200px', objectFit: 'cover' }}
                              />
                            </div>
                            <div
                              className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                              style={{ top: 10, left: 10 }}
                            >
                              {product.category || 'General'}
                            </div>
                            <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                              <h4>{product.name}</h4>
                              <p>{product.description || 'Fresh organic product'}</p>
                              <div className="d-flex justify-content-between flex-lg-wrap">
                                <p className="text-dark fs-5 fw-bold mb-0">
                                  ${product.price.toFixed(2)} / kg
                                </p>
                                <button
                                  onClick={() => handleAddToCart(product)}
                                  className="btn border border-secondary rounded-pill px-3 text-primary"
                                >
                                  <i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      {filteredProducts.length === 0 && (
                        <div className="col-12 text-center">
                          <p>No products found in this category.</p>
                        </div>
                      )}
                    </div>
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

export default Fruitshop;