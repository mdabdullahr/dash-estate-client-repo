import React from "react";
import { Link } from "react-router";
import { FaLock } from "react-icons/fa";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md w-full">
        <div className="flex justify-center mb-4 text-red-600">
          <FaLock size={50} />
        </div>
        <h2 className="text-3xl font-bold mb-2 text-gray-800">403 Forbidden</h2>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page.
        </p>
        <Link
          to="/"
          className="inline-block bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
