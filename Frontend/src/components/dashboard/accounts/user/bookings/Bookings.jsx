import NoBooking from "./NoBooking";
import Reviews from "../reviews/Reviews";

let bookings = [
  {
    id: 1,
    name: "European Adventure",
    startDate: "Apr 24, 2024",
    endDate: "May 10, 2024",
    status: "Yet to Start",
  },
  {
    id: 2,
    name: "Asian Explorer",
    startDate: "May 15, 2024",
    endDate: "May 30, 2024",
    status: "Started",
  },
  {
    id: 3,
    name: "African Safari",
    startDate: "Jun 05, 2024",
    endDate: "Jun 20, 2024",
    status: "Completed",
  },
  {
    id: 4,
    name: "Australian Outback",
    startDate: "Jul 10, 2024",
    endDate: "Jul 25, 2024",
    status: "Canceled",
  },
];

const getStatusClass = (status) => {
  switch (status) {
    case "Yet to Start":
      return "bg-yellow-200 text-yellow-800";
    case "Started":
      return "bg-blue-200 text-blue-800";
    case "Completed":
      return "bg-green-200 text-green-800";
    case "Canceled":
      return "bg-red-200 text-red-800 border border-red-500";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

function Bookings() {
  // bookings = [];
  if (bookings.length === 0) return <NoBooking />;

  return (
    <div className="px-4 py-12 flex flex-col space-y-6 bg-green-50 overflow-hidden">
      <h3 className="text-3xl font-semibold uppercase text-green-700">
        Bookings
      </h3>

      <div className="w-full shadow-sm shadow-black/20 rounded-md flex flex-col gap-y-0.5 bg-orange-50/80 scrollbar-none overflow-y-auto">
        <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] px-2 bg-white text-lg">
          <span className="p-3">Tour Name</span>
          <span className="p-3">Start</span>
          <span className="p-3">End</span>
          <span className="p-3">Status</span>
        </div>

        {bookings.map((booking) => (
          <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] px-2 bg-white">
            <span className="p-3">{booking.name}</span>
            <span className="p-3">{booking.startDate}</span>
            <span className="p-3">{booking.endDate}</span>
            <span className="p-3">
              <span
                className={`px-2 py-1 text-sm font-semibold rounded ${getStatusClass(
                  booking.status
                )}`}
              >
                {booking.status}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bookings;
