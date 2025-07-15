import React from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../../../Shared/Loading/Loading";

const ManageProperties = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Get all properties
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["admin-properties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/properties");
      return res.data;
    },
  });

  // Mutation for verifying property
  const verifyMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/admin/properties/verify/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Verified!", "Property has been verified.", "success");
      queryClient.invalidateQueries(["admin-properties"]);
    },
  });

  // Mutation for rejecting property
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/admin/properties/reject/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Rejected!", "Property has been rejected.", "warning");
      queryClient.invalidateQueries(["admin-properties"]);
    },
  });

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="p-4 2xl:p-8 bg-white min-h-screen rounded-2xl">
      <div className="divider before:bg-green-500 after:bg-green-500 text-green-500 text-xl md:text-2xl font-bold mb-8">
        Manage All Properties
      </div>
      <div className="overflow-x-auto">
        <div className="overflow-x-auto rounded-t-sm">
          <table className="table w-full">
            <thead className="text-white text-[14px] md:text-lg bg-green-500">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Title</th>
                <th>Location</th>
                <th>Agent Name</th>
                <th>Agent Email</th>
                <th>Price Range</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property, index) => (
                <tr
                  key={property._id}
                  className={`${index % 2 === 0 ? "bg-green-50" : "bg-white"}`}
                >
                  <td className="text-sm xl:text-lg font-semibold">{index+1}</td>
                  <td>
                    <div className="avatar">
                      <div className="w-10 md:w-14 h-10 md:h-14 rounded overflow-hidden">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="text-sm xl:text-lg font-semibold">{property.title}</td>
                  <td className="text-sm xl:text-lg">{property.location}</td>
                  <td className="text-sm xl:text-lg">{property.agentName}</td>
                  <td className="text-sm xl:text-lg">{property.agentEmail}</td>
                  <td className="text-sm xl:text-lg font-medium">
                    ${property.minPrice} - ${property.maxPrice}
                  </td>
                  <td className="capitalize text-sm xl:text-lg">
                    {property.verificationStatus || "pending"}
                  </td>
                  <td className="space-x-2 text-sm xl:text-lg">
                    {property.verificationStatus === "pending" && (
                      <>
                        <button
                          onClick={() => verifyMutation.mutate(property._id)}
                          className="btn btn-sm btn-success text-sm"
                        >
                          Verify
                        </button>
                        <button
                          onClick={() => rejectMutation.mutate(property._id)}
                          className="btn btn-sm btn-error text-sm"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {property.verificationStatus === "verified" && (
                      <span className="text-green-600 font-medium">
                        Verified
                      </span>
                    )}
                    {property.verificationStatus === "rejected" && (
                      <span className="text-red-600 font-medium">Rejected</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageProperties;
