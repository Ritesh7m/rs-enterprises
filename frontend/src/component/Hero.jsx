import { assets } from "../assets/assets";
import hero_video from "../assets/hero_vdo.mp4";

const Hero = () => {
  return (
    <div className="relative w-full overflow-hidden min-h-screen">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-60 z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={hero_video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Hero Content */}
      <div className="relative z-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex flex-col sm:flex-row border border-gray-400">
        {/* Left Section */}
        <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
          <div className="text-[#23066d]">
            <h1 className="text-5xl  text-white ">Welcome to Rs-Enterprises</h1>
            <br />
            <div className="flex items-center gap-2">
              <p className="w-8 md:w-11 h-[2px] bg-white"></p>
              <p className="font-medium text-sm md:text-base  text-white">
                OUR BESTSELLERS
              </p>
            </div>
            <h1 className="text-3xl sm:py-3 lg:text-5xl leading-relaxed  text-white">
              Latest Arrivals
            </h1>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-sm md:text-base  text-white">SHOP NOW</p>
              <p className="w-8 md:w-11 h-[2px] bg-white"></p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full sm:w-1/2 flex items-center justify-center">
          <img
            className="w-full sm:w-auto sm:max-w-full max-h-[500px] object-contain mx-4 mb-6 sm:mb-10 mt-6 sm:mt-10 rounded-[40px] transition-transform transform hover:scale-105 hover:brightness-110"
            src={assets.hero_img}
            alt="Hero"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
