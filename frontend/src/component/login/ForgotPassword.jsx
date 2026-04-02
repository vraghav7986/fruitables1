import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://fruitables-backend-n8nj.onrender.com/user/send-otp",
        { email }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        // 👉 move to OTP page
        window.location.href = `/verify-otp?email=${email}`;
      } else {
        toast.error(res.data.message);
      }

    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Forgot Password</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            required
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button style={styles.button}>Send OTP</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "350px",
    padding: "30px",
    background: "#fff",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#81c408",
    color: "#fff",
  },
};

export default ForgotPassword;