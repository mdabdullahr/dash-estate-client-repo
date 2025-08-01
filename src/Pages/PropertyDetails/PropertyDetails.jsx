import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import Loading from "../../Shared/Loading/Loading";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useParams } from "react-router";
import { FaLocationDot } from "react-icons/fa6";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import Rating from "react-rating";
import { FaStar, FaRegStar, FaHome } from "react-icons/fa";
import useUserRole from "../../Hooks/useUserRole";

const PropertyDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { role } = useUserRole();
  console.log(role);
  const queryClient = useQueryClient();
  const [reviewModal, setReviewModal] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [rating, setRating] = useState(0);

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
        agentEmail: property.agentEmail,
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
      if (!rating || rating < 1) {
        toast.error("Please give a rating before submitting.");
        return;
      }
      const reviewData = {
        ...data,
        rating,
        propertyId: id,
        propertyTitle: property.title,
        agentName: property.agentName,
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

  useEffect(() => {
    document.title = "DashEstate | Property_Details";
  }, []);

  return (
    <div className="overflow-hidden">
      <div className="w-full h-full md:h-[80vh] relative overflow-hidden mt-20">
        {/* ✅ Fullscreen Background Image */}
        <img
          src="https://i.ibb.co/DgvhSvvS/loux1.jpg"
          alt="Full Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* ✅ Dark Overlay */}
        <div className="absolute inset-0 bg-[#14203e]/95 z-10"></div>

        {/* ✅ Main Content Section */}
        <div className="relative z-20 grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Left Side Text */}
          <div className="flex items-center justify-center px-10 mt-24 lg:mt-0 text-white">
            <div className="text-left max-w-2xl">
              <h4
                data-aos="fade-up"
                data-aos-duration="1500"
                className="text-orange-500 text-lg md:text-xl lg:text-2xl font-medium flex items-center"
              >
                <FaHome className="mr-2"></FaHome>DESHESTATE
              </h4>
              <h1
                data-aos="fade-up"
                data-aos-duration="1500"
                data-aos-delay="100"
                className="text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-4 leading-snug"
              >
                Properties Details
              </h1>
              <p
                data-aos="fade-up"
                data-aos-duration="1500"
                data-aos-delay="200"
                className="text-lg md:text-xl mb-6 text-gray-300"
              >
                Welcome to your Properties details page. right now this page you
                showing all details this property and reviews for this
                properties. This property able to add wishlist and manage your
                dashboard.
              </p>
            </div>
          </div>

          {/* Right Side Image with custom diagonal clip */}
          <div
            data-aos="fade-left"
            data-aos-duration="1500"
            data-aos-delay="100"
            className="clip-right-25 w-full h-full overflow-hidden relative z-20"
          >
            <img
              src={property.image}
              alt="Luxury Home"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* ✂️ Clip Path Styling */}
        <style>{`
          .clip-right-25 {
            clip-path: polygon(40% 0%, 100% 0%, 100% 100%, 0% 100%);
          }
        `}</style>
      </div>

      <div className="bg-orange-50/50">
        <div className="max-w-[1620px] mx-auto px-4 md:px-10 min-h-screen pt-30 md:pt-36">
          {isLoading ? (
            <Loading></Loading>
          ) : (
            <div className="flex flex-col lg:flex-row gap-10 items-start">
              <div className="w-full lg:w-[70%]">
                <h1
                  data-aos="fade-up"
                  data-aos-duration="1500"
                  className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-10 text-gary-800"
                >
                  Description for tis Property
                </h1>
                <p
                  data-aos="fade-up"
                  data-aos-duration="1500"
                  data-aos-delay="100"
                  className="text-lg 2xl:text-xl text-gray-700"
                >
                  {property.description}
                </p>
              </div>

              {/* Right: Property Info */}
              <div
                data-aos="fade-up"
                data-aos-duration="1500"
                data-aos-delay="200"
                className="w-full lg:w-[30%] bg-gray-200 p-10 rounded-2xl"
              >
                <h3 className="text-xl md:text-3xl font-bold mb-8 text-gray-800">
                  Properties Information :{" "}
                </h3>
                <h2 className="text-xl  mb-6 text-gray-700">
                  <span className="font-semibold"> Property Name :</span>{" "}
                  {property.title}
                </h2>

                <p className="text-lg flex items-center gap-2 text-gray-700 mb-6">
                  <span className="font-semibold text-gray-800 flex items-center">
                    <FaLocationDot className="mr-1 text-orange-500"></FaLocationDot>
                    Location :{" "}
                  </span>{" "}
                  {property.location}
                </p>

                <div className="my-2 flex items-center gap-5 mb-6">
                  <span className="font-semibold text-gray-800 text-lg">
                    Agent :
                  </span>
                  <p className="text-lg  flex items-center gap-5 mt-1 rounded text-gray-700">
                    <img
                      className="w-14 h-14 rounded-full border border-orange-500 object-cover"
                      src={property.agentImage}
                      alt=""
                    />
                    <span className="">{property.agentName}</span>{" "}
                  </p>
                </div>

                <p className="text-lg mt-1 flex gap-2 mb-6">
                  <LiaHandHoldingUsdSolid
                    className="text-orange-500 mr-1"
                    size={20}
                  ></LiaHandHoldingUsdSolid>
                  <span className="font-semibold text-gray-700">
                    {" "}
                    Price Range :{" "}
                  </span>
                  <span className="font-bold text-orange-500">
                    ${property.minPrice} - ${property.maxPrice}
                  </span>
                </p>

                {role === "user" && (
                  <button
                    onClick={handleAddToWishlist}
                    disabled={isWishlisted}
                    className={`mt-6 px-6 py-3 rounded-full shadow text-white text-lg font-medium transition ${
                      isWishlisted
                        ? "bg-orange-300 cursor-not-allowed"
                        : "bg-orange-500 hover:bg-[#14203e] cursor-pointer"
                    }`}
                  >
                    {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Reviews */}
          <div className="mt-12 pb-20">
            <div
              data-aos="fade-up"
              data-aos-duration="1500"
              className="divider before:bg-[#14203e] after:bg-[#14203e] text-bg-[#14203e] text-xl md:text-2xl font-bold mb-8 mt-20"
            >
              All Reviews For This Properties
            </div>

            {reviews.length === 0 ? (
              <p className="text-gray-800">No reviews yet.</p>
            ) : (
              <div className="space-y-6">
                {reviews.map((review, index) => (
                  <div
                    data-aos="fade-up"
                    data-aos-duration="1500"
                    data-aos-delay={index * 200}
                    key={review._id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-xl transition duration-300 overflow-hidden p-4 md:p-6 xl:p-8"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 mb-1">
                        <img
                          src={review.userImage}
                          alt={review.userName}
                          className="w-10 md:w-14 h-10 md:h-14 rounded-full border border-orange-500 object-center"
                        />
                        <div>
                          <p className="font-medium text-lg md:text-xl text-gray-700">
                            {review.userName}
                          </p>
                          <p className="text-lg text-gray-800 font-medium">
                            {new Date(review.postedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Rating
                        readonly
                        initialRating={review.rating}
                        emptySymbol={
                          <FaRegStar className="text-yellow-400 text-sm" />
                        }
                        fullSymbol={
                          <FaStar className="text-yellow-500 text-sm" />
                        }
                      />
                    </div>
                    <p className="text-gray-700 mt-2 text-sm md:text-lg">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {role === "user" && (
              <button
                data-aos="fade-up"
                data-aos-duration="1500"
                onClick={() => setReviewModal(true)}
                className="mt-6 cursor-pointer bg-orange-500 hover:bg-[#14203e] text-white px-6 py-3 text-lg font-medium rounded-full shadow"
              >
                Add a Review
              </button>
            )}
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
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Add Your Review
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Your Rating
                  </label>
                  <Rating
                    initialRating={rating}
                    onChange={(value) => setRating(value)}
                    emptySymbol={
                      <FaRegStar className="text-yellow-400 text-xl" />
                    }
                    fullSymbol={<FaStar className="text-yellow-500 text-xl" />}
                  />

                  <textarea
                    {...register("comment", { required: true })}
                    rows="4"
                    placeholder="Write your thoughts..."
                    className="w-full border border-gray-300 rounded px-4 py-2 text-black"
                  ></textarea>

                  <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-[#14203e] text-white py-2 rounded cursor-pointer"
                    disabled={reviewMutation.isPending}
                  >
                    {reviewMutation.isPending
                      ? "Submitting..."
                      : "Submit Review"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
