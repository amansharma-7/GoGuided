import { useState } from "react";
import useSafeNavigate from "../../utils/useSafeNavigate";

function getStatusStyle(status) {
  switch (status) {
    case "Paid":
    case "Completed":
      return "bg-green-100 text-green-700 border-green-400 px-2 py-1 rounded";
    case "Pending":
    case "Ongoing":
      return "bg-yellow-100 text-yellow-700 border-yellow-400 px-2 py-1 rounded";
    case "Failed":
    case "Rejected": // 🔹 Added styling for rejected
      return "bg-red-100 text-red-700 border-red-400 px-2 py-1 rounded";
    case "Refunded":
    case "Upcoming":
      return "bg-blue-100 text-blue-700 border-blue-400 px-2 py-1 rounded";
    case "Free":
      return "bg-gray-100 text-gray-700 border-gray-400 px-2 py-1 rounded";
    case "Assigned":
      return "bg-purple-100 text-purple-700 border-purple-400 px-2 py-1 rounded";
    case "Approved": // 🔹 Added styling for approved
      return "bg-green-200 text-green-800 border-green-500 px-2 py-1 rounded font-semibold";
    default:
      return "bg-red-100 text-red-700 border-red-400 px-2 py-1 rounded";
  }
}

function BookingsTable({ headers, bookings, gridCols, itemsPerPage = 5 }) {
  const navigate = useSafeNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(bookings.length / itemsPerPage);

  // Slice bookings based on the current page
  const currentBookings = bookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-4 overflow-x-auto">
      {/* Dynamic Table Header */}
      <div
        className={`grid ${gridCols} bg-green-200 text-green-900 font-semibold p-2 rounded-md`}
      >
        {headers.map((header, index) => (
          <div key={index}>{header}</div>
        ))}
      </div>

      {/* Dynamic Booking Entries */}
      <div className="divide-y divide-gray-200 border border-gray-200 rounded-md">
        {currentBookings.length > 0 ? (
          currentBookings.map((booking, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`${booking.id}`)}
              className={`grid ${gridCols} p-2 items-center text-left hover:bg-green-100 transition cursor-pointer`}
            >
              {Object.values(booking).map((value, i) => (
                <div key={i} className="min-w-0">
                  {/* Conditional styling for "status" */}
                  {headers[i].toLowerCase() === "status" ? (
                    <span
                      className={`px-3 py-1 text-sm rounded-md border ${getStatusStyle(
                        value
                      )}`}
                    >
                      {value}
                    </span>
                  ) : (
                    <span className="truncate overflow-hidden whitespace-nowrap block">
                      {value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="text-left text-gray-600 p-3">No bookings found.</div>
        )}
      </div>

      {/* Green-Themed Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            Prev
          </button>
          <span className="text-green-700 font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default BookingsTable;
