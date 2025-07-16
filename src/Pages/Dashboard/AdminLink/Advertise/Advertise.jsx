import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loading from "../../../../Shared/Loading/Loading";

const Advertise = () => {
  const axiosSecure = useAxiosSecure();

  // fetch verified properties
  const {
    data: properties = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["verified-properties-admin"],
    queryFn: async () => {
      const res = await axiosSecure.get("/properties/verified/admin");
      return res.data;
    },
  });

  //   Advertised handler
  const advertiseMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/properties/advertise/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Property is now advertised");
      refetch(); // Refresh list
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="p-4 2xl:p-8 bg-white min-h-screen rounded-2xl">
      <div className="divider before:bg-green-500 after:bg-green-500 text-green-500 text-xl md:text-2xl font-bold mb-8">
        All Verified properties
      </div>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="overflow-x-auto rounded-t-sm">
          <table className="table w-full">
            <thead className="text-white text-lg xl:text-xl bg-green-500">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Property Name</th>
                <th>price Range</th>
                <th>Agent</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property, idx) => {
                return (
                  <tr
                    key={property._id}
                    className={`${idx % 2 === 0 ? "bg-green-50" : "bg-white"}`}
                  >
                    <td className="text-sm xl:text-lg font-semibold">
                      {idx + 1}
                    </td>
                    <td>
                      <img
                        src={property.image}
                        className="w-10 2xl:w-14 h-10 2xl:h-14 rounded-xl object-cover"
                        alt="user-Image"
                      />
                    </td>
                    <td className="text-sm xl:text-lg font-semibold">
                      {property.title}
                    </td>
                    <td className="text-sm xl:text-lg">${property.minPrice} - ${property.maxPrice}</td>
                    <td className="text-sm xl:text-lg">{property.agentName}</td>
                    <td className="text-sm xl:text-lg">
                      {property.advertised === true ? (
                        <span className="text-blue-600 font-semibold">
                          Advertised
                        </span>
                      ) : (
                        <button
                          onClick={() => advertiseMutation.mutate(property._id)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 cursor-pointer"
                        >
                          Advertise
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Advertise;
