import { FaCircleUser } from "react-icons/fa6";
import { Link, NavLink } from "react-router";

function Header() {
  return (
    <header className="flex items-center justify-between px-16 py-4 fixed top-0 left-0 w-full bg-transparent z-10">
      <h4 className="font-semibold text-5xl text-gray-300">
        <Link to="/">GoGuided</Link>
      </h4>
      <nav className="flex items-center space-x-6">
        <ul className="flex space-x-4 text-2xl text-gray-300">
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
        <div className="text-gray-400">
          <Link to="/me">
            <FaCircleUser color="" size={42} />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
