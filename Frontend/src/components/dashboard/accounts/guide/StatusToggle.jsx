import { useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import ConfirmationModal from "../../../common/ConfirmationModal";

function StatusToggle() {
  const [isAvailable, setIsAvailable] = useState(true);
  const [datePickerField, setDatePickerField] = useState(false);
  const [availableDate, setAvailableDate] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);

  // Toggle status and decide whether to show modal or date picker
  const toggleStatus = () => {
    if (isAvailable) {
      openDatePicker();
    } else {
      setConfirmModal(true);
    }
  };

  // Open date picker when setting availability
  const openDatePicker = () => {
    setDatePickerField(true);
  };

  // Close all modals and reset fields
  const closeModals = () => {
    setConfirmModal(false);
    setDatePickerField(false);
    setAvailableDate(""); // Reset selected date
  };

  // Confirm status change (handles both available/unavailable)
  const confirmStatusChange = () => {
    setIsAvailable(!isAvailable);
    closeModals();
  };

  // Cancel modal and reset fields
  const handleCancel = closeModals; // Use closeModals to handle canceling

  return (
    <div className="w-full p-6 bg-white shadow-lg rounded-lg text-center border border-green-300">
      {/* Status Heading */}
      <h2 className="text-xl font-bold text-green-700">Status</h2>

      {/* Toggle Button */}
      <div className="my-4">
        <button
          onClick={toggleStatus}
          className={`w-32 py-2 text-white font-semibold rounded-lg transition ${
            isAvailable
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-400 hover:bg-red-500"
          }`}
        >
          {isAvailable ? "Available" : "Unavailable"}
        </button>
      </div>

      {/* Available Mode - Date Picker */}
      {datePickerField && (
        <div className="mt-3">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Available From:
          </label>
          <input
            type="date"
            value={availableDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setAvailableDate(e.target.value)}
            className="border p-2 rounded w-full"
          />

          {/* Warning Message */}
          {!availableDate && (
            <div className="flex items-center bg-red-100 text-red-700 px-3 py-2 rounded mt-2">
              <FaExclamationCircle className="w-5 h-5 mr-2" />
              <p className="text-sm font-semibold">
                Please select an available date!
              </p>
            </div>
          )}

          {/* Confirm Unavailable Button */}
          {availableDate && (
            <>
              <p className="text-sm text-gray-600 mt-2">
                📅 Available from:{" "}
                <span className="font-semibold">
                  {new Date(availableDate).toLocaleDateString("en-GB")}
                </span>
              </p>
              <button
                onClick={() => setConfirmModal(true)}
                className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
              >
                Confirm Unavailable
              </button>
            </>
          )}
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmModal && (
        <ConfirmationModal
          text={
            isAvailable
              ? "Are you sure you want to mark yourself as Unavailable?"
              : "Are you sure you want to mark yourself as Available?"
          }
          onCancel={handleCancel}
          onConfirm={confirmStatusChange}
        />
      )}
    </div>
  );
}

export default StatusToggle;
