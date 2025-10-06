// ============================================
// FILE: LatestCollection.jsx (UPDATED)
// ============================================
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import Productitem from "./Productitem";
import { mockProducts } from "../mocks/mockProducts";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    // Use mock products in development, real products in production
    const productsToUse = process.env.NODE_ENV === "development" ? mockProducts : products;
    setLatestProducts(productsToUse.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10 px-4 sm:px-[5vw] md:px-[7vw] 1g:px-[9vw]">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-xl text-gray-600">
          Discover our latest collection of premium water purifiers, featuring
          cutting-edge technology, stylish designs, and advanced purification
          systems. Experience the perfect blend of innovation and health for
          pure, mineral-rich water every day.
        </p>
      </div>
      {/* display product */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item, index) => (
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

export default LatestCollection;