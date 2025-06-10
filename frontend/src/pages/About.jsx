import React from "react";
import Title from "../component/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../component/NewsletterBox";

const About = () => {
  return (
    <div className="mx-4 sm:mx-8 md:mx-10">
      {/* About Section */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1="ABOUT" text2="US" style={{ color: "#23066d" }} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-8 md:gap-16 fade-in">
        {/* Left side: Image */}
        <img
          className="w-full md:max-w-[450px] rounded-lg shadow-lg"
          src={assets.about_img}
          alt="About Image"
        />
        {/* Right side: Text */}
        <div className="flex flex-col justify-center gap-6 text-gray-600 fade-in">
          <p className="text-sm sm:text-base">
            At Rs Enterprises Ro systems, we are dedicated to providing
            top-quality water purification solutions to ensure your family’s
            health and well-being. We offer a wide range of the best water
            purifiers tailored to meet your specific needs. Our expert services
            include installation, repairs, and maintenance, ensuring your water
            purifier operates at peak performance. With a commitment to
            excellence and customer satisfaction, Rs Enterprises Ro System is
            your trusted partner for clean and safe drinking water.
          </p>
          <p className="text-sm sm:text-base">
            Water purifiers are essential devices designed to improve the
            quality of drinking water by removing impurities and contaminants.
            They come in various types, including reverse osmosis systems,
            activated carbon filters, and UV purifiers. When choosing a water
            purifier, consider factors like water quality, budget, and
            maintenance requirements to ensure you get the right product for
            your needs. Regular maintenance and filter replacement are crucial
            to ensure the purifier continues to provide clean and safe drinking
            water.
          </p>
        </div>
      </div>

      {/* Services Section */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title
          text1="SERVICE THAT "
          text2="WE DO"
          style={{ color: "#23066d" }}
        />
      </div>
      <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        {[
          { img: assets.service_img1, title: "Domestic RO" },
          { img: assets.service_img2, title: "RO Plant" },
          { img: assets.service_img3, title: "Commercial Plant" },
          { img: assets.service_img4, title: "Water Cool" },
          { img: assets.service_img5, title: "Industrial Plant" },
          { img: assets.service_img6, title: "Hydro Pneumatic" },
        ].map((service, index) => (
          <div
            key={index}
            className="bg-white p-6 sm:p-8 shadow-lg rounded-lg hover:shadow-2xl transition-shadow"
          >
            <img
              className="w-full h-48 sm:h-56 object-cover rounded-md"
              src={service.img}
              alt={`Service ${index + 1}`}
            />
            <h3
              className="text-lg sm:text-xl font-semibold mt-4"
              style={{ color: "#23066d" }}
            >
              {service.title}
            </h3>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row flex-wrap text-sm sm:text-base mb-20 gap-4 sm:gap-8">
        {[
          {
            title: "Quality Assurance",
            description:
              "At RS Enterprises, we guarantee top-quality water purification solutions, ensuring your family enjoys the safest, cleanest water every day.",
          },
          {
            title: "Convenience",
            description:
              "We bring convenience to your doorstep with hassle-free installation, repairs, and maintenance for your water purifier.",
          },
          {
            title: "Exceptional Customer Service",
            description:
              "Your satisfaction is our priority. RS Enterprises is committed to providing personalized, exceptional service to meet your unique needs.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="border p-6 sm:p-10 flex flex-col gap-4 sm:gap-5 w-full sm:w-[calc(50%-16px)] md:w-[calc(33%-16px)]"
          >
            <b>{item.title}:</b>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;