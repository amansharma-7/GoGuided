import React from "react";
import { useNavigate } from "react-router";
function JobUserDetails() {
  const navigate = useNavigate();
  const selectedRequest = {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    number: "1234567890",
    jobTitle: "Frontend Developer",
    requestDate: "2024-03-10",
    resume: "resume.pdf",
    status: "Pending",
  };

  const handleJobRequest = (user, type) => {
    if (type === Rejected) {
      //user request rejected
    } else {
      //user request approved, send mail
    }
  };
  return (
    <div className="p-6 space-y-6 border border-green-400 rounded-md bg-green-50 shadow-md h-full overflow-y-auto scrollbar-hide">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-800">User Details</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          Go Back
        </button>
      </div>

      {/* User Info Card */}
      <div className="mt-4 p-6 border border-green-300 rounded-xl bg-white shadow-lg space-y-3 text-green-900">
        <p>
          <span className="font-semibold text-green-800">Name:</span>{" "}
          {selectedRequest.name}
        </p>
        <p>
          <span className="font-semibold text-green-800">Email:</span>{" "}
          {selectedRequest.email}
        </p>
        <p>
          <span className="font-semibold text-green-800">Number:</span>{" "}
          {selectedRequest.number}
        </p>
        <p>
          <span className="font-semibold text-green-800">Job Title:</span>{" "}
          {selectedRequest.jobTitle}
        </p>
        <p>
          <span className="font-semibold text-green-800">Request Date:</span>{" "}
          {selectedRequest.requestDate}
        </p>
        <p>
          <span className="font-semibold text-green-800">Resume:</span>{" "}
          <a
            href={`/${selectedRequest.resume}`}
            className="text-green-600 underline hover:text-green-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download
          </a>
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => handleJobRequest(selectedRequest.id, "Approved")}
            className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Approve
          </button>
          <button
            onClick={() => handleJobRequest(selectedRequest.id, "Rejected")}
            className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobUserDetails;
