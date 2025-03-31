import { FaRegCheckCircle } from "react-icons/fa";
import {
  FaArrowRight,
  FaIndianRupeeSign,
  FaRegClock,
  FaStar,
} from "react-icons/fa6";
import useSafeNavigate from "../../../../utils/useSafeNavigate";
import Announcements from "../../../common/Announcements";

import React from "react";
import BookingChart from "./BookingChart";

function SummaryCard({ title, icon: Icon, value }) {
  return (
    <div className="bg-white text-green-950 p-6 border border-green-300 flex flex-col items-center shadow-sm shadow-black/50 rounded-lg space-y-2">
      <div className="flex items-center space-x-2">
        {Icon && <Icon className="text-green-700 text-xl" />}
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <p className="text-4xl font-extrabold">{value}</p>
    </div>
  );
}

function StatCard({ title, value, route }) {
  const safeNavigate = useSafeNavigate();

  return (
    <div className="text-green-900 bg-white p-6 rounded-xl shadow-lg flex justify-between items-center border border-green-300">
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-3xl font-bold">{value}</p>
      </div>
      {route && (
        <button
          onClick={() => safeNavigate(route)}
          className="bg-green-200 cursor-pointer text-green-900 p-2 rounded-full shadow-md hover:bg-green-300 transition-all duration-200"
        >
          <FaArrowRight size={20} />
        </button>
      )}
    </div>
  );
}

function Stats() {
  return (
    <div className="p-4 flex flex-col space-y-4 h-full  overflow-y-scroll scrollbar-none">
      <div className="grid grid-cols-4 gap-4">
        {/* Total Revenue */}
        <SummaryCard
          title={"Revenue"}
          icon={FaIndianRupeeSign}
          value={`₹5,00,000`}
        />

        {/* Completed */}
        <SummaryCard title={"Completed"} icon={FaRegCheckCircle} value={24} />

        {/* Ongoing */}
        <SummaryCard title={"Ongoing"} icon={FaRegClock} value={12} />

        {/* Rating */}
        <SummaryCard title={"Rating"} icon={FaStar} value={4.8} />
      </div>

      <div className="grid grid-cols-2 gap-4 ">
        <BookingChart />
        <Announcements />
      </div>

      <div className="grid grid-cols-4 gap-4 ">
        <StatCard title={"Bookings"} value={12} route={"bookings"} />
        <StatCard title={"Tours"} value={12} route={"tours"} />
        <StatCard title={"Reviews"} value={12} route={"reviews"} />
        <StatCard title={"Users"} value={12} route={"users"} />
        <StatCard title={"Feedbacks"} value={12} route={"feedbacks"} />
        <StatCard title={"Payments"} value={12} route={"payments"} />
        <StatCard title={"Guides"} value={12} route={"guides"} />
        <StatCard title={"Jobs"} value={12} route={"jobs"} />
        <StatCard title={"Refunds"} value={12} route={"refunds"} />
      </div>
    </div>
  );
}

export default Stats;
