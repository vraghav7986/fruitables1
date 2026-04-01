import React from 'react'

function Whislist() {
  return (
   <>
   <>
  {/* Header */}
  <header className="header">
    <h1>Fruitable</h1>
  </header>
  {/* Wishlist Section */}
  <section className="wishlist-section">
    <div className="container">
      <h2 className="section-title">My Wishlist</h2>
      <div className="wishlist-grid">
        {/* Product Card */}
        <div className="wishlist-card">
          <img
            src="https://images.unsplash.com/photo-1567306226416-28f0efdc88ce"
            alt="Apples"
          />
          <h3>Fresh Apples</h3>
          <p className="price">$12.0 / Pound</p>
          <div className="btn-group">
            <button className="cart-btn">Add to Cart</button>
            <button className="remove-btn">Remove</button>
          </div>
        </div>
        {/* Product Card */}
        <div className="wishlist-card">
          <img
            src="img/tomato.jpg"
            alt="Tomatoes"
          />
          <h3>Organic Tomatoes</h3>
          <p className="price">$6.0 / Pound</p>
          <div className="btn-group">
            <button className="cart-btn">Add to Cart</button>
            <button className="remove-btn">Remove</button>
          </div>
        </div>
        {/* Product Card */}
        <div className="wishlist-card">
          <img
            src="img/potatoe.jpg"
            alt="Potato"
          />
          <h3>Fresh Potatos</h3>
          <p className="price">$5.0 / Pound</p>
          <div className="btn-group">
            <button className="cart-btn">Add to Cart</button>
            <button className="remove-btn">Remove</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</>

   </>
  )
}

export default Whislist
