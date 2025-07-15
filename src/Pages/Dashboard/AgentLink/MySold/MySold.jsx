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

  console.log(soldProperties);

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50 rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">My Sold Properties</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="text-white text-[14px] md:text-lg bg-green-500">
            <tr>
              
              <th>Property Title</th>
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
              <tr key={item._id} 
              className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
              
                <td className="text-sm font-semibold">{item.propertyTitle}</td>
                <td className="text-sm">{item.propertyLocation}</td>
                <td className="text-sm">{item.buyerName}</td>
                <td className="text-sm">{item.buyerEmail}</td>
                <td className="text-sm">${item.offerAmount}</td>
                <td className="text-sm">{new Date(item.paidAt).toLocaleDateString()}</td>
                <td className="text-blue-600 font-medium text-sm">
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
