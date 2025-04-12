const JobApplication = require("../models/applicationsModal");
const User = require("../models/userModel");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const bcrypt = require("bcryptjs");
const { uploadResume } = require("../../utils/cloudinary");
const Email = require("../../utils/email");

exports.submitJobApplication = catchAsync(async (req, res, next) => {
  const { name, email, phone, linkedin, portfolio, experience } = req.body;
  const { jobId } = req.query;

  // Check if the user has already applied for this job
  const existingApplication = await JobApplication.findOne({ jobId, email });
  if (existingApplication) {
    return next(new AppError("You have already applied to this job.", 400));
  }

  const result = await uploadResume(
    req.files.resume[0].buffer,
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
    resume: {
      public_id: result.public_id,
      secure_url: result.secure_url,
    },
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

  if (!application) {
    return next(new AppError("Application not found", 404));
  }

  if (application.status === "Approved") {
    return next(new AppError("Application already approved", 400));
  }

  const user = await User.findOne({ email: application.email });

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  user.role = "guide";

  await user.save();

  // 3. Update application status
  application.status = "Approved";
  await application.save();

  //email send
  const loginUrl = `${process.env.FRONTEND_URL}/login`;
  const emailResponse = await new Email(user, loginUrl).sendGuideApprovalMail();

  if (!emailResponse.success) {
    return next(
      new AppError("There was an issue sending the verification email.", 500)
    );
  }

  res.status(200).json({
    status: "success",
    message: "Application approved",
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
  });
});

exports.getApplicationDetail = catchAsync(async (req, res, next) => {
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

  const formattedApplications = applications.map((app) => ({
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
    results: formattedApplications.length,
    data: formattedApplications,
  });
});
