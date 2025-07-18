import React from "react";
import AdminRecharts from "./AdminRecharts";

const AdminHome = ({
  totalProperties,
  totalReviews,
  totalUsers,
  recentUsers,
  recentProperties,
  recentReviews,
  propertyStatusChart,
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Users" value={totalUsers} />
        <StatCard title="Total Properties" value={totalProperties} />
        <StatCard title="Total Reviews" value={totalReviews} />
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4">🧑‍💻 Recently Registered Users</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentUsers?.map((user) => (
            <div key={user._id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden p-4">
              <img
                src={user.image}
                className="w-12 h-12 rounded-full mx-auto"
              />
              <h4 className="mt-2 text-center font-semibold">{user.name}</h4>
              <p className="text-xs text-gray-500 text-center">{user.email}</p>
              <p className="text-sm text-center text-blue-600 font-medium capitalize">
                {user.role}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4">
          🏡 Recent Property Submissions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentProperties?.map((property) => (
            <div
              key={property._id}
              className="bg-white rounded-lg shadow-sm hover:shadow-xl transition duration-300 overflow-hidden p-4"
            >
              <img
                src={property.image}
                className="h-32 w-full object-cover rounded"
              />
              <h4 className="mt-2 font-semibold">{property.title}</h4>
              <p className="text-sm text-gray-500">{property.location}</p>
              <p className="text-xs text-gray-400">
                Status:{" "}
                <span className="capitalize">
                  {property.verificationStatus}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4">📝 Recent Reviews</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentReviews?.map((review) => (
            <div
              key={review._id}
              className="bg-white rounded-lg shadow-sm hover:shadow-xl transition duration-300 overflow-hidden p-4 border border-orange-500"
            >
              <h4 className="font-semibold">{review.userName}</h4>
              <p className="text-sm text-gray-600">
                Rating: ⭐ {review.rating}
              </p>
              <p className="text-sm mt-1 text-gray-700">
                {review.comment.slice(0, 80)}...
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Property: {review.propertyTitle}
              </p>
            </div>
          ))}
        </div>
      </div>

      <AdminRecharts propertyStatusChart={propertyStatusChart}></AdminRecharts>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white shadow-md rounded-xl p-6 border border-orange-500 transition">
    <h3 className="text-md font-medium text-gray-600">{title}</h3>
    <p className="text-3xl font-bold text-orange-500 mt-2">{value}</p>
  </div>
);

export default AdminHome;
