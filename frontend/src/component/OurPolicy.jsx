import React from "react";
import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <div className="my-10 px-4 sm:px-[5vw] md:px-[7vw] 1g:px-[9vw]`">
    <div className="flex flex-col sm:flex-row justify-around  gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-grey-700">

        <div>
            <img src= {assets.exchange_icon} className="w-12 m-auto mb-5" />
            <p className="font-semibo">Domestic-Ro+UV+UF+TDS Adjuster+Mineral+Alkaline</p>
            <p className="text-grey-400">Water Testing and Analysis</p>
        </div>
        <div>
            <img src= {assets.quality_icon} className="w-12 m-auto mb-5" />
            <p className="font-semibond">1 Year Warranty Only Filter</p>
            <p className="text-grey-400">3 Service Free(Visit Charges Required)*</p>
            <p className="text-grey-400">Visit charges 10 km charge ₹350 , 10 To 40 KM ₹550</p>
            
        </div>
        <div>
            <img src= {assets.support_img} className="w-12 m-auto mb-5" />
            <p className="font-semibond">Best Customsr Support</p>
            <p className="text-grey-400">We  provide 24x7 customer support</p>
        </div>
    </div>
    </div>
  );
};

export default OurPolicy;
