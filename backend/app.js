import express from "express";
import dbConnect from "./connect/dbConnect.js";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import cors from "cors";
import cartRouter from './Routes/cartRoutes.js';
import productRouter from "./Routes/productRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";
import adminRouter from "./Routes/adminRoutes.js";
import userRouter from "./Routes/userRouter.js";

// If you have a userRouter, import it too
// import userRouter from "./Routes/userRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());

const port = 9999;

dbConnect();

// Routes
// app.use("/user", userRouter); // uncomment if you have user routes
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/admin", adminRouter);
app.use("/user", userRouter) 
app.use('/cart', cartRouter);

// Test route (optional)
app.get("/test", (req, res) => res.json({ message: "Backend is alive" }));

app.listen(port, () => {
  console.log(`Server is running on ${port} 🚀`);
});