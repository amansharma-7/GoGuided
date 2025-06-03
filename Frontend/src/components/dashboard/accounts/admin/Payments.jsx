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
  _id: (i + 1).toString(),
  userName: ["John Doe", "Jane Smith", "Sam Wilson", "Lucy Heart"][i % 4],
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

  const [payments, setPayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPayments, setTotalPayments] = useState(0);
  const [loading, setLoading] = useState(true);
  const numberOfEntries = 10;

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        // Example: filters can be reused if you want
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

        // Fetch payments data
        // const response = await getAllPayments(user.token, params.toString());
        // const { data, totalPages: tp, total } = response;

        setPayments(paymentsData); // Replace with actual fetched data
        setTotalPages(tp || 1);
        setTotalPayments(total || 0);
        setLoading(false);
      } catch (error) {
        // Handle error if needed
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [currentPage, filterState]);

  const getKeyFromLabel = (label) =>
    label.toLowerCase().replace(/\s+/g, "").replace(/\./g, "");

  const transformedPayments = payments.map((payment, idx) => {
    const row = {};
    headers.forEach((header, i) => {
      const key = getKeyFromLabel(header.label);

      if (key === "sno") {
        row[key] = (currentPage - 1) * numberOfEntries + idx + 1;
      } else if (key === "date") {
        row[key] = new Date(payment.date).toLocaleDateString();
      } else if (key === "username") {
        row[key] = payment.userName;
      } else {
        row[key] = payment[key] || "-";
      }
    });

    row._id = payment._id;
    return row;
  });

  return (
    <div className="p-4">
      {/* Header Section */}
      <PaymentsHeader
        title="Payments"
        totalCount={transformedPayments.length}
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
            label: "Date Interval",
            children: [
              { label: "Start Date", value: "startDate", type: "date" },
              { label: "End Date", value: "endDate", type: "date" },
            ],
          },
        ]}
      />
      {transformedPayments.length > 0 ? (
        <PaymentsTable
          headers={headers}
          data={transformedPayments}
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
