const bcrypt = require("bcryptjs");
const ms = require("ms");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/userModel");
const Account = require("../models/accountModel");
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

  const user = await User.create({ name });

  const account = await Account.create({
    name,
    email,
    phone,
    password,
    role,
    user: user._id,
  });

  const { verificationToken, hashedToken } = generateVerificationToken();

  account.emailVerificationToken = hashedToken;
  account.emailVerificationTokenExpires = Date.now() + 30 * 60 * 1000; // 30 minutes

  await account.save({ validateBeforeSave: false });

  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;

  // Send verification email
  const emailResponse = await new Email(
    account,
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
  const account = await Account.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationTokenExpires: { $gt: Date.now() },
  });

  if (!account) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  // Mark user as verified
  account.isEmailVerified = true;
  account.emailVerificationToken = undefined;
  account.emailVerificationTokenExpires = undefined;
  await account.save({ validateBeforeSave: false });

  createAndSendToken(account, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password.", 400));
  }

  // 2. Check if account exists && password is correct
  const account = await Account.findOne({ email }).select("+password");

  if (!account || !(await bcrypt.compare(password, account.password))) {
    return next(new AppError("Incorrect email or password.", 400));
  }

  // 3. Check if email is verified
  if (!account.isEmailVerified) {
    // If token expired or not generated, generate a new one and send email
    if (
      !account.emailVerificationToken ||
      account.emailVerificationTokenExpires < Date.now()
    ) {
      const { verificationToken, hashedToken } =
        generateVerificationToken(account);

      account.emailVerificationToken = hashedToken;
      account.emailVerificationTokenExpires = Date.now() + 30 * 60 * 1000; // 30 minutes expiry

      await account.save({ validateBeforeSave: false });

      const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
      await new Email(account, verificationUrl).sendVerification();

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
  account.lastLoggedIn = new Date();
  await account.save();

  createAndSendToken(account, req, res);
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const account = await Account.findOne({ email });
  if (!account) {
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

  account.resetPasswordToken = hashedToken;
  account.resetPasswordTokenExpires = Date.now() + 30 * 60 * 1000; // 15 minutes
  await account.save();

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  await new Email(account, resetUrl).sendPasswordReset();

  return res.status(200).json({
    success: true,
    message: "Password reset link sent to your email.",
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  const token = req.query && req.query.token;

  // Validate input presence
  if (!password || !confirmPassword) {
    return next(
      new AppError("Both password and confirm password are required.", 400)
    );
  }

  // Validate password match
  if (password !== confirmPassword) {
    return next(new AppError("Passwords do not match.", 400));
  }

  // Optional: Validate password strength (recommended)
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return next(
      new AppError(
        "Password must be at least 8 characters long and contain at least one letter and one number.",
        400
      )
    );
  }

  // Hash the token (since it's stored hashed in DB)
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  // Find user by token and expiry
  const account = await Account.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordTokenExpires: { $gt: Date.now() },
  });

  if (!account) {
    return next(new AppError("Invalid or expired token.", 400));
  }

  account.password = password;

  // Clear reset token fields
  account.resetPasswordToken = undefined;
  account.resetPasswordTokenExpires = undefined;

  await account.save();

  return res.status(200).json({
    success: true,
    message: "Password has been reset successfully.",
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  // Validate input presence
  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return res.status(400).json({
      success: false,
      message:
        "All fields (current, new, and confirm new password) are required.",
    });
  }

  // Validate new password and confirm new password match
  if (newPassword !== confirmNewPassword) {
    return res.status(400).json({
      success: false,
      message: "New password and confirm password do not match.",
    });
  }

  // Optional: Validate password strength (recommended)
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
  if (!passwordRegex.test(newPassword)) {
    return res.status(400).json({
      success: false,
      message:
        "Password must be at least 8 characters long and contain at least one letter and one number.",
    });
  }

  // Get the user from the request (you should already have this from auth middleware)
  const account = await Account.findById(req.user.id).select("+password");

  if (!account) {
    return res.status(404).json({
      success: false,
      message: "User not found.",
    });
  }

  // Check if current password is correct
  const isMatch = await bcrypt.compare(currentPassword, account.password);

  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Current password is incorrect.",
    });
  }

  // Check if new password is different from current password
  const isSamePassword = await bcrypt.compare(newPassword, account.password);

  if (isSamePassword) {
    return res.status(400).json({
      success: false,
      message: "New password must be different from the current password.",
    });
  }

  account.password = newPassword;

  await account.save();

  return res.status(200).json({
    success: true,
    message: "Password updated successfully.",
  });
});

exports.uploadProfilePicture = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError("No file uploaded.", 400));
  }

  const userId = req.user.id;

  // Step 1: Check if user exists BEFORE uploading
  const user = await Account.findById(userId);

  if (!user) {
    return next(new AppError("User not found.", 404));
  }

  if (user.profilePicturePublicId) {
    await cloudinary.uploader.destroy(user.profilePicturePublicId);
  }

  // Step 2: Upload new image with optional fixed public_id
  const result = await uploadProfilePicture(req.file.buffer, userId);

  // Step 3: Save new info to user
  user.profilePicture = {
    public_id: result.public_id,
    secure_url: result.secure_url,
  };
  await user.save();

  res.status(200).json({
    status: "success",
    message: "Profile picture uploaded successfully.",
    profilePicture: user.profilePicture,
  });
});

exports.deleteAccount = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const account = await Account.findById(userId);

  if (!account) {
    return next(new AppError("User not found.", 404));
  }

  await Promise.all([
    User.findByIdAndDelete(account.user),
    Account.findByIdAndDelete(account._id),
  ]);

  res.status(200).json({
    status: "success",
    message: "Account successfully deleted.",
  });
});
