import React from "react";

const tourSchedule = [
  { day: "Day 1", task: "Airport Pick Up" },
  { day: "Day 2", task: "Temples & River Cruise" },
  { day: "Day 3", task: "Massage & Overnight Train" },
  { day: "Day 4", task: "Khao Sok National Park" },
  { day: "Day 5", task: "Travel to Koh Phangan" },
  { day: "Day 6", task: "Island Boat Trip" },
  { day: "Day 7", task: "Return Home" },
];

const Timeline = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex flex-col items-center">
        {/* Vertical Line */}
        <div className=" absolute left-[5%] top-11 bottom-11 w-0.5 bg-green-600/50 border-l-2 border-dotted border-green-600"></div>

        {/* Map through days dynamically */}
        {tourSchedule.map((event, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 mt-6 relative"
          >
            {/* Timeline Dots */}
            <div
              className={`${
                index === 0 || index === tourSchedule.length - 1
                  ? "w-8 h-8 bg-green-600"
                  : "w-4 h-4 bg-white border-2 border-green-600"
              } rounded-full `}
            ></div>

            {/* Content */}
            <div className="bg-white shadow-md px-6 py-2 rounded-md flex items-center space-x-3 w-64">
              <div>
                <h3 className="font-bold text-gray-800">{event.day}</h3>
                <p className="text-gray-600 text-sm">{event.task}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
