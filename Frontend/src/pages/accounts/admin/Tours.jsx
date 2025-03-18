import { useState } from "react";
import ReusableHeader from "./ReusableHeader";

function Tours() {
  const [sortOrder, setSortOrder] = useState("asc");
  const [filters, setFilters] = useState({
    status: "",
    visibility: "",
    bookings: "",
    price: "",
    duration: "",
  });

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSearch = (searchParams) => {
    console.log("Executing search with:", searchParams); // Replace with actual API call
  };

  return (
    <div className="p-4">
      <ReusableHeader
        title="Total Tours"
        totalCount={120} // Replace with dynamic count
        placeholder={"Search by ID or name"}
        onSearch={handleSearch}
        onSort={handleSort}
        sortOrder={sortOrder}
        filters={filters}
        setFilters={setFilters}
      />
      {/* Tour list content goes here */}
    </div>
  );
}

export default Tours;
