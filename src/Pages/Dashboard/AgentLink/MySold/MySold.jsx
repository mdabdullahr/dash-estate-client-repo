import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import Loading from "../../../../Shared/Loading/Loading";

const MySold = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: soldProperties = [], isLoading } = useQuery({
    queryKey: ["sold-properties", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/sold-properties?email=${user.email}`);
      return res.data;
    },
  });

  // fetch total sold amount

  const { data: totalData = {} } = useQuery({
    queryKey: ["totalSoldAmount", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/sold/total-amount?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="p-4 md:p-8 min-h-screen bg-white rounded-2xl">
      <div className="bg-green-50 border border-green-200 rounded-lg p-5 mb-6 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-green-700 mb-1">
            Total Sold Amount
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-green-600">
            ${totalData.totalAmount?.toLocaleString()}
          </p>
        </div>
        <div className="text-green-500 text-4xl">💰</div>
      </div>
      <div className="divider before:bg-green-500 after:bg-green-500 text-green-500 text-xl md:text-2xl font-bold mb-8">
        All Sold Properties
      </div>
      <div className="overflow-x-auto rounded-sm">
        <table className="table w-full">
          <thead className="text-white text-lg xl:text-xl md:text-lg bg-green-500">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Property Name</th>
              <th>Location</th>
              <th>Buyer Name</th>
              <th>Buyer Email</th>
              <th>Sold Price ($)</th>
              <th>Paid Date</th>
              <th>Txn ID</th>
            </tr>
          </thead>
          <tbody>
            {soldProperties.map((item, index) => (
              <tr
                key={item._id}
                className={`${index % 2 === 0 ? "bg-green-50" : "bg-white"}`}
              >
                <td className="text-sm xl:text-lg font-semibold">
                  {index + 1}
                </td>
                <td>
                  <img
                    src={item.propertyImage}
                    alt="Property Image"
                    className="w-10 md:w-14 h-10 md:h-14 object-cover rounded"
                  />
                </td>
                <td className="text-sm xl:text-lg font-semibold">
                  {item.propertyTitle}
                </td>
                <td className="text-sm xl:text-lg">{item.propertyLocation}</td>
                <td className="text-sm xl:text-lg">{item.buyerName}</td>
                <td className="text-sm xl:text-lg">{item.buyerEmail}</td>
                <td className="text-sm xl:text-lg font-medium">
                  ${item.offerAmount}
                </td>
                <td className="text-sm xl:text-lg">
                  {new Date(item.paidAt).toLocaleDateString()}
                </td>
                <td className="text-blue-600 font-medium text-sm xl:text-lg">
                  {item.transactionId}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySold;
