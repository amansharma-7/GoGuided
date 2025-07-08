// Core
const express = require("express");
const router = express.Router();

// Middlewares
const authMiddleware = require("../middlewares/authMiddleware");

// File Upload (Multer)
const upload = require("../middlewares/fileUpload");

// Validators
const tourValidator = require("../validators/tourValidator");
// Controllers

// Routes

// Create a new tour with thumbnail and images
router.post(
  "/create-tour",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  tourValidator.createTourValidator,
  (req, res) => {
    console.log(req.body);
    res.status(201).json({});
  }
);

module.exports = router;
