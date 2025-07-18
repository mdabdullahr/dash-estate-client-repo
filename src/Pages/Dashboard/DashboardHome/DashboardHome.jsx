import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Shared/Loading/Loading";
import UserHome from "../UserLik/UserHome/UserHome";
import AgentHome from "../AgentLink/AgentHome/AgentHome";
import AdminHome from "../AdminLink/AdminHome/AdminHome";

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
    return <Loading />;
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
    recentWishlist,
    recentReviews,
    chartData,
    addedProperties,
    requestedCount,
    soldCount,
    soldAmount,
    recentProperties,
    recentOffers,
    pieChartData,
    totalUsers,
    totalProperties,
    totalReviews,
    recentUsers,
    propertyStatusChart,
  } = data;

  return (
    <div
      data-aos="zoom-in"
      data-aos-duration="1500"
      className="p-4 2xl:p-8 rounded-2xl bg-orange-50/80 mt-18 lg:mt-22 2xl:mt-24"
    >
      <h2 className="text-2xl font-bold mb-4">
        Welcome{" "}
        <span className="text-orange-600">{user?.displayName || "User"}</span>{" "}
        🎉
      </h2>

      {role === "user" && (
        <UserHome
          wishlistCount={wishlistCount}
          boughtCount={boughtCount}
          reviewCount={reviewCount}
          recentWishlist={recentWishlist}
          recentReviews={recentReviews}
          chartData={chartData}
        />
      )}

      {role === "agent" && (
        <AgentHome
          addedProperties={addedProperties}
          requestedCount={requestedCount}
          soldCount={soldCount}
          soldAmount={soldAmount}
          recentProperties={recentProperties}
          recentOffers={recentOffers}
          pieChartData={pieChartData}
        />
      )}

      {role === "admin" && (
        <AdminHome
          totalUsers={totalUsers}
          totalProperties={totalProperties}
          totalReviews={totalReviews}
          recentUsers={recentUsers}
          recentProperties={recentProperties}
          recentReviews={recentReviews}
          propertyStatusChart={propertyStatusChart}
        />
      )}
    </div>
  );
};

export default DashboardHome;
