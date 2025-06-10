import React, { useState } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify'

const Login = ({setToken}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(`${backendUrl}/api/user/admin/login`, { email, password });
   if(response.data.success){
        setToken(response.data.token)
   }else{
     toast.error(response.data.message)
   }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#23066d]">Admin Panel</h1>
        <form onSubmit={onSubmitHandler} className="space-y-5">
          <div>
            <p className="mb-1 text-sm text-gray-700">Email Address</p>
            <input
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="your@gmail.com"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23066d]"
            />
          </div>
          <div>
            <p className="mb-1 text-sm text-gray-700">Password</p>
            <input
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23066d]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#23066d] text-white py-2 rounded-lg hover:bg-[#1a0554] transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
