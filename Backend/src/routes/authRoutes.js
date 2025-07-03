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

// Send OTP
router.post(
  "/send-otp",
  authValidator.sendOTPValidator,
  authController.sendOTP
);

// Login
router.post("/login", authValidator.loginValidator, authController.login);

// Get current logged-in user's data
router.get("/me", authMiddleware.protect, authController.getMe);

module.exports = router;
