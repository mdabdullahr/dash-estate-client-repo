import React from "react";
import useAuth from "../../../../Hooks/useAuth";

const AdminProfile = () => {
  const { user } = useAuth();
  return (
    <div
      data-aos="zoom-in"
      data-aos-duration="1500"
      className="w-full relative overflow-hidden rounded-2xl mt-18 lg:mt-22 2xl:mt-26"
    >
      {/* 🔵 Background Cover Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* 🧑 Profile Card (Floating Centered) */}
      <div className="relative flex items-center justify-center h-[83vh] px-4">
        <div className="max-w-2xl w-full bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-8 text-white text-center border border-white/20">
          {/* Profile Image */}
          <img
            src={user?.photoURL}
            alt="Admin"
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white mx-auto shadow-md"
          />

          {/* Name + Info */}
          <h2 className="mt-4 text-3xl font-bold">
            {user?.displayName || "Agent Name"}
          </h2>
          <p className="text-sm sm:text-base text-gray-200">{user?.email}</p>

          <span className="inline-block mt-3 bg-orange-500 text-white text-sm font-semibold px-4 py-1 rounded-full shadow-md">
            Role: Admin
          </span>

          {/* Optional Agent Note or Description */}
          <p className="mt-6 text-gray-100 text-sm sm:text-base leading-relaxed">
            Welcome to your Admin Dashboard. Here you can manage users,
            properties, and reviews to ensure a secure and efficient platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
