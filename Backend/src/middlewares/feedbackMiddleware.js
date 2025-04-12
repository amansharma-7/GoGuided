const { body, validationResult } = require("express-validator");

// Validation middleware
exports.validateFeedback = [
  // Validate firstName
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required.")
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters long."),

  // Validate lastName
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required.")
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters long."),

  // Validate email
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email address."),

  // Validate subject
  body("subject")
    .trim()
    .notEmpty()
    .withMessage("Subject is required.")
    .isLength({ min: 5 })
    .withMessage("Subject must be at least 5 characters long."),

  // Validate message
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required.")
    .isLength({ min: 10 })
    .withMessage("Message must be at least 10 characters long."),

  // Check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError(errors.array()[0].msg, 400));
    }
    next();
  },
];
