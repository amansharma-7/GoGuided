import { useState } from "react";
import BookingsHeader from "../../../common/DashboardHeader";
import BookingsTable from "../../Table";
import { useParams } from "react-router";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const data = AllData.filter((item) => item.status === params.status);

  const bookings = [...data].sort((a, b) => {
    return sortOrder === "asc"
      ? new Date(a.date) - new Date(b.date) // Ascending order
      : new Date(b.date) - new Date(a.date); // Descending order
  });

  return (
    <div className="px-4 py-4">
      {/* Header Section */}

      <BookingsHeader
        title={`Bookings`}
        totalCount={bookings.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSortOrder={setSortOrder}
        sortOrder={sortOrder}
      />

      <BookingsTable headers={headers} data={bookings} itemsPerPage={9} />
    </div>
  );
}

export default Bookings;
