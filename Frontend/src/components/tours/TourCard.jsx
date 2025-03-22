import useSafeNavigate from "../../utils/useSafeNavigate";
import { MdLocationOn } from "react-icons/md";
import { CiCalendar, CiFlag1 } from "react-icons/ci";
import { BiTachometer } from "react-icons/bi";
import { BsSunFill } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";

function TourCard({ id }) {
  const safeNavigate = useSafeNavigate();

  // Tour Data as an Object
  const tourData = {
    title: "The Forest Hiker",
    description: "Breathtaking hike through the Canadian Banff National Park",
    imageUrl:
      "https://images.unsplash.com/photo-1529419412599-7bb870e11810?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    details: [
      { icon: <MdLocationOn size={18} color="green" />, text: "Jammu, India" },
      { icon: <CiCalendar size={18} color="green" />, text: "April 2025" },
      { icon: <BiTachometer size={18} color="green" />, text: "Easy" },
      { icon: <BsSunFill size={18} color="green" />, text: "7 days" },
      { icon: <CiFlag1 size={18} color="green" />, text: "4 Stops" },
      { icon: <IoPersonOutline size={18} color="green" />, text: "10 People" },
    ],
    pricing: {
      pricePerPerson: 10000,
      rating: 4.5,
      reviews: 5,
    },
  };

  return (
    <div className="grid grid-rows-[0.75fr_1.25fr] overflow-hidden shadow-md shadow-black/15">
      <div>
        <img
          className="object-cover object-center h-60 w-full rounded-t-md"
          src={tourData.imageUrl}
          alt={tourData.title}
        />
      </div>
      <div className="bg-white rounded-b-md">
        <div className="flex flex-col gap-y-1 px-6 py-3">
          <h3 className="uppercase font-light text-2xl text-green-950">
            {tourData.title}
          </h3>
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
        <div className="grid grid-cols-2 px-6 py-4">
          <div className="flex flex-col font-extralight">
            <span>
              <strong className="text-lg font-semibold">
                &#8377;{tourData.pricing.pricePerPerson}
              </strong>{" "}
              per person
            </span>
            <span className="">
              <strong className="text-lg font-semibold">
                {tourData.pricing.rating}
              </strong>{" "}
              rating ({tourData.pricing.reviews})
            </span>
          </div>
          <button
            className="m-auto px-10 py-3 bg-green-500 rounded-xl text-white text-lg"
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
