import React from 'react'

function Io() {
  return (
    <>
    
    <>
  {/* Header */}
  <header className="header">
    <h1>Fruitable</h1>
  </header>
  {/* International Orders Section */}
  <section className="international-section">
    <div className="container">
      <h2 className="section-title">International Orders</h2>
      <div className="order-card">
        {/* Order 1 */}
        <div className="order-box">
          <div className="order-top">
            <h3>Order #INT10234</h3>
            <span className="status shipped">Shipped</span>
          </div>
          <div className="order-details">
            <p>
              <strong>Country:</strong> United States
            </p>
            <p>
              <strong>Shipping:</strong> Express Air
            </p>
            <p>
              <strong>Total:</strong> $ 980
            </p>
            <p>
              <strong>Date:</strong> 22 Feb 2026
            </p>
          </div>
          <button className="track-btn">Track Order</button>
        </div>
        {/* Order 2 */}
        <div className="order-box">
          <div className="order-top">
            <h3>Order #INT10235</h3>
            <span className="status processing">Processing</span>
          </div>
          <div className="order-details">
            <p>
              <strong>Country:</strong> Canada
            </p>
            <p>
              <strong>Shipping:</strong> Standard Delivery
            </p>
            <p>
              <strong>Total:</strong> $ 450
            </p>
            <p>
              <strong>Date:</strong> 18 Feb 2026
            </p>
          </div>
          <button className="track-btn">Track Order</button>
        </div>
        {/* Order 3 */}
        <div className="order-box">
          <div className="order-top">
            <h3>Order #INT10236</h3>
            <span className="status delivered">Delivered</span>
          </div>
          <div className="order-details">
            <p>
              <strong>Country:</strong> Australia
            </p>
            <p>
              <strong>Shipping:</strong> International Cargo
            </p>
            <p>
              <strong>Total:</strong> $ 1,240
            </p>
            <p>
              <strong>Date:</strong> 10 Feb 2026
            </p>
          </div>
          <button className="track-btn">Track Order</button>
        </div>
      </div>
    </div>
  </section>
</>
</>
  )
}

export default Io
