import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp, FaTrash, FaPen } from "react-icons/fa";
import axios from "axios";
import useSafeNavigate from "../../../../utils/useSafeNavigate";

const demoJobs = [
  {
    _id: "1",
    title: "Frontend Developer",
    description:
      "We are looking for a skilled frontend developer proficient in React and Tailwind CSS to build responsive and dynamic user interfaces.",
    location: "Bangalore, India",
    type: "Full-time",
    level: "Mid",
    salary: {
      min: 40000,
      max: 80000,
    },
    lastDateToApply: "2025-05-15T00:00:00.000Z",
    numberOfPosts: 3,
  },
  {
    _id: "2",
    title: "Backend Developer",
    description:
      "Join our backend team to develop scalable APIs using Node.js and MongoDB. Prior experience with cloud services is a plus.",
    location: "Remote",
    type: "Part-time",
    level: "High",
    salary: {
      min: 50000,
      max: 100000,
    },
    lastDateToApply: "2025-05-20T00:00:00.000Z",
    numberOfPosts: 2,
  },
  {
    _id: "3",
    title: "UI/UX Design Intern",
    description:
      "We are hiring a creative intern to assist in designing user-centric wireframes and interfaces for our upcoming products.",
    location: "Delhi, India",
    type: "Internship",
    level: "Easy",
    salary: {
      min: 10000,
      max: 15000,
    },
    lastDateToApply: "2025-05-10T00:00:00.000Z",
    numberOfPosts: 1,
  },
];

const AdminJobManager = () => {
  const [jobs, setJobs] = useState([]);
  const [expandedJobId, setExpandedJobId] = useState(null);
  const navigate = useSafeNavigate();

  // Fetch jobs from backend
  useEffect(() => {
    setJobs(demoJobs);
  }, []);

  const handleDelete = async (jobId) => {
    // Handle delete logic here
    console.log("Deleting job:", jobId);
  };

  const handleEdit = (job) => {
    // Handle edit logic (modal, redirect, form prefill)
    console.log("Editing job:", job);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 h-full overflow-y-auto scrollbar-hide">
      {/* Header */}

      <div className="flex justify-between items-center py-2">
        <h2 className="text-2xl font-bold text-green-800">Manage Jobs</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 "
        >
          Go Back
        </button>
      </div>

      {/* Job Listings */}
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white rounded-2xl mb-6 shadow-lg p-6 border-t-4 border-green-500"
          >
            {/* Job Header */}
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-green-800">
                {job.title}
              </h2>
              <button
                onClick={() =>
                  setExpandedJobId(expandedJobId === job._id ? null : job._id)
                }
                className="text-green-800 hover:text-green-600 transition"
              >
                {expandedJobId === job._id ? (
                  <FaChevronUp size={20} />
                ) : (
                  <FaChevronDown size={20} />
                )}
              </button>
            </div>

            {/* Description */}
            <p className="text-green-800 mb-4">{job.description}</p>

            {/* Expanded Job Details */}
            {expandedJobId === job._id && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-green-700 mt-2">
                <p>
                  <strong>Location:</strong> {job.location}
                </p>
                <p>
                  <strong>Type:</strong> {job.type}
                </p>
                <p>
                  <strong>Level:</strong> {job.level}
                </p>
                <p>
                  <strong>Posts:</strong> {job.numberOfPosts}
                </p>
                <p>
                  <strong>Salary:</strong> ₹{job.salary.min} - ₹{job.salary.max}
                </p>
                <p>
                  <strong>Last Date:</strong>{" "}
                  {new Date(job.lastDateToApply).toLocaleDateString()}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-4 mt-6">
              <button
                onClick={() => handleEdit(job)}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              >
                <FaPen size={16} /> Edit
              </button>
              <button
                onClick={() => handleDelete(job._id)}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                <FaTrash size={16} /> Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center mt-10">No jobs available.</p>
      )}
    </div>
  );
};

export default AdminJobManager;
