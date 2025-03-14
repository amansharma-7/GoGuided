import { useState } from "react";
import { CgSortAz } from "react-icons/cg";
import { CgSortZa } from "react-icons/cg";

function ToursHeader() {
  const [query, setQuery] = useState("");
  const [asc, setAsc] = useState(true);
  const [filter, setFilter] = useState("all");
  const results = 12;

  return (
    <div className="grid grid-cols-[0.9fr_1fr_0.7fr] gap-x-2  px-2 py-1 rounded-md">
      <div className="text-xl font-semibold flex space-x-1 items-center text-green-900">
        <span className="font-bold">{results}</span>
        <span>{`${results === 1 ? "Tour" : "Tours"}`}</span>
      </div>
      <input
        className="border-2 border-black p-2 rounded-md focus:outline-none text-green-900 "
        type="text"
        id="tour"
        placeholder="Search tour..."
        value={query}
        onChange={(e) => setQuery((q) => e.target.value)}
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
          className="border-0 focus-border-0 outline-none appearance-none mx-2 p-2 text-green-950"
          value={filter}
          onChange={(e) => setFilter((val) => (val = e.target.value))}
        >
          <option value="all">All</option>
          <option value="distance">Distance</option>
          <option value="price">Price</option>
          <option value="difficulty">Difficulty</option>
        </select>
      </div>
    </div>
  );
}

export default ToursHeader;
