const mongoose = require("mongoose");
const slugify = require("slugify");
const Review = require("./reviewModel");

const tourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    location: { type: String, required: true },
    tourSpots: [
      {
        day: {
          type: Number,
          required: true,
          min: 1,
        },
        lat: {
          type: Number,
          required: true,
          min: -90,
          max: 90,
        },
        lng: {
          type: Number,
          required: true,
          min: -180,
          max: 180,
        },
        desc: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    duration: { type: String, required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
    participants: { type: Number, required: true },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    languages: [{ type: String, required: true }],
    startDate: { type: Date, required: true },
    overview: { type: String, required: true },
    highlights: [{ type: String, required: true }],
    included: [{ type: String, required: true }],
    guides: [{ type: mongoose.Schema.Types.ObjectId, ref: "Guide" }],
    thumbnail: {
      type: String,
      required: [true, "A tour must have a thumbnail image"],
    },

    images: {
      type: [{ type: String }],
      validate: {
        validator: function (val) {
          return Array.isArray(val) && val.length > 0;
        },
        message: "At least one tour image is required",
      },
      required: true,
    },

    price: { type: Number, required: true },
    currency: { type: String, default: "INR" },
  },
  { timestamps: true }
);

// Indexes
tourSchema.index({ title: "text", location: "text" });

// Virtuals
tourSchema.virtual("isBookingClosed").get(function () {
  const currentDate = new Date();
  return currentDate >= this.date;
});

tourSchema.virtual("slotsLeft").get(function () {
  return this.participants - this.bookings.length;
});

tourSchema.virtual("averageRating").get(async function () {
  if (this.reviews.length === 0) return 0; // No reviews, return 0

  const reviews = await Review.find({ _id: { $in: this.reviews } });
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  return totalRating / reviews.length;
});

// Ensure virtuals are serialised
tourSchema.set("toObject", { virtuals: true });
tourSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Tour", tourSchema);
