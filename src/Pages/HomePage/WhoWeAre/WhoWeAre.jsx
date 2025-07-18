import React from "react";
import { FaHome } from "react-icons/fa";
import { BsTelephoneXFill } from "react-icons/bs";
import { Link } from "react-router";

const WhoWeAre = () => {
  return (
    <div className="bg-orange-50/80">
      <div className="max-w-[1320px] mx-auto py-20 lg:py-30 flex flex-col lg:flex-row items-center  px-4 md:px-10 gap-10 lg:gap-0">
        <div
          data-aos="fade-up"
          data-aos-duration="1500"
          className="relative flex-1"
        >
          <div className="hidden 2xl:flex">
            <div className="absolute bottom-48 -left-10">
              <h2 className="text-[#14203e] font-bold text-5xl -rotate-90 origin-left whitespace-nowrap -ml-16 -mb-10">
                679K+
              </h2>
              <p className="text-gray-700 font-medium text-2xl -rotate-90 origin-left whitespace-nowrap">
                LISTED PROPERTIES
              </p>
            </div>
          </div>
          <div>
            <img
              src="https://i.ibb.co/mCxQ1XKb/vila.jpg"
              alt="img"
              className="w-full lg:w-[90%] h-[40vh] md:h-[600px] lg:h-[500px] 2xl:h-[600px] object-cover rounded-2xl"
            />
            <div className="w-[90%] h-26 bg-orange-600 absolute bottom-20 -left-34 opacity-50 hidden 2xl:flex"></div>
          </div>
          <img
            src="https://i.ibb.co/LDL8vW9x/Untitled-design-1-removebg-preview.png"
            alt=""
            className="w-40 md:w-96 lg:w-60 xl:w-80 2xl:w-96 absolute bottom-0 "
          />
        </div>

        <div className="flex-1">
          <h4
            data-aos="fade-up"
            data-aos-duration="1500"
            className="text-xl flex items-center gap-4 text-orange-500"
          >
            {" "}
            <FaHome></FaHome>WHO WE ARE
          </h4>
          <h1
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-delay="100"
            className="text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-4 leading-snug text-[#14203e]"
          >
            Where Finding a House Feels Like Home
          </h1>
          <p
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-delay="200"
            className="text-gray-600 text-lg"
          >
            At our core, we believe finding a home should feel comforting, not
            complicated. That’s why we offer trusted listings, expert support,
            and a seamless experience tailored to your needs and dreams.
          </p>

          <div
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-delay="300"
            className="space-y-4 xl:space-y-6 mt-10 text-lg md:text-xl xl:text-2xl"
          >
            <p className=" font-medium text-gray-800">
              <span className="text-orange-500 mr-4">→</span> Pontificate the
              client proactively
            </p>
            <p className=" font-medium text-gray-800">
              <span className="text-orange-500 mr-4">→</span> Does the selected
              item have a waiting list?
            </p>
            <p className=" font-medium text-gray-800">
              <span className="text-orange-500 mr-4">→</span> Instant 24-hour
              Emergency
            </p>
          </div>

          <div data-aos="fade-up"
              data-aos-duration="1500"
              data-aos-delay="100" className="mt-10 xl:mt-14 flex flex-col md:flex-row items-center gap-10">
            <Link to="/aboutUs">
            <button className="text-lg md:text-xl px-8 py-5 rounded-full bg-[#14203e] hover:bg-orange-500 transition duration-500 text-white flex items-center gap-4 cursor-pointer">
              ABOUT US MORE <FaHome></FaHome>
            </button>
            </Link>

            <div className="flex items-center gap-4">
              <p className="bg-[#14203e]/30 px-6 py-6 rounded-full">
                <BsTelephoneXFill size={20}></BsTelephoneXFill>
              </p>
              <p className="text-xl">
                Call Us 24/7 <br />{" "}
                <span className="font-medium">+88 01927785731</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
