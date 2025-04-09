const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tour: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true },
    bookedAt: { type: Date, default: Date.now },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "cancelled"],
      default: "pending",
    },
    seats: { type: Number, default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
