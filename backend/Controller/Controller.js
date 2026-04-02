import userDataSchema from "../model/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// 📧 EMAIL CONFIG
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fruitables4@gmail.com",
    pass: "fhjj aurx bwke fnzs",
  },
});

// ================= SIGNUP =================
export const signup = async (req, res) => {
  try {
    const findEmail = await userDataSchema.findOne({ email: req.body.email });

    if (findEmail !== null) {
      return res.json({
        status: 400,
        success: false,
        message: "User Already Exists",
        body: {},
      });
    }

    const encPass = await bcrypt.hash(req.body.password, 10);

    const data = await userDataSchema.create({
      ...req.body,
      password: encPass,
    });

    return res.json({
      status: 200,
      success: true,
      message: "Data Created",
      body: { data },
    });

  } catch (error) {
    return res.json({
      status: 400,
      success: false,
      message: error.message,
      body: {},
    });
  }
};

// ================= LOGIN =================
// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        status: 400,
        success: false,
        message: "Email and password are required",
        body: {},
      });
    }

    const user = await userDataSchema.findOne({ email });
    if (!user) {
      return res.json({
        status: 400,
        success: false,
        message: "Invalid email or password",
        body: {},
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        status: 400,
        success: false,
        message: "Invalid email or password",
        body: {},
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "your_jwt_secret_key",
      { expiresIn: "30d" }
    );

    // Return user data (without password) and token
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };

    return res.json({
      status: 200,
      success: true,
      message: "User Login Successfully",
      body: { user: userData, token },
    });

  } catch (error) {
    console.error(error);
    return res.json({
      status: 400,
      success: false,
      message: error.message,
      body: {},
    });
  }
};

// ================= FORGOT PASSWORD =================
export const forgotPassword = async (req, res) => {
  try {
    const user = await userDataSchema.findOne({ email: req.body.email });

    if (!user) {
      return res.json({
        status: 400,
        success: false,
        message: "User not found",
      });
    }

    // 🔐 TOKEN
    const token = jwt.sign({ id: user._id }, "secretkey", {
      expiresIn: "10m",
    });

    user.resetToken = token;
    user.resetTokenExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    const resetLink = `https://fruitables1.vercel.app/reset-password/${token}`;

    await transporter.sendMail({
      to: user.email,
      subject: "Password Reset",
      html: `
        <h2>Password Reset</h2>
        <p>Click below link to reset password:</p>
        <a href="${resetLink}">${resetLink}</a>
      `,
    });

    return res.json({
      status: 200,
      success: true,
      message: "Reset link sent to email",
    });

  } catch (error) {
    return res.json({
      status: 400,
      success: false,
      message: error.message,
    });
  }
};

// ================= RESET PASSWORD =================
// export const resetPassword = async (req, res) => {
//   try {
//     const { token } = req.params;
//     const { password } = req.body;

//     const decoded = jwt.verify(token, "secretkey");

//     const user = await userDataSchema.findById(decoded.id);

//     if (!user || user.resetToken !== token) {
//       return res.json({
//         status: 400,
//         success: false,
//         message: "Invalid token",
//       });
//     }

//     if (user.resetTokenExpire < Date.now()) {
//       return res.json({
//         status: 400,
//         success: false,
//         message: "Token expired",
//       });
//     }

//     const encPass = await bcrypt.hash(password, 10);

//     user.password = encPass;
//     user.resetToken = null;
//     user.resetTokenExpire = null;

//     await user.save();

//     return res.json({
//       status: 200,
//       success: true,
//       message: "Password reset successful",
//     });

//   } catch (error) {
//     return res.json({
//       status: 400,
//       success: false,
//       message: "Invalid or expired token",
//     });
//   }
// };

// ================= OTHER FUNCTIONS =================
export const findUser = async (req, res) => {
  try {
    const data = await userDataSchema.find();
    return res.json({
      status: 200,
      success: true,
      message: "Here are all the user data.",
      body: data,
    });
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
      message: error.message,
      body: {},
    });
  }
};

export const findUserByIdByBody = async (req, res) => {
  try {
    const data = await userDataSchema.findById(req.body.id);
    return res.json({
      status: 200,
      success: true,
      message: "This is a single user.",
      body: data,
    });
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
      message: error.message,
      body: {},
    });
  }
};

export const findUserByIdByParams = async (req, res) => {
  try {
    const data = await userDataSchema.findById(req.params.id);
    return res.json({
      status: 200,
      success: true,
      message: "This is a single user.",
      body: data,
    });
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
      message: error.message,
      body: {},
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const data = await userDataSchema.findByIdAndDelete(req.params.id);
    const count = await userDataSchema.countDocuments();

    return res.json({
      status: 200,
      success: true,
      message: "User Deleted",
      body: data,
      count,
    });
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
      message: error.message,
    });
  }
};

export const userUpdate = async (req, res) => {
  try {
    const encPass = await bcrypt.hash(req.body.password, 10);

    const data = await userDataSchema.findByIdAndUpdate(
      req.body.id,
      { ...req.body, password: encPass },
      { new: true }
    );

    return res.json({
      status: 200,
      success: true,
      message: "User updated",
      body: data,
    });

  } catch (error) {
    return res.json({
      status: 400,
      success: false,
      message: error.message,
    });
  }
};
// ================= SEND OTP =================
export const sendOtp = async (req, res) => {
  try {
    const user = await userDataSchema.findOne({ email: req.body.email });

    if (!user) {
      return res.json({
        status: 400,
        success: false,
        message: "User not found",
        body: {},
      });
    }

    // 🔢 GENERATE OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpire = Date.now() + 5 * 60 * 1000; // 5 min
    await user.save();

    // 📧 SEND EMAIL
    await transporter.sendMail({
      to: user.email,
      subject: "OTP Verification",
      html: `<h2>Your OTP is: ${otp}</h2>`,
    });

    return res.json({
      status: 200,
      success: true,
      message: "OTP sent to email",
      body: {},
    });

  } catch (error) {
    return res.json({
      status: 400,
      success: false,
      message: error.message,
      body: {},
    });
  }
};

// ================= VERIFY OTP =================
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await userDataSchema.findOne({ email });

    if (!user) {
      return res.json({
        status: 400,
        success: false,
        message: "User not found",
        body: {},
      });
    }

    if (user.otp !== otp) {
      return res.json({
        status: 400,
        success: false,
        message: "Invalid OTP",
        body: {},
      });
    }

    if (user.otpExpire < Date.now()) {
      return res.json({
        status: 400,
        success: false,
        message: "OTP expired",
        body: {},
      });
    }

    return res.json({
      status: 200,
      success: true,
      message: "OTP verified successfully",
      body: {},
    });

  } catch (error) {
    return res.json({
      status: 400,
      success: false,
      message: error.message,
      body: {},
    });
  }
};

// ================= RESET PASSWORD WITH OTP =================
export const resetPasswordWithOtp = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userDataSchema.findOne({ email });

    if (!user) {
      return res.json({
        status: 400,
        success: false,
        message: "User not found",
        body: {},
      });
    }

    const encPass = await bcrypt.hash(password, 10);

    user.password = encPass;
    user.otp = null;
    user.otpExpire = null;

    await user.save();

    return res.json({
      status: 200,
      success: true,
      message: "Password updated successfully",
      body: {},
    });

  } catch (error) {
    return res.json({
      status: 400,
      success: false,
      message: error.message,
      body: {},
    });
  }
};