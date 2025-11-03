"use client"

import { useContext, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import axios from "axios"
import { toast } from "react-toastify"

const ForgotPassword = () => {
  const { backendUrl, navigate } = useContext(ShopContext)
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email.includes("@")) {
      toast.error("Invalid email format")
      return
    }

    setLoading(true)
    try {
      const response = await axios.post(`${backendUrl}/api/user/forgot-password`, { email })

      if (response.data.success) {
        toast.success("OTP sent to your email")
        // Pass email to next step
        navigate("/verify-otp", { state: { email } })
      } else {
        toast.error(response.data.message || "Failed to send OTP")
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
          <p className="text-4xl font-semibold text-[#23066d]">Forgot Password</p>
          <hr className="border-none h-[2px] w-12 bg-[#23066d]" />
        </div>

        <p className="text-center text-sm text-gray-600 mb-4">
          Enter your email address and we'll send you an OTP to reset your password.
        </p>

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23066d]"
          placeholder="Enter your email"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-[#23066d] text-white font-medium px-8 py-2 mt-4 rounded-md shadow-md hover:shadow-lg hover:bg-[#1b054f] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed w-full"
        >
          {loading ? "Sending..." : "Send OTP"}
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

export default ForgotPassword
