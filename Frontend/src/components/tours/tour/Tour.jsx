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
import { IoClose, IoLanguage } from "react-icons/io5";

import Tickets from "./Tickets";
import Timeline from "./Timeline";
import Photos from "./Photos";
import Map from "./Map";
import Reviews from "../../common/Reviews";
import AddReview from "../../common/AddReview";
import Avatar from "../../common/Avatar";
import useSafeNavigate from "../../../utils/useSafeNavigate";
import { use } from "react";
import { FaH } from "react-icons/fa6";
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

  const handleReviewSubmit = (reviewData) => {
    console.log("Review Submitted:", reviewData);
    setUserReview(reviewData);
    setIsModalOpen(false); // Close modal after submission
  };
  return (
    <div className="px-32 py-6 flex flex-col gap-6">
      {/* Heading */}
      <div className=" shadow-md bg-white rounded-lg p-5 flex justify-between items-center">
        {/* Left Side: Title, Rating, Location */}
        <div className="flex items-center gap-6">
          {/* Title */}
          <button
            className="bg-green-600 text-white p-3 rounded-full uppercase font-semibold tracking-wide hover:bg-green-700 transition cursor-pointer"
            onClick={() => safeNavigate(-1)}
          >
            <FaArrowLeft />
          </button>
          <h3 className="font-bold text-3xl text-green-900">
            {tourData.title}
          </h3>

          {/* Rating */}
          <span className="flex items-center gap-1 text-xl font-semibold text-green-950">
            {tourData.rating}
            <FaStar className="text-yellow-400 text-2xl" />
          </span>

          {/* Location */}
          <span className="text-lg text-green-950">{tourData.location}</span>
        </div>

        {/* Right Side: Buttons */}
        <div className="flex gap-4">
          <button
            className=" text-white  rounded-lg uppercase font-semibold tracking-wide  transition cursor-pointer"
            onClick={() => setLiked(!liked)}
          >
            {liked ? (
              <FaHeart color="red" size={24} />
            ) : (
              <FaRegHeart color="black" size={24} />
            )}
          </button>
          <button className="bg-green-700 text-white px-3 py-1 rounded-lg uppercase font-semibold tracking-wide hover:bg-green-800 transition cursor-pointer">
            Share
          </button>
        </div>
      </div>
      {/* Photos */}
      <Photos />
      {/* Overview */}
      <div className="flex flex-col md:flex-row rounded-lg gap-10">
        {/* Left Side - Quick Facts */}
        <div className="flex flex-col gap-5 w-full md:w-1/3 bg-white p-5 rounded-lg shadow-sm">
          <h3 className="text-2xl font-bold text-green-900">Quick Facts</h3>

          <div className="flex items-center gap-3 text-green-950">
            <BsSunFill size={22} className="text-green-500" />
            <span className="font-medium text-lg">Duration:</span>
            <span className="text-lg font-light">{tourData.duration}</span>
          </div>

          <div className="flex items-center gap-3 text-green-950">
            <TiGroup size={22} className="text-green-500" />
            <span className="font-medium text-lg">Participants:</span>
            <span className="text-lg font-light">{tourData.participants}</span>
          </div>

          <div className="flex items-center gap-3 text-green-950">
            <HiArrowTrendingUp size={22} className="text-green-500" />
            <span className="font-medium text-lg">Difficulty:</span>
            <span className="text-lg font-light">{tourData.difficulty}</span>
          </div>

          <div className="flex items-center gap-3 text-green-950">
            <FaRegStar size={22} className="text-green-500" />
            <span className="font-medium text-lg">Rating:</span>
            <span className="text-lg font-light">{tourData.rating}/5</span>
          </div>

          <div className="flex items-center gap-3 text-green-950">
            <IoLanguage size={22} className="text-green-500" />
            <span className="font-medium text-lg">Languages:</span>
            <span className="text-lg font-light">
              {tourData.languages.join(", ")}
            </span>
          </div>

          <div className="flex items-center gap-3 text-green-950">
            <CiCalendar size={22} className="text-green-500" />
            <span className="font-medium text-lg">Date:</span>
            <span className="text-lg font-light">{tourData.date}</span>
          </div>
        </div>

        {/* Right Side - Tour Overview */}
        <div className="w-full md:w-2/3 bg-white p-5 rounded-lg shadow-sm">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-green-900">
              About This Tour
            </h3>
            <p className="text-green-950 leading-relaxed max-h-28 overflow-y-auto scrollbar-none">
              {tourData.overview}
            </p>
          </div>

          <div className="mt-4">
            <h4 className="text-xl font-semibold text-green-900">
              Tour Highlights
            </h4>
            <ul className="list-disc list-inside text-green-950 mt-2 space-y-2 max-h-36 overflow-y-auto scrollbar-none">
              {tourData.highlights.map((highlight, index) => (
                <li key={index} className="">
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Itinerary */}
      <div className="flex flex-col justify-between gap-5 rounded-lg p-5 bg-white shadow-sm">
        <h2 className="text-2xl font-bold text-green-900">Itinerary</h2>
        <div className="flex gap-10 w-full justify-between  rounded-lg">
          <Timeline />
          <Map />
        </div>
      </div>
      {/* Buy and Included Things */}
      <div className="flex p-5 justify-between bg-white shadow-sm rounded-lg">
        {/* Left Side */}
        <div className="flex flex-col justify-between">
          {/* What's Included */}
          <div className="flex flex-col gap-2 shadow-sm p-2 rounded-lg">
            <h3 className="text-xl font-bold text-green-900">
              What's Included
            </h3>
            <ul className="pl-3 text-green-950 tracking-tight">
              {tourData.included.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Tour Guides */}
          <div className="flex flex-col p-2 gap-2 shadow-sm rounded-lg">
            <h3 className="text-xl font-bold text-green-900">Tour Guides</h3>
            {tourData.guides.map((guide, index) => (
              <div key={index} className="flex gap-3 items-center pl-3">
                {guide?.image ? (
                  <Avatar size={48} imageURL={guide.image} />
                ) : (
                  <Avatar
                    size={48}
                    bgColor={"bg-green-500"}
                    textColor={"text-white"}
                    textSize={"text-2xl"}
                    fontWeight={"font-semibold"}
                    fullName={guide.name}
                  />
                )}

                <span className="text-2xl text-green-950">{guide.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <Tickets />
      </div>
      {/* Reviews */}
      <div>
        <div className="bg-white rounded-lg shadow-sm p-5">
          <div className="flex shadow-sm rounded-sm items-center justify-between p-2">
            <h2 className="text-2xl font-bold text-green-900">Reviews</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className=" font-bold text-green-600 border border-green-300 p-2 rounded-lg cursor-pointer"
            >
              {userReview ? "Edit Review" : "Add Review"}
            </button>
          </div>

          <Reviews />
        </div>

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
