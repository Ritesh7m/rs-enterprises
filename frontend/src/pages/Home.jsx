import React, { useState, useEffect } from "react";
import Hero from "../component/Hero";
import LatestColletion from "../component/LatestColletion";
import BestSeller from "../component/BestSeller";
import OurPolicy from "../component/OurPolicy";
import NewsletterBox from "../component/NewsletterBox";

const Home = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    // 👇 Added top padding only on mobile
    <div className="relative pt-16 sm:pt-0">
      <Hero />
      <LatestColletion />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />

      {/* Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="
            fixed bottom-6 right-6 sm:bottom-10 sm:right-10
            bg-[#5C3AFF] text-[#FFFEFD]
            w-12 h-12 sm:w-16 sm:h-16
            rounded-full shadow-lg
            hover:bg-[#190053]
            hover:scale-110
            transition-all duration-300
            flex items-center justify-center
            z-[999]
          "
          aria-label="Back to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 sm:h-8 sm:w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Home;
