import { useParams } from "react-router"; // Correct import

const announcementsData = {
  "forest-adventure": [
    "Safety briefing scheduled for March 30th.",
    "Guides updated to include experienced wildlife experts.",
  ],
  "mountain-hiking": [
    "Ensure you have the required hiking gear by June 5th.",
    "Weather forecast indicates a sunny week during the tour.",
  ],
  "safari-exploration": [
    "Vehicle safari scheduled for Day 2 afternoon.",
    "Camera equipment recommendations shared via email.",
  ],
};
export default function Announcements() {
  const { name } = useParams();
  // console.log("tour id is", name);
  const announcements = announcementsData[name] || [];

  return (
    <div className="p-6 bg-green-50 h-screen overflow-y-auto">
      <h1 className="text-3xl font-bold text-green-800 mb-4">Announcements</h1>
      <h2 className="text-2xl font-semibold text-green-700 mb-4">
        {name.replace("-", " ").toUpperCase()}
      </h2>
      {announcements.length > 0 ? (
        <ul className="list-disc pl-6">
          {announcements.map((announcement, index) => (
            <li key={index} className="text-green-800 mb-2">
              {announcement}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-green-800">
          No announcements available for this tour.
        </p>
      )}
    </div>
  );
}
