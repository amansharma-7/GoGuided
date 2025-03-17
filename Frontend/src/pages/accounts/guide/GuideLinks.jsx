import NavItem from "../NavItem";
import { IoIosSettings } from "react-icons/io";
import { MdOutlineLogout, MdOutlineSpaceDashboard } from "react-icons/md";

function GuideLinks() {
  return (
    <>
      <NavItem to=".">
        <MdOutlineSpaceDashboard className="text-green-200" />
        <span>Dashboard</span>
      </NavItem>
      <NavItem to="settings">
        <IoIosSettings className="text-green-200" />
        <span>Settings</span>
      </NavItem>

      <NavItem to="logout">
        <MdOutlineLogout className="text-green-200" />
        <span>logout</span>
      </NavItem>
    </>
  );
}

export default GuideLinks;
