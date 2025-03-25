import React, { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const allReviews = [
  {
    id: 1,
    name: "Alice",
    comment:
      "The tour was absolutely amazing! The guide was knowledgeable and friendly. I learned so much and had a great time exploring new places. It was one of the best experiences I’ve ever had.",
    rating: 5,
  },
  {
    id: 2,
    name: "Bob",
    comment:
      "A wonderful experience! The places we visited were breathtaking. I would highly recommend this tour to anyone interested in history and culture.",
    rating: 4.3,
  },
  {
    id: 3,
    name: "Charlie",
    comment:
      "Great experience overall. The tour was well organized, and I learned a lot. The guide shared unique insights that I wouldn’t have known otherwise. Definitely worth it!",
    rating: 4.8,
  },
  {
    id: 4,
    name: "Diana",
    comment:
      "It was okay. Some parts could be improved. There were a few delays that made the experience less enjoyable.",
    rating: 3.2,
  },
  {
    id: 5,
    name: "Eve",
    comment:
      "I loved the experience! Would definitely recommend it to friends. The group was friendly, and the guide kept it engaging. Perfect for exploring new places.",
    rating: 4.6,
  },
  {
    id: 6,
    name: "Frank",
    comment:
      "An unforgettable journey! The guide made everything interesting. I got to see places I never imagined I would see. Truly a remarkable experience!",
    rating: 4.9,
  },
  {
    id: 7,
    name: "Grace",
    comment:
      "It was nice, but a bit too crowded for my liking. Still, I enjoyed learning about the history of the locations.",
    rating: 3.7,
  },
  {
    id: 8,
    name: "Hannah",
    comment:
      "Best tour I have ever been on! Highly recommended. The views were stunning, and the guide was top-notch. Every moment was worth it!",
    rating: 5,
  },
];

const Reviews = () => {
  const [visibleReviews, setVisibleReviews] = useState(5);

  const loadMoreReviews = () => {
    setVisibleReviews((prev) => Math.min(prev + 5, allReviews.length));
  };

  return (
    <div className="w-[320px] h-[240px">
      <div className="min-w-[320px] h-[240px] flex items-center justify-center bg-gradient-to-b from-green-600 to-green-700 rounded-2xl shadow-2xl transition-transform duration-200 ease-in-out hover:scale-105">
        <button
          onClick={loadMoreReviews}
          className="p-3 py-2 bg-gradient-to-b from-green-700 to-green-800 rounded-xl text-white font-medium shadow-2xl transition-transform duration-200 hover:scale-105 cursor-pointer"
        >
          Load More Reviews
        </button>
      </div>
    </div>
  );
};

export default Reviews;
