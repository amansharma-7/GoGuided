import { useNavigate } from "react-router";

import { MdLocationOn } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import { BiTachometer } from "react-icons/bi";
import { BsSunFill } from "react-icons/bs";
import { CiFlag1 } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";

function ToursCard({ id }) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-rows-[0.75fr_1.25fr] overflow-hidden shadow-md shadow-black/15">
      <div>
        <img
          className="object-cover object-center h-60 w-full rounded-t-md"
          src="https://images.unsplash.com/photo-1529419412599-7bb870e11810?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <div className="bg-white rounded-b-md">
        <div className="flex flex-col gap-y-1 px-6 py-3">
          <h3 className="uppercase font-light text-2xl text-green-950">
            The Forest Hiker
          </h3>
          <p className="font-extralight">
            Breathtaking hike through the Canadian Banff National Park
          </p>
        </div>
        <div className=" grid grid-cols-2 gap-y-2 px-6 py-3">
          <div className="flex gap-x-2 items-center">
            <MdLocationOn size={18} color="green" />
            <span>Jammu, India</span>
          </div>
          <div className="flex gap-x-2 items-center">
            <CiCalendar size={18} color="green" />
            <span>April 2025</span>
          </div>
          <div className="flex gap-x-2 items-center">
            <BiTachometer size={18} color="green" />
            <span>Easy</span>
          </div>
          <div className="flex gap-x-2 items-center">
            <BsSunFill size={18} color="green" />
            <span>7 days</span>
          </div>
          <div className="flex gap-x-2 items-center">
            <CiFlag1 size={18} color="green" />
            <span>4 Stop</span>
          </div>
          <div className="flex gap-x-2 items-center">
            <IoPersonOutline size={18} color="green" />
            <span>10 People</span>
          </div>
        </div>
        <div className="grid grid-cols-2 px-6 py-4">
          <div className="flex flex-col font-extralight">
            <span>
              <strong className="text-lg font-semibold">&#8377;10,000</strong>{" "}
              per person
            </span>
            <span className="">
              <strong className="text-lg font-semibold">4.5</strong> rating (5)
            </span>
          </div>
          <button
            className="m-auto px-10 py-3 bg-green-500 rounded-xl text-white text-lg"
            onClick={() => navigate(id)}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToursCard;
