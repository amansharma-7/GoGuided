import { useEffect, useState } from "react";
import {
  FaTrash,
  FaChevronDown,
  FaChevronUp,
  FaBullhorn,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import BookingsHeader from "../../../../common/DashboardHeader";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import NoResult from "../../../../../pages/NoResult";
import NoBooking from "./NoBooking";

const bookingsData = [
  {
    id: 1,
    tourName: "Forest Adventure",
    startDate: "2025-04-01",
    endDate: "2025-04-06",
    tourId: "forest-adventure",
    tourGuide: ["Aman Sharma", "Sudhir Sharma"],
  },
  {
    id: 2,
    tourName: "Mountain Hiking",
    startDate: "2025-06-10",
    endDate: "2025-06-17",
    tourId: "mountain-hiking",
    tourGuide: ["Aman Sharma", "Sudhir Sharma"],
  },
  {
    id: 3,
    tourName: "Safari Exploration",
    startDate: "2025-03-25",
    endDate: "2025-03-28",
    tourId: "safari-exploration",
    tourGuide: ["Aman Sharma", "Sudhir Sharma"],
  },
];

const getStatus = (startDate, endDate) => {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (today < start) return "Upcoming";
  if (today >= start && today <= end) return "Ongoing";
  return "Completed";
};

export default function Bookings() {
  const [filterState, setFilterState] = useState({
    searchQuery: "",
    sortOrder: "asc",
    selectedFilters: [],
  });

  const [bookings, setBookings] = useState([]);

  const navigate = useNavigate(); // For navigation
  const [expandedBooking, setExpandedBooking] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    bookingId: null,
  });

  const toggleAccordion = (id) => {
    setExpandedBooking(expandedBooking === id ? null : id);
  };

  const handleCancel = (id) => {
    setDeleteConfirm({ show: true, bookingId: id });
  };

  const confirmCancel = () => {
    setDeleteConfirm({ show: false, bookingId: null });
    // Add cancellation logic here
  };

  const cancelDelete = () => {
    setDeleteConfirm({ show: false, bookingId: null });
  };

  const viewAnnouncements = (tourId) => {
    navigate(`announcements/${tourId}`); // Navigate to the announcements page
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const numberOfEntries = 10;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        //   const { searchQuery, selectedFilters, sortOrder } = filterState;
        //   const params = new URLSearchParams();

        //   if (searchQuery) {
        //     params.append("search", searchQuery);
        //   }

        //   if (selectedFilters) {
        //     if (selectedFilters["Date Interval"]) {
        //       const { startDate, endDate } = selectedFilters["Date Interval"];
        //       if (startDate) params.append("startDate", startDate);
        //       if (endDate) params.append("endDate", endDate);
        //     }
        //   }

        //   if (sortOrder) {
        //     params.append("sort", sortOrder);
        //   }

        //   params.append("page", currentPage);
        //   params.append("limit", numberOfEntries);

        //   // getting all users
        //   const response = await getAllUsers(user.token, params.toString());

        //   const { data } = response;

        setBookings(bookingsData); // Replace with actual API call
        // setTotalPages(response.totalPages);
        // setTotalUsers(response.total);
        setLoading(false);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [currentPage, filterState]);

  if (!bookings.length) {
    return <NoBooking />;
  }

  return (
    <div className="p-4 sm:px-6 md:px-10 pb-24 grid grid-cols-1 gap-4 bg-green-50 overflow-y-auto h-full scrollbar-none">
      {/* Bookings Header */}
      <BookingsHeader
        title="Your Bookings"
        totalCount={bookings.length}
        filterState={filterState}
        setFilterState={setFilterState}
        filterOptions={[
          {
            label: "Booking Status",
            children: [
              { label: "Upcoming", value: "upcoming" },
              { label: "Ongoing", value: "ongoing" },
              { label: "Cancelled", value: "cancelled" },
              { label: "Completed", value: "completed" },
            ],
          },
          {
            label: "Tour",
            children: [
              { label: "tour1", value: "tour1" },
              { label: "tour2", value: "tour2" },
              { label: "tour3", value: "tour3" },
            ],
          },
          {
            label: "Date Interval",
            children: [
              { label: "Start Date", value: "startDate", type: "date" },
              { label: "End Date", value: "endDate", type: "date" },
            ],
          },
        ]}
      />

      {bookings.length > 0 ? (
        <>
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border-t-2 border-green-500"
            >
              {/* Booking Header */}
              <div className="flex justify-between items-center flex-wrap gap-y-2">
                <h2 className="text-xl sm:text-2xl font-semibold text-green-800">
                  {booking.tourName}
                </h2>
                <button
                  onClick={() => toggleAccordion(booking.id)}
                  className="text-green-800 hover:text-green-600 transition cursor-pointer"
                >
                  {expandedBooking === booking.id ? (
                    <FaChevronUp size={20} />
                  ) : (
                    <FaChevronDown size={20} />
                  )}
                </button>
              </div>

              {/* Booking Status */}
              <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md mb-4 shadow-sm text-sm sm:text-base">
                <p className="text-green-800">
                  <strong>Status:</strong>{" "}
                  {getStatus(booking.startDate, booking.endDate)}
                </p>
              </div>

              {/* Accordion Expanded Details */}
              {expandedBooking === booking.id && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-md shadow-sm text-sm sm:text-base">
                  <p className="text-green-800 font-medium">
                    Start Date:{" "}
                    <span className="font-normal text-green-700">
                      {booking.startDate}
                    </span>
                  </p>
                  <p className="text-green-800 font-medium">
                    End Date:{" "}
                    <span className="font-normal text-green-700">
                      {booking.endDate}
                    </span>
                  </p>
                  <p className="text-green-800 font-medium sm:col-span-2">
                    Tour Guides:{" "}
                    <span className="font-normal text-green-700">
                      {booking.tourGuide.join(", ")}
                    </span>
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 w-full items-center">
                <button
                  onClick={() => viewAnnouncements(booking.tourId)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  <FaBullhorn size={16} /> View Announcements
                </button>

                {getStatus(booking.startDate, booking.endDate) ===
                  "Upcoming" && (
                  <button
                    onClick={() => handleCancel(booking.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    <FaTrash size={16} /> Cancel Booking
                  </button>
                )}
              </div>
            </div>
          ))}
        </>
      ) : (
        <NoResult />
      )}

      {/* Cancel Confirmation Modal */}
      {deleteConfirm.show && (
        <ConfirmationModal
          text={"Are you sure you want to cancel this booking?"}
          onConfirm={confirmCancel}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}
