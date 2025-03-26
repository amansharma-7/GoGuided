// import { PiMoneyWavy } from "react-icons/pi";
// import { FaGraduationCap } from "react-icons/fa6";
// import { MdDiamond, MdOutlineSupportAgent } from "react-icons/md";

// const benefits = [
//   {
//     icon: <PiMoneyWavy size={48} color="green" />,
//     title: "Hassle-Free Reservations",
//     description:
//       "Hassle-free booking, easy cancellations, and quick refunds—ultimate flexibility for your convenience!",
//   },
//   {
//     icon: <FaGraduationCap size={48} color="green" />,
//     title: "Unforgettable Experiences",
//     description:
//       "We create lasting memories with unique, personalized, and immersive experiences just for you.",
//   },
//   {
//     icon: <MdDiamond size={48} color="green" />,
//     title: "Superior Quality & Reliability",
//     description:
//       "We deliver top-tier services with exceptional attention to detail, ensuring the highest standards every time.",
//   },
//   {
//     icon: <MdOutlineSupportAgent size={48} color="green" />,
//     title: "24/7 Customer Assistance",
//     description:
//       "We’re available around the clock to ensure your questions are answered promptly.",
//   },
// ];

// function WhyUs() {
//   return (
//     <div className="px-32 py-6 flex flex-col gap-6 items-center">
//       <h3 className="text-5xl font-bold">Why Us!</h3>
//       <div className="grid grid-cols-4 gap-8">
//         {benefits.map((benefit, index) => (
//           <div
//             key={index}
//             className="flex flex-col gap-3 items-center bg-white w-64 p-4 shadow-sm shadow-black/40 rounded-lg"
//           >
//             {benefit.icon}
//             <p className="font-semibold">{benefit.title}</p>
//             <p className="px-5 tracking-tighter">{benefit.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default WhyUs;

import React from "react";
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
    <div className="space-y-6 w-full px-32 py-6">
      <div className="text-center text-3xl font-bold text-green-800">
        Why Choose Us!
      </div>
      <div className="w-full rounded-xl">
        <div className="flex gap-4 items-center">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="min-w-[310px] h-[240px] p-6 border border-green-300 rounded-2xl bg-white shadow-md shadow-black/50 transition-transform duration-200 ease-in-out hover:scale-105 overflow-hidden relative flex flex-col gap-2 items-center"
            >
              <div className="text-3xl mb-2">{benefit.icon}</div>
              <h3 className="text-lg font-semibold text-green-800">
                {benefit.title}
              </h3>
              <p className="text-sm text-green-700 overflow-hidden max-h-24 pr-2">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WhyUs;
