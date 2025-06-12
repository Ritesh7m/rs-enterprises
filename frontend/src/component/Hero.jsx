import hero_video from "../assets/hero_vdo.mp4";

const Hero = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
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
      <div className="absolute top-0 left-0 w-full h-full opacity-60 z-0"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center sm:items-start justify-center px-6 sm:px-12 md:px-20 py-24 min-h-screen text-white text-center sm:text-left">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight  text-[#311f60]">
          Welcome to RS-Enterprises
        </h1>

        {/* Subheading - Our Bestsellers */}
        <div className="flex items-center justify-center sm:justify-start gap-2 mt-4">
          <div className="w-10 h-[2px] bg-[#311f60]"></div>
          <p className="uppercase text-sm tracking-wide text-[#311f60]">Our Bestsellers</p>
        </div>

        {/* Main Title */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-4 text-[#311f60]">
          Latest Arrivals
        </h2>

        {/* Call to Action */}
        <div className="flex items-center justify-center sm:justify-start gap-2 mt-4">
          <p className="font-semibold text-base text-[#311f60]">Shop Now</p>
          <div className="w-10 h-[2px] bg-[#311f60] "></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
