// ManageReviews.jsx
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import moment from "moment";
import Loading from "../../../../Shared/Loading/Loading";

const ManageReviews = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

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
    <div className="p-4 2xl:p-8 bg-white min-h-screen rounded-2xl">
          <div className="divider before:bg-green-500 after:bg-green-500 text-green-500 text-xl md:text-2xl font-bold mb-8">All User Reviews</div>
      {reviews.length === 0 ? (
        <p className="text-center text-2xl">No reviews found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="border border-green-50 rounded-lg shadow-sm p-4 bg-white hover:bg-green-50 h-full flex flex-col justify-between transition duration-600"
            >
              {/* Reviewer Info */}
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={review.userImage}
                  alt="Reviewer"
                  className="w-10 xl:w-14 h-10 xl:h-14 rounded-full border border-green-500"
                />
                <div>
                  <p className="font-medium text-[15px] xl:text-lg">{review.userName}</p>
                  <p className="text-xs xl:text-sm text-gray-800 ">{review.userEmail}</p>
                </div>
              </div>

              {/* Comment */}
              <p className="text-gray-700 text-sm mb-2 break-words">
                💬 {review.comment}
              </p>

              {/* Footer: Date + Button */}
              <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-300 text-sm">
                <span className="text-green-600 font-medium">
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
