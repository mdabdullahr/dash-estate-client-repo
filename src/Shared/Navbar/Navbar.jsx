import React from "react";
import useAuth from "../../Hooks/useAuth";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import navLogo from "../../assets/navlogo.png";

const Navbar = () => {
  const { user, logoutUser } = useAuth();

  const links = (
    <>
      <li className="text-gray-800 hover:text-green-500 hover:bg-white transition-all duration-600 px-5 py-2 rounded-md cursor-pointer text-lg font-semibold">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive ? "text-green-500 bg-white px-5 py-2 rounded-md cursor-pointer text-lg font-semibold" : ""
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li className="text-gray-800 hover:text-green-500 hover:bg-white transition-all duration-600 px-5 py-2 rounded-md cursor-pointer text-lg font-semibold">
        <NavLink to="/allProperties"
        className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive ? "text-green-500 bg-white px-5 py-2 rounded-md cursor-pointer text-lg font-semibold" : ""
            }`
          }
        >All properties</NavLink>
      </li>
      {user && (
        <li className="text-gray-800 hover:text-green-500 hover:bg-white transition-all duration-600 px-5 py-2 rounded-md cursor-pointer text-lg font-semibold">
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      )}
    </>
  );

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
    <div className="fixed top-0 left-0 w-full z-50 bg-green-50">
      <div className="navbar max-w-[1320px] mx-auto px-4 py-2 items-center">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <div className="flex items-center">
            <img className="w-20 h-10 mr-2 object-contain" src={navLogo} alt="Logo" />
            <p className="font-bold text-xl md:text-2xl lg:text-3xl text-green-500 specific-text">
              DeshEstate
            </p>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <button
              onClick={handleLogOut}
              className="bg-green-500 text-white text-lg font-semibold px-5 py-2 rounded-sm cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <Link to="/authLayout/login">
              <button className="bg-green-500 text-white text-lg font-semibold px-5 py-2 rounded-sm cursor-pointer">Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
