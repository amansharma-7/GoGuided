import BookingsHeader from "../../../common/Header";
import BookingsTable from "../../../dashboard/Table";
import { useState } from "react";

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
  status: ["Completed", "Ongoing", "Canceled", "Upcoming"][i % 4],
}));

function Bookings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedFilters, setSelectedFilters] = useState({});

  return (
    <div className="p-4">
      {/* Header Section */}

      <BookingsHeader
        title="Bookings"
        totalCount={100}
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

      <BookingsTable
        headers={headers}
        bookings={bookingsData}
        itemsPerPage={10}
      />
    </div>
  );
}

export default Bookings;
