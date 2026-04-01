import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const sendOTP = (email) =>
  axios.post(`${API}/send-otp`, { email });

export const verifyOTP = (email, otp) =>
  axios.post(`${API}/verify-otp`, { email, otp });

export const resetPassword = (email, password) =>
  axios.post(`${API}/reset-password`, { email, password });