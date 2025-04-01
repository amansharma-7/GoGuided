import { useParams } from "react-router";
import { FaInfoCircle, FaEye } from "react-icons/fa"; // Importing eye icon for button
import { useState } from "react"; // For managing selected announcement
import { useNavigate } from "react-router"; // Import useNavigate for back navigation

const announcementsData = {
  "forest-adventure": [
    {
      id: 1,
      title: "Safety briefing scheduled",
      date: "March 30th",
      message: "Safety briefing scheduled for March 30th.",
      postedBy: "Admin",
    },
    {
      id: 2,
      title: "Guides Updated",
      date: "March 25th",
      message: "Guides updated to include experienced wildlife experts.",
      postedBy: "Admin",
    },
  ],
  "mountain-hiking": [
    {
      id: 1,
      title: "Required Gear Reminder",
      date: "June 5th",
      message: "Ensure you have the required hiking gear by June 5th.",
      postedBy: "Admin",
    },
    {
      id: 2,
      title: "Weather Forecast",
      date: "June 3rd",
      message: "Weather forecast indicates a sunny week during the tour.",
      postedBy: "Admin",
    },
  ],
  "safari-exploration": [
    {
      id: 1,
      title: "Vehicle Safari Info",
      date: "Day 2 Afternoon",
      message: "Vehicle safari scheduled for Day 2 afternoon.",
      postedBy: "Admin",
    },
    {
      id: 2,
      title: "Camera Recommendations",
      date: "Email Sent",
      message: "Camera equipment recommendations shared via email.",
      postedBy: "Admin",
    },
  ],
};

export default function Announcements() {
  const { name } = useParams();
  const announcements = announcementsData[name] || [];
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle the back button click using navigate(-1)
  const handleBackClick = () => {
    navigate(-1); // This will navigate to the previous page in the history stack
  };

  // Function to handle selecting an announcement to view its full details
  const handleViewAnnouncement = (announcement) => {
    setSelectedAnnouncement(announcement);
  };

  // Function to handle closing the modal/popup
  const handleClosePopup = () => {
    setSelectedAnnouncement(null);
  };

  return (
    <div className="relative space-y-4 h-full overflow-y-auto scrollbar-none p-6 bg-green-50">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-800">Announcements</h1>
        <button
          onClick={handleBackClick}
          className="text-white hover:text-green-900 bg-green-700 px-3 p-2 rounded-md border border-green-400"
        >
          Go Back
        </button>
      </div>

      {announcements.length > 0 ? (
        announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="p-4 border border-green-400 rounded-lg shadow-md bg-white"
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col justify-center">
                <h2 className="text-lg font-semibold text-green-800 flex items-center">
                  <FaInfoCircle className="mr-2" /> {announcement.title}
                </h2>
                <span className="text-sm text-green-600">
                  {announcement.date}
                </span>
              </div>
              <button
                onClick={() => handleViewAnnouncement(announcement)}
                className="text-green-700 hover:text-green-900 flex items-center gap-1 cursor-pointer"
              >
                <FaEye size={20} />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-green-800">
          No announcements available for this tour.
        </p>
      )}

      {/* Modal or Popup to View Announcement Details */}
      {selectedAnnouncement && (
        <ViewAnnouncementPost
          isOpen={!!selectedAnnouncement}
          onClose={handleClosePopup}
          announcement={selectedAnnouncement}
        />
      )}
    </div>
  );
}

// Modal or Popup Component
function ViewAnnouncementPost({ isOpen, onClose, announcement }) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
      {/* Modal Content */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg">
        <h2 className="text-xl font-bold text-green-800 mb-4">
          {announcement.title}
        </h2>
        <p className="text-green-700 mb-4">{announcement.message}</p>
        <span className="text-sm text-green-600 mb-4">{announcement.date}</span>
        <div className="flex justify-between items-center text-sm text-green-600">
          <span className="font-bold">{announcement.postedBy}</span>
          <button
            className="text-green-700 hover:text-green-900 rounded-lg bg-green-200 px-2 py-1 cursor-pointer"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
