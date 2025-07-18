import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import TriangleBarChart from "./TriangleBarChart";

const UserHome = ({
  wishlistCount,
  boughtCount,
  reviewCount,
  recentWishlist,
  recentReviews,
  chartData,
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="My Wishlist" value={wishlistCount} />
        <StatCard title="Properties Bought" value={boughtCount} />
        <StatCard title="My Reviews" value={reviewCount} />
      </div>

      <section className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Recently Wishlisted</h3>
        {recentWishlist.length === 0 ? (
          <p className="text-orange-500 text-center mt-6">
            No available wishlists recently
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {recentWishlist.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-sm hover:shadow-xl transition duration-300 overflow-hidden p-4"
              >
                <img
                  src={item.propertyImage}
                  alt=""
                  className="w-full h-32 object-cover rounded"
                />
                <h4 className="mt-2 font-semibold">{item.propertyTitle}</h4>
                <p className="text-sm text-gray-500">{item.propertyLocation}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Recent Reviews</h3>
        {
          recentReviews.length === 0 ? <p className="text-orange-500 text-center mt-6">No available recent reviews</p> : <div className="space-y-6">
          {recentReviews.map((review) => (
            <div
              key={review._id}
              className="bg-white rounded-lg shadow-sm hover:shadow-xl transition duration-300 overflow-hidden p-4 md:p-6 xl:p-8 border border-orange-500"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{review.propertyTitle}</span>
                <span className="text-sm text-yellow-500 font-semibold">
                  ⭐ {review.rating}
                </span>
              </div>
              <p className="text-gray-600 text-sm mt-1">"{review.comment}"</p>
            </div>
          ))}
        </div>
        }
      </section>

      <section className="mt-10">
        <TriangleBarChart chartData={chartData}></TriangleBarChart>
      </section>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-lg shadow-sm hover:shadow-xl transition duration-300 overflow-hidden p-4 md:p-6 xl:p-8 border border-orange-500">
    <h3 className="text-md font-medium text-gray-600">{title}</h3>
    <p className="text-3xl font-bold text-orange-500 mt-2">{value}</p>
  </div>
);

export default UserHome;
