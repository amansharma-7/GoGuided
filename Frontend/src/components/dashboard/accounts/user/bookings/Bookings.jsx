import { useState } from "react";
import {
  FaTrash,
  FaChevronDown,
  FaChevronUp,
  FaBullhorn,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import BookingsHeader from "../../../../common/DashboardHeader";
import ConfirmationModal from "../../../../common/ConfirmationModal";

const bookings = [
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
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedFilters, setSelectedFilters] = useState({});
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

  return (
    <div className="p-4 pb-20 grid grid-cols-1 gap-2 bg-green-50 overflow-y-auto h-full scrollbar-none">
      <BookingsHeader
        title="Your Bookings"
        totalCount={bookings.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSortOrder={setSortOrder}
        sortOrder={sortOrder}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        filterOptions={[
          {
            label: "Category 1",
            children: [
              { label: "Option 1", value: "opt1" },
              { label: "Option 2", value: "opt2" },
            ],
          },
          {
            label: "Category 2",
            children: [
              { label: "Option A", value: "optA" },
              { label: "Option B", value: "optB" },
            ],
          },
        ]}
      />

      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="bg-white rounded-2xl shadow-lg p-6 border-t-2 border-green-500"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-green-800 mb-2">
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
          <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md mb-4 shadow-sm">
            <p className="text-green-800">
              <strong>Status:</strong>{" "}
              {getStatus(booking.startDate, booking.endDate)}
            </p>
          </div>
          {expandedBooking === booking.id && (
            <div className="grid grid-cols-2 gap-4 p-4 rounded-md shadow-sm">
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
              <p className="text-green-800 font-medium">
                Tour Guides:{" "}
                <span className="font-normal text-green-700">
                  {booking.tourGuide[0]}, {booking.tourGuide[1]}
                </span>
              </p>
            </div>
          )}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => handleCancel(booking.id)}
              className={`flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600
                  
                   "cursor-pointer"
              }`}
            >
              <FaTrash size={16} /> Cancel Booking
            </button>
            <button
              onClick={() => viewAnnouncements(booking.tourId)}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer"
            >
              <FaBullhorn size={16} /> View Announcements
            </button>
          </div>
        </div>
      ))}

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
