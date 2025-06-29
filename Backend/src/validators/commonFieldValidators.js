const { body } = require("express-validator");

// Regex for only alphabets (no spaces, no hyphens)
const alphaOnlyRegex = /^[A-Za-z]+$/;

// Capitalize first letter of string
const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

// Common validator for name fields
const nameFieldValidator = (field, displayName) =>
  body(field)
    .trim()
    .notEmpty()
    .withMessage(`${displayName} is required`)
    .isLength({ min: 2 })
    .withMessage(`${displayName} must be at least 2 characters long`)
    .matches(alphaOnlyRegex)
    .withMessage(`${displayName} must contain only letters (A–Z)`)
    .customSanitizer((value) => capitalize(value));

exports.firstNameValidator = nameFieldValidator("firstName", "First name");
exports.lastNameValidator = nameFieldValidator("lastName", "Last name");

exports.emailFieldValidator = body("email")
  .trim()
  .notEmpty()
  .withMessage("Email is required")
  .normalizeEmail({ all_lowercase: true })
  .isEmail()
  .withMessage("Invalid email format")
  .isLength({ max: 320 })
  .withMessage("Email must not exceed 320 characters");

const phoneRegex = /^[6-9]\d{9}$/;

exports.phoneFieldValidator = body("phone")
  .trim()
  .notEmpty()
  .withMessage("Phone number is required")
  .matches(phoneRegex)
  .withMessage("Phone number must be a valid 10-digit Indian mobile number");
