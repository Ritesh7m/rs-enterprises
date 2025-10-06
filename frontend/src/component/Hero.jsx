import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="relative w-full min-h-[70vh] sm:min-h-screen bg-[#FFFEFD] overflow-hidden">
      {/* Background Image */}
      <img
        src={assets.heroImage}
        alt="Modern RO water purifier system for home use"
        className="absolute top-0 left-0 w-full h-full object-cover brightness-[0.85] contrast-[1.05] z-0"
      />

      {/* Soft Gradient Overlay for readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#FFFEFD]/85 via-[#FFFEFD]/20 to-transparent z-0"></div>

      {/* Hero Content */}
      <div className="relative z-10 px-5 sm:px-[6vw] md:px-[8vw] lg:px-[10vw] flex flex-col sm:flex-row items-center justify-between min-h-[70vh] sm:min-h-screen">
        
        {/* Left Section */}
        <div className="w-full sm:w-1/2 flex items-center justify-center py-12 sm:py-0">
          <div className="backdrop-blur-[3px] bg-[#FFFEFD]/5 p-5 sm:p-6 rounded-2xl text-center sm:text-left">
            
            {/* Main Heading */}
            <h1 className="text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-semibold leading-snug sm:leading-tight text-[#190053]/90 drop-shadow-[0_1px_3px_rgba(25,0,83,0.25)]">
              Welcome to{" "}
              <span className="text-[#5C3AFF] font-extrabold">
                RS Enterprises
              </span>
            </h1>

            {/* Subheading Line */}
            <div className="mt-5 flex items-center justify-center sm:justify-start gap-3">
              <p className="w-8 sm:w-10 md:w-14 h-[2px] bg-[#5C3AFF]"></p>
              <p className="font-medium text-xs sm:text-sm md:text-base text-[#190053]/80 tracking-widest uppercase">
                Our Bestsellers
              </p>
            </div>

            {/* Tagline */}
            <h2 className="text-base xs:text-lg sm:text-3xl lg:text-5xl py-3 sm:py-4 leading-relaxed text-[#190053]/90 font-light italic drop-shadow-[0_1px_2px_rgba(25,0,83,0.2)]">
              Discover the Essence of Pure Innovation
            </h2>

            {/* CTA Button */}
            <button
              className="mt-5 sm:mt-6 px-6 sm:px-8 py-2.5 sm:py-3 bg-[#5C3AFF] text-[#FFFEFD] font-semibold rounded-full text-sm sm:text-lg shadow-md hover:bg-[#190053] hover:shadow-lg transition-all duration-300"
              onClick={() => window.scrollTo({ top: 700, behavior: 'smooth' })}
            >
              Explore Now
            </button>
          </div>
        </div>

        {/* Right Decorative Section */}
        <div className="w-full sm:w-1/2 hidden sm:block"></div>
      </div>
    </div>
  );
};

export default Hero;
