import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router";
import Loading from "../../Shared/Loading/Loading";
import { FiSearch, FiChevronDown } from "react-icons/fi";

const AllProperties = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState(""); // 🔍 search state
  const [sortOrder, setSortOrder] = useState(""); // 🔃 sort state

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["verifiedProperties", search, sortOrder],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/properties/verified?search=${search}&sort=${sortOrder}`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="bg-gray-50">
      <div className="p-6 min-h-screen pt-30 max-w-[1320px] mx-auto">
      {/* 🔍 Search & 🔃 Sort Controls */}
      <div className="mb-6 flex flex-col md:flex-row justify-center items-center gap-4 px-4 max-w-4xl mx-auto">
        {/* Search Input */}
        <div className="relative w-full md:w-1/2">
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-green-500 pl-10 pr-4 py-2 rounded-full w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
        </div>

        {/* Sort Select */}
        <div className="relative w-full md:w-48">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="appearance-none border border-green-500 px-4 py-2 rounded-full w-full shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          >
            <option value="" disabled>
              Sort by Price
            </option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
          <FiChevronDown
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-green-500"
            size={20}
          />
        </div>
      </div>
      <div className="divider before:bg-green-500 after:bg-green-500 text-green-500 text-xl md:text-2xl font-bold mb-8">
        All Properties
      </div>
      {/* 🏡 Properties Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
        {properties.map((property) => (
          <div
            key={property._id}
            className="bg-white rounded-lg shadow-sm hover:shadow-xl transition duration-300 overflow-hidden"
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {property.title}
              </h3>
              <p className="text-sm text-gray-600">📍 {property.location}</p>

              <div className="flex items-center gap-3 mt-1">
                <img
                  src={property.agentImage || "/default-agent.png"}
                  alt="agent"
                  className="w-8 h-8 rounded-full border object-cover"
                />
                <span className="text-sm text-gray-700">
                  {property.agentName}
                </span>
              </div>

              <p className="text-sm text-gray-700">
                Status:{" "}
                <span
                  className={`font-medium capitalize ${
                    property.verificationStatus === "verified"
                      ? "text-green-600"
                      : property.verificationStatus === "rejected"
                      ? "text-red-600"
                      : "text-yellow-500"
                  }`}
                >
                  {property.verificationStatus}
                </span>
              </p>

              <p className="text-sm text-gray-700">
                💰 ${property.minPrice} - ${property.maxPrice}
              </p>

              <Link to={`/propertyDetails/${property._id}`}>
                <button className="mt-3 w-full py-2 text-center text-sm font-medium border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white transition cursor-pointer">
                  Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default AllProperties;
