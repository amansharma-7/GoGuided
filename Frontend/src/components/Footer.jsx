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
    <div className="flex flex-col gap-10 px-32 py-4 pt-10 ">
      {/* subscription */}
      {/* <div className="flex flex-col px-20 py-4 gap-1">
        <div className="flex items-center justify-between gap-2">
          <h1 className="font-bold text-3xl">Sign up to our newsletter</h1>
          <div className="flex space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className=" border-1 rounded-sm p-2"
            ></input>
            <button className="font-bold text-[15px] text-white bg-black rounded-sm px-4 py-1">
              Subscribe
            </button>
          </div>
        </div>
        <p>Stay upto date with latest tours & annoucements</p>
      </div> */}

      {/* footer main */}
      <div className="flex gap-32">
        <div className="w-1/3 flex flex-col gap-2">
          <h4 className="font-semibold text-5xl text-[#4D663C] ">
            <Link to="/">GoGuided</Link>
          </h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            pharetra condimentum.
          </p>
        </div>
        <div className="flex item-center gap-28 w-2/3">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">Contact Information</h2>
            <ul className="flex flex-col space-x-4 text-black">
              <li className="flex gap-2 items-center">
                <FaLocationDot />
                <p className=" text-[18px]">Location</p>
              </li>
              <li className="flex gap-2 items-center">
                <MdCall />
                <p className=" text-[18px]">1234567890</p>
              </li>
              <li className="flex gap-2 items-center">
                <IoMdMail />
                <p className=" text-[18px]">temp@gmail.com</p>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">Quick Links</h2>
            <ul className="flex flex-col space-x-4 text-xl text-black">
              <li>
                <NavLink to="/tours">Tours</NavLink>
              </li>
              <li>
                <NavLink to="/about">About Us</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact Us</NavLink>
              </li>
              <li>
                <NavLink to="/careers"> Career</NavLink>
              </li>
            </ul>
          </div>

          <div className=" flex flex-col gap-2">
            <h2 className="text-xl font-semibold">Stay in touch</h2>
            <div className="flex gap-3">
              <Link to="https://www.facebook.com/" target="_blank">
                <FaFacebook size={32} />
              </Link>
              <Link to="https://www.x.com/" target="_blank">
                <FaXTwitter size={32} />
              </Link>
              <Link to="https://www.youtube.com/" target="_blank">
                <FaYoutube size={32} />
              </Link>
              <Link to="https://www.instagram.com/" target="_blank">
                <AiFillInstagram size={32} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <p className="mx-auto py-2 text-xl font-semibold">
        Copyright 2025 GoGuided. All rights reserved
      </p>
    </div>
  );
}

export default Footer;
