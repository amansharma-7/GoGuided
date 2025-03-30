import useSafeNavigate from "../../utils/useSafeNavigate";
import { CiCalendar, CiFlag1 } from "react-icons/ci";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { IoLocationOutline } from "react-icons/io5";

function TourCard({ id }) {
  const safeNavigate = useSafeNavigate();

  // Tour Data as an Object
  const tourData = {
    title: "The Forest Hiker",
    description: "Breathtaking hike through the Canadian Banff National Park",
    imageUrl:
      "https://images.unsplash.com/photo-1529419412599-7bb870e11810?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    details: [
      {
        icon: <IoLocationOutline size={18} color="green" />,
        text: "Jammu, India",
      },
      { icon: <CiCalendar size={18} color="green" />, text: "April 2025" },
      { icon: <HiArrowTrendingUp size={18} color="green" />, text: "Easy" },
      { icon: <CiFlag1 size={18} color="green" />, text: "4 Stops" },
    ],
    rating: 4.5,
    reviews: 5,
  };

  return (
    <div className="grid grid-rows-[0.75fr_1fr]  overflow-hidden shadow-sm shadow-black/15 h-[450px]">
      <div className="relative overflow-hidden">
        <img
          className="object-cover object-center h-56 w-full rounded-t-md"
          src={tourData.imageUrl}
          alt={tourData.title}
        />
        <div className="bg-white h-30 w-[400px] absolute z-1 -bottom-22 -rotate-9 text-black text-center"></div>
        <div className="flex flex-col items-end px-3 absolute z-3 bottom-12 right-0">
          <p className="bg-green-600/70 shadow-sm p-2 w-fit text-2xl text-white  ">
            {tourData.title.split(" ")[0].toUpperCase()}{" "}
            {tourData.title.split(" ")[1].toUpperCase()}
          </p>
          <p className="bg-green-600/80 shadow-md  p-2 w-fit text-2xl text-white absolute top-10">
            {tourData.title.split(" ")[2].toUpperCase()}
          </p>
        </div>
      </div>
      <div className="bg-white rounded-b-md z-2">
        <div className="flex flex-col gap-y-1 px-6 py-3">
          <p className="font-extralight">{tourData.description}</p>
        </div>

        {/* Tour Details */}
        <div className="grid grid-cols-2 gap-y-2 px-6 py-3">
          {tourData.details.map((detail, index) => (
            <div key={index} className="flex gap-x-2 items-center">
              {detail.icon}
              <span>{detail.text}</span>
            </div>
          ))}
        </div>

        {/* Pricing & Booking */}
        <div className="flex items-center justify-around p-2">
          <div className="text-lg text-green-600 font-semibold flex items-center gap-0.5">
            {Array.from({ length: 5 }, (_, i) =>
              i < Math.floor(tourData.rating) ? (
                <FaStar key={i} className="text-yellow-500" />
              ) : i < tourData.rating ? (
                <FaStarHalfAlt key={i} className="text-yellow-500" />
              ) : (
                <FaRegStar key={i} className="text-yellow-500" />
              )
            )}
          </div>

          <button
            className=" px-6 py-2 bg-green-500 rounded-xl cursor-pointer hover:bg-green-600 text-white text-lg"
            onClick={() => safeNavigate(id)}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default TourCard;
