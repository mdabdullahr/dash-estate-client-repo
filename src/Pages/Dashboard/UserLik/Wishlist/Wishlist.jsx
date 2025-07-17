// Wishlist.jsx
import React from "react";
import { Link } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../../Shared/Loading/Loading";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import { FaLocationDot } from "react-icons/fa6";

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
      confirmButtonColor: "#14203e", // Tailwind's green-500
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
    <div className="p-4 2xl:p-8 mt-18 lg:mt-22 2xl:mt-26 bg-orange-50/80 rounded-2xl">
      {isLoading ? (
        <Loading></Loading>
      ) : wishlists.length === 0 ? (
        <div className="text-center text-xl font-medium text-gray-600 border border-dashed border-orange-500 py-10 rounded-lg shadow-inner bg-orange-50">
            🚫 No advertised properties available at the moment.
          </div>
      ) : (
        <>
        <div className="divider before:bg-[#1b2a4f] after:bg-[#1b2a4f] text-[#1b2a4f] text-2xl md:text-3xl font-bold mb-8">
          All Wishlists
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          {wishlists.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-sm hover:shadow-xl transition duration-300 overflow-hidden p-6"
            >
              <img
                src={item.propertyImage}
                alt={item.propertyTitle}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-xl font-semibold mt-3">
                {item.propertyTitle}
              </h3>
              <p className="text-gray-700 flex items-center"><FaLocationDot className="mr-2 text-orange-500"></FaLocationDot> {item.propertyLocation}</p>
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
              <p className="text-sm text-orange-500 font-semibold flex items-center">
                <LiaHandHoldingUsdSolid className="mr-2 text-orange-500"></LiaHandHoldingUsdSolid> ${item.minPrice} - ${item.maxPrice}
              </p>

              <div className="flex justify-between mt-4">
               
                  <Link
                    to={`/dashboard/make-offer/${item._id}`}
                    className="bg-orange-500 hover:bg-[#14203e] text-white px-4 py-1 rounded"
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
        </>
      )}
    </div>
  );
};

export default Wishlist;
