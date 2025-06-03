const { body, query } = require("express-validator");

exports.createJobValidator = [
  body("title").notEmpty().withMessage("Title is required"),

  body("description").notEmpty().withMessage("Description is required"),

  body("location").notEmpty().withMessage("Location is required"),

  body("type")
    .notEmpty()
    .withMessage("Job type is required")
    .isIn(["Full-time", "Part-time", "Internship", "Contract"])
    .withMessage("Invalid job type"),

  body("level")
    .notEmpty()
    .withMessage("Job level is required")
    .isIn(["Easy", "Medium", "High"])
    .withMessage("Invalid job level"),

  body("salary.min")
    .notEmpty()
    .withMessage("Minimum salary is required")
    .isFloat({ min: 0 })
    .withMessage("Minimum salary must be >= 0"),

  body("salary.max")
    .notEmpty()
    .withMessage("Maximum salary is required")
    .isFloat({ min: 0 })
    .withMessage("Maximum salary must be >= 0")
    .custom((value, { req }) => {
      if (parseFloat(value) < parseFloat(req.body.salary.min)) {
        throw new Error(
          "Maximum salary must be greater than or equal to minimum salary"
        );
      }
      return true;
    }),

  body("lastDateToApply")
    .notEmpty()
    .withMessage("Last date to apply is required")
    .isISO8601()
    .withMessage("Last date must be a valid date")
    .custom((value) => {
      if (new Date(value) < new Date()) {
        throw new Error("Last date to apply must be in the future");
      }
      return true;
    }),

  body("numberOfPosts")
    .notEmpty()
    .withMessage("Number of posts is required")
    .isInt({ min: 1 })
    .withMessage("Number of posts must be at least 1"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors
        .array()
        .map((err) => err.msg)
        .join(", ");
      return next(new AppError(errorMessage, 400));
    }
    next();
  },
];

exports.editJobValidator = [
  query("jobId")
    .notEmpty()
    .withMessage("Job ID is required")
    .isMongoId()
    .withMessage("Invalid Job ID"),

  body("title").notEmpty().withMessage("Title is required"),

  body("description").notEmpty().withMessage("Description is required"),

  body("location").notEmpty().withMessage("Location is required"),

  body("type")
    .notEmpty()
    .withMessage("Job type is required")
    .isIn(["Full-time", "Part-time", "Internship", "Contract"])
    .withMessage("Invalid job type"),

  body("level")
    .notEmpty()
    .withMessage("Job level is required")
    .isIn(["Easy", "Medium", "High"])
    .withMessage("Invalid job level"),

  body("salary.min")
    .notEmpty()
    .withMessage("Minimum salary is required")
    .isFloat({ min: 0 })
    .withMessage("Minimum salary must be >= 0"),

  body("salary.max")
    .notEmpty()
    .withMessage("Maximum salary is required")
    .isFloat({ min: 0 })
    .withMessage("Maximum salary must be >= 0")
    .custom((value, { req }) => {
      if (parseFloat(value) < parseFloat(req.body.salary.min)) {
        throw new Error(
          "Maximum salary must be greater than or equal to minimum salary"
        );
      }
      return true;
    }),

  body("lastDateToApply")
    .notEmpty()
    .withMessage("Last date to apply is required")
    .isISO8601()
    .withMessage("Last date must be a valid date")
    .custom((value) => {
      if (new Date(value) < new Date()) {
        throw new Error("Last date to apply must be in the future");
      }
      return true;
    }),

  body("numberOfPosts")
    .notEmpty()
    .withMessage("Number of posts is required")
    .isInt({ min: 1 })
    .withMessage("Number of posts must be at least 1"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors
        .array()
        .map((err) => err.msg)
        .join(", ");
      return next(new AppError(errorMessage, 400));
    }
    next();
  },
];
