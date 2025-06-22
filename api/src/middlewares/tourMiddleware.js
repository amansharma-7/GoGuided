const { body, validationResult } = require("express-validator");

exports.validateTour = [
  // Title
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 5 })
    .withMessage("Title must be at least 5 characters long"),

  // Location
  body("location").notEmpty().withMessage("Location is required"),

  // Duration
  body("duration").notEmpty().withMessage("Duration is required"),

  // Participants
  body("participants")
    .notEmpty()
    .withMessage("Participants count is required")
    .isInt({ min: 1 })
    .withMessage("Participants must be at least 1"),

  // Difficulty
  body("difficulty")
    .notEmpty()
    .withMessage("Difficulty is required")
    .isIn(["Easy", "Medium", "Hard"])
    .withMessage("Difficulty must be Easy, Medium, or Hard"),

  // Languages
  body("languages")
    .isArray({ min: 1 })
    .withMessage("At least one language is required")
    .custom((arr) => {
      if (!arr.every((lang) => typeof lang === "string")) {
        throw new Error("Languages must be an array of strings");
      }
      return true;
    }),

  // Start Date
  body("startDate")
    .notEmpty()
    .withMessage("Start date is required")
    .isISO8601()
    .withMessage("Start date must be a valid ISO8601 date")
    .custom((value) => {
      if (new Date(value) < new Date()) {
        throw new Error("Start date must be in the future");
      }
      return true;
    }),

  // Overview
  body("overview")
    .notEmpty()
    .withMessage("Overview is required")
    .isLength({ min: 20 })
    .withMessage("Overview must be at least 20 characters long"),

  // Highlights
  body("highlights")
    .isArray({ min: 1 })
    .withMessage("At least one highlight is required")
    .custom((arr) => {
      if (!arr.every((highlight) => typeof highlight === "string")) {
        throw new Error("Highlights must be an array of strings");
      }
      return true;
    }),

  // Included
  body("included")
    .isArray({ min: 1 })
    .withMessage("At least one inclusion is required")
    .custom((arr) => {
      if (!arr.every((item) => typeof item === "string")) {
        throw new Error("Included must be an array of strings");
      }
      return true;
    }),

  body("tourSpots")
    .isArray({ min: 1 })
    .withMessage("Tour spots must be a non-empty array"),

  body("tourSpots.*.day")
    .isInt({ min: 1 })
    .withMessage("Day must be an integer"),

  body("tourSpots.*.lat")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be a valid number between -90 and 90"),

  body("tourSpots.*.lng")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be a valid number between -180 and 180"),

  body("tourSpots.*.desc")
    .isString()
    .withMessage("Description must be a string")
    .notEmpty()
    .withMessage("Description is required"),

  // Price
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  // Currency
  body("currency")
    .notEmpty()
    .withMessage("Currency is required")
    .isLength({ min: 3, max: 3 })
    .withMessage("Currency must be a 3-letter code (e.g., 'INR', 'USD')"),

  // Final error handler
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }
    next();
  },
];
