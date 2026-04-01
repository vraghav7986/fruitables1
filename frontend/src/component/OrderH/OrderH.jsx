import React from 'react'

function OrderH() {
  return (
    <>
    <>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  {/* Header */}
  <header className="header">
    <h1>Fruitable</h1>
  </header>
  {/* Order History Section */}
  <section className="order-section">
    <div className="container">
      <h2 className="section-title">My Order History</h2>
      <div className="order-table">
        {/* Table Header */}
        <div className="order-row header-row">
          <div>Order ID</div>
          <div>Date</div>
          <div>Total</div>
          <div>Status</div>
          <div>Action</div>
        </div>
        {/* Order 1 */}
        <div className="order-row">
          <div>#FRU12345</div>
          <div>24 Feb 2026</div>
          <div>$ 480</div>
          <div>
            <span className="status delivered">Delivered</span>
          </div>
          <div>
            <button className="view-btn">View</button>
          </div>
        </div>
        {/* Order 2 */}
        <div className="order-row">
          <div>#FRU12346</div>
          <div>20 Feb 2026</div>
          <div>$ 250</div>
          <div>
            <span className="status pending">Pending</span>
          </div>
          <div>
            <button className="view-btn">View</button>
          </div>
        </div>
        {/* Order 3 */}
        <div className="order-row">
          <div>#FRU12347</div>
          <div>15 Feb 2026</div>
          <div>$ 720</div>
          <div>
            <span className="status cancelled">Cancelled</span>
          </div>
          <div>
            <button className="view-btn">View</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</>

    </>
  )
}

export default OrderH
