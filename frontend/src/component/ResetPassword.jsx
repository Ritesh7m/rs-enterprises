"use client"

import React, { useContext, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import { useLocation } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import EyeOpen from "../assets/eye-open.png"
import EyeClose from "../assets/eye-close.jpg"

const ResetPassword = () => {
  const { backendUrl, navigate } = useContext(ShopContext)
  const location = useLocation()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")

  React.useEffect(() => {
    const state = location.state
    if (!state?.email || !state?.otp) {
      toast.error("Invalid access. Please start from forgot password")
      navigate("/login")
      return
    }
    setEmail(state.email)
    setOtp(state.otp)
  }, [location, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters")
      return
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    setLoading(true)
    try {
      const response = await axios.post(`${backendUrl}/api/user/reset-password`, {
        email,
        otp,
        newPassword: password,
      })

      if (response.data.success) {
        toast.success("Password reset successfully")
        setPassword("")
        setConfirmPassword("")
        navigate("/login")
      } else {
        toast.error(response.data.message || "Failed to reset password")
      }
    } catch (error) {
      console.error(error)
      toast.error(error?.response?.data?.message || "Server Error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-[90%] sm:max-w-md bg-white shadow-lg rounded-lg p-6 gap-4 text-gray-800"
      >
        <div className="flex flex-col items-center gap-2 mb-6">
          <p className="text-4xl font-semibold text-[#23066d]">Reset Password</p>
          <hr className="border-none h-[2px] w-12 bg-[#23066d]" />
        </div>

        <p className="text-center text-sm text-gray-600 mb-4">Enter your new password below</p>

        <div className="relative w-full">
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type={showPassword ? "text" : "password"}
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23066d]"
            placeholder="New Password"
            required
          />
          <img
            src={showPassword ? EyeClose : EyeOpen}
            alt={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-2.5 w-5 h-5 cursor-pointer opacity-70 hover:opacity-100"
            onClick={() => setShowPassword((prev) => !prev)}
          />
        </div>

        <div className="relative w-full">
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            type={showConfirmPassword ? "text" : "password"}
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23066d]"
            placeholder="Confirm Password"
            required
          />
          <img
            src={showConfirmPassword ? EyeClose : EyeOpen}
            alt={showConfirmPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-2.5 w-5 h-5 cursor-pointer opacity-70 hover:opacity-100"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#23066d] text-white font-medium px-8 py-2 mt-4 rounded-md shadow-md hover:shadow-lg hover:bg-[#1b054f] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed w-full"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        <p
          onClick={() => navigate("/login")}
          className="text-center text-sm text-gray-600 cursor-pointer hover:text-[#23066d] mt-2"
        >
          Back to Login
        </p>
      </form>
    </div>
  )
}

export default ResetPassword
