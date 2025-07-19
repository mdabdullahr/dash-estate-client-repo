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

  if (isLoading) return <Loading />;

  return (
    <div className="bg-orange-50/80">
      <div className="pt-20 lg:pt-30 pb-12 px-4 md:px-10 max-w-[1620px] mx-auto">
        {/* Section Heading */}
        <h4
          data-aos="fade-up"
          data-aos-duration="1500"
          className="font-medium text-xl lg:text-2xl text-orange-500 flex justify-center items-center mb-2"
        >
          <IoMdHome className="mr-4" />
          PROPERTIES HIGHLIGHTS
          <IoMdHome className="ml-4" />
        </h4>

        <div
          data-aos="fade-up"
          data-aos-duration="1500"
          data-aos-delay="100"
          className="divider before:bg-[#14203e] after:bg-[#14203e] text-[#14203e] text-2xl md:text-3xl xl:text-4xl font-bold mb-12"
        >
          Advertised Properties
        </div>

        {/* If no properties */}
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
                {/* Property Image */}
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />

                {/* Hover Overlay + Centered Button (only lg+) */}
                <div className="absolute inset-0 hidden lg:flex items-center justify-center group-hover:bg-[#1b2a4f]/50 group-hover:opacity-100 opacity-0 transition-opacity duration-500 z-20">
                  <Link to={`/propertyDetails/${property._id}`}>
                    <button className="bg-orange-500 hover:bg-[#1b2a4f] text-white font-semibold py-2 px-5 rounded-full cursor-pointer">
                      View Details →
                    </button>
                  </Link>
                </div>

                {/* Property Content */}
                <div className="p-4 space-y-2 relative z-10 bg-white">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {property.title}
                  </h3>
                  <p className="text-sm text-gray-700 font-medium flex items-center">
                    <FaLocationDot className="mr-2 text-orange-500" />
                    {property.location}
                  </p>
                  <p className="text-sm text-gray-700 font-medium flex items-center">
                    <LiaHandHoldingUsdSolid
                      className="mr-2 text-orange-500"
                      size={20}
                    />
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

                {/* Static Button on Small Devices */}
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

export default AdvertisementSection;
