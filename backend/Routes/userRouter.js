import express from "express";
import { deleteUser, findUser, findUserByIdByBody, findUserByIdByParams, forgotPassword, login, resetPasswordWithOtp, sendOtp, signup, userUpdate, verifyOtp } from "../Controller/Controller.js";


const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/findUser",findUser);
userRouter.post("/findUserByIdByBody",findUserByIdByBody);
userRouter.get("/findUserByIdByParams/:id",findUserByIdByParams);
userRouter.delete("/deleteUser/:id",deleteUser)
userRouter.put("/userUpdate",userUpdate)
userRouter.post("/forgot-password", forgotPassword);
// userRouter.post("/reset-password/:token", resetPassword);
userRouter.post("/send-otp", sendOtp);
userRouter.post("/verify-otp", verifyOtp);
userRouter.post("/reset-password-otp", resetPasswordWithOtp);
export default userRouter;
