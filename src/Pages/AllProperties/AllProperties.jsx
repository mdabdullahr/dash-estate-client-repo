import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router";
import Loading from "../../Shared/Loading/Loading";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import { FaLocationDot } from "react-icons/fa6";

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
    <div className="bg-orange-50/80">
      <div className="p-6 min-h-screen pt-36 max-w-[1620px] mx-auto">
        {/* 🔍 Search & 🔃 Sort Controls */}
        <div
          data-aos="fade-up"
          data-aos-duration="1500"
          className="mb-6 flex flex-col md:flex-row justify-center items-center gap-4 px-4 max-w-4xl mx-auto"
        >
          {/* Search Input */}
          <div className="relative w-full md:w-1/2">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500 pointer-events-none"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-orange-500 pl-10 pr-4 py-2 rounded-full w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition bg-white"
            />
          </div>
          {/* Sort Select */}
          <div className="relative w-full md:w-48">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="appearance-none border border-orange-500 px-4 py-2 rounded-full w-full shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 transition bg-white"
            >
              <option value="" disabled>
                Sort by Price
              </option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
            <FiChevronDown
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-orange-500"
              size={20}
            />
          </div>
        </div>
        <div data-aos="fade-up"
              data-aos-duration="1500"
              data-aos-delay="100" className="divider before:bg-[#1b2a4f] after:bg-[#1b2a4f] text-[#1b2a4f] text-2xl md:text-3xl xl:text-4xl font-bold my-10">
          All Properties
        </div>
        {/* 🏡 Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
          {properties.map((property, index) => (
            <div
            data-aos="fade-up"
              data-aos-duration="1500"
              data-aos-delay={index * 200}
              key={property._id}
              className="relative bg-white rounded-lg shadow-sm hover:shadow-xl transition duration-300 overflow-hidden group"
            >
              {/* 🖼️ Property Image */}
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover"
              />

              {/* 🌗 Overlay on hover */}
              <div className="absolute inset-0 bg-[#1b2a4f]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"></div>

              {/* 🟢 Slide-in button from top-left */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 translate-x-[-100%] translate-y-[-100%] group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 ease-in-out">
                  <Link to={`/propertyDetails/${property._id}`}>
                    <button className="bg-orange-500 hover:bg-[#1b2a4f] cursor-pointer text-white font-semibold py-2 px-5 rounded-full">
                      View Details →
                    </button>
                  </Link>
                </div>
              </div>

              {/* ℹ️ Info Section */}
              <div className="p-4 space-y-2 relative z-0">
                <h3 className="text-lg font-semibold text-gray-800">
                  {property.title}
                </h3>

                <p className="text-sm text-gray-600 flex items-center">
                  <FaLocationDot className="text-orange-500 mr-2"></FaLocationDot>{" "}
                  {property.location}
                </p>

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
                        ? "text-orange-500"
                        : property.verificationStatus === "rejected"
                        ? "text-red-600"
                        : "text-yellow-500"
                    }`}
                  >
                    {property.verificationStatus}
                  </span>
                </p>

                <p className="text-sm text-gray-700 flex items-center">
                  <LiaHandHoldingUsdSolid
                    className="text-orange-500 mr-2"
                    size={20}
                  ></LiaHandHoldingUsdSolid>{" "}
                  ${property.minPrice} - ${property.maxPrice}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProperties;
