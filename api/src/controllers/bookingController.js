const Booking = require("../models/bookingModel");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const Tour = require("../models/tourModel");
const User = require("../models/userModel");

const razorpay = require("razorpay");

exports.createBooking = catchAsync(async (req, res) => {
  const {
    userId,
    tourId,
    bookingStatus,
    totalPrice,
    currency,
    paymentId,
    travelerDetails,
  } = req.body;

  const tour = await Tour.findById(tourId)
    .populate("bookings")
    .select("startDate participants bookings");

  if (!tour) {
    return res.status(404).json({
      success: false,
      message: "Tour not found",
    });
  }

  const user = await User.findById(userId).select("name email phone bookings");
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const existingBooking = await Booking.findOne({
    userId,
    tourId,
    travelDate: tour.startDate,
  });

  if (existingBooking) {
    return res.status(400).json({
      success: false,
      message: "You have already booked this tour for the current date.",
    });
  }

  if (tour.bookings.length >= tour.participants) {
    return res.status(400).json({
      success: false,
      message: "No slots available for this tour.",
    });
  }

  const newBooking = new Booking({
    userId,
    tourId,
    bookingStatus,
    travelDate: tour.startDate,
    totalPrice,
    currency,
    paymentId,
    travelerDetails,
    contactDetails: {
      name: user.name,
      phone: user.phone,
      email: user.email,
    },
  });

  await newBooking.save();

  user.bookings.push(newBooking._id);
  await user.save();

  tour.bookings.push(newBooking._id);
  await tour.save();

  res.status(201).json({
    success: true,
    message: "Booking confirmed — we look forward to having you on the tour.",
  });
});

exports.getAllBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find().populate("userId tourId tourGuides");

  res.status(200).json({
    success: true,
    bookings,
  });
});

exports.getBookingById = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.bookingId)
    .populate("userId tourId tourGuides")
    .exec();

  if (!booking) {
    return next(new AppError("Booking not found", 404));
  }

  res.status(200).json({
    success: true,
    booking,
  });
});

exports.cancelBooking = catchAsync(async (req, res, next) => {
  const { bookingId } = req.params;
  const { cancellationReason } = req.body;

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    return next(new AppError("Booking not found", 404));
  }

  if (booking.bookingStatus === "Cancelled") {
    return next(new AppError("Booking is already cancelled", 400));
  }

  if (
    !cancellationReason ||
    !cancellationReason.reason ||
    !cancellationReason.canceller
  ) {
    return next(
      new AppError("Cancellation reason and canceller are required", 400)
    );
  }

  // Refund logic
  let refundDetails = null;

  if (booking.paymentId) {
    try {
      //   const refund = await razorpay.payments.refund(booking.paymentId, {
      //     amount: booking.totalPrice * 100, // Razorpay works in paisa
      //     speed: "optimum",
      //   });
      //   refundDetails = {
      //     refundId: refund.id,
      //     status: refund.status,
      //     amount: refund.amount / 100,
      //     speed: refund.speed_requested,
      //   };
    } catch (err) {
      return next(new AppError("Refund failed: " + err.message, 500));
    }
  }

  booking.bookingStatus = "cancelled";
  booking.cancellationReason = cancellationReason;
  await booking.save();

  res.status(200).json({
    success: true,
    message: "Booking cancelled and refund initiated successfully",
  });
});
