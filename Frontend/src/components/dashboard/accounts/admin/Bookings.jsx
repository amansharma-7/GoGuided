import BookingsHeader from "../../../common/DashboardHeader";
import BookingsTable from "../../../dashboard/Table";
import { useEffect, useState } from "react";

const headers = [
  { label: "S No.", width: "10%" },
  { label: "Tour Name", width: "20%" },
  { label: "Customer", width: "20%" },
  { label: "Email", width: "25%" },
  { label: "Date", width: "15%" },
  { label: "Status", width: "10%" },
];

const bookingsData = Array.from({ length: 50 }, (_, i) => ({
  id: (i + 1).toString(),
  tour: ["Safari Adventure", "Mountain Hike", "Beach Holiday", "City Tour"][
    i % 4
  ],
  customer: ["John Doe", "Jane Smith", "Sam Wilson", "Lucy Heart"][i % 4],
  email: [
    "john@example.com",
    "jane@example.com",
    "sam@example.com",
    "lucy@example.com",
  ][i % 4],
  date: `2023-09-${(i % 30) + 1}`.padStart(9, "0"), // Dates from 2023-09-01 to 2023-09-30
  status: ["completed", "ongoing", "canceled", "upcoming"][i % 4],
}));

function Bookings() {
  const [filterState, setFilterState] = useState({
    searchQuery: "",
    sortOrder: "asc",
    selectedFilters: [],
  });

  const [bookings, setBookings] = useState(bookingsData);

  useEffect(() => {
    function fetchBookings(query) {
      return bookingsData.filter(
        (booking) =>
          !query ||
          booking.tour.toLowerCase().includes(query.toLowerCase()) ||
          booking.customer.toLowerCase().includes(query.toLowerCase()) ||
          booking.email.toLowerCase().includes(query.toLowerCase())
      );
    }

    const filteredBookings = fetchBookings(filterState.searchQuery);
    setBookings(filteredBookings);
  }, [filterState.searchQuery, filterState.selectedFilters]);

  const sortedBookings = [...bookings].sort((a, b) => {
    return filterState.sortOrder === "asc"
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="px-4 py-4">
      <BookingsHeader
        title="Bookings"
        totalCount={sortedBookings.length}
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
            label: "Date Filter",
            children: [
              { label: "This Month", value: "this_month" },
              { label: "This Year", value: "this_year" },
              {
                label: "Custom Range",
                value: "custom_range",
                type: "date_picker",
              },
            ],
          },
        ]}
      />

      <BookingsTable headers={headers} data={sortedBookings} itemsPerPage={9} />
    </div>
  );
}

export default Bookings;
