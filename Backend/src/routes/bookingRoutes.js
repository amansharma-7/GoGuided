const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const bookingController = require("../controllers/bookingController");

const router = express.Router();

router.get(
  "/",
  authMiddleware.protect,
  authMiddleware.restrictTo("user"),
  bookingController.getUserBookings
);

router.patch(
  "/cancel/:id",
  authMiddleware.protect,
  bookingController.cancelBooking
);

module.exports = router;
