import { useState, useEffect } from "react";
import { Link } from "react-router";
import { FaStar } from "react-icons/fa";
import { BiEdit, BiSave } from "react-icons/bi";
import { IoTrashOutline } from "react-icons/io5";
import NoReviews from "./NoReviews";
// import axios from "axios";

// const API_URL = "https://your-api-url.com/reviews";

const reviewsData = [
  {
    id: 1,
    name: "The Forest Hiker",
    rating: 4,
    text: "I really liked the mug's color, but after the first wash, small scratches appeared.",
    date: "December 18",
  },
  {
    id: 2,
    name: "The Mountain Biker",
    rating: 5,
    text: "Great quality! The product exceeded my expectations.",
    date: "March 10",
  },
];

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editedText, setEditedText] = useState("");

  // Fetch Reviews on Component Mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // const response = await axios.get(API_URL);
        setReviews(reviewsData); // Assuming API returns an array
      } catch (err) {
        setError("Failed to load reviews. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Handle Edit Click
  const handleEdit = (id, text) => {
    setEditingReviewId(id);
    setEditedText(text);
  };

  // Handle Save Click (API Update)
  const handleSave = async (id) => {
    try {
      // const response = await axios.put(`${API_URL}/${id}`, {
      // text: editedText,
      // });

      setReviews(
        reviews.map((review) =>
          // review.id === id ? { ...review, text: response.data.text } : review
          review.id === id ? { ...review, text: editedText } : review
        )
      );
      setEditingReviewId(null);
    } catch (err) {
      alert("Failed to update review. Try again.");
    }
  };

  // Handle Delete Click (API Delete)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      // await axios.delete(`${API_URL}/${id}`);
      setReviews(reviews.filter((review) => review.id !== id));
    } catch (err) {
      alert("Failed to delete review. Try again.");
    }
  };

  if (reviews.length === 0) return <NoReviews />;

  return (
    <div className="flex flex-col space-y-6  overflow-y-auto">
      <h3 className="text-3xl font-semibold uppercase text-green-700">
        Reviews
      </h3>

      {reviews.map((review) => (
        <div key={review.id} className="flex flex-col space-y-2 border-b pb-4">
          <div className="flex items-center space-x-8">
            <Link
              to={`/reviews/${review.id}`}
              className="text-2xl font-medium text-green-800"
            >
              {review.name}
            </Link>

            {/* Star Rating */}
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  size={18}
                  className={
                    i < review.rating ? "text-yellow-500" : "text-gray-300"
                  }
                />
              ))}
            </div>
          </div>

          {/* Review Text (Editable) */}
          {editingReviewId === review.id ? (
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="w-full p-2 border border-green-500 rounded-md text-gray-700"
            />
          ) : (
            <p className="text-gray-700">{review.text}</p>
          )}

          {/* Date & Actions */}
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">{review.date}</span>
            <div className="flex gap-x-3 items-center text-xl cursor-pointer">
              {editingReviewId === review.id ? (
                <BiSave
                  className="text-green-600 hover:text-green-800"
                  onClick={() => handleSave(review.id)}
                  title="Save"
                />
              ) : (
                <BiEdit
                  className="text-green-600 hover:text-green-800"
                  onClick={() => handleEdit(review.id, review.text)}
                  title="Edit"
                />
              )}
              <IoTrashOutline
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDelete(review.id)}
                title="Delete"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
