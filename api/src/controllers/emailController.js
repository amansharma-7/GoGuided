const catchAsync = require("../../utils/catchAsync");
const Email = require("../../utils/email");
const AppError = require("../../utils/appError");

exports.sendEmail = catchAsync(async (req, res, next) => {
  const { name, email, subject, message } = req.body;

  const response = await new Email({ name, email }).sendNotification(
    subject,
    message
  );

  if (!response.success) return next(new AppError("Failed to send email", 500));

  return res.status(200).json({
    success: true,
    message: "Email sent successfully.",
  });
});
