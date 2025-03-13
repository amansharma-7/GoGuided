import { NavLink } from "react-router";
import { FaStar } from "react-icons/fa";

function NoReviews() {
  return (
    <div className="flex flex-col items-center justify-center py-12 animate-fadeIn space-y-3">
      <p className="text-gray-500 text-xl font-semibold">No reviews yet.</p>
      <p className="text-gray-400 text-sm text-center max-w-md">
        Share your experience and help others make informed decisions!
      </p>
      <NavLink to="/tours">
        <button className="mt-6 flex items-center gap-2 px-6 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md shadow-md transition transform hover:scale-105">
          <FaStar /> Write a Review
        </button>
      </NavLink>
    </div>
  );
}

export default NoReviews;
