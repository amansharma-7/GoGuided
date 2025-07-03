import { useState } from "react";
import {
  FaStar,
  FaRegStar,
  FaHeart,
  FaRegHeart,
  FaArrowLeft,
} from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";
import { TiGroup } from "react-icons/ti";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { CiCalendar } from "react-icons/ci";
import { IoLanguage } from "react-icons/io5";

import CallToAction from "./CallToAction";
import IncludedAndGuided from "./IncludedAndGuides";
import Timeline from "./Timeline";
import Photos from "./Photos";
import Map from "./Map";
import Reviews from "../../common/Reviews";
import AddReview from "../../common/AddReview";
import useSafeNavigate from "../../../utils/useSafeNavigate";
import ShareModal from "../../common/ShareModal";

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
      name: "Sudhir Sharma",
      role: "LEAD GUIDE",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Aman Sharma",
      role: "TOUR GUIDE",
      image: "",
    },
  ],
};

function Tour() {
  const safeNavigate = useSafeNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userReview, setUserReview] = useState(null);
  const [liked, setLiked] = useState(false);
  const [share, setShare] = useState(false);
  const shareUrl = window.location.origin + location.pathname;

  const handleReviewSubmit = (reviewData) => {
    console.log("Review Submitted:", reviewData);
    setUserReview(reviewData);
    setIsModalOpen(false); // Close modal after submission
  };
  return (
    <div className="px-4 md:px-20 lg:px-32 py-6 flex flex-col gap-6">
      {/* Heading */}
      <div className="shadow-md bg-white rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        {/* Left Side: Title, Rating, Location */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-6 w-full ">
          {/* Title */}
          <div className="flex gap-4 items-center ">
            <button
              className="bg-green-600 text-white p-2.5 sm:p-3 rounded-full uppercase font-semibold tracking-wide hover:bg-green-700 transition cursor-pointer flex items-center justify-center"
              onClick={() => safeNavigate(-1)}
              aria-label="Back"
            >
              <FaArrowLeft size={18} />
            </button>
            <h3 className="font-bold text-xl sm:text-3xl text-green-900 truncate max-w-xs sm:max-w-none">
              {tourData.title}
            </h3>
          </div>
          <div className="flex justify-between w-full ">
            <div className="flex gap-4 items-center ">
              {/* Rating */}
              <span className="flex items-center gap-1 text-lg sm:text-xl font-semibold text-green-950 whitespace-nowrap">
                {tourData.rating}
                <FaStar className="text-yellow-400 text-xl sm:text-2xl" />
              </span>

              {/* Location */}
              <span className="text-sm sm:text-lg text-green-950 truncate max-w-xs">
                {tourData.location}
              </span>
            </div>
            <div className="flex gap-3 sm:gap-4">
              <button
                className="text-white rounded-lg uppercase font-semibold tracking-wide transition cursor-pointer flex items-center justify-center p-1 sm:p-2"
                onClick={() => setLiked(!liked)}
                aria-label="Like tour"
              >
                {liked ? (
                  <FaHeart color="red" size={20} />
                ) : (
                  <FaRegHeart color="black" size={20} />
                )}
              </button>
              <button
                className="bg-green-700 text-white px-3 py-1 rounded-lg uppercase font-semibold tracking-wide hover:bg-green-800 transition cursor-pointer text-sm sm:text-base"
                onClick={() => setShare(!share)}
              >
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Buttons */}
      </div>

      {/* Photos */}
      <Photos />

      {/* Overview */}
      <div className="flex flex-col md:flex-row rounded-lg gap-8">
        {/* Left Side - Quick Facts */}
        <div className="flex flex-col gap-5 w-full md:w-1/3 bg-white p-4 sm:p-5 rounded-lg shadow-sm">
          <h3 className="text-xl md:text-2xl font-bold text-green-900">
            Quick Facts
          </h3>

          {/* Each fact */}
          <div className="flex items-center gap-2 sm:gap-3 text-green-950 flex-wrap">
            <BsSunFill size={20} className="text-green-500" />
            <span className="font-medium text-sm sm:text-lg whitespace-nowrap">
              Duration:
            </span>
            <span className="text-sm sm:text-lg font-light">
              {tourData.duration}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-green-950 flex-wrap">
            <TiGroup size={20} className="text-green-500" />
            <span className="font-medium text-sm sm:text-lg whitespace-nowrap">
              Participants:
            </span>
            <span className="text-sm sm:text-lg font-light">
              {tourData.participants}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-green-950 flex-wrap">
            <HiArrowTrendingUp size={20} className="text-green-500" />
            <span className="font-medium text-sm sm:text-lg whitespace-nowrap">
              Difficulty:
            </span>
            <span className="text-sm sm:text-lg font-light">
              {tourData.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-green-950 flex-wrap">
            <FaRegStar size={20} className="text-green-500" />
            <span className="font-medium text-sm sm:text-lg whitespace-nowrap">
              Rating:
            </span>
            <span className="text-sm sm:text-lg font-light">
              {tourData.rating}/5
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-green-950 flex-wrap">
            <IoLanguage size={20} className="text-green-500" />
            <span className="font-medium text-sm sm:text-lg whitespace-nowrap">
              Languages:
            </span>
            <span className="text-sm sm:text-lg font-light">
              {tourData.languages.join(", ")}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-green-950 flex-wrap">
            <CiCalendar size={20} className="text-green-500" />
            <span className="font-medium text-sm sm:text-lg whitespace-nowrap">
              Date:
            </span>
            <span className="text-sm sm:text-lg font-light">
              {tourData.date}
            </span>
          </div>
        </div>

        {/* Right Side - Tour Overview */}
        <div className="w-full md:w-2/3 bg-white p-4 sm:p-5 rounded-lg shadow-sm">
          <div className="space-y-3">
            <h3 className="text-xl md:text-2xl font-bold text-green-900">
              About This Tour
            </h3>
            <p className="text-green-950 leading-relaxed max-h-28 overflow-y-auto scrollbar-none text-sm sm:text-base">
              {tourData.overview}
            </p>
          </div>

          <div className="mt-4 pb-1">
            <h4 className="text-lg md:text-xl font-semibold text-green-900">
              Tour Highlights
            </h4>
            <ul className="list-disc list-inside text-green-950 mt-2 space-y-1 md:space-y-2 max-h-36 overflow-y-auto scrollbar-none text-sm sm:text-base">
              {tourData.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Itinerary */}
      <div className="flex flex-col justify-between gap-5 rounded-lg p-4 sm:p-5 bg-white shadow-sm">
        <h2 className="text-xl md:text-2xl font-bold text-green-900">
          Itinerary
        </h2>
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 w-full justify-between rounded-lg">
          <Timeline />
          <Map />
        </div>
      </div>

      {/* Buy and Included Things */}
      <div className="flex flex-col md:flex-row justify-between items-stretch gap-6 md:gap-10 bg-white p-4 sm:p-6 rounded-xl shadow-lg h-full">
        <IncludedAndGuided
          included={tourData.included}
          guides={tourData.guides}
        />
        <CallToAction />
      </div>

      {/* Reviews */}
      <div>
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row shadow-sm rounded-sm items-start sm:items-center justify-between p-2 gap-2 sm:gap-0">
            <h2 className="text-xl md:text-2xl font-bold text-green-900">
              Reviews
            </h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="font-bold text-green-600 border border-green-300 p-2 rounded-lg cursor-pointer self-start sm:self-auto"
            >
              {userReview ? "Edit Review" : "Add Review"}
            </button>
          </div>

          <Reviews />
        </div>

        {/* Modal */}
        {isModalOpen && (
          <AddReview
            initialReview={userReview}
            onSubmit={handleReviewSubmit}
            setIsModalOpen={setIsModalOpen}
          />
        )}

        {share && (
          <ShareModal
            isOpen={share}
            setIsModalOpen={setShare}
            shareUrl={shareUrl}
          />
        )}
      </div>
    </div>
  );
}

export default Tour;
