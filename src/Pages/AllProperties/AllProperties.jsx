import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router";
import Loading from "../../Shared/Loading/Loading";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import { FaLocationDot } from "react-icons/fa6";

const AllProperties = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["verifiedProperties", search, sortOrder],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/properties/verified?search=${search}&sort=${sortOrder}`
      );
      return res.data;
    },
  });

  useEffect(() => {
    document.title = "DashEstate | All_Properties";
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="bg-orange-50/80 min-h-screen">
      <div className="px-4 md:px-10 min-h-screen pt-30 md:pt-36 pb-12 max-w-[1620px] mx-auto">
        {/* 🔍 Search & 🔃 Sort */}
        <div
          data-aos="fade-up"
          data-aos-duration="1500"
          className="mb-6 flex flex-col md:flex-row justify-center items-center gap-4 px-4 max-w-4xl mx-auto"
        >
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

        <div
          data-aos="fade-up"
          data-aos-duration="1500"
          data-aos-delay="100"
          className="divider before:bg-[#14203e] after:bg-[#14203e] text-[#14203e] text-2xl md:text-3xl xl:text-4xl font-bold my-10"
        >
          All Properties
        </div>

        {properties.length === 0 ? (
          <div
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-delay="100"
            className="text-center text-xl font-medium text-gray-600 border border-dashed border-orange-500 py-10 rounded-lg shadow-inner bg-orange-50"
          >
            🚫 No Properties Yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
            {properties.map((property, index) => (
              <div
                data-aos="fade-up"
                data-aos-duration="1500"
                data-aos-delay={index * 200}
                key={property._id}
                className="relative bg-white rounded-lg shadow-sm hover:shadow-xl transition duration-300 overflow-hidden group"
              >
                {/* 🖼️ Image */}
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />

                {/* 🟧 Hover Overlay (lg only) */}
                <div className="absolute inset-0 hidden lg:flex items-center justify-center group-hover:bg-[#1b2a4f]/50 group-hover:opacity-100 opacity-0 transition-opacity duration-500 z-20">
                  <Link to={`/propertyDetails/${property._id}`}>
                    <button className="bg-orange-500 hover:bg-[#1b2a4f] text-white font-semibold py-2 px-5 rounded-full cursor-pointer">
                      View Details →
                    </button>
                  </Link>
                </div>

                {/* ℹ️ Card Info */}
                <div className="p-4 space-y-2 relative z-10 bg-white">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {property.title}
                  </h3>
                  <p className="text-sm text-gray-600 flex items-center">
                    <FaLocationDot className="text-orange-500 mr-2" />
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
                    />
                    ${property.minPrice} - ${property.maxPrice}
                  </p>
                </div>

                {/* 🔘 Button for Small Devices */}
                <div className="lg:hidden px-4 pb-4">
                  <Link to={`/propertyDetails/${property._id}`}>
                    <button className="w-full bg-orange-500 hover:bg-[#1b2a4f] text-white font-semibold py-2 px-5 rounded-full mt-2">
                      View Details →
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProperties;
