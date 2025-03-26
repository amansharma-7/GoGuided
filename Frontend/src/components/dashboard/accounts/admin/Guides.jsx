import UsersHeader from "../../../common/DashboardHeader";
import GuidesTable from "../../../dashboard/Table";
import { useState } from "react";

const headers = [
  { label: "S No.", width: "10%" },
  { label: "Name", width: "20%" },
  { label: "Email", width: "25%" },
  { label: "Number", width: "10%" },
  { label: "Role", width: "15%" },
  { label: "Status", width: "20%" },
];

// const headers = ["S No.", "Name", "Email", "Number", "Role", "Status"];

const GuidesData = Array.from({ length: 50 }, (_, i) => ({
  id: (i + 1).toString(),
  name: ["John Doe", "Jane Smith", "Sam Wilson", "Lucy Heart"][i % 4],
  email: [
    "john@example.com",
    "jane@example.com",
    "sam@example.com",
    "lucy@example.com",
  ][i % 4],
  number: ["1234567890", "9876543210", "4561237890", "7894561230"][i % 4],
  role: i % 2 === 0 ? "Guide" : "Leader",
  status: i % 2 === 0 ? "Free" : "Assigned", // Alternating status for variety
}));

function Guides() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedFilters, setSelectedFilters] = useState({});

  return (
    <div className="p-4">
      {/* Header Section */}
      <UsersHeader
        title="Guides"
        totalCount={GuidesData.length}
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

      <GuidesTable headers={headers} data={GuidesData} itemsPerPage={9} />
    </div>
  );
}

export default Guides;
