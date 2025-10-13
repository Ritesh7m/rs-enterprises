import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show search only on /collection route
    if (location.pathname.toLowerCase().includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <div className="fixed top-[80px] left-0 w-full border-t border-b bg-gray-50 text-center z-[60] shadow-sm">
      <div className="flex items-center justify-between border border-gray-300 px-5 py-2 my-5 mx-auto rounded-full w-3/4 sm:w-1/2 bg-white shadow-sm">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-white text-gray-700 placeholder-gray-500 px-2 text-sm"
          type="text"
          placeholder="Search products..."
        />
        <img
          className="w-5 h-5 opacity-70 cursor-pointer mr-2"
          src={assets.search_icon}
          alt="search"
        />
        <img
          onClick={() => setShowSearch(false)}
          className="w-4 h-4 cursor-pointer"
          src={assets.cross_icon}
          alt="close"
        />
      </div>
    </div>
  ) : null;
};

export default SearchBar;
