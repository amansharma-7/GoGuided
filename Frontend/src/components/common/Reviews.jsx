import React, { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Avatar from "./Avatar";

const allReviews = [
  {
    id: 1,
    name: "Alice",
    comment:
      "The tour was absolutely amazing! The guide was knowledgeable and friendly. I learned so much and had a great time exploring new places. It was one of the best experiences I’ve ever had.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Bob",
    comment:
      "A wonderful experience! The places we visited were breathtaking. I would highly recommend this tour to anyone interested in history and culture.",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Charlie",
    comment:
      "Great experience overall. The tour was well organized, and I learned a lot. The guide shared unique insights that I wouldn’t have known otherwise. Definitely worth it!",
    rating: 4.5,
  },
  {
    id: 4,
    name: "Diana",
    comment:
      "It was okay. Some parts could be improved. There were a few delays that made the experience less enjoyable.",
    rating: 3.5,
  },
  {
    id: 5,
    name: "Eve",
    comment:
      "I loved the experience! Would definitely recommend it to friends. The group was friendly, and the guide kept it engaging. Perfect for exploring new places.",
    rating: 4.5,
  },
  {
    id: 6,
    name: "Frank",
    comment:
      "An unforgettable journey! The guide made everything interesting. I got to see places I never imagined I would see. Truly a remarkable experience!",
    rating: 4.5,
  },
  {
    id: 7,
    name: "Grace",
    comment:
      "It was nice, but a bit too crowded for my liking. Still, I enjoyed learning about the history of the locations.",
    rating: 3.5,
  },
  {
    id: 8,
    name: "Hannah",
    comment:
      "Best tour I have ever been on! Highly recommended. The views were stunning, and the guide was top-notch. Every moment was worth it!",
    rating: 5,
  },
];

function Reviews() {
  const [visibleReviews, setVisibleReviews] = useState(5);

  const loadMoreReviews = () => {
    setVisibleReviews((prev) => Math.min(prev + 5, allReviews.length));
  };

  return (
    <div className="w-full py-6 rounded-xl overflow-x-auto scrollbar-none">
      <div className="flex gap-4 items-center">
        {allReviews.slice(0, visibleReviews).map((review) => (
          <div
            key={review.id}
            className="min-w-[310px] h-[240px] p-6 border border-green-500 rounded-2xl bg-white shadow-md shadow-black/50 transition-transform duration-200 ease-in-out hover:scale-105 overflow-hidden relative flex flex-col gap-2"
          >
            <div className="flex items-center gap-1 mb-1">
              {review?.image ? (
                <Avatar size={48} imageURL={review.image} />
              ) : (
                <Avatar
                  size={48}
                  bgColor={"bg-green-500"}
                  textColor={"text-white"}
                  textSize={"text-2xl"}
                  fontWeight={"font-semibold"}
                  fullName={review.name}
                />
              )}
              <h3 className="text-xl font-semibold text-green-800">
                {review.name}
              </h3>
            </div>
            <div className="text-sm text-green-700 mb-2 italic relative pl-6 before:content-['“'] before:text-2xl before:text-green-600 before:absolute before:left-0 overflow-y-auto max-h-20 pr-2 whitespace-normal scrollbar-none">
              {review.comment}
            </div>
            <p className="text-sm text-green-600 font-semibold flex items-center gap-0.5 mt-auto">
              {Array.from({ length: 5 }, (_, i) =>
                i < Math.floor(review.rating) ? (
                  <FaStar key={i} className="text-yellow-500" />
                ) : i < review.rating ? (
                  <FaStarHalfAlt key={i} className="text-yellow-500" />
                ) : (
                  <FaRegStar key={i} className="text-yellow-500" />
                )
              )}{" "}
              ({review.rating}/5)
            </p>
          </div>
        ))}
        {visibleReviews < allReviews.length && (
          <div className="min-w-[320px] h-[240px] flex items-center justify-center bg-green-300 rounded-2xl shadow-md transition-transform duration-200 ease-in-out hover:scale-105">
            <button
              onClick={loadMoreReviews}
              className="p-4 py-2 bg-green-700 rounded-xl text-white font-medium shadow-2xl transition-transform duration-200 hover:scale-105 cursor-pointer"
            >
              Load More Reviews
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reviews;
