const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, min: 1, max: 5, required: true },
  reviewText: { type: String, required: false },
  reviewer: { type: String, required: true },
  date: { type: Date, default: Date.now },
  tour: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
