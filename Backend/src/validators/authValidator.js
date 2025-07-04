const { query } = require("express-validator");

const validate = require("./validate");
const {
  firstNameFieldValidator,
  lastNameFieldValidator,
  emailFieldValidator,
  phoneFieldValidator,
  strongPasswordFieldValidator: registerPasswordFieldValidator,
  strongPasswordFieldValidator: resetPasswordFieldValidator,
  strongPasswordFieldValidator: updatePasswordFieldValidator,
  passwordFieldValidator,
  otpFieldValidator,
  confirmPasswordValidator,
} = require("./commonFieldValidators");

exports.registerValidator = validate([
  firstNameFieldValidator,
  lastNameFieldValidator,
  emailFieldValidator,
  phoneFieldValidator,
  registerPasswordFieldValidator("password"),
  confirmPasswordValidator("password", "confirmPassword"),
  otpFieldValidator,
]);

exports.verifyEmail = validate([emailFieldValidator, otpFieldValidator]);

exports.sendOTPValidator = validate([emailFieldValidator]);

exports.loginValidator = validate([
  emailFieldValidator,
  passwordFieldValidator("password"),
]);

exports.forgotPasswordValidator = validate([emailFieldValidator]);

exports.resetPasswordValidator = validate([
  query("token").notEmpty().withMessage("Reset token is required."),
  resetPasswordFieldValidator("password"),
  confirmPasswordValidator("confirmPassword", "password"),
]);

exports.updatePasswordValidator = validate([
  passwordFieldValidator("currentPassword"),
  updatePasswordFieldValidator("newPassword"),
  confirmPasswordValidator("confirmNewPassword", "newPassword"),
]);

exports.forgotPasswordValidator = validate([emailFieldValidator]);

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

  otpFieldValidator,
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
