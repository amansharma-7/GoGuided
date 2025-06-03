import { useState, useEffect } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import ConfirmationModal from "../../../common/ConfirmationModal";

function StatusToggle() {
  const [isAvailable, setIsAvailable] = useState(true);
  const [datePickerField, setDatePickerField] = useState(false);
  const [availableDate, setAvailableDate] = useState("");
  const [tempDate, setTempDate] = useState(""); // Store user input
  const [confirmModal, setConfirmModal] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  // Get today's date adjusted for local timezone
  const todayDate = new Date(
    Date.now() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  // Handle input change (directly update tempDate)
  const handleDateChange = (e) => {
    setTempDate(e.target.value);
  };

  // Auto-validate when tempDate changes
  useEffect(() => {
    if (tempDate) {
      if (tempDate < todayDate) {
        setWarningMessage("Please enter a valid future date.");
        setAvailableDate(""); // Reset available date
      } else {
        setWarningMessage(""); // Clear warning if valid
        setAvailableDate(tempDate); // Store valid date
      }
    }
  }, [tempDate]); // Runs when tempDate updates

  const toggleStatus = () => {
    if (isAvailable) {
      openDatePicker();
    } else {
      setConfirmModal(true);
    }
  };

  const openDatePicker = () => {
    setDatePickerField(true);
  };

  const closeModals = () => {
    setConfirmModal(false);
    setDatePickerField(false);
    setAvailableDate(""); // Reset selected date
    setWarningMessage(""); // Clear warning message
    setTempDate(""); // Reset temp date
  };

  const confirmStatusChange = () => {
    setIsAvailable(!isAvailable);
    closeModals();
  };

  return (
    <div className="w-full p-6 bg-white shadow-sm rounded-lg text-center">
      {/* Status Heading */}
      <h2 className="text-xl font-bold text-green-950">
        Status:{" "}
        <span className="text-green-900">
          {isAvailable ? "Available" : "Unavailable"}
        </span>
      </h2>

      {/* Toggle Button */}
      <div className="my-4">
        <button
          onClick={toggleStatus}
          className={`w-32 py-2 text-white font-semibold rounded-lg transition cursor-pointer ${
            isAvailable
              ? "bg-red-400 hover:bg-red-500"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          Change
        </button>
      </div>

      {/* Available Mode - Date Picker */}
      {datePickerField && (
        <div className="mt-3">
          <label className="block text-sm font-semibold text-gray-700 mb-1 cursor-pointer">
            Available From:
          </label>
          <input
            type="date"
            value={tempDate}
            min={todayDate}
            onChange={handleDateChange} // Auto-validates after full date is entered
            className="border p-2 rounded w-full border-green-300 outline-none cursor-pointer"
          />

          {/* Warning Message - Show only when invalid date is entered */}
          {warningMessage && (
            <div className="flex items-center bg-red-100 text-red-700 px-3 py-2 rounded mt-2">
              <FaExclamationCircle className="w-5 h-5 mr-2" />
              <p className="text-sm font-semibold">{warningMessage}</p>
            </div>
          )}

          {/* Confirm Unavailable Button */}
          {availableDate && !warningMessage && (
            <>
              <p className="text-sm text-gray-600 mt-2 cursor-pointer">
                📅 Available from:{" "}
                <span className="font-semibold">
                  {new Date(availableDate).toLocaleDateString("en-GB")}
                </span>
              </p>
              <button
                onClick={() => setConfirmModal(true)}
                className="mt-4 px-4 py-2 bg-red-500 text-white cursor-pointer font-semibold rounded-lg hover:bg-red-600 transition"
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
          onCancel={closeModals}
          onConfirm={confirmStatusChange}
        />
      )}
    </div>
  );
}

export default StatusToggle;
