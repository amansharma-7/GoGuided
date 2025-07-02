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

exports.sendOptValidator = validate([emailFieldValidator]);

exports.resendOTPValidator = validate([emailFieldValidator]);

exports.loginValidator = validate([
  emailFieldValidator,
  passwordFieldValidator,
]);

exports.forgotPasswordValidator = validate([
  body("email").isEmail().withMessage("Please provide a valid email address"),
]);

exports.resetPasswordValidator = validate([
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

exports.updatePasswordValidator = validate([
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),

  body("newPassword")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters long")
    .matches(/[0-9]/)
    .withMessage("New password must contain at least one number")
    .matches(/[a-zA-Z]/)
    .withMessage("New password must contain at least one letter")
    .matches(/[@$!%*?&]/)
    .withMessage("New password must contain at least one special character")
    .custom((newPassword, { req }) => {
      if (newPassword === req.body.currentPassword) {
        throw new Error(
          "New password must be different from the current password"
        );
      }
      return true;
    }),

  body("confirmNewPassword")
    .exists()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("New password and confirm password must match");
      }
      return true;
    }),
]);
