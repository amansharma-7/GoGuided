import PaymentsHeader from "../../../common/DashboardHeader";
import PaymentsTable from "../../../dashboard/Table";
import { useState } from "react";

const headers = ["S No.", "User Name", "Email", "Amount", "Status", "Date"];

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
  status: ["Paid", "Pending", "Failed", "Refunded"][i % 4],
  date: `2024-03-${(i % 30) + 1}`.padStart(10, "0"),
}));

function Payments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedFilters, setSelectedFilters] = useState({});

  return (
    <div className="p-4">
      {/* Header Section */}
      <PaymentsHeader
        title="Payments"
        totalCount={paymentsData.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSortOrder={setSortOrder}
        sortOrder={sortOrder}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
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
        ]}
      />

      <PaymentsTable
        headers={headers}
        bookings={paymentsData}
        gridCols="grid-cols-[1fr_2fr_2fr_1.5fr_1.5fr_2fr]"
        itemsPerPage={10}
      />
    </div>
  );
}

export default Payments;
