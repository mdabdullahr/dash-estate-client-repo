// ManageReviews.jsx
import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import moment from "moment";
import Loading from "../../../../Shared/Loading/Loading";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";

const ManageReviews = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  useEffect(() => {
    document.title = "DashEstate | Dashboard | Manage_Reviews";
  }, []);

  // Fetch all reviews
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["all-reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allReviews");
      return res.data;
    },
  });

  // Delete review
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/reviews/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "The review has been removed.", "success");
      queryClient.invalidateQueries(["all-reviews"]);
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this review permanently.",
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

  if (isLoading) return <Loading></Loading>;

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="1500"
      className="p-4 2xl:p-8 bg-orange-50/50 mt-18 lg:mt-22 2xl:mt-26 rounded-2xl"
    >
      <div
        data-aos="fade-up"
        data-aos-duration="1500"
        data-aos-delay="100"
        className="divider before:bg-[#14203e] after:bg-[#14203e] text-[#14203e] text-xl md:text-2xl font-bold mb-8"
      >
        All User Reviews
      </div>
      {reviews.length === 0 ? (
        <p className="text-center text-2xl">No reviews found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
          {reviews.map((review, index) => (
            <div
              data-aos="fade-up"
              data-aos-duration="1500"
              data-aos-delay={index * 100}
              key={review._id}
              className="bg-white rounded-lg shadow-sm hover:shadow-xl transition duration-300 overflow-hidden group flex flex-col justify-between p-6"
            >
              {/* Reviewer Info */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={review.userImage}
                    alt="Reviewer"
                    className="w-10 xl:w-14 h-10 xl:h-14 rounded-full border-3 border-gray-300"
                  />

                  <div>
                    <p className="font-medium text-[15px] xl:text-lg">
                      {review.userName}
                    </p>
                    <p className="text-xs xl:text-sm text-gray-800 ">
                      {review.userEmail}
                    </p>
                  </div>
                </div>
                <Rating
                  readonly
                  initialRating={review.rating}
                  emptySymbol={
                    <FaRegStar className="text-yellow-400 text-sm" />
                  }
                  fullSymbol={<FaStar className="text-yellow-500 text-sm" />}
                />
              </div>

              {/* Comment */}
              <p className="text-gray-700 text-sm mb-2 break-words">
                💬 {review.comment}
              </p>

              {/* Footer: Date + Button */}
              <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-300 text-sm">
                <span className="text-gray-700 font-medium">
                  {moment(review.postedAt).fromNow()}
                </span>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="text-white font-medium bg-red-500 hover:bg-red-600 px-2 py-1 rounded cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageReviews;
