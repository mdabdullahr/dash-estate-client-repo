// MakeOffer.jsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import Loading from "../../../../Shared/Loading/Loading";

const MakeOffer = () => {
  const [isBoughtStatus, setIsBoughtStatus] = useState({});
  const { wishlistId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "DashEstate | Dashboard | wishlist | Make_Offer";
  }, []);

  // Fetch single wishlist item
  const { data: wishlist = {}, isLoading } = useQuery({
    queryKey: ["wishlist", wishlistId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlists/${wishlistId}`);
      return res.data;
    },
    enabled: !!wishlistId,
  });

  useEffect(() => {
    const fetchBoughtStatuses = async () => {
      if (wishlist.length === 0) return;

      const propertyId = wishlist.propertyId;
      const res = await axiosSecure.get(`/offers/${propertyId}/bought-status`);
      setIsBoughtStatus(res.data.boughtStatus);
    };

    fetchBoughtStatuses();
  }, [wishlist, axiosSecure]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const offerMutation = useMutation({
    mutationFn: async (offerData) => {
      const res = await axiosSecure.post("/offers", offerData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success", "Your offer has been submitted.", "success");
      navigate("/dashboard/bought");
    },
    onError: () => {
      Swal.fire("Error", "Offer could not be submitted.", "error");
    },
  });

  const onSubmit = (data) => {
    const offerAmount = parseFloat(data.offerAmount);
    if (offerAmount < wishlist.minPrice || offerAmount > wishlist.maxPrice) {
      Swal.fire(
        "Invalid Amount",
        `Offer must be between $${wishlist.minPrice} and $${wishlist.maxPrice}`,
        "error"
      );
      return;
    }

    const offerData = {
      propertyId: wishlist.propertyId,
      wishlistId,
      buyerEmail: user.email,
      buyerName: user.displayName,
      offerAmount,
      buyingDate: data.buyingDate,
      status: "pending",
      propertyTitle: wishlist.propertyTitle,
      propertyLocation: wishlist.propertyLocation,
      propertyImage: wishlist.propertyImage,
      agentName: wishlist.agentName,
      agentEmail: wishlist.agentEmail,
    };

    offerMutation.mutate(offerData);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="w-full max-w-3xl bg-orange-50/50 p-8 rounded-xl shadow-md mt-18 lg:mt-22 2xl:mt-26">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Make an Offer
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* --- other readonly fields here --- */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Property Title
              </label>
              <input
                readOnly
                value={wishlist.propertyTitle}
                className="w-full border border-gray-300 px-4 py-2 rounded-md bg-gray-100 focus:outline-orange-500"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Location
              </label>
              <input
                readOnly
                value={wishlist.propertyLocation}
                className="w-full border border-gray-300 px-4 py-2 rounded-md bg-gray-100 focus:outline-orange-500"
              />
            </div>

            {/* Agent Name */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Agent Name
              </label>
              <input
                readOnly
                value={wishlist.agentName}
                className="w-full border border-gray-300 px-4 py-2 rounded-md bg-gray-100 focus:outline-orange-500"
              />
            </div>

            {/* Buyer Name */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Your Name
              </label>
              <input
                readOnly
                value={user.displayName}
                className="w-full border border-gray-300 px-4 py-2 rounded-md bg-gray-100 focus:outline-orange-500"
              />
            </div>

            {/* Buyer Email */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Your Email
              </label>
              <input
                readOnly
                value={user.email}
                className="w-full border border-gray-300 px-4 py-2 rounded-md bg-gray-100 focus:outline-orange-500"
              />
            </div>

            {/* Offer Amount */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Offer Amount ($)
              </label>
              <input
                type="number"
                {...register("offerAmount", {
                  required: "Offer amount is required",
                  min: {
                    value: wishlist.minPrice,
                    message: `Minimum offer must be $${wishlist.minPrice}`,
                  },
                  max: {
                    value: wishlist.maxPrice,
                    message: `Maximum offer can be $${wishlist.maxPrice}`,
                  },
                })}
                placeholder={`Enter between $${wishlist.minPrice} - $${wishlist.maxPrice}`}
                className={`w-full border px-4 py-2 rounded-md ${
                  errors.offerAmount ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-orange-500`}
              />
              {errors.offerAmount && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.offerAmount.message}
                </p>
              )}
            </div>

            {/* Buying Date */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Buying Date
              </label>
              <input
                type="date"
                {...register("buyingDate", {
                  required: "Buying date is required",
                })}
                className={`w-full border px-4 py-2 rounded-md ${
                  errors.buyingDate ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-orange-500`}
              />
              {errors.buyingDate && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.buyingDate.message}
                </p>
              )}
            </div>

            {isBoughtStatus === "bought" ? (
              <button
                className="w-full bg-orange-300 text-white font-semibold py-2 rounded-md shadow-md cursor-not-allowed"
                disabled
              >
                Already Sell
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-[#14203e] text-white font-semibold py-2 rounded-md shadow-md transition duration-200 cursor-pointer"
              >
                Submit Offer
              </button>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default MakeOffer;
