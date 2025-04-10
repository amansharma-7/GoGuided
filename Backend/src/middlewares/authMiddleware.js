const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const Account = require("../models/accountModel");
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
      const existingUser = await Account.findOne({ email });
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
      const existingUser = await Account.findOne({ phone });
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
