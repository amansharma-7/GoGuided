import BookingsHeader from "../../../common/DashboardHeader";
import BookingsTable from "../../../dashboard/Table";
import { useEffect, useState } from "react";
import NoResult from "../../../../pages/NoResult";
import axios from "axios";

const headers = [
  { label: "S No.", width: "10%" },
  { label: "Tour Name", width: "20%" },
  { label: "Customer", width: "20%" },
  { label: "Email", width: "25%" },
  { label: "Date", width: "15%" },
  { label: "Status", width: "10%" },
];

const filterOptions = [
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
    label: "Date Filter",
    children: [
      { label: "This Month", value: "this_month" },
      { label: "This Year", value: "this_year" },
    ],
  },

  {
    label: "Date Interval",
    children: [
      { label: "Start Date", value: "startDate", type: "date" },
      { label: "End Date", value: "endDate", type: "date" },
    ],
  },
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

const buildQueryParams = (state) => {
  const params = {};

  if (state.searchQuery) params.q = state.searchQuery;

  const filters = state.selectedFilters;

  for (const key in filters) {
    if (key === "Date Interval") {
      const { startDate, endDate } = filters[key];
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
    } else {
      // Replace spaces with camelCase or underscore if your backend doesn't support spaces
      const normalizedKey = key.replace(/\s+/g, "");
      params[normalizedKey] = filters[key];
    }
  }

  return params;
};

function Bookings() {
  const [filterState, setFilterState] = useState({
    searchQuery: "",
    sortOrder: "asc",
    selectedFilters: {},
  });

  console.log(filterState.searchQuery, filterState.selectedFilters);

  const [bookings, setBookings] = useState(bookingsData);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const params = buildQueryParams(filterState);

  //     try {
  //       const response = axios.get("http://localhost:5000/api/bookings", {
  //         params,
  //       });
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error("GET request failed:", error);
  //     }
  //   };

  //   fetchData();
  // }, [filterState.searchQuery, filterState.selectedFilters]);

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
<<<<<<< HEAD
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
            label: "Date Interval",
            children: [
              { label: "Start Date", value: "startDate", type: "date" },
              { label: "End Date", value: "endDate", type: "date" },
            ],
          },
        ]}
      />
=======
        filterOptions={filterOptions}
      />

>>>>>>> 0da78bc720cff9587a052f02c3915b0fed7c264e
      {sortedBookings.length > 0 ? (
        <BookingsTable
          headers={headers}
          data={sortedBookings}
          itemsPerPage={9}
        />
      ) : (
        <NoResult />
      )}
    </div>
  );
}

export default Bookings;
