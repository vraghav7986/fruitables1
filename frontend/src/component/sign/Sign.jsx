import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

function Sign() {
  const sectionStyle = {
    minHeight: "100vh",
    background: "#f3f9e8",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "170px 0px 0px 0px",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "420px",
    background: "#ffffff",
    padding: "40px 35px",
    borderRadius: "20px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
  };

  const titleStyle = {
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "700",
    color: "#81c408",
    marginBottom: "25px",
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 18px",
    borderRadius: "30px",
    border: "1px solid #ddd",
    marginBottom: "16px",
    fontSize: "14px",
    outline: "none",
  };

  const buttonStyle = {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "30px",
    background: "linear-gradient(135deg, #81c408, #ffb524)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
  };
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const handleChange = ((e) => {
    console.log(e.target, "target");
    setData({ ...data, [e.target.name]: e.target.value });
  });
  const handleSubmit = async (e) => {
    try {
      console.log("object");
      e.preventDefault();
      const dataaa = await axios.post("http://localhost:9999/user/signup",data);
      console.log(dataaa, "SFSF");
      if (dataaa.data.status === 400) {
        toast.error(dataaa.data.message);
      } else {
        setData(dataaa.data.body);
        toast.success(dataaa.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section style={sectionStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Create Account</h2>

        <form onChange={handleChange} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={data.name}
            style={inputStyle}
            required
          />
          {/* <input type="text" placeholder="Last Name" name="email" style={inputStyle} required /> */}
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            style={inputStyle}
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            name="phone"
            style={inputStyle}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            style={inputStyle}
            required
          />
          {/* <input type="password" placeholder="Confirm Password" style={inputStyle} required /> */}

          <button type="submit" style={buttonStyle}>
            Sign Up
          </button>
        </form>

      <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}>
  Already have an account?{" "}
  <Link
    to="/login"
    style={{ color: "#ffb524", fontWeight: "600", textDecoration: "none" }}
  >
    Login
  </Link>
</p>
      </div>
    </section>
  );
}

export default Sign;