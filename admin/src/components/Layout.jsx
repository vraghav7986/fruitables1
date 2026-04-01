import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <h2 className="mb-0 text-primary">Fruitables Admin</h2>
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <span className="nav-link">Welcome, Admin</span>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="d-flex">
        <div className="bg-dark text-white p-3" style={{ width: '250px', minHeight: '100vh' }}>
          <h5 className="mb-4">Menu</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <Link to="/" className="nav-link text-white">
                <i className="bi bi-speedometer2 me-2"></i> Dashboard
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/products" className="nav-link text-white">
                <i className="bi bi-box-seam me-2"></i> Products
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/orders" className="nav-link text-white">
                <i className="bi bi-cart-check me-2"></i> Orders
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex-grow-1 p-4" style={{ backgroundColor: '#f8f9fa' }}>
          {children}
        </div>
      </div>

      <footer className="bg-light text-center py-4 border-top">
        <div className="container">
          <p className="mb-0 text-muted">
            © 2024 Fruitables Admin Panel. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Layout;