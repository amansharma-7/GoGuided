const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/userModel");
const Email = require("../../utils/email");
const AppError = require("../../utils/appError");
// Token generator function
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (user, req, res) => {
  const token = signToken(user._id);
  console.log(process.env.JWT_EXPIRES_IN.slice(0, -1));

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRES_IN.slice(0, -1) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  // Remove password from output
  user.password = undefined;

  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

const generateVerificationToken = (user) => {
  const verificationToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  user.emailVerificationToken = hashedToken;
  user.emailVerificationTokenExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  return verificationToken;
};

exports.signup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, role } =
      req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return next(new AppError("All fields are required.", 400));
    }

    if (password !== confirmPassword) {
      return next(
        new AppError("Password and confirm password do not match.", 400)
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError("Email already in use.", 400));
    }

    const fullName = `${firstName.trim()} ${lastName.trim()}`;
    const user = await User.create({
      name: fullName,
      email,
      password,
      role,
    });

    const verificationToken = generateVerificationToken(user);

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
      message: "Account created successfully. Please verify your email.",
    });
  } catch (error) {
    next(error);
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
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

    res
      .status(200)
      .json({ status: "success", message: "Email verified successfully!" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new AppError("Invalid email or password", 401));
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return next(new AppError("Invalid email or password", 401));
  }

  // Check if email is verified
  if (!user.isEmailVerified) {
    const verificationToken = generateVerificationToken(user);
    await user.save({ validateBeforeSave: false });

    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
    await new Email(user, verificationUrl).sendVerification();

    return next(
      new AppError(
        "Your email is not verified. A new verification link has been sent to your email.",
        403
      )
    );
  }

  createAndSendToken(user, req, res);
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({
        success: true,
        message:
          "If an account with that email exists, a password reset link has been sent.",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordTokenExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    new Email(user, resetUrl).sendPasswordReset();

    return res.status(200).json({
      success: true,
      resetToken,
      message: "Password reset link sent to your email.",
    });
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    // Validate input presence
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return next(
        new AppError(
          "All fields (current, new, and confirm new password) are required.",
          400
        )
      );
    }

    // Validate new password and confirm new password match
    if (newPassword !== confirmNewPassword) {
      return next(
        new AppError("New password and confirm password do not match.", 400)
      );
    }

    // Optional: Validate password strength (recommended)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return next(
        new AppError(
          "Password must be at least 8 characters long and contain at least one letter and one number.",
          400
        )
      );
    }

    // Get the user from the request (you should already have this from auth middleware)
    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
      return next(new AppError("User not found.", 404));
    }

    // Check if current password is correct
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return next(new AppError("Current password is incorrect.", 400));
    }

    // Check if new password is different from current password
    const isSamePassword = await bcrypt.compare(newPassword, user.password);

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
  } catch (err) {
    next(err);
  }
};
