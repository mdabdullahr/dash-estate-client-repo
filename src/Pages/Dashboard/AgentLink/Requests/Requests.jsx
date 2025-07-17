import React from "react";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../../../Shared/Loading/Loading";

const Requests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: offers = [], isLoading } = useQuery({
    queryKey: ["agentRequests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agent-requests?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });


  const acceptMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/offers/accept/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["agentRequests", user?.email]);
      Swal.fire("Success", "Offer accepted and others rejected.", "success");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/offers/reject/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["agentRequests", user?.email]);
      Swal.fire("Rejected", "Offer rejected.", "info");
    },
  });

  const handleAccept = (id) => {
    Swal.fire({
      title: "Accept this offer?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, accept",
      customClass: {
        confirmButton:
          "bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2",
        cancelButton:
          "bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        acceptMutation.mutate(id);
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Reject this offer?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject",
      customClass: {
        confirmButton:
          "bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2",
        cancelButton:
          "bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        rejectMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <Loading />;

  if (offers.length === 0)
    return <p className="text-center mt-12 text-gray-600">No offers yet.</p>;

  return (
    <div className="p-4 2xl:p-8 bg-orange-50/80 mt-18 lg:mt-22 2xl:mt-26 rounded-2xl">
      <div className="divider before:bg-[#14203e] after:bg-[#14203e] text-[#14203e] text-xl md:text-2xl font-bold mb-8">All Request Properties</div>

      <div className="overflow-x-auto rounded-t-sm">
        <table className="table w-full">
          <thead className="text-white text-lg bg-[#14203e]/70">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Property Name</th>
              <th>Location</th>
              <th>Buyer Name</th>
              <th>Buyer Email</th>
              <th>Offer ($)</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((item, index) => (
              <tr
                key={item._id}
                className={`${index % 2 === 0 ? "bg-orange-50/80" : "bg-white"}`}
              >
                <td className="text-sm xl:text-lg font-semibold">{index+1}</td>
                <td><img src={item.propertyImage} alt="property image" className="w-10 md:w-14 h-10 md:h-14 rounded object-cover" /></td>
                <td className="text-sm xl:text-lg font-semibold">{item.propertyTitle}</td>
                <td className="text-sm xl:text-lg">{item.propertyLocation}</td>
                <td className="text-sm xl:text-lg">{item.buyerName}</td>
                <td className="text-sm xl:text-lg">{item.buyerEmail}</td>
                <td className="text-sm xl:text-lg font-medium">${item.offerAmount}</td>
                <td className="capitalize font-medium text-sm xl:text-lg">
                  {item.status === "pending" && (
                    <span className="text-orange-300">Pending</span>
                  )}
                  {item.status === "accepted" && (
                    <span className="text-[#14203e]">Accepted</span>
                  )}
                  {item.status === "rejected" && (
                    <span className="text-red-500">Rejected</span>
                  )}
                  {
                    item.transactionId && item.status === "bought" && <span className="text-[#14203e]">Bought</span>

                  }
                </td>
                <td>
                  {item.status === "pending" ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAccept(item._id)}
                        className="px-3 py-1 text-sm bg-[#14203e]/80 text-white rounded hover:bg-[#14203e] cursor-pointer font-semibold"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(item._id)}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer font-semibold"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Requests;
