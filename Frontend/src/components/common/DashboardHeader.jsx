import {
  FaArrowLeft,
  FaSortAmountUp,
  FaSortAmountDown,
  FaSearch,
} from "react-icons/fa";
import useSafeNavigate from "../../utils/useSafeNavigate";
import FilterDropdown from "./FilterDropdown";
import { useState } from "react";

function DashboardHeader({
  title,
  totalCount,
  setSearchQuery,
  sortOrder,
  setSortOrder,
  selectedFilters,
  setSelectedFilters,
  filterOptions,
}) {
  const safeNavigate = useSafeNavigate();
  const [query, setQuery] = useState("");

  return (
    <div className="flex items-center justify-between bg-green-50 border border-green-200 p-3 rounded-md shadow-sm mb-2">
      <div className="flex items-center space-x-4">
        {/* Back Button */}
        <button
          onClick={() => safeNavigate(-1)}
          className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full shadow-md transition cursor-pointer focus:outline-none focus:ring-0 focus:border-green-600 h-9 w-9 flex items-center justify-center"
        >
          <FaArrowLeft className="w-4 h-4" />
        </button>

        {/* Title & Count */}
        <h3 className="text-lg font-semibold text-green-700">
          {title}: {totalCount}
        </h3>
      </div>

      <div className="flex items-center space-x-2">
        {/* Search Input */}
        <input
          type="text"
          placeholder={`Search ${title.toLowerCase()}`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-green-300 px-3 py-1.5 rounded-md text-sm w-64 transition-all focus:border-green-600 focus:border-2 outline-none h-9"
        />

        {/* Search Button */}
        <button
          onClick={() => setSearchQuery(query)}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md shadow-md transition flex items-center cursor-pointer focus:outline-none focus:ring-0 focus:border-green-600 h-9"
        >
          <FaSearch className="w-4 h-4" />
        </button>

        {/* Sort Button */}
        <button
          onClick={() =>
            setSortOrder((order) => (order === "asc" ? "desc" : "asc"))
          }
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md shadow-md transition cursor-pointer focus:outline-none focus:ring-0 focus:border-green-600 h-9"
        >
          {sortOrder === "asc" ? (
            <FaSortAmountUp className="w-4 h-4" />
          ) : (
            <FaSortAmountDown className="w-4 h-4" />
          )}
        </button>

        {/* Filter Dropdown (Optional) */}
        {filterOptions && (
          <FilterDropdown
            options={filterOptions}
            selectedFilters={selectedFilters}
            setSelectedFilters={(val) => {
              console.log(val);
              setSelectedFilters(val);
            }}
            style={{ width: "w-36", maxHeight: "max-h-64" }} // only tailwind classes
          />
        )}
      </div>
    </div>
  );
}

export default DashboardHeader;
