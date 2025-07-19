import React, { useEffect } from "react";
import {
  FaBuilding,
  FaBullhorn,
  FaCheckCircle,
  FaClipboardList,
  FaComments,
  FaEnvelopeOpenText,
  FaHeart,
  FaHome,
  FaPlusCircle,
  FaShoppingBag,
  FaStar,
  FaUserCircle,
  FaUserCog,
  FaUsersCog,
  FaUserShield,
} from "react-icons/fa";
import { FiLogOut, FiSearch } from "react-icons/fi";
import { MdMovieEdit } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router";
import Loading from "../Shared/Loading/Loading";
import useUserRole from "../Hooks/useUserRole";
import DashboardNav from "../Pages/Dashboard/DashboardNav/DashboardNav.jsx";
import logo from "../assets/navlogo (2).png";
import useAuth from "../Hooks/useAuth.jsx";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop.jsx";

const Dashboard = () => {
  const { role, roleLoader } = useUserRole();
  const { logoutUser } = useAuth();

  useEffect(() => {
    document.title = "DashEstate | Dashboard | Home";
  }, []);

  if (roleLoader) return <Loading></Loading>;

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
    <div className="min-h-screen bg-white text-black">
      <div className="bg-white">
        <div className="w-full mx-auto">
          <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            {/* Drawer Content */}
            <div className="drawer-content flex flex-col">
              {/* Mobile Navbar */}
              <div
                data-aos="fade-down"
                data-aos-duration="1500"
                className="navbar bg-[#14203e] px-6 py-5 w-full lg:hidden fixed top-0 left-0 z-50"
              >
                <div className="flex-none">
                  <label
                    htmlFor="my-drawer-2"
                    aria-label="open sidebar"
                    className="btn btn-square"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-6 w-6 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      ></path>
                    </svg>
                  </label>
                </div>
                <div className="mx-2 flex-1 px-4 text-white text-lg font-semibold">
                  Dashboard
                </div>
                <div className="relative w-full">
                  <FiSearch
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500 pointer-events-none"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search by location..."
                    className="border border-orange-500 pl-10 pr-4 py-2 rounded-full w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition bg-gray-600 placeholder:text-white text-gray-200"
                  />
                </div>
              </div>
              {/* Main Content */}
              <div className="hidden lg:flex">
                <ScrollToTop></ScrollToTop>
                <DashboardNav></DashboardNav>
              </div>
              <div className="px-5 2xl:px-10 my-10 overflow-auto">
                <Outlet />
                {/* <h1 className="text-5xl text-red-600">this is dashboard</h1> */}
              </div>
            </div>

            {/* Drawer Sidebar */}
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-2"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <div
                data-aos="fade-right"
                data-aos-duration="1500"
                className="bg-[#14203e] text-[#14203e] min-h-full w-[70vw] sm:w-72 md:w-80 xl:w-96 p-6 flex flex-col justify-between"
              >
                {/* Top: Logo + Links */}
                <div className="space-y-4 md:space-y-6 pt-20">
                  {/* Nav Links */}
                  <Link className="flex lg:hidden" to="/">
                    <div className="flex items-center px-6 border-b-2 border-gray-300 pb-2">
                      <img className="w-32" src={logo} alt="Logo" />
                    </div>
                  </Link>

                  {/* User Related Route */}
                  {!roleLoader && role === "user" && (
                    <div className="p-4 space-y-4 md:space-y-6 text-gray-200 text-lg font-semibold">
                      {/* Profile */}
                      <NavLink
                        to="/dashboard"
                        end
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                            isActive
                              ? "bg-[#1b2a4f] text-orange-500 border-l-4 border-orange-500"
                              : "hover:bg-[#1b2a4f] p-6"
                          }`
                        }
                      >
                        <FaHome></FaHome>Home
                      </NavLink>
                      <NavLink
                        to="/dashboard/profile"
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                            isActive
                              ? "bg-[#1b2a4f] text-orange-500 border-l-4 border-orange-500"
                              : "hover:bg-[#1b2a4f]"
                          }`
                        }
                      >
                        <FaUserCircle className="text-lg" />
                        <span>Profile</span>
                      </NavLink>

                      {/* Wishlist */}
                      <NavLink
                        to="/dashboard/wishlist"
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                            isActive
                              ? "bg-[#1b2a4f] text-orange-500 border-l-4 border-orange-500"
                              : "hover:bg-[#1b2a4f]"
                          }`
                        }
                      >
                        <FaHeart className="text-lg" />
                        <span>Wishlist</span>
                      </NavLink>

                      {/* Bought Properties */}
                      <NavLink
                        to="/dashboard/bought"
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                            isActive
                              ? "bg-[#1b2a4f] text-orange-500 border-l-4 border-orange-500"
                              : "hover:bg-[#1b2a4f]"
                          }`
                        }
                      >
                        <FaShoppingBag className="text-lg" />
                        <span>Property Bought</span>
                      </NavLink>

                      {/* My Reviews */}
                      <NavLink
                        to="/dashboard/reviews"
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                            isActive
                              ? "bg-[#1b2a4f] text-orange-500 border-l-4 border-orange-500"
                              : "hover:bg-[#1b2a4f]"
                          }`
                        }
                      >
                        <FaStar className="text-lg" />
                        <span>My Reviews</span>
                      </NavLink>
                    </div>
                  )}

                  {/* Agent Related Route */}
                  {!roleLoader && role === "agent" && (
                    <div className="p-4 space-y-4 md:space-y-6 text-gray-200 text-lg font-semibold">
                      <NavLink
                        to="/dashboard"
                        end
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                            isActive
                              ? "bg-[#1b2a4f] text-orange-500 border-l-4 border-orange-500"
                              : "hover:bg-[#1b2a4f] p-6"
                          }`
                        }
                      >
                        <FaHome></FaHome>Home
                      </NavLink>
                      {/* Profile */}
                      <NavLink
                        to="/dashboard/agentProfile"
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                            isActive
                              ? "bg-[#1b2a4f] text-orange-500 border-l-4 border-orange-500"
                              : "hover:bg-[#1b2a4f]"
                          }`
                        }
                      >
                        <FaUserShield className="text-lg" />
                        <span>Profile</span>
                      </NavLink>

                      {/* Add Property */}
                      <NavLink
                        to="/dashboard/addProperty"
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                            isActive
                              ? "bg-[#1b2a4f] text-orange-500 border-l-4 border-orange-500"
                              : "hover:bg-[#1b2a4f]"
                          }`
                        }
                      >
                        <FaPlusCircle className="text-lg" />
                        <span>Add Property</span>
                      </NavLink>

                      {/* My Added Properties */}
                      <NavLink
                        to="/dashboard/myAddedProperties"
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                            isActive
                              ? "bg-[#1b2a4f] text-orange-500 border-l-4 border-orange-500"
                              : "hover:bg-[#1b2a4f]"
                          }`
                        }
                      >
                        <FaClipboardList className="text-lg" />
                        <span>My Added Properties</span>
                      </NavLink>

                      {/* My Sold Properties */}
                      <NavLink
                        to="/dashboard/mySold"
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                            isActive
                              ? "bg-[#1b2a4f] text-orange-500 border-l-4 border-orange-500"
                              : "hover:bg-[#1b2a4f]"
                          }`
                        }
                      >
                        <FaCheckCircle className="text-lg" />
                        <span>My Sold</span>
                      </NavLink>

                      {/* Requests */}
                      <NavLink
                        to="/dashboard/requests"
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                            isActive
                              ? "bg-[#1b2a4f] text-orange-500 border-l-4 border-orange-500"
                              : "hover:bg-[#1b2a4f]"
                          }`
                        }
                      >
                        <FaEnvelopeOpenText className="text-lg" />
                        <span>Requests</span>
                      </NavLink>
                    </div>
                  )}

                  {/* Admin Related Route */}
                  {!roleLoader && role === "admin" && (
                    <div className="p-4 space-y-4 md:space-y-6 text-gray-200 text-lg font-semibold">
                      <NavLink
                        to="/dashboard"
                        end
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                            isActive
                              ? "bg-[#1b2a4f] text-orange-500 border-l-4 border-orange-500"
                              : "hover:bg-[#1b2a4f] p-6"
                          }`
                        }
                      >
                        <FaHome></FaHome>Home
                      </NavLink>
                      {/* Admin Profile */}
                      <NavLink
                        to="/dashboard/adminProfile"
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                            isActive
                              ? "bg-[#1b2a4f] text-orange-500 border-l-4 border-orange-500"
                              : "hover:bg-[#1b2a4f]"
                          }`
                        }
                      >
                        <FaUserCog className="text-lg" />
                        <span>Profile</span>
                      </NavLink>

                      {/* Manage Properties */}
                      <NavLink
                        to="/dashboard/manageProperties"
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                            isActive
                              ? "bg-[#1b2a4f] text-orange-500 border-l-4 border-orange-500"
                              : "hover:bg-[#1b2a4f]"
                          }`
                        }
                      >
                        <FaBuilding className="text-lg" />
                        <span>Manage Properties</span>
                      </NavLink>

                      {/* Manage Users */}
                      <NavLink
                        to="/dashboard/manageUsers"
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                            isActive
                              ? "bg-[#1b2a4f] text-orange-500 border-l-4 border-orange-500"
                              : "hover:bg-[#1b2a4f]"
                          }`
                        }
                      >
                        <FaUsersCog className="text-lg" />
                        <span>Manage Users</span>
                      </NavLink>

                      {/* Manage Reviews */}
                      <NavLink
                        to="/dashboard/manageReviews"
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                            isActive
                              ? "bg-[#1b2a4f] text-orange-500 border-l-4 border-orange-500"
                              : "hover:bg-[#1b2a4f]"
                          }`
                        }
                      >
                        <FaComments className="text-lg" />
                        <span>Manage Reviews</span>
                      </NavLink>

                      {/* Advertise Property */}
                      <NavLink
                        to="/dashboard/advertise"
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                            isActive
                              ? "bg-[#1b2a4f] text-orange-500 border-l-4 border-orange-500"
                              : "hover:bg-[#1b2a4f]"
                          }`
                        }
                      >
                        <FaBullhorn className="text-lg" />
                        <span>Advertise</span>
                      </NavLink>
                    </div>
                  )}
                </div>

                {/* Bottom: Logout */}
                <div className="p-4 border-t-2 border-gray-300 pt-8">
                  <button
                    onClick={handleLogOut}
                    className="border hover:border-0 border-white text-white px-8 py-4 text-lg xl:text-xl font-medium rounded-full hover:bg-orange-500 transition duration-500 cursor-pointer flex items-center gap-2 w-full"
                  >
                    <FiLogOut /> Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
