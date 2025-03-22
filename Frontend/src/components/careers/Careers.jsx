import React from "react";
import Header from "./Header";
import JobCard from "./JobCard";

function Careers() {
  const jobListings = [
    {
      id: "job-1",
      title: "Product Design Intern",
      location: "Jammu, India",
      type: "Internship",
      level: "Entry Level",
      salary: "Paid",
      posted: "2 days ago",
      applicants: 10,
    },
    {
      id: "job-2",
      title: "Software Engineer",
      location: "Remote",
      type: "Full-time",
      level: "Mid Level",
      salary: "$80k - $100k",
      posted: "1 week ago",
      applicants: 25,
    },
    {
      id: "job-3",
      title: "Marketing Manager",
      location: "New York, USA",
      type: "Part-time",
      level: "Senior Level",
      salary: "$60k - $75k",
      posted: "5 days ago",
      applicants: 15,
    },
  ];
  console.log("aman");
  return (
    <section className="px-32 py-6 flex flex-col gap-6 justify-center">
      <Header />
      <div className="grid grid-cols-3 gap-6 p-6 rounded-md">
        {jobListings.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
    </section>
  );
}

export default Careers;
