import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { useState } from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";

function Tickets() {
  const [Adultcount, setAdultcount] = useState(0);
  const [Youthcount, setYouthcount] = useState(0);
  const [Childcount, setChildcount] = useState(0);

  return (
    <div className=" w-[30%] px-6">
      <div className="flex justify-between  ">
        <h3 className="font-semibold">Tickets</h3>
        <span className="font-semibold">Available </span>
      </div>

      {/* tickets addition */}
      <div>
        <div className="flex justify-between items-center  py-2">
          <div className="flex gap-2 items-center">
            <span className=" font-semibold">Adult (18+ years) </span>
            <span className="flex items-center justify-center ">
              {/* <FaIndianRupeeSign size={14} className="" /> */}
              <span className="font-semibold">&#8377;</span>
              <p>100</p>
            </span>
          </div>
          <div className="flex gap-2 items-center ">
            <CiCircleMinus color="green" size={20} />
            <span className=" text-xl -mt-1">{Adultcount}</span>
            <CiCirclePlus color="green" size={20} />
          </div>
        </div>
        <div className="flex justify-between items-center  py-2">
          <div className="flex gap-2 items-center">
            <span className=" font-semibold">Youth (13-17 years) </span>
            <span className="flex items-center justify-center ">
              {/* <FaIndianRupeeSign size={14} className="" /> */}
              <span className="font-semibold">&#8377;</span>
              <p>100</p>
            </span>
          </div>
          <div className="flex gap-2 items-center ">
            <CiCircleMinus color="green" size={20} />
            <span className=" text-xl -mt-1">{Youthcount}</span>
            <CiCirclePlus color="green" size={20} />
          </div>
        </div>
        <div className="flex justify-between items-center  py-2">
          <div className="flex gap-2 items-center">
            <span className=" font-semibold">Children (0-12 years) </span>
            <span className="flex items-center justify-center ">
              <span className="font-semibold">&#8377;</span>
              <p>100</p>
            </span>
          </div>
          <div className="flex gap-2 items-center ">
            <CiCircleMinus color="green" size={20} />
            <span className=" text-xl -mt-1">{Childcount}</span>
            <CiCirclePlus color="green" size={20} />
          </div>
        </div>
      </div>

      {/* total and book now button */}
      <div className="flex flex-col item-center justify-center">
        {/* total */}
        <div className="flex justify-between items-center  py-2">
          <span className="font-semibold text-2xl">Total</span>
          <span className="flex items-center justify-center font-semibold text-2xl">
            <span className="font-semibold">&#8377;</span>
            <p>100</p>
          </span>
        </div>

        {/* buy button */}
        <button className="bg-yellow-300 py-3 rounded-lg ">Book Now</button>
      </div>
    </div>
  );
}

export default Tickets;
