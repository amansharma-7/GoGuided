import { NavLink, useNavigate } from "react-router";

import { IoIosSettings } from "react-icons/io";
import { IoBagHandleOutline } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";

function MenuItems() {
  const navigate = useNavigate();
  return (
    <div className="mt-8 bg-green-100/50">
      <div className="flex flex-col">
        <NavLink
          to="."
          end
          className={({ isActive }) =>
            `flex items-center px-8 py-4 text-xl uppercase bg-green-700 text-green-100 space-x-3 transition-all duration-75 ease-in-out ${
              isActive ? "ml-1 " : "hover:ml-1"
            }`
          }
        >
          <div className="flex items-center space-x-3">
            <IoIosSettings className="text-green-200" />
            <span>Settings</span>
          </div>
        </NavLink>
        <NavLink
          to="bookings"
          className={({ isActive }) =>
            `flex items-center px-8 py-4 text-xl uppercase bg-green-700 text-green-100 space-x-3 transition-all duration-75 ease-in-out ${
              isActive ? "ml-1 " : "hover:ml-1"
            }`
          }
        >
          <div className="flex items-center space-x-3">
            <IoBagHandleOutline className="text-green-200" />
            <span>My Bookings</span>
          </div>
        </NavLink>
        <NavLink
          to="reviews"
          className={({ isActive }) =>
            `flex items-center px-8 py-4 text-xl uppercase bg-green-700 text-green-100 space-x-3 transition-all duration-75 ease-in-out ${
              isActive ? "ml-1 " : "hover:ml-1"
            }`
          }
        >
          <div className="flex items-center space-x-3">
            <FaRegStar className="text-green-200" />
            <span>My Reviews</span>
          </div>
        </NavLink>
        <div className="flex items-center px-8 py-4 text-xl uppercase bg-green-700 text-green-100 space-x-3 transition-all duration-75 ease-in-out hover:ml-1 cursor-pointer">
          <div className="flex items-center space-x-3">
            <MdOutlineLogout className="text-green-200" />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuItems;
