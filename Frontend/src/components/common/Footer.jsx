import { Link, NavLink } from "react-router";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { MdCall } from "react-icons/md";

function Footer() {
  return (
    <footer className="flex flex-col gap-10 px-32 py-4 pt-10 bg-green-50 text-green-950">
      <div className="flex gap-32">
        <div className="w-1/3 flex flex-col gap-2">
          <h4 className="font-semibold text-5xl text-green-950">
            <Link to="/">GoGuided</Link>
          </h4>
          <p className="text-gray-800">
            GoGuided offers exceptional travel experiences with handpicked tours
            and activities designed for every traveler. Explore new destinations
            and make memories that last forever.
          </p>
        </div>
        <div className="flex item-center gap-28 w-2/3">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-green-900">
              Contact Information
            </h2>
            <ul className="flex flex-col space-x-4 text-gray-800">
              <li className="flex gap-2 items-center">
                <FaLocationDot className="text-green-900" />
                <p className="text-[18px]">Location</p>
              </li>
              <li className="flex gap-2 items-center">
                <MdCall className="text-green-900" />
                <p className="text-[18px]">1234567890</p>
              </li>
              <li className="flex gap-2 items-center">
                <IoMdMail className="text-green-900" />
                <p className="text-[18px]">temp@gmail.com</p>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-green-900">
              Quick Links
            </h2>
            <ul className="flex flex-col space-x-4 text-green-900">
              <li>
                <NavLink to="/tours" className="hover:text-green-700">
                  Tours
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="hover:text-green-700">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="hover:text-green-700">
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/careers" className="hover:text-green-700">
                  Career
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-green-900">
              Stay in touch
            </h2>
            <div className="flex gap-3">
              <Link to="https://www.facebook.com/" target="_blank">
                <FaFacebook
                  size={32}
                  className="text-green-900 hover:text-green-700"
                />
              </Link>
              <Link to="https://www.x.com/" target="_blank">
                <FaXTwitter
                  size={32}
                  className="text-green-900 hover:text-green-700"
                />
              </Link>
              <Link to="https://www.youtube.com/" target="_blank">
                <FaYoutube
                  size={32}
                  className="text-green-900 hover:text-green-700"
                />
              </Link>
              <Link to="https://www.instagram.com/" target="_blank">
                <AiFillInstagram
                  size={32}
                  className="text-green-900 hover:text-green-700"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <p className="mx-auto py-2 text-xl font-semibold text-green-900">
        &copy; 2025 GoGuided. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
