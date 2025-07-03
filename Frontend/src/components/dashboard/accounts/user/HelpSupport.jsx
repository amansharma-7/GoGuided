import { useState } from "react";
import { FiPhone } from "react-icons/fi";
import { toast } from "react-toastify";

const predefinedQA = [
  {
    question: "What are the available tour packages?",
    answer:
      "We offer city tours, adventure trips, and customized private tours. Check our website for details!",
  },
  {
    question: "How can I book a tour?",
    answer:
      "You can book a tour through our website or contact our support team for assistance.",
  },
  {
    question: "What is the cancellation policy for tours?",
    answer:
      "Cancellations made 48 hours before the tour will receive a full refund. Later cancellations may incur charges.",
  },
  {
    question: "Are there any discounts for group bookings?",
    answer:
      "Yes! We offer special discounts for groups of 5 or more. Contact us for more details.",
  },
  {
    question: "What should I bring on my tour?",
    answer:
      "We recommend comfortable clothing, a water bottle, and any necessary travel documents.",
  },
];

function HelpSupport() {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [callRequested, setCallRequested] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true);

  const handleQuestionClick = (qa) => {
    setChat([
      ...chat,
      { sender: "user", text: qa.question },
      { sender: "bot", text: qa.answer },
    ]);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setChat([
        ...chat,
        { sender: "user", text: message },
        { sender: "bot", text: "We will get back to you soon." },
      ]);
      setMessage("");
    }
  };

  const handleRequestCall = () => {
    setCallRequested(!callRequested);
  };

  return (
    <div className="flex justify-center px-4 py-6 sm:px-6 h-full">
      <div className="w-full max-w-2xl p-4 sm:py-8 bg-white shadow-md rounded-lg h-full overflow-y-auto scrollbar-none">
        <div className="mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-green-900">
            Help & Support
          </h2>
        </div>

        <button
          className="mb-4 bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 w-full sm:w-auto"
          onClick={() => setShowQuestions(!showQuestions)}
        >
          {showQuestions ? "Hide Common Questions" : "Show Common Questions"}
        </button>

        {showQuestions && (
          <div className="mb-4">
            <p className="text-sm font-semibold text-green-800">
              Common Questions:
            </p>
            <div className="space-y-2 mt-2 overflow-y-auto max-h-60">
              {predefinedQA.map((qa, index) => (
                <button
                  key={index}
                  className="w-full text-green-900 bg-white hover:bg-green-200 py-2 px-3 rounded-md text-left shadow-sm"
                  onClick={() => handleQuestionClick(qa)}
                >
                  {qa.question}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="p-3 sm:p-4 h-40 overflow-y-auto bg-white rounded shadow-md scrollbar-hide">
          {chat.map((msg, index) => (
            <p
              key={index}
              className={`mb-1 text-sm ${
                msg.sender === "user" ? "text-green-700" : "text-gray-700"
              }`}
            >
              <strong>{msg.sender === "user" ? "You: " : "Support: "}</strong>
              {msg.text}
            </p>
          ))}
        </div>

        <div className="mt-3 flex flex-col sm:flex-row gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow border border-green-600 p-2 rounded-md focus:outline-none"
          />
          <button
            className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>

        <button
          className="mt-4 w-full flex items-center justify-center gap-2 bg-green-700 text-white py-2 rounded-md hover:bg-green-800"
          onClick={handleRequestCall}
        >
          <FiPhone size={16} />
          {callRequested ? "Cancel Call Request" : "Request a Call"}
        </button>

        {callRequested &&
          toast.success(
            "Your call request has been sent. Our team will contact you soon."
          )}
      </div>
    </div>
  );
}

export default HelpSupport;
