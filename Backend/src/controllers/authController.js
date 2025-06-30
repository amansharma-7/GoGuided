// Core

// Models
const User = require("../models/userModel");

// Utilities
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { sendRegistrationOtpEmail } = require("../utils/email");
const { generateOTP } = require("../utils/otp");

// Controllers

//  Register new user
exports.register = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, phone, password } = req.body;

  const existingUser = await User.findOne({ email }).select("+isDeleted");

  if (existingUser) {
    if (existingUser.isDeleted) {
      return next(
        new AppError(
          "Account exists but is marked deleted. Please contact support.",
          400
        )
      );
    }
    return next(new AppError("User already exists with this email.", 400));
  }

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
  });

  // Generate OTP
  const otp = generateOTP();
  newUser.emailVerificationOTP = otp;
  newUser.emailVerificationOTPExpires =
    Date.now() + process.env.OTP_EXPIRES_IN_MINUTES * 60 * 1000;

  await newUser.save({ validateBeforeSave: false });

  const { isEmailSent, message: emailErrorMessage } =
    await sendRegistrationOtpEmail({
      user: { email: newUser.email, firstName: newUser.firstName },
      otp,
    });

  if (!isEmailSent) {
    // Rollback if email fails
    await User.findByIdAndDelete(newUser._id);

    return next(new AppError(emailErrorMessage, 500));
  }

  res.status(201).json({
    isSuccess: true,
    message: "OTP sent to email. Please verify to complete registration.",
  });
});

// Verify email
exports.verifyEmail = catchAsync(async (req, res, next) => {
  const { email, otp } = req.body;

  // 1. Check if user exists
  const user = await User.findOne({ email }).select(
    "+emailVerificationOTP +emailVerificationOTPExpires"
  );

  if (!user) {
    return next(new AppError("No account found with this email", 404));
  }

  // 2. Check if already verified
  if (user.isEmailVerified) {
    return next(new AppError("Email is already verified", 400));
  }

  // 3. Check OTP
  if (
    !user.emailVerificationOTP ||
    user.emailVerificationOTP !== otp ||
    user.emailVerificationOTPExpires < Date.now()
  ) {
    return next(
      new AppError(
        "The OTP you entered is invalid or has expired. Please request a new OTP to proceed.",
        400
      )
    );
  }

  // 4. Mark as verified and clear OTP fields
  user.isEmailVerified = true;
  user.emailVerificationOTP = undefined;
  user.emailVerificationOTPExpires = undefined;
  await user.save({ validateBeforeSave: false });

  // 5. Respond
  res.status(200).json({
    isSuccess: true,
    message: "Email has been successfully verified",
  });
});

// resend OTP
exports.resendOTP = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  // select all needed fields
  const user = await User.findOne({ email }).select(
    "emailVerificationOTP emailVerificationOTPExpires firstName email"
  );

  if (!user) {
    return next(new AppError("No user found with this email", 404));
  }

  // Generate new OTP
  const otp = generateOTP();
  user.emailVerificationOTP = otp;
  user.emailVerificationOTPExpires =
    Date.now() + Number(process.env.OTP_EXPIRES_IN_MINUTES) * 60 * 1000;

  // Save user
  await user.save();

  // Send email
  const { isEmailSent, message: emailErrorMessage } =
    await sendRegistrationOtpEmail({
      user: { email: user.email, firstName: user.firstName },
      otp,
    });

  if (!isEmailSent) {
    return next(new AppError(emailErrorMessage, 500));
  }

  res.status(200).json({
    status: "success",
    message: "OTP resent successfully",
  });
});
