import RefundsHeader from "../../../common/DashboardHeader";
import RefundsTable from "../../../dashboard/Table";
import { useEffect, useState } from "react";
import NoResult from "../../../../pages/NoResult";

const headers = [
  { label: "S No.", width: "5%" },
  { label: "Tour Name", width: "20%" },
  { label: "Customer", width: "15%" },
  { label: "Email", width: "20%" },
  { label: "Refund Date", width: "10%" },
  { label: "Amount", width: "10%" },
  { label: "Status", width: "10%" },
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

  const [refunds, setRefunds] = useState(refundsData);

  useEffect(() => {
    function fetchRefunds(query) {
      return refundsData.filter(
        (refund) =>
          !query ||
          refund.tour.toLowerCase().includes(query.toLowerCase()) ||
          refund.customer.toLowerCase().includes(query.toLowerCase()) ||
          refund.email.toLowerCase().includes(query.toLowerCase())
      );
    }

    const filteredRefunds = fetchRefunds(filterState.searchQuery);
    setRefunds(filteredRefunds);
  }, [filterState.searchQuery, filterState.selectedFilters]);

  const sortedRefunds = [...refunds].sort((a, b) => {
    return filterState.sortOrder === "asc"
      ? new Date(a.refundDate) - new Date(b.refundDate)
      : new Date(b.refundDate) - new Date(a.refundDate);
  });

  return (
    <div className="px-4 py-4">
      <RefundsHeader
        title="Refunds"
        totalCount={sortedRefunds.length}
        filterState={filterState}
        setFilterState={setFilterState}
        filterOptions={filterOptions}
      />

      {sortedRefunds.length > 0 ? (
        <RefundsTable headers={headers} data={sortedRefunds} itemsPerPage={9} />
      ) : (
        <NoResult />
      )}
    </div>
  );
}

export default Refunds;
