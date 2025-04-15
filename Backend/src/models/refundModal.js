const mongoose = require("mongoose");

const refundSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: [0, "Refund amount cannot be negative"],
  },
  reason: {
    type: String,
    trim: true,
    maxlength: 500,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "processed"],
    default: "pending",
  },
  processedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Refund = mongoose.model("Refund", refundSchema);

module.exports = Refund;
