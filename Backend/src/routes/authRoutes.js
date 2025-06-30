// Core
const express = require("express");
const router = express.Router();

// Middlewares
const authMiddleware = require("../middlewares/authMiddleware");

// Validators
const authValidator = require("../validators/authValidator");

// Controllers
const authController = require("../controllers/authController");

// Routes

// Register new user
router.post(
  "/register",
  authValidator.registerValidator,
  authController.register
);

// Verify Email
router.post(
  "/verify-email",
  authValidator.verifyEmail,
  authController.verifyEmail
);

// Resend OTP
router.post(
  "/resend-otp",
  authValidator.resendOTPValidator,
  authController.resendOTP
);

// Login
router.post("/login", authValidator.loginValidator, authController.login);

module.exports = router;
