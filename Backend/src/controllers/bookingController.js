const Booking = require("../models/bookingModel");
const Tour = require("../models/tourModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createBooking = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  const { userId } = req.user;

  const tour = await Tour.findOne({ slug });

  if (!tour) return next(new AppError("Tour not found", 404));

  const booking = await Booking.create({
    user: userId,
    tour: tour._id,
    status: req.body.status || "confirmed",
  });

  const user = await User.findById(userId);
  user.bookings.push(tour._id);
  await user.save();

  res.status(201).json({
    isSuccess: true,
    data: {
      booking,
    },
  });
});
