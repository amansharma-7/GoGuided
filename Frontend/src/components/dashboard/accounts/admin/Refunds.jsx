import RefundsHeader from "../../../common/DashboardHeader";
import RefundsTable from "../../../dashboard/Table";
import { useEffect, useState } from "react";
import NoResult from "../../../../pages/NoResult";

const headers = [
  { label: "S No.", width: "5%" },
  { label: "Tour Name", width: "20%" },
  { label: "Customer", width: "15%" },
  { label: "Email", width: "20%" },
  { label: "Refund Date", width: "15%" },
  { label: "Amount", width: "10%" },
  { label: "Status", width: "15%" },
];

const filterOptions = [
  {
    label: "Refund Status",
    children: [
      { label: "Pending", value: "pending" },
      { label: "Completed", value: "completed" },
      { label: "Rejected", value: "rejected" },
    ],
  },
  {
    label: "Tour",
    children: [
      { label: "Safari Adventure", value: "Safari Adventure" },
      { label: "Mountain Hike", value: "Mountain Hike" },
      { label: "Beach Holiday", value: "Beach Holiday" },
      { label: "City Tour", value: "City Tour" },
    ],
  },
  {
    label: "Date Filter",
    children: [
      { label: "This Month", value: "this_month" },
      { label: "This Year", value: "this_year" },
    ],
  },

  {
    label: "Date Interval",
    children: [
      { label: "Start Date", value: "startDate", type: "date" },
      { label: "End Date", value: "endDate", type: "date" },
    ],
  },
];

const refundsData = Array.from({ length: 50 }, (_, i) => ({
  _id: (i + 1).toString(),
  tourName: ["Safari Adventure", "Mountain Hike", "Beach Holiday", "City Tour"][
    i % 4
  ],
  customer: ["John Doe", "Jane Smith", "Sam Wilson", "Lucy Heart"][i % 4],
  email: [
    "john@example.com",
    "jane@example.com",
    "sam@example.com",
    "lucy@example.com",
  ][i % 4],
  refundDate: `2023-09-${(i % 30) + 1}`.padStart(9, "0"),
  amount: (Math.random() * 100).toFixed(2),
  status: ["completed", "pending", "rejected"][i % 3],
}));

const buildQueryParams = (state) => {
  const params = {};

  if (state.searchQuery) params.q = state.searchQuery;

  const filters = state.selectedFilters;

  for (const key in filters) {
    if (key === "Date Interval") {
      const { startDate, endDate } = filters[key];
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
    } else {
      const normalizedKey = key.replace(/\s+/g, "");
      params[normalizedKey] = filters[key];
    }
  }

  return params;
};

function Refunds() {
  const [filterState, setFilterState] = useState({
    searchQuery: "",
    sortOrder: "asc",
    selectedFilters: {},
  });

  const [refunds, setRefunds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRefunds, setTotalRefunds] = useState(0);
  const [loading, setLoading] = useState(true);
  const numberOfEntries = 10;

  useEffect(() => {
    const fetchRefunds = async () => {
      try {
        // Example: you might use filterState for searching/sorting
        // const { searchQuery, selectedFilters, sortOrder } = filterState;
        // const params = new URLSearchParams();

        // if (searchQuery) params.append("search", searchQuery);
        // if (selectedFilters && selectedFilters["Date Interval"]) {
        //   const { startDate, endDate } = selectedFilters["Date Interval"];
        //   if (startDate) params.append("startDate", startDate);
        //   if (endDate) params.append("endDate", endDate);
        // }
        // if (sortOrder) params.append("sort", sortOrder);

        // params.append("page", currentPage);
        // params.append("limit", numberOfEntries);

        // Replace with actual API call
        // const response = await getAllRefunds(user.token, params.toString());
        // const { data, totalPages: tp, total } = response;

        setRefunds(refundsData); // Replace with actual fetched data
        setTotalPages(tp || 1);
        setTotalRefunds(total || 0);
        setLoading(false);
      } catch (error) {
        // Optional: log or handle error
      } finally {
        setLoading(false);
      }
    };

    fetchRefunds();
  }, [currentPage, filterState]);

  const getKeyFromLabel = (label) =>
    label.toLowerCase().replace(/\s+/g, "").replace(/\./g, "");

  const transformedRefunds = refunds.map((refund, idx) => {
    const row = {};
    headers.forEach((header, i) => {
      const key = getKeyFromLabel(header.label);

      if (key === "sno") {
        row[key] = (currentPage - 1) * numberOfEntries + idx + 1;
      } else if (key === "refunddate") {
        row[key] = new Date(refund.refundDate).toLocaleDateString();
      } else if (key === "tourname") {
        row[key] = refund.tourName;
      } else {
        row[key] = refund[key] || "-";
      }
    });

    row._id = refund._id;
    return row;
  });

  return (
    <div className="px-4 py-4">
      <RefundsHeader
        title="Refunds"
        totalCount={transformedRefunds.length}
        filterState={filterState}
        setFilterState={setFilterState}
        filterOptions={filterOptions}
      />

      {transformedRefunds.length > 0 ? (
        <RefundsTable
          headers={headers}
          data={transformedRefunds}
          itemsPerPage={9}
        />
      ) : (
        <NoResult />
      )}
    </div>
  );
}

export default Refunds;
