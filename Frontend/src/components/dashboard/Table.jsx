import { useState } from "react";
import useSafeNavigate from "../../utils/useSafeNavigate";

function getStatusStyle(status) {
  switch (status) {
    case "Paid":
    case "Completed":
      return "bg-green-100 text-green-700 border-green-400 px-2 py-1 rounded";
    case "Pending":
    case "Ongoing":
      return "bg-yellow-100 text-yellow-700 border-yellow-400 px-2 py-1 rounded";
    case "Failed":
    case "Rejected": // 🔹 Added styling for rejected
      return "bg-red-100 text-red-700 border-red-400 px-2 py-1 rounded";
    case "Refunded":
    case "Upcoming":
      return "bg-blue-100 text-blue-700 border-blue-400 px-2 py-1 rounded";
    case "Free":
      return "bg-gray-100 text-gray-700 border-gray-400 px-2 py-1 rounded";
    case "Assigned":
      return "bg-purple-100 text-purple-700 border-purple-400 px-2 py-1 rounded";
    case "Approved": // 🔹 Added styling for approved
      return "bg-green-200 text-green-800 border-green-500 px-2 py-1 rounded font-semibold";
    default:
      return "bg-red-100 text-red-700 border-red-400 px-2 py-1 rounded";
  }
}

export default function BookingsTable({
  headers,
  data,
  itemsPerPage = 5,
  navToBy,
}) {
  const navigate = useSafeNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentRows = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full pb-4">
      {/* Scrollable Table Wrapper */}
      <div className="overflow-x-auto">
        <div className="min-w-max space-y-1">
          {/* Header */}
          <div
            className="grid bg-green-200 text-green-900 font-semibold rounded-md px-3 py-1"
            style={{
              gridTemplateColumns: headers
                .map((header) => `minmax(${header.width}, 1fr)`)
                .join(" "),
            }}
          >
            {headers.map((header, index) => (
              <div key={index} className="p-2">
                {header.label}
              </div>
            ))}
          </div>

          {/* Body */}
          <div className="space-y-0.5">
            {currentRows.map((item, idx) => (
              <div
                key={idx}
                onClick={() =>
                  navigate(
                    navToBy === "name" && item?.name
                      ? item.name.toLowerCase().split(" ").join("_")
                      : item?.id || ""
                  )
                }
                className="grid py-1 bg-white shadow rounded-md hover:bg-green-100 cursor-pointer transition px-3"
                style={{
                  gridTemplateColumns: headers
                    .map((header) => header.width)
                    .join(" "),
                }}
              >
                {Object.values(item).map((value, i) => (
                  <div key={i} className="px-2 py-1.5">
                    {headers[i].label.toLowerCase() === "status" ? (
                      <span
                        className={`text-sm rounded-md border px-2 py-1 ${getStatusStyle(
                          value
                        )}`}
                      >
                        {value}
                      </span>
                    ) : (
                      <span className="block">{value}</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination (Outside Scrollable Area) */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-2 py-1 rounded-md  ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600 cursor-pointer"
            }`}
          >
            Prev
          </button>
          <span className="text-green-700 font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-2 py-1 rounded-md  ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600 cursor-pointer"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
