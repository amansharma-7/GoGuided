function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
}

export async function initiateRazorpayPayment({
  token,
  tour,
  userDetails,
  navigate,
}) {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:5000/api/payment/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ tour }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return;
    }

    const orderData = await response.json();
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      currency: orderData.data.currency,
      amount: `${orderData.data.amount}`,
      order_id: orderData.data.id,
      // name: "GoGuided",
      // description: `Booking for Tour: ${tour?.name || "Tour"}`,
      // prefill: {
      //   name: userDetails.firstName,
      //   email: userDetails.email,
      // },
      handler: function (razorpayResponse) {
        verifyPayment({ ...razorpayResponse, tour }, token, navigate);
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      console.error("Payment failed:", response.error);
    });
  } catch (error) {
    console.error("PAYMENT API ERROR:", error);
  }
}

async function verifyPayment(bodyData, token, navigate) {
  try {
    const response = await fetch("http://localhost:5000/api/payment/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bodyData),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Payment verification failed");
    }

    // navigate("/dashboard/bookings");
  } catch (error) {
    console.error("PAYMENT VERIFY ERROR:", error);
  }
}
