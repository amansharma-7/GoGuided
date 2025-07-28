import { FaRegCheckCircle } from "react-icons/fa";
import {
  FaArrowRight,
  FaIndianRupeeSign,
  FaRegClock,
  FaStar,
} from "react-icons/fa6";
import useSafeNavigate from "../../../../utils/useSafeNavigate";
import Announcements from "../../../common/Announcements";
import { formatNumberIndian } from "../../../../utils/numberFormatter";
import { useUser } from "../../../../context/UserContext";

function StatCard({ title, value, route }) {
  const safeNavigate = useSafeNavigate();

  return (
    <div className="text-green-900 bg-white p-6 rounded-xl shadow-lg flex  justify-between items-center border border-green-300 ">
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-2xl font-semibold">{formatNumberIndian(value)}</p>
      </div>
      {route && (
        <button
          onClick={() => safeNavigate(route)}
          className="bg-green-200 cursor-pointer text-green-900 p-2 rounded-full shadow-md hover:bg-green-300 transition-all duration-200 "
        >
          <FaArrowRight size={20} />
        </button>
      )}
    </div>
  );
}

function Stats() {
  const { user } = useUser();

  return (
    <div className="p-4 flex flex-col space-y-4 h-full overflow-y-scroll scrollbar-none">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4">
        <Announcements />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <StatCard title={"Bookings"} value={120000} route={"bookings"} />
        <StatCard title={"Tours"} value={12} route={"tours"} />
        <StatCard title={"Reviews"} value={10000} route={"reviews"} />
        <StatCard title={"Users"} value={12} route={"users"} />
        <StatCard title={"Feedbacks"} value={12} route={"feedbacks"} />
        <StatCard title={"Guides"} value={12} route={"guides"} />
        <StatCard title={"Jobs"} value={12} route={"jobs"} />
      </div>
      {/* Charts and Announcements */}
    </div>
  );
}

export default Stats;
