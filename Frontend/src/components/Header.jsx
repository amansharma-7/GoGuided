import { FaCircleUser } from "react-icons/fa6";
import { Link, NavLink } from "react-router";

const user = {
  name: "Sudhir Sharma",
  photo:
    "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1985&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

function Header() {
  return (
    <header className="flex items-center justify-between px-32 py-4 fixed top-0 left-0 w-full h-20 bg-black z-10">
      <h4 className="font-semibold text-5xl text-green-50 ">
        <Link to="/">GoGuided</Link>
      </h4>
      <nav className="flex items-center space-x-6">
        <ul className="flex space-x-4 text-2xl text-green-50 font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "text-green-300" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tours"
              className={({ isActive }) => (isActive ? "text-green-300" : "")}
            >
              Tours
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "text-green-300" : "")}
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "text-green-300" : "")}
            >
              Contact Us
            </NavLink>
          </li>
        </ul>
        <div className="">
          <Link to="/me">
            {/* <FaCircleUser color="" className="text-gray-400" size={42} /> */}
            {user?.photo ? (
              <img
                src={user?.photo}
                alt={user?.name}
                className="w-11 h-11 object-cover object-center rounded-full"
              />
            ) : (
              <FaCircleUser className="w-11 h-11 text-gray-400" />
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
