const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const AppError = require("../../utils/appError"); // Ensure the correct path for AppError

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

exports.validateCreateBooking = [
  body("userId")
    .custom(isValidObjectId)
    .withMessage("Invalid userId — must be a valid MongoDB ObjectId"),

  body("tourId")
    .custom(isValidObjectId)
    .withMessage("Invalid tourId — must be a valid MongoDB ObjectId"),

  body("bookingStatus")
    .isIn(["pending", "confirmed", "cancelled"])
    .withMessage("bookingStatus must be one of: Pending, Confirmed, Cancelled"),

  body("totalPrice")
    .isFloat({ gt: 0 })
    .withMessage("totalPrice must be a number greater than 0"),

  body("currency")
    .optional()
    .isString()
    .isLength({ min: 2, max: 5 })
    .withMessage("currency should be a valid currency code (e.g., INR, USD)"),

  body("paymentId")
    .custom(isValidObjectId)
    .withMessage("Invalid paymentId — must be a valid MongoDB ObjectId"),

  body("travelerDetails")
    .isArray({ min: 1 })
    .withMessage("travelerDetails must be a non-empty array"),

  body("travelerDetails.*.name")
    .isString()
    .notEmpty()
    .withMessage("Each traveler must have a name"),

  body("travelerDetails.*.age")
    .isInt({ min: 0 })
    .withMessage("Each traveler must have a valid age"),

  body("travelerDetails.*.gender")
    .isIn(["male", "female", "other"])
    .withMessage("Each traveler must have a valid gender"),

  // Error handler for validation
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
    next();
  },
];
