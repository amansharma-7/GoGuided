const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  method: {
    type: String,
    enum: ["credit_card", "debit_card", "paypal", "upi", "cash"],
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed", "refunded"],
    default: "pending",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
