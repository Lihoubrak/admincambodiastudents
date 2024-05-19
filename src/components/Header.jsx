import React, { useEffect, useState } from "react";
import { HiUserCircle, HiLockClosed, HiOutlineLogout } from "react-icons/hi";
import { TfiMenu } from "react-icons/tfi";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import { MdLanguage } from "react-icons/md";
import Tippy from "@tippyjs/react/headless";
import Cookies from "js-cookie"; // Import Cookies library
import ModalResetPassword from "./Modal/ModalResetPassword";
import { Link } from "react-router-dom";
import { getDecodeToken } from "../utils/getDecodeToken";
import { configRouter } from "../config/route";

const Header = ({ toggleSidebar, user }) => {
  const [resetPassword, setResetPassword] = useState(false);

  const handleClick = (type) => {
    if (type === "Logout") {
      // Remove JWT token upon logout
      Cookies.remove("tokenJwt");
      // Redirect to login page or perform any other necessary action
      window.location.href = "/login";
    } else if (type === "Password") {
      setResetPassword(true);
    }
  };
  return (
    <div className="p-5 bg-white border-b-2 flex items-center justify-between">
      <div className="flex items-center gap-5">
        <TfiMenu size={20} onClick={toggleSidebar} className="cursor-pointer" />
        <div className="w-[400px] rounded-2xl border flex items-center gap-2 p-1">
          <AiOutlineSearch size={20} className="ml-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent w-full border-none outline-none"
          />
        </div>
      </div>
      <div className="flex items-center gap-5">
        {/* Notification Icon */}
        <Link to={"/notification"}>
          <IoIosNotifications
            size={25}
            className="text-gray-600 hover:text-gray-900 transition duration-100"
          />
        </Link>

        {/* Language Icon */}
        <MdLanguage
          size={25}
          className="text-gray-600 hover:text-gray-900 transition duration-100"
        />

        {/* Profile Image with Tooltip */}
        <Tippy
          placement="top-start"
          interactive
          render={(attrs) => (
            <div
              className="bg-white shadow-lg rounded-md p-2 space-y-2"
              tabIndex="-1"
              {...attrs}
            >
              <Link
                to={`/profile`}
                className="w-full text-left py-2 px-4 text-sm text-gray-800 hover:bg-gray-100 hover:text-gray-900 rounded-md transition duration-300 flex items-center gap-2"
              >
                <HiUserCircle size={20} color="#dd546b" />{" "}
                {/* Change color here */}
                <span>View Profile</span>
              </Link>
              <button
                className="w-full text-left py-2 px-4 text-sm text-gray-800 hover:bg-gray-100 hover:text-gray-900 rounded-md transition duration-300 flex items-center gap-2"
                onClick={() => handleClick("Password")}
              >
                <HiLockClosed size={20} color="#00ff00" />{" "}
                {/* Change color here */}
                <span>Change Password</span>
              </button>
              <button
                className="w-full text-left py-2 px-4 text-sm text-gray-800 hover:bg-gray-100 hover:text-gray-900 rounded-md transition duration-300 flex items-center gap-2"
                onClick={() => handleClick("Logout")}
              >
                <HiOutlineLogout size={20} color="#ff0000" />{" "}
                {/* Change color here */}
                <span>Logout</span>
              </button>
            </div>
          )}
        >
          <div className=" w-10 h-10 rounded-full border border-gray-400 overflow-hidden transition duration-300 hover:border-gray-900 hover:shadow-md flex items-center justify-center">
            <img
              src={user?.avatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </Tippy>
      </div>
      <ModalResetPassword
        isOpen={resetPassword}
        closeModal={() => setResetPassword(false)}
      />
    </div>
  );
};

export default Header;
