import toast from "react-hot-toast";
import api from "../services/apiClient";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
}

export async function initiateRazorpayPayment({ tour }) {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    return;
  }
  try {
    const response = await api.post("/payment/create-order", {
      totalAmount: tour.amountPaid,
    });

    const orderData = await response.data;
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      currency: orderData.data.currency,
      amount: `${orderData.data.amount}`,
      order_id: orderData.data.id,
      handler: function (razorpayResponse) {
        verifyPayment({ ...razorpayResponse, tour });
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      toast.error("Something went wrong");
    });
  } catch (error) {}
}

async function verifyPayment({
  razorpay_payment_id,
  razorpay_order_id,
  razorpay_signature,
  tour,
}) {
  try {
    const response = await api.post("payment/verify-payment", {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      tour,
    });
  } catch (error) {
    toast.error("Something went wrong");
  }
}
