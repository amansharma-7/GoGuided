const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const bookingController = require("../controllers/bookingController");

const router = express.Router();

router.post("/:slug", authMiddleware.protect, bookingController.createBooking);

module.exports = router;
