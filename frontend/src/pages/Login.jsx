import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [authMode, setAuthMode] = useState('signup');
  const { setToken, backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  const validateForm = () => {
    if (!email.includes('@')) {
      toast.error('Invalid email format');
      return false;
    }
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return false;
    }
    if (authMode === 'signup' && name.trim().length < 3) {
      toast.error('Name must be at least 3 characters');
      return false;
    }
    return true;
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      if (authMode === 'signup') {
        const res = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (res.data.success) {
          toast.success(res.data.message || 'User registered successfully');
          resetForm();
          setAuthMode('login'); 
        } else {
          toast.error(res.data.message || 'Registration failed');
        }

      } else {
        const res = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (res.data.success) {
          toast.success(res.data.message || 'Login successful');
          localStorage.setItem("userId", res.data.id);
          setToken(res.data.token);
          localStorage.setItem('token', res.data.token);
          resetForm();
          navigate('/');
        } else {
          toast.error(res.data.message || 'Login failed');
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Server Error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center w-[90%] sm:max-w-md bg-white shadow-lg rounded-lg p-6 gap-4 text-gray-800"
      >
        <div className="flex flex-col items-center gap-2 mb-6">
          <p className="text-4xl font-semibold text-[#23066d]">
            {authMode === 'signup' ? 'Sign Up' : 'Login'}
          </p>
          <hr className="border-none h-[2px] w-12 bg-[#23066d]" />
        </div>

        {authMode === 'signup' && (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23066d]"
            placeholder="Name"
            required
          />
        )}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23066d]"
          placeholder="Email"
          required
        />

        <div className="w-full relative">
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type={showPassword ? 'text' : 'password'}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23066d]"
            placeholder="Password"
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-[#23066d]" 
          >
            {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
          </span>
        </div>

        <div className="w-full flex justify-between text-sm mt-[-8px] text-gray-600">
          <p className="cursor-pointer hover:text-[#23066d]">Forgot Password?</p>
          {authMode === 'login' ? (
            <p
              onClick={() => {
                setAuthMode('signup');
                resetForm();
              }}
              className="cursor-pointer hover:text-[#23066d]"
            >
              Create account
            </p>
          ) : (
            <p
              onClick={() => {
                setAuthMode('login');
                resetForm();
              }}
              className="cursor-pointer hover:text-[#23066d]"
            >
              Login Here
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-[#23066d] text-white font-medium px-8 py-2 mt-4 rounded-md shadow-md hover:shadow-lg hover:bg-[#1b054f] transition duration-300"
        >
          {authMode === 'login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Login;
