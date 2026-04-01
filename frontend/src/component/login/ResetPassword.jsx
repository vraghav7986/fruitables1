import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ResetPassword() {
  const [password, setPassword] = useState("");

  const email = new URLSearchParams(window.location.search).get("email");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:9999/user/reset-password-otp",
        { email, password }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        window.location.href = "/login";
      } else {
        toast.error(res.data.message);
      }

    } catch (error) {
      toast.error("Error resetting password");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Reset Password</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            required
            style={styles.input}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={styles.button}>Update Password</button>
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

export default ResetPassword;