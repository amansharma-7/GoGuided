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
  _id: (i + 1).toString(),
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

  const [jobRequests, setJobRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobRequests, setTotalJobRequests] = useState(0);
  const [loading, setLoading] = useState(true);
  const numberOfEntries = 10;

  useEffect(() => {
    const fetchJobRequests = async () => {
      try {
        // Example: you can use filterState if needed
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

        // Fetch job requests instead of guides or reviews
        // const response = await getAllJobRequests(user.token, params.toString());
        // const { data, totalPages: tp, total } = response;

        setJobRequests(jobRequestsData); // Replace with actual fetched data
        setTotalPages(tp || 1);
        setTotalJobRequests(total || 0);
        setLoading(false);
      } catch (error) {
        // Optional error handling
      } finally {
        setLoading(false);
      }
    };

    fetchJobRequests();
  }, [currentPage, filterState]);

  const getKeyFromLabel = (label) =>
    label.toLowerCase().replace(/\s+/g, "").replace(/\./g, "");

  const transformedJobRequests = jobRequests.map((request, idx) => {
    const row = {};
    headers.forEach((header, i) => {
      const key = getKeyFromLabel(header.label);

      if (key === "sno") {
        row[key] = (currentPage - 1) * numberOfEntries + idx + 1;
      } else if (key === "date") {
        row[key] = new Date(request.date).toLocaleDateString();
      } else {
        row[key] = request[key] || "-";
      }
    });

    row._id = request._id;
    return row;
  });

  return (
    <div className="p-4 flex flex-col bg-gray-100 min-h-screen">
      {/* Job Requests Header */}
      <JobsHeader
        title="Job Requests"
        totalCount={transformedJobRequests.length}
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
            label: "Job Title",
            children: [
              { label: "Job 1", value: "Job 1" },
              { label: "Job 2", value: "Job 2" },
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
      {transformedJobRequests.length > 0 ? (
        <JobTable
          headers={headers}
          data={transformedJobRequests}
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
