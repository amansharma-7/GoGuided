// Core
const express = require("express");
const router = express.Router();

// Middlewares
const authMiddleware = require("../middlewares/authMiddleware");

// File Upload (Multer)
const fileParser = require("../middlewares/fileParser");

// Validators
const validateFileLimits = require("../validators/validateFileLimits");
const tourValidator = require("../validators/tourValidator");

// Controllers
const tourController = require("../controllers/tourController");

// Routes

// Create a new tour with thumbnail and images
router.post(
  "/create",
  fileParser(["thumbnail", "images"]),
  validateFileLimits({
    thumbnail: {
      minCount: 1,
      maxCount: 1,
      maxSize: 5,
      allowedTypes: ["image/*"],
      onExceedCount: "ignore",
      onExceedSize: "error",
      onInvalidType: "error",
    },
    images: {
      minCount: 1,
      maxCount: 5,
      maxSize: 5,
      allowedTypes: ["image/*"],
      onExceedCount: "ignore",
      onExceedSize: "error",
      onInvalidType: "error",
    },
  }),
  tourValidator.tourInputValidator,
  tourController.createTour
);

// update tour
router.post(
  "/update",
  fileParser(["thumbnail", "images"]),
  (req, res, next) => {
    const hasExistingThumbnail = !!req.body.existingThumbnail;
    const hasExistingImages =
      Array.isArray(req.body.existingImages) &&
      req.body.existingImages.length > 0;

    return validateFileLimits({
      thumbnail: {
        minCount: hasExistingThumbnail ? 0 : 1,
        maxCount: 1,
        maxSize: 5,
        allowedTypes: ["image/*"],
        onExceedCount: "ignore",
        onExceedSize: "error",
        onInvalidType: "error",
      },
      images: {
        minCount: hasExistingImages ? 0 : 1,
        maxCount: 5,
        maxSize: 5,
        allowedTypes: ["image/*"],
        onExceedCount: "ignore",
        onExceedSize: "error",
        onInvalidType: "error",
      },
    })(req, res, next);
  },
  tourValidator.tourInputValidator,
  tourController.updateTour
);

// Route to get all tours
router.get("/", authMiddleware.protect, tourController.getAllTours);

// Route for card-style tours
router.get("/cards", tourController.getAllToursAsCards);

// Get a single tour by its slug
router.get("/:slug", tourController.getTourBySlug);

module.exports = router;
