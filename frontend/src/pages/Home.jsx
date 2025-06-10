import React from "react";
import Hero from "../component/Hero";
import LatestColletion from "../component/LatestColletion";
import BestSeller from "../component/BestSeller";
import OurPolicy from "../component/OurPolicy";
import NewsletterBox from "../component/NewsletterBox";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <LatestColletion></LatestColletion>
      <BestSeller></BestSeller>
      <OurPolicy></OurPolicy>
      <NewsletterBox></NewsletterBox>
    </div>
  );
};

export default Home;