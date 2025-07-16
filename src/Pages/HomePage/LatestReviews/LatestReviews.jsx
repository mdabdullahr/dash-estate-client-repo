import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Loading from "../../../Shared/Loading/Loading";
import ReviewCard from "./ReviewCard";

const LatestReviews = () => {
  const axiosPublic = useAxiosPublic();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["latest-reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/reviews/latest");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <Loading></Loading>
    );

  return (
    <div className="bg-green-50">
        <div className="py-12 px-6 max-w-[1320px] mx-auto">
      <div className="divider before:bg-green-700 after:bg-green-700 text-green-700 text-xl md:text-2xl xl:text-3xl font-bold mb-12">
          Latest Reviews
        </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
            <ReviewCard key={review._id} review={review}></ReviewCard>
        ))}
      </div>
    </div>
    </div>
  );
};

export default LatestReviews;
