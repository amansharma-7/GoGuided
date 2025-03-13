import React from "react";
import Header from "./Header";
import JobCard from "./JobCard";

function Careers() {
  return (
    <section className="px-32 py-6 flex flex-col gap-6 justify-center">
      <Header />
      <div className="grid grid-cols-3  p-6 rounded-md">
        {Array.from({ length: 2 }).map((el, i) => (
          <JobCard key={i} id="meow" />
        ))}
      </div>
    </section>
  );
}

export default Careers;
