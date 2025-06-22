import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { AiOutlineClose } from "react-icons/ai";

const UserDetails = () => {
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
    lastLogedIn: "2025-03-20",
    lastTour: "Cultural Exploration",
    tourList: [
      { id: "101", name: "Safari Adventure" },
      { id: "102", name: "Mountain Hike" },
      { id: "103", name: "City Tour" },
      { id: "104", name: "Beach Holiday" },
      { id: "105", name: "Cultural Exploration" },
    ],
  };

  const handleSendMail = () => {
    setIsMailing(false);
    setMailSubject("");
    setMailBody("");
  };

  return (
    <div className="p-6 space-y-6 border border-green-400 rounded-md bg-green-50 shadow-md h-full overflow-y-auto scrollbar-hide text-green-950">
      {/* Header */}

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-800">User Details</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 "
        >
          Go Back
        </button>
      </div>

      {/* User Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-white border border-green-300 rounded-md shadow">
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
          <span className="font-semibold text-green-800">Last Logged In:</span>{" "}
          {user.lastLogedIn}
        </p>
        <p>
          <span className="font-semibold text-green-800">Last Tour:</span>{" "}
          {user.lastTour}
        </p>
      </div>

      {/* Tour History */}
      <div className="p-4 bg-white border border-green-300 rounded-md shadow">
        <h3 className="text-green-700 font-semibold mb-2">
          User's Tour History
        </h3>
        <ul className="list-disc pl-6 space-y-1 text-green-900">
          {user.tourList.map((tour) => (
            <li key={tour.id}>{tour.name}</li>
          ))}
        </ul>
      </div>

      {/* Write Email Button */}
      {!isMailing && (
        <div className="flex justify-start">
          <button
            onClick={() => setIsMailing(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Write Email
          </button>
        </div>
      )}

      {/* Mail Form */}
      {isMailing && (
        <div className="relative p-4 bg-white border border-green-300 rounded-md shadow space-y-4">
          <button
            onClick={() => setIsMailing(false)}
            className="absolute top-2 right-2 text-green-600 hover:text-green-800"
          >
            <AiOutlineClose size={20} />
          </button>
          <p className="text-green-700 font-semibold">Enter Your Message:</p>
          <input
            type="text"
            value={mailSubject}
            onChange={(e) => setMailSubject(e.target.value)}
            placeholder="Subject"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <textarea
            value={mailBody}
            onChange={(e) => setMailBody(e.target.value)}
            rows="4"
            placeholder="Enter message..."
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            onClick={handleSendMail}
            disabled={!mailSubject || !mailBody}
            className={`px-4 py-2 text-white rounded-md transition-all duration-150 ${
              !mailSubject || !mailBody
                ? "cursor-not-allowed bg-gray-500"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            Send Email
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
