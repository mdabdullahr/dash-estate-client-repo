import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import logo from "../../assets/navlogo.png";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="relative bg-[#14203e] text-gray-300 py-16">
      {/* 🎨 Background Image (bottom-left corner) */}
      

      {/* 📦 Main Content */}
      <div className="max-w-[1620px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
        {/* 🔰 Logo & About */}
        <div>
          <img src={logo} alt="Logo" className="w-36 mb-4" />
          <p className="text-white text-sm md:text-lg xl:text-xl font-medium">
            DashState is your trusted partner for luxury and lifestyle
            properties. Find the perfect home with expert support.
          </p>
        </div>

        {/* 📞 Contact Info */}
        <div>
          <h3 className="text-xl xl:text-2xl 2xl:text-3xl font-semibold text-white mb-4">
            Contact Us
          </h3>
          <p className="flex items-center gap-2 mb-4 font-medium text-sm md:text-lg 2xl:text-xl">
            <FaPhoneAlt className="text-orange-500" />
            +880 1234-567890
          </p>
          <p className="flex items-center gap-2 mb-4 font-medium text-sm md:text-lg 2xl:text-xl">
            <FaEnvelope className="text-orange-500" />
            support@dashstate.com
          </p>
          <p className="flex items-center gap-4 font-medium text-sm md:text-lg 2xl:text-xl">
            <FaMapMarkerAlt className="text-orange-500" />
            123 Gulshan, Dhaka, Bangladesh
          </p>
        </div>

        {/* 🔗 Useful Links */}
        <div>
          <h3 className="text-xl xl:text-2xl 2xl:text-3xl font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-4 font-medium text-sm md:text-lg 2xl:text-xl">
            <li className="hover:text-orange-500 cursor-pointer">
              {" "}
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-orange-500 cursor-pointer">
              <Link to="/allProperties">All Properties</Link>{" "}
            </li>
            <li className="hover:text-orange-500 cursor-pointer">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="hover:text-orange-500 cursor-pointer">
              <Link to="/authLayout/login">Login</Link> /{" "}
              <Link to="/authLayout/register">Register</Link>
            </li>
          </ul>
        </div>

        {/* 🌐 Social + Newsletter */}
        <div>
          <h3 className="text-xl xl:text-2xl 2xl:text-3xl font-semibold text-white mb-4">
            Follow Us
          </h3>
          <div className="flex gap-4 mb-4">
            <a
              href="#"
              className="text-[#14203e] hover:text-orange-500 text-xl px-2 py-2 rounded-full bg-white"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="text-[#14203e] hover:text-orange-500 text-xl px-2 py-2 rounded-full bg-white"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              className="text-[#14203e] hover:text-orange-500 text-xl px-2 py-2 rounded-full bg-white"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-[#14203e] hover:text-orange-500 text-xl px-2 py-2 rounded-full bg-white"
            >
              <FaInstagram />
            </a>
          </div>
          <p className="text-lg xl:text-xl mb-2 mt-6">Subscribe to our newsletter</p>
          <div className="w-full max-w-xl relative">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full py-3 px-5 pr-32 rounded-full bg-white text-gray-700 border border-gray-300 shadow focus:outline-none"
            />
            <button className="absolute top-1 right-1 h-[calc(100%-0.5rem)] px-6 rounded-full bg-orange-500 text-white font-semibold hover:bg-[#14203e] transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* 🔻 Bottom Bar */}
      <div className="mt-12 text-center text-gray-400 border-t border-gray-700 pt-6 text-sm md:text-lg xl:text-xl">
        © {new Date().getFullYear()} DashState. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
