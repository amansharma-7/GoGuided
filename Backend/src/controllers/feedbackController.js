const Feedback = require("../models/feedbackModal");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const Email = require("../../utils/email");

exports.submitFeedback = catchAsync(async (req, res) => {
  const { firstName, lastName, email, subject, message } = req.body;

  const name = `${firstName.trim()} ${lastName.trim()}`;

  await Feedback.create({
    name,
    email,
    subject,
    message,
  });

  res.status(201).json({
    status: "success",
    message: "Feedback submitted successfully.",
  });
});

exports.resolveFeedback = catchAsync(async (req, res, next) => {
  const { feedbackId } = req.query;
  const { responseMessage } = req.body;

  if (!responseMessage) {
    return next(new AppError("Response message is required", 400));
  }

  const feedback = await Feedback.findById(feedbackId);

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
