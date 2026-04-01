import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, default: "" },

  resetToken: { type: String, default: null },
  resetTokenExpire: { type: Date, default: null },
  otp: { type: String, default: null },
otpExpire: { type: Date, default: null },
});

const userDataSchema = mongoose.model("user", userSchema);

export default userDataSchema;