import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { FaTrash } from "react-icons/fa";
import StarRatings from "react-star-ratings";
const ReviewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSuspending, setIsSuspending] = useState(false);
  const [suspendReason, setSuspendReason] = useState("");
  const [isSuspended, setIsSuspended] = useState(false);
  const [suspendUntil, setSuspendUntil] = useState("");
  const [isMailing, setIsMailing] = useState(false);
  const [mailSubject, setMailSubject] = useState("");
  const [mailBody, setMailBody] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    reviewId: null,
  });
  const review = {
    id,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    numberOfreviews: 5,
    lastVisit: "2025-03-20",
    lastreview: "Cultural Exploration",
    reviewList: [
      { id: "101", name: "Safari Adventure" },
      { id: "102", name: "Mountain Hike" },
      { id: "103", name: "City review" },
      { id: "104", name: "Beach Holiday" },
      { id: "105", name: "Cultural Exploration" },
    ],
    status: isSuspended ? "Suspended" : "Active",
  };
  const handleDelete = (id) => {
    setDeleteConfirm({ show: true, reviewId: id });
  };

  const confirmDelete = () => {
    setDeleteConfirm({ show: false, reviewId: null });
  };

  const cancelDelete = () => {
    setDeleteConfirm({ show: false, reviewId: null });
  };

  return (
    <div className="p-6 space-y-6 border border-green-400 rounded-md bg-green-50 shadow-md h-full overflow-y-auto scrollbar-none">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-800">Review Details</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 "
        >
          Go Back
        </button>
      </div>

      {/* Review Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-white border border-green-300 rounded-md shadow">
        <div className="space-y-2">
          <p>
            <span className="font-semibold text-green-800">Review ID:</span>{" "}
            {review.id}
          </p>
          <p>
            <span className="font-semibold text-green-800">Name:</span>{" "}
            {review.name}
          </p>
          <p>
            <span className="font-semibold text-green-800">Email:</span>{" "}
            {review.email}
          </p>
          <p>
            <span className="font-semibold text-green-800">Phone:</span>{" "}
            {review.phone}
          </p>
          <p>
            <span className="font-semibold text-green-800">
              Number of Tours:
            </span>{" "}
            {review.numberOfreviews}
          </p>
        </div>

        <div className="space-y-2">
          <p>
            <span className="font-semibold text-green-800">Last Visit:</span>{" "}
            {review.lastVisit}
          </p>
          <p>
            <span className="font-semibold text-green-800">Last Tour:</span>{" "}
            {review.lastreview}
          </p>
          <p className="flex items-center gap-2">
            <span className="font-semibold text-green-800">Rating:</span>
            <StarRatings
              rating={4}
              starRatedColor="#FFD700"
              numberOfStars={5}
              starDimension="18px"
              starSpacing="2px"
            />
          </p>
          <p>
            <span className="font-semibold text-green-800">Status:</span>{" "}
            <span className="bg-purple-100 text-blue-700 border-blue-400 px-2 pb-1 border rounded-md">
              {review.status}
            </span>
          </p>
        </div>
      </div>

      {/* Review Message */}
      <div className="p-4 bg-white border border-green-300 rounded-md shadow">
        <h3 className="text-green-700 font-semibold mb-1">Review Message</h3>
        <p className="text-green-800">
          I've updated the main review page to display the review's name, email,
          a truncated review (first three words followed by "..."), and the
          date. Clicking on a review now navigates to another page (/review/:id)
          where full details can be shown.
        </p>
      </div>

      {/* Delete Button */}
      <button
        onClick={() => handleDelete(review.id)}
        disabled={deleteConfirm.reviewId === review.id}
        className={`flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 w-full sm:w-auto ${
          deleteConfirm.reviewId === review.id
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer"
        }`}
      >
        <FaTrash size={16} /> Delete
      </button>

      {/* Delete Modal */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
          <div className="bg-white w-full max-w-sm sm:max-w-md p-6 sm:p-10 rounded-xl shadow-xl">
            <p className="mb-6 text-green-800 font-semibold text-lg text-center">
              Are you sure you want to delete this review?
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-base w-full sm:w-auto"
                onClick={confirmDelete}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 text-base w-full sm:w-auto"
                onClick={cancelDelete}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewDetails;
