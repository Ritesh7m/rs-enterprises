import express from "express"
import { register, login, forgotPassword, verifyOTP, resetPassword } from "../controllers/userController.js"

const userRouter = express.Router()

// Existing routes
userRouter.post("/register", register)
userRouter.post("/login", login)

userRouter.post("/forgot-password", forgotPassword)
userRouter.post("/verify-otp", verifyOTP)
userRouter.post("/reset-password", resetPassword)

export default userRouter
