const razorpay = require("../../src/config/razorpay.js");
const crypto = require("crypto");
const catchAsync = require("../../utils/catchAsync.js");
const AppError = require("../../utils/appError.js");

exports.createPaymentOrder = catchAsync(async (req, res, next) => {
  const { tour } = req.body;

  if (!tour || !tour.price) {
    return next(new AppError("Tour with valid price is required", 400));
  }

  const amount = tour.price;

  const options = {
    amount: amount * 100, // Razorpay takes amount in paisa
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

exports.verifyPayment = catchAsync(async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, tour } =
    req.body;

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !tour
  ) {
    return next(new AppError("Missing payment or tour details", 400));
  }

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  const isValid = expectedSignature === razorpay_signature;

  if (!isValid) {
    return next(new AppError("Invalid payment signature", 400));
  }

  // ✅ Optionally store booking in DB
  // await Booking.create({
  //   tourId: tour._id,
  //   user: req.user.id,
  //   amountPaid: tour.price,
  //   paymentId: razorpay_payment_id,
  // });

  res.status(200).json({
    success: true,
    message: "Payment verified successfully",
  });
});
