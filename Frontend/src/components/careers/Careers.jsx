import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import DashboardHeader from "../common/DashboardHeader";
import NoResult from "../../pages/NoResult";

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
    lastDate: "2025-04-10",
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
    lastDate: "2025-04-08",
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
    lastDate: "2025-04-12",
  },
];

function Careers() {
  const [filterState, setFilterState] = useState({
    searchQuery: "",
    sortOrder: "asc",
    selectedFilters: [],
  });

  const [jobsData, setJobsData] = useState(jobListings);

  useEffect(() => {
    function fetchJobs(query) {
      return jobListings.filter(
        (job) =>
          !query ||
          job.title.toLowerCase().includes(query.toLowerCase()) ||
          job.location.toLowerCase().includes(query.toLowerCase()) ||
          job.type.toLowerCase().includes(query.toLowerCase())
      );
    }

    const filteredJobs = fetchJobs(filterState.searchQuery);
    setJobsData(filteredJobs);
  }, [filterState.searchQuery, filterState.selectedFilters]);

  const sortedJobs = [...jobsData].sort((a, b) => {
    const isAscending = filterState.sortOrder === "asc";
    return isAscending
      ? new Date(a.lastDate) - new Date(b.lastDate)
      : new Date(b.lastDate) - new Date(a.lastDate);
  });

  return (
    <section className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-6 flex flex-col gap-6 justify-center">
      <DashboardHeader
        title="Jobs"
        totalCount={sortedJobs.length}
        filterState={filterState}
        setFilterState={setFilterState}
        filterOptions={[
          {
            label: "Date Interval",
            children: [
              { label: "Start Date", value: "startDate", type: "date" },
              { label: "End Date", value: "endDate", type: "date" },
            ],
          },
        ]}
      />
      {sortedJobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 sm:p-6 rounded-md">
          {sortedJobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
      ) : (
        <NoResult />
      )}
    </section>
  );
}

export default Careers;
