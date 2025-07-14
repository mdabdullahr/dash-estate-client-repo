import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import Loading from "../../Shared/Loading/Loading";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useParams } from "react-router";

const PropertyDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [reviewModal, setReviewModal] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // ⏳ Fetch Property Details
  const { data: property = {}, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // ⏳ Fetch Reviews for this Property
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
  });

  // ✅ Check if already wishlisted
  const checkWishlistMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.get(`/wishlists/check`, {
        params: { userEmail: user?.email, propertyId: id },
      });
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.alreadyWishlisted) {
        setIsWishlisted(true);
      }
    },
  });

  useEffect(() => {
    if (user?.email && id) {
      checkWishlistMutation.mutate();
    }
  }, [user?.email, id, checkWishlistMutation]);

  // ✅ Add to Wishlist
  const wishlistMutation = useMutation({
    mutationFn: async () => {
      const wishlistItem = {
        propertyId: property._id,
        propertyImage: property.image,
        propertyTitle: property.title,
        propertyLocation: property.location,
        agentName: property.agentName,
        agentImage: property.agentImage,
        verificationStatus: property.verificationStatus,
        minPrice: property.minPrice,
        maxPrice: property.maxPrice,
        userEmail: user.email,
        addedAt: new Date().toISOString(),
      };
      const res = await axiosSecure.post("/wishlists", wishlistItem);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Added to wishlist!");
      setIsWishlisted(true);
    },
    onError: () => {
      toast.error("Failed to add to wishlist.");
    },
  });

  const handleAddToWishlist = () => {
    if (!user) {
      toast.error("Login first to add to wishlist.");
      return;
    }
    wishlistMutation.mutate();
  };

  // ✅ Review Form Submission
  const { register, handleSubmit, reset } = useForm();

  const reviewMutation = useMutation({
    mutationFn: async (data) => {
      const reviewData = {
        ...data,
        propertyId: id,
        userEmail: user.email,
        userName: user.displayName,
        userImage: user.photoURL,
        postedAt: new Date().toISOString(),
      };
      const res = await axiosSecure.post("/reviews", reviewData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "Your review was added!", "success");
      queryClient.invalidateQueries(["reviews", id]);
      setReviewModal(false);
      reset();
    },
    onError: () => {
      toast.error("Failed to add review.");
    },
  });

  const onSubmit = (data) => {
    reviewMutation.mutate(data);
  };

  // 💡 UI
  return (
    <div className="max-w-[1320px] mx-auto p-6 min-h-screen pt-32">
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: Property Image */}
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-96 lg:h-[400px] object-cover rounded-lg shadow"
          />

          {/* Right: Property Info */}
          <div>
            <h2 className="text-3xl font-bold mb-2">{property.title}</h2>
            <p className="text-gray-700 text-lg mb-4 h-fit lg:h-[130px] overflow-auto">
              {property.description}
            </p>

            <p className="text-lg">
              <span className="font-semibold text-gray-800">Location :</span>{" "}
              {property.location}
            </p>

            <div className="my-2 ">
              <span className="font-semibold text-gray-800 text-lg">
                Agent :
              </span>
              <p className="text-lg border border-gray-200 py-2 px-5 flex items-center gap-5 mt-1 rounded">
                <img
                  className="w-14 h-14 rounded-full border border-green-500 object-cover"
                  src={property.agentImage}
                  alt=""
                />
                <span className="">{property.agentName}</span>{" "}
              </p>
            </div>

            <p className="text-lg mt-1">
              <span className="font-semibold">💰 Price Range : </span>
              <span className="font-bold text-green-600">
                ${property.minPrice} - ${property.maxPrice}
              </span>
            </p>

            <button
              onClick={handleAddToWishlist}
              disabled={isWishlisted}
              className={`mt-6 px-6 py-2 rounded shadow text-white transition ${
                isWishlisted
                  ? "bg-green-300 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 cursor-pointer"
              }`}
            >
              {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      )}

      {/* Reviews */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-4">All Reviews</h3>

        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="border border-gray-200 p-4 rounded-md"
              >
                <div className="flex items-center gap-3 mb-1">
                  <img
                    src={review.userImage}
                    alt={review.userName}
                    className="w-10 h-10 rounded-full border"
                  />
                  <div>
                    <p className="font-medium">{review.userName}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(review.postedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 mt-2">{review.comment}</p>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => setReviewModal(true)}
          className="mt-6 cursor-pointer bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded shadow"
        >
          Add a Review
        </button>
      </div>

      {/* Add Review Modal */}
      {reviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setReviewModal(false)}
              className="absolute top-2 right-3 text-xl cursor-pointer"
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold mb-4">Add Your Review</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <textarea
                {...register("comment", { required: true })}
                rows="4"
                placeholder="Write your thoughts..."
                className="w-full border border-gray-300 rounded px-4 py-2"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded cursor-pointer"
                disabled={reviewMutation.isPending}
              >
                {reviewMutation.isPending ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
