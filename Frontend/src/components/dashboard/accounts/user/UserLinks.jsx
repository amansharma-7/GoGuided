import { IoIosSettings } from "react-icons/io";
import { IoBagHandleOutline } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { HiOutlineSpeakerphone } from "react-icons/hi";

import NavItem from "../NavItem";

function UserLinks() {
  return (
    <>
      <NavItem to={"."}>
        <IoIosSettings className="text-green-200" />
        <span>Settings</span>
      </NavItem>

      <NavItem to="announcements">
        <HiOutlineSpeakerphone className="text-green-200" />
        <span>Announcements</span>
      </NavItem>

      <NavItem to="bookings">
        <IoBagHandleOutline className="text-green-200" />
        <span>My Bookings</span>
      </NavItem>

      <NavItem to="reviews">
        <FaRegStar className="text-green-200" />
        <span>My Reviews</span>
      </NavItem>

      <NavItem to="logout">
        <MdOutlineLogout className="text-green-200" />
        <span>Logout</span>
      </NavItem>
    </>
  );
}

export default UserLinks;
