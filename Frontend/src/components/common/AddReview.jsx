import { useState } from "react";
import { FaStar } from "react-icons/fa";

function AddReview({ initialReview = null, onSubmit }) {
  const [rating, setRating] = useState(initialReview?.rating || 0);
  const [review, setReview] = useState(initialReview?.review || "");
  const [hasReviewed, setHasReviewed] = useState(!!initialReview);

  const handleSubmit = () => {
    if (!review.trim()) {
      alert("Please enter a review.");
      return;
    }
    if (rating === 0) {
      alert("Please select a rating.");
      return;
    }

    const newReview = { rating, review };
    onSubmit(newReview);

    setHasReviewed(true); // Mark as reviewed
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-3 text-green-950">
        {hasReviewed ? "Edit Your Review" : "Add a Review"}
      </h2>
      <div className="flex flex-col gap-4">
        {/* Rating Selection */}
        <div className="flex space-x-2 ">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              size={24}
              className={`cursor-pointer ${
                star <= rating ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
        {/* Review Input */}
        <textarea
          className="w-full p-2 text-green-950 border border-green-700 outline-none rounded-lg "
          rows="4"
          placeholder="Write your review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        {/* Submit Button */}
        <button
          className="flex self-end cursor-pointer w-34 items-center justify-center  mt-3 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          onClick={handleSubmit}
        >
          {hasReviewed ? "Edit Review" : "Submit Review"}
        </button>
      </div>
    </div>
  );
}

export default AddReview;
