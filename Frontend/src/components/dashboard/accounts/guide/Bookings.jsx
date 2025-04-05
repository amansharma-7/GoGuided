import { useEffect, useState } from "react";
import BookingsHeader from "../../../common/DashboardHeader";
import BookingsTable from "../../Table";
import { useParams } from "react-router";
import NoResult from "../../../../pages/NoResult";

const AllData = ["completed", "ongoing", "upcoming"].flatMap((status) =>
  Array.from({ length: 10 }, (_, i) => ({
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
    date: `2023-09-${(i % 30) + 1}`.padStart(9, "0"),
    status,
  }))
);

const headers = [
  { label: "S No.", width: "10%" },
  { label: "Tour Name", width: "20%" },
  { label: "Customer", width: "20%" },
  { label: "Email", width: "25%" },
  { label: "Date", width: "15%" },
  { label: "Status", width: "10%" },
];

function Bookings() {
  const params = useParams();
  const [filterState, setFilterState] = useState({
    searchQuery: "",
    sortOrder: "asc",
    selectedFilters: [],
  });

  const data = AllData.filter((item) => item.status === params.status);

  const [bookings, setBookings] = useState(data);

  useEffect(() => {
    function fetchBookings(query) {
      return bookings.filter(
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
      {/* Header Section */}

      <BookingsHeader
        title={`Bookings`}
        filterState={filterState}
        setFilterState={setFilterState}
        totalCount={sortedBookings.length}
        filterOptions={[
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
