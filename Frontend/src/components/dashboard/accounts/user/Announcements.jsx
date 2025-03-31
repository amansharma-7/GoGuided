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
    <div className="p-6 ">
      <div className="min-h-screen shadow-md bg-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-green-700 flex items-center">
          <FaBullhorn className="mr-2" /> Announcements
        </h1>

        {/* Announcements List */}
        <div className="space-y-4 h-full overflow-y-auto scrollbar-none">
          {announcementsData.map((announcement) => (
            <div
              key={announcement.id}
              className="p-4 border border-green-400 rounded-lg shadow-md bg-white"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-green-800 flex items-center">
                  <FaInfoCircle className="mr-2" /> {announcement.title}
                </h2>
                <span className="text-sm text-green-600">
                  {announcement.date}
                </span>
              </div>
              <p className="text-green-700 mt-1">{announcement.message}</p>
              <div className="flex justify-between items-center mt-2 text-sm text-green-600">
                <span className="font-bold">{announcement.postedBy}</span>
                <button
                  className="text-green-700 hover:text-green-900 flex items-center gap-1 cursor-pointer"
                  onClick={() => setSelectedAnnouncement(announcement)}
                >
                  <FaEye />
                </button>
              </div>
            </div>
          ))}
        </div>

        <ViewAnnouncementPost
          isOpen={selectedAnnouncement}
          onClose={() => setSelectedAnnouncement(null)}
          announcement={selectedAnnouncement}
        />
      </div>
    </div>
  );
}
