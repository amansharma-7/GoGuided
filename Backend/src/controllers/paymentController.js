const crypto = require("crypto");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const razorpay = require("../config/razorpay"); // Razorpay instance

// CREATE PAYMENT ORDER
exports.createPaymentOrder = catchAsync(async (req, res, next) => {
  const { totalAmount } = req.body;
  const options = {
    amount: totalAmount * 100, // Amount in paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);

  res.status(200).json({
    success: true,
    data: {
      id: order.id,
      currency: order.currency,
      amount: order.amount,
    },
  });
});

// VERIFY PAYMENT
exports.verifyPayment = catchAsync(async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return next(new AppError("Invalid payment signature", 400));
  }

  res.status(200).json({
    success: true,
    message: "Payment verified successfully",
  });
});
