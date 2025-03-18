import { useState } from "react";
import {
  FaArrowLeft,
  FaSortAmountUp,
  FaSortAmountDown,
  FaSearch,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import FilterMenu from "./FilterMenu";

function ReusableHeader({
  title,
  totalCount,
  placeholder,
  onSearch,
  onSort,
  sortOrder,
  filters,
  setFilters,
}) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchClick = () => {
    const searchParams = {
      query: searchQuery,
      filters: filters,
      sortOrder: sortOrder,
    };
    onSearch(searchParams);
  };

  return (
    <div className="flex flex-wrap items-center bg-green-50 border border-green-200 p-4 rounded-md shadow-sm mb-4">
      {/* Left Section (Back Button & Total Count) */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => navigate(-1)}
          className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full shadow-md transition"
        >
          <FaArrowLeft />
        </button>
        <h3 className="text-lg font-bold text-gray-800">
          {title}: {totalCount}
        </h3>
      </div>

      {/* Right Section (Search Input, Sort, Filter, Search Button) */}
      <div className="flex space-x-3 ml-auto">
        {/* Search Input Field */}
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-green-300 px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-green-500 outline-none w-64"
        />

        {/* Sort Button */}
        <button
          onClick={onSort}
          className="flex items-center bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md shadow-md transition"
        >
          {sortOrder === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />}
        </button>

        {/* Filter Dropdown */}
        <FilterMenu filters={filters} setFilters={setFilters} />

        {/* Search Button (Executes Search) */}
        <button
          onClick={handleSearchClick}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-md transition flex items-center"
        >
          <FaSearch className="mr-2" /> Search
        </button>
      </div>
    </div>
  );
}

export default ReusableHeader;
