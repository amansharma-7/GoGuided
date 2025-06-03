const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/userModel");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  let token = null;

  // Safely extract token from cookies or Authorization header
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.replace("Bearer ", "");
  }

  if (!token) {
    return next(new AppError("Unauthorized access. Token missing.", 401));
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return next(
      new AppError("Invalid or expired token. Please log in again.", 401)
    );
  }

  next();
});

exports.restrictToAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(
      new AppError("You do not have permission to perform this action", 403)
    );
  }
  next();
};

exports.validateSignup = [
  // Validation Rules
  body("firstName").trim().notEmpty().withMessage("First name is required."),

  body("lastName").trim().notEmpty().withMessage("Last name is required."),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please provide a valid email.")
    .custom(async (email) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("Email already in use.");
      }
      return true;
    }),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required.")
    .isMobilePhone("any", { strictMode: false })
    .withMessage("Please provide a valid phone number.")
    .custom(async (phone) => {
      const existingUser = await User.findOne({ phone });
      if (existingUser) {
        throw new Error("Phone number already in use.");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),

  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required.")
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error("Password and confirm password do not match.");
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        message: errors.array()[0].msg, // First error message
        errors: errors.array(), // Full error list (optional)
      });
    }
    next();
  },
];

exports.validateProfileUpdate = [
  // Validate and sanitize name (if provided)
  body("name")
    .optional()
    .trim()
    .customSanitizer((value) => {
      return value
        .split(/\s+/) // split by spaces
        .filter(Boolean) // remove empty
        .join(" "); // join back with single space
    })
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters.")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name can only contain letters and spaces."),

  // Middleware to catch validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }
    next();
  },
];

exports.validateUpdatePassword = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required."),

  body("newPassword")
    .notEmpty()
    .withMessage("New password is required.")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]+$/)
    .withMessage("Password must contain at least one letter and one number."),

  body("confirmNewPassword")
    .notEmpty()
    .withMessage("Confirm new password is required.")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("New password and confirm password do not match.");
      }
      return true;
    }),
];

exports.validateResetPassword = [
  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]+$/)
    .withMessage("Password must contain at least one letter and one number."),

  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required.")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match.");
      }
      return true;
    }),
];
