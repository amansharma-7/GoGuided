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
  filterState,
  setFilterState,
  filterOptions,
}) {
  const navigate = useSafeNavigate();
  const [query, setQuery] = useState(filterState.searchQuery || "");
  if (totalCount <= 0) {
    return (
      <div className=" bg-white border border-green-200 p-3 rounded-md shadow-sm mb-2 w-full">
        <div className="flex items-center space-x-4">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full shadow-md transition cursor-pointer h-9 w-9 flex items-center justify-center"
          >
            <FaArrowLeft className="w-4 h-4" />
          </button>

          {/* Title & Count */}
          <h3 className="text-lg font-semibold text-green-700">No Results</h3>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-between bg-white border border-green-200 p-3 rounded-md shadow-sm mb-2 w-full">
      <div className="flex items-center space-x-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full shadow-md transition cursor-pointer h-9 w-9 flex items-center justify-center"
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
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);

            if (value === "") {
              setFilterState((prevState) => ({
                ...prevState,
                searchQuery: "",
              }));
            }
          }}
          className="border border-green-300 px-3 py-1.5 rounded-md text-sm w-64 focus:border-green-600 focus:border-2 outline-none h-9"
        />
        <button
          onClick={() =>
            setFilterState((prevState) => ({
              ...prevState,
              searchQuery: query,
            }))
          }
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md shadow-md flex cursor-pointer items-center h-9"
        >
          <FaSearch className="w-4 h-4" />
        </button>

        {/* Sort Button */}
        <button
          onClick={() => {
            setFilterState((prevState) => ({
              ...prevState,
              sortOrder: prevState.sortOrder === "asc" ? "desc" : "asc",
            }));
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md shadow-md h-9 cursor-pointer"
        >
          {filterState.sortOrder === "asc" ? (
            <FaSortAmountUp className="w-4 h-4" />
          ) : (
            <FaSortAmountDown className="w-4 h-4" />
          )}
        </button>

        {/* Filter Dropdown */}
        {filterOptions && (
          <FilterDropdown
            options={filterOptions}
            selectedFilters={filterState.selectedFilters}
            setSelectedFilters={setFilterState}
            style={{ width: "w-42", maxHeight: "max-h-64" }}
          />
        )}
      </div>
    </div>
  );
}

export default DashboardHeader;
