const Feedback = require("../models/Feedback");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.submitFeedback = catchAsync(async (req, res, next) => {
  const { firstName, lastName, subject, message } = req.body;

  if (!firstName || !lastName || !subject || !message) {
    return next(new AppError("All fields are required", 400));
  }

  const feedback = await Feedback.create({
    firstName,
    lastName,
    subject,
    message,
  });

  res.status(201).json({
    status: "success",
    message: "Feedback submitted successfully.",
    data: feedback,
  });
});

exports.resolveFeedback = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  const { responseMessage } = req.body;

  if (!responseMessage) {
    return next(new AppError("Response message is required", 400));
  }

  const feedback = await Feedback.findById(id);

  if (!feedback) {
    return next(new AppError("Feedback not found", 404));
  }

  feedback.status = "resolved";
  await feedback.save();

  const emailResponse = await new Email(feedback).sendFeedbackResolution(
    responseMessage
  );

  if (!emailResponse.success) {
    return next(new AppError("Failed to send resolution email", 500));
  }

  res.status(200).json({
    status: "success",
    message: "Feedback resolved and user notified via email.",
    data: feedback,
  });
});
