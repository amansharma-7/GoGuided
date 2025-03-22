import { PiMoneyWavy } from "react-icons/pi";
import { FaGraduationCap } from "react-icons/fa6";
import { MdDiamond, MdOutlineSupportAgent } from "react-icons/md";

const benefits = [
  {
    icon: <PiMoneyWavy size={48} color="green" />,
    title: "Hassle-Free Reservations",
    description:
      "Hassle-free booking, easy cancellations, and quick refunds—ultimate flexibility for your convenience!",
  },
  {
    icon: <FaGraduationCap size={48} color="green" />,
    title: "Unforgettable Experiences",
    description:
      "We create lasting memories with unique, personalized, and immersive experiences just for you.",
  },
  {
    icon: <MdDiamond size={48} color="green" />,
    title: "Superior Quality & Reliability",
    description:
      "We deliver top-tier services with exceptional attention to detail, ensuring the highest standards every time.",
  },
  {
    icon: <MdOutlineSupportAgent size={48} color="green" />,
    title: "24/7 Customer Assistance",
    description:
      "We’re available around the clock to ensure your questions are answered promptly.",
  },
];

function WhyUs() {
  return (
    <div className="px-32 py-6 flex flex-col gap-6 items-center">
      <h3 className="text-5xl font-bold">Why Us!</h3>
      <div className="grid grid-cols-4 gap-8">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 items-center bg-white w-64 p-4 shadow-sm shadow-black/40 rounded-lg"
          >
            {benefit.icon}
            <p className="font-semibold">{benefit.title}</p>
            <p className="px-5 tracking-tighter">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhyUs;
