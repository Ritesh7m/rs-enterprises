"use client"

import { useContext, useState, useEffect } from "react"
import { ShopContext } from "../context/ShopContext"
import { useLocation } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

const VerifyOTP = () => {
  const { backendUrl, navigate } = useContext(ShopContext)
  const location = useLocation()
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [timer, setTimer] = useState(600) // 10 minutes

  useEffect(() => {
    const emailFromState = location.state?.email
    if (!emailFromState) {
      toast.error("Please start from forgot password")
      navigate("/login")
      return
    }
    setEmail(emailFromState)
  }, [location, navigate])

  useEffect(() => {
    if (timer <= 0) return
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [timer])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleVerify = async (e) => {
    e.preventDefault()

    if (otp.length !== 6) {
      toast.error("OTP must be 6 digits")
      return
    }

    setLoading(true)
    try {
      const response = await axios.post(`${backendUrl}/api/user/verify-otp`, {
        email,
        otp,
      })

      if (response.data.success) {
        toast.success("OTP verified successfully")
        navigate("/reset-password", { state: { email, otp } })
      } else {
        toast.error(response.data.message || "Invalid OTP")
      }
    } catch (error) {
      console.error(error)
      toast.error(error?.response?.data?.message || "Server Error")
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setLoading(true)
    try {
      const response = await axios.post(`${backendUrl}/api/user/forgot-password`, { email })
      if (response.data.success) {
        toast.success("OTP resent to your email")
        setTimer(600)
        setOtp("")
      } else {
        toast.error(response.data.message || "Failed to resend OTP")
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Server Error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleVerify}
        className="flex flex-col items-center w-[90%] sm:max-w-md bg-white shadow-lg rounded-lg p-6 gap-4 text-gray-800"
      >
        <div className="flex flex-col items-center gap-2 mb-6">
          <p className="text-4xl font-semibold text-[#23066d]">Verify OTP</p>
          <hr className="border-none h-[2px] w-12 bg-[#23066d]" />
        </div>

        <p className="text-center text-sm text-gray-600 mb-4">
          We've sent a 6-digit OTP to <strong>{email}</strong>
        </p>

        <input
          onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
          value={otp}
          type="text"
          maxLength="6"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23066d] text-center text-2xl letter-spacing tracking-widest"
          placeholder="000000"
          required
        />

        <p className="text-sm text-gray-600">
          OTP expires in: <span className="font-semibold text-[#23066d]">{formatTime(timer)}</span>
        </p>

        <button
          type="submit"
          disabled={loading || timer <= 0}
          className="bg-[#23066d] text-white font-medium px-8 py-2 mt-4 rounded-md shadow-md hover:shadow-lg hover:bg-[#1b054f] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed w-full"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <div className="flex gap-2 mt-4 text-sm text-gray-600">
          <p>Didn't receive OTP?</p>
          <button
            type="button"
            onClick={handleResendOTP}
            disabled={loading || timer > 0}
            className="text-[#23066d] hover:underline disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            Resend
          </button>
        </div>

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

export default VerifyOTP
