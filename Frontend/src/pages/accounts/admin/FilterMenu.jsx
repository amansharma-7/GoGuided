import { useState } from "react";
import { FaFilter } from "react-icons/fa";

function FilterMenu({ filters, setFilters }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  return (
    <div className="relative">
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-md transition"
      >
        <FaFilter className="mr-2" /> Filter
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-300 rounded-md shadow-lg z-10 p-3">
          {/* Status Filter */}
          <div className="mb-3">
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
              value={filters.status} // Controlled component
              onChange={(e) => handleFilterChange("status", e.target.value)}
            >
              <option value="">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          {/* Visibility Filter */}
          <div className="mb-3">
            <label className="text-sm font-medium text-gray-700">
              Visibility
            </label>
            <select
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
              value={filters.visibility} // Controlled component
              onChange={(e) => handleFilterChange("visibility", e.target.value)}
            >
              <option value="">All</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="hidden">Hidden</option>
            </select>
          </div>

          {/* Bookings Filter */}
          <div className="mb-3">
            <label className="text-sm font-medium text-gray-700">
              Bookings
            </label>
            <select
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
              value={filters.bookings} // Controlled component
              onChange={(e) => handleFilterChange("bookings", e.target.value)}
            >
              <option value="">All</option>
              <option value="popular">Popular</option>
              <option value="low">Low Bookings</option>
              <option value="none">No Bookings</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="mb-3">
            <label className="text-sm font-medium text-gray-700">
              Price Range
            </label>
            <select
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
              value={filters.price} // Controlled component
              onChange={(e) => handleFilterChange("price", e.target.value)}
            >
              <option value="">All</option>
              <option value="budget">Budget</option>
              <option value="mid">Mid-Range</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>

          {/* Duration Filter */}
          <div className="mb-3">
            <label className="text-sm font-medium text-gray-700">
              Duration
            </label>
            <select
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
              value={filters.duration} // Controlled component
              onChange={(e) => handleFilterChange("duration", e.target.value)}
            >
              <option value="">All</option>
              <option value="short">Short</option>
              <option value="medium">Medium</option>
              <option value="long">Long</option>
            </select>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default FilterMenu;
