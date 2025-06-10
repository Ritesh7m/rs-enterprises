import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import Productitem from "./Productitem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(1, 6));
  }, [products]);

  return (
    <div className="my-10 px-4 sm:px-[5vw] md:px-[7vw] 1g:px-[9vw]">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-xl text-gray-600">
          Explore our Best Sellers, trusted by countless customers for unmatched
          performance and reliability. These top-rated water purifiers combine
          advanced technology and superior design to deliver pure, healthy, and
          mineral-rich water every time.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item, index) => (
          <Productitem
            key={index}
            id={item._id}
            images={item.images}
            name={item.name}
            price={item.price}
            inStock={item.inStock}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
