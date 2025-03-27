import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { AiOutlineClose } from "react-icons/ai";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSuspending, setIsSuspending] = useState(false);
  const [suspendReason, setSuspendReason] = useState("");
  const [isSuspended, setIsSuspended] = useState(false);
  const [suspendUntil, setSuspendUntil] = useState("");
  const [isMailing, setIsMailing] = useState(false);
  const [mailSubject, setMailSubject] = useState("");
  const [mailBody, setMailBody] = useState("");

  const user = {
    id,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    numberOfTours: 5,
    lastVisit: "2025-03-20",
    lastTour: "Cultural Exploration",
    tourList: [
      { id: "101", name: "Safari Adventure" },
      { id: "102", name: "Mountain Hike" },
      { id: "103", name: "City Tour" },
      { id: "104", name: "Beach Holiday" },
      { id: "105", name: "Cultural Exploration" },
    ],
    status: isSuspended ? "Suspended" : "Active",
  };

  const getSuspensionEndDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 21);
    return today.toISOString().split("T")[0];
  };

  const handleSuspendUser = () => {};

  const handleSendMail = () => {};

  return (
    <div className="p-6 space-y-6 border border-green-400 rounded-md bg-green-50 shadow-md h-full overflow-y-auto scrollbar-hide text-green-950">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-800">User Details</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Go Back
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 p-4 bg-white border border-green-300 rounded-md shadow">
        <div>
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
            <span className="font-semibold text-green-800">
              Number of Tours:
            </span>{" "}
            {user.numberOfTours}
          </p>
        </div>
        <div>
          <p>
            <span className="font-semibold text-green-800">Last Visit:</span>{" "}
            {user.lastVisit}
          </p>
          <p>
            <span className="font-semibold text-green-800">Last Tour:</span>{" "}
            {user.lastTour}
          </p>
          <p>
            <span className="font-semibold text-green-800">Status:</span>{" "}
            {user.status}
          </p>
          {isSuspended && (
            <p>
              <span className="font-semibold text-green-800">
                Suspended Until:
              </span>{" "}
              {suspendUntil}
            </p>
          )}
        </div>
      </div>

      <div className="p-4 bg-white border border-green-300 rounded-md shadow">
        <h3 className="text-green-700 font-semibold">User's Tour History</h3>
        <ul className="list-disc pl-6">
          {user.tourList.map((tour) => (
            <li key={tour.id} className="text-green-900">
              {tour.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => {
            setIsMailing(true);
            setIsSuspending(false);
          }}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Send Mail
        </button>
        {!isSuspended && (
          <button
            onClick={() => {
              setIsSuspending(true);
              setIsMailing(false);
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Suspend
          </button>
        )}
      </div>

      {isMailing && (
        <div className="relative p-4 bg-white border border-green-300 rounded-md shadow">
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
            className="w-full p-2 border rounded-md"
          />
          <textarea
            value={mailBody}
            onChange={(e) => setMailBody(e.target.value)}
            rows="4"
            placeholder="Enter message..."
            className="w-full p-2 border rounded-md"
          />
          <button
            onClick={handleSendMail}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Send Email
          </button>
        </div>
      )}
      {isSuspending && !isSuspended && (
        <div className="relative p-4 bg-white border border-green-300 rounded-md shadow">
          <button
            onClick={() => setIsSuspending(false)}
            className="absolute top-2 right-2 text-red-600 hover:text-red-800"
          >
            <AiOutlineClose size={20} />
          </button>
          <p className="text-red-700 font-semibold">
            Provide a reason for suspension:
          </p>
          <textarea
            value={suspendReason}
            onChange={(e) => setSuspendReason(e.target.value)}
            rows="3"
            placeholder="Enter suspension reason..."
            className="w-full p-2 border rounded-md"
          />
          <button
            onClick={handleSuspendUser}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Confirm Suspension
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
