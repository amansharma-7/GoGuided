const { body } = require("express-validator");
const validate = require("./validate");

exports.createTourValidator = validate([
  body("title")
    .notEmpty()
    .withMessage("Please enter a tour title")
    .isString()
    .withMessage("Tour title must be text"),

  body("location")
    .notEmpty()
    .withMessage("Please enter a location")
    .isString()
    .withMessage("Location must be text"),

  body("duration")
    .notEmpty()
    .withMessage("Please enter the tour duration")
    .isNumeric()
    .withMessage("Duration must be a number"),

  body("participants")
    .notEmpty()
    .withMessage("Please specify how many participants are allowed")
    .isInt({ min: 1 })
    .withMessage("Participants must be a positive whole number"),

  body("difficulty")
    .notEmpty()
    .withMessage("Please select a difficulty level")
    .isIn(["easy", "medium", "hard"])
    .withMessage("Difficulty must be one of: easy, medium, or hard"),

  body("languages")
    .isArray({ min: 1 })
    .withMessage("Please select at least one language")
    .custom((arr) => {
      if (!arr.every((lang) => typeof lang === "string")) {
        throw new Error("All selected languages must be text");
      }
      return true;
    }),

  body("pricePerPerson")
    .notEmpty()
    .withMessage("Please enter a price per person")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a number greater than zero"),

  body("startDate")
    .notEmpty()
    .withMessage("Please provide a start date for the tour")
    .isISO8601()
    .withMessage("Start date must be a valid date (e.g., YYYY-MM-DD)"),

  body("overview")
    .notEmpty()
    .withMessage("Please enter a short overview")
    .isString()
    .withMessage("Overview must be text"),

  body("description")
    .notEmpty()
    .withMessage("Please provide a tour description")
    .isString()
    .withMessage("Description must be text"),

  body("highlights")
    .isArray({ min: 1 })
    .withMessage("Please list at least one tour highlight")
    .custom((arr) => {
      if (!arr.every((item) => typeof item === "string")) {
        throw new Error("Each highlight must be text");
      }
      return true;
    }),

  body("included")
    .isArray({ min: 1 })
    .withMessage("Please list what's included in the tour")
    .custom((arr) => {
      if (!arr.every((item) => typeof item === "string")) {
        throw new Error("Each included item must be text");
      }
      return true;
    }),

  body("guides")
    .isArray({ min: 1 })
    .withMessage("Please add at least one guide")
    .custom((arr) => {
      if (!arr.every((item) => typeof item === "string")) {
        throw new Error("Each guide ID must be a valid string");
      }
      return true;
    }),

  // body("stops")
  //   .isArray({ min: 1 })
  //   .withMessage("Please list at least one stop")
  //   .custom((arr) => {
  //     if (!arr.every((item) => typeof item === "string")) {
  //       throw new Error("Each stop must be text");
  //     }
  //     return true;
  //   }),

  // Images and thumbnails should be handled separately via Multer or another file upload middleware.
]);
