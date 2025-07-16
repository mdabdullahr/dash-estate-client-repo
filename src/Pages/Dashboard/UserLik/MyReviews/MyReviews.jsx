import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { format } from "date-fns";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../../../Shared/Loading/Loading";

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
      const res = await axiosSecure.delete(`/reviews/${id}`);
      if (res.data.deletedCount > 0) {
        toast.success("Review deleted successfully");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to delete review");
    }
  };

  if (isLoading)
    return <Loading></Loading>;

  return (
    <div className="p-4 md:p-8 bg-gray-50 rounded-2xl min-h-screen">

      {reviews.length === 0 ? (
        <p className="text-gray-600 text-2xl flex justify-center items-center">You haven’t added any reviews yet.</p>
      ) : (
        <div className="grid gap-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="border border-gray-200 rounded-xl shadow-sm p-4 bg-white hover:shadow-md transition"
            >
              <div className="flex items-center gap-4 mb-2">
                <img
                  src={review.userImage}
                  alt={review.userName}
                  className="w-14 h-14 rounded-full border"
                />
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-green-600">
                    {review.propertyTitle}
                  </h3>
                  <p className="text-sm md:text-lg text-gray-800">
                    <span className="font-semibold">Agent :</span> {review.agentName}
                  </p>
                </div>
              </div>
              <p className="text-gray-800 mt-2 text-sm md:text-lg">{review.comment}</p>
              <p className="text-sm md:text-lg text-gray-800 mt-1">
                <span className="font-semibold">Reviewed : </span>{format(new Date(review.postedAt), "PPPpp")}
              </p>
              <button
                onClick={() => handleDelete(review._id)}
                className="mt-4 px-4 py-1 cursor-pointer bg-red-500 text-white text-sm md:text-lg rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
