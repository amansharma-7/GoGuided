const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tourId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour", // The specific tour package being booked
      required: true,
    },
    tourGuides: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    travelDate: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      enum: ["USD", "INR", "EUR", "GBP"],
      default: "INR",
    },

    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
    cancellationReason: {
      reason: { type: String, default: "" },
      canceller: {
        type: String,
        enum: ["customer", "admin", "guide"],
        required: true,
        default: "customer",
      },
    },
    travelerDetails: [
      {
        fullName: { type: String, required: true, trim: true },
        age: { type: Number, min: 0 },
        gender: {
          type: String,
          enum: ["male", "female", "other"],
          required: false,
        },
      },
    ],
    contactDetails: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
