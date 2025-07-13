import React from "react";
import {
  FaBuilding,
  FaBullhorn,
  FaCheckCircle,
  FaClipboardList,
  FaComments,
  FaEnvelopeOpenText,
  FaHeart,
  FaPlusCircle,
  FaShoppingBag,
  FaStar,
  FaUserCircle,
  FaUserCog,
  FaUsersCog,
  FaUserShield,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdMovieEdit } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router";
import navLogo from "../assets/navlogo.png";
import Loading from "../Shared/Loading/Loading";
import useUserRole from "../Hooks/useUserRole";

const Dashboard = () => {
  const {role, roleLoader} = useUserRole();
  console.log(role);

  if (roleLoader) return <Loading></Loading>;

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <div className="bg-gray-100">
        <div className="w-full mx-auto">
          <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            {/* Drawer Content */}
            <div className="drawer-content flex flex-col">
              {/* Mobile Navbar */}
              <div className="navbar bg-orange-500 w-full lg:hidden">
                <div className="flex-none">
                  <label
                    htmlFor="my-drawer-2"
                    aria-label="open sidebar"
                    className="btn btn-square btn-ghost"
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
                <div className="mx-2 flex-1 px-2 text-white text-lg font-semibold">
                  Dashboard
                </div>
              </div>
              {/* Main Content */}
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
              <div className="bg-white text-black min-h-full w-[70vw] sm:w-72 md:w-80 xl:w-96 p-6 flex flex-col justify-between">
                {/* Top: Logo + Links */}
                <div className="space-y-6">
                  <Link to="/">
                    <div className="flex items-center px-6 border-b-2 border-gray-300 pb-4 mt-4">
                      <img
                        className="w-10 h-10 mr-2"
                        src={navLogo}
                        alt="Logo"
                      />
                      <p className="-mb-2 font-bold text-2xl lg:text-3xl text-black specific-text">
                        Real Estate
                      </p>
                    </div>
                  </Link>

                  {/* Nav Links */}
                  {/* User Related Route */}
                  {!roleLoader && role === "user" && (
                    <div className="p-4 space-y-2 text-black">
                      {/* Profile */}
                      <NavLink
                        to="/dashboard/profile"
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                            isActive
                              ? "bg-blue-600 text-white"
                              : "hover:bg-gray-100"
                          }`
                        }
                      >
                        <FaUserCircle className="text-lg" />
                        <span>My Profile</span>
                      </NavLink>

                      {/* Wishlist */}
                      <NavLink
                        to="/dashboard/wishlist"
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                            isActive
                              ? "bg-blue-600 text-white"
                              : "hover:bg-gray-100"
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
                              ? "bg-blue-600 text-white"
                              : "hover:bg-gray-100"
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
                              ? "bg-blue-600 text-white"
                              : "hover:bg-gray-100"
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
                    <div className="p-4 space-y-2 text-black">
                      {/* Profile */}
                      <NavLink
                        to="/dashboard/agentProfile"
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                            isActive
                              ? "bg-green-500 text-white"
                              : "hover:bg-gray-100"
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
                              ? "bg-green-500 text-white"
                              : "hover:bg-gray-100"
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
                              ? "bg-green-500 text-white"
                              : "hover:bg-gray-100"
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
                              ? "bg-green-500 text-white"
                              : "hover:bg-gray-100"
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
                              ? "bg-green-500 text-white"
                              : "hover:bg-gray-100"
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
                    <div className="p-4 space-y-2 text-black">
                      {/* Admin Profile */}
                      <NavLink
                        to="/dashboard/adminProfile"
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                            isActive
                              ? "bg-green-500 text-white"
                              : "hover:bg-gray-100"
                          }`
                        }
                      >
                        <FaUserCog className="text-lg" />
                        <span>Admin Profile</span>
                      </NavLink>

                      {/* Manage Properties */}
                      <NavLink
                        to="/dashboard/manageProperties"
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                            isActive
                              ? "bg-green-500 text-white"
                              : "hover:bg-gray-100"
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
                              ? "bg-green-500 text-white"
                              : "hover:bg-gray-100"
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
                              ? "bg-green-500 text-white"
                              : "hover:bg-gray-100"
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
                              ? "bg-green-500 text-white"
                              : "hover:bg-gray-100"
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
                <div className="mt-6 p-8 border-t-2 border-gray-300">
                  <li>
                    <NavLink
                      to="/dashboard/updateProfile"
                      className="text-white hover:text-[#526484] hover:bg-gray-200 text-[15px] font-medium px-4 py-3 flex items-center rounded-md mb-5 bg-green-500"
                    >
                      <MdMovieEdit size={20} className="mr-2" />
                      Update Profile
                    </NavLink>
                  </li>
                  <button className="border border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition cursor-pointer w-full">
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
