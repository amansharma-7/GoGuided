import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isCanceling, setIsCanceling] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");
  const [canceledBy, setCanceledBy] = useState("");

  // 🔥 Hardcoded booking data (Replace with API data later)
  const booking = {
    id: "1",
    tour: "Safari Adventure",
    customer: "John Doe",
    email: "john@example.com",
    contact: "+1234567890",
    guide: "Mike Johnson",
    date: "2023-09-15",
    price: "$200",
    paymentMethod: "Credit Card",
    status: "Upcoming", // "Completed", "Ongoing", "Canceled"
    feedback: "Amazing experience! Highly recommended.",
    completionDate: "2023-09-20",
    expectedCompletionDate: "2023-09-25",
    cancellationDate: "2023-09-18",
    cancellationReason: "Bad weather conditions",
    canceledBy: "Admin", // Hardcoded, update with API data
    scheduledDate: "2023-09-15",
  };

  // Status-based styling
  const statusStyles = {
    Completed: "bg-green-100 text-green-800 border-green-400",
    Ongoing: "bg-yellow-100 text-yellow-800 border-yellow-400",
    Canceled: "bg-red-100 text-red-800 border-red-400",
    Upcoming: "bg-blue-100 text-blue-800 border-blue-400",
  };

  // Handle Cancellation
  const handleCancel = () => {
    if (!cancellationReason.trim()) {
      alert("Please provide a reason for cancellation.");
      return;
    }

    alert(`Booking canceled. Reason: ${cancellationReason}`);
    setIsCanceling(false);
    setIsCanceled(true);
    setCanceledBy("Admin"); // Adjust based on the user's role
  };

  return (
    <div className="p-6 space-y-6 h-full border border-green-400 rounded-r-md bg-green-50 shadow-md">
      {/* Header with Back Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-800">Booking Details</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-green-500 cursor-pointer text-white rounded-md hover:bg-green-600"
        >
          Go Back
        </button>
      </div>

      {/* Two-Column Layout for Booking Info */}
      <div className="grid grid-cols-2 gap-4 p-4 bg-white border border-green-300 rounded-md shadow">
        <div>
          <p>
            <span className="font-semibold text-green-800">Booking ID:</span>{" "}
            {booking.id}
          </p>
          <p>
            <span className="font-semibold text-green-800">Tour:</span>{" "}
            {booking.tour}
          </p>
          <p>
            <span className="font-semibold text-green-800">Customer:</span>{" "}
            {booking.customer}
          </p>
          <p>
            <span className="font-semibold text-green-800">Email:</span>{" "}
            {booking.email}
          </p>
          <p>
            <span className="font-semibold text-green-800">Contact:</span>{" "}
            {booking.contact}
          </p>
        </div>
        <div>
          <p>
            <span className="font-semibold text-green-800">Price:</span>{" "}
            {booking.price}
          </p>
          <p>
            <span className="font-semibold text-green-800">
              Payment Method:
            </span>{" "}
            {booking.paymentMethod}
          </p>
          <p>
            <span className="font-semibold text-green-800">Tour Guide:</span>{" "}
            {booking.guide}
          </p>
          <p>
            <span className="font-semibold text-green-800">Status:</span>{" "}
            <span
              className={`px-3 py-1 text-sm rounded-md border ${
                statusStyles[booking.status]
              }`}
            >
              {booking.status}
            </span>
          </p>
          <p>
            <span className="font-semibold text-green-800">Booking Date:</span>{" "}
            {booking.date}
          </p>
        </div>
      </div>

      {/* Status-Based Details */}
      <div className="p-4 bg-white border border-green-300 rounded-md shadow space-y-2">
        {booking.status === "Completed" && (
          <>
            <h3 className="text-green-700 font-semibold">Tour Completed</h3>
            <p>
              <span className="font-semibold text-green-800">
                Completion Date:
              </span>{" "}
              {booking.completionDate}
            </p>
            <p className="font-semibold">Customer Feedback:</p>
            <p className="italic">{booking.feedback}</p>
          </>
        )}
        {booking.status === "Ongoing" && (
          <>
            <h3 className="text-yellow-700 font-semibold">Tour Ongoing</h3>
            <p>
              <span className="font-semibold text-green-800">
                Expected Completion Date:
              </span>{" "}
              {booking.expectedCompletionDate}
            </p>
          </>
        )}
        {booking.status === "Upcoming" && (
          <>
            <h3 className="text-blue-700 font-semibold">Upcoming Tour</h3>
            <p>
              <span className="font-semibold text-green-800">
                Scheduled Date:
              </span>{" "}
              {booking.scheduledDate}
            </p>
          </>
        )}
        {booking.status === "Canceled" && (
          <>
            <h3 className="text-red-700 font-semibold">Booking Canceled</h3>
            <p>
              <span className="font-semibold text-green-800">
                Cancellation Date:
              </span>{" "}
              {booking.cancellationDate}
            </p>
            <p>
              <span className="font-semibold text-green-800">Canceled By:</span>{" "}
              {booking.canceledBy}
            </p>
            <p>
              <span className="font-semibold text-green-800">Reason:</span>{" "}
              {booking.cancellationReason}
            </p>
          </>
        )}
      </div>

      {/* Cancellation Section */}
      {(booking.status === "Upcoming" || booking.status === "Ongoing") &&
        !isCanceled && (
          <div className="p-4 bg-white border border-green-300 rounded-md shadow space-y-4">
            {!isCanceling ? (
              <button
                onClick={() => setIsCanceling(true)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Cancel Booking
              </button>
            ) : (
              <div className="space-y-2">
                <p className="text-red-700 font-semibold">
                  Provide a reason for cancellation:
                </p>
                <textarea
                  value={cancellationReason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                  rows="3"
                  placeholder="Enter cancellation reason..."
                  className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Confirm Cancellation
                </button>
              </div>
            )}
          </div>
        )}
    </div>
  );
};

export default BookingDetails;
