import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Shared/Loading/Loading";

const DashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const email = user?.email;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard-summary", email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/dashboard-summary?email=${email}`
      );
      return res.data;
    },
    enabled: !!email,
  });

  if (isLoading) {
    return <Loading></Loading>
  }

  if (isError || !data) {
    return (
      <div className="text-red-500 text-center py-20">
        Failed to load dashboard data.
      </div>
    );
  }

  const {
    role,
    wishlistCount,
    boughtCount,
    reviewCount,
    addedProperties,
    requestedCount,
    soldCount,
    soldAmount,
    totalUsers,
    totalProperties,
    totalReviews,
  } = data;

  return (
    <div className="p-5 mt-18 lg:mt-22 2xl:mt-26">
      <h2 className="text-2xl font-bold mb-4">
        Welcome{" "}
        <span className="text-blue-600">{user?.displayName || "User"}</span> 🎉
      </h2>

      {role === "user" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="My Wishlist" value={wishlistCount} />
          <StatCard title="Properties Bought" value={boughtCount} />
          <StatCard title="My Reviews" value={reviewCount} />
        </div>
      )}

      {role === "agent" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard title="Added Properties" value={addedProperties} />
          <StatCard title="Requested Properties" value={requestedCount} />
          <StatCard title="Sold Properties" value={soldCount} />
          <StatCard title="Total Sold Amount" value={`৳ ${soldAmount || 0}`} />
        </div>
      )}

      {role === "admin" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Total Users" value={totalUsers} />
          <StatCard title="Total Properties" value={totalProperties} />
          <StatCard title="Total Reviews" value={totalReviews} />
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white shadow-md rounded-xl p-6 border hover:shadow-xl transition">
    <h3 className="text-md font-medium text-gray-600">{title}</h3>
    <p className="text-3xl font-bold text-blue-600 mt-2">{value}</p>
  </div>
);

export default DashboardHome;
