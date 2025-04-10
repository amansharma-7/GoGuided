const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Full-time", "Part-time", "Internship", "Contract"],
    required: true,
  },
  level: {
    type: String,
    enum: ["Easy", "Medium", "High"],
    required: true,
  },
  salary: {
    min: {
      type: Number,
      required: true,
      min: 0,
    },
    max: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  lastDateToApply: {
    type: Date,
    required: true,
  },
  numberOfPosts: {
    type: Number,
    required: true,
    min: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// export default mongoose.model("Job", jobSchema);
const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
