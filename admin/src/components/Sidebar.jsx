import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${
      isActive ? "active" : ""
    }`;

  const iconClass = (isActive) =>
    `w-5 h-5 ${isActive ? "filter invert brightness-0" : ""}`;

  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink to="/add" className={navLinkClass}>
          {({ isActive }) => (
            <>
              <img
                className={iconClass(isActive)}
                src={assets.add_icon}
                alt=""
              />
              <p className="hidden md:block">Add Items</p>
            </>
          )}
        </NavLink>

        <NavLink to="/list" className={navLinkClass}>
          {({ isActive }) => (
            <>
              <img
                className={iconClass(isActive)}
                src={assets.order_icon}
                alt=""
              />
              <p className="hidden md:block">Lists Items</p>
            </>
          )}
        </NavLink>

        <NavLink to="/orders" className={navLinkClass}>
          {({ isActive }) => (
            <>
              <img
                className={iconClass(isActive)}
                src={assets.order_icon}
                alt=""
              />
              <p className="hidden md:block">Orders</p>
            </>
          )}
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
