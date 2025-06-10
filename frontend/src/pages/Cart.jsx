import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../component/Title";
import { assets } from "../assets/assets";
import CartTotal from "../component/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];

      for (const productId in cartItems) {
        if (cartItems[productId] > 0) {
          tempData.push({
            _id: productId,
            quantity: cartItems[productId],
          });
        }
      }

      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14 px-4 sm:px-20">
      {/* Title */}
      <div className="text-2xl mb-5 ">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {/* Cart Items */}
      <div className="space-y-6">
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          if (!productData) return null;

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[1fr_auto] sm:grid-cols-[4fr_1fr_1fr] items-center gap-4"
            >
              {/* Product Info */}
              <div className="flex items-start gap-4">
                <img
                  className="w-20 sm:w-24"
                  src={productData.images[0]}
                  alt={productData.name}
                />
                <div>
                  <p className="text-sm sm:text-lg font-medium text-[#23066d]">
                    {productData.name}
                  </p>
                  <p className="mt-1 text-sm text-[#23066d]">
                    {currency}
                    {productData.price}
                  </p>
                </div>
              </div>

              {/* Quantity Input */}
              <input
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (!isNaN(value) && value > 0) {
                    updateQuantity(item._id, value);
                  }
                }}
                className="border w-12 sm:w-20 px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-[#23066d]"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />

              {/* Remove Button */}
              <img
                onClick={() => updateQuantity(item._id, 0)}
                className="w-5 sm:w-6 cursor-pointer"
                src={assets.bin_icon}
                alt="Remove"
              />
            </div>
          );
        })}
      </div>

      {/* Cart Total Section */}
      <div className="flex flex-col sm:flex-row justify-between my-10 sm:my-20">
        <div className="w-full sm:w-[450px] self-end">
          <CartTotal />

          <div className="text-end mt-5">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-[#23066d] text-white text-sm px-8 py-3 rounded-md shadow-md hover:shadow-lg hover:bg-[#1b054f] transition duration-300"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
