import { FaCircleUser } from "react-icons/fa6";
import { Link, NavLink } from "react-router";

function Header() {
  return (
    <header className="flex items-center justify-between px-32 py-4 fixed top-0 left-0 w-full h-20 bg-black/70 z-10">
      <h4 className="font-semibold text-5xl text-[#f8f7f5] ">
        <Link to="/">GoGuided</Link>
      </h4>
      <nav className="flex items-center space-x-6">
        <ul className="flex space-x-4 text-2xl text-[#f8f7f5]">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/tours">Tours</NavLink>
          </li>
          <li>
            <NavLink to="/about">About Us</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact Us</NavLink>
          </li>
        </ul>
        <div className="">
          <Link to="/me">
            <FaCircleUser color="" className="text-gray-400" size={42} />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
