import React from "react";
import { IoFilter } from "react-icons/io5";
function Header() {
  return (
    <div className="flex justify-between items-center px-32">
      <span>{12} tours </span>
      <input type="text" placeholder="search tours"></input>
      <div>
        <IoFilter className="rotate-180" />
        <span></span>
      </div>
    </div>
  );
}

export default Header;
