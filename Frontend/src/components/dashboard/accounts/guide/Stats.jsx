import { FaRegCheckCircle } from "react-icons/fa";
import {
  FaArrowRight,
  FaIndianRupeeSign,
  FaRegClock,
  FaStar,
} from "react-icons/fa6";
import useSafeNavigate from "../../../../utils/useSafeNavigate";
import ChartComponent from "../admin/ChartComponent";
import StatusToggle from "./Statustoggle";

function SummaryCard({ title, icon: Icon, value, navTo }) {
  const safeNavigate = useSafeNavigate();
  return (
    <div
      className="bg-white text-green-950 p-6 border border-green-300 flex flex-col items-center shadow-sm shadow-black/50 rounded-lg space-y-2 cursor-pointer "
      onClick={navTo === null ? "" : () => safeNavigate(navTo)}
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
  return (
    <div className="p-4 flex flex-col space-y-4 h-full  overflow-y-scroll scrollbar-none">
      <div className="grid grid-cols-4 gap-4">
        {/* Completed */}
        <SummaryCard
          title={"Completed"}
          icon={FaRegCheckCircle}
          value={24}
          navTo={"completed-bookings"}
        />

        {/* Ongoing */}
        <SummaryCard
          title={"Ongoing"}
          icon={FaRegClock}
          value={12}
          navTo={"ongoing-bookings"}
        />

        {/* Upcoming */}
        <SummaryCard
          title={"Upcoming"}
          icon={FaIndianRupeeSign}
          value={2}
          navTo={"upcoming-bookings"}
        />

        {/* Rating */}
        <SummaryCard title={"Rating"} icon={FaStar} value={4.8} navTo={null} />
      </div>

      <div className="grid grid-cols-2 gap-4 ">
        <StatusToggle />
      </div>
    </div>
  );
}

export default Stats;
