import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../CartContext';
import axios from 'axios';

function Bestsaler() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

 const API_URL = "https://fruitables-backend-n8nj.onrender.com";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      // For demo, we take first 10 products or all if less.
      setProducts(response.data.slice(0, 10));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Split products: first 6 for row layout, next 4 for stacked layout
  const rowProducts = products.slice(0, 6);
  const stackedProducts = products.slice(6, 10);

  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: 700 }}>
          <h1 className="display-4">Bestseller Products</h1>
          <p>
            Latin words, combined with a handful of model sentence structures, to
            generate Lorem Ipsum which looks reasonable.
          </p>
        </div>

        {/* Row layout (image left, details right) */}
        <div className="row g-4">
          {rowProducts.map((product) => (
            <div key={product._id} className="col-lg-6 col-xl-4">
              <div className="p-4 rounded bg-light h-100">
                <div className="row align-items-center h-100">
                  <div className="col-6">
                    <img
                      src={product.img}
                      className="img-fluid w-100"
                      alt={product.name}
                      style={{
                        aspectRatio: '1 / 1',
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                    />
                  </div>
                  <div className="col-6">
                    <a href="#" className="h5 text-decoration-none text-dark">
                      {product.name}
                    </a>
                    <div className="d-flex my-3">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fas fa-star ${i < 4 ? 'text-primary' : ''}`}
                        />
                      ))}
                    </div>
                    <h4 className="mb-3">${product.price.toFixed(2)}</h4>
                    <button
                      onClick={() => addToCart(product)}
                      className="btn border border-secondary rounded-pill px-3 text-primary"
                    >
                      <i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stacked layout (image above details) */}
        <div className="row g-4 mt-4">
          {stackedProducts.map((product) => (
            <div key={product._id} className="col-md-6 col-lg-6 col-xl-3">
              <div className="text-center h-100 d-flex flex-column">
                <img
                  src={product.img}
                  className="img-fluid rounded"
                  alt={product.name}
                  style={{
                    aspectRatio: '1 / 1',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    width: '100%',
                  }}
                />
                <div className="py-4 flex-grow-1">
                  <a href="#" className="h5 text-decoration-none text-dark">
                    {product.name}
                  </a>
                  <div className="d-flex my-3 justify-content-center">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fas fa-star ${i < 4 ? 'text-primary' : ''}`}
                      />
                    ))}
                  </div>
                  <h4 className="mb-3">${product.price.toFixed(2)}</h4>
                  <button
                    onClick={() => addToCart(product)}
                    className="btn border border-secondary rounded-pill px-3 text-primary"
                  >
                    <i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Bestsaler;