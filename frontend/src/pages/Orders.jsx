import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../component/Title';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(`${backendUrl}/api/order/userorders`, {}, {
        headers: { token }
      });

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date
            });
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log("Error loading orders:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16 mx-4 sm:mx-20">
      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>
      <div>
        {orderData.length === 0 ? (
          <p className="text-gray-500 mt-8">No orders found.</p>
        ) : (
          orderData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                <img
                  className="w-16 sm:w-20 object-cover"
                  src={item.images?.[0]}
                  alt={item.name}
                />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                    <p>
                      {currency} {item.price}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Date: {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="flex items-center gap-2 mb-2 sm:mb-0">
                  <div className={`min-w-2 h-2 rounded ${item.status === 'Delivered' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                  <p className="text-sm   md:text-base">{item.status}</p>
                </div>
                <button onClick={loadOrderData} className="border w-full sm:w-28 h-10 px-4 py-2 text-sm font-medium rounded-sm hover:shadow-md transition">
                  Track order
                </button>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
