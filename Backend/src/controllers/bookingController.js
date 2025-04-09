const Tour = require("../models/Tour");
const Booking = require("../models/Booking");

exports.bookTour = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { tourId } = req.body;
    const userId = req.user._id; // assume user is authenticated

    const tour = await Tour.findById(tourId).session(session);
    if (!tour) throw new Error("Tour not found.");

    if (tour.isBookingClosed)
      throw new Error("Booking is closed for this tour.");
    if (tour.bookings >= tour.participants) throw new Error("No slots left.");

    // Create booking
    await Booking.create(
      [
        {
          user: userId,
          tour: tour._id,
          paymentStatus: "paid", // assume payment succeeded
          seats: 1,
        },
      ],
      { session }
    );

    // Update tour bookings count
    tour.bookings += 1;
    await tour.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "Tour booked successfully.",
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
