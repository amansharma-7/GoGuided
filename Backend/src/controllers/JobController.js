const Job = require("../models/jobModel");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");

exports.createJob = catchAsync(async (req, res, next) => {
  const {
    title,
    description,
    location,
    type,
    level,
    lastDateToApply,
    numberOfPosts,
    salary,
  } = req.body;

  const newJob = await Job.create({
    title,
    description,
    location,
    type,
    level,
    salary,
    lastDateToApply,
    numberOfPosts,
    createdAt: new Date(),
  });

  res.status(201).json({
    status: "success",
    data: newJob,
  });
});

// get all jobs
exports.getAllJobs = catchAsync(async (req, res, next) => {
  const jobs = await Job.find().sort({ createdAt: -1 }); // newest first
  res.status(200).json({
    status: "success",
    results: jobs.length,
    data: jobs,
  });
});

// Get job by ID
exports.getJobById = catchAsync(async (req, res, next) => {
  const { jobId } = req.query;
  const job = await Job.findById(jobId);
  if (!job) {
    return next(new AppError("Job not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: job,
  });
});

exports.editJob = catchAsync(async (req, res, next) => {
  const { jobId } = req.query;

  const {
    title,
    description,
    location,
    type,
    level,
    lastDateToApply,
    numberOfPosts,
    salary,
  } = req.body;

  // Find the job
  const job = await Job.findById(jobId);
  if (!job) {
    return next(new AppError("Job not found", 404));
  }

  const updateData = {
    title,
    description,
    location,
    type,
    level,
    lastDateToApply,
    numberOfPosts,
    salary,
  };

  const updatedJob = await Job.findByIdAndUpdate(jobId, updateData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: updatedJob,
  });
});

// Delete job
exports.deleteJob = catchAsync(async (req, res, next) => {
  const { jobId } = req.query;
  const job = await Job.findByIdAndDelete(jobId);
  if (!job) {
    return next(new AppError("Job not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Job deleted successfully",
  });
});
