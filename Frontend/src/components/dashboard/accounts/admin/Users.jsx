import UsersHeader from "../../../common/DashboardHeader";
import UsersTable from "../../../dashboard/Table";
import { useState } from "react";

const headers = ["S No.", "Name", "Email", "Number", "Last Visit"];

const usersData = Array.from({ length: 50 }, (_, i) => ({
  id: (i + 1).toString(),
  name: ["John Doe", "Jane Smith", "Sam Wilson", "Lucy Heart"][i % 4],
  email: [
    "john@example.com",
    "jane@example.com",
    "sam@example.com",
    "lucy@example.com",
  ][i % 4],
  number: ["1234567890", "9876543210", "4561237890", "7894561230"][i % 4],
  lastVisit: `2024-03-${(i % 30) + 1}`.padStart(10, "0"),
}));

function UsersList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedFilters, setSelectedFilters] = useState({});

  return (
    <div className="p-4">
      {/* Header Section */}
      <UsersHeader
        title="Users"
        totalCount={usersData.length} // Since we're showing one user
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

      <UsersTable
        headers={headers}
        bookings={usersData}
        gridCols="grid-cols-[1fr_2.5fr_2.5fr_2fr_2fr]" 
        itemsPerPage={10}
      />
    </div>
  );
}

export default UsersList;
