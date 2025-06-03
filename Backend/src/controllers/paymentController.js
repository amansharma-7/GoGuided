const razorpay = require("../../src/config/razorpay.js");
const crypto = require("crypto");
const catchAsync = require("../../utils/catchAsync.js");
const AppError = require("../../utils/appError.js");

exports.createPaymentOrder = catchAsync(async (req, res, next) => {
  const { amount } = req.body;

  if (!amount) {
    return next(new AppError("Amount is required", 400));
  }

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);

  res.status(200).json({
    success: true,
    order,
  });
});

exports.verifyPayment = catchAsync(async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return next(new AppError("Missing payment details", 400));
  }

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isValid = expectedSignature === razorpay_signature;

  if (!isValid) {
    return next(new AppError("Invalid payment signature", 400));
  }

  // Optional: store transaction in DB here

  res.status(200).json({
    success: true,
    message: "Payment verified successfully",
  });
});
