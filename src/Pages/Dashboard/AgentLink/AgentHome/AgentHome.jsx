import React from "react";
import PhaiChart from "./PhaiChart";

const AgentHome = ({
  addedProperties,
  requestedCount,
  soldAmount,
  soldCount,
  recentProperties,
  recentOffers,
  pieChartData,
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Added Properties" value={addedProperties} />
        <StatCard title="Requested Properties" value={requestedCount} />
        <StatCard title="Sold Properties" value={soldCount} />
        <StatCard title="Total Sold Amount" value={`$ ${soldAmount || 0}`} />
      </div>

      <section className="mt-10">
        <h3 className="text-xl  font-semibold mb-4">
          Recently Added Properties
        </h3>
        {recentProperties.length === 0 ? (
          <p className="text-xl text-gray-700">
            No Recently Added Property Yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {recentProperties.map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-lg shadow-sm hover:shadow-xl transition duration-300 overflow-hidden p-4"
              >
                <img
                  src={property.image}
                  className="h-32 w-full object-cover rounded"
                />
                <h4 className="mt-2 font-bold">{property.title}</h4>
                <p className="text-sm text-gray-500">{property.location}</p>
                <p className="text-sm text-blue-500 font-semibold">
                  ${property.minPrice} - ${property.maxPrice}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-10">
        <h3 className="text-xl font-semibold text-[#14203e] mb-4">
          Recent Offers
        </h3>
        {recentOffers.length === 0 ? (
          <p className="text-lg text-gray-700">No Recent Offer yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {recentOffers.map((offer) => (
              <div
                key={offer._id}
                className="bg-white rounded-lg shadow-sm hover:shadow-xl transition duration-300 overflow-hidden p-4 border border-orange-500"
              >
                <h4 className="font-bold">{offer.propertyTitle}</h4>
                <p className="text-sm text-gray-600">
                  Buyer: {offer.buyerName}
                </p>
                <p className="text-sm text-gray-600">
                  Email: {offer.buyerEmail}
                </p>
                <p
                  className={`text-sm font-semibold 
                offer.status === "pending"
                  ? "text-yellow-600"
                  : offer.status === "rejected"
                  ? "text-red-600"
                  : "text-green-600"
              }`}
                >
                  Status: {offer.status}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <PhaiChart pieChartData={pieChartData}></PhaiChart>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-lg shadow-sm hover:shadow-xl transition duration-300 overflow-hidden p-6 border border-orange-500">
    <h3 className="text-md font-medium text-gray-600">{title}</h3>
    <p className="text-3xl font-bold text-orange-500 mt-2">{value}</p>
  </div>
);

export default AgentHome;
