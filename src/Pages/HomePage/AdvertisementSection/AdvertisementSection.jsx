import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Loading from "../../../Shared/Loading/Loading";
import { IoMdHome } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";

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
    <div className="bg-orange-50/80">
      <div className="pt-20 lg:pt-30 pb-12 px-10 max-w-[1620px] mx-auto">
        <h4
          data-aos="fade-up"
          data-aos-duration="1500"
          className="font-medium text-xl lg:text-2xl text-orange-500 flex  justify-center items-center mb-2 md:mb-2 lg:mb-6"
        >
          <IoMdHome className="mr-4"></IoMdHome>PROPERTIES HIGHLIGHTS{" "}
          <IoMdHome className="ml-4 "></IoMdHome>
        </h4>
        <div
          data-aos="fade-up"
          data-aos-duration="1500"
          data-aos-delay="100"
          className="divider before:bg-[#14203e] after:bg-[#14203e] text-[#14203e] text-2xl md:text-3xl xl:text-4xl font-bold mb-12"
        >
          Advertised Properties
        </div>

        {advertisedProperties.length === 0 ? (
          <div
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-delay="100"
            className="text-center text-xl font-medium text-gray-600 border border-dashed border-orange-500 py-10 rounded-lg shadow-inner bg-orange-50"
          >
            🚫 No advertised properties available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {advertisedProperties.map((property, index) => (
              <div
                data-aos="fade-up"
                data-aos-duration="1500"
                data-aos-delay={index * 200}
                key={property._id}
                className="relative bg-white rounded-lg shadow-sm hover:shadow-xl transition duration-300 overflow-hidden group"
              >
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />

                {/* Overlay with slide from top-left */}
                <div className="absolute inset-0 bg-[#1b2a4f]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none"></div>

                {/* Sliding text/content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 translate-x-[-100%] translate-y-[-100%] group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 ease-in-out z-10">
                    <Link to={`/propertyDetails/${property._id}`}>
                      <button className="bg-orange-500 hover:bg-[#1b2a4f] cursor-pointer text-white font-semibold py-2 px-5 rounded-full">
                        View Details →
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Static Text (stays below the overlay) */}
                <div className="p-4 space-y-2 relative z-0">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {property.title}
                  </h3>
                  <p className="text-sm text-gray-700 font-medium flex items-center">
                    <FaLocationDot className="mr-2 text-orange-500"></FaLocationDot>{" "}
                    {property.location}
                  </p>
                  <p className="text-sm text-gray-700 font-medium flex items-center">
                    <LiaHandHoldingUsdSolid
                      className="mr-2 text-orange-500"
                      size={20}
                    ></LiaHandHoldingUsdSolid>{" "}
                    ${property.minPrice} - ${property.maxPrice}
                  </p>
                  <p className="text-sm font-medium text-gray-700">
                    Status:{" "}
                    <span
                      className={`capitalize ${
                        property.verificationStatus === "verified"
                          ? "text-orange-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {property.verificationStatus}
                    </span>
                  </p>
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
