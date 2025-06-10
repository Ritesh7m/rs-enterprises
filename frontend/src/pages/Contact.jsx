import React from "react";
import Title from "../component/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../component/NewsletterBox";

const Contact = () => {
  return (
    <div className="bg-gray-50 py-10">
      <div className="text-center text-3xl sm:text-4xl font-bold text-blue-600 pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col items-center md:flex-row gap-10 mb-28 px-4 sm:px-8 lg:px-40">
        <img
          className="w-full max-w-xs sm:max-w-sm md:max-w-[480px] rounded-lg shadow-lg transition-transform transform hover:scale-105"
          src={assets.contact_img}
          alt="Contact Us"
        />
        <div className="flex flex-col justify-center items-start gap-4 sm:gap-6 text-gray-800">
          <p className="font-semibold text-lg sm:text-xl text-gray-700">Our Store</p>
          <p className="text-gray-600 text-base sm:text-lg">
            Shop No. 16/17 Rooprajat Park, Bldg. No. 3 Sector No. 1 Near HDFC Bank Opp. <br /> 
            Tata Housing Boisar(E) Palghar - 401501
          </p>
          <p className="text-gray-600 text-base sm:text-lg">
            Tel: +91 8652352328 / +91 8369472977 / +91 9702398437 <br /> 
            Email: rs.enterprisesrosystem2014@gmail.com
          </p>
          <button className="bg-[#23066d] text-white px-6 py-3 mt-4 text-sm sm:text-base hover:bg-blue-700 transition duration-300">
            Get In Touch
          </button>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default Contact;