const bcrypt = require("bcryptjs");
const ms = require("ms");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/userModel");
const Email = require("../../utils/email");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const cloudinary = require("cloudinary").v2;
const { uploadProfilePicture } = require("../../utils/cloudinary");

// Token generator function
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN, // already like "90d" or "1h"
  });
};

const createAndSendToken = (account, req, res) => {
  const token = signToken(account._id);

  res.cookie("jwt", token, {
    expires: new Date(Date.now() + ms(process.env.JWT_EXPIRES_IN)),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  // Remove password from output
  account.password = undefined;

  res.status(200).json({
    status: "success",
    token,
    data: {
      account,
    },
  });
};

const generateVerificationToken = () => {
  const verificationToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  return { verificationToken, hashedToken };
};

exports.signup = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password, phone, role } = req.body;

  const name = `${firstName.trim()} ${lastName.trim()}`;

  const user = await User.create({
    name,
    email,
    phone,
    password,
    role,
  });

  const { verificationToken, hashedToken } = generateVerificationToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationTokenExpires = Date.now() + 30 * 60 * 1000; // 30 minutes

  await user.save({ validateBeforeSave: false });

  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;

  // Send verification email
  const emailResponse = await new Email(
    user,
    verificationUrl
  ).sendVerification();

  if (!emailResponse.success) {
    return next(
      new AppError("There was an issue sending the verification email.", 500)
    );
  }

  res.status(201).json({
    status: "success",
    message: "Account created successfully.",
  });
});

exports.verifyEmail = catchAsync(async (req, res, next) => {
  const { token } = req.query;

  if (!token) {
    return next(new AppError("Token is missing", 400));
  }

  // Hash the token to compare with DB
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  // Find user by token and check expiry
  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  // Mark user as verified
  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationTokenExpires = undefined;
  await user.save({ validateBeforeSave: false });

  createAndSendToken(user, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password.", 400));
  }

  // 2. Check if account exists && password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password.", 400));
  }

  // 3. Check if email is verified
  if (!user.isEmailVerified) {
    // If token expired or not generated, generate a new one and send email
    if (
      !user.emailVerificationToken ||
      user.emailVerificationTokenExpires < Date.now()
    ) {
      const { verificationToken, hashedToken } =
        generateVerificationToken(user);

      user.emailVerificationToken = hashedToken;
      user.emailVerificationTokenExpires = Date.now() + 30 * 60 * 1000; // 30 minutes expiry

      await user.save({ validateBeforeSave: false });

      const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
      await new Email(user, verificationUrl).sendVerification();

      return next(
        new AppError(
          "Your verification link has expired. We've sent you a new one, please check your email.",
          400
        )
      );
    }

    return next(new AppError("Please verify your email to login.", 400));
  }

  // 4. If everything ok, update lastLoggedIn and send token to client
  user.lastLoggedIn = new Date();
  await user.save();

  createAndSendToken(user, req, res);
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(
      new AppError(
        "If an account with that email exists, a password reset link has been sent.",
        200
      )
    );
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordToken = hashedToken;
  user.resetPasswordTokenExpires = Date.now() + 30 * 60 * 1000; // 30 minutes
  await user.save();

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  await new Email(user, resetUrl).sendPasswordReset();

  return res.status(200).json({
    success: true,
    message: "Password reset link sent to your email.",
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { password } = req.body;
  const token = req.query && req.query.token;

  if (!token) {
    return next(new AppError("No token provided.", 400));
  }

  // Hash the token (since it's stored hashed in DB)
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  // Find user by token and expiry
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Invalid or expired token.", 400));
  }

  user.password = password;

  // Clear reset token fields
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpires = undefined;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password has been reset successfully.",
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id).select("+password");

  if (!user) {
    return next(new AppError("User not found.", 404));
  }

  const isMatch = await user.correctPassword(currentPassword, user.password);
  if (!isMatch) {
    return next(new AppError("Current password is incorrect.", 400));
  }

  const isSamePassword = await user.correctPassword(newPassword, user.password);
  if (isSamePassword) {
    return next(
      new AppError(
        "New password must be different from the current password.",
        400
      )
    );
  }

  user.password = newPassword;
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password updated successfully.",
  });
});

exports.updateProfile = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  // Step 1: Check if user exists BEFORE processing
  const user = await User.findById(userId);
  if (!user) {
    return next(new AppError("User not found.", 404));
  }

  let isModified = false;

  // Step 2: Handle profile picture upload (if any)
  if (req.file) {
    if (user.profilePicturePublicId) {
      await cloudinary.uploader.destroy(user.profilePicturePublicId);
    }

    const result = await uploadProfilePicture(req.file.buffer, userId);

    user.profilePicture = {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };

    isModified = true;
  }

  // Step 3: Handle name update (if any)
  if (req.body.name && req.body.name !== user.name) {
    user.name = req.body.name;
    isModified = true;
  }

  // Step 4: Save user only if there were changes
  if (isModified) {
    await user.save();
  }

  res.status(200).json({
    status: "success",
    message: "Profile updated successfully.",
    profilePicture: user.profilePicture,
    name: user.name,
  });
});

exports.deleteAccount = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const user = await User.findById(userId);

  if (!user) {
    return next(new AppError("User not found.", 404));
  }

  await User.findByIdAndDelete(user._id);

  res.status(200).json({
    status: "success",
    message: "Account successfully deleted.",
  });
});
