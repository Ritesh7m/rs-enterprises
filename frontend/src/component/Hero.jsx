import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex flex-col sm:flex-row border border-gray-400">
      {/* Left Section */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#23066d]">
          <h1 className="text-5xl">Welcome to Rs-Enterprises</h1>
          <br />
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#23066d]"></p>
            <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
          </div>
          <h1 className="text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            Latest Arrivals
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[2px] bg-[#23066d]"></p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full sm:w-1/2 flex items-center justify-center">
        <img
          className="w-full sm:w-auto sm:max-w-full object-contain mx-4 mb-6 sm:mb-10 mt-6 sm:mt-10 rounded-[50px] transition-transform transform hover:scale-105 hover:brightness-110"
          src={assets.hero_img}
          alt="Hero"
        />
      </div>
    </div>
  );
};

export default Hero;
