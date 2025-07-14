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
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Requested Properties
      </h2>

      <div className="overflow-x-auto rounded-t-sm">
        <table className="table w-full">
          <thead className="text-white text-[14px] md:text-lg bg-green-500">
            <tr>
              <th>Title</th>
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
                className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
              >
                <td className="text-sm font-semibold">{item.propertyTitle}</td>
                <td className="text-sm">{item.propertyLocation}</td>
                <td className="text-sm">{item.buyerName}</td>
                <td className="text-sm">{item.buyerEmail}</td>
                <td className="text-sm">${item.offerAmount}</td>
                <td className="capitalize font-medium">
                  {item.status === "pending" && (
                    <span className="text-yellow-500">Pending</span>
                  )}
                  {item.status === "accepted" && (
                    <span className="text-green-600">Accepted</span>
                  )}
                  {item.status === "rejected" && (
                    <span className="text-red-500">Rejected</span>
                  )}
                  {
                    item.transactionId && <span className="text-green-600">Selling</span>

                  }
                </td>
                <td>
                  {item.status === "pending" ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAccept(item._id)}
                        className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer font-semibold"
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
