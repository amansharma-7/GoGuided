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
router.patch(
  "/verify-email",
  authValidator.verifyEmail,
  authController.verifyEmail
);

// Resend OTP
router.patch(
  "/resend-otp",
  authValidator.resendOTPValidator,
  authController.resendOTP
);

// Login
router.post("/login", authValidator.loginValidator, authController.login);

// Get current logged-in user's data
router.get("/me", authMiddleware.protect, authController.getMe);

module.exports = router;
