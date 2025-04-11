const mongoose = require("mongoose");

const guideSchema = new mongoose.Schema(
  {
    experience: {
      type: Number,
      default: 0,
      min: 0,
    },
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],

    // New Fields
    numberOfTours: {
      type: Number,
      default: 0,
    },
    lastTour: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended"],
      default: "Active",
    },
  },
  { timestamps: true }
);

// Index for better search
guideSchema.index({ name: "text", role: "text" });

module.exports = mongoose.model("Guide", guideSchema);
