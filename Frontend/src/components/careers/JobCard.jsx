import { MdLocationOn } from "react-icons/md";

export default function JobCard({
  title,
  location,
  type,
  level,
  salary,
  posted,
  applicants,
}) {
  console.log("aman");
  return (
    <div className="py-6">
      <div className="border rounded-2xl p-4 shadow-lg w-80 bg-white">
        <h2 className="text-green-950 font-semibold text-lg mt-2">{title}</h2>
        <div className="flex gap-x-2 items-center py-2">
          <MdLocationOn size={18} color="green" />
          <span>{location}</span>
        </div>
        <div className="flex flex-wrap gap-2 my-3">
          <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
            {type}
          </span>
          <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
            {level}
          </span>
          <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
            {salary}
          </span>
        </div>
        <div className="grid grid-cols-2 px-2 py-4">
          <div className="flex flex-col font-extralight">
            <span className="text-lg font-semibold">{posted}</span>
            <span className="text-lg font-semibold">
              {applicants} applicants
            </span>
          </div>
          <button className="m-auto px-3 py-3 bg-green-500 rounded-xl text-white text-md">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}
