import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router";

const AllProperties = () => {
  const axiosSecure = useAxiosSecure();

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["verifiedProperties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/properties/verified");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen pt-30 max-w-[1320px] mx-auto">
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

              <p className="text-sm">
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
  );
};

export default AllProperties;
