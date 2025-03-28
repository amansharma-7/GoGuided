import { useEffect, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { Link, NavLink } from "react-router";
import useSafeNavigate from "../utils/useSafeNavigate";

const tempUser = {
  name: "Sudhir Sharma",
  role: "admin",
  photo:
    "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1985&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

function Header() {
  const safeNavigate = useSafeNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(tempUser);
  }, []);

  const handleProfileClick = (e) => {
    e.preventDefault();

    if (!user) return safeNavigate("/login");

    switch (user.role) {
      case "admin":
        return safeNavigate("/admin");
      case "guide":
        return safeNavigate("/guide");
      default:
        return safeNavigate("/user");
    }
  };

  return (
    <header className="flex items-center justify-between px-32 py-4 fixed top-0 left-0 w-full h-20 bg-green-50 z-10">
      <h4 className="font-semibold text-5xl text-green-950 ">
        <Link to="/">GoGuided</Link>
      </h4>
      <nav className="flex items-center space-x-6">
        <ul className="flex space-x-4 text-2xl text-green-950 font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "text-green-800" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tours"
              className={({ isActive }) => (isActive ? "text-green-800" : "")}
            >
              Tours
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "text-green-800" : "")}
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "text-green-800" : "")}
            >
              Contact Us
            </NavLink>
          </li>
        </ul>

        <button onClick={handleProfileClick} className="cursor-pointer">
          {user?.photo ? (
            <img
              src={user?.photo}
              alt={user?.name}
              className="w-11 h-11 object-cover object-center rounded-full"
            />
          ) : (
            <FaCircleUser className="w-11 h-11 text-gray-400" />
          )}
        </button>
      </nav>
    </header>
  );
}

export default Header;
