import Tickets from "./tour_utils/Tickets";
import { BsSunFill } from "react-icons/bs";

function Tour() {
  return (
    <div className="px-32 py-6 ">
      {/* heading */}
      <div>
        <h3 className="font-bold text-2xl">The Forest Hiker</h3>
        <div className="py-2 pl-16 flex justify-between">
          <div className="flex gap-5">
            <span>4.8(269)</span>
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

      {/* necessary details */}
      <div className=" py-3 flex ">
        <div className="flex gap-5 items-center">
          <BsSunFill
            color="green"
            size={50}
            className=" p-3 shadow-sm shadow-black/40 rounded-lg"
          ></BsSunFill>

          <div className="flex flex-col">
            <span className="font-semibold text-xl">Duration</span>
            <span className="text-lg">3 Days</span>
          </div>
        </div>
      </div>

      {/* overview and booking card */}
      <div className=" flex">
        {/* left side */}
        <div className="w-[70%] px-6 space-y-3">
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
    </div>
  );
}

export default Tour;
