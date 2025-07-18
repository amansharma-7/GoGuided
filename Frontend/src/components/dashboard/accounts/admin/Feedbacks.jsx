import { useEffect, useState } from "react";
import FeedbackHeader from "../../../common/DashboardHeader";
import { FaChevronDown, FaChevronUp, FaPen, FaTimes } from "react-icons/fa";
import NoResult from "../../../../pages/NoResult";

const feedbackList = [
  {
    id: "fdbk001",
    name: "John Doe",
    email: "john.doe@example.com",
    subject: "Booking Issues - Unable to Confirm Guide Selection",
    message:
      "I have been facing issues while booking a guide. The confirmation process fails repeatedly.",
    date: new Date().toLocaleDateString(),
    status: "Pending",
  },
  {
    id: "fdbk002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    subject: "Payment Problems - Unable to Complete Transaction",
    message:
      "I encountered an error while making a payment. The transaction does not go through.",
    date: new Date().toLocaleDateString(),
    status: "Resolved",
  },
  {
    id: "fdbk003",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    subject: "Guide Availability - No Suitable Timings",
    message:
      "I couldn't find any guides available at my preferred times. Can you help me out?",
    date: new Date().toLocaleDateString(),
    status: "Pending",
  },
  {
    id: "fdbk004",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    subject: "Technical Error - App Crashes Frequently",
    message:
      "The app crashes whenever I try to view my booking history. Please fix this issue.",
    date: new Date().toLocaleDateString(),
    status: "Pending",
  },
  {
    id: "fdbk005",
    name: "David Brown",
    email: "david.brown@example.com",
    subject: "Feedback on Guide - Excellent Experience",
    message:
      "The guide was very knowledgeable and helpful. Had a great experience!",
    date: new Date().toLocaleDateString(),
    status: "Resolved",
  },
  {
    id: "fdbk006",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    subject: "Suggestion - Add More Language Options",
    message:
      "It would be great if more language options were available for communication.",
    date: new Date().toLocaleDateString(),
    status: "Pending",
  },
  {
    id: "fdbk007",
    name: "Chris Miller",
    email: "chris.miller@example.com",
    subject: "Issue with Notifications - Not Receiving Updates",
    message:
      "I am not receiving notifications for my bookings. Please check the notification settings.",
    date: new Date().toLocaleDateString(),
    status: "Resolved",
  },
  {
    id: "fdbk008",
    name: "Amanda Garcia",
    email: "amanda.garcia@example.com",
    subject: "App Navigation - Difficult to Find Information",
    message:
      "The app navigation is confusing. Please make it easier to find necessary details.",
    date: new Date().toLocaleDateString(),
    status: "Pending",
  },
  {
    id: "fdbk009",
    name: "Brian Martinez",
    email: "brian.martinez@example.com",
    subject: "Login Problems - Unable to Access My Account",
    message:
      "I am unable to log in to my account despite entering the correct credentials.",
    date: new Date().toLocaleDateString(),
    status: "Resolved",
  },
  {
    id: "fdbk010",
    name: "Olivia Anderson",
    email: "olivia.anderson@example.com",
    subject: "Suggestion - More Guide Profiles",
    message:
      "It would be nice to see more detailed profiles of the guides before booking.",
    date: new Date().toLocaleDateString(),
    status: "Pending",
  },
];

function Feedbacks() {
  const [filterState, setFilterState] = useState({
    searchQuery: "",
    sortOrder: "asc",
    selectedFilters: [],
  });

  const [expandedFeedback, setExpandedFeedback] = useState(null);
  const [replyingFeedback, setReplyingFeedback] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");

  const [feedbacks, setFeedbacks] = useState(feedbackList);

  // const [users, setUsers] = useState(usersData);

  useEffect(() => {
    function fetchFeedbacks(query) {
      return feedbackList.filter(
        (user) =>
          user &&
          user.name &&
          user.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    const filteredFeedbacks = fetchFeedbacks(filterState.searchQuery);
    setFeedbacks(filteredFeedbacks);
  }, [filterState.searchQuery, filterState.selectedFilters]);

  const sortedFeedbacks = [...feedbacks].sort((a, b) => {
    return filterState.sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  const handleReply = (id) => {
    // console.log("Reply sent:", replyMessage);
    setFeedbacks((feedbacks) =>
      feedbacks.map((feedback) =>
        feedback.id === id ? { ...feedback, status: "Resolved" } : feedback
      )
    );
    setReplyingFeedback(null);
    setReplyMessage("");
  };

  return (
    <div className="px-4 py-4 h-full overflow-y-auto scrollbar-hide text-green-950">
      <FeedbackHeader
        title="Feedbacks"
        totalCount={sortedFeedbacks.length}
        filterState={filterState}
        setFilterState={setFilterState}
        filterOptions={[
          {
            label: "Status",
            children: [
              { label: "Pending", value: "pendingReview" },
              { label: "Resolved", value: "resolved" },
            ],
          },
          {
            label: "Date Interval",
            children: [
              { label: "Start Date", value: "startDate", type: "date" },
              { label: "End Date", value: "endDate", type: "date" },
            ],
          },
        ]}
      />

      {sortedFeedbacks.length > 0 ? (
        <>
          {sortedFeedbacks.map((feedback) => (
            <div
              key={feedback.id}
              className="bg-white rounded-2xl mb-4 shadow-lg p-6 border-l-4 border-green-500"
            >
              {/* Header */}
              <div className="flex justify-between items-start sm:items-center">
                <h2 className="text-2xl font-semibold text-green-800 mb-2">
                  {feedback.name}
                </h2>
                <button
                  onClick={() =>
                    setExpandedFeedback(
                      expandedFeedback === feedback.id ? null : feedback.id
                    )
                  }
                  className="text-green-800 hover:text-green-600 transition"
                >
                  {expandedFeedback === feedback.id ? (
                    <FaChevronUp size={20} />
                  ) : (
                    <FaChevronDown size={20} />
                  )}
                </button>
              </div>

              {/* Subject and Status */}
              <div className="flex flex-col sm:flex-row justify-between text-green-800 bg-green-50 p-3 rounded-md mb-4 shadow-sm">
                <p className="font-medium">{feedback.subject}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-2 py-0.5 rounded-md text-sm font-medium ${
                      feedback.status === "Resolved"
                        ? "bg-blue-100 text-blue-700 border border-blue-300"
                        : "bg-yellow-100 text-yellow-800 border border-yellow-300"
                    }`}
                  >
                    {feedback.status}
                  </span>
                </p>
              </div>

              {/* Expanded Message */}
              {expandedFeedback === feedback.id && (
                <div className="p-4 rounded-md bg-green-50 text-green-700 shadow-sm mb-2">
                  <p>{feedback.message}</p>
                </div>
              )}

              {/* Reply Box */}
              {replyingFeedback === feedback.id ? (
                <div className="relative mt-4 p-4 bg-white border border-green-300 rounded-md shadow space-y-4">
                  <button
                    onClick={() => setReplyingFeedback(null)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes size={18} className="text-green-500" />
                  </button>
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
                      onClick={() => handleReply(feedback.id)}
                      className={`px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition ${
                        !replyMessage.trim()
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={!replyMessage.trim()}
                    >
                      Send Reply
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => setReplyingFeedback(feedback.id)}
                    disabled={feedback.status === "Resolved"}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                      feedback.status === "Resolved"
                        ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    <FaPen size={16} />
                    Write Response
                  </button>
                </div>
              )}
            </div>
          ))}
        </>
      ) : (
        <NoResult />
      )}
    </div>
  );
}

export default Feedbacks;
