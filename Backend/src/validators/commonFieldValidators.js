const { body } = require("express-validator");

// Regex for only alphabets (no spaces, no hyphens)
const alphaOnlyRegex = /^[A-Za-z]+$/;

// Safe capitalize function
const capitalize = (str) =>
  typeof str === "string" && str.length > 0
    ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    : str;

// First Name Validator (required)
exports.firstNameValidator = body("firstName")
  .trim()
  .notEmpty()
  .withMessage("First name is required")
  .isLength({ min: 2 })
  .withMessage("First name must be at least 2 characters long")
  .matches(alphaOnlyRegex)
  .withMessage("First name must contain only letters (A–Z)")
  .customSanitizer((value) => capitalize(value));

// Last Name Validator (optional)
exports.lastNameValidator = body("lastName")
  .trim()
  .optional({ checkFalsy: true })
  .isLength({ min: 2 })
  .withMessage("Last name must be at least 2 characters long")
  .matches(alphaOnlyRegex)
  .withMessage("Last name must contain only letters (A–Z)")
  .customSanitizer((value) => {
    if (!value) return "";
    return capitalize(value);
  });

exports.emailFieldValidator = body("email")
  .trim()
  .notEmpty()
  .withMessage("Email is required")
  .normalizeEmail({ all_lowercase: true })
  .isEmail()
  .withMessage("Invalid email format")
  .isLength({ max: 320 })
  .withMessage("Email must not exceed 320 characters");

exports.passwordFieldValidator = body("password")
  .notEmpty()
  .withMessage("Password is required");

const phoneRegex = /^[6-9]\d{9}$/;

exports.phoneFieldValidator = body("phone")
  .trim()
  .notEmpty()
  .withMessage("Phone number is required")
  .matches(phoneRegex)
  .withMessage("Phone number must be a valid 10-digit Indian mobile number");

exports.otpFieldValidator = body("otp")
  .trim()
  .notEmpty()
  .withMessage("OTP is required.")
  .isLength({ min: 6, max: 6 })
  .withMessage("OTP must be exactly 6 digits.")
  .isNumeric()
  .withMessage("OTP must contain only numbers.");
