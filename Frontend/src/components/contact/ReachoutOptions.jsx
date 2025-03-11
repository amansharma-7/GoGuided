import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineLocalPhone } from "react-icons/md";
import { PiBuildingsBold } from "react-icons/pi";

function ReachoutOptions() {
  return (
    <div className="grid grid-rows-[1.35fr_0.65fr] grid-cols-1 space-y-2 pb-2 rounded-lg shadow-md shadow-black/50">
      <div className="w-full  overflow-hidden">
        <img
          src="images/contact-us.jpg"
          alt="contact us image"
          className="object-cover object-center object- w-full h-full rounded-lg "
        />
      </div>
      <div className="flex flex-col gap-2 bg-green-50/50 rounded-lg p-4 ">
        <div className="grid grid-cols-[48px_1fr] gap-x-3 p-4 bg-green-50/25 rounded-lg">
          <MdOutlineLocalPhone
            size={48}
            color="green"
            className=" bg-green-200 rounded-full p-2"
          />
          <div className="flex flex-col -space-y-1">
            <span className="text-xl font-medium">Phone</span>
            <span>1234567890</span>
          </div>
        </div>
        <div className="grid grid-cols-[48px_1fr] gap-x-3 p-4 bg-green-50/25 rounded-lg">
          <HiOutlineMail
            size={48}
            color="green"
            className=" bg-green-200 rounded-full p-2"
          />
          <div className="flex flex-col -space-y-1">
            <span className="text-xl font-medium">Email</span>
            <span>goguided@co.in</span>
          </div>
        </div>
        <div className="grid grid-cols-[48px_1fr] gap-x-3 p-4 bg-green-50/25 rounded-lg">
          <PiBuildingsBold
            size={48}
            color="green"
            className=" bg-green-200 rounded-full p-2"
          />
          <div className="flex flex-col -space-y-1">
            <span className="text-xl font-medium">Address</span>
            <span>Hanuman mandir k peeche mat ana aghey ana aghey</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReachoutOptions;
