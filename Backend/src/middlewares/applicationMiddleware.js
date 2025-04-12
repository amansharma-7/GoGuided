// middleware/validateJobApplication.js
const { body, validationResult } = require("express-validator");
const AppError = require("../../utils/appError");

exports.validateJobApplication = [
  // Validate required fields
  body("experience")
    .isInt({ min: 0 })
    .withMessage("Experience must be a valid number")
    .optional(),
  body("resume").custom((value, { req }) => {
    if (!req.files || !req.files.resume) {
      return Error("Resume is required");
    }
    return true;
  }),

  // Handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(
        new AppError(
          `Validation failed: ${errors
            .array()
            .map((err) => err.msg)
            .join(", ")}`,
          400
        )
      );
    }
    next(); // If no errors, proceed to the next middleware or route handler
  },
];
