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
  "/register",
  authValidator.registerValidator,
  authController.register
);
router.post("/login", authValidator.loginValidator, authController.login);

module.exports = router;
