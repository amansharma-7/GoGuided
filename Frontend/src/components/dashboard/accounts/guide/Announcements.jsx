import { MdAddCircleOutline, MdCampaign, MdClose } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import { useState } from "react";

function Announcement() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedTour, setSelectedTour] = useState("All");
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  // Sample tour list (Replace with actual tour data)
  const tours = [
    "All",
    "Europe Tour",
    "Asia Tour",
    "USA Tour",
    "Australia Tour",
  ];

  const handlePost = () => {
    if (!title.trim() || !message.trim()) {
      alert("Title and message cannot be empty.");
      return;
    }

    const newAnnouncement = {
      id: Date.now(),
      title,
      message,
      tour: selectedTour,
      date: new Date().toLocaleString(),
    };

    setAnnouncements([newAnnouncement, ...announcements]);
    setShowForm(false);
    setTitle("");
    setMessage("");
    setSelectedTour("All");
  };

  return (
    <div className=" p-6  bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden">
      {/* Add Announcement Button */}
      <button
        onClick={() => setShowForm(true)}
        className="w-full flex items-center justify-center gap-2 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition cursor-pointer"
      >
        <MdAddCircleOutline size={20} /> New Post
      </button>

      {/* Announcement Form */}
      {showForm && (
        <div className="mt-4 pb-12 h-full overflow-y-auto scrollbar-none">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <MdCampaign className="text-green-500" size={24} /> Announcement
          </h2>

          <div className="">
            {/* Tour Selection Dropdown */}
            <label className="block text-sm font-semibold text-gray-700 mt-3">
              Send To:
            </label>
            <select
              value={selectedTour}
              onChange={(e) => setSelectedTour(e.target.value)}
              className="w-full p-2 border border-green-300 rounded outline-none cursor-pointer "
            >
              {tours.map((tour, index) => (
                <option key={index} value={tour}>
                  {tour}
                </option>
              ))}
            </select>

            {/* Title Input */}
            <input
              type="text"
              placeholder="Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded mt-3  border-green-300 outline-none cursor-pointer"
            />

            {/* Message Input */}
            <textarea
              placeholder="Message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border rounded mt-3 border-green-300 outline-none cursor-pointer"
              rows="4"
            />

            {/* Form Buttons */}
            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition cursor-pointer"
              >
                Discard
              </button>
              <button
                onClick={handlePost}
                className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition cursor-pointer"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Previous Announcements List */}
      <h2 className="mt-6 text-lg font-semibold text-gray-700">
        📢 Announcements
      </h2>
      {announcements.length === 0 ? (
        <p className="text-gray-500 text-sm mt-2">No posts yet.</p>
      ) : (
        <ul className="mt-3 space-y-3 h-full overflow-y-auto scrollbar-none">
          {announcements.map((announcement) => (
            <li
              key={announcement.id}
              className="p-3 border rounded bg-gray-50 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-gray-800">
                  {announcement.title}
                </h3>
                <p className="text-xs text-gray-500">
                  📍 {announcement.tour} | 📅 {announcement.date}
                </p>
              </div>
              <button
                onClick={() => setSelectedAnnouncement(announcement)}
                className="text-green-500 hover:text-green-600 flex items-center gap-1"
              >
                <AiOutlineEye size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Modal for Viewing Announcement Details */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800">
                {selectedAnnouncement.title}
              </h2>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                <MdClose size={18} />
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {selectedAnnouncement.message}
            </p>
            <p className="text-xs text-gray-500 mt-4">
              📍 {selectedAnnouncement.tour} | 📅 {selectedAnnouncement.date}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Announcement;
