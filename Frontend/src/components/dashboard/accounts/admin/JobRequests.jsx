import NoResult from "../../../../pages/NoResult";
import JobsHeader from "../../../common/DashboardHeader";
import JobTable from "../../Table";
import { useEffect, useState } from "react";
const headers = [
  { label: "S No.", width: "10%" },
  { label: "Name", width: "25%" },
  { label: "Email", width: "25%" },
  { label: "Date", width: "20%" },
  { label: "Status", width: "20%" },
];

const jobRequestsData = Array.from({ length: 50 }, (_, i) => ({
  id: (i + 1).toString(),
  name: ["John Doe", "Jane Smith", "Sam Wilson", "Lucy Heart"][i % 4],
  email: [
    "john@example.com",
    "jane@example.com",
    "sam@example.com",
    "lucy@example.com",
  ][i % 4],
  date: `2023-09-${(i % 30) + 1}`.padStart(9, "0"), // Ensuring a proper date format
  status: ["Pending", "Approved", "Rejected"][i % 3], // Rotating statuses
}));

function JobRequests() {
  const [filterState, setFilterState] = useState({
    searchQuery: "",
    sortOrder: "asc",
    selectedFilters: [],
  });
  const [jobRequests, setJobRequests] = useState(jobRequestsData);

  useEffect(() => {
    function fetchJobRequests(query) {
      return jobRequests.filter(
        (request) =>
          !query ||
          request.name.toLowerCase().includes(query.toLowerCase()) ||
          request.email.toLowerCase().includes(query.toLowerCase())
      );
    }

    const filteredRequests = fetchJobRequests(filterState.searchQuery);
    setJobRequests(filteredRequests);
  }, [filterState.searchQuery, filterState.selectedFilters]);

  const sortedRequests = [...jobRequests].sort((a, b) => {
    return filterState.sortOrder === "asc"
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="p-4 flex flex-col bg-gray-100 min-h-screen">
      {/* Job Requests Header */}
      <JobsHeader
        title="Job Requests"
        totalCount={sortedRequests.length}
        filterState={filterState}
        setFilterState={setFilterState}
        filterOptions={[
          {
            label: "Experience Level",
            children: [
              { label: "Above 1 Year", value: "above_1" },
              { label: "Above 2 Years", value: "above_2" },
              { label: "Above 3 Years", value: "above_3" },
              { label: "Above 5 Years", value: "above_5" },
              { label: "Below 1 Year", value: "below_1" },
              { label: "Below 2 Years", value: "below_2" },
              { label: "Below 3 Years", value: "below_3" },
              { label: "Fresher", value: "fresher" },
            ],
          },
          {
            label: "Status",
            children: [
              { label: "Pending", value: "pending" },
              { label: "Approved", value: "approved" },
              { label: "Rejected", value: "rejected" },
            ],
          },
          {
            label: "Job Type",
            children: [
              { label: "Full-Time", value: "fullTime" },
              { label: "Part-Time", value: "partTime" },
              { label: "Internship", value: "internship" },
              { label: "Contract", value: "contract" },
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
      {sortedRequests.length > 0 ? (
        <JobTable
          headers={headers}
          data={sortedRequests}
          itemsPerPage={9}
          navToBy={"id"}
        />
      ) : (
        <NoResult />
      )}
    </div>
  );
}

export default JobRequests;
