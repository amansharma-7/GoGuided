const razorpay = require("../../src/config/razorpay");
const catchAsync = require("../../utils/catchAsync");

exports.createPaymentOrder = catchAsync(async (req, res) => {
  const { amount, currency = "INR", receipt } = req.body;

  const options = {
    amount: amount * 100, // amount in paise (₹1 = 100 paise)
    currency,
    receipt,
  };

  const order = await razorpay.orders.create(options);

  res.status(200).json({
    success: true,
    orderId: order.id,
    currency: order.currency,
    amount: order.amount,
  });
});
