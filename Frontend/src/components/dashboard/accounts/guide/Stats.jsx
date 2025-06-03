import { FaRegCalendarAlt, FaRegCheckCircle } from "react-icons/fa";
import { FaRegClock, FaStar } from "react-icons/fa6";
import Announcements from "../../../common/Announcements";
import useSafeNavigate from "../../../../utils/useSafeNavigate";
import StatusToggle from "./StatusToggle";

function SummaryCard({ title, icon: Icon, value, onClick }) {
  return (
    <div
      className="bg-white text-green-950 p-6 border border-green-300 flex flex-col items-center shadow-sm shadow-black/50 rounded-lg space-y-2 cursor-pointer "
      onClick={onClick}
    >
      <div className="flex items-center space-x-2">
        {Icon && <Icon className="text-green-700 text-xl" />}
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <p className="text-4xl font-extrabold">{value}</p>
    </div>
  );
}

function Stats() {
  const navigate = useSafeNavigate();

  return (
    <div className="p-4 flex flex-col space-y-4 h-full  overflow-y-scroll scrollbar-none">
      <div className="grid grid-cols-4 gap-4">
        {/* Completed */}
        <SummaryCard
          title={"Completed"}
          icon={FaRegCheckCircle}
          value={24}
          onClick={() => navigate("bookings/completed")}
        />

        {/* Ongoing */}
        <SummaryCard
          title={"Ongoing"}
          icon={FaRegClock}
          value={12}
          onClick={() => navigate("bookings/ongoing")}
        />

        {/* Upcoming */}
        <SummaryCard
          title={"Upcoming"}
          icon={FaRegCalendarAlt}
          value={2}
          onClick={() => navigate("bookings/upcoming")}
        />

        {/* Rating */}
        <SummaryCard title={"Rating"} icon={FaStar} value={4.8} navTo={null} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Announcements />
        <StatusToggle />
      </div>
    </div>
  );
}

export default Stats;
