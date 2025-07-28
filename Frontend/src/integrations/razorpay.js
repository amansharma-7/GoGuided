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

export function initiateRazorpayPayment({ tour }) {
  return new Promise(async (resolve, reject) => {
    const isScriptLoaded = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!isScriptLoaded) {
      return reject(
        new Error("Failed to load payment gateway. Please try again.")
      );
    }

    try {
      const { data: orderResponse } = await api.post("/payment/create-order", {
        totalAmount: tour.amountPaid,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        currency: orderResponse.data.currency,
        amount: `${orderResponse.data.amount}`,
        order_id: orderResponse.data.id,
        handler: async function (razorpayResponse) {
          try {
            await verifyPayment({ ...razorpayResponse, tour });
            resolve();
          } catch (err) {
            reject(err);
          }
        },
        theme: {
          color: "#10b981",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on("payment.failed", (err) => {
        reject(err);
      });
    } catch (error) {
      reject(error);
    }
  });
}

async function verifyPayment({
  razorpay_payment_id,
  razorpay_order_id,
  razorpay_signature,
  tour,
}) {
  await api.post("payment/verify-payment", {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    tour,
  });
}
