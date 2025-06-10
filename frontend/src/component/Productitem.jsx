import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const Productitem = ({ id, images, name, price, inStock }) => {
  const { currency } = useContext(ShopContext);
  
  const productImage = Array.isArray(images) && images.length > 0 ? images[0] : "/placeholder.png";

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden relative">
        <img
          className="hover:scale-110 transition ease-in-out"
          src={productImage}
          alt={name || "Product"}
        />
        {!inStock && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
            Out of Stock
          </span>
        )}
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default Productitem;
