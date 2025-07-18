import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
// import { format } from "date-fns";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../../../Shared/Loading/Loading";
import Rating from "react-rating";
import { FaQuoteLeft, FaQuoteRight, FaRegStar, FaStar } from "react-icons/fa";
import moment from "moment-timezone";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myReviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?email=${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this review!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/user-reviews/${id}`);
      if (res.data.deletedCount > 0) {
        toast.success("Review deleted successfully");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to delete review");
    }
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="1500"
      className="p-4 md:p-8 bg-orange-50/80 rounded-2xl mt-18 lg:mt-22 2xl:mt-26"
    >
      <div className="divider before:bg-[#14203e] after:bg-[#14203e] text-[#14203e] text-xl md:text-2xl font-bold mb-8">
        My Reviews
      </div>
      {reviews.length === 0 ? (
        <div
          data-aos="fade-up"
          data-aos-duration="1500"
          data-aos-delay="100"
          className="text-center text-xl font-medium text-gray-600 border border-dashed border-orange-500 py-10 rounded-lg shadow-inner bg-orange-50"
        >
          🚫 You haven't any added reviews yit.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              data-aos="fade-up"
              data-aos-duration="1500"
              data-aos-delay={index * 200}
              className="bg-white rounded-lg shadow-sm hover:shadow-xl transition duration-300   p-5 xl:p-8 w-full relative group"
            >
              {/* Background Quote Text */}
              <div className="absolute top-2 left-3 text-gray-100 text-6xl font-bold opacity-10 select-none pointer-events-none">
                FEEDBACK
              </div>

              {/* User Image */}
              <div className="flex justify-center"></div>

              {/* Review Box */}
              <div className="bg-gray-200 mt-3 rounded-lg p-6 text-center relative">
                <FaQuoteLeft className="text-orange-400 text-xl absolute top-3 left-3" />
                <p className="text-gray-700 text-md px-2">
                  {review.comment.length > 150
                    ? review.comment.slice(0, 250) + "..."
                    : review.comment}
                </p>
                <FaQuoteRight className="text-orange-400 text-xl absolute bottom-3 right-3" />
              </div>

              {/* Reviewer Name */}
              <div className="mt-4 text-center space-y-1">
                <h3 className="text-md font-bold text-gray-900">
                  {review.agentName}
                </h3>
                <p className="text-lg 2xl:text-xl  text-gray-500 font-medium">
                  {review.propertyTitle}
                </p>

                {/* Rating */}
                <Rating
                  readonly
                  initialRating={review.rating}
                  emptySymbol={<FaStar className="text-gray-300" />}
                  fullSymbol={<FaStar className="text-yellow-500" />}
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-lg text-gray-700 font-medium">
                  {new Date(review.postedAt).toLocaleString()}
                </p>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="mt-4 px-4 py-1 cursor-pointer bg-red-500 text-white text-sm md:text-lg rounded hover:bg-red-600"
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

export default MyReviews;
