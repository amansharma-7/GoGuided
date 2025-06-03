import BookingsHeader from "../../../common/DashboardHeader";
import BookingsTable from "../../../dashboard/Table";
import { useEffect, useState } from "react";
import NoResult from "../../../../pages/NoResult";

const headers = [
  { label: "S No.", width: "10%" },
  { label: "Tour", width: "20%" },
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
  _id: (i + 1).toString(),
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
    selectedFilters: {},
  });

  const [bookings, setBookings] = useState([]);
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

        setBookings(bookingsData);
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

  const getKeyFromLabel = (label) =>
    label.toLowerCase().replace(/\s+/g, "").replace(/\./g, "");

  const transformedBookings = bookings.map((user, idx) => {
    const row = {};
    headers.forEach((header, i) => {
      const key = getKeyFromLabel(header.label);
      if (key === "sno") {
        row[key] = (currentPage - 1) * numberOfEntries + idx + 1;
      } else {
        row[key] = user[key] || "-";
      }
    });

    row._id = user._id;
    return row;
  });

  return (
    <div className="px-4 py-4">
      <BookingsHeader
        title="Bookings"
        totalCount={transformedBookings.length}
        filterState={filterState}
        setFilterState={setFilterState}
        filterOptions={filterOptions}
      />

      {transformedBookings.length > 0 ? (
        <BookingsTable
          headers={headers}
          data={transformedBookings}
          itemsPerPage={9}
        />
      ) : (
        <NoResult />
      )}
    </div>
  );
}

export default Bookings;
