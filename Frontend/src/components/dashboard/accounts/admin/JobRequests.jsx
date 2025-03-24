import UsersHeader from "../../../common/DashboardHeader";
import UsersTable from "../../Table";
import { useState } from "react";

function JobRequests() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedFilters, setSelectedFilters] = useState({});

  const headers = [
    { label: "S No.", width: "10%" },
    { label: "Name", width: "25%" },
    { label: "Email", width: "25%" },
    { label: "Date", width: "20%" },
    { label: "Status", width: "20%" },
  ];

  // const headers = ["S No.", "Name", "Email", "Date ", "Status"];

  const jobRequestsData = Array.from({ length: 50 }, (_, i) => ({
    id: (i + 1).toString(),
    name: ["John Doe", "Jane Smith", "Sam Wilson", "Lucy Heart"][i % 4],
    email: [
      "john@example.com",
      "jane@example.com",
      "sam@example.com",
      "lucy@example.com",
    ][i % 4],
    Date: `2024-03-${String((i % 30) + 1).padStart(2, "0")}`, // Ensuring a proper date format
    status: ["Pending", "Approved", "Rejected"][i % 3], // Rotating statuses
  }));

  return (
    <div className="p-4 flex flex-col bg-gray-100 min-h-screen">
      {/* Job Requests Header */}
      <UsersHeader
        title="Job Requests"
        totalCount={jobRequestsData.length}
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

      {/* Job Requests Table */}
      <UsersTable headers={headers} data={jobRequestsData} itemsPerPage={9} />
    </div>
  );
}

export default JobRequests;
