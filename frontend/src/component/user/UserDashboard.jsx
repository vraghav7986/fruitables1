import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token) {
      navigate('/login');
    } else if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.log("Error parsing user:", err);
      }
    }
  }, [navigate]);

  return (
    <div
      className="d-flex align-items-center justify-content-center bg-light"
      style={{ minHeight: '100vh', marginTop: '80px' }} // adjust if navbar height differs
    >
      <div className="container-fluid px-3 px-md-5">
        <div className="row justify-content-center">

          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            
            <div className="card shadow text-center">
              
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">User Dashboard</h4>
              </div>

              <div className="card-body">
                {user ? (
                  <>
                    <h5>Welcome, {user.name} 👋</h5>
                    <p className="mb-2">Email: {user.email}</p>
                  </>
                ) : (
                  <p>Loading user data...</p>
                )}

                <hr />

                <Link to="/" className="btn btn-primary">
                  Go to Shop
                </Link>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default UserDashboard;