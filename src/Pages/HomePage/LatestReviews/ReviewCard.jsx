import { FaQuoteLeft, FaQuoteRight, FaStar } from "react-icons/fa";
import Rating from "react-rating";

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-xl transition duration-300  hover:border border-green-200 p-5 xl:p-8 w-full relative group">
      {/* Background Quote Text */}
      <div className="absolute top-2 left-3 text-gray-100 text-6xl font-bold opacity-10 select-none pointer-events-none">
        FEEDBACK
      </div>

      {/* User Image */}
      <div className="flex justify-center">
        <img
          src={review.userImage}
          alt={review.userName}
          className="w-20 h-20 rounded-full border-4 border-white shadow -mt-10 xl:-mt-16 z-10 bg-white object-cover"
        />
      </div>

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
        <h3 className="text-md font-bold text-gray-900">{review.userName}</h3>
        <p className="text-lg  text-gray-500 font-medium">{review.propertyTitle}</p>

        {/* Rating */}
        <Rating
          readonly
          initialRating={review.rating}
          emptySymbol={<FaStar className="text-gray-300" />}
          fullSymbol={<FaStar className="text-yellow-500" />}
        />
      </div>
    </div>
  );
};

export default ReviewCard;
