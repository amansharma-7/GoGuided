import { FaArrowLeft, FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";
import { useNavigate } from "react-router";

function ReusableHeader({
  title,
  totalCount,
  onSearch,
  onSort,
  sortOrder,
  filterOptions = [],
  onFilter,
}) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between bg-green-50 border border-green-200 p-4 rounded-md shadow-sm mb-4">
      {/* Left Section: Back Button + Dynamic Title */}
      <div className="flex items-center space-x-4">
        {/* Back Button (Green, Circular) */}
        <button
          onClick={() => navigate(-1)}
          className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full shadow-md transition"
        >
          <FaArrowLeft />
        </button>

        {/* Dynamic Title */}
        <h3 className="text-lg font-semibold text-green-700">
          {title}: {totalCount}
        </h3>
      </div>

      {/* Right Section: Search, Sort, Filter */}
      <div className="flex items-center space-x-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder={`Search ${title.toLowerCase()}...`}
          onChange={(e) => onSearch(e.target.value)}
          className="border border-green-300 px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-green-500 w-64 outline-none"
        />

        {/* Sort Button (Green, Rectangular) */}
        <button
          onClick={onSort}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-md transition"
        >
          {sortOrder === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />}
        </button>

        {/* Dynamic Filter Dropdown */}
        {filterOptions.length > 0 && (
          <select
            onChange={(e) => onFilter(e.target.value)}
            className="border border-green-300 px-3 py-2 rounded-md text-sm bg-white focus:ring-2 focus:ring-green-500 outline-none"
          >
            <option value="">All</option>
            {filterOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}

export default ReusableHeader;
