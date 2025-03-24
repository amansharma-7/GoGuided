import { useState } from "react";
import Header from "../../../common/Header";
import Table from "../../Table";

const headers = ["S No.", "Tour Name", "Customer", "Email", "Date", "Status"];
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

function TourBookings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedFilters, setSelectedFilters] = useState({});

  return (
    <div className="p-4">
      <Header
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
      <Table
        headers={headers}
        bookings={bookingsData}
        gridCols="grid-cols-[1fr_2.5fr_1.5fr_2.5fr_1.25fr_1.25fr]" // Adjust grid sizes to match columns
        itemsPerPage={10}
      />
    </div>
  );
}

export default TourBookings;
