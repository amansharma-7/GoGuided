const Booking = require("../models/bookingModel");
const Tour = require("../models/tourModel");
const Review = require("../models/reviewModel");
const User = require("../models/userModel");
const Feedback = require("../models/feedbackModal");
const Payment = require("../models/paymentModal");
const Job = require("../models/jobModel");
const Refund = require("../models/refundModal");
const catchAsync = require("../../utils/catchAsync");

exports.getDashboardStats = catchAsync(async (req, res) => {
  const [
    bookings,
    tours,
    reviews,
    users,
    feedbacks,
    payments,
    guides,
    jobs,
    refunds,
    admins,
  ] = await Promise.all([
    Booking.countDocuments(),
    Tour.countDocuments(),
    Review.countDocuments(),
    User.find({ role: "user" }).countDocuments(),
    Feedback.countDocuments(),
    Payment.countDocuments(),
    User.find({ role: "guide" }).countDocuments(),
    Job.countDocuments(),
    Refund.countDocuments(),
    User.find({ role: "admin" }).countDocuments(),
  ]);

  res.status(200).json({
    success: true,
    data: {
      totalBookings: bookings,
      totalTours: tours,
      totalReviews: reviews,
      totalUsers: users,
      totalFeedbacks: feedbacks,
      totalPayments: payments,
      totalGuides: guides,
      totalJobs: jobs,
      totalRefunds: refunds,
      totalAdmins: admins,
    },
  });
});
