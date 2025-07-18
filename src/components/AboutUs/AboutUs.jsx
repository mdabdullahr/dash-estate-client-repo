import React, { useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router";

const AboutUs = () => {
    useEffect(() => {
    document.title = "DashEstate | About_Us";
  }, []);
  return (
    <div className="mb-20 lg:mb-30">
      <div className="">
        {/* Image */}
        <div className="w-full relative overflow-hidden mt-20">
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
            <div className="flex items-center justify-center px-4 md:px-10 py-10 md:py-20 lg:mt-0 text-white">
              <div className="text-left max-w-3xl">
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
                  className="text-2xl md:text-3xl xl:text-4xl font-bold mb-4 leading-snug"
                >
                  Discover Who We Are
                </h1>
                <p
                  data-aos="fade-up"
                  data-aos-duration="1500"
                  data-aos-delay="200"
                  className="text-sm md:text-lg mb-6 text-gray-300"
                >
                  Welcome to our modern real estate platform — a next-generation
                  solution designed to bridge the gap between dreamers and
                  doers. We aren't just about property listings. We're about
                  possibilities, people, and places that truly matter. Our
                  mission is to simplify, streamline, and empower every step of
                  the real estate journey, whether you're a buyer, an agent, or
                  an administrator.
                </p>
                <p
                  data-aos="fade-up"
                  data-aos-duration="1500"
                  data-aos-delay="200"
                  className="text-sm md:text-lg mb-6 text-gray-300"
                >
                  For users, we offer a clean interface to explore high-quality,
                  verified properties, save them to personalized wishlists, make
                  offers within pricing guidelines, and review their
                  experiences. Our secure authentication and clear communication
                  system ensure confidence in every interaction.
                </p>
                <p
                  data-aos="fade-up"
                  data-aos-duration="1500"
                  data-aos-delay="200"
                  className="text-sm md:text-lg mb-6 text-gray-300"
                >
                  For agents, the platform acts as a robust workspace. Agents
                  can add, update, and manage property listings, view buyer
                  interest, respond to offers, and track all sales and pending
                  requests. It also offers visual dashboards with analytics,
                  helping them stay on top of their performance in real-time.
                </p>
                <p
                  data-aos="fade-up"
                  data-aos-duration="1500"
                  data-aos-delay="200"
                  className="text-sm md:text-lg mb-6 text-gray-300"
                >
                  Admins enjoy full control over user roles, property
                  verifications, review monitoring, and fraud detection. Whether
                  it's verifying an agent's authenticity, promoting users, or
                  featuring top-tier properties — the admin dashboard enables
                  transparent and responsive governance.
                </p>
                <p
                  data-aos="fade-up"
                  data-aos-duration="1500"
                  data-aos-delay="200"
                  className="text-sm md:text-lg mb-6 text-gray-300"
                >
                  Join thousands of users who trust our platform every day.
                  Whether you’re looking to buy, sell, manage, or just explore
                  the latest real estate listings, we're here to help you move
                  forward — smartly, safely, and confidently.
                </p>
                <Link
                  data-aos="fade-up"
                  data-aos-duration="1500"
                  data-aos-delay="200"
                  to="/allProperties"
                >
                  <button className="border hover:border-0 border-white text-white px-4 md:px-8 py-2 md:py-4 text-sm lg:text-lg xl:text-xl font-medium rounded-full hover:bg-orange-500 transition duration-500 cursor-pointer">
                    Explore Properties →
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
                src="https://i.ibb.co/0jmZzCn0/luxarious-home.jpg"
                alt="Luxury Home"
                className="w-full h-[60vh] md:h-full object-cover"
              />
            </div>
          </div>

          {/* ✂️ Clip Path Styling */}
          <style>{`
                  .clip-right-25 {
                    clip-path: polygon(40% 0%, 100% 0%, 100% 100%, 0% 100%);
                  }
                `}</style>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
