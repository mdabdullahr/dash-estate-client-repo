import React from "react";
import useAuth from "../../../../Hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const MyAddedProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: properties = [] } = useQuery({
    queryKey: ["myProperties", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties/agent/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/properties/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.deletedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Property deleted successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
        queryClient.invalidateQueries(["myProperties", user?.email]);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Delete failed!",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this property!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {properties.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven’t added any properties yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          {properties.map((property) => (
            <div
              key={property._id}
              className="  overflow-hidden transform transition duration-600 hover:shadow-xl hover:border border-gray-200 group"
            >
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-40 object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {property.title}
                </h3>
                <p className="text-sm text-gray-600">📍 {property.location}</p>

                <div className="flex items-center gap-3 mt-1">
                  <img
                    src={property.agentImage || user?.photoURL}
                    alt="agent"
                    className="w-8 h-8 rounded-full border"
                  />
                  <span className="text-sm text-gray-700">
                    {property.agentName}
                  </span>
                </div>

                <p className="text-sm">
                  Status:{" "}
                  <span
                    className={`font-medium capitalize ${
                      property.verificationStatus === "verified"
                        ? "text-green-600"
                        : property.verificationStatus === "rejected"
                        ? "text-red-600"
                        : "text-yellow-500"
                    }`}
                  >
                    {property.verificationStatus}
                  </span>
                </p>

                <p className="text-sm text-gray-700">
                  💰 ${property.minPrice} - ${property.maxPrice}
                </p>

                {/* Buttons - Shown but no functionality */}
                <div className="flex justify-between mt-4">
                  <button
                    className="px-3 py-1 text-sm border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white transition cursor-pointer"
                    disabled={property.verificationStatus === "rejected"}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(property._id)}
                    className="px-3 py-1 text-sm border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAddedProperties;
