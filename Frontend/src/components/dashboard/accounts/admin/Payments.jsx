import NoResult from "../../../../pages/NoResult";
import PaymentsHeader from "../../../common/DashboardHeader";
import PaymentsTable from "../../../dashboard/Table";
import { useEffect, useState } from "react";

const headers = [
  { label: "S No.", width: "10%" },
  { label: "User Name", width: "20%" },
  { label: "Email", width: "25%" },
  { label: "Amount", width: "15%" },
  { label: "Date", width: "15%" },
  { label: "Status", width: "15%" },
];

const paymentsData = Array.from({ length: 50 }, (_, i) => ({
  id: (i + 1).toString(),
  name: ["John Doe", "Jane Smith", "Sam Wilson", "Lucy Heart"][i % 4],
  email: [
    "john@example.com",
    "jane@example.com",
    "sam@example.com",
    "lucy@example.com",
  ][i % 4],
  amount: ["$100", "$200", "$150", "$250"][i % 4],
  date: `2023-09-${(i % 30) + 1}`.padStart(9, "0"),
  status: ["Paid", "Pending", "Failed", "Refunded"][i % 4],
}));

function Payments() {
  const [filterState, setFilterState] = useState({
    searchQuery: "",
    sortOrder: "asc",
    selectedFilters: [],
  });

  const [payments, setPayments] = useState(paymentsData);

  useEffect(() => {
    function fetchPayments(query) {
      return paymentsData.filter(
        (payment) =>
          !query ||
          payment.name.toLowerCase().includes(query.toLowerCase()) ||
          payment.email.toLowerCase().includes(query.toLowerCase())
      );
    }

    const filteredPayments = fetchPayments(filterState.searchQuery);
    setPayments(filteredPayments);
  }, [filterState.searchQuery, filterState.selectedFilters]);

  const sortedPayments = [...payments].sort((a, b) => {
    return filterState.sortOrder === "asc"
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="p-4">
      {/* Header Section */}
      <PaymentsHeader
        title="Payments"
        totalCount={sortedPayments.length}
        filterState={filterState}
        setFilterState={setFilterState}
        filterOptions={[
          {
            label: "Status",
            children: [
              { label: "Paid", value: "paid" },
              { label: "Pending", value: "pending" },
              { label: "Failed", value: "failed" },
              { label: "Refunded", value: "refunded" },
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
        ]}
      />
      {sortedPayments.length > 0 ? (
        <PaymentsTable
          headers={headers}
          data={sortedPayments}
          itemsPerPage={9}
          navToBy={null}
        />
      ) : (
        <NoResult />
      )}
    </div>
  );
}

export default Payments;
