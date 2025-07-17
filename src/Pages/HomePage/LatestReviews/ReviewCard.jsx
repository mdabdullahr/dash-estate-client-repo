import { FaQuoteLeft, FaQuoteRight, FaStar } from "react-icons/fa";
import Rating from "react-rating";

const ReviewCard = ({ review }) => {
  return (
   <div className="bg-white rounded-xl  shadow-sm hover:shadow-xl transition duration-300 p-5 xl:p-8 w-full relative group">

  {/* 🔳 Overlay - comes from top-left */}
  <div className="absolute inset-0 bg-[#1b2a4f]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none rounded-xl"></div>

  {/* 👤 User Image */}
  <div className="flex justify-center z-20 relative">
    <img
      src={review.userImage}
      alt={review.userName}
      className="w-20 h-20 2xl:w-32 2xl:h-32 rounded-full border-4 border-gray-300 shadow -mt-10 xl:-mt-20 bg-white object-cover relative z-20"
    />
  </div>

  {/* 💬 Review Box */}
  <div className="bg-gray-200 mt-3 rounded-xl p-6 text-center relative z-20">
    <FaQuoteLeft className="text-orange-500 text-xl absolute top-2 left-3" />
    <p className="text-gray-700 text-md px-2">
      {review.comment.length > 150
        ? review.comment.slice(0, 250) + "..."
        : review.comment}
    </p>
    <FaQuoteRight className="text-orange-500 text-xl absolute bottom-2 right-3" />
  </div>

  {/* 🧑 Reviewer Info */}
  <div className="mt-4 text-center space-y-1 z-20 relative">
    <h3 className="text-md font-bold text-gray-900">{review.userName}</h3>
    <p className="text-lg text-gray-500 font-medium">{review.propertyTitle}</p>

    {/* ⭐ Rating */}
    <Rating
      readonly
      initialRating={review.rating}
      emptySymbol={<FaStar className="text-gray-300" />}
      fullSymbol={<FaStar className="text-orange-500" />}
    />
  </div>
</div>

  );
};

export default ReviewCard;
