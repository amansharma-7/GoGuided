import React, { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaClipboardList,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const tours = [
  {
    id: 1,
    name: "Forest Adventure",
    location: "Amazon Rainforest",
    duration: "5 days",
    price: "$500",
    type: "Adventure",
    difficulty: "Intermediate",
    groupSize: "10-15 people",
    description:
      "Explore the depths of the Amazon Rainforest with experienced guides.",
  },
  {
    id: 2,
    name: "Mountain Hiking",
    location: "Himalayas",
    duration: "7 days",
    price: "$800",
    type: "Hiking",
    difficulty: "Advanced",
    groupSize: "5-10 people",
    description:
      "Conquer the challenging trails of the Himalayas for an unforgettable experience.",
  },
  {
    id: 3,
    name: "Safari Exploration",
    location: "Serengeti",
    duration: "3 days",
    price: "$400",
    type: "Wildlife Safari",
    difficulty: "Easy",
    groupSize: "15-20 people",
    description:
      "Witness the stunning wildlife of the Serengeti on this guided safari.",
  },
];

export default function ToursList() {
  const [expandedTour, setExpandedTour] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    tourId: null,
  });

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
    <div className="grid grid-cols-1 gap-6 bg-green-50 p-4">
      {tours.map((tour) => (
        <div
          key={tour.id}
          className="bg-green-50 rounded-2xl shadow-lg p-6 border-t-2 border-green-500"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-green-800 mb-2">
              {tour.name}
            </h2>
            <button
              onClick={() => toggleAccordion(tour.id)}
              className="text-green-800 hover:text-green-600 transition cursor-pointer"
            >
              {expandedTour === tour.id ? (
                <FaChevronUp size={20} />
              ) : (
                <FaChevronDown size={20} />
              )}
            </button>
          </div>
          <p className="text-green-800 bg-green-50 p-3 rounded-md mb-4 shadow-sm">
            {tour.description}
          </p>
          {expandedTour === tour.id && (
            <div className="grid grid-cols-2 gap-4 p-4 bg-green-50 rounded-md shadow-sm">
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
            </div>
          )}
          <div className="flex gap-4 mt-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 cursor-pointer">
              <FaEdit size={16} /> Edit
            </button>
            <button
              onClick={() => handleDelete(tour.id)}
              disabled={deleteConfirm.show}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600  cursor-pointer"
            >
              <FaTrash size={16} /> Delete
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer">
              <FaClipboardList size={16} /> View Bookings
            </button>
          </div>
        </div>
      ))}

      {deleteConfirm.show && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-10 rounded-xl shadow-xl">
            <p className="mb-6 text-green-800 font-semibold text-lg">
              Are you sure you want to delete this tour?
            </p>
            <div className="flex justify-center gap-6">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer text-base"
                onClick={confirmDelete}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 cursor-pointer text-base"
                onClick={cancelDelete}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
