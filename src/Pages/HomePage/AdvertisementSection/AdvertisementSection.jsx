import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Loading from "../../../Shared/Loading/Loading";

const AdvertisementSection = () => {
  const axiosPublic = useAxiosPublic();

  const { data: advertisedProperties = [], isLoading } = useQuery({
    queryKey: ["advertised-properties"],
    queryFn: async () => {
      const res = await axiosPublic.get("/properties/advertised");
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="bg-gray-50">
      <div className="pt-30 pb-12 px-4 max-w-[1320px] mx-auto">
        <div className="divider before:bg-green-700 after:bg-green-700 text-green-700 text-xl md:text-2xl xl:text-3xl font-bold mb-12">
          Featured Advertised Properties
        </div>

        {advertisedProperties.length === 0 ? (
          <div className="text-center text-xl font-medium text-gray-600 border border-dashed border-green-400 py-10 rounded-lg shadow-inner bg-green-50">
            🚫 No advertised properties available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {advertisedProperties.map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-lg shadow-sm hover:shadow-xl transition duration-300 overflow-hidden hover:border border-green-200"
              >
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold text-green-800">
                    {property.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    📍 {property.location}
                  </p>
                  <p className="text-sm text-gray-700 font-medium">
                    💰 ${property.minPrice} - ${property.maxPrice}
                  </p>
                  <p className="text-sm font-medium text-gray-700">
                    Status:{" "}
                    <span
                      className={`capitalize ${
                        property.verificationStatus === "verified"
                          ? "text-green-600"
                          : "text-yellow-500"
                      }`}
                    >
                      {property.verificationStatus}
                    </span>
                  </p>

                  <Link to={`/propertyDetails/${property._id}`}>
                    <button className="w-full mt-3 bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition cursor-pointer">
                      View Details
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

export default AdvertisementSection;
