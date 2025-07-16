import { Link } from "react-router";
import { TypeAnimation } from "react-type-animation";

const HomeBanner = () => {
  return (
    <div className="w-full h-[100vh] bg-[#14203e]">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        {/* Left: Text with diagonal right edge */}
        <div className="relative bg-[#14203e] text-white flex items-center justify-center px-10 clip-left-25 mt-20 lg:mt-0">
          <div className="z-10 text-left max-w-3xl">
            <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold mb-4 leading-snug">
              Find Your Dream <span className="text-orange-500">Home</span> With
              Us
            </h1>
            <p className="text-lg md:text-xl mb-6 text-gray-300">
              Welcome to <span className="font-semibold">DashState</span>, your
              trusted property partner. Discover premium listings, connect with
              top agents, and make confident real estate decisions.
            </p>
            <Link to="/allProperties">
              <button className="mt-2 px-6 py-3 text-gray-200 font-semibold rounded-full border border-gray-200 hover:text-[#1b2a4f] hover:bg-gray-200 transition duration-500 cursor-pointer text-lg xl:text-xl">
                Browse Properties
              </button>
            </Link>
          </div>
        </div>

        {/* Right: Image with matching diagonal left edge */}
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
