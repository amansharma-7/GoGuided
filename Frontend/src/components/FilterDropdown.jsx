import { useState, useRef, useEffect } from "react";
import { FaFilter } from "react-icons/fa";

function FilterDropdown({
  options,
  selectedFilters,
  setSelectedFilters,
  style,
}) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openGroup, setOpenGroup] = useState(
    options.length > 0 ? options[0].label : null
  );
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
        setOpenGroup(options.length > 0 ? options[0].label : null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown, options]);

  // Handle selection updates
  const handleSelect = (category, value) => {
    const newValues = { ...selectedFilters, [category]: value };
    setSelectedFilters(newValues); // Send updated values to parent
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Filter Button */}
      <button
        onClick={() => setOpenDropdown(!openDropdown)}
        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md shadow-md flex items-center justify-center space-x-2 cursor-pointer transition text-sm focus:outline-none focus:ring-0 focus:border-green-600 h-9"
      >
        <FaFilter className="w-4 h-4" />
        <span className="text-sm">Filter</span>
      </button>

      {/* Dropdown Menu */}
      {openDropdown && (
        <div
          className={`${Object.values(style).join(
            " "
          )} absolute right-0 mt-2 flex flex-col gap-1 bg-green-100 border border-green-300 shadow-lg rounded-md z-50 overflow-y-auto `}
        >
          {options.map((group) => (
            <div key={group.label} className="">
              {/* Clickable Label */}
              <div
                className="px-4 py-2 text-green-700 font-semibold bg-green-200 cursor-pointer hover:bg-green-200"
                onClick={() =>
                  setOpenGroup(openGroup === group.label ? null : group.label)
                }
              >
                {group.label}
              </div>

              {/* Options List */}
              {openGroup === group.label && (
                <ul className="flex flex-col bg-green-100 border-t border-green-300">
                  {group.children.map((option) => (
                    <li
                      key={option.value}
                      className={`px-4 py-2 text-sm cursor-pointer hover:bg-green-200 transition ${
                        selectedFilters[group.label] === option.value
                          ? "bg-green-300"
                          : ""
                      }`}
                      onClick={() => handleSelect(group.label, option.value)}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterDropdown;
