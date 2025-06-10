import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/order/list", {
        headers: { token },
      });
      if (res.data.success) {
        setOrders(res.data.orders.reverse());
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (err) {
      toast.error("Server error");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/order/status",
        { orderId, status },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success("Order status updated");
        fetchOrders();
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      toast.error("Server error");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 sm:px-8">
      <h1 className="text-3xl font-bold text-center text-[#23066d] mb-10">
        📦 Orders Dashboard
      </h1>

      {loading ? (
        <p className="text-center text-lg">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-lg">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition duration-300"
            >
              <div className="flex flex-col md:flex-row md:justify-between gap-4">
                {/* Left Column: Address and User */}
                <div className="md:w-1/3">
                  <h3 className="text-lg font-semibold text-[#23066d] mb-2">👤 Customer</h3>
                  <p className="text-sm font-medium">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{order.address.street}</p>
                  <p className="text-sm text-gray-600">
                    {order.address.city}, {order.address.state}, {order.address.country} -{" "}
                    {order.address.zipcode}
                  </p>
                  <p className="text-sm text-gray-600">📞 {order.address.phone}</p>
                </div>

                {/* Middle Column: Items and Payment */}
                <div className="md:w-1/3">
                  <h3 className="text-lg font-semibold text-[#23066d] mb-2">🛒 Items</h3>
                  {order.items.map((item, index) => (
                    <p key={index} className="text-sm text-gray-700">
                      • {item.name} x {item.quantity}
                    </p>
                  ))}
                  <div className="mt-3 text-sm">
                    <p>
                      💰 <span className="font-medium">Total:</span> ₹{order.amount}
                    </p>
                    <p>
                      🧾 <span className="font-medium">Method:</span>{" "}
                      {order.PaymentMethod}
                    </p>
                    <p>
                      💳 <span className="font-medium">Payment:</span>{" "}
                      <span className={order.payment ? "text-green-600" : "text-red-500"}>
                        {order.payment ? "Paid" : "Unpaid"}
                      </span>
                    </p>
                    <p>
                      📅{" "}
                      {new Date(order.date).toLocaleDateString()}{" "}
                      <span className="text-xs text-gray-500">
                        ({new Date(order.date).toLocaleTimeString()})
                      </span>
                    </p>
                  </div>
                </div>

                {/* Right Column: Status and Actions */}
                <div className="md:w-1/3">
                  <h3 className="text-lg font-semibold text-[#23066d] mb-2"> Status</h3>
                  <span
                    className={`inline-block px-3 py-1 mb-4 rounded-full text-sm font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status || "Pending"}
                  </span>

                  <div className="flex gap-3 flex-wrap">
                    <button
                      onClick={() => updateOrderStatus(order._id, "Shipped")}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm transition"
                    >
                      Mark as Shipped
                    </button>
                    <button
                      onClick={() => updateOrderStatus(order._id, "Delivered")}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-md text-sm transition"
                    >
                      Mark as Delivered
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
