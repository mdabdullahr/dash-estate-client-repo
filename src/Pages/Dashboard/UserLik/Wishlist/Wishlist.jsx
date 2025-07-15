// Wishlist.jsx
import React from "react";
import { Link } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../../Shared/Loading/Loading";

const Wishlist = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // console.log(isBoughtStatus);

  // Fetch wishlisted properties
  const { data: wishlists = [], isLoading } = useQuery({
    queryKey: ["wishlists", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlists?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  

  // Remove wishlist item
  const removeMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/wishlists/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Removed!", "Property removed from wishlist.", "success");
      queryClient.invalidateQueries(["wishlists", user?.email]);
    },
  });

  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this property?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      confirmButtonColor: "#22c55e", // Tailwind's green-500
      customClass: {
        confirmButton: "cursor-pointer",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        removeMutation.mutate(id);
      }
    });
  };

  return (
    <div className="p-6">
      {isLoading ? (
        <Loading></Loading>
      ) : wishlists.length === 0 ? (
        <p className="text-2xl flex justify-center items-center">
          No properties in wishlist.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          {wishlists.map((item) => (
            <div
              key={item._id}
              className="border border-gray-300 rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <img
                src={item.propertyImage}
                alt={item.propertyTitle}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-xl font-semibold mt-3">
                {item.propertyTitle}
              </h3>
              <p className="text-gray-500">📍 {item.propertyLocation}</p>
              <div className="flex items-center gap-3 mt-2">
                <img
                  src={item.agentImage}
                  className="w-8 h-8 rounded-full border"
                  alt="agent"
                />
                <span className="text-sm">{item.agentName}</span>
              </div>
              <p className="text-sm mt-1">
                Status:{" "}
                <span className="capitalize font-medium">
                  {item.verificationStatus}
                </span>
              </p>
              <p className="text-sm text-green-600 font-semibold">
                💰 ${item.minPrice} - ${item.maxPrice}
              </p>

              <div className="flex justify-between mt-4">
               
                  <Link
                    to={`/dashboard/make-offer/${item._id}`}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                  >
                    Make Offer
                  </Link>
                

                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-white bg-red-500 px-2 rounded cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
