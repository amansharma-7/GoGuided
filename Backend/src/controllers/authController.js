// Core

// Models
const User = require("../models/userModel");

// Utilities
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { sendRegistrationOtpEmail } = require("../utils/email");
const { generateOTP } = require("../utils/otp");

// Controller: Register new user
exports.register = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, phone, password } = req.body;

  // 1. Check if user already exists
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

  // 2. Create new user
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
  });

  // 3. Generate verification otp
  const otp = generateOTP();

  newUser.emailVerificationOTP = otp;
  newUser.emailVerificationOTPExpires =
    Date.now() + process.env.OTP_EXPIRES_IN_MINUTES * 60 * 1000;

  await newUser.save({ validateBeforeSave: false });

  // 4. Send email
  await sendRegistrationOtpEmail({
    user: { email: newUser.email, firstName: newUser.firstName },
    otp,
  });

  // 5. Respond to client
  res.status(201).json({
    status: "success",
    message: "OTP sent to email. Please verify to complete registration.",
  });
});
