import { useState } from "react";
import { CgSortAz } from "react-icons/cg";
import { CgSortZa } from "react-icons/cg";

function Header() {
  const [asc, setAsc] = useState(true);
  const results = 2;
  return (
    <div className="grid grid-cols-[0.9fr_1fr_0.7fr] gap-x-2  px-32 py-1 rounded-md">
      <div className="text-xl font-semibold flex space-x-1 items-center">
        <span className="font-bold">{results}</span>
        <span>{`${results === 1 ? "Post" : "Posts"}`}</span>
      </div>
      <input
        className="border-2 border-black p-1.5 rounded-md focus:outline-none "
        type="text"
        id="tour"
        placeholder="Search jobs..."
      ></input>
      <div className="grid grid-cols-[0.2fr_1fr]  border-2 rounded-md">
        <button
          onClick={() => setAsc((is) => !is)}
          className="hover:cursor-pointer border-r-2 mx-auto"
        >
          {asc === true ? (
            <CgSortZa size={42} color="green" />
          ) : (
            <CgSortAz size={42} color="green" />
          )}
        </button>
        <select
          name="filter"
          id="filter"
          className="border-0 focus-border-0 outline-none appearance-none mx-2 p-2"
        >
          <option value="all" selected>
            All
          </option>
          <option value="distance">Distance</option>
          <option value="price">Price</option>
          <option value="difficulty">Difficulty</option>
        </select>
      </div>
    </div>
  );
}

export default Header;
