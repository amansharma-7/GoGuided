const Job = require("../models/jobModel");
const AppError = require("../../utils/appError");
const slugify = require("slugify");

exports.createJob = async (req, res, next) => {
  try {
    // console.log(req);
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

    // Generate slug
    const slug = slugify(title, { lower: true, strict: true });

    // Check for existing job
    const existingJob = await Job.findOne({ slug, location });
    if (existingJob) {
      return next(
        new AppError(
          "A job with this title already exists at this location.",
          400
        )
      );
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
      slug,
      createdAt: new Date(),
    });

    res.status(201).json({
      status: "success",
      data: newJob,
    });
  } catch (error) {
    next(error);
  }
};

// get all jobs
exports.getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json({
      status: "success",
      results: jobs.length,
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

// Get job by ID
exports.getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return next(new AppError("Job not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

//update jobs
exports.updateJob = async (req, res, next) => {
  try {
    const jobId = req.params.id;
    const updateData = req.body;

    // Basic validation
    const {
      title,
      description,
      location,
      type,
      level,
      salary,
      lastDateToApply,
      numberOfPosts,
    } = updateData;

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

    // If title is updated, regenerate slug and check for duplicates
    if (title && title !== job.title) {
      const slug = slugify(title, { lower: true, strict: true });
      const existingJob = await Job.findOne({ slug });
      if (existingJob && existingJob._id.toString() !== jobId) {
        return next(new AppError("A job with this title already exists", 400));
      }
      updateData.slug = slug;
    }

    // Update the job
    const updatedJob = await Job.findByIdAndUpdate(jobId, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: updatedJob,
    });
  } catch (error) {
    next(error);
  }
};

// Delete job
exports.deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return next(new AppError("Job not found", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Job deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
