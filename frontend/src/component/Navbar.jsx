import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItem } = useContext(ShopContext);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItem({});
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      const sidebar = document.querySelector(".sidebar-menu");
      if (visible && sidebar && !sidebar.contains(event.target)) {
        setVisible(false);
      }
    };

    // Add event listener for clicks
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [visible]);

  return (
    <div className="w-full bg-[#23066d] shadow-md">
      <div className="flex items-center justify-between px-8 py-4 font-medium">
        {/* Logo container */}
        <div className="flex items-center gap-1">
          <Link to="/">
            <img src={assets.logo} className="w-16 h-16 rounded-full object-cover" alt="Logo" />
          </Link>
          <Link to="/">
            <p className="text-white text-2xl font-bold md:block hidden">RS-Enterprises</p>
          </Link>
        </div>

        {/* Navigation links - hidden on mobile */}
        <ul className="hidden sm:flex gap-10 text-lg text-white font-semibold">
          <NavLink to="/" className="flex flex-col items-center gap-1 group">
            <p>HOME</p>
            <hr className="w-1/2 border-none h-1 bg-red-600 hidden group-hover:block" />
          </NavLink>
          <NavLink to="/collection" className="flex flex-col items-center gap-1 group">
            <p>COLLECTION</p>
            <hr className="w-1/2 border-none h-1 bg-red-600 hidden group-hover:block" />
          </NavLink>
          <NavLink to="/about" className="flex flex-col items-center gap-1 group">
            <p>ABOUT</p>
            <hr className="w-1/2 border-none h-1 bg-red-600 hidden group-hover:block" />
          </NavLink>
          <NavLink to="/contact" className="flex flex-col items-center gap-1 group">
            <p>CONTACT</p>
            <hr className="w-1/2 border-none h-1 bg-red-600 hidden group-hover:block" />
          </NavLink>
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-6">
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            className="w-6 h-6 cursor-pointer brightness-0 invert"
            alt="Search"
          />

          {/* Profile menu */}
          <div className="relative group">
            <img 
              onClick={() => token ? null : navigate('/login')}
              src={assets.profile_icon}
              className="w-6 h-6 cursor-pointer brightness-0 invert"
              alt="Profile"
            />
            {token && (
              <div className="absolute right-0 pt-4 hidden group-hover:block bg-[#23066d] text-white w-36 p-3 px-5 rounded-lg shadow-lg">
                
                <p 
                  onClick={() => navigate('/orders')}
                  className="cursor-pointer hover:text-blue-400"
                >
                  Orders
                </p>
                <p 
                  onClick={logout} 
                  className="cursor-pointer hover:text-blue-400"
                >
                  Logout
                </p>
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} className="w-6 h-6 brightness-0 invert" alt="Cart" />
            <p className="absolute -right-2 -bottom-2 bg-black text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {getCartCount()}
            </p>
          </Link>

          {/* Mobile menu button */}
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-6 h-6 cursor-pointer brightness-0 invert sm:hidden"
            alt="Menu"
          />
        </div>
      </div>

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 bottom-0 right-0 bg-[#23066d] transition-all duration-300 overflow-hidden shadow-lg text-white z-50 ${
          visible ? "w-64" : "w-0"
        }`}
      >
        <div className="flex flex-col text-lg">
          <div 
            onClick={() => setVisible(false)} 
            className="flex items-center gap-2 p-4 px-6 border-b border-gray-600 cursor-pointer"
          >
            <img
              src={assets.dropdown_icon}
              className="h-4 rotate-180"
              alt="Back"
            />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="p-4 px-6 border-b border-gray-600 cursor-pointer hover:bg-blue-800"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="p-4 px-6 border-b border-gray-600 cursor-pointer hover:bg-blue-800"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="p-4 px-6 border-b border-gray-600 cursor-pointer hover:bg-blue-800"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="p-4 px-6 border-b border-gray-600 cursor-pointer hover:bg-blue-800"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>

      {/* Sidebar overlay */}
      {visible && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setVisible(false)}
        />
      )}
    </div>
  );
};

export default Navbar;
