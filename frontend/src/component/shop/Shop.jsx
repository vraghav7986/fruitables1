import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../CartContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function Shop() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  const API_URL = 'http://localhost:9999';

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = [...products];
    
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.category === selectedCategory
      );
    }
    
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const categories = ['all', ...new Set(products.map(p => p.category))];

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Shop</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item"><a href="#">Pages</a></li>
          <li className="breadcrumb-item active text-white">Shop</li>
        </ol>
      </div>

      <div className="container-fluid fruite py-5">
        <div className="container py-5">
          <h1 className="mb-4">Fresh fruits shop</h1>
          <div className="row g-4">
            <div className="col-lg-12">
              <div className="row g-4">
                <div className="col-xl-3">
                  <div className="input-group w-100 mx-auto d-flex">
                    <input
                      type="search"
                      className="form-control p-3"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="input-group-text p-3">
                      <i className="fa fa-search" />
                    </span>
                  </div>
                </div>
                <div className="col-6" />
                <div className="col-xl-3">
                  <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                    <label htmlFor="category">Category:</label>
                    <select
                      id="category"
                      className="border-0 form-select-sm bg-light me-3"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>
                          {cat === 'all' ? 'All Categories' : cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="row g-4">
                <div className="col-lg-3">
                  <div className="row g-4">
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <h4>Categories</h4>
                        <ul className="list-unstyled fruite-categorie">
                          {categories.map(cat => (
                            <li key={cat}>
                              <div className="d-flex justify-content-between fruite-name">
                                <a 
                                  href="#" 
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedCategory(cat);
                                  }}
                                  style={{ cursor: 'pointer' }}
                                >
                                  <i className="fas fa-apple-alt me-2" />
                                  {cat === 'all' ? 'All Products' : cat}
                                </a>
                                <span>
                                  ({cat === 'all' ? products.length : products.filter(p => p.category === cat).length})
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-9">
                  <div className="row g-4 justify-content-center">
                    {filteredProducts.length === 0 ? (
                      <div className="col-12 text-center py-5">
                        <h4>No products found</h4>
                        <p>Try adjusting your search or filter</p>
                      </div>
                    ) : (
                      filteredProducts.map((product) => (
                        <div className="col-md-6 col-lg-6 col-xl-4" key={product._id}>
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
                              {product.category}
                            </div>
                            <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                              <h4>{product.name}</h4>
                              <p className="small text-muted">{product.description.substring(0, 80)}...</p>
                              <div className="d-flex justify-content-between align-items-center flex-wrap">
                                <p className="text-dark fs-5 fw-bold mb-0">
                                  ${product.price.toFixed(2)} / kg
                                </p>
                                <button
                                  onClick={() => handleAddToCart(product)}
                                  className="btn border border-secondary rounded-pill px-3 text-primary"
                                  disabled={product.stock === 0}
                                >
                                  <i className="fa fa-shopping-bag me-2 text-primary" />
                                  {product.stock === 0 ? 'Out of Stock' : 'Add to cart'}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
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

export default Shop;