import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { AiOutlineClose } from "react-icons/ai";

const GuideDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isMailing, setIsMailing] = useState(false);
  const [mailSubject, setMailSubject] = useState("");
  const [mailBody, setMailBody] = useState("");

  const user = {
    id,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    numberOfTours: 5,
    lastLoggedIn: "2025-03-20",
    lastTour: "Cultural Exploration",
    role: "Guide",
    tourList: [
      { id: "101", name: "Safari Adventure" },
      { id: "102", name: "Mountain Hike" },
      { id: "103", name: "City Tour" },
      { id: "104", name: "Beach Holiday" },
      { id: "105", name: "Cultural Exploration" },
    ],
    status: "Available",
  };

  const handleSendMail = () => {
    setIsMailing(false);
    setMailSubject("");
    setMailBody("");
  };

  return (
    <div className="p-6 space-y-6 border border-green-400 rounded-md bg-green-50 shadow-md h-full overflow-y-auto scrollbar-none text-green-950">
      {/* Header */}

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-800">Guide Details</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 "
        >
          Go Back
        </button>
      </div>
      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-white border border-green-300 rounded-md shadow-sm">
        <p>
          <span className="font-semibold text-green-800">User ID:</span>{" "}
          {user.id}
        </p>
        <p>
          <span className="font-semibold text-green-800">Name:</span>{" "}
          {user.name}
        </p>
        <p>
          <span className="font-semibold text-green-800">Email:</span>{" "}
          {user.email}
        </p>
        <p>
          <span className="font-semibold text-green-800">Phone:</span>{" "}
          {user.phone}
        </p>
        <p>
          <span className="font-semibold text-green-800">Number of Tours:</span>{" "}
          {user.numberOfTours}
        </p>
        <p>
          <span className="font-semibold text-green-800">Last Logged in:</span>{" "}
          {user.lastLoggedIn}
        </p>
        <p>
          <span className="font-semibold text-green-800">Last Tour:</span>{" "}
          {user.lastTour}
        </p>
        <p>
          <span className="font-semibold text-green-800">Status:</span>{" "}
          <span className="bg-purple-100 text-blue-700 border border-blue-400 px-2 py-0.5 rounded-md text-sm">
            {user.status}
          </span>
        </p>
      </div>

      {/* Tour History */}
      <div className="p-4 bg-white border border-green-300 rounded-md shadow-sm">
        <h3 className="text-green-700 font-semibold mb-2">
          User's Tour History
        </h3>
        <ul className="list-disc pl-6 space-y-1">
          {user.tourList.map((tour) => (
            <li key={tour.id} className="text-green-900">
              {tour.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Email Trigger */}
      {!isMailing && (
        <div>
          <button
            onClick={() => setIsMailing(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            Write Email
          </button>
        </div>
      )}

      {/* Email Form */}
      {isMailing && (
        <div className="relative p-4 bg-white border border-green-300 rounded-md shadow-sm space-y-4">
          <button
            onClick={() => setIsMailing(false)}
            className="absolute top-2 right-2 text-green-600 hover:text-green-800"
          >
            <AiOutlineClose size={20} />
          </button>
          <div className="space-y-2">
            <p className="text-green-700 font-semibold">Enter Your Message:</p>
            <input
              type="text"
              value={mailSubject}
              onChange={(e) => setMailSubject(e.target.value)}
              placeholder="Subject"
              className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <textarea
              value={mailBody}
              onChange={(e) => setMailBody(e.target.value)}
              rows="4"
              placeholder="Enter message..."
              className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleSendMail}
              disabled={!mailSubject || !mailBody}
              className={`px-4 py-2 text-white rounded-md transition ${
                !mailSubject || !mailBody
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              Send Email
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuideDetails;
