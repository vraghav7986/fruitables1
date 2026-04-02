import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectMessage = location.state?.message;

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://fruitables-backend-n8nj.onrender.com/user/login", data);
      if (response.data.status === 200 && response.data.success) {
        const { token, user } = response.data.body;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">User Login</h2>
          {redirectMessage && (
            <div className="alert alert-info">{redirectMessage}</div>
          )}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email Address"
              className="login-input"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="login-input"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
            />
            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" /> Remember me
              </label>
              <a href="/forgot-password" className="forgot-link">Forgot Password?</a>
            </div>
            <button className="login-btn" type="submit">Login</button>
            <p className="login-register">
              Don’t have an account? <a href="/sign">Create one</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;