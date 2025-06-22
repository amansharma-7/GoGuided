import { MdAddCircleOutline, MdCampaign } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import ViewAnnouncementPost from "./ViewAnnouncementPost";
import { useState } from "react";
import { useUser } from "./UserContext";

const announcementsData = [
  {
    id: 1,
    title: "New Tour Added",
    message: "Check out our latest adventure!",
    postedBy: "Admin",
    date: "2025-03-29",
  },
  {
    id: 2,
    title: "Tour Delay",
    message: "Tour XYZ is delayed due to weather.",
    postedBy: "Guide",
    date: "2025-03-28",
  },
  {
    id: 3,
    title: "Policy Update",
    message: "New refund policies effective from April.",
    postedBy: "Admin",
    date: "2025-03-27",
  },
];

function Announcement() {
  const { user } = useUser();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedTour, setSelectedTour] = useState("All");
  const [announcements, setAnnouncements] = useState(announcementsData);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  // Sample tour list (Replace with actual tour data)

  const tourOptions = [
    "Europe Tour",
    "Asia Tour",
    "USA Tour",
    "Australia Tour",
  ];

  const roleHierarchy = ["user", "guide", "admin", "owner"];

  const rolePluralMap = {
    user: "Users",
    guide: "Guides",
    admin: "Admins",
  };

  function getAnnouncementOptions(currentRole) {
    const currentIndex = roleHierarchy.indexOf(currentRole.toLowerCase());

    if (currentIndex === -1) return [];

    // Get lower roles and map to plural names
    const lowerRoles = roleHierarchy
      .slice(0, currentIndex)
      .map((role) => rolePluralMap[role]);

    // Build final options
    const options = [...lowerRoles, ...tourOptions];

    if (currentRole.toLowerCase() === "owner") {
      options.unshift("All");
    }

    return options;
  }

  const options = getAnnouncementOptions(user.role);

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
    <div className="p-4 sm:p-6 bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden max-w-full">
      {/* New Post Button (Hidden when form is active) */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full flex items-center justify-center gap-2 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition cursor-pointer"
        >
          <MdAddCircleOutline size={20} /> New Post
        </button>
      )}

      {/* Announcement Form (Hides Previous Announcements & Button) */}
      {showForm ? (
        <div className="h-full overflow-y-auto scrollbar-none max-h-[70vh]">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <MdCampaign className="text-green-500" size={24} /> Announcement
          </h2>

          <div className="h-full overflow-y-auto scrollbar-none max-h-[60vh]">
            {/* Tour Selection Dropdown */}
            <label className="block text-sm font-semibold text-gray-700 mt-3">
              Send To:
            </label>
            <select
              value={selectedTour}
              onChange={(e) => setSelectedTour(e.target.value)}
              className="w-full p-2 border border-green-300 rounded outline-none cursor-pointer"
            >
              {options.map((tour, index) => (
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
              className="w-full p-2 border rounded mt-3 border-green-300 outline-none cursor-pointer"
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
            <div className="flex flex-col sm:flex-row justify-end gap-2 mt-3">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition cursor-pointer w-full sm:w-auto"
              >
                Discard
              </button>
              <button
                onClick={handlePost}
                className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition cursor-pointer w-full sm:w-auto"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Previous Announcements List */}
          <h2 className="mt-6 text-lg font-semibold text-green-950">
            📢 Announcements
          </h2>

          {announcements.length === 0 ? (
            <p className="text-gray-500 text-sm mt-2">No posts yet.</p>
          ) : (
            <div className="mt-2 p-2 space-y-3 max-h-48 sm:max-h-60 overflow-y-auto scrollbar-none">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="p-2 border border-green-300 rounded shadow-sm flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold text-green-950">
                      {announcement.title}
                    </h3>
                    <p className="text-xs text-green-950">
                      📍 {announcement.tour} | 📅 {announcement.date}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedAnnouncement(announcement)}
                    className="text-green-700 hover:text-green-800 flex items-center gap-1 cursor-pointer"
                  >
                    <AiOutlineEye size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Modal for Viewing Announcement Details */}
      <ViewAnnouncementPost
        isOpen={selectedAnnouncement}
        onClose={() => setSelectedAnnouncement(null)}
        announcement={selectedAnnouncement}
      />
    </div>
  );
}

export default Announcement;
