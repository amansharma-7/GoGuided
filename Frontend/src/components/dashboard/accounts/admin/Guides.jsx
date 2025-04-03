import NoResult from "../../../../pages/NoResult";
import UsersHeader from "../../../common/DashboardHeader";
import GuidesTable from "../../../dashboard/Table";
import { useEffect, useState } from "react";

const headers = [
  { label: "S No.", width: "10%" },
  { label: "Name", width: "20%" },
  { label: "Email", width: "25%" },
  { label: "Number", width: "15%" },
  { label: "Role", width: "15%" },
  { label: "Status", width: "15%" },
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
  const [filterState, setFilterState] = useState({
    searchQuery: "",
    sortOrder: "asc",
    selectedFilters: [],
  });

  const [guides, setGuides] = useState(GuidesData);

  useEffect(() => {
    function fetchGuides(query) {
      return GuidesData.filter(
        (guide) =>
          !query ||
          guide.name.toLowerCase().includes(query.toLowerCase()) ||
          guide.email.toLowerCase().includes(query.toLowerCase())
      );
    }

    const filteredGuides = fetchGuides(filterState.searchQuery);
    setGuides(filteredGuides);
  }, [filterState.searchQuery, filterState.selectedFilters]);

  const sortedGuides = [...guides].sort((a, b) => {
    return filterState.sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });
  return (
    <div className="p-4">
      {/* Header Section */}
      <UsersHeader
        title="Guides"
        totalCount={sortedGuides.length}
        filterState={filterState}
        setFilterState={setFilterState}
        filterOptions={[
          {
            label: "Activity",
            children: [
              { label: "Below 3 Tours", value: "below_3" },
              { label: "Below 5 Tours", value: "below_5" },
              { label: "Below 10 Tours", value: "below_10" },
              { label: "Above 10 Tours", value: "above_10" },
              { label: "No Tours Conducted", value: "no_tours" },
            ],
          },
          {
            label: "Status",
            children: [
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
              { label: "Suspended", value: "suspended" },
              { label: "Free", value: "free" },
              { label: "Assigned", value: "assigned" },
            ],
          },
        ]}
      />
      {sortedGuides.length > 0 ? (
        <GuidesTable
          headers={headers}
          data={sortedGuides}
          itemsPerPage={9}
          navToBy={"id"}
        />
      ) : (
        <NoResult />
      )}
    </div>
  );
}

export default Guides;
