import React, { useEffect } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loading from "../../../../Shared/Loading/Loading";

const Advertise = () => {
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    document.title = "DashEstate | Dashboard | Advertise";
  }, []);

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
    <div
      data-aos="fade-up"
      data-aos-duration="1500"
      className="p-4 2xl:p-8 bg-orange-50/80 mt-18 lg:mt-22 2xl:mt-26 rounded-2xl"
    >
      <div className="divider before:bg-[#14203e] after:bg-[#14203e] text-[#14203e] text-xl md:text-2xl font-bold mb-8">
        All Verified properties
      </div>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="overflow-x-auto rounded-t-sm">
          {
            properties.length === 0 ? <div
          data-aos="fade-up"
          data-aos-duration="1500"
          data-aos-delay="100"
          className="text-center text-xl font-medium text-gray-600 border border-dashed border-orange-500 py-10 rounded-lg shadow-inner bg-orange-50"
        >
          🚫 No Properties Yet for Advertise.
        </div> :

          <table className="table w-full">
            <thead className="text-white text-lg  bg-[#14203e]/70">
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
                    className={`${
                      idx % 2 === 0 ? "bg-orange-50/80" : "bg-white"
                    }`}
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
                    <td className="text-sm xl:text-lg">
                      ${property.minPrice} - ${property.maxPrice}
                    </td>
                    <td className="text-sm xl:text-lg">{property.agentName}</td>
                    <td className="text-sm xl:text-lg">
                      {property.advertised === true ? (
                        <span className="text-[#14203e94] font-semibold">
                          Advertised
                        </span>
                      ) : (
                        <button
                          onClick={() => advertiseMutation.mutate(property._id)}
                          className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-[#14203e] cursor-pointer"
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
          }
        </div>
      )}
    </div>
  );
};

export default Advertise;
