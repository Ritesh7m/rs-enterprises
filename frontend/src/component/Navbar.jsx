import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItem } =
    useContext(ShopContext);

  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide when scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      // Change background transparency after 100px
      setScrolled(currentScrollY > 100);

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItem({});
    setShowProfileMenu(false);
  };

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
    <>
      {/* NAVBAR (transformed for hide/show) */}
      <div
        className={`fixed left-0 w-full backdrop-blur-md transition-all duration-500 ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        } ${scrolled ? "bg-[#FFFEFD]/70 shadow-sm" : "bg-[#FFFEFD]/90 shadow-md" } z-[999]`}
        style={{ top: 0 }}
      >
        <div className="flex items-center justify-between px-8 py-4 font-medium">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/">
              <img
                src={assets.logo}
                className="w-12 h-12 rounded-full object-cover"
                alt="Logo"
              />
            </Link>
            <Link to="/">
              <p className="text-[#190053] text-2xl font-bold md:block hidden pl-2 tracking-wide">
                RS Enterprises
              </p>
            </Link>
          </div>

          {/* Nav Links */}
          <ul className="hidden sm:flex gap-10 text-lg text-[#190053] font-semibold">
            {["/", "/collection", "/about", "/contact"].map((path, index) => (
              <NavLink
                key={index}
                to={path}
                className="flex flex-col items-center gap-1 group relative no-underline py-2 font-medium text-xl"
              >
                {({ isActive }) => (
                  <>
                    <p
                      className={`transition-colors duration-300 ${
                        isActive ? "text-[#5C3AFF]" : "hover:text-[#5C3AFF]"
                      }`}
                    >
                      {path === "/"
                        ? "Home"
                        : path.replace("/", "").charAt(0).toUpperCase() +
                          path.slice(2).toLowerCase()}
                    </p>
                    <hr
                      className={`absolute bottom-0 w-full border-none h-[2px] bg-[#5C3AFF]
                        transform origin-center
                        scale-x-0 transition-transform duration-300 ease-out
                        group-hover:scale-x-100`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </ul>

          {/* Icons */}
          <div className="flex items-center gap-6">
            {/* Search */}
            <img
              onClick={() => setShowSearch(true)}
              src={assets.search_icon}
              className="w-6 h-6 cursor-pointer brightness-0 hover:brightness-50 transition"
              alt="Search"
            />

            {/* Profile */}
            <div className="relative z-[1001]">
              <img
                onClick={() => {
                  if (!token) {
                    navigate("/login");
                  } else {
                    setShowProfileMenu(!showProfileMenu);
                  }
                }}
                src={assets.profile_icon}
                className="w-6 h-6 cursor-pointer hover:brightness-50 transition"
                alt="Profile"
              />
              {token && showProfileMenu && (
                <div className="absolute right-0 mt-2 bg-[#FFFEFD] text-[#190053] w-44 p-3 rounded-xl shadow-lg profile-menu border border-[#EEE]">
                  <p
                    onClick={logout}
                    className="cursor-pointer hover:text-[#5C3AFF] py-1 transition-colors"
                  >
                    Logout
                  </p>
                  <p
                    onClick={() => {
                      navigate("/orders");
                      setShowProfileMenu(false);
                    }}
                    className="cursor-pointer hover:text-[#5C3AFF] py-1 transition-colors"
                  >
                    Orders
                  </p>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <img
                src={assets.cart_icon}
                className="w-6 h-6 hover:brightness-50 transition"
                alt="Cart"
              />
              <p className="absolute -right-2 -bottom-2 bg-[#5C3AFF] text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {getCartCount()}
              </p>
            </Link>

            {/* Mobile Menu */}
            <img
              onClick={() => setVisible(true)}
              src={assets.menu_icon}
              className="w-5 h-5 cursor-pointer brightness-0 sm:hidden hover:brightness-50 transition"
              alt="Menu"
            />
          </div>
        </div>
      </div>

      {/* SIDEBAR & OVERLAY (moved OUTSIDE the transformed navbar so fixed works properly) */}
      <div
        className={`fixed top-0 bottom-0 right-0 bg-[#190053] transition-all duration-300 overflow-hidden text-white z-[1001] sidebar-menu ${
          visible ? "w-64" : "w-0"
        }`}
      >
        <div className="flex flex-col text-lg">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-2 p-4 px-6 border-b border-gray-500 cursor-pointer hover:bg-[#32226B]"
          >
            <img
              src={assets.dropdown_icon}
              className="h-4 rotate-180 brightness-0 invert"
              alt="Back"
            />
            <p>Back</p>
          </div>

          {["/", "/collection", "/about", "/contact"].map((path, index) => (
            <NavLink
              key={index}
              onClick={() => setVisible(false)}
              className="p-4 px-6 border-b border-gray-600 cursor-pointer hover:bg-[#32226B] transition"
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
          className="fixed inset-0 bg-black bg-opacity-40 z-[1000]"
          onClick={() => setVisible(false)}
        />
      )}
    </>
  );
};

export default Navbar;
