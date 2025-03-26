import { useState } from "react";
import { BsSunFill } from "react-icons/bs";
import { TiGroup } from "react-icons/ti";
import { FaRegStar } from "react-icons/fa";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { CiCalendar } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { IoLanguage } from "react-icons/io5";
import Tickets from "./Tickets";
import Timeline from "./Timeline";
import Photos from "./Photos";
import Map from "./Map";
import Reviews from "../../common/Reviews";
import AddReview from "../../common/AddReview";
const tourData = {
  title: "The Forest Hiker",
  location: "Jammu, India",
  rating: 4.8,
  bookings: "30k+ Booked",
  duration: "7 Days",
  participants: "7 People",
  difficulty: "Medium",
  languages: ["Hindi", "English"],
  date: "07-10-2025",
  overview:
    "The Phi Phi archipelago is a must-visit while in Phuket, and this speedboat trip whisks you around the islands in one day. Swim over the coral reefs of Pileh Lagoon, have lunch at Phi Phi Leh, snorkel at Bamboo Island, and visit Monkey Beach and Maya Bay, immortalized in 'The Beach.' Boat transfers, snacks, buffet lunch, snorkeling equipment, and Phuket hotel pickup and drop-off all included.",
  highlights: [
    "Experience the thrill of a speedboat to the stunning Phi Phi Islands",
    "Be amazed by the variety of marine life in the archipelago",
    "Enjoy relaxing in paradise with white sand beaches and azure turquoise water",
    "Feel the comfort of a tour limited to 35 passengers",
    "Catch a glimpse of the wild monkeys around Monkey Beach",
  ],
  included: [
    "Beverages, drinking water, morning tea and buffet lunch",
    "Hotel Stay",
    "Hotel pickup and drop-off by air-conditioned minivan",
  ],
  guides: [
    {
      name: "Aman Sharma",
      role: "LEAD GUIDE",
      image: "https://api.dicebear.com/5.x/initials/svg?seed=Aman%20Sharma",
    },
    {
      name: "Sudhir Sharma",
      role: "TOUR GUIDE",
      image: "https://api.dicebear.com/5.x/initials/svg?seed=Sudhir%20Sharma",
    },
  ],
};

function Tour() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userReview, setUserReview] = useState(null);

  const handleReviewSubmit = (reviewData) => {
    console.log("Review Submitted:", reviewData);
    setUserReview(reviewData);
    setIsModalOpen(false); // Close modal after submission
  };
  return (
    <div className="px-32 py-6 bg-green-50">
      {/* Heading */}
      <div>
        <h3 className="font-bold text-2xl text-green-950">{tourData.title}</h3>
        <div className="py-2 pl-16 flex justify-between">
          <div className="flex gap-5 items-center">
            <span className="flex items-center">
              <span>{tourData.rating} </span>
              <span className="text-yellow-400 text-2xl">&#9734;</span>
            </span>
            <span>{tourData.location}</span>
            <span>{tourData.bookings}</span>
          </div>
          <div className="flex gap-7">
            <button>Share</button>
            <button>Wishlist</button>
          </div>
        </div>
      </div>

      {/* Photos */}
      <Photos />

      {/* Overview */}
      <div className="flex p-6 justify-between">
        {/* Left Side - Quick Facts */}
        <div className="flex flex-col gap-4">
          <h3 className="text-3xl font-bold text-green-600">QUICK FACTS</h3>
          <div className="flex gap-3 items-center">
            <BsSunFill size={20} color="green" />
            <span className="font-semibold text-xl">DURATION</span>
            <span className="text-lg font-thin">{tourData.duration}</span>
          </div>
          <div className="flex gap-3 items-center">
            <TiGroup size={20} color="green" />
            <span className="font-semibold text-xl">PARTICIPANTS</span>
            <span className="text-lg font-thin">{tourData.participants}</span>
          </div>
          <div className="flex gap-3 items-center">
            <HiArrowTrendingUp size={20} color="green" />
            <span className="font-semibold text-xl">DIFFICULTY</span>
            <span className="text-lg font-thin">{tourData.difficulty}</span>
          </div>
          <div className="flex gap-3 items-center">
            <FaRegStar size={20} color="green" />
            <span className="font-semibold text-xl">RATING</span>
            <span className="text-lg font-thin">{tourData.rating}/5</span>
          </div>
          <div className="flex gap-3 items-center">
            <IoLanguage size={20} color="green" />
            <span className="font-semibold text-xl">Languages</span>
            <span className="text-lg font-thin">
              {tourData.languages.join(", ")}
            </span>
          </div>
          <div className="flex gap-3 items-center">
            <CiCalendar size={20} color="green" />
            <span className="font-semibold text-xl">Date</span>
            <span className="text-lg font-thin">{tourData.date}</span>
          </div>
        </div>

        {/* Right Side - Tour Overview */}
        <div className="w-[70%] px-6 space-y-3">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-green-600">Tour Overview</h2>
            <p className="pl-3">{tourData.overview}</p>
          </div>
          <div className="space-y-1">
            <h4 className="font-semibold text-xl">Tour Highlights</h4>
            <ul className="list-disc list-inside pl-3">
              {tourData.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Itinerary */}
      <h2 className="text-3xl font-bold py-5 px-4 text-green-600">Itinerary</h2>
      <div className="flex flex-col justify-between">
        <div className="flex w-full justify-between">
          <Timeline />
          <Map />
        </div>
      </div>

      {/* Buy and Included Things */}
      <div className="flex py-6 justify-between">
        {/* Left Side */}
        <div className="flex flex-col gap-5">
          {/* What's Included */}
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl font-bold text-green-600">
              What's Included
            </h3>
            <ul className="pl-3 text-lg font-thin">
              {tourData.included.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Tour Guides */}
          <div className="flex flex-col py-1 gap-2">
            <h3 className="text-3xl font-bold text-green-600 py-2">
              Tour Guides
            </h3>
            {tourData.guides.map((guide, index) => (
              <div key={index} className="flex gap-3 items-center">
                <img
                  src={guide.image}
                  alt="User"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="font-semibold text-xl">{guide.role}</span>
                <span className="text-lg font-thin">{guide.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <Tickets />
      </div>

      {/* Reviews */}
      <div className="py-4">
        <div className="flex justify-between px-2">
          <h2 className="text-3xl font-bold text-green-600">Reviews</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-xl font-bold text-green-600 border border-green-300 p-2 rounded-lg"
          >
            {userReview ? "Edit Review" : "Add Review"}
          </button>
        </div>

        <Reviews />

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white  rounded-lg shadow-lg w-200 relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 text-green-600 hover:text-green-900 cursor-pointer"
              >
                <IoClose size={30} />
              </button>
              <AddReview
                initialReview={userReview}
                onSubmit={handleReviewSubmit}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tour;
