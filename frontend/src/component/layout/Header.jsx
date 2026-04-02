import React, { useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../../CartContext';

function Header() {
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  // Close mobile navbar on route change
  useEffect(() => {
    const navbarCollapse = document.getElementById('navbarCollapse');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      const bsCollapse = new window.bootstrap.Collapse(navbarCollapse, {
        toggle: false
      });
      bsCollapse.hide();
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('guestCart');
    navigate('/login');
  };

  return (
    <>
      <div className="container-fluid fixed-top">
        <div className="container topbar bg-primary d-none d-lg-block">
          <div className="d-flex justify-content-between">
            <div className="top-info ps-2">
              <small className="me-3">
                <i className="fas fa-map-marker-alt me-2 text-secondary" />{" "}
                <a href="#" className="text-white">
                  1429 Netus Rd, NY 48247
                </a>
              </small>
              <small className="me-3">
                <i className="fas fa-envelope me-2 text-secondary" />
                <a href="#" className="text-white">
                  fruitables4@gmail.com
                </a>
              </small>
            </div>
            <div className="top-link pe-2">
              <a href="#" className="text-white">
                <small className="text-white mx-2">Privacy Policy</small>/
              </a>
              <a href="#" className="text-white">
                <small className="text-white mx-2">Terms of Use</small>/
              </a>
              <a href="#" className="text-white">
                <small className="text-white ms-2">Sales and Refunds</small>
              </a>
            </div>
          </div>
        </div>
        <div className="container px-0">
          <nav className="navbar navbar-light bg-white navbar-expand-xl">
            <Link to="/" className="navbar-brand">
              <h1 className="text-primary display-6">Fruitables</h1>
            </Link>
            <button
              className="navbar-toggler py-2 px-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="fa fa-bars text-primary" />
            </button>
            <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
              <div className="navbar-nav mx-auto">
                <Link to="/" className="nav-item nav-link active">
                  Home
                </Link>
                <Link to="/Shop" className="nav-item nav-link">
                  Shop
                </Link>
                {/* <Link to="/Shopdetail" className="nav-item nav-link">
                  Shop Detail
                </Link> */}
                <Link to="/About" className="nav-item nav-link">
                  About Us
                </Link>
                <Link to="/Checkout" className="nav-item nav-link">
                  Checkout
                </Link>
                <Link to="/Contact" className="nav-item nav-link">
                  Contact
                </Link>
              </div>
              <div className="d-flex m-3 me-0 align-items-center">
                <Link to="/Cart" className="position-relative me-4 my-auto">
                  <i className="fa fa-shopping-bag fa-2x" />
                  <span
                    className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                    style={{ top: "-5px", left: 15, height: 20, minWidth: 20 }}
                  >
                    {cartCount}
                  </span>
                </Link>

                {token && user ? (
                  <div className="dropdown">
                    <button
                      className="btn btn-link dropdown-toggle text-dark text-decoration-none"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fas fa-user fa-2x" />
                      <span className="ms-2">{user.name}</span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <Link to="/dashboard" className="dropdown-item" data-bs-dismiss="dropdown">
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button onClick={handleLogout} className="dropdown-item text-danger" data-bs-dismiss="dropdown">
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link to="/login" className="my-auto">
                    <i className="fas fa-user fa-2x" />
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Header;