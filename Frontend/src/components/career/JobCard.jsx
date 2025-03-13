import { MdLocationOn } from "react-icons/md";

export default function JobCard() {
  return (
    <div className=" py-6 ">
      <div className="border rounded-2xl p-4 shadow-lg w-80 bg-white ">
        <div className="flex justify-between items-start"></div>
        <h2 className="text-green-950 font-semibold text-lg mt-2">
          Product Design Intern
        </h2>
        <div className="flex gap-x-2 items-center py-2">
          <MdLocationOn size={18} color="green" />
          <span>Jammu, India</span>
        </div>
        <div className="flex flex-wrap gap-2 my-3">
          <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
            Internship
          </span>
          <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
            Entry Level
          </span>
          <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
            Paid
          </span>
          <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
            Full-time
          </span>
        </div>
        <div className="grid grid-cols-2 px-2 py-4">
          <div className="flex flex-col font-extralight">
            <span className="text-lg font-semibold">2 days ago</span>
            <span className="text-lg font-semibold">10 applicants</span>
          </div>
          <button className="m-auto px-3 py-3 bg-green-500 rounded-xl text-white text-md">
            Apply Now
          </button>
        </div>
        {/* <p className="text-gray-500 text-xs">
        2 days ago | <span className="text-blue-600">12 applicants</span>
      </p>
      <p className="text-gray-500 text-xs mt-2">Last Date: March 25, 2025</p>
      <button className="w-full mt-3 bg-blue-600 text-white hover:bg-blue-700">
        Apply Now
      </button> */}
      </div>
    </div>
  );
}
