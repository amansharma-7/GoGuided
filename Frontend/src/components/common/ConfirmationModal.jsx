import React from "react";

function ConfirmationModal({ text, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-10 rounded-xl shadow-xl">
        <p className="mb-6 text-green-800 font-semibold text-lg">{text}</p>
        <div className="flex justify-center gap-6">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer text-base"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 cursor-pointer text-base"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
