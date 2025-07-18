import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../../Shared/Loading/Loading";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import { FaLocationDot } from "react-icons/fa6";

const BoughtProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["boughtProperties", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading />;

  if (properties.length === 0) {
    return (
      <div
        data-aos="fade-up"
        data-aos-duration="1500"
        data-aos-delay="100"
        className="text-center text-xl font-medium text-gray-600 border border-dashed border-orange-500 py-10 rounded-lg shadow-inner bg-orange-50"
      >
        🚫 You haven't made any offers yet.
      </div>
    );
  }

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="1500"
      data-aos-delay="100"
      className="p-4 2xl:p-8 mt-18 lg:mt-22 2xl:mt-26 bg-orange-50/80 rounded-2xl"
    >
      <div className="divider before:bg-[#1b2a4f] after:bg-[#1b2a4f] text-[#1b2a4f] text-2xl md:text-3xl font-bold mb-8">
        Property Bought
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        {properties.map((item, index) => (
          <div
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-delay={index * 100}
            key={item._id}
            className="bg-white rounded-lg shadow-sm hover:shadow-xl transition duration-300 overflow-hidden  p-6 space-y-3"
          >
            <img
              src={item.propertyImage}
              alt={item.propertyTitle}
              className="w-full h-40 object-cover rounded-md"
            />

            <h3 className="text-lg font-bold">{item.propertyTitle}</h3>
            <p className="text-sm text-gray-500 flex items-center">
              <FaLocationDot className="mr-2 text-orange-500"></FaLocationDot>{" "}
              {item.propertyLocation}
            </p>
            <p className="text-sm text-gray-600">👤 Agent: {item.agentName}</p>
            <p className="text-sm text-gray-700 font-medium flex items-center">
              <LiaHandHoldingUsdSolid className="mr-2 text-orange-500"></LiaHandHoldingUsdSolid>{" "}
              Offer: ${item.offerAmount}
            </p>

            <p className="text-sm">
              Status:{" "}
              <span
                className={`font-semibold capitalize ${
                  item.status === "pending"
                    ? "text-orange-300"
                    : item.status === "accepted"
                    ? "text-[#14203e]"
                    : item.status === "rejected"
                    ? "text-red-600"
                    : "text-orange-500"
                }`}
              >
                {item.status}
              </span>
            </p>

            {item.status === "accepted" && !item.transactionId && (
              <button
                onClick={() => navigate(`/dashboard/payment/${item._id}`)}
                className="w-full cursor-pointer bg-orange-500 text-white py-2 rounded hover:bg-[#14203e] transition"
              >
                Pay
              </button>
            )}

            {item.transactionId && (
              <p className="text-sm text-orange-500 font-medium">
                ✅ Paid | TxID:{" "}
                <span className="font-mono">{item.transactionId}</span>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoughtProperties;
