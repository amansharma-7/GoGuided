// Core
const jwt = require("jsonwebtoken");

// Models
const User = require("../models/userModel");
const OTP = require("../models/otpModel");

// Utilities
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { sendRegistrationOtpEmail } = require("../utils/email");
const { generateOTP } = require("../utils/otp");

//send otp
exports.sendOTP = catchAsync(async (req, res) => {
  const { email } = req.body;

  // check if user already exists
  const isExistingUser = await User.findOne({ email });
  if (isExistingUser) {
    return res.status(400).json({
      success: false,
      message: "User Already Exists",
    });
  }

  const otp = generateOTP();
  await OTP.create({ email, otp });

  // send the OTP email
  const { isEmailSent, message: emailErrorMessage } =
    await sendRegistrationOtpEmail({
      user: { email },
      otp,
    });

  if (!isEmailSent) {
    return next(new AppError(emailErrorMessage, 500));
  }

  res.status(200).json({
    success: true,
    message: "OTP Sent Successfully",
  });
});

// Signup
exports.signup = catchAsync(async (req, res) => {
  const { firstName, lastName, email, password, phone, otp } = req.body;

  // check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User Already Exists",
    });
  }

  // find latest OTP
  const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
  if (recentOtp.length === 0) {
    return res.status(400).json({
      success: false,
      message: "OTP not found",
    });
  }
  if (otp !== recentOtp[0].otp) {
    return res.status(400).json({
      success: false,
      message: "Invalid OTP",
    });
  }

  const now = new Date();
  const expirationTime = new Date(recentOtp.createdAt);
  expirationTime.setMinutes(expirationTime.getMinutes() + 1);

  if (now > expirationTime) {
    await OTP.deleteOne({ _id: otpRecord._id });
    return res.status(400).json({
      success: false,
      message: "Your OTP has expired. Please request a new one to continue.",
    });
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
  });

  // Delete all OTPs for this email (cleanup)
  await OTP.deleteMany({ email });

  res.status(200).json({
    success: true,
    message: "User Registered Successfully",
    data: user,
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
    isSuccess: true,
    message: "OTP resent successfully",
  });
});

const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendTokenAsCookie = (user, token, res) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };

  res.cookie("token", token, cookieOptions);

  // Remove sensitive data before sending response
  user.password = undefined;

  res.status(200).json({
    isSuccess: true,
    message: "Logged in successfully",
    user: {
      name: `${user.firstName} ${user.lastName}`.trim(),
      email: user.email,
      role: user.role,
    },
  });
};

// Login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. Check if user exists
  const user = await User.findOne({ email }).select("+password +isDeleted");

  if (!user) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 2. Check if account is deleted
  if (user.isDeleted) {
    return next(
      new AppError("Account is marked as deleted. Please contact support.", 403)
    );
  }

  // 3. Validate password
  const isValid = await user.isPasswordValid(password, user.password);
  if (!isValid) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 4. Check if email is verified
  if (!user.isEmailVerified) {
    return next(
      new AppError("Email not verified. Please verify your email first.", 401)
    );
  }

  // 5. Generate token
  const token = signToken(user._id);

  // 6. Send token in cookie
  sendTokenAsCookie(user, token, res);
});

// Get current logged-in user's data
exports.getMe = catchAsync(async (req, res, next) => {
  const { userId } = req.user;

  const user = await User.findById(userId);

  if (!user) {
    return next(
      new AppError(
        "Unable to retrieve user information. Please log in again.",
        404
      )
    );
  }

  res.status(200).json({
    isSuccess: true,
    user: {
      name: `${user.firstName} ${user.lastName}`.trim(),
      email: user.email,
      role: user.role,
    },
  });
});
