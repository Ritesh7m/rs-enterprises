import userModel from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { sendOTPEmail } from "../config/nodemailer.js"

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.json({ success: false, message: "Email is required" })
    }

    const user = await userModel.findOne({ email })
    if (!user) {
      return res.json({ success: false, message: "User not found" })
    }

    // Generate OTP and set expiry (10 minutes)
    const otp = generateOTP()
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes from now

    // Save OTP to database
    user.otp = otp
    user.otpExpiry = otpExpiry
    await user.save()

    // Send OTP via email
    const emailResult = await sendOTPEmail(email, otp)

    if (emailResult.success) {
      return res.json({ success: true, message: "OTP sent to your email" })
    } else {
      return res.json({ success: false, message: "Failed to send OTP" })
    }
  } catch (error) {
    console.error("Error in forgotPassword:", error)
    res.json({ success: false, message: error.message })
  }
}

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body

    if (!email || !otp) {
      return res.json({ success: false, message: "Email and OTP are required" })
    }

    const user = await userModel.findOne({ email })
    if (!user) {
      return res.json({ success: false, message: "User not found" })
    }

    // Check if OTP exists and is not expired
    if (!user.otp || user.otp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" })
    }

    if (new Date() > user.otpExpiry) {
      return res.json({ success: false, message: "OTP has expired" })
    }

    // OTP verified successfully
    return res.json({ success: true, message: "OTP verified successfully" })
  } catch (error) {
    console.error("Error in verifyOTP:", error)
    res.json({ success: false, message: error.message })
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body

    if (!email || !otp || !newPassword) {
      return res.json({ success: false, message: "All fields are required" })
    }

    if (newPassword.length < 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters" })
    }

    const user = await userModel.findOne({ email })
    if (!user) {
      return res.json({ success: false, message: "User not found" })
    }

    // Verify OTP one more time
    if (!user.otp || user.otp !== otp || new Date() > user.otpExpiry) {
      return res.json({ success: false, message: "Invalid or expired OTP" })
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    // Update password and clear OTP
    user.password = hashedPassword
    user.otp = null
    user.otpExpiry = null
    await user.save()

    return res.json({ success: true, message: "Password reset successfully" })
  } catch (error) {
    console.error("Error in resetPassword:", error)
    res.json({ success: false, message: error.message })
  }
}

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!email.includes("@")) {
      return res.json({ success: false, message: "Invalid email format" })
    }

    const exists = await userModel.findOne({ email })
    if (exists) {
      return res.json({ success: false, message: "User already exists" })
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    })

    await newUser.save()

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)

    res.json({
      success: true,
      message: "User registered successfully",
      token,
      Id: newUser._id,
    })
  } catch (error) {
    console.error("Error in register:", error)
    res.json({ success: false, message: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
      return res.json({ success: false, message: "User does not exist" })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.json({
      success: true,
      message: "Login successful",
      token,
      Id: user._id,
    })
  } catch (error) {
    console.error("Error in login:", error)
    res.json({ success: false, message: error.message })
  }
}
