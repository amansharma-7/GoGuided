const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post(
  "/forgot-password",
  authMiddleware.isLoggedIn,
  authController.forgotPassword
);
router.post("/reset-password", authController.resetPassword);
router.post(
  "/update-password",
  authMiddleware.isLoggedIn,
  authController.updatePassword
);

module.exports = router;
