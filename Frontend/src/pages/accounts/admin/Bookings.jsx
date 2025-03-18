import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router";
import BookingsHeaderWrapper from "./BookingsHeader";

const bookings = [
  {
    id: "BKG001",
    tour: "Grand Canyon Adventure",
    email: "john.doe@example.com",
    date: "2025-03-18",
    status: "Confirmed",
  },
  {
    id: "BKG002",
    tour: "Paris City Tour",
    email: "jane.smith@example.com",
    date: "2025-03-17",
    status: "Pending",
  },
  {
    id: "BKG003",
    tour: "Swiss Alps Expedition",
    email: "alice.johnson@example.com",
    date: "2025-03-16",
    status: "Cancelled",
  },
  {
    id: "BKG004",
    tour: "African Safari",
    email: "michael.brown@example.com",
    date: "2025-03-15",
    status: "Confirmed",
  },
  {
    id: "BKG005",
    tour: "Bali Beach Escape",
    email: "chris.wilson@example.com",
    date: "2025-03-14",
    status: "Pending",
  },
  {
    id: "BKG006",
    tour: "Tokyo Food Tour",
    email: "emily.davis@example.com",
    date: "2025-03-13",
    status: "Confirmed",
  },
  {
    id: "BKG007",
    tour: "Amazon Rainforest Trek",
    email: "david.white@example.com",
    date: "2025-03-12",
    status: "Cancelled",
  },
  {
    id: "BKG008",
    tour: "Rome History Walk",
    email: "sophia.martinez@example.com",
    date: "2025-03-11",
    status: "Pending",
  },
  {
    id: "BKG009",
    tour: "Northern Lights Trip",
    email: "james.anderson@example.com",
    date: "2025-03-10",
    status: "Confirmed",
  },
  {
    id: "BKG010",
    tour: "Maldives Luxury Retreat",
    email: "olivia.thomas@example.com",
    date: "2025-03-09",
    status: "Pending",
  },
];

function Bookings() {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="p-4">
      {/* Header Section */}

      <BookingsHeaderWrapper />

      {/* Table Header */}
      <div className="grid grid-cols-[1fr_3fr_3fr_1.5fr_1.5fr] bg-gray-200 text-gray-700 font-semibold p-2 rounded-md ">
        <div className="">ID</div>
        <div className="">Tour Name</div>
        <div className="">Email</div>
        <div className="">Date</div>
        <div className="">Status</div>
      </div>

      {/* Booking Entries */}
      <div className="divide-y divide-gray-200 border border-gray-200 rounded-md">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div
              key={booking.id}
              onClick={() => navigate(`/bookings/${booking.id}`)} // Navigate to sub-route on click
              className="grid grid-cols-[1fr_3fr_3fr_1.5fr_1.5fr] p-2 items-center text-left hover:bg-gray-100 transition cursor-pointer"
            >
              <div className="text-gray-700 truncate">{booking.id}</div>

              {/* Force tour name to use full space */}
              <div className="font-medium text-gray-900">{booking.tour}</div>

              {/* Force email to use full space */}
              <div className="text-gray-700 w-full flex items-center">
                {booking.email}
              </div>

              <div className="text-gray-600">{booking.date}</div>

              <div>
                <span
                  className={`px-3 py-1 text-sm rounded-md border 
                  ${
                    booking.status === "Confirmed"
                      ? "bg-green-100 text-green-700 border-green-400"
                      : booking.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700 border-yellow-400"
                      : "bg-red-100 text-red-700 border-red-400"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-left text-gray-600 p-3">No bookings found.</div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md flex items-center">
          <FaArrowLeft className="mr-2" /> Previous
        </button>

        <span className="text-gray-800 font-semibold text-sm">Page {1}</span>

        <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md flex items-center">
          Next <FaArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
}

export default Bookings;
