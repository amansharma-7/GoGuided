const Booking = require("../models/bookingModel");
const Tour = require("../models/tourModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const razorpay = require("../config/razorpay");

exports.getUserBookings = catchAsync(async (req, res, next) => {
  const { userId } = req.user;

  const bookings = await Booking.find({ user: userId }).populate({
    path: "tour",
    select: "title startDate endDate",
    populate: {
      path: "guides",
      select: "firstName lastName",
    },
    options: { sort: { createdAt: -1 } },
  });

  const formattedBookings = bookings.map((booking) => {
    const tour = booking.tour ?? {};
    const guides = Array.isArray(tour.guides)
      ? tour.guides.map((g) => `${g.firstName} ${g.lastName}`)
      : [];

    // Calculate tripStatus
    const today = new Date();
    const start = new Date(tour.startDate);
    const end = new Date(tour.endDate);
    let tripStatus = "upcoming";
    if (today > end) tripStatus = "completed";
    else if (today >= start && today <= end) tripStatus = "ongoing";

    return {
      id: booking._id,
      status: booking.status,
      tripStatus,
      createdAt: booking.createdAt,
      tour: {
        _id: tour._id,
        title: tour.title,
        startDate: tour.startDate,
        endDate: tour.endDate,
        guides,
      },
    };
  });

  res.status(200).json({
    isSuccess: true,
    results: formattedBookings.length,
    data: formattedBookings,
  });
});

exports.cancelBooking = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const booking = await Booking.findById(id);
  if (!booking) {
    return next(new AppError("Booking not found", 404));
  }

  // Prevent double cancellation
  if (booking.status === "cancelled") {
    return next(new AppError("Booking already cancelled", 400));
  }

  // Optional: Check if booking is refundable based on tour start date
  const tourStart = new Date(booking.tourStartDate); // assuming you store this
  if (new Date() >= tourStart) {
    return next(new AppError("Tour has already started, cannot cancel.", 400));
  }

  // Refund payment if applicable
  if (booking.paymentId) {
    try {
      await razorpay.payments.refund(booking.paymentId);
    } catch (err) {
      return next(new AppError("Refund failed. Please try again later.", 502));
    }
  }

  // Mark booking as cancelled
  booking.status = "cancelled";
  await booking.save();

  res.status(200).json({
    isSuccess: true,
    message: "Booking cancelled and payment refunded successfully.",
  });
});
