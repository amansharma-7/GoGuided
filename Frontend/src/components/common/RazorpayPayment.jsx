const RazorpayPayment = ({ orderData }) => {
  const handlePayment = () => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Replace with your Razorpay key_id
      amount: orderData.amount, // in paise (i.e., ₹500 = 50000)
      currency: "INR",
      name: "Your Company Name",
      description: "Test Transaction",
      order_id: orderData.id, // Order ID from backend
      handler: function (response) {
        console.log("Payment Successful:", response);
        // You should verify payment on backend here
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return <button onClick={handlePayment}>Pay with Razorpay</button>;
};

export default RazorpayPayment;
