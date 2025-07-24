const Review = require("../models/reviewModel");
const User = require("../models/userModel");
const Tour = require("../models/tourModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createOrUpdateReview = catchAsync(async (req, res, next) => {
  const { tourId } = req.params;
  const { userId } = req.user;
  const { rating, review } = req.body;

  // Check if the user already submitted a review for this tour
  let existingReview = await Review.findOne({ tour: tourId, user: userId });

  let savedReview;
  if (existingReview) {
    // Update existing review
    existingReview.rating = rating;
    existingReview.review = review;
    existingReview.updatedAt = Date.now();
    savedReview = await existingReview.save();
  } else {
    // Create new review
    savedReview = await Review.create({
      tour: tourId,
      user: userId,
      rating,
      review,
    });

    // Optional: Add review to user's review list
    const user = await User.findById(userId);
    if (user) {
      user.reviews.push(savedReview._id);
      await user.save();
    }
  }

  res.status(existingReview ? 200 : 201).json({
    isSuccess: true,
    message: existingReview
      ? "Review updated successfully."
      : "Review submitted successfully.",
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const { reviewId } = req.params;
  const { userId } = req.user;

  // Find the review
  const review = await Review.findById(reviewId);
  if (!review) {
    return next(
      new AppError("You have not submitted a review for this tour.", 404)
    );
  }

  // Only the author can delete the review
  if (review.user.toString() !== userId) {
    return next(
      new AppError("You are not authorized to delete this review.", 403)
    );
  }

  // Delete review
  await review.deleteOne();

  // Remove from user's review list
  const user = await User.findById(userId);
  if (user) {
    user.reviews = user.reviews.filter((r) => r.toString() !== reviewId);
    await user.save({ validateBeforeSave: false });
  }

  res.status(200).json({
    isSuccess: true,
    message: "Your review has been deleted successfully.",
  });
});

exports.getUserReviews = catchAsync(async (req, res, next) => {
  const { userId } = req.user;

  // 1. Get user bookings
  const { bookings } = await User.findById(userId).select("bookings");

  if (!bookings || bookings.length === 0) {
    return res.status(200).json({
      isSuccess: true,
      reviewed: [],
      notReviewed: [],
    });
  }

  // 2. Get all reviews by this user
  const reviews = await Review.find({ user: userId }).select(
    "tour rating review createdAt"
  );

  const reviewedTourIds = reviews.map((r) => r.tour.toString());
  const bookingsTourIds = bookings.map((b) => b._id.toString());

  const reviewedTours = [];
  const notReviewedTours = [];

  for (const tourId of bookingsTourIds) {
    const tour = await Tour.findById(tourId).select("title slug");

    if (reviewedTourIds.includes(tourId)) {
      const review = reviews.find((r) => r.tour.toString() === tourId);

      reviewedTours.push({
        tour,
        review,
      });
    } else {
      notReviewedTours.push(tour);
    }
  }

  res.status(200).json({
    isSuccess: true,
    data: { reviewedTours, notReviewedTours },
  });
});
