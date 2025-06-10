// ...imports remain unchanged
import React, { useContext, useState } from "react";
import Title from "../component/Title";
import CartTotal from "../component/CartTotal";
import stripeLogo from "../assets/stripe_logo.png";
import razorpay from "../assets/razorpay_logo.png";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import {toast} from 'react-toastify'

const PlaceOrder = () => {
  const delivery_fee = 350;
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    products,
  } = useContext(ShopContext);
  const amt = getCartAmount();
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const productId in cartItems) {
        const quantity = cartItems[productId];
        if (quantity > 0) {
          const itemInfo = structuredClone(
            products.find((product) => product._id === productId)
          );
          if (itemInfo) {
            itemInfo.quantity = quantity;
            orderItems.push(itemInfo);
          }
        }
      }

      const finalAmt = amt + delivery_fee;

      const orderData = {
        userId,
        items: orderItems,
        amount: finalAmt,
        address: formData,
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            `${backendUrl}/api/order/place`,
            orderData,
            {
              headers: { token },
            }
          );
          if (response.data.success) {
            toast.success("Order placed successfully!");
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

       case "stripe":
  const stripeRes = await axios.post(
    `${backendUrl}/api/order/stripe`,
    orderData,
    {
      headers: { token },
    }
  );
  if (stripeRes.data.success) {
    localStorage.setItem("stripeOrderId", stripeRes.data.orderId); // Save orderId to use after redirection
    window.location.href = stripeRes.data.session_url;
  } else {
    toast.error(stripeRes.data.message);
  }
  break;


        default:
          toast.error("Please select a payment method.");
          break;
      }
    } catch (error) {
      toast.error("Failed to place order.");
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-6 pt-5 sm:pt-14 min-h-[80vh] border-t px-4 sm:px-20"
    >
      {/* Left Section */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title
            text1={<span className="text-[#23066d]">DELIVERY</span>}
            text2={<span className="text-[#23066d]">INFORMATION</span>}
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
              className="border border-gray-300 rounded py-2 px-4 w-full"
              type="text"
              placeholder="First name"
              required
            />
            <input
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
              className="border border-gray-300 rounded py-2 px-4 w-full"
              type="text"
              placeholder="Last name"
              required
            />
          </div>
          <input
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
            className="border border-gray-300 rounded py-2 px-4 w-full"
            type="email"
            placeholder="Email address"
            required
          />
          <input
            onChange={onChangeHandler}
            name="street"
            value={formData.street}
            className="border border-gray-300 rounded py-2 px-4 w-full"
            type="text"
            placeholder="Street"
            required
          />
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
              className="border border-gray-300 rounded py-2 px-4 w-full"
              type="text"
              placeholder="City"
              required
            />
            <input
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
              className="border border-gray-300 rounded py-2 px-4 w-full"
              type="text"
              placeholder="State"
              required
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              onChange={onChangeHandler}
              name="zipcode"
              value={formData.zipcode}
              className="border border-gray-300 rounded py-2 px-4 w-full"
              type="number"
              placeholder="Zipcode"
              required
            />
            <input
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
              className="border border-gray-300 rounded py-2 px-4 w-full"
              type="text"
              placeholder="Country"
              required
            />
          </div>
          <input
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            className="border border-gray-300 rounded py-2 px-4 w-full"
            type="number"
            placeholder="Phone"
            required
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col w-full sm:max-w-[480px] mt-8 sm:mt-0">
        <div className="text-xl sm:text-2xl mb-4 sm:mb-8">
          <Title
            text1={<span className="text-[#23066d]">ORDER</span>}
            text2={<span className="text-[#23066d]">SUMMARY</span>}
          />
        </div>
        <div className="border border-gray-300 rounded p-4 mb-8">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title
            text1={<span className="text-[#23066d]">PAYMENT</span>}
            text2={<span className="text-[#23066d]">METHOD</span>}
          />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-[14px] h-[14px] border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={stripeLogo} alt="Stripe Logo" />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-[14px] h-[14px] border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={razorpay} alt="Razorpay Logo" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-[14px] h-[14px] border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-[#23066d] text-white px-16 py-3 text-sm mb-4 rounded-md shadow-md hover:shadow-lg hover:bg-[#1b054f] transition duration-300"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
