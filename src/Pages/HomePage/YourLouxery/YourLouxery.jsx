import React from "react";
import { Link } from "react-router";
import { FaHome, FaDollarSign } from "react-icons/fa";

const YourLouxery = () => {
  return (
    <div className="w-full h-[60vh] relative overflow-hidden">
      {/* ✅ Fullscreen Background Image */}
      <img
        src="https://i.ibb.co/DgvhSvvS/loux1.jpg"
        alt="Full Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* ✅ Dark Overlay */}
      <div className="absolute inset-0 bg-[#14203e]/95 z-10"></div>

      {/* ✅ Main Content Section */}
      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-2 h-full">
        {/* Left Side Text */}
        <div className="flex items-center justify-center px-10 mt-24 lg:mt-0 text-white">
          <div className="text-left max-w-2xl">
            <h4
              data-aos="fade-up"
              data-aos-duration="1500"
              className="text-orange-500 text-lg md:text-xl lg:text-2xl font-medium flex items-center"
            >
              <FaHome className="mr-2"></FaHome>DESHESTATE
            </h4>
            <h1
              data-aos="fade-up"
              data-aos-duration="1500"
              data-aos-delay="100"
              className="text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-4 leading-snug"
            >
              Your luxury. Your lifestyle.
            </h1>
            <p data-aos="fade-up"
              data-aos-duration="1500"
              data-aos-delay="200" className="text-lg md:text-xl mb-6 text-gray-300">
              At our core, we believe finding a home should feel comforting, not
              complicated. That’s why we offer trusted listings, expert support,
              and premium properties that match your lifestyle.
            </p>
            <Link to="/allProperties">
              <button
              data-aos="fade-up"
              data-aos-duration="1500"
              data-aos-delay="200" className="mt-2 mb-10 md:mb-0 px-6 py-3 text-gray-200 font-semibold rounded-full border hover:border-0 border-gray-200 hover:bg-orange-500 transition duration-500 cursor-pointer text-lg xl:text-xl flex items-center">
                View Properties <FaHome className="ml-2" />
              </button>
            </Link>
          </div>
        </div>

        {/* Right Side Image with custom diagonal clip */}
        <div
          data-aos="fade-left"
          data-aos-duration="1500"
          data-aos-delay="100"
          className="clip-right-25 w-full h-full overflow-hidden relative z-20"
        >
          <img
            src="https://i.ibb.co/DgvhSvvS/loux1.jpg"
            alt="Luxury Home"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 🏠 Mini House Cards + Price */}
      <div className="absolute z-30 bottom-0 md:bottom-10 left-1/2 transform -translate-x-1/2 flex gap-6">
        {/* Card 1 */}
        <div data-aos="fade-right"
              data-aos-duration="1500"
              data-aos-delay="100"
              className="bg-white shadow-lg rounded-md overflow-hidden w-32 sm:w-40 h-20 md:h-full">
          <img
            src="https://i.ibb.co/qYm2qPjc/loux.jpg"
            alt="House 1"
            className="w-full h-24 object-cover"
          />
          <div className="p-2 text-xs font-medium text-center text-gray-800">
            Hilltop Villa
          </div>
        </div>
        {/* Card 2 */}
        <div data-aos="fade-down"
              data-aos-duration="1500"
              data-aos-delay="100" className="bg-white shadow-lg rounded-md overflow-hidden w-32 sm:w-40 h-20 md:h-full">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
            alt="House 2"
            className="w-full h-24 object-cover"
          />
          <div className="p-2 text-xs font-medium text-center text-gray-800">
            Lakeview Estate
          </div>
        </div>
        {/* Price Tag */}
        <div data-aos="fade-left"
              data-aos-duration="1500"
              data-aos-delay="100" className="bg-orange-500/70 text-white shadow-lg rounded-md px-1 md:px-4 py-1 md:py-3 flex items-center gap-2 text-lg md:text-2xl xl:text-3xl font-medium md:font-semibold text-center border-2 md:border-4 border-white h-20 md:h-32">
          1,750 <br /> Square Areas
        </div>
      </div>

      <style>{`
        .clip-right-25 {
          clip-path: polygon(40% 0%, 100% 0%, 100% 100%, 0% 100%);
        }
      `}</style>
    </div>
  );
};

export default YourLouxery;
