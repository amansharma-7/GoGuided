import { FaArrowLeft, FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";
import useSafeNavigate from "../../../utils/useSafeNavigate";
import { useState } from "react";

function BookingsHeader({
  totalBookings,
  onSearch,
  onSort,
  sortOrder,
  onFilter,
}) {
  const safeNavigate = useSafeNavigate();

  return (
    <div className="flex items-center justify-between bg-green-50 border border-green-200 p-4 rounded-md shadow-sm mb-4">
      <div className="flex items-center space-x-4">
        {/* Back Button (Green, Circular) */}
        <button
          onClick={() => safeNavigate(-1)}
          className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full shadow-md transition"
        >
          <FaArrowLeft />
        </button>

        {/* Total Bookings */}
        <h3 className="text-lg font-semibold text-green-700">
          Total Bookings: {totalBookings}
        </h3>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by ID or Email"
          onChange={(e) => onSearch(e.target.value)}
          className="border border-green-300 px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-green-500 w-64 outline-none"
        />

        {/* Sort Button */}
        <button
          onClick={onSort}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-md transition"
        >
          {sortOrder === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />}
        </button>

        {/* Filter Dropdown */}
        <select
          onChange={(e) => onFilter(e.target.value)}
          className="border border-green-300 px-3 py-2 rounded-md text-sm bg-white focus:ring-2 focus:ring-green-500 outline-none"
        >
          <option value="">All</option>
          <option value="Confirmed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
    </div>
  );
}

// Usage Example
function BookingsHeaderWrapper() {
  const [sortOrder, setSortOrder] = useState("asc");
  const [filter, setFilter] = useState("");
  const totalBookings = 10; // Replace with actual data

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };

  const handleFilter = (status) => {
    console.log("Filtering by:", status);
    setFilter(status);
  };

  return (
    <div>
      <BookingsHeader
        totalBookings={totalBookings}
        onSearch={handleSearch}
        onSort={handleSort}
        sortOrder={sortOrder}
        onFilter={handleFilter}
      />
    </div>
  );
}

export default BookingsHeaderWrapper;
