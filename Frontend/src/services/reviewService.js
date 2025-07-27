import api from "./apiClient";

// Submit or update a review for a tour.
export const submitReview = async ({ identifier: tourId, data }) => {
  return await api.post(`/review/${tourId}`, data);
};

// Delete a review by review ID.
export const deleteReview = async ({ identifier: reviewId }) => {
  return await api.delete(`/review/${reviewId}`);
};

// Get all reviews written by a specific user.
export const getUserReviews = async () => {
  return await api.get(`/review/user-reviews`);
};
