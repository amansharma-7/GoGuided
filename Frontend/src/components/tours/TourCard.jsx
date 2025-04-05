import useSafeNavigate from "../../utils/useSafeNavigate";
import { formatDate } from "../../utils/utils";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendar, CiFlag1 } from "react-icons/ci";
import { HiArrowTrendingUp } from "react-icons/hi2";
import RatingStars from "../common/RatingStars";

function TourCard({ tour }) {
  const navigate = useSafeNavigate();

  return (
    <div className="grid grid-rows-[0.75fr_1fr] overflow-hidden shadow-sm shadow-black/15 h-[450px]">
      <div className="relative overflow-hidden">
        <img
          className="object-cover object-center h-56 w-full rounded-t-md"
          src={tour.imageUrl}
          alt={tour.title}
        />
        <div className="bg-white h-30 w-[120%] absolute z-1 -bottom-21 -rotate-9 text-black text-center"></div>
        <div className="flex flex-col items-end px-3 absolute z-3 bottom-12 right-0">
          <p className="bg-green-600/70 shadow-sm p-2 w-fit text-2xl text-white">
            {tour.title.split(" ")[0].toUpperCase()}{" "}
            {tour.title.split(" ")[1]?.toUpperCase()}
          </p>
          {tour.title.split(" ")[2] && (
            <p className="bg-green-600/80 shadow-md p-2 w-fit text-2xl text-white absolute top-10">
              {tour.title.split(" ")[2].toUpperCase()}
            </p>
          )}
        </div>
      </div>
      <div className="bg-white rounded-b-md z-2">
        <div className="flex flex-col gap-y-1 px-6 py-3">
          <p className="font-extralight">{tour.description}</p>
        </div>

        {/* Tour Details */}
        <div className="grid grid-cols-2 gap-y-2 px-6 py-3">
          <div className="flex gap-x-2 items-center">
            <IoLocationOutline size={18} color="green" />{" "}
            <span>{tour.location}</span>
          </div>
          <div className="flex gap-x-2 items-center">
            <CiCalendar size={18} color="green" />{" "}
            <span>{formatDate(tour.startDate)}</span>
          </div>
          <div className="flex gap-x-2 items-center">
            <HiArrowTrendingUp size={18} color="green" />{" "}
            <span>{tour.difficulty}</span>
          </div>
          <div className="flex gap-x-2 items-center">
            <CiFlag1 size={18} color="green" /> <span>{tour.stops} Stops</span>
          </div>
        </div>

        {/* Rating & Booking */}
        <div className="flex items-center justify-around p-2">
          <div className="text-lg text-green-600 font-semibold flex items-center gap-0.5">
            <RatingStars Review_Count={tour.rating} />
          </div>

          <button
            className="px-6 py-2 bg-green-500 rounded-xl cursor-pointer hover:bg-green-600 text-white text-lg"
            onClick={() => navigate(tour.slug)}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default TourCard;
