import { useState } from "react";
import FeedbackHeader from "../../../common/DashboardHeader";
import { FaChevronDown, FaChevronUp, FaPen } from "react-icons/fa";

const feedbackList = [
  {
    id: "fdbk001",
    name: "John Doe",
    email: "john.doe@example.com",
    subject: "Booking Issues - Unable to Confirm Guide Selection",
    message:
      "I have been facing issues while booking a guide. The confirmation process fails repeatedly.",
    date: new Date().toLocaleDateString(),
  },
  {
    id: "fdbk002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    subject: "Payment Problems - Unable to Complete Transaction",
    message:
      "I encountered an error while making a payment. The transaction does not go through.",
    date: new Date().toLocaleDateString(),
  },
  {
    id: "fdbk003",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    subject: "Guide Availability - No Suitable Timings",
    message:
      "I couldn't find any guides available at my preferred times. Can you help me out?",
    date: new Date().toLocaleDateString(),
  },
  {
    id: "fdbk004",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    subject: "Technical Error - App Crashes Frequently",
    message:
      "The app crashes whenever I try to view my booking history. Please fix this issue.",
    date: new Date().toLocaleDateString(),
  },
  {
    id: "fdbk005",
    name: "David Brown",
    email: "david.brown@example.com",
    subject: "Feedback on Guide - Excellent Experience",
    message:
      "The guide was very knowledgeable and helpful. Had a great experience!",
    date: new Date().toLocaleDateString(),
  },
  {
    id: "fdbk006",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    subject: "Suggestion - Add More Language Options",
    message:
      "It would be great if more language options were available for communication.",
    date: new Date().toLocaleDateString(),
  },
  {
    id: "fdbk007",
    name: "Chris Miller",
    email: "chris.miller@example.com",
    subject: "Issue with Notifications - Not Receiving Updates",
    message:
      "I am not receiving notifications for my bookings. Please check the notification settings.",
    date: new Date().toLocaleDateString(),
  },
  {
    id: "fdbk008",
    name: "Amanda Garcia",
    email: "amanda.garcia@example.com",
    subject: "App Navigation - Difficult to Find Information",
    message:
      "The app navigation is confusing. Please make it easier to find necessary details.",
    date: new Date().toLocaleDateString(),
  },
  {
    id: "fdbk009",
    name: "Brian Martinez",
    email: "brian.martinez@example.com",
    subject: "Login Problems - Unable to Access My Account",
    message:
      "I am unable to log in to my account despite entering the correct credentials.",
    date: new Date().toLocaleDateString(),
  },
  {
    id: "fdbk010",
    name: "Olivia Anderson",
    email: "olivia.anderson@example.com",
    subject: "Suggestion - More Guide Profiles",
    message:
      "It would be nice to see more detailed profiles of the guides before booking.",
    date: new Date().toLocaleDateString(),
  },
];

function Feedbacks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedFilters, setSelectedFilters] = useState({});
  const [expandedFeedback, setExpandedFeedback] = useState(null);
  const [isReplying, setIsReplying] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");

  console.log(isReplying);

  const handleReply = () => {
    console.log("Reply sent:", replyMessage);
    // Add your logic here for handling the reply (e.g., API call)
    setIsReplying(false);
    setReplyMessage("");
  };

  return (
    <div className="px-4 py-4 h-full overflow-y-auto">
      <FeedbackHeader
        title="Feedbacks"
        totalCount={100}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSortOrder={setSortOrder}
        sortOrder={sortOrder}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        filterOptions={[
          {
            label: "Category 1",
            children: [
              { label: "Option 1", value: "opt1" },
              { label: "Option 2", value: "opt2" },
            ],
          },
          {
            label: "Category 2",
            children: [
              { label: "Option A", value: "optA" },
              { label: "Option B", value: "optB" },
            ],
          },
        ]}
      />

      {feedbackList.map((feedback) => (
        <div
          key={feedback.id}
          className="bg-green-50 rounded-2xl shadow-lg p-6 border-t-2 border-green-500"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-green-800 mb-2">
              {feedback.name}
            </h2>
            <button
              onClick={() =>
                setExpandedFeedback((expandedFeedback) =>
                  expandedFeedback === feedback.id ? null : feedback.id
                )
              }
              className="text-green-800 hover:text-green-600 transition cursor-pointer"
            >
              {expandedFeedback === feedback.id ? (
                <FaChevronUp size={20} />
              ) : (
                <FaChevronDown size={20} />
              )}
            </button>
          </div>
          <p className="text-green-800 bg-green-50 p-3 rounded-md mb-4 shadow-sm">
            {feedback.subject}
          </p>
          {expandedFeedback === feedback.id && (
            <div className="grid grid-cols-2 gap-4 p-4 bg-green-50 rounded-md shadow-sm">
              <p className="font-normal text-green-700">{feedback.message}</p>
            </div>
          )}

          {!isReplying ? (
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setIsReplying(!isReplying)}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer"
              >
                <FaPen size={16} /> Write Response
              </button>
            </div>
          ) : (
            <div className="p-4 bg-white border border-green-300 rounded-md shadow space-y-4">
              <div className="space-y-2">
                <p className="text-green-700 font-semibold">
                  Write your response:
                </p>
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  rows="3"
                  placeholder="Enter your reply here..."
                  className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={handleReply}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Send Reply
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Feedbacks;
