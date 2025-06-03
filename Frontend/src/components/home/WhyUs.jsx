import { PiMoneyWavy } from "react-icons/pi";
import { FaGraduationCap } from "react-icons/fa6";
import { MdDiamond } from "react-icons/md";
import { MdOutlineSupportAgent } from "react-icons/md";

function WhyUs() {
  return (
    <div className="px-32 py-6 flex flex-col gap-6 items-center">
      <h3 className="text-5xl font-bold">Why Us!</h3>
      <div className="grid grid-cols-4 gap-8">
        <div className=" flex flex-col gap-3 items-center bg-white w-64 p-4 shadow-sm shadow-black/40 rounded-lg">
          <PiMoneyWavy size={48} color="green" opacity={1} />
          <p className="font-semibold">Hassle-Free Reservations</p>
          <p className="px-5 tracking-tighter">
            Hassle-free booking, easy cancellations, and quick refunds—ultimate
            flexibility for your convenience!
          </p>
        </div>
        <div className=" flex flex-col gap-3 items-center bg-white w-64 p-4 shadow-sm shadow-black/40 rounded-lg">
          <FaGraduationCap size={48} color="green" />
          <p className="font-semibold">Unforgettable Experiences</p>
          <p className="px-5 tracking-tighter">
            We create lasting memories with unique, personalized, and immersive
            experiences just for you.
          </p>
        </div>
        <div className=" flex flex-col gap-3 items-center bg-white w-64 p-4 shadow-sm shadow-black/40 rounded-lg">
          <MdDiamond size={48} color="green" />
          <p className="font-semibold">Superior Quality & Reliability</p>
          <p className="px-5 tracking-tighter">
            We deliver top-tier services with exceptional attention to detail,
            ensuring the highest standards every time.
          </p>
        </div>
        <div className=" flex flex-col gap-3 items-center bg-white w-64 p-4 shadow-sm shadow-black/40 rounded-lg">
          <MdOutlineSupportAgent size={48} color="green" />
          <p className="font-semibold">24/7 Customer Assistance</p>
          <p className="px-5 tracking-tighter">
            We’re available around the clock to ensure your questions are
            answered promptly.
          </p>
        </div>
      </div>
    </div>
  );
}

export default WhyUs;
