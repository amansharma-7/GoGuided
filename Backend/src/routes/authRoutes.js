const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", authMiddleware.validateSignup, authController.signup);
router.get("/verify-email", authController.verifyEmail);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.patch("/reset-password", authController.resetPassword);
router.patch(
  "/update-password",
  authMiddleware.isLoggedIn,
  authController.updatePassword
);

module.exports = router;
