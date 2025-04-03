import { useEffect, useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaStar,
  FaRegStar,
  FaPlus,
} from "react-icons/fa";
import useSafeNavigate from "../../../../../utils/useSafeNavigate";
import ReviewsHeader from "../../../../common/DashboardHeader";
import AddEditReviewModal from "../../../../common/AddReview";
import ConfirmationModal from "../../../../../components/common/ConfirmationModal";

function Reviews() {
  const [filterState, setFilterState] = useState({
    searchQuery: "",
    sortOrder: "asc",
    selectedFilters: [],
  });

  const navigate = useSafeNavigate();

  const [reviewedTours, setReviewedTours] = useState([
    {
      id: 1,
      tourName: "Forest Adventure",
      rating: 5,
      reviewText: "Amazing experience! Would love to go again.",
      date: "2025-03-28",
    },
    {
      id: 2,
      tourName: "Mountain Hiking",
      rating: 4,
      reviewText: "Challenging but rewarding. Highly recommend!",
      date: "2025-03-26",
    },
  ]);

  const [unreviewedTours, setUnreviewedTours] = useState([
    { id: 3, tourName: "Safari Exploration", date: "2025-03-24" },
    { id: 4, tourName: "Beach Retreat", date: "2025-03-20" },
  ]);

  useEffect(() => {
    function fetchReviews(reviewsData, query) {
      return reviewsData.filter(
        (review) =>
          !query ||
          review.tourName.toLowerCase().includes(query.toLowerCase()) ||
          review?.reviewText?.toLowerCase().includes(query.toLowerCase())
      );
    }

    const filteredReviewedTours = fetchReviews(
      reviewedTours,
      filterState.searchQuery
    );
    setReviewedTours(filteredReviewedTours);
    const filteredUneviewedTours = fetchReviews(
      unreviewedTours,
      filterState.searchQuery
    );
    setUnreviewedTours(filteredUneviewedTours);
  }, [filterState.searchQuery, filterState.selectedFilters]);

  const sortedReviewedTours = [...reviewedTours].sort((a, b) => {
    return filterState.sortOrder === "asc"
      ? a.tourName.localeCompare(b.tourName)
      : b.tourName.localeCompare(a.tourName);
  });
  const sortedUnreviewedTours = [...unreviewedTours].sort((a, b) => {
    return filterState.sortOrder === "asc"
      ? a.tourName.localeCompare(b.tourName)
      : b.tourName.localeCompare(a.tourName);
  });

  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    reviewId: null,
  });
  const [editReview, setEditReview] = useState({ show: false, reviewId: null });
  const [addReview, setAddReview] = useState({ show: false, tourId: null });

  const handleEditReview = (reviewData) => {
    // Update the specific review in reviewedTours
    setReviewedTours((prevTours) =>
      prevTours.map((tour) =>
        tour.id === editReview.reviewId
          ? {
              ...tour,
              ...reviewData,
              date: new Date().toISOString().split("T")[0],
            }
          : tour
      )
    );
    setEditReview({ show: false, reviewId: null }); // Close modal
  };

  const handleAddReview = (reviewData) => {
    // Find the tour in unreviewedTours and move it to reviewedTours with the new review
    const reviewedTour = unreviewedTours.find(
      (tour) => tour.id === addReview.tourId
    );
    if (reviewedTour) {
      setReviewedTours((prevTours) => [
        ...prevTours,
        {
          ...reviewedTour,
          ...reviewData,
          date: new Date().toISOString().split("T")[0],
        },
      ]);
      setUnreviewedTours((prevTours) =>
        prevTours.filter((tour) => tour.id !== addReview.tourId)
      );
    }
    setAddReview({ show: false, tourId: null }); // Close modal
  };

  const handleConfirmDelete = (id) => {
    // Remove the review from reviewedTours
    setReviewedTours((prevTours) => prevTours.filter((tour) => tour.id !== id));
    setDeleteConfirm({ show: false, reviewId: null });
  };

  const handleCancelDelete = () => {
    setDeleteConfirm({ show: false, reviewId: null });
  };

  const handleOpenEditModal = (id) => {
    setEditReview({ show: true, reviewId: id });
  };

  const handleOpenAddModal = (id) => {
    setAddReview({ show: true, tourId: id });
  };

  return (
    <div className="p-4 flex flex-col bg-green-50 h-full">
      <ReviewsHeader
        title="Reviews"
        totalCount={sortedReviewedTours.length + sortedUnreviewedTours.length}
        filterState={filterState}
        setFilterState={setFilterState}
      />
      <div className="flex flex-col gap-4 overflow-y-auto h-full scrollbar-none">
        {/* Reviewed Tours Section */}
        {sortedReviewedTours.length > 0 && (
          <h2 className="text-2xl font-bold text-green-900 mb-2">
            Reviewed Tours
          </h2>
        )}
        {sortedReviewedTours.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-2xl shadow-lg p-6 border-t-2 border-green-700"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-green-800">
                {review.tourName}
              </h2>
              <p className="text-gray-500 text-sm">{review.date}</p>
            </div>
            <div className="flex items-center gap-2 my-2">
              {Array.from({ length: 5 }).map((_, index) =>
                index < review.rating ? (
                  <FaStar key={index} className="text-yellow-400" />
                ) : (
                  <FaRegStar key={index} className="text-gray-400" />
                )
              )}
              <span className="text-gray-500 text-sm">{review.rating}/5</span>
            </div>
            <p className="text-green-900 p-3 rounded-md mb-4 shadow-sm">
              {review.reviewText}
            </p>
            <div className="flex gap-4 mt-4">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 cursor-pointer"
                onClick={() => handleOpenEditModal(review.id)}
              >
                <FaEdit size={16} />
                Edit
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
                onClick={() =>
                  setDeleteConfirm({ show: true, reviewId: review.id })
                }
              >
                <FaTrash size={16} />
                Delete
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
                onClick={() => navigate(`/tours/${review.id}`)}
              >
                <FaEye size={16} />
                View Tour
              </button>
            </div>
          </div>
        ))}

        {/* Unreviewed Tours Section */}
        {sortedUnreviewedTours.length > 0 && (
          <h2 className="text-2xl font-bold text-green-700 mt-6 mb-2">
            Tours Awaiting Your Feedback
          </h2>
        )}
        {sortedUnreviewedTours.map((tour) => (
          <div
            key={tour.id}
            className="bg-white rounded-2xl shadow-lg p-6 border-t-2 border-green-500"
          >
            <h2 className="text-xl font-semibold text-green-700">
              {tour.tourName}
            </h2>
            <p className="text-green-700 p-3 rounded-md mb-4 shadow-sm">
              You haven't reviewed this tour yet.
            </p>
            <div className="flex gap-4 mt-4">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 cursor-pointer"
                onClick={() => handleOpenAddModal(tour.id)}
              >
                <FaPlus size={16} />
                Add Review
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer">
                <FaEye size={16} />
                View Tour
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Review Modal */}
      {editReview.show && (
        <AddEditReviewModal
          initialReview={
            reviewedTours.find((review) => review.id === editReview.reviewId) ||
            null
          }
          onSubmit={handleEditReview}
          setIsModalOpen={(show) =>
            setEditReview({ show, reviewId: editReview.reviewId })
          }
        />
      )}
      {addReview.show && (
        <AddEditReviewModal
          initialReview={null}
          onSubmit={handleAddReview}
          setIsModalOpen={(show) =>
            setAddReview({ show, tourId: addReview.tourId })
          }
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.show && (
        <ConfirmationModal
          text={"Are you sure you want to delete this review?"}
          onConfirm={() => handleConfirmDelete(deleteConfirm.reviewId)}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default Reviews;
