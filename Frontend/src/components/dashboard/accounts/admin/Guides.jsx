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
  _id: (i + 1).toString(),
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

  const [guides, setGuides] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalGuides, setTotalGuides] = useState(0);
  const [loading, setLoading] = useState(true);
  const numberOfEntries = 10;

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        // Example: use filters if needed
        // const { searchQuery, selectedFilters, sortOrder } = filterState;
        // const params = new URLSearchParams();

        // if (searchQuery) params.append("search", searchQuery);
        // if (selectedFilters) {
        //   if (selectedFilters["Date Interval"]) {
        //     const { startDate, endDate } = selectedFilters["Date Interval"];
        //     if (startDate) params.append("startDate", startDate);
        //     if (endDate) params.append("endDate", endDate);
        //   }
        // }
        // if (sortOrder) params.append("sort", sortOrder);

        // params.append("page", currentPage);
        // params.append("limit", numberOfEntries);

        // Fetch guides instead of reviews
        // const response = await getAllGuides(user.token, params.toString());
        // const { data, totalPages: tp, total } = response;

        setGuides(GuidesData); // Replace with real data
        setTotalPages(tp || 1);
        setTotalGuides(total || 0);
        setLoading(false);
      } catch (error) {
        // Optional: handle error
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, [currentPage, filterState]);

  const getKeyFromLabel = (label) =>
    label.toLowerCase().replace(/\s+/g, "").replace(/\./g, "");

  const transformedGuides = guides.map((guide, idx) => {
    const row = {};
    headers.forEach((header, i) => {
      const key = getKeyFromLabel(header.label);

      if (key === "sno") {
        row[key] = (currentPage - 1) * numberOfEntries + idx + 1;
      } else {
        row[key] = guide[key] || "-";
      }
    });

    row._id = guide._id;
    return row;
  });

  return (
    <div className="p-4">
      {/* Header Section */}
      <UsersHeader
        title="Guides"
        totalCount={transformedGuides.length}
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
      {transformedGuides.length > 0 ? (
        <GuidesTable
          headers={headers}
          data={transformedGuides}
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
