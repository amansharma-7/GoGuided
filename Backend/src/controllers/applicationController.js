const JobApplication = require("../models/ApplicationsModal");
const Account = require("../models/accountModel");
const Guide = require("../models/guideModel");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const bcrypt = require("bcryptjs");

// For generating a default password
const generateRandomPassword = () =>
  Math.random().toString(36).slice(-8) + "@Guide";
const { uploadResume } = require("../../utils/cloudinary"); // Import your upload function

exports.submitJobApplication = catchAsync(async (req, res, next) => {
  const { name, email, phone, linkedin, portfolio, experience } = req.body;
  const { jobId } = req.query;
  if (
    !jobId ||
    !name ||
    !email ||
    !phone ||
    !experience ||
    !req.files?.resume
  ) {
    return next(new AppError("All fields are required", 400));
  }

  // Check if email is already registered as an account
  const existingUser = await Account.findOne({ email });
  if (existingUser) {
    return next(
      new AppError(
        "This email is already registered. Please use a different email address.",
        400
      )
    );
  }
  // Check if user has already applied using this email for the same job
  const existingApplication = await JobApplication.findOne({ jobId, email });
  if (existingApplication) {
    return next(
      new AppError(
        "You have already applied to this job using this email. Please use a different email.",
        400
      )
    );
  }

  const resumeFile = req.files.resume[0];
  // Upload resume to Cloudinary
  const cloudResume = await uploadResume(
    resumeFile.buffer,
    resumeFile.originalname
  );
  const newApplication = await JobApplication.create({
    jobId,
    name,
    email,
    phone,
    linkedin,
    portfolio,
    experience,
    resume: cloudResume.secure_url,
  });

  res.status(201).json({
    status: "success",
    message: "Application submitted successfully!",
    data: newApplication,
  });
});

exports.approveApplication = catchAsync(async (req, res, next) => {
  const { applicationId } = req.query;

  const application = await JobApplication.findById(applicationId).populate(
    "jobId"
  );
  // console.log(application);

  if (!application) {
    return next(new AppError("Application not found", 404));
  }

  if (application.status === "Approved") {
    return next(new AppError("Application already approved", 400));
  }

  // Generate a random password
  const defaultPassword = generateRandomPassword();
  const hashedPassword = await bcrypt.hash(defaultPassword, 12);

  // 1. Create Account
  const newGuide = await Guide.create({
    experience: application.experience,
  });

  // 2. Create Guide(future change)

  const newAccount = await Account.create({
    name: application.name,
    email: application.email,
    phone: application.phone,
    password: hashedPassword,
    role: "guide",
    guide: newGuide._id,
  });

  //email send pending

  // 3. Update application status
  application.status = "Approved";
  await application.save();

  res.status(200).json({
    status: "success",
    message: "Application approved and guide created",
    account: {
      email: newAccount.email,
      defaultPassword,
    },
    guide: newGuide,
  });
});

// Reject an application
exports.rejectApplication = catchAsync(async (req, res, next) => {
  const { applicationId } = req.query;

  const application = await JobApplication.findById(applicationId);
  if (!application) {
    return next(new AppError("Application not found", 404));
  }

  if (application.status === "rejected") {
    return next(new AppError("Application is already rejected", 400));
  }

  application.status = "rejected";
  await application.save();

  res.status(200).json({
    status: "success",
    message: "Application rejected successfully",
    data: application,
  });
});

exports.getApplicationDetails = catchAsync(async (req, res, next) => {
  const { applicationId } = req.query;

  const application = await JobApplication.findById(applicationId).populate(
    "jobId"
  );

  if (!application) {
    return next(new AppError("Application not found", 404));
  }

  const response = {
    id: application._id,
    name: application.fullName,
    email: application.email,
    number: application.phone,
    jobTitle: application.jobId?.title || "N/A",
    requestDate: application.submittedAt.toISOString().split("T")[0],
    resume: application.resume,
    status: application.status || "Pending",
  };

  res.status(200).json({
    status: "success",
    data: response,
  });
});

exports.getAllApplications = catchAsync(async (req, res, next) => {
  const applications = await JobApplication.find()
    .populate("jobId", "title") // Populate job title from Job model
    .sort({ submittedAt: -1 }); // Optional: newest first

  const formattedApps = applications.map((app) => ({
    id: app._id,
    name: app.fullName,
    email: app.email,
    number: app.phone,
    jobTitle: app.jobId?.title || "N/A",
    requestDate: app.submittedAt.toISOString().split("T")[0],
    resume: app.resume,
    status: app.status,
  }));

  res.status(200).json({
    status: "success",
    results: formattedApps.length,
    data: formattedApps,
  });
});
