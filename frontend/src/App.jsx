import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import SearchBar from "./component/SearchBar";
import Verifiy from "./pages/Verifiy";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from "./component/ForgotPassword";
import VerifyOTP from "./component/VerifyOTP";
import ResetPassword from "./component/ResetPassword";

const App = () => {
  return (
    <div>
      <Navbar />
      <SearchBar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/verify" element={<Verifiy />} />

        {/* // Inside your Routes component, add: */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />

      </Routes>

      <Footer />

      
      <ToastContainer
        position="top-center"
        autoClose={3000}
        toastStyle={{ marginTop: '60px' }} // Add top margin
      />

    </div>
  );
};

export default App;
