const express = require("express");
const bookingMiddleware = require("../middlewares/bookingMiddleware");
const bookingController = require("../controllers/bookingController");

const router = express.Router();

router.get("/", bookingController.getAllBookings);
router.post(
  "/create-booking",
  bookingMiddleware.validateCreateBooking,
  bookingController.createBooking
);
router.get("/:bookingId", bookingController.getBookingById);
router.patch("/cancel/:bookingId", bookingController.cancelBooking);

module.exports = router;
