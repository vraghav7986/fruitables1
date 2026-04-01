import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { CartContext } from '../../CartContext';
import axios from 'axios';
import { toast } from 'react-toastify';

import "swiper/css";
import "swiper/css/navigation";

const API_URL = "http://localhost:9999";

function Shopdetail() {
  const { id } = useParams();                // product id from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    // If no ID in URL, redirect to shop
    if (!id) {
      navigate('/shop');
      return;
    }
    fetchProduct();
  }, [id, navigate]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${API_URL}/products/${id}`);
      setProduct(res.data);
      // Fetch related products (same category, exclude current)
      const allRes = await axios.get(`${API_URL}/products`);
      const related = allRes.data.filter(
        p => p.category === res.data.category && p._id !== res.data._id
      );
      setRelatedProducts(related.slice(0, 8));
    } catch (err) {
      console.error('Error fetching product:', err);
      toast.error('Product not found');
      navigate('/shop'); // redirect if product not found
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  if (loading) {
    return <div className="container py-5 text-center">Loading...</div>;
  }

  if (!product) {
    return null; // will redirect in useEffect
  }

  return (
    <>
      {/* Single Page Header start */}
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Shop Detail</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/Shop">Shop</Link></li>
          <li className="breadcrumb-item active text-white">Shop Detail</li>
        </ol>
      </div>
      {/* Single Page Header End */}

      {/* Single Product Start */}
      <div className="container-fluid py-5 mt-5">
        <div className="container py-5">
          <div className="row g-4 mb-5">
            <div className="col-lg-8 col-xl-9">
              <div className="row g-4">
                <div className="col-lg-6">
                  <div className="border rounded">
                    <img
                      src={product.img}
                      className="img-fluid rounded w-100"
                      alt={product.name}
                      style={{ objectFit: 'cover', height: '100%' }}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <h4 className="fw-bold mb-3">{product.name}</h4>
                  <p className="mb-3">Category: {product.category || 'General'}</p>
                  <h5 className="fw-bold mb-3">${product.price.toFixed(2)}</h5>
                  <div className="d-flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className={`fa fa-star ${i < 4 ? 'text-secondary' : ''}`} />
                    ))}
                  </div>
                  <p className="mb-4">{product.description || 'Fresh organic product'}</p>
                  <div className="input-group quantity mb-5" style={{ width: 100 }}>
                    <div className="input-group-btn">
                      <button className="btn btn-sm btn-minus rounded-circle bg-light border" onClick={decreaseQty}>
                        <i className="fa fa-minus" />
                      </button>
                    </div>
                    <input
                      type="text"
                      className="form-control form-control-sm text-center border-0"
                      value={quantity}
                      readOnly
                    />
                    <div className="input-group-btn">
                      <button className="btn btn-sm btn-plus rounded-circle bg-light border" onClick={increaseQty}>
                        <i className="fa fa-plus" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"
                  >
                    <i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart
                  </button>
                </div>

                {/* Description & Reviews tabs – static content */}
                <div className="col-lg-12">
                  <nav>
                    <div className="nav nav-tabs mb-3">
                      <button className="nav-link active border-white border-bottom-0" type="button" role="tab" data-bs-toggle="tab" data-bs-target="#nav-about">
                        Description
                      </button>
                      <button className="nav-link border-white border-bottom-0" type="button" role="tab" data-bs-toggle="tab" data-bs-target="#nav-mission">
                        Reviews
                      </button>
                    </div>
                  </nav>
                  <div className="tab-content mb-5">
                    <div className="tab-pane active" id="nav-about" role="tabpanel">
                      <p>{product.description || 'No description available.'}</p>
                    </div>
                    <div className="tab-pane" id="nav-mission" role="tabpanel">
                      {/* Static reviews – you can later fetch reviews from backend */}
                      <p>Reviews will be shown here.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4 col-xl-3">
              <div className="row g-4 fruite">
                <div className="col-lg-12">
                  <div className="input-group w-100 mx-auto d-flex mb-4">
                    <input type="search" className="form-control p-3" placeholder="keywords" />
                    <span className="input-group-text p-3"><i className="fa fa-search" /></span>
                  </div>
                  <div className="mb-4">
                    <h4>Categories</h4>
                    <ul className="list-unstyled fruite-categorie">
                      {/* You can fetch categories dynamically */}
                      <li><div className="d-flex justify-content-between"><a href="#"><i className="fas fa-apple-alt me-2" />Fruits</a><span>(12)</span></div></li>
                      <li><div className="d-flex justify-content-between"><a href="#"><i className="fas fa-apple-alt me-2" />Vegetables</a><span>(8)</span></div></li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-12">
                  <h4 className="mb-4">Featured products</h4>
                  {/* Featured products – could fetch from API with a featured flag */}
                  {relatedProducts.slice(0, 3).map(item => (
                    <div key={item._id} className="d-flex align-items-center justify-content-start mb-3">
                      <div className="rounded" style={{ width: 100, height: 100, overflow: 'hidden' }}>
                        <img src={item.img} className="img-fluid rounded" alt={item.name} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                      </div>
                      <div className="ms-3">
                        <h6 className="mb-2">{item.name}</h6>
                        <div className="d-flex mb-2">
                          {[...Array(4)].map((_, i) => <i key={i} className="fa fa-star text-secondary" />)}
                          <i className="fa fa-star" />
                        </div>
                        <div className="d-flex mb-2">
                          <h5 className="fw-bold me-2">${item.price.toFixed(2)}</h5>
                          <h5 className="text-danger text-decoration-line-through">${(item.price * 1.2).toFixed(2)}</h5>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="d-flex justify-content-center my-4">
                    <Link to="/Shop" className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100">View More</Link>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="position-relative">
                    <img src="/img/banner-fruits.jpg" className="img-fluid w-100 rounded" alt="" />
                    <div className="position-absolute" style={{ top: '50%', right: 10, transform: 'translateY(-50%)' }}>
                      <h3 className="text-secondary fw-bold">Fresh <br /> Fruits <br /> Banner</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related products slider */}
          <h1 className="fw-bold mb-5">Related products</h1>
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            navigation
            autoplay={{ delay: 3000 }}
            breakpoints={{
              0: { slidesPerView: 1 },
              576: { slidesPerView: 2 },
              992: { slidesPerView: 4 },
            }}
          >
            {relatedProducts.map((item) => (
              <SwiperSlide key={item._id}>
                <div className="border border-primary rounded position-relative vesitable-item" style={{ height: '420px', display: 'flex', flexDirection: 'column' }}>
                  <div className="vesitable-img" style={{ height: '200px', overflow: 'hidden' }}>
                    <img src={item.img} className="img-fluid w-100 h-100" alt={item.name} style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>
                    {item.category || 'Product'}
                  </div>
                  <div className="p-3 rounded-bottom" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h5 className="mb-1">{item.name}</h5>
                    <p className="small text-muted mb-2" style={{ overflow: 'hidden', textOverflow: 'ellipsis', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {item.description || 'Fresh organic product'}
                    </p>
                    <div className="mt-auto d-flex justify-content-between align-items-center flex-wrap">
                      <p className="text-dark fw-bold mb-0">${item.price.toFixed(2)} / kg</p>
                      <button onClick={() => addToCart(item, 1)} className="btn border border-secondary rounded-pill px-3 text-primary">
                        <i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {/* Single Product End */}
    </>
  );
}

export default Shopdetail;