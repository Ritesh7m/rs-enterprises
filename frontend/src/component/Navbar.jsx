import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItem } = useContext(ShopContext);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItem({});
    setShowProfileMenu(false);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      const sidebar = document.querySelector(".sidebar-menu");
      const profileMenu = document.querySelector(".profile-menu");

      if (visible && sidebar && !sidebar.contains(event.target)) {
        setVisible(false);
      }

      if (showProfileMenu && profileMenu && !profileMenu.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [visible, showProfileMenu]);

  return (
    <div className="w-full bg-[#23066d] shadow-md z-[999] relative">
      <div className="flex items-center justify-between px-8 py-4 font-medium">
        {/* Logo */}
        <div className="flex items-center gap-1">
          <Link to="/">
            <img src={assets.logo} className="w-16 h-16 rounded-full object-cover" alt="Logo" />
          </Link>
          <Link to="/">
            <p className="text-white text-2xl font-bold md:block hidden">RS-Enterprises</p>
          </Link>
        </div>

        {/* Navigation links */}
        <ul className="hidden sm:flex gap-10 text-lg text-white font-semibold">
          {["/", "/collection", "/about", "/contact"].map((path, index) => (
            <NavLink key={index} to={path} className="flex flex-col items-center gap-1 group">
              <p>{path === "/" ? "HOME" : path.replace("/", "").toUpperCase()}</p>
              <hr className="w-1/2 border-none h-1 bg-red-600 hidden group-hover:block" />
            </NavLink>
          ))}
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            className="w-6 h-6 cursor-pointer brightness-0 invert"
            alt="Search"
          />

          {/* Profile */}
          <div className="relative z-[999]">
            <img
              onClick={() => {
                if (!token) {
                  navigate('/login');
                } else {
                  setShowProfileMenu(!showProfileMenu);
                }
              }}
              src={assets.profile_icon}
              className="w-6 h-6 cursor-pointer brightness-0 invert"
              alt="Profile"
            />
            {token && showProfileMenu && (
              <div className="absolute right-0 mt-2 bg-[#23066d] text-white w-40 p-3 rounded-xl shadow-xl z-[999] profile-menu">
                <p
                  onClick={logout}
                  className="cursor-pointer hover:text-blue-400 py-1"
                >
                  Logout
                </p>
                <p
                  onClick={() => {
                    navigate('/orders');
                    setShowProfileMenu(false);
                  }}
                  className="cursor-pointer hover:text-blue-400 py-1"
                >
                  Orders
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
        className={`fixed top-0 bottom-0 right-0 bg-[#23066d] transition-all duration-300 overflow-hidden shadow-lg text-white z-[999] sidebar-menu ${
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
          {["/", "/collection", "/about", "/contact"].map((path, index) => (
            <NavLink
              key={index}
              onClick={() => setVisible(false)}
              className="p-4 px-6 border-b border-gray-600 cursor-pointer hover:bg-blue-800"
              to={path}
            >
              {path === "/" ? "HOME" : path.replace("/", "").toUpperCase()}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Sidebar Overlay */}
      {visible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-[998]"
          onClick={() => setVisible(false)}
        />
      )}
    </div>
  );
};

export default Navbar;
