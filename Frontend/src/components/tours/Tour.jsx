import Tickets from "./tour_utils/Tickets";
import { BsSunFill } from "react-icons/bs";
import { TiGroup } from "react-icons/ti";
import { FaRegStar } from "react-icons/fa";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { IoLanguage } from "react-icons/io5";
import Timeline from "./tour_utils/Timeline";

function Tour() {
  return (
    <div className="px-32 py-6 ">
      {/* heading */}
      <div>
        <h3 className="font-bold text-2xl text-green-950">The Forest Hiker</h3>
        <div className="py-2 pl-16 flex justify-between">
          <div className="flex gap-5 items-center">
            <span className="flex items-center">
              <span className="">4.8 </span>
              <span className="text-yellow-400 text-2xl">&#9734;</span>
            </span>

            <span>Jammu,India</span>
            <span>30k+ Booked</span>
          </div>
          <div className="flex gap-7">
            <button>Share</button>
            <button>Wishlist</button>
          </div>
        </div>
      </div>

      {/* photos */}
      <div className="grid grid-rows-2 grid-cols-[0.60fr_0.40fr] gap-2 rounded-lg overflow-hidden ">
        <div className="bg-yellow-300 row-span-2 h-90">1</div>
        <div className=" bg-amber-600">2</div>
        <div className=" grid grid-cols-2 gap-2 bg-amber-100">
          <div className="bg-red-500">3</div>
          <div className="bg-blue-500">4</div>
        </div>
      </div>

      {/* overview and booking card */}
      <div className="flex py-6">
        {/* left side */}
        <div className="w-[70%] px-6 py-3 space-y-3">
          <div className="space-y-1">
            <h2 className="font-bold text-2xl">Tour Overview</h2>
            <p className="pl-3">
              The Phi Phi archipelago is a must-visit while in Phuket, and this
              speedboat trip whisks you around the islands in one day. Swim over
              the coral reefs of Pileh Lagoon, have lunch at Phi Phi Leh,
              snorkel at Bamboo Island, and visit Monkey Beach and Maya Bay,
              immortalized in "The Beach." Boat transfers, snacks, buffet lunch,
              snorkeling equipment, and Phuket hotel pickup and drop-off all
              included.
            </p>
          </div>
          <div className="space-y-1">
            <h4 className=" font-semibold text-xl">Tour Highlights</h4>
            <ul className="list-disc list-inside pl-3">
              <li>
                Experience the thrill of a speedboat to the stunning Phi Phi
                Islands
              </li>
              <li>
                Be amazed by the variety of marine life in the archepelago
              </li>
              <li>
                Enjoy relaxing in paradise with white sand beaches and azure
                turquoise water
              </li>
              <li>Feel the comfort of a tour limited to 35 passengers</li>
              <li>Catch a glimpse of the wild monkeys around Monkey Beach</li>
            </ul>
          </div>
        </div>
        {/* right side */}
        <Tickets />
      </div>

      {/* necessary details */}
      <div className="flex  gap-96  py-10  ">
        <div>
          <h2 className="text-3xl font-bold text-green-600">Itinerary</h2>
          <Timeline />
        </div>
        <div className="  flex flex-col gap-16">
          {/* quick facts */}
          <div className="flex flex-col gap-2 ">
            <h3 className="text-3xl font-bold text-green-600">QUICK FACTS</h3>
            <div className="flex gap-3 items-center">
              <BsSunFill size={20} color="green" />
              <span className="font-semibold text-xl">DURATION</span>
              <span className="text-lg font-thin">7 Days</span>
            </div>
            <div className="flex gap-3 items-center">
              <TiGroup size={20} color="green" />
              <span className="font-semibold text-xl">PARTICIPANTS</span>
              <span className="text-lg font-thin">7 People</span>
            </div>
            <div className="flex gap-3 items-center">
              <HiArrowTrendingUp size={20} color="green" />
              <span className="font-semibold text-xl">DIFFICULTY</span>
              <span className="text-lg font-thin">Medium</span>
            </div>
            <div className="flex gap-3 items-center">
              <FaRegStar size={20} color="green" />
              <span className="font-semibold text-xl">RATING</span>
              <span className="text-lg font-thin">4.8/5 </span>
            </div>
            <div className="flex gap-3 items-center">
              <IoLanguage size={20} color="green" />
              <span className="font-semibold text-xl">Languages</span>
              <span className="text-lg font-thin">Hindi,English</span>
            </div>
          </div>

          {/* what's included */}
          <div className="flex flex-col gap-2 ">
            <h3 className="text-3xl font-bold text-green-600">
              What's Included
            </h3>
            <ul className=" pl-3 text-lg font-thin">
              <li>Beverages, drinking water, morning tea and buffet lunch</li>
              <li>Hotel Stay</li>
              <li>Hotel pickup and drop-off by air-conditioned minivan</li>
            </ul>
          </div>
          {/* Tour Guides */}
          <div className="flex flex-col gap-2  ">
            <h3 className="text-3xl font-bold text-green-600 py-2">
              Tour Guides
            </h3>
            <div className="flex gap-3 items-center">
              <img
                src={`https://api.dicebear.com/5.x/initials/svg?seed=Aman%20Sharma`}
                alt="User"
                className="h-8 w-8 rounded-full object-cover object-center"
              />
              <span className="font-semibold text-xl">LEAD GUIDE</span>
              <span className="text-lg font-thin">Aman Sharma</span>
            </div>
            <div className="flex gap-3 items-center">
              <img
                src={`https://api.dicebear.com/5.x/initials/svg?seed=Sudhir%20Sharma`}
                alt="User"
                className="h-8 w-8 rounded-full object-cover object-center"
              />
              <span className="font-semibold text-xl">TOUR GUIDE</span>
              <span className="text-lg font-thin">Sudhir Sharma</span>
            </div>
          </div>
        </div>
        {/* itinerary */}
      </div>
    </div>
  );
}

export default Tour;
