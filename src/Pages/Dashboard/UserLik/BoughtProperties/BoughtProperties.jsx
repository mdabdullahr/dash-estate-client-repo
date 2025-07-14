import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../../Shared/Loading/Loading";

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
      <p className="text-center mt-12 text-gray-600">
        You haven't made any offers yet.
      </p>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-semibold text-center mb-6">
        My Property Offers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        {properties.map((item) => (
          <div
            key={item._id}
            className="bg-white border border-gray-300 rounded-lg shadow-sm p-4 space-y-3"
          >
            <img
              src={item.propertyImage}
              alt={item.propertyTitle}
              className="w-full h-40 object-cover rounded-md"
            />

            <h3 className="text-lg font-bold">{item.propertyTitle}</h3>
            <p className="text-sm text-gray-500">📍 {item.propertyLocation}</p>
            <p className="text-sm text-gray-600">👤 Agent: {item.agentName}</p>
            <p className="text-sm text-gray-700 font-medium">
              💰 Offer: ${item.offerAmount}
            </p>

            <p className="text-sm">
              Status:{" "}
              <span
                className={`font-semibold capitalize ${
                  item.status === "pending"
                    ? "text-yellow-500"
                    : item.status === "accepted"
                    ? "text-blue-600"
                    : "text-green-600"
                }`}
              >
                {item.status}
              </span>
            </p>

            {item.status === "accepted" && !item.transactionId && (
              <button
                onClick={() => navigate(`/dashboard/payment/${item._id}`)}
                className="w-full cursor-pointer bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
              >
                Pay
              </button>
            )}

            {item.transactionId && (
              <p className="text-sm text-green-600 font-medium">
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
