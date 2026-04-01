import React, { useState, useEffect, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { CartContext } from "../../CartContext";
import axios from "axios";

import "swiper/css";
import "swiper/css/navigation";

const API_URL = "http://localhost:9999";

function Vegetables() {
  const [vegetables, setVegetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchVegetables();
  }, []);

  const fetchVegetables = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      // Filter products where category is "vegetables" (adjust if needed)
      const vegProducts = response.data.filter(
        (p) => p.category?.toLowerCase() === "vegetables"
      );
      setVegetables(vegProducts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching vegetables:", error);
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  if (loading) return <div className="container py-5 text-center">Loading vegetables...</div>;

  return (
    <div className="container-fluid vesitable py-5">
      <div className="container py-5">
        <h1 className="mb-4">Fresh Organic Vegetables</h1>

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
          {vegetables.map((item) => (
            <SwiperSlide key={item._id}>
              <div className="border border-primary rounded position-relative vesitable-item">
                <div className="vesitable-img">
                  <img
                    src={item.img}
                    className="img-fluid w-100 rounded-top"
                    alt={item.name}
                  />
                </div>

                <div
                  className="text-white bg-primary px-3 py-1 rounded position-absolute"
                  style={{ top: 10, right: 10 }}
                >
                  Vegetable
                </div>

                <div className="p-4 rounded-bottom">
                  <h4>{item.name}</h4>
                  <p>{item.description || "Fresh organic vegetable"}</p>
                  <div className="d-flex justify-content-between flex-lg-wrap">
                    <p className="text-dark fs-5 fw-bold mb-0">
                      ${item.price.toFixed(2)} / kg
                    </p>
                    <button
                      className="btn border border-secondary rounded-pill px-3 text-primary"
                      onClick={() => handleAddToCart(item)}
                    >
                      <i className="fa fa-shopping-bag me-2 text-primary" />
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Vegetables;