const { body } = require("express-validator");

const validate = require("./validate");
const {
  firstNameValidator,
  lastNameValidator,
  emailFieldValidator,
  phoneFieldValidator,
  otpFieldValidator,
  passwordFieldValidator,
} = require("./commonFieldValidators");

exports.signupValidator = validate([
  firstNameValidator,
  lastNameValidator,
  emailFieldValidator,
  phoneFieldValidator,
  otpFieldValidator,

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&]/)
    .withMessage(
      "Password must contain at least one special character (@, $, !, %, *, ?, &)"
    ),

  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm Password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password and confirm password do not match");
      }
      return true;
    }),
]);

exports.loginValidator = validate([
  emailFieldValidator,
  body("password").notEmpty().withMessage("Password is required"),
]);

exports.sendOptValidator = validate([emailFieldValidator]);

exports.resendOTPValidator = validate([emailFieldValidator]);

exports.loginValidator = validate([
  emailFieldValidator,
  passwordFieldValidator,
]);
