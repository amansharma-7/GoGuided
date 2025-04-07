const mongoose = require("mongoose");

const guideSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: "", // fallback in case image is not provided
    },

    languages: {
      type: [String],
      default: ["English"],
    },
    experience: {
      type: Number,
      default: 0, // experience in years
      min: 0,
    },
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

// Index for better search
guideSchema.index({ name: "text", role: "text" });

module.exports = mongoose.model("Guide", guideSchema);
