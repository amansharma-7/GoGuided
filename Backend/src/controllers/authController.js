// Core

// Models
const User = require("../models/userModel");

// Utilities
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { sendRegistrationOtpEmail } = require("../utils/email");
const { generateOTP } = require("../utils/otp");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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

const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password +isDeleted");

  if (!user) {
    return next(new AppError("Incorrect email or password", 401));
  }

  if (user.isDeleted) {
    return next(
      new AppError("Account is marked as deleted. Please contact support.", 403)
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = signToken(user._id);

  user.loginToken = token;
  await user.save();

  user.password = undefined;

  res.status(200).json({
    status: true,
    message: "Logged in successfully",
    token,
    user,
  });
});
