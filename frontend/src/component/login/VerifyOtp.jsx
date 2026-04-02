import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function VerifyOtp() {
  const [otp, setOtp] = useState("");

  const email = new URLSearchParams(window.location.search).get("email");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://fruitables-backend-n8nj.onrender.com/user/verify-otp",
        { email, otp }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        window.location.href = `/reset-password?email=${email}`;
      } else {
        toast.error(res.data.message);
      }

    } catch (error) {
      toast.error("Error verifying OTP");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Verify OTP</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter OTP"
            required
            style={styles.input}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button style={styles.button}>Verify OTP</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" },
  card: { width: "350px", padding: "30px", background: "#fff" },
  input: { width: "100%", padding: "10px", marginBottom: "15px" },
  button: { width: "100%", padding: "10px", background: "#81c408", color: "#fff" },
};

export default VerifyOtp;