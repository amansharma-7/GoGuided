const express = require("express");
const paymentController = require("../controllers/paymentController");
const paymentValidator = require("../validators/paymentValidator");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/create-order",
  authMiddleware.protect,
  paymentValidator.createPaymentValidator,
  paymentController.createPaymentOrder
);

router.post(
  "/verify-payment",
  authMiddleware.protect,
  paymentValidator.verifyPaymentValidator,
  paymentController.verifyPayment
);

module.exports = router;
