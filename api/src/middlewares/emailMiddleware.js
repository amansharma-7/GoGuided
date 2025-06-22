const { body, validationResult } = require("express-validator");

exports.validateSendEmail = [
  body("name").trim().notEmpty().withMessage("Name is required."),

  body("email").trim().isEmail().withMessage("A valid email is required."),

  body("subject").trim().notEmpty().withMessage("Subject is required."),

  body("message").trim().notEmpty().withMessage("Message is required."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map((err) => ({
          field: err.param,
          message: err.msg,
        })),
      });
    }
    next();
  },
];
