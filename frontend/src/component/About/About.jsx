import React from 'react'

function About() {
  return (
   <>
   <>
  {/* About Start */}
  <section className="about-section">
    <div className="container">
      <div className="about-wrapper">
        {/* Left Image */}
        <div className="about-image">
          <img src="img/abouut.jpg" alt="Fresh Fruits and Vegetables" />
        </div>
        {/* Right Content */}
        <div className="about-content">
          <span className="about-tag">About Us</span>
          <h2>We Provide Fresh &amp; Organic Fruits and Vegetables</h2>
          <p>
            At Fruitabless, we are committed to delivering farm-fresh fruits and
            vegetables directly to your doorstep. Our products are carefully
            sourced from trusted farmers to ensure quality, freshness, and 100%
            organic goodness.
          </p>
          <div className="about-features">
            <div className="feature-box">
              <i className="fa fa-leaf" />
              <h5>100% Organic</h5>
              <p>No chemicals, only natural farming products.</p>
            </div>
            <div className="feature-box">
              <i className="fa fa-truck" />
              <h5>Fast Delivery</h5>
              <p>Quick and safe doorstep delivery service.</p>
            </div>
            <div className="feature-box">
              <i className="fa fa-check-circle" />
              <h5>Best Quality</h5>
              <p>Freshly picked and quality-checked products.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* About End */}
</>

   </>
  )
}

export default About
