import { FaRegCalendarAlt, FaRegCheckCircle } from "react-icons/fa";
import { FaArrowRight, FaRegClock, FaStar } from "react-icons/fa6";
import useSafeNavigate from "../../../../utils/useSafeNavigate";
import Announcements from "./Announcements";
import StatusToggle from "./Statustoggle";

function SummaryCard({ title, icon: Icon, value }) {
  return (
    <div className="bg-white text-green-950 p-6 flex flex-col items-center shadow-sm shadow-black/50 rounded-lg space-y-2">
      <div className="flex items-center space-x-2">
        {Icon && <Icon className="text-green-700 text-xl" />}
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <p className="text-4xl font-extrabold">{value}</p>
    </div>
  );
}

function Stats() {
  const statsData = [
    { name: "Bookings", value: 12 },
    { name: "Tours", value: 12 },
    { name: "Reviews", value: 12 },
    { name: "Users", value: 12 },
    { name: "Feedbacks", value: 12 },
    { name: "Payments", value: 12 },
    { name: "Guides", value: 12 },
    { name: "Jobs", value: 12 },
  ];

  return (
    <div className="p-4 flex flex-col space-y-4 h-full  overflow-y-scroll scrollbar-none">
      <div className="grid grid-cols-4 gap-4">
        {/* Completed */}
        <SummaryCard title={"Completed"} icon={FaRegCheckCircle} value={24} />

        {/* Ongoing */}
        <SummaryCard title={"Ongoing"} icon={FaRegClock} value={12} />

        {/* Upcoming */}
        <SummaryCard title={"Upcoming"} icon={FaRegCalendarAlt} value={2} />

        {/* Rating */}
        <SummaryCard title={"Rating"} icon={FaStar} value={4.8} />
      </div>

      <div className="grid grid-cols-2 gap-4 h-[450px]">
        <Announcements />
        <StatusToggle />
      </div>
    </div>
  );
}

export default Stats;
