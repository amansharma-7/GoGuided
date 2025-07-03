import { useState } from "react";
import { FaInfoCircle, FaBullhorn, FaEye, FaTimes } from "react-icons/fa";
import ViewAnnouncementPost from "../../../common/ViewAnnouncementPost";

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

export default function Announcements() {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  return (
    <div className="px-4 sm:px-6 md:px-10 py-6">
      <div className="min-h-[80vh] sm:min-h-screen shadow-md bg-white p-4 sm:p-6 rounded-lg">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-green-700 flex items-center">
          <FaBullhorn className="mr-2" /> Announcements
        </h1>

        {/* Announcements List */}
        <div className="space-y-4 h-full max-h-[70vh] overflow-y-auto scrollbar-none">
          {announcementsData.map((announcement) => (
            <div
              key={announcement.id}
              className="p-4 border border-green-400 rounded-lg shadow-md bg-white"
            >
              <div className="flex justify-between items-center flex-wrap gap-y-2">
                <h2 className="text-base sm:text-lg font-semibold text-green-800 flex items-center">
                  <FaInfoCircle className="mr-2" /> {announcement.title}
                </h2>
                <span className="text-sm text-green-600">
                  {announcement.date}
                </span>
              </div>

              <p className="text-green-700 mt-1 text-sm sm:text-base">
                {announcement.message}
              </p>

              <div className="flex justify-between items-center mt-2 text-sm text-green-600 flex-wrap gap-y-2">
                <span className="font-bold">{announcement.postedBy}</span>
                <button
                  className="text-green-700 hover:text-green-900 flex items-center gap-1"
                  onClick={() => setSelectedAnnouncement(announcement)}
                >
                  <FaEye /> View
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal View */}
        <ViewAnnouncementPost
          isOpen={selectedAnnouncement}
          onClose={() => setSelectedAnnouncement(null)}
          announcement={selectedAnnouncement}
        />
      </div>
    </div>
  );
}
