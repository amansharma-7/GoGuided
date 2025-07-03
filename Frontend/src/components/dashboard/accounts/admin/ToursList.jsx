import { useState } from "react";
import useSafeNavigate from "../../../../utils/useSafeNavigate";
import {
  FaEdit,
  FaTrash,
  FaClipboardList,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { BiPlusCircle } from "react-icons/bi";
import ConfirmationModal from "../../../common/ConfirmationModal";

const getStatus = (startDate, endDate) => {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (today < start) return "Upcoming";
  if (today >= start && today <= end) return "Ongoing";
  return "Completed";
};

export default function ToursList({ tours }) {
  const [expandedTour, setExpandedTour] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    tourId: null,
  });

  const navigate = useSafeNavigate();

  const toggleAccordion = (id) => {
    setExpandedTour(expandedTour === id ? null : id);
  };

  const handleDelete = (id) => {
    setDeleteConfirm({ show: true, tourId: id });
  };

  const confirmDelete = () => {
    setDeleteConfirm({ show: false, tourId: null });
  };

  const cancelDelete = () => {
    setDeleteConfirm({ show: false, tourId: null });
  };

  return (
    <div className="p-4 pb-20 grid grid-cols-1 gap-6 bg-green-50 overflow-y-auto h-full scrollbar-none">
      {/* Add New Tour Button */}
      <div
        className="flex items-center justify-between p-4 bg-white border border-green-500 rounded-xl -my-2 cursor-pointer hover:bg-green-100 transition-all h-16"
        onClick={() => navigate("add")}
      >
        <div className="flex items-center gap-2">
          <BiPlusCircle className="text-green-600 w-6 h-6" />
          <span className="text-green-700 font-semibold text-lg">
            Add New Tour
          </span>
        </div>
      </div>

      {/* Tour List */}
      {tours.map((tour) => (
        <div
          key={tour.id}
          className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border-t-2 border-green-500"
        >
          {/* Tour Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h2 className="text-2xl font-semibold text-green-800">
              {tour.name}
            </h2>
            <button
              onClick={() => toggleAccordion(tour.id)}
              className="text-green-800 hover:text-green-600 transition self-end sm:self-auto"
            >
              {expandedTour === tour.id ? (
                <FaChevronUp size={20} />
              ) : (
                <FaChevronDown size={20} />
              )}
            </button>
          </div>

          {/* Tour Description and Status */}
          <div className="flex flex-col sm:flex-row justify-between gap-2 items-start sm:items-center bg-gray-100 p-3 rounded-md my-3 shadow-sm">
            <p className="text-green-800">{tour.description}</p>
            <p className="text-green-800">
              <strong>Status:</strong> {getStatus(tour.startDate, tour.endDate)}
            </p>
          </div>

          {/* Expanded Tour Details */}
          {expandedTour === tour.id && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2 sm:p-4 rounded-md shadow-sm">
              <p className="text-green-800 font-medium">
                Location:{" "}
                <span className="font-normal text-green-700">
                  {tour.location}
                </span>
              </p>
              <p className="text-green-800 font-medium">
                Duration:{" "}
                <span className="font-normal text-green-700">
                  {tour.duration}
                </span>
              </p>
              <p className="text-green-800 font-medium">
                Type:{" "}
                <span className="font-normal text-green-700">{tour.type}</span>
              </p>
              <p className="text-green-800 font-medium">
                Difficulty:{" "}
                <span className="font-normal text-green-700">
                  {tour.difficulty}
                </span>
              </p>
              <p className="text-green-800 font-medium">
                Group Size:{" "}
                <span className="font-normal text-green-700">
                  {tour.groupSize}
                </span>
              </p>
              <p className="text-green-800 font-bold">
                Price:{" "}
                <span className="font-normal text-green-700">{tour.price}</span>
              </p>
              <p className="text-green-800 font-bold">
                Start Date:{" "}
                <span className="font-normal text-green-700">
                  {tour.startDate}
                </span>
              </p>
              <p className="text-green-800 font-bold">
                End Date:{" "}
                <span className="font-normal text-green-700">
                  {tour.endDate}
                </span>
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4">
            <button
              className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 w-full sm:w-auto"
              onClick={() =>
                navigate(`edit/${tour.name.toLowerCase().split(" ").join("_")}`)
              }
            >
              <FaEdit size={16} /> Edit
            </button>
            <button
              onClick={() => handleDelete(tour.id)}
              disabled={deleteConfirm.tourId === tour.id}
              className={`flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 w-full sm:w-auto ${
                deleteConfirm.tourId === tour.id
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }`}
            >
              <FaTrash size={16} /> Delete
            </button>
            <button
              className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 w-full sm:w-auto"
              onClick={() =>
                navigate(
                  `bookings/${tour.name.toLowerCase().split(" ").join("_")}`
                )
              }
            >
              <FaClipboardList size={16} /> View Bookings
            </button>
          </div>
        </div>
      ))}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.show && (
        <ConfirmationModal
          text={"Are you sure you want to delete this tour?"}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}
