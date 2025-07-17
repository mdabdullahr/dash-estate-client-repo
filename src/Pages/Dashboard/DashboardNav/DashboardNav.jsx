import { FaHome } from "react-icons/fa";
import { HiLogin } from "react-icons/hi";
import { MdDashboardCustomize, MdRealEstateAgent } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { Link, NavLink } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import navLogo from "../../../assets/navlogo (2).png";
import useAuth from "../../../Hooks/useAuth";
import { FiSearch } from "react-icons/fi";

const Navbar = () => {
  const { logoutUser } = useAuth();

  const handleLogOut = () => {
    logoutUser()
      .then(() => {
        Swal.fire({
          title: "Successfully Logged Out...!",
          icon: "success",
          draggable: true,
        });
      })
      .catch((error) => {
        toast.error("Logout failed...!", error.message);
      });
  };
  return (
    <div
      data-aos="fade-down"
      data-aos-duration="1500"
      className="fixed top-0 left-0 w-full z-50 bg-[#14203e] border-b border-gray-500"
    >
      <div className="navbar mx-auto px-14 py-4 items-center">
        <div className="navbar-start">
          <div className="flex items-center">
            <Link to="/">
              <img
                className="w-24 md:w-40 mr-2 object-contain"
                src={navLogo}
                alt="Logo"
              />
            </Link>
          </div>
        </div>
        
           <div className="relative w-full">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500 pointer-events-none"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by location..."
              className="border border-orange-500 pl-10 pr-4 py-2 rounded-full w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition bg-gray-600 text-gray-200"
            />
          </div>
      
        <div className="navbar-end">
          
            <button
              onClick={handleLogOut}
              className="text-gray-200 border hover:border-0 border-gray-200 rounded-full text-lg font-semibold px-5 lg:px-8 py-2 lg:py-4 cursor-pointer flex items-center hover:bg-orange-500 transition duration-500"
            >
              <TbLogout className="mr-1"></TbLogout>
              Logout
            </button>
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
