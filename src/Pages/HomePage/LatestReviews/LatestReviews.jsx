import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Loading from "../../../Shared/Loading/Loading";
import ReviewCard from "./ReviewCard";
import { IoMdHome } from "react-icons/io";

const LatestReviews = () => {
  const axiosPublic = useAxiosPublic();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["latest-reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/reviews/latest");
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="bg-orange-50/80">
      <div className="pt-20 lg:pt-20 pb-20 lg:pb-30 px-10 max-w-[1620px] mx-auto">
        <h4
          data-aos="fade-up"
          data-aos-duration="1500"
          className="font-medium text-xl lg:text-2xl text-orange-500 flex  justify-center items-center mb-2 md:mb-4 lg:mb-6"
        >
          <IoMdHome className="mr-4"></IoMdHome>REVIEWS HIGHLIGHTS{" "}
          <IoMdHome className="ml-4 "></IoMdHome>
        </h4>
        <div
          data-aos="fade-up"
          data-aos-duration="1500"
          data-aos-delay="100"
          className="divider before:bg-[#14203e] after:bg-[#14203e] text-[#14203e] text-2xl md:text-3xl xl:text-4xl font-bold mb-24"
        >
          Latest Reviews
        </div>
        {reviews.length === 0 ? (
          <div
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-delay="100"
            className="text-center text-xl font-medium text-gray-600 border border-dashed border-orange-500 py-10 rounded-lg shadow-inner bg-orange-50"
          >
            🚫 No Available latest reviews here.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <ReviewCard
              key={review._id} review={review} index={index}></ReviewCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestReviews;
