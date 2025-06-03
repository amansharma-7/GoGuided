import { MdLocationOn } from "react-icons/md";
import useSafeNavigate from "../../utils/useSafeNavigate";

export default function JobCard({
  title,
  location,
  type,
  level,
  salary,
  posted,
  lastDate,
  applicants,
}) {
  const navigate = useSafeNavigate();

  // Slugify the title for URL path, simple version:
  const jobSlug = title.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="py-6">
      <div className="border rounded-2xl p-4 shadow-lg w-80 bg-white">
        <h2 className="text-green-950 font-semibold text-lg mt-2">{title}</h2>
        <div className="flex gap-x-2 items-center py-2 text-green-700">
          <MdLocationOn size={18} />
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
        <div className="bg-amber-200 text-green-950 text-xs px-3 py-1 rounded-full w-fit">
          Last Date : {lastDate}
        </div>
        <div className="grid grid-cols-2 px-2 py-4">
          <div className="flex flex-col font-extralight">
            <span className="text-lg font-semibold">{posted}</span>
            <span className="text-lg font-semibold">
              {applicants} applicants
            </span>
          </div>
          <button
            aria-label={`Apply now for ${title}`}
            className="m-auto px-3 py-3 bg-green-500 rounded-xl text-white text-md cursor-pointer transition duration-200 ease-in-out hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            onClick={() => navigate(`/jobs/${jobSlug}`)}
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}
