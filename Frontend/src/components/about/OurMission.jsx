import { GiPathDistance } from "react-icons/gi";
import { TbWorldSearch } from "react-icons/tb";
import { MdSecurity, MdSupportAgent } from "react-icons/md";
import FeatureCard from "../common/FeatureCard";

const missionData = [
  {
    icon: <GiPathDistance size={48} color="green" />,
    title: "Beyond Bookings",
    description:
      "We don’t just help you plan; we help you live. Our curated adventures create immersive, unforgettable moments that turn trips into lasting stories.",
  },
  {
    icon: <TbWorldSearch size={48} color="green" />,
    title: "Authentic Travel",
    description:
      "Travel should feel real. We connect you with local traditions, hidden gems, and unique experiences that go beyond guidebooks for a meaningful journey.",
  },
  {
    icon: <MdSecurity size={48} color="green" />,
    title: "Safe & Seamless",
    description:
      "Your journey is our priority. From careful planning to real-time support, we ensure a smooth, stress-free experience so you can explore with confidence.",
  },
  {
    icon: <MdSupportAgent size={48} color="green" />,
    title: "24/7 Support",
    description:
      "Wherever you go, we're here. Our team is available round the clock for last-minute changes, expert tips, or any assistance you need.",
  },
];

function OurMission() {
  return (
    <div className="space-y-6 w-full px-6 sm:px-12 md:px-20 lg:px-32 py-6">
      <div className="text-center text-2xl sm:text-3xl font-bold text-green-800">
        Our Mission
      </div>
      <div className="w-full rounded-xl">
        <div className="flex flex-wrap gap-4 items-center justify-center">
          {missionData.map((mission, index) => (
            <FeatureCard
              key={index}
              icon={mission.icon}
              title={mission.title}
              description={mission.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default OurMission;
