import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";


const TESTIMONIALS = [
  {
    id: 1,
    text:
      "Lorem Ipsum is simply dummy text of the printing Ipsum has been the industry's standard dummy text ever since the 1500s.",
    name: "Client Name",
    role: "Profession",
    img: "/img/testimonial-1.jpg",
    rating: 4,
  },
  {
    id: 2,
    text:
      "Lorem Ipsum is simply dummy text of the printing Ipsum has been the industry's standard dummy text ever since the 1500s.",
    name: "Client Name",
    role: "Profession",
    img: "/img/testimonial-1.jpg",
    rating: 5,
  },
  {
    id: 3,
    text:
      "Lorem Ipsum is simply dummy text of the printing Ipsum has been the industry's standard dummy text ever since the 1500s.",
    name: "Client Name",
    role: "Profession",
    img: "/img/testimonial-1.jpg",
    rating: 5,
  },
];


function TestimonialCard({ item }) {
  return (
    <div className="testimonial-item img-border-radius bg-light rounded p-4 mt-5">
      <div className="position-relative">
        <i
          className="fa fa-quote-right fa-2x text-secondary position-absolute"
          style={{ bottom: 30, right: 0 }}
        />

        <div className="mb-4 pb-4 border-bottom border-secondary">
          <p className="mb-0">{item.text}</p>
        </div>

        <div className="d-flex align-items-center">
          <div className="bg-secondary rounded">
            <img
              src={item.img}
              alt={item.name}
              className="img-fluid rounded"
              style={{ width: 100, height: 100 }}
            />
          </div>

          <div className="ms-4">
            <h4 className="text-dark">{item.name}</h4>
            <p className="m-0 pb-3">{item.role}</p>

            <div className="d-flex">
              {[...Array(5)].map((_, i) => (
                <i
                  key={i}
                  className={`fas fa-star ${
                    i < item.rating ? "text-primary" : ""
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default function Testimonials() {
  return (
    <section className="container-fluid testimonial py-5">
      <div className="container py-5">

        <div className="testimonial-header text-center">
          <h4 className="text-primary">Our Testimonial</h4>
          <h1 className="display-5 mb-5 text-dark">Our Client Saying!</h1>
        </div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 4000 }}
          spaceBetween={30}
          breakpoints={{
            0: { slidesPerView: 1 },
            992: { slidesPerView: 2 },
          }}
        >
          {TESTIMONIALS.map((item) => (
            <SwiperSlide key={item.id}>
              <TestimonialCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}
