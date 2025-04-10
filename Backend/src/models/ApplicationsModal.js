import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  resumeUrl: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Applied", "Reviewed", "Interview", "Rejected", "Accepted"],
    default: "Applied",
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("JobApplication", jobApplicationSchema);
