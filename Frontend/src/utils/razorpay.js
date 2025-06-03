function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export async function initiateRazorpayPayment({ amount }) {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    toast.error("RazorPay SDK failed to load");
    return;
  }

  const orderResponse = await apiConnector(
    "POST",
    COURSE_PAYMENT_API,
    { courses },
    {
      Authorization: `Bearer ${token}`,
    }
  );

  return response;
}
