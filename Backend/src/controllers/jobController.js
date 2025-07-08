const Job = require("../models/jobModel");
const catchAsync = require("../utils/catchAsync");

exports.createJob = catchAsync(async (req, res, next) => {
  const {
    title,
    description,
    location,
    lastDateToApply,
    numberOfPosts,
    salary,
  } = req.body;

  await Job.create({
    title,
    description,
    location,
    salary,
    lastDateToApply,
    numberOfPosts,
    createdAt: new Date(),
  });

  return res.status(201).json({
    isSuccess: true,
    message: "Job created successfully.",
  });
});

exports.getAllJobs = catchAsync(async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });

  return res.status(200).json({
    isSuccess: true,
    data: jobs,
  });
});
