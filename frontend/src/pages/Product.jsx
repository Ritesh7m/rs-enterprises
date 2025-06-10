import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProduct from "../component/RelatedProduct";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [images, setImages] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImages(item.images[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="my-10 px-4 sm:px-[5vw] md:px-[7vw] 1g:px-[9vw]">
      <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
        <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
          <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
            <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
              {productData.images.map((item, index) => (
                <img
                  onClick={() => setImages(item)}
                  src={item}
                  key={index}
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                  alt=""
                />
              ))}
            </div>
            <div className="w-full sm:w-[80%]">
              <img className="w-full h-auto" src={images} alt="" />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <h1 className="font-medium text-2xl mt-2 text-[#23066d]">
              {productData.name}
            </h1>
            <div className="flex items-center gap-1 mt-2">
              {[...Array(4)].map((_, idx) => (
                <img src={assets.star_icon} className="w-3.5" key={idx} alt="" />
              ))}
              <img src={assets.star_dull_icon} className="w-3.5" alt="" />
              <p className="pl-2">(122)</p>
            </div>
            <p className="mt-5 text-3xl font-medium">
              {currency}
              {productData.price}
            </p>
            <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>

            {/* Add to Cart Button */}
            <button
              onClick={() => {
                if (productData.inStock) {
                  addToCart(productData._id);
                  toast.success("Product added to cart!");
                } else {
                  toast.error("Product is out of stock.");
                }
              }}
              className={`mt-6 px-8 py-3 text-sm rounded ${
                productData.inStock
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
              disabled={!productData.inStock}
            >
              {productData.inStock ? "ADD TO CART" : "OUT OF STOCK"}
            </button>

            <hr className="mt-8 sm:w-4/5" />
            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
              <p>100% Original product.</p>
              <p>Only Cash on Delivery is Available.</p>
            </div>
          </div>
        </div>

        {/* Description and Review Section */}
        <div className="mt-20">
          <div className="flex">
            <b className="border px-5 py-3 text-sm text-[#23066d]">Description</b>
            <p className="border px-5 py-3 text-sm">What Our Customers Say</p>
          </div>
          <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
            <p>
              Discover our range of advanced water purifiers equipped with
              cutting-edge RO+UV+UF+Zinc Copper Alkaline technology. From sleek
              designs to smart features like LED indicators, TDS controllers,
              and high-capacity filtration, our purifiers ensure pure,
              mineral-rich water. Perfect for homes and businesses, our products
              combine innovation, quality, and reliability for healthier
              hydration every day.
            </p>
            <ul>
              <li>
                "Excellent product! The water tastes amazing, and the
                purification process is top-notch."
              </li>
              <li>
                "Sleek design and advanced features—perfect for my family’s
                needs."
              </li>
              <li>
                "Reliable performance with great customer support. Highly
                recommended!"
              </li>
            </ul>
          </div>
        </div>

        {/* Related Products */}
        <RelatedProduct
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
