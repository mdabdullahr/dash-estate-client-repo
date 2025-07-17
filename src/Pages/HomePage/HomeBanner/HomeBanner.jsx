import { Link } from "react-router";
import { TypeAnimation } from "react-type-animation";
import { FaHome, FaSearch } from "react-icons/fa";

const HomeBanner = () => {
  return (
    <div className="w-full relative bg-[#14203e]">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen relative z-10">
        {/* Left Section */}
        <div className="relative text-white flex items-center justify-center px-6 lg:px-10 pt-20">
          {/* Background diagonal shape */}
          <div className="absolute inset-0 clip-left-25 bg-[#14203e] z-0"></div>

          {/* Foreground content */}
          <div className="relative z-10 text-left max-w-3xl w-full py-16 lg:py-0">
            <h4 className="flex items-center text-xl lg:text-2xl text-orange-500 mb-4"><FaHome className="mr-4"></FaHome>SHOWING SMART. FEEL SMART</h4>
            <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold mb-4 leading-snug">
              Find Your Dream <span className="text-orange-500">Home</span> With
              Us
            </h1>
            <p className="text-lg md:text-xl mb-6 lg:mb-12 text-gray-300">
              Welcome to <span className="font-semibold">DashState</span>, your
              trusted property partner. Discover premium listings, connect with
              top agents, and make confident real estate decisions.
            </p>

            {/* Category Tabs */}
            <div className="flex gap-2">
              <button className="bg-orange-500 text-white px-4 py-6 rounded-t-xl text-lg font-medium">
                General
              </button>
              <button className="bg-white text-gray-900 px-6 py-6 rounded-t-xl text-lg font-medium">
                Villa
              </button>
              <button className="bg-white text-gray-900 px-4 py-6 rounded-t-xl font-medium text-lg">
                Apartment
              </button>
            </div>

            {/* 🔍 Search Form */}
            <div className="bg-gray-600 bg-opacity-90 p-4 2xl:p-8 rounded-e-xl rounded-bl-xl grid grid-cols-1 md:grid-cols-4 gap-4 2xl:gap-8 mb-6 w-full lg:w-[60vw]">
              <div className="px-4">
                <label className="block mb-2 text-sm lg:text-lg text-gray-200">
                  Keyword
                </label>
                <input
                  type="text"
                  placeholder="Looking For?"
                  className="py-2 rounded w-full text-gray-200 placeholder:text-gray-300 outline-none text-lg lg:text-xl font-medium"
                />
              </div>
              <div className="px-4">
                <label className="block mb-2 text-sm lg:text-lg text-gray-200">
                  Category
                </label>
                <select className="py-2 rounded w-full text-gray-200 text-lg lg:text-xl font-medium outline-none">
                  <option>Select Category</option>
                  <option>Villa</option>
                  <option>Apartment</option>
                </select>
              </div>
              <div className="px-3">
                <label className="block mb-2 text-sm lg:text-lg text-gray-200">
                  Location
                </label>
                <select className="py-2 rounded w-full text-gray-200 text-lg lg:text-xl font-medium outline-none">
                  <option>Select Location</option>
                  <option>Dhaka</option>
                  <option>Chattogram</option>
                </select>
              </div>
              <div className="w-full mt-2">
                <button className="bg-orange-500 hover:bg-[#14203e] transition duration-500 text-white px-6 py-5 rounded-full w-full flex items-center justify-center gap-2 text-lg xl:text-xl font-semibold">
                  <FaSearch /> SEARCH
                </button>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex gap-4 2xl:gap-8 mt-10 2xl:mt-16">
              <Link to="/allProperties">
              <button className="border hover:border-0 border-white text-white px-8 py-4 text-lg xl:text-xl font-medium rounded-full hover:bg-orange-500 transition duration-500 cursor-pointer">
                Brows Properties →
              </button>
              </Link>
              <Link to="/dashboard">
              <button className="border hover:border-0 border-white text-white px-8 py-4 text-lg xl:text-xl font-medium rounded-full hover:bg-orange-500 transition duration-500 cursor-pointer">
                Dashboard →
              </button>
              </Link>
              <Link to="/aboutUs">
              <button className="border hover:border-0 border-white text-white px-8 py-4 text-lg xl:text-xl font-medium rounded-full hover:bg-orange-500 transition duration-500 cursor-pointer">
                 About Us →
              </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="clip-right-25 w-full h-full overflow-hidden">
          <img
            src="https://i.ibb.co/sdkyg0YC/banner3.jpg"
            alt="Real Estate"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Custom clip-path styles */}
      <style jsx>{`
        .clip-left-25 {
          clip-path: polygon(0% 0, 100% 0%, 90% 100%, 0% 100%);
        }

        .clip-right-25 {
          clip-path: polygon(40% 0%, 100% 0%, 100% 100%, 0% 100%);
        }
      `}</style>
    </div>
  );
};
export default HomeBanner;
