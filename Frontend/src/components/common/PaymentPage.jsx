import React, { useEffect, useState } from "react";
import RazorpayPayment from "./RazorpayPayment";

const PaymentPage = () => {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/payment/create-order",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: 50000, // ₹500 in paise
              currency: "INR",
              receipt: "receipt_001",
            }),
          }
        );

        const data = await response.json();
        setOrderData(data);
      } catch (error) {
        console.error("Error creating Razorpay order:", error);
      }
    };

    createOrder();
  }, []);

  return (
    <div>
      <h2>Make Payment</h2>
      {orderData ? (
        <RazorpayPayment orderData={orderData} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PaymentPage;
