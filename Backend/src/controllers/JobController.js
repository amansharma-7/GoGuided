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
  } = req.body;

  const salary = {
    min: Number(req.body["salary.min"]),
    max: Number(req.body["salary.max"]),
  };
  // Manual validation for required fields
  if (
    !title ||
    !description ||
    !location ||
    !type ||
    !level ||
    !salary.min ||
    !salary.max ||
    !lastDateToApply ||
    !numberOfPosts
  ) {
    return next(new AppError("All fields are required", 400));
  }

  // Validate job type and level
  const validTypes = ["Full-time", "Part-time", "Internship", "Contract"];
  const validLevels = ["Easy", "Medium", "High"];

  if (!validTypes.includes(type)) {
    return next(new AppError("Invalid job type", 400));
  }

  if (!validLevels.includes(level)) {
    return next(new AppError("Invalid job level", 400));
  }

  // Salary validation
  if (salary.min < 0 || salary.max < 0 || salary.min > salary.max) {
    return next(new AppError("Invalid salary range", 400));
  }

  if (numberOfPosts < 1) {
    return next(new AppError("Number of posts must be at least 1", 400));
  }

  // Create job

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

//update jobs
exports.editJob = catchAsync(async (req, res, next) => {
  const { jobId } = req.query;

  // Basic validation
  const {
    title,
    description,
    location,
    type,
    level,
    lastDateToApply,
    numberOfPosts,
  } = req.body;

  const salary = {
    min: Number(req.body["salary.min"]),
    max: Number(req.body["salary.max"]),
  };
  if (
    !title ||
    !description ||
    !location ||
    !type ||
    !level ||
    !salary?.min ||
    !salary?.max ||
    !lastDateToApply ||
    !numberOfPosts
  ) {
    return next(new AppError("All fields are required", 400));
  }

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

  // Update the job
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
