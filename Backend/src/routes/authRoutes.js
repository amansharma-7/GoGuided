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
router.post(
  "/send-otp",
  authValidator.sendOptValidator,
  authController.sendOTP
);

router.post("/signup", authValidator.signupValidator, authController.signup);
router.post("/login", authValidator.loginValidator, authController.login);

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

router.post(
  "/forgot-password",
  authValidator.forgotPasswordValidator,
  authController.forgotPassword
);

router.patch(
  "/reset-password",
  authValidator.resetPasswordValidator,
  authController.resetPassword
);

router.patch(
  "/update-password",
  authMiddleware.protect,
  authValidator.updatePasswordValidator,
  authController.updatePassword
);

module.exports = router;
