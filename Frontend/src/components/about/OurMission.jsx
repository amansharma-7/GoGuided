import { BsStars } from "react-icons/bs";
import { IoEarth } from "react-icons/io5";
import { IoMdLock } from "react-icons/io";
import { MdCall } from "react-icons/md";

function OurMission() {
  return (
    <div className="px-32 py-6 flex flex-col gap-6  items-center">
      <h3 className="text-5xl font-bold">Our Mission</h3>
      <div className="grid grid-cols-4 gap-4">
        <div className=" flex flex-col gap-2 items-center  w-72 p-4 shadow-sm shadow-black/40 rounded-lg ">
          <BsStars size={48} color="green" />
          <p className="font-semibold">Beyond Bookings, Into Experiences</p>
          <p className="px-3 tracking-tight">
            We don’t just help you plan; we help you live. Our curated
            adventures blend culture, exploration, and personal touch to
            transform every trip into a story worth telling.
          </p>
        </div>
        <div className=" flex flex-col gap-2 items-center w-72 p-4 shadow-sm shadow-black/40 rounded-lg">
          <IoEarth size={48} color="green" />
          <p className="font-semibold">Authenticity at Every Destination</p>
          <p className="px-3 tracking-tight">
            Travel should feel real. We connect you with local traditions,
            hidden gems, and immersive moments that leave a lasting
            impression—because the best experiences can’t be found in a
            guidebook.
          </p>
        </div>
        <div className=" flex flex-col gap-2 items-center w-72 p-4 shadow-sm shadow-black/40 rounded-lg">
          <IoMdLock size={48} color="green" />
          <p className="font-semibold">Trust, Safety & Seamless Service</p>
          <p className="px-3 tracking-tight">
            Your journey is our priority. From meticulous planning to real-time
            assistance, we ensure every detail is handled with care, so you can
            explore with confidence and peace of mind.
          </p>
        </div>
        <div className=" flex flex-col gap-2 items-center  w-72 p-4 shadow-sm shadow-black/40 rounded-lg">
          <MdCall size={48} color="green" />
          <p className="font-semibold">Always Here, Wherever You Are</p>
          <p className="px-3 tracking-tight">
            The world never sleeps, and neither do we. Whether you need a
            last-minute change, insider tips, or just a friendly voice, our team
            is available 24/7 to support you. Your journey is our journey.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OurMission;
