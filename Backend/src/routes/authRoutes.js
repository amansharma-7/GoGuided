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

module.exports = router;
