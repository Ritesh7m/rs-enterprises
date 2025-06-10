import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const toggleStock = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/toggle-stock",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-6 text-2xl font-bold text-[#23066d] text-center border-b pb-2">
        🛍️ All Products List
      </p>

      <div className="flex flex-col gap-3">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-3 px-6 bg-[#23066d] text-white text-sm font-semibold rounded-lg shadow-md">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Stock</span>
          <span className="text-center">Action</span>
        </div>

        {/* Product Rows */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-4 px-6 py-4 bg-white rounded-lg border border-gray-200 shadow hover:shadow-md hover:bg-gray-50 transition-all duration-200"
          >
            <div>
              {item.images?.[0] ? (
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg border border-gray-300"
                />
              ) : (
                <div className="w-16 h-16 flex items-center justify-center bg-gray-200 text-xs text-gray-500 border border-gray-300 rounded-lg">
                  No Image
                </div>
              )}
            </div>

            <p className="truncate text-gray-900 font-semibold text-sm sm:text-base">
              {item.name}
            </p>
            <p className="text-gray-700 text-sm sm:text-base">{item.category}</p>
            <p className="text-gray-900 font-bold text-sm sm:text-base">
              {currency}
              {item.price}
            </p>

            <button
              onClick={() => toggleStock(item._id)}
              className={`text-sm px-3 py-1 rounded-md font-medium ${
                item.inStock
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-red-100 text-red-700 hover:bg-red-200"
              }`}
            >
              {item.inStock ? "In Stock" : "Out of Stock"}
            </button>

            <p
              onClick={() => removeProduct(item._id)}
              className="text-right md:text-center cursor-pointer text-red-500 hover:text-red-700 text-lg font-bold transition"
              title="Remove Product"
            >
              ✕
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
