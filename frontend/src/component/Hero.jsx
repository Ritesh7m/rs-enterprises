import hero_video from "../assets/hero_vdo.mp4";

const Hero = () => {
  return (
    <div className="relative w-full min-h-[70vh] sm:min-h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-50 z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={hero_video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Shade */}
      <div className="absolute top-0 left-0 w-full h-full  opacity-60 z-0"></div>

      {/* Hero Content */}
      <div className="relative z-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex flex-col sm:flex-row items-center justify-between min-h-[70vh] sm:min-h-screen">
        {/* Left Section */}
        <div className="w-full my-2 sm:w-1/2 flex items-center justify-center py-8 sm:py-0">
          <div>
            <h1 className="text-3xl sm:text-5xl font-semibold text-[#23066d]">
              Welcome to RS-Enterprises
            </h1>
            <br />
            <div className="flex items-center gap-2">
              <p className="w-8 md:w-11 h-[2px] bg-[#23066d]"></p>
              <p className="font-medium text-sm md:text-base text-[#23066d]">
                OUR BESTSELLERS
              </p>
            </div>
            <h2 className="text-xl sm:text-3xl lg:text-5xl py-3 leading-relaxed text-[#23066d]">
              Latest Arrivals
            </h2>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-sm md:text-base text-[#23066d]">
                SHOP NOW
              </p>
              <p className="w-8 md:w-11 h-[2px] bg-[#23066d]"></p>
            </div>
          </div>
        </div>

        {/* Right Section (Empty) */}
        <div className="w-full sm:w-1/2 hidden sm:block"></div>
      </div>
    </div>
  );
};

export default Hero;
