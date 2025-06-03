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
    <div className="p-6 space-y-6 border border-green-400 rounded-md bg-green-50 shadow-md h-full">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-800">User Details</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 cursor-pointerj"
        >
          Go Back
        </button>
      </div>
      <div className="mt-6 p-6 border rounded-lg bg-white shadow-lg ">
        <p>
          <strong>Name:</strong> {selectedRequest.name}
        </p>
        <p>
          <strong>Email:</strong> {selectedRequest.email}
        </p>
        <p>
          <strong>Number:</strong> {selectedRequest.number}
        </p>
        <p>
          <strong>Job Title:</strong> {selectedRequest.jobTitle}
        </p>
        <p>
          <strong>Request Date:</strong> {selectedRequest.requestDate}
        </p>
        <p>
          <strong>Resume:</strong>{" "}
          <a
            href={`/${selectedRequest.resume}`}
            className="text-green-500 underline"
          >
            Download
          </a>
        </p>
        <div className="mt-4">
          <button
            onClick={() => handleJobRequest(selectedRequest.id, "Approved")}
            className="bg-green-600 text-white px-5 py-2 rounded-md mr-3 hover:bg-green-700"
          >
            Approve
          </button>
          <button
            onClick={() => handleJobRequest(selectedRequest.id, "Rejected")}
            className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobUserDetails;
